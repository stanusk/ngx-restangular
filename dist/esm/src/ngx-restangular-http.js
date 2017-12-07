"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var ngx_restangular_helper_1 = require("./ngx-restangular-helper");
var RestangularHttp = (function () {
    function RestangularHttp(http) {
        this.http = http;
    }
    RestangularHttp.prototype.createRequest = function (options) {
        var requestOptions = ngx_restangular_helper_1.RestangularHelper.createRequestOptions(options);
        var request = new http_1.Request(requestOptions);
        return this.request(request);
    };
    RestangularHttp.prototype.request = function (request) {
        var _this = this;
        return this.http.request(request)
            .map(function (response) {
            response.config = { params: request };
            return response;
        })
            .map(function (response) {
            if (response._body) {
                response.data = typeof response._body == 'string' ? JSON.parse(response._body) : response._body;
            }
            else {
                response.data = null;
            }
            return response;
        })
            .catch(function (err) {
            try {
                err.data = typeof err._body == 'string' && err._body.length > 0 ? JSON.parse(err._body) : err._body;
            }
            catch (e) {
                err.data = err._body;
            }
            err.request = request;
            err.repeatRequest = function (newRequest) {
                return _this.request(newRequest || request);
            };
            return Observable_1.Observable.throw(err);
        });
    };
    RestangularHttp.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    RestangularHttp.ctorParameters = function () { return [
        { type: http_1.Http, },
    ]; };
    return RestangularHttp;
}());
exports.RestangularHttp = RestangularHttp;
//# sourceMappingURL=ngx-restangular-http.js.map