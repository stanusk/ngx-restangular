/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Optional, SkipSelf, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RESTANGULAR, RestangularFactory } from './ngx-restangular.config';
import { Restangular } from './ngx-restangular';
import { RestangularHttp } from './ngx-restangular-http';
export const /** @type {?} */ CONFIG_OBJ = new InjectionToken('configObj');
export class RestangularModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('RestangularModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?=} config1
     * @param {?=} config2
     * @return {?}
     */
    static forRoot(config1, config2) {
        return {
            ngModule: RestangularModule,
            providers: [
                { provide: CONFIG_OBJ, useValue: [config1, config2] },
                { provide: RESTANGULAR, useFactory: RestangularFactory, deps: [CONFIG_OBJ] },
            ]
        };
    }
}
RestangularModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                providers: [RestangularHttp, Restangular]
            },] },
];
/** @nocollapse */
RestangularModule.ctorParameters = () => [
    { type: RestangularModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
];
function RestangularModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RestangularModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RestangularModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1yZXN0YW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcmVzdGFuZ3VsYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQXNCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxNQUFNLENBQUMsdUJBQU0sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFTLFdBQVcsQ0FBQyxDQUFDO0FBTWxFLE1BQU07Ozs7SUFFSixZQUFvQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0VBQXNFLENBQUMsQ0FBQztTQUMzRTtLQUNGOzs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQVEsRUFBRSxPQUFRO1FBQy9CLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLEVBQUM7Z0JBQ2xELEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUM7YUFDM0U7U0FDRixDQUFBO0tBQ0Y7OztZQXJCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUM7YUFDMUM7Ozs7WUFDWSxpQkFBaUIsdUJBRWYsUUFBUSxZQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgbm8tdW51c2VkLXZhcmlhYmxlICovXG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYsIEluamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtSRVNUQU5HVUxBUiwgUmVzdGFuZ3VsYXJGYWN0b3J5fSBmcm9tICcuL25neC1yZXN0YW5ndWxhci5jb25maWcnO1xuaW1wb3J0IHtSZXN0YW5ndWxhcn0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXInO1xuaW1wb3J0IHtSZXN0YW5ndWxhckh0dHB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLWh0dHAnO1xuXG5leHBvcnQgY29uc3QgQ09ORklHX09CSiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdjb25maWdPYmonKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtSZXN0YW5ndWxhckh0dHAsIFJlc3Rhbmd1bGFyXVxufSlcbmV4cG9ydCBjbGFzcyBSZXN0YW5ndWxhck1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBSZXN0YW5ndWxhck1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1Jlc3Rhbmd1bGFyTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnMT8sIGNvbmZpZzI/KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSZXN0YW5ndWxhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQ09ORklHX09CSiwgdXNlVmFsdWU6IFtjb25maWcxLGNvbmZpZzJdfSxcbiAgICAgICAge3Byb3ZpZGU6IFJFU1RBTkdVTEFSLCB1c2VGYWN0b3J5OiBSZXN0YW5ndWxhckZhY3RvcnksIGRlcHM6IFtDT05GSUdfT0JKXX0sXG4gICAgICBdXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==