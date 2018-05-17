/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { assign } from 'core-js/fn/object';
export class RestangularHelper {
    /**
     * @param {?} options
     * @return {?}
     */
    static createRequest(options) {
        let /** @type {?} */ requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
        let /** @type {?} */ requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
        let /** @type {?} */ methodName = options.method.toUpperCase();
        let /** @type {?} */ withCredentials = options.withCredentials || false;
        let /** @type {?} */ request = new HttpRequest(methodName, options.url, options.data, {
            headers: requestHeaders,
            params: requestQueryParams,
            responseType: options.responseType,
            withCredentials
        });
        if (['GET', 'DELETE', 'HEAD', 'JSONP', 'OPTIONS'].indexOf(methodName) >= 0) {
            request = new HttpRequest(methodName, options.url, {
                headers: requestHeaders,
                params: requestQueryParams,
                responseType: options.responseType,
                withCredentials
            });
        }
        return request;
    }
    /**
     * @param {?} queryParams
     * @return {?}
     */
    static createRequestQueryParams(queryParams) {
        let /** @type {?} */ requestQueryParams = assign({}, queryParams);
        let /** @type {?} */ search = new HttpParams();
        for (let /** @type {?} */ key in requestQueryParams) {
            let /** @type {?} */ value = requestQueryParams[key];
            if (Array.isArray(value)) {
                value.forEach(function (val) {
                    search = search.append(key, val);
                });
            }
            else {
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                search = search.append(key, value);
            }
        }
        return search;
    }
    /**
     * @param {?} headers
     * @return {?}
     */
    static createRequestHeaders(headers) {
        for (let /** @type {?} */ key in headers) {
            let /** @type {?} */ value = headers[key];
            if (typeof value === 'undefined') {
                delete headers[key];
            }
        }
        return new HttpHeaders(assign({}, headers));
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1yZXN0YW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcmVzdGFuZ3VsYXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFekMsTUFBTTs7Ozs7SUFFSixNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU87UUFDMUIscUJBQUksa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BGLHFCQUFJLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0UscUJBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMscUJBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDO1FBRXZELHFCQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FDM0IsVUFBVSxFQUNWLE9BQU8sQ0FBQyxHQUFHLEVBQ1gsT0FBTyxDQUFDLElBQUksRUFDWjtZQUNFLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLGVBQWU7U0FDaEIsQ0FDRixDQUFDO1FBRUYsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsT0FBTyxHQUFHLElBQUksV0FBVyxDQUN2QixVQUFVLEVBQ1YsT0FBTyxDQUFDLEdBQUcsRUFDWDtnQkFDRSxPQUFPLEVBQUUsY0FBYztnQkFDdkIsTUFBTSxFQUFFLGtCQUFrQjtnQkFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO2dCQUNsQyxlQUFlO2FBQ2hCLENBQ0YsQ0FBQTtTQUNGO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjs7Ozs7SUFFRCxNQUFNLENBQUMsd0JBQXdCLENBQUMsV0FBVztRQUN6QyxxQkFBSSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELHFCQUFJLE1BQU0sR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRTFDLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDbkMscUJBQUksS0FBSyxHQUFRLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXpDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsR0FBRztvQkFDeEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQyxDQUFDLENBQUM7YUFDSjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQjtnQkFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEM7U0FFRjtRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDZjs7Ozs7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTztRQUNqQyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixxQkFBSSxLQUFLLEdBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Y7UUFFRCxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQzdDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge2Fzc2lnbn0gZnJvbSAnY29yZS1qcy9mbi9vYmplY3QnO1xuXG5leHBvcnQgY2xhc3MgUmVzdGFuZ3VsYXJIZWxwZXIge1xuXG4gIHN0YXRpYyBjcmVhdGVSZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICBsZXQgcmVxdWVzdFF1ZXJ5UGFyYW1zID0gUmVzdGFuZ3VsYXJIZWxwZXIuY3JlYXRlUmVxdWVzdFF1ZXJ5UGFyYW1zKG9wdGlvbnMucGFyYW1zKTtcbiAgICBsZXQgcmVxdWVzdEhlYWRlcnMgPSBSZXN0YW5ndWxhckhlbHBlci5jcmVhdGVSZXF1ZXN0SGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICAgIGxldCBtZXRob2ROYW1lID0gb3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgd2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgfHwgZmFsc2U7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdChcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBvcHRpb25zLnVybCxcbiAgICAgIG9wdGlvbnMuZGF0YSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgIHBhcmFtczogcmVxdWVzdFF1ZXJ5UGFyYW1zLFxuICAgICAgICByZXNwb25zZVR5cGU6IG9wdGlvbnMucmVzcG9uc2VUeXBlLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHNcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYoWydHRVQnLCAnREVMRVRFJywgJ0hFQUQnLCAnSlNPTlAnLCAnT1BUSU9OUyddLmluZGV4T2YobWV0aG9kTmFtZSkgPj0gMCkge1xuICAgICAgcmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdChcbiAgICAgICAgbWV0aG9kTmFtZSxcbiAgICAgICAgb3B0aW9ucy51cmwsXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgICBwYXJhbXM6IHJlcXVlc3RRdWVyeVBhcmFtcyxcbiAgICAgICAgICByZXNwb25zZVR5cGU6IG9wdGlvbnMucmVzcG9uc2VUeXBlLFxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsc1xuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVJlcXVlc3RRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcykge1xuICAgIGxldCByZXF1ZXN0UXVlcnlQYXJhbXMgPSBhc3NpZ24oe30sIHF1ZXJ5UGFyYW1zKTtcbiAgICBsZXQgc2VhcmNoOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgIGZvciAobGV0IGtleSBpbiByZXF1ZXN0UXVlcnlQYXJhbXMpIHtcbiAgICAgIGxldCB2YWx1ZTogYW55ID0gcmVxdWVzdFF1ZXJ5UGFyYW1zW2tleV07XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgc2VhcmNoID0gc2VhcmNoLmFwcGVuZChrZXksIHZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2ggPSBzZWFyY2guYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVSZXF1ZXN0SGVhZGVycyhoZWFkZXJzKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgIGxldCB2YWx1ZTogYW55ID0gaGVhZGVyc1trZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKGFzc2lnbih7fSwgaGVhZGVycykpO1xuICB9XG59XG4iXX0=