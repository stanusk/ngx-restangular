/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { isArray } from 'lodash';
export const /** @type {?} */ RESTANGULAR = new InjectionToken('restangularWithConfig');
/**
 * @param {?} config
 * @return {?}
 */
export function RestangularFactory(config) {
    let /** @type {?} */ configObj = {
        fn: config[0],
        arrServices: [],
    };
    if (isArray(config[0])) {
        configObj = {
            arrServices: config[0],
            fn: config[1]
        };
    }
    return configObj;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1yZXN0YW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcmVzdGFuZ3VsYXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHakMsTUFBTSxDQUFDLHVCQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBUyx1QkFBdUIsQ0FBQyxDQUFDOzs7OztBQUMvRSxNQUFNLDZCQUE2QixNQUFNO0lBQ3ZDLHFCQUFJLFNBQVMsR0FBRztRQUNkLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsV0FBVyxFQUFFLEVBQUU7S0FDaEIsQ0FBQztJQUVGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsU0FBUyxHQUFHO1lBQ1YsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDZCxDQUFDO0tBQ0g7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0NBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcblxuXG5leHBvcnQgY29uc3QgUkVTVEFOR1VMQVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPigncmVzdGFuZ3VsYXJXaXRoQ29uZmlnJyk7XG5leHBvcnQgZnVuY3Rpb24gUmVzdGFuZ3VsYXJGYWN0b3J5KGNvbmZpZykge1xuICBsZXQgY29uZmlnT2JqID0ge1xuICAgIGZuOiBjb25maWdbMF0sXG4gICAgYXJyU2VydmljZXM6IFtdLFxuICB9O1xuXG4gIGlmIChpc0FycmF5KGNvbmZpZ1swXSkpIHtcbiAgICBjb25maWdPYmogPSB7XG4gICAgICBhcnJTZXJ2aWNlczogY29uZmlnWzBdLFxuICAgICAgZm46IGNvbmZpZ1sxXVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGNvbmZpZ09iajtcbn1cbiJdfQ==