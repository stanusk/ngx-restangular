/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpBackend, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { RestangularHelper } from './ngx-restangular-helper';
import { catchError, filter, map } from 'rxjs/operators';
var RestangularHttp = /** @class */ (function () {
    function RestangularHttp(http) {
        this.http = http;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    RestangularHttp.prototype.createRequest = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var /** @type {?} */ request = RestangularHelper.createRequest(options);
        return this.request(request);
    };
    /**
     * @param {?} request
     * @return {?}
     */
    RestangularHttp.prototype.request = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        var _this = this;
        return this.http.handle(request)
            .pipe(filter(function (event) { return event instanceof HttpResponse; }), map(function (response) {
            if (!response.ok) {
                return throwError(new HttpErrorResponse(response));
            }
            return response;
        }), map(function (response) {
            response.config = { params: request };
            return response;
        }), catchError(function (err) {
            err.request = request;
            err.data = err.error;
            err.repeatRequest = function (newRequest) {
                return _this.request(newRequest || request);
            };
            return throwError(err);
        }));
    };
    RestangularHttp.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RestangularHttp.ctorParameters = function () { return [
        { type: HttpBackend, },
    ]; };
    return RestangularHttp;
}());
export { RestangularHttp };
function RestangularHttp_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RestangularHttp.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RestangularHttp.ctorParameters;
    /** @type {?} */
    RestangularHttp.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWh0dHAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcmVzdGFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXJlc3Rhbmd1bGFyLWh0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBZSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRyxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQU12RCx5QkFBbUIsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtLQUNuQzs7Ozs7SUFFRCx1Q0FBYTs7OztJQUFiLFVBQWMsT0FBTztRQUNuQixxQkFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzlCOzs7OztJQUVELGlDQUFPOzs7O0lBQVAsVUFBUSxPQUF5QjtRQUFqQyxpQkF3QkM7UUF2QkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUMvQixJQUFJLENBQ0gsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLFlBQVksRUFBN0IsQ0FBNkIsQ0FBQyxFQUM5QyxHQUFHLENBQUMsVUFBQyxRQUFhO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ3BEO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQixDQUFDLEVBQ0YsR0FBRyxDQUFDLFVBQUEsUUFBUTtZQUNWLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQixDQUFDLEVBQ0YsVUFBVSxDQUFDLFVBQUEsR0FBRztZQUNaLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNyQixHQUFHLENBQUMsYUFBYSxHQUFHLFVBQUMsVUFBVztnQkFDOUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDO2FBQzVDLENBQUM7WUFFRixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCLENBQUMsQ0FDSCxDQUFDO0tBQ0g7O2dCQXBDRixVQUFVOzs7O2dCQVJGLFdBQVc7OzBCQURwQjs7U0FVYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEJhY2tlbmQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyB0aHJvd0Vycm9yLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFJlc3Rhbmd1bGFySGVscGVyIH0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXItaGVscGVyJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtIdHRwRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwL3NyYy9yZXNwb25zZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXN0YW5ndWxhckh0dHAge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQmFja2VuZCkge1xuICB9XG5cbiAgY3JlYXRlUmVxdWVzdChvcHRpb25zKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBSZXN0YW5ndWxhckhlbHBlci5jcmVhdGVSZXF1ZXN0KG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChyZXF1ZXN0KTtcbiAgfVxuXG4gIHJlcXVlc3QocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmhhbmRsZShyZXF1ZXN0KVxuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSxcbiAgICAgIG1hcCgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEh0dHBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSksXG4gICAgICBtYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXNwb25zZS5jb25maWcgPSB7cGFyYW1zOiByZXF1ZXN0fTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgIGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgZXJyLmRhdGEgPSBlcnIuZXJyb3I7XG4gICAgICAgIGVyci5yZXBlYXRSZXF1ZXN0ID0gKG5ld1JlcXVlc3Q/KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChuZXdSZXF1ZXN0IHx8IHJlcXVlc3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuIl19