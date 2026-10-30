# ---------- Stage 1: PHP dependencies ----------
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist
COPY . .
RUN composer dump-autoload --optimize --no-dev --no-scripts

# ---------- Stage 2: Build React/Vite assets (needs PHP + Node) ----------
FROM php:8.4-cli AS assets

RUN apt-get update && apt-get install -y curl unzip git \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install JS dependencies first so this layer is cached
COPY package*.json ./
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set fetch-timeout 600000 \
 && npm ci

# App code + vendor/ (Wayfinder runs artisan, which needs both)
COPY --from=vendor /app ./

# Folders artisan expects to exist
RUN mkdir -p storage/framework/cache storage/framework/sessions \
             storage/framework/views storage/logs bootstrap/cache

# Build-only settings: no real DB and no .env file needed
ENV APP_ENV=production \
    DB_CONNECTION=sqlite \
    SESSION_DRIVER=array \
    CACHE_STORE=array

# Throwaway key so artisan can boot while Wayfinder generates routes.
# It is only used for this command and is not stored in the image.
RUN APP_KEY="base64:$(php -r 'echo base64_encode(random_bytes(32));')" npm run build

# ---------- Stage 3: Runtime ----------
FROM php:8.4-apache

RUN apt-get update && apt-get install -y libzip-dev unzip \
    && docker-php-ext-install pdo_mysql zip bcmath \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Point Apache at Laravel's public/ folder
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

# App code + vendor from stage 1, compiled assets from stage 2
COPY --from=vendor /app ./
COPY --from=assets /app/public/build ./public/build

RUN mkdir -p storage/framework/cache storage/framework/sessions \
             storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && php artisan package:discover --ansi

EXPOSE 80

CMD ["sh", "-c", "php artisan migrate --force && apache2-foreground"]