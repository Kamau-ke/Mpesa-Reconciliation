import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:41
 * @route '/owner/shops/{shop}'
 */
export const show = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/owner/shops/{shop}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:41
 * @route '/owner/shops/{shop}'
 */
show.url = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shop: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop: typeof args.shop === 'object'
                ? args.shop.id
                : args.shop,
                }

    return show.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:41
 * @route '/owner/shops/{shop}'
 */
show.get = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:41
 * @route '/owner/shops/{shop}'
 */
show.head = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:41
 * @route '/owner/shops/{shop}'
 */
    const showForm = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:41
 * @route '/owner/shops/{shop}'
 */
        showForm.get = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:41
 * @route '/owner/shops/{shop}'
 */
        showForm.head = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:57
 * @route '/owner/shops/{shop}'
 */
export const update = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/owner/shops/{shop}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:57
 * @route '/owner/shops/{shop}'
 */
update.url = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shop: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop: typeof args.shop === 'object'
                ? args.shop.id
                : args.shop,
                }

    return update.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:57
 * @route '/owner/shops/{shop}'
 */
update.put = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:57
 * @route '/owner/shops/{shop}'
 */
    const updateForm = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:57
 * @route '/owner/shops/{shop}'
 */
        updateForm.put = (args: { shop: string | number | { id: string | number } } | [shop: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const shop = {
    show: Object.assign(show, show),
update: Object.assign(update, update),
}

export default shop