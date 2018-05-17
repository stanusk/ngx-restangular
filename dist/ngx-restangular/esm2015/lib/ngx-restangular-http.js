/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpBackend, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { RestangularHelper } from './ngx-restangular-helper';
import { catchError, filter, map } from 'rxjs/operators';
export class RestangularHttp {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequest(options) {
        const /** @type {?} */ request = RestangularHelper.createRequest(options);
        return this.request(request);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    request(request) {
        return this.http.handle(request)
            .pipe(filter(event => event instanceof HttpResponse), map((response) => {
            if (!response.ok) {
                return throwError(new HttpErrorResponse(response));
            }
            return response;
        }), map(response => {
            response.config = { params: request };
            return response;
        }), catchError(err => {
            err.request = request;
            err.data = err.error;
            err.repeatRequest = (newRequest) => {
                return this.request(newRequest || request);
            };
            return throwError(err);
        }));
    }
}
RestangularHttp.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RestangularHttp.ctorParameters = () => [
    { type: HttpBackend, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWh0dHAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcmVzdGFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXJlc3Rhbmd1bGFyLWh0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBZSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRyxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXpELE1BQU07Ozs7SUFFSixZQUFtQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0tBQ25DOzs7OztJQUVELGFBQWEsQ0FBQyxPQUFPO1FBQ25CLHVCQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDOUI7Ozs7O0lBRUQsT0FBTyxDQUFDLE9BQXlCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDL0IsSUFBSSxDQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxZQUFZLENBQUMsRUFDOUMsR0FBRyxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ2pCLENBQUMsRUFDRixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDYixRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDakIsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNyQixHQUFHLENBQUMsYUFBYSxHQUFHLENBQUMsVUFBVyxFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQzthQUM1QyxDQUFDO1lBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QixDQUFDLENBQ0gsQ0FBQztLQUNIOzs7WUFwQ0YsVUFBVTs7OztZQVJGLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQmFja2VuZCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzdGFuZ3VsYXJIZWxwZXIgfSBmcm9tICcuL25neC1yZXN0YW5ndWxhci1oZWxwZXInO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0h0dHBFdmVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAvc3JjL3Jlc3BvbnNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc3Rhbmd1bGFySHR0cCB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBCYWNrZW5kKSB7XG4gIH1cblxuICBjcmVhdGVSZXF1ZXN0KG9wdGlvbnMpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IFJlc3Rhbmd1bGFySGVscGVyLmNyZWF0ZVJlcXVlc3Qob3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHJlcXVlc3QpO1xuICB9XG5cbiAgcmVxdWVzdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuaGFuZGxlKHJlcXVlc3QpXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpLFxuICAgICAgbWFwKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgSHR0cEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KSxcbiAgICAgIG1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLmNvbmZpZyA9IHtwYXJhbXM6IHJlcXVlc3R9O1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBlcnIuZGF0YSA9IGVyci5lcnJvcjtcbiAgICAgICAgZXJyLnJlcGVhdFJlcXVlc3QgPSAobmV3UmVxdWVzdD8pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG5ld1JlcXVlc3QgfHwgcmVxdWVzdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG4iXX0=