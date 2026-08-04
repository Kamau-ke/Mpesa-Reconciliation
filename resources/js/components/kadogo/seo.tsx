import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

type SeoProps = {
    title: string;
    description?: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    noindex?: boolean;
    siteName?: string;
    structuredData?: Record<string, unknown> | Record<string, unknown>[];
    children?: ReactNode;
};

export default function Seo({
    title,
    description,
    canonical,
    image,
    type = 'website',
    noindex = false,
    siteName = 'Kadogo',
    structuredData,
    children,
}: SeoProps) {
    const fullTitle = title.includes(siteName) ? title : `${title} · ${siteName}`;

    return (
        <Head title={fullTitle}>
            {description && <meta name="description" content={description} />}
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            {canonical && <meta property="og:url" content={canonical} />}
            {image && <meta property="og:image" content={image} />}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_KE" />

            {/* Twitter Card */}
            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            {image && <meta name="twitter:image" content={image} />}

            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}

            {children}
        </Head>
    );
}