import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:13
* @route '/our-menu'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/our-menu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:13
* @route '/our-menu'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:13
* @route '/our-menu'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:13
* @route '/our-menu'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:13
* @route '/our-menu'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:13
* @route '/our-menu'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MenuController::index
* @see app/Http/Controllers/MenuController.php:13
* @route '/our-menu'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const MenuController = { index }

export default MenuController