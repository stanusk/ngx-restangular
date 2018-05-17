(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('@angular/common/http'), require('core-js/fn/object'), require('rxjs'), require('rxjs/operators'), require('tslib')) :
    typeof define === 'function' && define.amd ? define('ngx-restangular', ['exports', '@angular/core', 'lodash', '@angular/common/http', 'core-js/fn/object', 'rxjs', 'rxjs/operators', 'tslib'], factory) :
    (factory((global['ngx-restangular'] = {}),global.ng.core,null,global.ng.common.http,null,null,global.Rx.Observable.prototype,global.tslib));
}(this, (function (exports,core,lodash,http,object,rxjs,operators,tslib_1) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ RESTANGULAR = new core.InjectionToken('restangularWithConfig');
    /**
     * @param {?} config
     * @return {?}
     */
    function RestangularFactory(config) {
        var /** @type {?} */ configObj = {
            fn: config[0],
            arrServices: [],
        };
        if (lodash.isArray(config[0])) {
            configObj = {
                arrServices: config[0],
                fn: config[1]
            };
        }
        return configObj;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var RestangularHelper = (function () {
        function RestangularHelper() {
        }
        /**
         * @param {?} options
         * @return {?}
         */
        RestangularHelper.createRequest = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                var /** @type {?} */ requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
                var /** @type {?} */ requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
                var /** @type {?} */ methodName = options.method.toUpperCase();
                var /** @type {?} */ withCredentials = options.withCredentials || false;
                var /** @type {?} */ request = new http.HttpRequest(methodName, options.url, options.data, {
                    headers: requestHeaders,
                    params: requestQueryParams,
                    responseType: options.responseType,
                    withCredentials: withCredentials
                });
                if (['GET', 'DELETE', 'HEAD', 'JSONP', 'OPTIONS'].indexOf(methodName) >= 0) {
                    request = new http.HttpRequest(methodName, options.url, {
                        headers: requestHeaders,
                        params: requestQueryParams,
                        responseType: options.responseType,
                        withCredentials: withCredentials
                    });
                }
                return request;
            };
        /**
         * @param {?} queryParams
         * @return {?}
         */
        RestangularHelper.createRequestQueryParams = /**
         * @param {?} queryParams
         * @return {?}
         */
            function (queryParams) {
                var /** @type {?} */ requestQueryParams = object.assign({}, queryParams);
                var /** @type {?} */ search = new http.HttpParams();
                var _loop_1 = function (key) {
                    var /** @type {?} */ value = requestQueryParams[key];
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
                };
                for (var /** @type {?} */ key in requestQueryParams) {
                    _loop_1(key);
                }
                return search;
            };
        /**
         * @param {?} headers
         * @return {?}
         */
        RestangularHelper.createRequestHeaders = /**
         * @param {?} headers
         * @return {?}
         */
            function (headers) {
                for (var /** @type {?} */ key in headers) {
                    var /** @type {?} */ value = headers[key];
                    if (typeof value === 'undefined') {
                        delete headers[key];
                    }
                }
                return new http.HttpHeaders(object.assign({}, headers));
            };
        return RestangularHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var RestangularHttp = (function () {
        function RestangularHttp(http$$1) {
            this.http = http$$1;
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
                    .pipe(operators.filter(function (event) { return event instanceof http.HttpResponse; }), operators.map(function (response) {
                    if (!response.ok) {
                        return rxjs.throwError(new http.HttpErrorResponse(response));
                    }
                    return response;
                }), operators.map(function (response) {
                    response.config = { params: request };
                    return response;
                }), operators.catchError(function (err) {
                    err.request = request;
                    err.data = err.error;
                    err.repeatRequest = function (newRequest) {
                        return _this.request(newRequest || request);
                    };
                    return rxjs.throwError(err);
                }));
            };
        RestangularHttp.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        RestangularHttp.ctorParameters = function () {
            return [
                { type: http.HttpBackend, },
            ];
        };
        return RestangularHttp;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @param {?} object
     * @param {?} config
     * @return {?}
     */
    function RestangularConfigurer(object$$1, config) {
        object$$1.configuration = config;
        /**
         * Those are HTTP safe methods for which there is no need to pass any data with the request.
         */
        var /** @type {?} */ safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];
        config.isSafe = function (operation) {
            return lodash.includes(safeMethods, operation.toLowerCase());
        };
        var /** @type {?} */ absolutePattern = /^https?:\/\//i;
        config.isAbsoluteUrl = function (string) {
            return lodash.isUndefined(config.absoluteUrl) || lodash.isNull(config.absoluteUrl) ?
                string && absolutePattern.test(string) :
                config.absoluteUrl;
        };
        config.absoluteUrl = lodash.isUndefined(config.absoluteUrl) ? true : config.absoluteUrl;
        object$$1.setSelfLinkAbsoluteUrl = function (value) {
            config.absoluteUrl = value;
        };
        /**
           * This is the BaseURL to be used with Restangular
           */
        config.baseUrl = lodash.isUndefined(config.baseUrl) ? '' : config.baseUrl;
        object$$1.setBaseUrl = function (newBaseUrl) {
            config.baseUrl = /\/$/.test(newBaseUrl) ?
                newBaseUrl.substring(0, newBaseUrl.length - 1) :
                newBaseUrl;
            return this;
        };
        /**
           * Sets the extra fields to keep from the parents
           */
        config.extraFields = config.extraFields || [];
        object$$1.setExtraFields = function (newExtraFields) {
            config.extraFields = newExtraFields;
            return this;
        };
        /**
           * Some default $http parameter to be used in EVERY call
           **/
        config.defaultHttpFields = config.defaultHttpFields || {};
        object$$1.setDefaultHttpFields = function (values) {
            config.defaultHttpFields = values;
            return this;
        };
        /**
           * Always return plain data, no restangularized object
           **/
        config.plainByDefault = config.plainByDefault || false;
        object$$1.setPlainByDefault = function (value) {
            config.plainByDefault = value === true ? true : false;
            return this;
        };
        config.withHttpValues = function (httpLocalConfig, obj) {
            return lodash.defaults(obj, httpLocalConfig, config.defaultHttpFields);
        };
        config.encodeIds = lodash.isUndefined(config.encodeIds) ? true : config.encodeIds;
        object$$1.setEncodeIds = function (encode) {
            config.encodeIds = encode;
        };
        config.defaultRequestParams = config.defaultRequestParams || {
            get: {},
            post: {},
            put: {},
            remove: {},
            common: {}
        };
        object$$1.setDefaultRequestParams = function (param1, param2) {
            var /** @type {?} */ methods = [], /** @type {?} */ params = param2 || param1;
            if (!lodash.isUndefined(param2)) {
                if (lodash.isArray(param1)) {
                    methods = param1;
                }
                else {
                    methods.push(param1);
                }
            }
            else {
                methods.push('common');
            }
            lodash.each(methods, function (method) {
                config.defaultRequestParams[method] = params;
            });
            return this;
        };
        object$$1.requestParams = config.defaultRequestParams;
        config.defaultHeaders = config.defaultHeaders || {};
        object$$1.setDefaultHeaders = function (headers) {
            config.defaultHeaders = headers;
            object$$1.defaultHeaders = config.defaultHeaders;
            return this;
        };
        object$$1.defaultHeaders = config.defaultHeaders;
        /**
           * Method overriders response Method
           **/
        config.defaultResponseMethod = config.defaultResponseMethod || 'promise';
        object$$1.setDefaultResponseMethod = function (method) {
            config.defaultResponseMethod = method;
            object$$1.defaultResponseMethod = config.defaultResponseMethod;
            return this;
        };
        object$$1.defaultResponseMethod = config.defaultResponseMethod;
        /**
           * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
           **/
        config.methodOverriders = config.methodOverriders || [];
        object$$1.setMethodOverriders = function (values) {
            var /** @type {?} */ overriders = lodash.extend([], values);
            if (config.isOverridenMethod('delete', overriders)) {
                overriders.push('remove');
            }
            config.methodOverriders = overriders;
            return this;
        };
        config.jsonp = lodash.isUndefined(config.jsonp) ? false : config.jsonp;
        object$$1.setJsonp = function (active) {
            config.jsonp = active;
        };
        config.isOverridenMethod = function (method, values) {
            var /** @type {?} */ search = values || config.methodOverriders;
            return !lodash.isUndefined(lodash.find(search, function (one) {
                return one.toLowerCase() === method.toLowerCase();
            }));
        };
        /**
           * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
           **/
        config.urlCreator = config.urlCreator || 'path';
        object$$1.setUrlCreator = function (name) {
            if (!lodash.has(config.urlCreatorFactory, name)) {
                throw new Error('URL Path selected isn\'t valid');
            }
            config.urlCreator = name;
            return this;
        };
        /**
           * You can set the restangular fields here. The 3 required fields for Restangular are:
           *
           * id: Id of the element
           * route: name of the route of this element
           * parentResource: the reference to the parent resource
           *
           *  All of this fields except for id, are handled (and created) by Restangular. By default,
           *  the field values will be id, route and parentResource respectively
           */
        config.restangularFields = config.restangularFields || {
            id: 'id',
            route: 'route',
            parentResource: 'parentResource',
            restangularCollection: 'restangularCollection',
            cannonicalId: '__cannonicalId',
            etag: 'restangularEtag',
            selfLink: 'href',
            get: 'get',
            getList: 'getList',
            put: 'put',
            post: 'post',
            remove: 'remove',
            head: 'head',
            trace: 'trace',
            options: 'options',
            patch: 'patch',
            getRestangularUrl: 'getRestangularUrl',
            getRequestedUrl: 'getRequestedUrl',
            putElement: 'putElement',
            addRestangularMethod: 'addRestangularMethod',
            getParentList: 'getParentList',
            clone: 'clone',
            ids: 'ids',
            httpConfig: '_$httpConfig',
            reqParams: 'reqParams',
            one: 'one',
            all: 'all',
            several: 'several',
            oneUrl: 'oneUrl',
            allUrl: 'allUrl',
            customPUT: 'customPUT',
            customPATCH: 'customPATCH',
            customPOST: 'customPOST',
            customDELETE: 'customDELETE',
            customGET: 'customGET',
            customGETLIST: 'customGETLIST',
            customOperation: 'customOperation',
            doPUT: 'doPUT',
            doPATCH: 'doPATCH',
            doPOST: 'doPOST',
            doDELETE: 'doDELETE',
            doGET: 'doGET',
            doGETLIST: 'doGETLIST',
            fromServer: 'fromServer',
            withConfig: 'withConfig',
            withHttpConfig: 'withHttpConfig',
            singleOne: 'singleOne',
            plain: 'plain',
            save: 'save',
            restangularized: 'restangularized'
        };
        object$$1.setRestangularFields = function (resFields) {
            config.restangularFields =
                lodash.extend({}, config.restangularFields, resFields);
            return this;
        };
        config.isRestangularized = function (obj) {
            return !!obj[config.restangularFields.restangularized];
        };
        config.setFieldToElem = function (field, elem, value) {
            var /** @type {?} */ properties = field.split('.');
            var /** @type {?} */ idValue = elem;
            lodash.each(lodash.initial(properties), function (prop) {
                idValue[prop] = {};
                idValue = idValue[prop];
            });
            var /** @type {?} */ index = lodash.last(properties);
            idValue[index] = value;
            return this;
        };
        config.getFieldFromElem = function (field, elem) {
            var /** @type {?} */ properties = field.split('.');
            var /** @type {?} */ idValue = elem;
            lodash.each(properties, function (prop) {
                if (idValue) {
                    idValue = idValue[prop];
                }
            });
            return lodash.clone(idValue);
        };
        config.setIdToElem = function (elem, id /*, route */) {
            config.setFieldToElem(config.restangularFields.id, elem, id);
            return this;
        };
        config.getIdFromElem = function (elem) {
            return config.getFieldFromElem(config.restangularFields.id, elem);
        };
        config.isValidId = function (elemId) {
            return '' !== elemId && !lodash.isUndefined(elemId) && !lodash.isNull(elemId);
        };
        config.setUrlToElem = function (elem, url /*, route */) {
            config.setFieldToElem(config.restangularFields.selfLink, elem, url);
            return this;
        };
        config.getUrlFromElem = function (elem) {
            return config.getFieldFromElem(config.restangularFields.selfLink, elem);
        };
        config.useCannonicalId = lodash.isUndefined(config.useCannonicalId) ? false : config.useCannonicalId;
        object$$1.setUseCannonicalId = function (value) {
            config.useCannonicalId = value;
            return this;
        };
        config.getCannonicalIdFromElem = function (elem) {
            var /** @type {?} */ cannonicalId = elem[config.restangularFields.cannonicalId];
            var /** @type {?} */ actualId = config.isValidId(cannonicalId) ? cannonicalId : config.getIdFromElem(elem);
            return actualId;
        };
        /**
           * Sets the Response parser. This is used in case your response isn't directly the data.
           * For example if you have a response like {meta: {'meta'}, data: {name: 'Gonto'}}
           * you can extract this data which is the one that needs wrapping
           *
           * The ResponseExtractor is a function that receives the response and the method executed.
           */
        config.responseInterceptors = config.responseInterceptors ? tslib_1.__spread(config.responseInterceptors) : [];
        config.defaultResponseInterceptor = function (data /*, operation, what, url, response, subject */) {
            return data || {};
        };
        config.responseExtractor = function (data, operation, what, url, response, subject) {
            var /** @type {?} */ interceptors = lodash.clone(config.responseInterceptors);
            interceptors.push(config.defaultResponseInterceptor);
            var /** @type {?} */ theData = data;
            lodash.each(interceptors, function (interceptor) {
                theData = interceptor(theData, operation, what, url, response, subject);
            });
            return theData;
        };
        object$$1.addResponseInterceptor = function (extractor) {
            config.responseInterceptors.push(extractor);
            return this;
        };
        config.errorInterceptors = config.errorInterceptors ? tslib_1.__spread(config.errorInterceptors) : [];
        object$$1.addErrorInterceptor = function (interceptor) {
            config.errorInterceptors = tslib_1.__spread([interceptor], config.errorInterceptors);
            return this;
        };
        object$$1.setResponseInterceptor = object$$1.addResponseInterceptor;
        object$$1.setResponseExtractor = object$$1.addResponseInterceptor;
        object$$1.setErrorInterceptor = object$$1.addErrorInterceptor;
        /**
           * Response interceptor is called just before resolving promises.
           */
        /**
           * Request interceptor is called before sending an object to the server.
           */
        config.requestInterceptors = config.requestInterceptors ? tslib_1.__spread(config.requestInterceptors) : [];
        config.defaultInterceptor = function (element, operation, path, url, headers, params, httpConfig) {
            return {
                element: element,
                headers: headers,
                params: params,
                httpConfig: httpConfig
            };
        };
        config.fullRequestInterceptor = function (element, operation, path, url, headers, params, httpConfig) {
            var /** @type {?} */ interceptors = lodash.clone(config.requestInterceptors);
            var /** @type {?} */ defaultRequest = config.defaultInterceptor(element, operation, path, url, headers, params, httpConfig);
            return lodash.reduce(interceptors, function (request, interceptor) {
                var /** @type {?} */ returnInterceptor = interceptor(request.element, operation, path, url, request.headers, request.params, request.httpConfig);
                return lodash.extend(request, returnInterceptor);
            }, defaultRequest);
        };
        object$$1.addRequestInterceptor = function (interceptor) {
            config.requestInterceptors.push(function (elem, operation, path, url, headers, params, httpConfig) {
                return {
                    headers: headers,
                    params: params,
                    element: interceptor(elem, operation, path, url),
                    httpConfig: httpConfig
                };
            });
            return this;
        };
        object$$1.setRequestInterceptor = object$$1.addRequestInterceptor;
        object$$1.addFullRequestInterceptor = function (interceptor) {
            config.requestInterceptors.push(interceptor);
            return this;
        };
        object$$1.setFullRequestInterceptor = object$$1.addFullRequestInterceptor;
        config.onBeforeElemRestangularized = config.onBeforeElemRestangularized || function (elem) {
            return elem;
        };
        object$$1.setOnBeforeElemRestangularized = function (post) {
            config.onBeforeElemRestangularized = post;
            return this;
        };
        object$$1.setRestangularizePromiseInterceptor = function (interceptor) {
            config.restangularizePromiseInterceptor = interceptor;
            return this;
        };
        /**
           * This method is called after an element has been "Restangularized".
           *
           * It receives the element, a boolean indicating if it's an element or a collection
           * and the name of the model
           *
           */
        config.onElemRestangularized = config.onElemRestangularized || function (elem) {
            return elem;
        };
        object$$1.setOnElemRestangularized = function (post) {
            config.onElemRestangularized = post;
            return this;
        };
        config.shouldSaveParent = config.shouldSaveParent || function () {
            return true;
        };
        object$$1.setParentless = function (values) {
            if (lodash.isArray(values)) {
                config.shouldSaveParent = function (route) {
                    return !lodash.includes(values, route);
                };
            }
            else if (lodash.isBoolean(values)) {
                config.shouldSaveParent = function () {
                    return !values;
                };
            }
            return this;
        };
        /**
           * This lets you set a suffix to every request.
           *
           * For example, if your api requires that for JSon requests you do /users/123.json, you can set that
           * in here.
           *
           *
           * By default, the suffix is null
           */
        config.suffix = lodash.isUndefined(config.suffix) ? null : config.suffix;
        object$$1.setRequestSuffix = function (newSuffix) {
            config.suffix = newSuffix;
            return this;
        };
        /**
           * Add element transformers for certain routes.
           */
        config.transformers = config.transformers || {};
        object$$1.addElementTransformer = function (type, secondArg, thirdArg) {
            var /** @type {?} */ isCollection = null;
            var /** @type {?} */ transformer = null;
            if (arguments.length === 2) {
                transformer = secondArg;
            }
            else {
                transformer = thirdArg;
                isCollection = secondArg;
            }
            var /** @type {?} */ typeTransformers = config.transformers[type];
            if (!typeTransformers) {
                typeTransformers = config.transformers[type] = [];
            }
            typeTransformers.push(function (coll, elem) {
                if (lodash.isNull(isCollection) || (coll === isCollection)) {
                    return transformer(elem);
                }
                return elem;
            });
            return object$$1;
        };
        object$$1.extendCollection = function (route, fn) {
            return object$$1.addElementTransformer(route, true, fn);
        };
        object$$1.extendModel = function (route, fn) {
            return object$$1.addElementTransformer(route, false, fn);
        };
        config.transformElem = function (elem, isCollection, route, Restangular, force) {
            if (!force && !config.transformLocalElements && !elem[config.restangularFields.fromServer]) {
                return elem;
            }
            var /** @type {?} */ typeTransformers = config.transformers[route];
            var /** @type {?} */ changedElem = elem;
            if (typeTransformers) {
                lodash.each(typeTransformers, function (transformer) {
                    changedElem = transformer(isCollection, changedElem);
                });
            }
            return config.onElemRestangularized(changedElem, isCollection, route, Restangular);
        };
        config.transformLocalElements = lodash.isUndefined(config.transformLocalElements) ?
            false :
            config.transformLocalElements;
        object$$1.setTransformOnlyServerElements = function (active) {
            config.transformLocalElements = !active;
        };
        config.fullResponse = lodash.isUndefined(config.fullResponse) ? false : config.fullResponse;
        object$$1.setFullResponse = function (full) {
            config.fullResponse = full;
            return this;
        };
        //Internal values and functions
        config.urlCreatorFactory = {};
        /**
         * Base URL Creator. Base prototype for everything related to it
         *
         */
        var /** @type {?} */ BaseCreator = function () {
        };
        BaseCreator.prototype.setConfig = function (config) {
            this.config = config;
            return this;
        };
        BaseCreator.prototype.parentsArray = function (current) {
            var /** @type {?} */ parents = [];
            while (current) {
                parents.push(current);
                current = current[this.config.restangularFields.parentResource];
            }
            return parents.reverse();
        };
        /**
         * @param {?} config
         * @param {?} $http
         * @param {?} url
         * @param {?} configurer
         * @return {?}
         */
        function RestangularResource(config, $http, url, configurer) {
            var /** @type {?} */ resource = {};
            lodash.each(lodash.keys(configurer), function (key) {
                var /** @type {?} */ value = configurer[key];
                // Add default parameters
                value.params = lodash.extend({}, value.params, config.defaultRequestParams[value.method.toLowerCase()]);
                // We don't want the ? if no params are there
                if (lodash.isEmpty(value.params)) {
                    delete value.params;
                }
                if (config.isSafe(value.method)) {
                    resource[key] = function () {
                        var /** @type {?} */ config = lodash.extend(value, {
                            url: url
                        });
                        return $http.createRequest(config);
                    };
                }
                else {
                    resource[key] = function (data) {
                        var /** @type {?} */ config = lodash.extend(value, {
                            url: url,
                            data: data
                        });
                        return $http.createRequest(config);
                    };
                }
            });
            return resource;
        }
        BaseCreator.prototype.resource = function (current, $http, localHttpConfig, callHeaders, callParams, what, etag, operation) {
            var /** @type {?} */ params = lodash.defaults(callParams || {}, this.config.defaultRequestParams.common);
            var /** @type {?} */ headers = lodash.defaults(callHeaders || {}, this.config.defaultHeaders);
            if (etag) {
                if (!config.isSafe(operation)) {
                    headers['If-Match'] = etag;
                }
                else {
                    headers['If-None-Match'] = etag;
                }
            }
            var /** @type {?} */ url = this.base(current);
            if (what) {
                var /** @type {?} */ add = '';
                if (!/\/$/.test(url)) {
                    add += '/';
                }
                add += what;
                url += add;
            }
            if (this.config.suffix &&
                url.indexOf(this.config.suffix, url.length - this.config.suffix.length) === -1 && !this.config.getUrlFromElem(current)) {
                url += this.config.suffix;
            }
            current[this.config.restangularFields.httpConfig] = undefined;
            return RestangularResource(this.config, $http, url, {
                getList: this.config.withHttpValues(localHttpConfig, {
                    method: 'GET',
                    params: params,
                    headers: headers
                }),
                get: this.config.withHttpValues(localHttpConfig, {
                    method: 'GET',
                    params: params,
                    headers: headers
                }),
                jsonp: this.config.withHttpValues(localHttpConfig, {
                    method: 'jsonp',
                    params: params,
                    headers: headers
                }),
                put: this.config.withHttpValues(localHttpConfig, {
                    method: 'PUT',
                    params: params,
                    headers: headers
                }),
                post: this.config.withHttpValues(localHttpConfig, {
                    method: 'POST',
                    params: params,
                    headers: headers
                }),
                remove: this.config.withHttpValues(localHttpConfig, {
                    method: 'DELETE',
                    params: params,
                    headers: headers
                }),
                head: this.config.withHttpValues(localHttpConfig, {
                    method: 'HEAD',
                    params: params,
                    headers: headers
                }),
                trace: this.config.withHttpValues(localHttpConfig, {
                    method: 'TRACE',
                    params: params,
                    headers: headers
                }),
                options: this.config.withHttpValues(localHttpConfig, {
                    method: 'OPTIONS',
                    params: params,
                    headers: headers
                }),
                patch: this.config.withHttpValues(localHttpConfig, {
                    method: 'PATCH',
                    params: params,
                    headers: headers
                })
            });
        };
        /**
         * This is the Path URL creator. It uses Path to show Hierarchy in the Rest API.
         * This means that if you have an Account that then has a set of Buildings, a URL to a building
         * would be /accounts/123/buildings/456
         *
         */
        var /** @type {?} */ Path = function () {
        };
        Path.prototype = new BaseCreator();
        Path.prototype.normalizeUrl = function (url) {
            var /** @type {?} */ parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
            parts[2] = parts[2].replace(/[\\\/]+/g, '/');
            return (typeof parts[1] !== 'undefined') ? parts[1] + parts[2] : parts[2];
        };
        Path.prototype.base = function (current) {
            var /** @type {?} */ __this = this;
            return lodash.reduce(this.parentsArray(current), function (acum, elem) {
                var /** @type {?} */ elemUrl;
                var /** @type {?} */ elemSelfLink = __this.config.getUrlFromElem(elem);
                if (elemSelfLink) {
                    if (__this.config.isAbsoluteUrl(elemSelfLink)) {
                        return elemSelfLink;
                    }
                    else {
                        elemUrl = elemSelfLink;
                    }
                }
                else {
                    elemUrl = elem[__this.config.restangularFields.route];
                    if (elem[__this.config.restangularFields.restangularCollection]) {
                        var /** @type {?} */ ids = elem[__this.config.restangularFields.ids];
                        if (ids) {
                            elemUrl += '/' + ids.join(',');
                        }
                    }
                    else {
                        var /** @type {?} */ elemId;
                        if (__this.config.useCannonicalId) {
                            elemId = __this.config.getCannonicalIdFromElem(elem);
                        }
                        else {
                            elemId = __this.config.getIdFromElem(elem);
                        }
                        if (config.isValidId(elemId) && !elem.singleOne) {
                            elemUrl += '/' + (__this.config.encodeIds ? encodeURIComponent(elemId) : elemId);
                        }
                    }
                }
                acum = acum.replace(/\/$/, '') + '/' + elemUrl;
                return __this.normalizeUrl(acum);
            }, this.config.baseUrl);
        };
        Path.prototype.fetchUrl = function (current, what) {
            var /** @type {?} */ baseUrl = this.base(current);
            if (what) {
                baseUrl += '/' + what;
            }
            return baseUrl;
        };
        Path.prototype.fetchRequestedUrl = function (current, what) {
            var /** @type {?} */ url = this.fetchUrl(current, what);
            var /** @type {?} */ params = current[config.restangularFields.reqParams];
            /**
             * @param {?} obj
             * @return {?}
             */
            function sortedKeys(obj) {
                var /** @type {?} */ keys = [];
                for (var /** @type {?} */ key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }
                return keys.sort();
            }
            /**
             * @param {?} obj
             * @param {?=} iterator
             * @param {?=} context
             * @return {?}
             */
            function forEachSorted(obj, iterator, context) {
                var /** @type {?} */ keys = sortedKeys(obj);
                for (var /** @type {?} */ i = 0; i < keys.length; i++) {
                    iterator.call(context, obj[keys[i]], keys[i]);
                }
                return keys;
            }
            /**
             * @param {?} val
             * @param {?=} pctEncodeSpaces
             * @return {?}
             */
            function encodeUriQuery(val, pctEncodeSpaces) {
                return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
            }
            if (!params) {
                return url + (this.config.suffix || '');
            }
            var /** @type {?} */ parts = [];
            forEachSorted(params, function (value, key) {
                if (value === null || value === undefined) {
                    return;
                }
                if (!lodash.isArray(value)) {
                    value = [value];
                }
                lodash.forEach(value, function (v) {
                    if (lodash.isObject(v)) {
                        v = JSON.stringify(v);
                    }
                    parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
                });
            });
            return url + (this.config.suffix || '') + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
        };
        config.urlCreatorFactory.path = Path;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Restangular = (function () {
        function Restangular(configObj, injector, http$$1) {
            this.configObj = configObj;
            this.injector = injector;
            this.http = http$$1;
            this.provider = new providerConfig(http$$1);
            var /** @type {?} */ element = this.provider.$get();
            object.assign(this, element);
            this.setDefaultConfig();
        }
        /**
         * @return {?}
         */
        Restangular.prototype.setDefaultConfig = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.configObj || !lodash.isFunction(this.configObj.fn)) {
                    return;
                }
                var /** @type {?} */ arrDI = lodash.map(this.configObj.arrServices, function (services) {
                    return _this.injector.get(services);
                });
                (_a = this.configObj).fn.apply(_a, tslib_1.__spread([this.provider], arrDI));
                var _a;
            };
        Restangular.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Restangular.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [RESTANGULAR,] },] },
                { type: core.Injector, },
                { type: RestangularHttp, },
            ];
        };
        return Restangular;
    }());
    /**
     * @param {?} $http
     * @return {?}
     */
    function providerConfig($http) {
        var /** @type {?} */ globalConfiguration = {};
        RestangularConfigurer(this, globalConfiguration);
        this.$get = $get;
        /**
         * @return {?}
         */
        function $get() {
            /**
             * @param {?} config
             * @return {?}
             */
            function createServiceForConfiguration(config) {
                var /** @type {?} */ service = {};
                var /** @type {?} */ urlHandler = new config.urlCreatorFactory[config.urlCreator]();
                urlHandler.setConfig(config);
                /**
                 * @param {?} parent
                 * @param {?} elem
                 * @param {?} route
                 * @param {?} reqParams
                 * @param {?} fromServer
                 * @return {?}
                 */
                function restangularizeBase(parent, elem, route, reqParams, fromServer) {
                    elem[config.restangularFields.route] = route;
                    elem[config.restangularFields.getRestangularUrl] = lodash.bind(urlHandler.fetchUrl, urlHandler, elem);
                    elem[config.restangularFields.getRequestedUrl] = lodash.bind(urlHandler.fetchRequestedUrl, urlHandler, elem);
                    elem[config.restangularFields.addRestangularMethod] = lodash.bind(addRestangularMethodFunction, elem);
                    elem[config.restangularFields.clone] = lodash.bind(copyRestangularizedElement, elem);
                    elem[config.restangularFields.reqParams] = lodash.isEmpty(reqParams) ? null : reqParams;
                    elem[config.restangularFields.withHttpConfig] = lodash.bind(withHttpConfig, elem);
                    elem[config.restangularFields.plain] = lodash.bind(stripRestangular, elem, elem);
                    // Tag element as restangularized
                    elem[config.restangularFields.restangularized] = true;
                    // RequestLess connection
                    elem[config.restangularFields.one] = lodash.bind(one, elem, elem);
                    elem[config.restangularFields.all] = lodash.bind(all, elem, elem);
                    elem[config.restangularFields.several] = lodash.bind(several, elem, elem);
                    elem[config.restangularFields.oneUrl] = lodash.bind(oneUrl, elem, elem);
                    elem[config.restangularFields.allUrl] = lodash.bind(allUrl, elem, elem);
                    elem[config.restangularFields.fromServer] = !!fromServer;
                    if (parent && config.shouldSaveParent(route)) {
                        var /** @type {?} */ parentId = config.getIdFromElem(parent);
                        var /** @type {?} */ parentUrl = config.getUrlFromElem(parent);
                        var /** @type {?} */ restangularFieldsForParent = lodash.union(lodash.values(lodash.pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])), config.extraFields);
                        var /** @type {?} */ parentResource = lodash.pick(parent, restangularFieldsForParent);
                        if (config.isValidId(parentId)) {
                            config.setIdToElem(parentResource, parentId, route);
                        }
                        if (config.isValidId(parentUrl)) {
                            config.setUrlToElem(parentResource, parentUrl, route);
                        }
                        elem[config.restangularFields.parentResource] = parentResource;
                    }
                    else {
                        elem[config.restangularFields.parentResource] = null;
                    }
                    return elem;
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @param {?} id
                 * @param {?} singleOne
                 * @return {?}
                 */
                function one(parent, route, id, singleOne) {
                    var /** @type {?} */ error;
                    if (lodash.isNumber(route) || lodash.isNumber(parent)) {
                        error = 'You\'re creating a Restangular entity with the number ';
                        error += 'instead of the route or the parent. For example, you can\'t call .one(12).';
                        throw new Error(error);
                    }
                    if (lodash.isUndefined(route)) {
                        error = 'You\'re creating a Restangular entity either without the path. ';
                        error += 'For example you can\'t call .one(). Please check if your arguments are valid.';
                        throw new Error(error);
                    }
                    var /** @type {?} */ elem = {};
                    config.setIdToElem(elem, id, route);
                    config.setFieldToElem(config.restangularFields.singleOne, elem, singleOne);
                    return restangularizeElem(parent, elem, route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @return {?}
                 */
                function all(parent, route) {
                    return restangularizeCollection(parent, [], route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @return {?}
                 */
                function several(parent, route /*, ids */) {
                    var /** @type {?} */ collection = [];
                    collection[config.restangularFields.ids] = Array.prototype.splice.call(arguments, 2);
                    return restangularizeCollection(parent, collection, route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @param {?} url
                 * @return {?}
                 */
                function oneUrl(parent, route, url) {
                    if (!route) {
                        throw new Error('Route is mandatory when creating new Restangular objects.');
                    }
                    var /** @type {?} */ elem = {};
                    config.setUrlToElem(elem, url, route);
                    return restangularizeElem(parent, elem, route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @param {?} url
                 * @return {?}
                 */
                function allUrl(parent, route, url) {
                    if (!route) {
                        throw new Error('Route is mandatory when creating new Restangular objects.');
                    }
                    var /** @type {?} */ elem = {};
                    config.setUrlToElem(elem, url, route);
                    return restangularizeCollection(parent, elem, route, false);
                }
                /**
                 * @param {?} subject
                 * @param {?} isCollection
                 * @param {?} valueToFill
                 * @return {?}
                 */
                function restangularizeResponse(subject, isCollection, valueToFill) {
                    return subject.pipe(operators.filter(function (res) { return !!res; })).toPromise();
                }
                /**
                 * @param {?} subject
                 * @param {?} response
                 * @param {?} data
                 * @param {?} filledValue
                 * @return {?}
                 */
                function resolvePromise(subject, response, data, filledValue) {
                    lodash.extend(filledValue, data);
                    // Trigger the full response interceptor.
                    if (config.fullResponse) {
                        subject.next(lodash.extend(response, {
                            data: data
                        }));
                    }
                    else {
                        subject.next(data);
                    }
                    subject.complete();
                }
                /**
                 * @param {?} elem
                 * @return {?}
                 */
                function stripRestangular(elem) {
                    if (lodash.isArray(elem)) {
                        var /** @type {?} */ array = [];
                        lodash.each(elem, function (value) {
                            array.push(config.isRestangularized(value) ? stripRestangular(value) : value);
                        });
                        return array;
                    }
                    else {
                        return lodash.omit(elem, lodash.values(lodash.omit(config.restangularFields, 'id')));
                    }
                }
                /**
                 * @param {?} elem
                 * @return {?}
                 */
                function addCustomOperation(elem) {
                    elem[config.restangularFields.customOperation] = lodash.bind(customFunction, elem);
                    var /** @type {?} */ requestMethods = { get: customFunction, delete: customFunction };
                    lodash.each(['put', 'patch', 'post'], function (name) {
                        requestMethods[name] = function (operation, elem, path, params, headers) {
                            return lodash.bind(customFunction, this)(operation, path, params, headers, elem);
                        };
                    });
                    lodash.each(requestMethods, function (requestFunc, name) {
                        var /** @type {?} */ callOperation = name === 'delete' ? 'remove' : name;
                        lodash.each(['do', 'custom'], function (alias) {
                            elem[alias + name.toUpperCase()] = lodash.bind(requestFunc, elem, callOperation);
                        });
                    });
                    elem[config.restangularFields.customGETLIST] = lodash.bind(fetchFunction, elem);
                    elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
                }
                /**
                 * @param {?} element
                 * @return {?}
                 */
                function copyRestangularizedElement(element) {
                    var /** @type {?} */ copiedElement = lodash.cloneDeep(element);
                    return restangularizeElem(copiedElement[config.restangularFields.parentResource], copiedElement, copiedElement[config.restangularFields.route], true);
                }
                /**
                 * @param {?} parent
                 * @param {?} element
                 * @param {?} route
                 * @param {?=} fromServer
                 * @param {?=} collection
                 * @param {?=} reqParams
                 * @return {?}
                 */
                function restangularizeElem(parent, element, route, fromServer, collection, reqParams) {
                    var /** @type {?} */ elem = config.onBeforeElemRestangularized(element, false, route);
                    var /** @type {?} */ localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
                    if (config.useCannonicalId) {
                        localElem[config.restangularFields.cannonicalId] = config.getIdFromElem(localElem);
                    }
                    if (collection) {
                        localElem[config.restangularFields.getParentList] = function () {
                            return collection;
                        };
                    }
                    localElem[config.restangularFields.restangularCollection] = false;
                    localElem[config.restangularFields.get] = lodash.bind(getFunction, localElem);
                    localElem[config.restangularFields.getList] = lodash.bind(fetchFunction, localElem);
                    localElem[config.restangularFields.put] = lodash.bind(putFunction, localElem);
                    localElem[config.restangularFields.post] = lodash.bind(postFunction, localElem);
                    localElem[config.restangularFields.remove] = lodash.bind(deleteFunction, localElem);
                    localElem[config.restangularFields.head] = lodash.bind(headFunction, localElem);
                    localElem[config.restangularFields.trace] = lodash.bind(traceFunction, localElem);
                    localElem[config.restangularFields.options] = lodash.bind(optionsFunction, localElem);
                    localElem[config.restangularFields.patch] = lodash.bind(patchFunction, localElem);
                    localElem[config.restangularFields.save] = lodash.bind(save, localElem);
                    addCustomOperation(localElem);
                    return config.transformElem(localElem, false, route, service, true);
                }
                /**
                 * @param {?} parent
                 * @param {?} element
                 * @param {?} route
                 * @param {?=} fromServer
                 * @param {?=} reqParams
                 * @return {?}
                 */
                function restangularizeCollection(parent, element, route, fromServer, reqParams) {
                    var /** @type {?} */ elem = config.onBeforeElemRestangularized(element, true, route);
                    var /** @type {?} */ localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
                    localElem[config.restangularFields.restangularCollection] = true;
                    localElem[config.restangularFields.post] = lodash.bind(postFunction, localElem, null);
                    localElem[config.restangularFields.remove] = lodash.bind(deleteFunction, localElem);
                    localElem[config.restangularFields.head] = lodash.bind(headFunction, localElem);
                    localElem[config.restangularFields.trace] = lodash.bind(traceFunction, localElem);
                    localElem[config.restangularFields.putElement] = lodash.bind(putElementFunction, localElem);
                    localElem[config.restangularFields.options] = lodash.bind(optionsFunction, localElem);
                    localElem[config.restangularFields.patch] = lodash.bind(patchFunction, localElem);
                    localElem[config.restangularFields.get] = lodash.bind(getById, localElem);
                    localElem[config.restangularFields.getList] = lodash.bind(fetchFunction, localElem, null);
                    addCustomOperation(localElem);
                    return config.transformElem(localElem, true, route, service, true);
                }
                /**
                 * @param {?} parent
                 * @param {?} element
                 * @param {?} route
                 * @return {?}
                 */
                function restangularizeCollectionAndElements(parent, element, route) {
                    var /** @type {?} */ collection = restangularizeCollection(parent, element, route, false);
                    lodash.each(collection, function (elem) {
                        if (elem) {
                            restangularizeElem(parent, elem, route, false);
                        }
                    });
                    return collection;
                }
                /**
                 * @param {?} id
                 * @param {?} reqParams
                 * @param {?} headers
                 * @return {?}
                 */
                function getById(id, reqParams, headers) {
                    return this.customGET(id.toString(), reqParams, headers);
                }
                /**
                 * @param {?} idx
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function putElementFunction(idx, params, headers) {
                    var /** @type {?} */ __this = this;
                    var /** @type {?} */ elemToPut = this[idx];
                    var /** @type {?} */ subject = new rxjs.BehaviorSubject(null);
                    var /** @type {?} */ filledArray = [];
                    filledArray = config.transformElem(filledArray, true, elemToPut[config.restangularFields.route], service);
                    elemToPut.put(params, headers)
                        .subscribe(function (serverElem) {
                        var /** @type {?} */ newArray = copyRestangularizedElement(__this);
                        newArray[idx] = serverElem;
                        filledArray = newArray;
                        subject.next(newArray);
                    }, function (response) {
                        subject.error(response);
                    }, function () {
                        subject.complete();
                    });
                    return restangularizeResponse(subject, true, filledArray);
                }
                /**
                 * @param {?} resData
                 * @param {?} operation
                 * @param {?} route
                 * @param {?} fetchUrl
                 * @param {?} response
                 * @param {?} subject
                 * @return {?}
                 */
                function parseResponse(resData, operation, route, fetchUrl, response, subject) {
                    var /** @type {?} */ data = config.responseExtractor(resData, operation, route, fetchUrl, response, subject);
                    var /** @type {?} */ etag = response.headers.get('ETag');
                    if (data && etag) {
                        data[config.restangularFields.etag] = etag;
                    }
                    return data;
                }
                /**
                 * @param {?} what
                 * @param {?} reqParams
                 * @param {?} headers
                 * @return {?}
                 */
                function fetchFunction(what, reqParams, headers) {
                    var /** @type {?} */ __this = this;
                    var /** @type {?} */ subject = new rxjs.BehaviorSubject(null);
                    var /** @type {?} */ operation = 'getList';
                    var /** @type {?} */ url = urlHandler.fetchUrl(this, what);
                    var /** @type {?} */ whatFetched = what || __this[config.restangularFields.route];
                    var /** @type {?} */ request = config.fullRequestInterceptor(null, operation, whatFetched, url, headers || {}, reqParams || {}, this[config.restangularFields.httpConfig] || {});
                    var /** @type {?} */ filledArray = [];
                    filledArray = config.transformElem(filledArray, true, whatFetched, service);
                    var /** @type {?} */ method = 'getList';
                    if (config.jsonp) {
                        method = 'jsonp';
                    }
                    var /** @type {?} */ okCallback = function (response) {
                        var /** @type {?} */ resData = response.body;
                        var /** @type {?} */ fullParams = response.config.params;
                        var /** @type {?} */ data = parseResponse(resData, operation, whatFetched, url, response, subject);
                        // support empty response for getList() calls (some APIs respond with 204 and empty body)
                        if (lodash.isUndefined(data) || '' === data) {
                            data = [];
                        }
                        if (!lodash.isArray(data)) {
                            throw new Error('Response for getList SHOULD be an array and not an object or something else');
                        }
                        if (true === config.plainByDefault) {
                            return resolvePromise(subject, response, data, filledArray);
                        }
                        var /** @type {?} */ processedData = lodash.map(data, function (elem) {
                            if (!__this[config.restangularFields.restangularCollection]) {
                                return restangularizeElem(__this, elem, what, true, data);
                            }
                            else {
                                return restangularizeElem(__this[config.restangularFields.parentResource], elem, __this[config.restangularFields.route], true, data);
                            }
                        });
                        processedData = lodash.extend(data, processedData);
                        if (!__this[config.restangularFields.restangularCollection]) {
                            resolvePromise(subject, response, restangularizeCollection(__this, processedData, what, true, fullParams), filledArray);
                        }
                        else {
                            resolvePromise(subject, response, restangularizeCollection(__this[config.restangularFields.parentResource], processedData, __this[config.restangularFields.route], true, fullParams), filledArray);
                        }
                    };
                    urlHandler.resource(this, $http, request.httpConfig, request.headers, request.params, what, this[config.restangularFields.etag], operation)[method]()
                        .subscribe(okCallback, function error(response) {
                        if (response.status === 304 && __this[config.restangularFields.restangularCollection]) {
                            resolvePromise(subject, response, __this, filledArray);
                        }
                        else if (lodash.every(config.errorInterceptors, function (cb) {
                            return cb(response, subject, okCallback) !== false;
                        })) {
                            // triggered if no callback returns false
                            subject.error(response);
                        }
                    });
                    return restangularizeResponse(subject, true, filledArray);
                }
                /**
                 * @param {?} httpConfig
                 * @return {?}
                 */
                function withHttpConfig(httpConfig) {
                    this[config.restangularFields.httpConfig] = httpConfig;
                    return this;
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function save(params, headers) {
                    if (this[config.restangularFields.fromServer]) {
                        return this[config.restangularFields.put](params, headers);
                    }
                    else {
                        return lodash.bind(elemFunction, this)('post', undefined, params, undefined, headers);
                    }
                }
                /**
                 * @param {?} operation
                 * @param {?} what
                 * @param {?} params
                 * @param {?} obj
                 * @param {?} headers
                 * @return {?}
                 */
                function elemFunction(operation, what, params, obj, headers) {
                    var /** @type {?} */ __this = this;
                    var /** @type {?} */ subject = new rxjs.BehaviorSubject(null);
                    var /** @type {?} */ resParams = params || {};
                    var /** @type {?} */ route = what || this[config.restangularFields.route];
                    var /** @type {?} */ fetchUrl = urlHandler.fetchUrl(this, what);
                    var /** @type {?} */ callObj = obj || this;
                    // fallback to etag on restangular object (since for custom methods we probably don't explicitly specify the etag field)
                    var /** @type {?} */ etag = callObj[config.restangularFields.etag] || (operation !== 'post' ? this[config.restangularFields.etag] : null);
                    if (lodash.isObject(callObj) && config.isRestangularized(callObj)) {
                        callObj = stripRestangular(callObj);
                    }
                    var /** @type {?} */ request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl, headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});
                    var /** @type {?} */ filledObject = {};
                    filledObject = config.transformElem(filledObject, false, route, service);
                    var /** @type {?} */ okCallback = function (response) {
                        var /** @type {?} */ resData = lodash.get(response, 'body');
                        var /** @type {?} */ fullParams = lodash.get(response, 'config.params');
                        var /** @type {?} */ elem = parseResponse(resData, operation, route, fetchUrl, response, subject);
                        if (elem) {
                            var /** @type {?} */ data;
                            if (true === config.plainByDefault) {
                                return resolvePromise(subject, response, elem, filledObject);
                            }
                            if (operation === 'post' && !__this[config.restangularFields.restangularCollection]) {
                                data = restangularizeElem(__this[config.restangularFields.parentResource], elem, route, true, null, fullParams);
                                resolvePromise(subject, response, data, filledObject);
                            }
                            else {
                                data = restangularizeElem(__this[config.restangularFields.parentResource], elem, __this[config.restangularFields.route], true, null, fullParams);
                                data[config.restangularFields.singleOne] = __this[config.restangularFields.singleOne];
                                resolvePromise(subject, response, data, filledObject);
                            }
                        }
                        else {
                            resolvePromise(subject, response, undefined, filledObject);
                        }
                    };
                    var /** @type {?} */ errorCallback = function (response) {
                        if (response.status === 304 && config.isSafe(operation)) {
                            resolvePromise(subject, response, __this, filledObject);
                        }
                        else if (lodash.every(config.errorInterceptors, function (cb) {
                            return cb(response, subject, okCallback) !== false;
                        })) {
                            // triggered if no callback returns false
                            subject.error(response);
                        }
                    };
                    // Overriding HTTP Method
                    var /** @type {?} */ callOperation = operation;
                    var /** @type {?} */ callHeaders = lodash.extend({}, request.headers);
                    var /** @type {?} */ isOverrideOperation = config.isOverridenMethod(operation);
                    if (isOverrideOperation) {
                        callOperation = 'post';
                        callHeaders = lodash.extend(callHeaders, { 'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase() });
                    }
                    else if (config.jsonp && callOperation === 'get') {
                        callOperation = 'jsonp';
                    }
                    if (config.isSafe(operation)) {
                        if (isOverrideOperation) {
                            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params, what, etag, callOperation)[callOperation]({}).subscribe(okCallback, errorCallback);
                        }
                        else {
                            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params, what, etag, callOperation)[callOperation]().subscribe(okCallback, errorCallback);
                        }
                    }
                    else {
                        urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params, what, etag, callOperation)[callOperation](request.element).subscribe(okCallback, errorCallback);
                    }
                    return restangularizeResponse(subject, false, filledObject);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function getFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('get', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function deleteFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('remove', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function putFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('put', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} what
                 * @param {?} elem
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function postFunction(what, elem, params, headers) {
                    return lodash.bind(elemFunction, this)('post', what, params, elem, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function headFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('head', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function traceFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('trace', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function optionsFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('options', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} elem
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function patchFunction(elem, params, headers) {
                    return lodash.bind(elemFunction, this)('patch', undefined, params, elem, headers);
                }
                /**
                 * @param {?} operation
                 * @param {?} path
                 * @param {?} params
                 * @param {?} headers
                 * @param {?} elem
                 * @return {?}
                 */
                function customFunction(operation, path, params, headers, elem) {
                    return lodash.bind(elemFunction, this)(operation, path, params, elem, headers);
                }
                /**
                 * @param {?} name
                 * @param {?} operation
                 * @param {?} path
                 * @param {?} defaultParams
                 * @param {?} defaultHeaders
                 * @param {?} defaultElem
                 * @return {?}
                 */
                function addRestangularMethodFunction(name, operation, path, defaultParams, defaultHeaders, defaultElem) {
                    var /** @type {?} */ bindedFunction;
                    if (operation === 'getList') {
                        bindedFunction = lodash.bind(fetchFunction, this, path);
                    }
                    else {
                        bindedFunction = lodash.bind(customFunction, this, operation, path);
                    }
                    var /** @type {?} */ createdFunction = function (params, headers, elem) {
                        var /** @type {?} */ callParams = lodash.defaults({
                            params: params,
                            headers: headers,
                            elem: elem
                        }, {
                            params: defaultParams,
                            headers: defaultHeaders,
                            elem: defaultElem
                        });
                        return bindedFunction(callParams.params, callParams.headers, callParams.elem);
                    };
                    if (config.isSafe(operation)) {
                        this[name] = createdFunction;
                    }
                    else {
                        this[name] = function (elem, params, headers) {
                            return createdFunction(params, headers, elem);
                        };
                    }
                }
                /**
                 * @param {?} configurer
                 * @return {?}
                 */
                function withConfigurationFunction(configurer) {
                    var /** @type {?} */ newConfig = lodash.clone(lodash.omit(config, 'configuration'));
                    RestangularConfigurer(newConfig, newConfig);
                    configurer(newConfig);
                    return createServiceForConfiguration(newConfig);
                }
                /**
                 * @param {?} route
                 * @param {?} parent
                 * @return {?}
                 */
                function toService(route, parent) {
                    var /** @type {?} */ knownCollectionMethods = lodash.values(config.restangularFields);
                    var /** @type {?} */ serv = {};
                    var /** @type {?} */ collection = (parent || service).all(route);
                    serv.one = lodash.bind(one, (parent || service), parent, route);
                    serv.all = lodash.bind(collection.all, collection);
                    serv.post = lodash.bind(collection.post, collection);
                    serv.getList = lodash.bind(collection.getList, collection);
                    serv.withHttpConfig = lodash.bind(collection.withHttpConfig, collection);
                    serv.get = lodash.bind(collection.get, collection);
                    for (var /** @type {?} */ prop in collection) {
                        if (collection.hasOwnProperty(prop) && lodash.isFunction(collection[prop]) && !lodash.includes(knownCollectionMethods, prop)) {
                            serv[prop] = lodash.bind(collection[prop], collection);
                        }
                    }
                    return serv;
                }
                RestangularConfigurer(service, config);
                service.copy = lodash.bind(copyRestangularizedElement, service);
                service.service = lodash.bind(toService, service);
                service.withConfig = lodash.bind(withConfigurationFunction, service);
                service.one = lodash.bind(one, service, null);
                service.all = lodash.bind(all, service, null);
                service.several = lodash.bind(several, service, null);
                service.oneUrl = lodash.bind(oneUrl, service, null);
                service.allUrl = lodash.bind(allUrl, service, null);
                service.stripRestangular = lodash.bind(stripRestangular, service);
                service.restangularizeElement = lodash.bind(restangularizeElem, service);
                service.restangularizeCollection = lodash.bind(restangularizeCollectionAndElements, service);
                return service;
            }
            return createServiceForConfiguration(globalConfiguration);
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ CONFIG_OBJ = new core.InjectionToken('configObj');
    var RestangularModule = (function () {
        function RestangularModule(parentModule) {
            if (parentModule) {
                throw new Error('RestangularModule is already loaded. Import it in the AppModule only');
            }
        }
        /**
         * @param {?=} config1
         * @param {?=} config2
         * @return {?}
         */
        RestangularModule.forRoot = /**
         * @param {?=} config1
         * @param {?=} config2
         * @return {?}
         */
            function (config1, config2) {
                return {
                    ngModule: RestangularModule,
                    providers: [
                        { provide: CONFIG_OBJ, useValue: [config1, config2] },
                        { provide: RESTANGULAR, useFactory: RestangularFactory, deps: [CONFIG_OBJ] },
                    ]
                };
            };
        RestangularModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [http.HttpClientModule],
                        providers: [RestangularHttp, Restangular]
                    },] },
        ];
        /** @nocollapse */
        RestangularModule.ctorParameters = function () {
            return [
                { type: RestangularModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf },] },
            ];
        };
        return RestangularModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.RestangularModule = RestangularModule;
    exports.Restangular = Restangular;
    exports.RestangularHttp = RestangularHttp;
    exports.ɵb = RESTANGULAR;
    exports.ɵc = RestangularFactory;
    exports.ɵa = CONFIG_OBJ;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXJlc3Rhbmd1bGFyL2xpYi9uZ3gtcmVzdGFuZ3VsYXIuY29uZmlnLnRzIiwibmc6Ly9uZ3gtcmVzdGFuZ3VsYXIvbGliL25neC1yZXN0YW5ndWxhci1oZWxwZXIudHMiLCJuZzovL25neC1yZXN0YW5ndWxhci9saWIvbmd4LXJlc3Rhbmd1bGFyLWh0dHAudHMiLCJuZzovL25neC1yZXN0YW5ndWxhci9saWIvbmd4LXJlc3Rhbmd1bGFyLWNvbmZpZy5mYWN0b3J5LnRzIiwibmc6Ly9uZ3gtcmVzdGFuZ3VsYXIvbGliL25neC1yZXN0YW5ndWxhci50cyIsIm5nOi8vbmd4LXJlc3Rhbmd1bGFyL2xpYi9uZ3gtcmVzdGFuZ3VsYXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cblxuZXhwb3J0IGNvbnN0IFJFU1RBTkdVTEFSID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ3Jlc3Rhbmd1bGFyV2l0aENvbmZpZycpO1xuZXhwb3J0IGZ1bmN0aW9uIFJlc3Rhbmd1bGFyRmFjdG9yeShjb25maWcpIHtcbiAgbGV0IGNvbmZpZ09iaiA9IHtcbiAgICBmbjogY29uZmlnWzBdLFxuICAgIGFyclNlcnZpY2VzOiBbXSxcbiAgfTtcblxuICBpZiAoaXNBcnJheShjb25maWdbMF0pKSB7XG4gICAgY29uZmlnT2JqID0ge1xuICAgICAgYXJyU2VydmljZXM6IGNvbmZpZ1swXSxcbiAgICAgIGZuOiBjb25maWdbMV1cbiAgICB9O1xuICB9XG4gIHJldHVybiBjb25maWdPYmo7XG59XG4iLCJpbXBvcnQge0h0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge2Fzc2lnbn0gZnJvbSAnY29yZS1qcy9mbi9vYmplY3QnO1xuXG5leHBvcnQgY2xhc3MgUmVzdGFuZ3VsYXJIZWxwZXIge1xuXG4gIHN0YXRpYyBjcmVhdGVSZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICBsZXQgcmVxdWVzdFF1ZXJ5UGFyYW1zID0gUmVzdGFuZ3VsYXJIZWxwZXIuY3JlYXRlUmVxdWVzdFF1ZXJ5UGFyYW1zKG9wdGlvbnMucGFyYW1zKTtcbiAgICBsZXQgcmVxdWVzdEhlYWRlcnMgPSBSZXN0YW5ndWxhckhlbHBlci5jcmVhdGVSZXF1ZXN0SGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICAgIGxldCBtZXRob2ROYW1lID0gb3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgd2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgfHwgZmFsc2U7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdChcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBvcHRpb25zLnVybCxcbiAgICAgIG9wdGlvbnMuZGF0YSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgIHBhcmFtczogcmVxdWVzdFF1ZXJ5UGFyYW1zLFxuICAgICAgICByZXNwb25zZVR5cGU6IG9wdGlvbnMucmVzcG9uc2VUeXBlLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHNcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYoWydHRVQnLCAnREVMRVRFJywgJ0hFQUQnLCAnSlNPTlAnLCAnT1BUSU9OUyddLmluZGV4T2YobWV0aG9kTmFtZSkgPj0gMCkge1xuICAgICAgcmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdChcbiAgICAgICAgbWV0aG9kTmFtZSxcbiAgICAgICAgb3B0aW9ucy51cmwsXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgICBwYXJhbXM6IHJlcXVlc3RRdWVyeVBhcmFtcyxcbiAgICAgICAgICByZXNwb25zZVR5cGU6IG9wdGlvbnMucmVzcG9uc2VUeXBlLFxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsc1xuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVJlcXVlc3RRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcykge1xuICAgIGxldCByZXF1ZXN0UXVlcnlQYXJhbXMgPSBhc3NpZ24oe30sIHF1ZXJ5UGFyYW1zKTtcbiAgICBsZXQgc2VhcmNoOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgIGZvciAobGV0IGtleSBpbiByZXF1ZXN0UXVlcnlQYXJhbXMpIHtcbiAgICAgIGxldCB2YWx1ZTogYW55ID0gcmVxdWVzdFF1ZXJ5UGFyYW1zW2tleV07XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgc2VhcmNoID0gc2VhcmNoLmFwcGVuZChrZXksIHZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2ggPSBzZWFyY2guYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVSZXF1ZXN0SGVhZGVycyhoZWFkZXJzKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgIGxldCB2YWx1ZTogYW55ID0gaGVhZGVyc1trZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKGFzc2lnbih7fSwgaGVhZGVycykpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQmFja2VuZCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzdGFuZ3VsYXJIZWxwZXIgfSBmcm9tICcuL25neC1yZXN0YW5ndWxhci1oZWxwZXInO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0h0dHBFdmVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAvc3JjL3Jlc3BvbnNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc3Rhbmd1bGFySHR0cCB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBCYWNrZW5kKSB7XG4gIH1cblxuICBjcmVhdGVSZXF1ZXN0KG9wdGlvbnMpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IFJlc3Rhbmd1bGFySGVscGVyLmNyZWF0ZVJlcXVlc3Qob3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHJlcXVlc3QpO1xuICB9XG5cbiAgcmVxdWVzdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuaGFuZGxlKHJlcXVlc3QpXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpLFxuICAgICAgbWFwKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgSHR0cEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KSxcbiAgICAgIG1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLmNvbmZpZyA9IHtwYXJhbXM6IHJlcXVlc3R9O1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBlcnIuZGF0YSA9IGVyci5lcnJvcjtcbiAgICAgICAgZXJyLnJlcGVhdFJlcXVlc3QgPSAobmV3UmVxdWVzdD8pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG5ld1JlcXVlc3QgfHwgcmVxdWVzdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQge1xuICBpbmNsdWRlcyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzTnVsbCxcbiAgaXNBcnJheSxcbiAgaXNPYmplY3QsXG4gIGlzQm9vbGVhbixcbiAgZGVmYXVsdHMsXG4gIGVhY2gsXG4gIGV4dGVuZCxcbiAgZmluZCxcbiAgaGFzLFxuICBpbml0aWFsLFxuICBsYXN0LFxuICBjbG9uZSxcbiAgcmVkdWNlLFxuICBrZXlzLFxuICBpc0VtcHR5LFxuICBmb3JFYWNoLFxufSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVzdGFuZ3VsYXJDb25maWd1cmVyKG9iamVjdCwgY29uZmlnKXtcbiAgb2JqZWN0LmNvbmZpZ3VyYXRpb24gPSBjb25maWc7XG5cbiAgLyoqXG4gICAqIFRob3NlIGFyZSBIVFRQIHNhZmUgbWV0aG9kcyBmb3Igd2hpY2ggdGhlcmUgaXMgbm8gbmVlZCB0byBwYXNzIGFueSBkYXRhIHdpdGggdGhlIHJlcXVlc3QuXG4gICAqL1xuICB2YXIgc2FmZU1ldGhvZHMgPSBbJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnLCAndHJhY2UnLCAnZ2V0bGlzdCddO1xuICBjb25maWcuaXNTYWZlID0gZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgIHJldHVybiBpbmNsdWRlcyhzYWZlTWV0aG9kcywgb3BlcmF0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xuXG4gIHZhciBhYnNvbHV0ZVBhdHRlcm4gPSAvXmh0dHBzPzpcXC9cXC8vaTtcbiAgY29uZmlnLmlzQWJzb2x1dGVVcmwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGNvbmZpZy5hYnNvbHV0ZVVybCkgfHwgaXNOdWxsKGNvbmZpZy5hYnNvbHV0ZVVybCkgP1xuICAgIHN0cmluZyAmJiBhYnNvbHV0ZVBhdHRlcm4udGVzdChzdHJpbmcpIDpcbiAgICAgIGNvbmZpZy5hYnNvbHV0ZVVybDtcbiAgfTtcblxuICBjb25maWcuYWJzb2x1dGVVcmwgPSBpc1VuZGVmaW5lZChjb25maWcuYWJzb2x1dGVVcmwpID8gdHJ1ZSA6IGNvbmZpZy5hYnNvbHV0ZVVybDtcbiAgb2JqZWN0LnNldFNlbGZMaW5rQWJzb2x1dGVVcmwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBjb25maWcuYWJzb2x1dGVVcmwgPSB2YWx1ZTtcbiAgfTtcbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIEJhc2VVUkwgdG8gYmUgdXNlZCB3aXRoIFJlc3Rhbmd1bGFyXG4gICAqL1xuICBjb25maWcuYmFzZVVybCA9IGlzVW5kZWZpbmVkKGNvbmZpZy5iYXNlVXJsKSA/ICcnIDogY29uZmlnLmJhc2VVcmw7XG4gIG9iamVjdC5zZXRCYXNlVXJsID0gZnVuY3Rpb24gKG5ld0Jhc2VVcmwpIHtcbiAgICBjb25maWcuYmFzZVVybCA9IC9cXC8kLy50ZXN0KG5ld0Jhc2VVcmwpID9cbiAgICAgIG5ld0Jhc2VVcmwuc3Vic3RyaW5nKDAsIG5ld0Jhc2VVcmwubGVuZ3RoIC0gMSkgOlxuICAgICAgbmV3QmFzZVVybDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgZXh0cmEgZmllbGRzIHRvIGtlZXAgZnJvbSB0aGUgcGFyZW50c1xuICAgKi9cbiAgY29uZmlnLmV4dHJhRmllbGRzID0gY29uZmlnLmV4dHJhRmllbGRzIHx8IFtdO1xuICBvYmplY3Quc2V0RXh0cmFGaWVsZHMgPSBmdW5jdGlvbiAobmV3RXh0cmFGaWVsZHMpIHtcbiAgICBjb25maWcuZXh0cmFGaWVsZHMgPSBuZXdFeHRyYUZpZWxkcztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU29tZSBkZWZhdWx0ICRodHRwIHBhcmFtZXRlciB0byBiZSB1c2VkIGluIEVWRVJZIGNhbGxcbiAgICoqL1xuICBjb25maWcuZGVmYXVsdEh0dHBGaWVsZHMgPSBjb25maWcuZGVmYXVsdEh0dHBGaWVsZHMgfHwge307XG4gIG9iamVjdC5zZXREZWZhdWx0SHR0cEZpZWxkcyA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBjb25maWcuZGVmYXVsdEh0dHBGaWVsZHMgPSB2YWx1ZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFsd2F5cyByZXR1cm4gcGxhaW4gZGF0YSwgbm8gcmVzdGFuZ3VsYXJpemVkIG9iamVjdFxuICAgKiovXG4gIGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCA9IGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCB8fCBmYWxzZTtcbiAgb2JqZWN0LnNldFBsYWluQnlEZWZhdWx0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgY29uZmlnLnBsYWluQnlEZWZhdWx0ID0gdmFsdWUgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25maWcud2l0aEh0dHBWYWx1ZXMgPSBmdW5jdGlvbiAoaHR0cExvY2FsQ29uZmlnLCBvYmopIHtcbiAgICByZXR1cm4gZGVmYXVsdHMob2JqLCBodHRwTG9jYWxDb25maWcsIGNvbmZpZy5kZWZhdWx0SHR0cEZpZWxkcyk7XG4gIH07XG5cbiAgY29uZmlnLmVuY29kZUlkcyA9IGlzVW5kZWZpbmVkKGNvbmZpZy5lbmNvZGVJZHMpID8gdHJ1ZSA6IGNvbmZpZy5lbmNvZGVJZHM7XG4gIG9iamVjdC5zZXRFbmNvZGVJZHMgPSBmdW5jdGlvbiAoZW5jb2RlKSB7XG4gICAgY29uZmlnLmVuY29kZUlkcyA9IGVuY29kZTtcbiAgfTtcblxuICBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXMgPSBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXMgfHwge1xuICAgICAgZ2V0OiB7fSxcbiAgICAgIHBvc3Q6IHt9LFxuICAgICAgcHV0OiB7fSxcbiAgICAgIHJlbW92ZToge30sXG4gICAgICBjb21tb246IHt9XG4gICAgfTtcblxuICBvYmplY3Quc2V0RGVmYXVsdFJlcXVlc3RQYXJhbXMgPSBmdW5jdGlvbiAocGFyYW0xLCBwYXJhbTIpIHtcbiAgICB2YXIgbWV0aG9kcyA9IFtdLFxuICAgICAgcGFyYW1zID0gcGFyYW0yIHx8IHBhcmFtMTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtMikpIHtcbiAgICAgIGlmIChpc0FycmF5KHBhcmFtMSkpIHtcbiAgICAgICAgbWV0aG9kcyA9IHBhcmFtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZHMucHVzaChwYXJhbTEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXRob2RzLnB1c2goJ2NvbW1vbicpO1xuICAgIH1cblxuICAgIGVhY2gobWV0aG9kcywgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zW21ldGhvZF0gPSBwYXJhbXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnJlcXVlc3RQYXJhbXMgPSBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXM7XG5cbiAgY29uZmlnLmRlZmF1bHRIZWFkZXJzID0gY29uZmlnLmRlZmF1bHRIZWFkZXJzIHx8IHt9O1xuICBvYmplY3Quc2V0RGVmYXVsdEhlYWRlcnMgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICAgIGNvbmZpZy5kZWZhdWx0SGVhZGVycyA9IGhlYWRlcnM7XG4gICAgb2JqZWN0LmRlZmF1bHRIZWFkZXJzID0gY29uZmlnLmRlZmF1bHRIZWFkZXJzO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5kZWZhdWx0SGVhZGVycyA9IGNvbmZpZy5kZWZhdWx0SGVhZGVycztcblxuXG4gIC8qKlxuICAgKiBNZXRob2Qgb3ZlcnJpZGVycyByZXNwb25zZSBNZXRob2RcbiAgICoqL1xuICBjb25maWcuZGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZCB8fCAncHJvbWlzZSc7XG4gIG9iamVjdC5zZXREZWZhdWx0UmVzcG9uc2VNZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IG1ldGhvZDtcbiAgICBvYmplY3QuZGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgb2JqZWN0LmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VNZXRob2Q7XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBvdmVycmlkZXJzIHdpbGwgc2V0IHdoaWNoIG1ldGhvZHMgYXJlIHNlbnQgdmlhIFBPU1Qgd2l0aCBhbiBYLUhUVFAtTWV0aG9kLU92ZXJyaWRlXG4gICAqKi9cbiAgY29uZmlnLm1ldGhvZE92ZXJyaWRlcnMgPSBjb25maWcubWV0aG9kT3ZlcnJpZGVycyB8fCBbXTtcbiAgb2JqZWN0LnNldE1ldGhvZE92ZXJyaWRlcnMgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgdmFyIG92ZXJyaWRlcnMgPSBleHRlbmQoW10sIHZhbHVlcyk7XG4gICAgaWYgKGNvbmZpZy5pc092ZXJyaWRlbk1ldGhvZCgnZGVsZXRlJywgb3ZlcnJpZGVycykpIHtcbiAgICAgIG92ZXJyaWRlcnMucHVzaCgncmVtb3ZlJyk7XG4gICAgfVxuICAgIGNvbmZpZy5tZXRob2RPdmVycmlkZXJzID0gb3ZlcnJpZGVycztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuanNvbnAgPSBpc1VuZGVmaW5lZChjb25maWcuanNvbnApID8gZmFsc2UgOiBjb25maWcuanNvbnA7XG4gIG9iamVjdC5zZXRKc29ucCA9IGZ1bmN0aW9uIChhY3RpdmUpIHtcbiAgICBjb25maWcuanNvbnAgPSBhY3RpdmU7XG4gIH07XG5cbiAgY29uZmlnLmlzT3ZlcnJpZGVuTWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZCwgdmFsdWVzKSB7XG4gICAgdmFyIHNlYXJjaCA9IHZhbHVlcyB8fCBjb25maWcubWV0aG9kT3ZlcnJpZGVycztcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKGZpbmQoc2VhcmNoLCBmdW5jdGlvbiAob25lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBvbmUudG9Mb3dlckNhc2UoKSA9PT0gbWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gICAgfSkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBVUkwgY3JlYXRvciB0eXBlLiBGb3Igbm93LCBvbmx5IFBhdGggaXMgY3JlYXRlZC4gSW4gdGhlIGZ1dHVyZSB3ZSdsbCBoYXZlIHF1ZXJ5UGFyYW1zXG4gICAqKi9cbiAgY29uZmlnLnVybENyZWF0b3IgPSBjb25maWcudXJsQ3JlYXRvciB8fCAncGF0aCc7XG4gIG9iamVjdC5zZXRVcmxDcmVhdG9yID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIWhhcyhjb25maWcudXJsQ3JlYXRvckZhY3RvcnksIG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTCBQYXRoIHNlbGVjdGVkIGlzblxcJ3QgdmFsaWQnKTtcbiAgICB9XG5cbiAgICBjb25maWcudXJsQ3JlYXRvciA9IG5hbWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFlvdSBjYW4gc2V0IHRoZSByZXN0YW5ndWxhciBmaWVsZHMgaGVyZS4gVGhlIDMgcmVxdWlyZWQgZmllbGRzIGZvciBSZXN0YW5ndWxhciBhcmU6XG4gICAqXG4gICAqIGlkOiBJZCBvZiB0aGUgZWxlbWVudFxuICAgKiByb3V0ZTogbmFtZSBvZiB0aGUgcm91dGUgb2YgdGhpcyBlbGVtZW50XG4gICAqIHBhcmVudFJlc291cmNlOiB0aGUgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgcmVzb3VyY2VcbiAgICpcbiAgICogIEFsbCBvZiB0aGlzIGZpZWxkcyBleGNlcHQgZm9yIGlkLCBhcmUgaGFuZGxlZCAoYW5kIGNyZWF0ZWQpIGJ5IFJlc3Rhbmd1bGFyLiBCeSBkZWZhdWx0LFxuICAgKiAgdGhlIGZpZWxkIHZhbHVlcyB3aWxsIGJlIGlkLCByb3V0ZSBhbmQgcGFyZW50UmVzb3VyY2UgcmVzcGVjdGl2ZWx5XG4gICAqL1xuICBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMgPSBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMgfHwge1xuICAgICAgaWQ6ICdpZCcsXG4gICAgICByb3V0ZTogJ3JvdXRlJyxcbiAgICAgIHBhcmVudFJlc291cmNlOiAncGFyZW50UmVzb3VyY2UnLFxuICAgICAgcmVzdGFuZ3VsYXJDb2xsZWN0aW9uOiAncmVzdGFuZ3VsYXJDb2xsZWN0aW9uJyxcbiAgICAgIGNhbm5vbmljYWxJZDogJ19fY2Fubm9uaWNhbElkJyxcbiAgICAgIGV0YWc6ICdyZXN0YW5ndWxhckV0YWcnLFxuICAgICAgc2VsZkxpbms6ICdocmVmJyxcbiAgICAgIGdldDogJ2dldCcsXG4gICAgICBnZXRMaXN0OiAnZ2V0TGlzdCcsXG4gICAgICBwdXQ6ICdwdXQnLFxuICAgICAgcG9zdDogJ3Bvc3QnLFxuICAgICAgcmVtb3ZlOiAncmVtb3ZlJyxcbiAgICAgIGhlYWQ6ICdoZWFkJyxcbiAgICAgIHRyYWNlOiAndHJhY2UnLFxuICAgICAgb3B0aW9uczogJ29wdGlvbnMnLFxuICAgICAgcGF0Y2g6ICdwYXRjaCcsXG4gICAgICBnZXRSZXN0YW5ndWxhclVybDogJ2dldFJlc3Rhbmd1bGFyVXJsJyxcbiAgICAgIGdldFJlcXVlc3RlZFVybDogJ2dldFJlcXVlc3RlZFVybCcsXG4gICAgICBwdXRFbGVtZW50OiAncHV0RWxlbWVudCcsXG4gICAgICBhZGRSZXN0YW5ndWxhck1ldGhvZDogJ2FkZFJlc3Rhbmd1bGFyTWV0aG9kJyxcbiAgICAgIGdldFBhcmVudExpc3Q6ICdnZXRQYXJlbnRMaXN0JyxcbiAgICAgIGNsb25lOiAnY2xvbmUnLFxuICAgICAgaWRzOiAnaWRzJyxcbiAgICAgIGh0dHBDb25maWc6ICdfJGh0dHBDb25maWcnLFxuICAgICAgcmVxUGFyYW1zOiAncmVxUGFyYW1zJyxcbiAgICAgIG9uZTogJ29uZScsXG4gICAgICBhbGw6ICdhbGwnLFxuICAgICAgc2V2ZXJhbDogJ3NldmVyYWwnLFxuICAgICAgb25lVXJsOiAnb25lVXJsJyxcbiAgICAgIGFsbFVybDogJ2FsbFVybCcsXG4gICAgICBjdXN0b21QVVQ6ICdjdXN0b21QVVQnLFxuICAgICAgY3VzdG9tUEFUQ0g6ICdjdXN0b21QQVRDSCcsXG4gICAgICBjdXN0b21QT1NUOiAnY3VzdG9tUE9TVCcsXG4gICAgICBjdXN0b21ERUxFVEU6ICdjdXN0b21ERUxFVEUnLFxuICAgICAgY3VzdG9tR0VUOiAnY3VzdG9tR0VUJyxcbiAgICAgIGN1c3RvbUdFVExJU1Q6ICdjdXN0b21HRVRMSVNUJyxcbiAgICAgIGN1c3RvbU9wZXJhdGlvbjogJ2N1c3RvbU9wZXJhdGlvbicsXG4gICAgICBkb1BVVDogJ2RvUFVUJyxcbiAgICAgIGRvUEFUQ0g6ICdkb1BBVENIJyxcbiAgICAgIGRvUE9TVDogJ2RvUE9TVCcsXG4gICAgICBkb0RFTEVURTogJ2RvREVMRVRFJyxcbiAgICAgIGRvR0VUOiAnZG9HRVQnLFxuICAgICAgZG9HRVRMSVNUOiAnZG9HRVRMSVNUJyxcbiAgICAgIGZyb21TZXJ2ZXI6ICdmcm9tU2VydmVyJyxcbiAgICAgIHdpdGhDb25maWc6ICd3aXRoQ29uZmlnJyxcbiAgICAgIHdpdGhIdHRwQ29uZmlnOiAnd2l0aEh0dHBDb25maWcnLFxuICAgICAgc2luZ2xlT25lOiAnc2luZ2xlT25lJyxcbiAgICAgIHBsYWluOiAncGxhaW4nLFxuICAgICAgc2F2ZTogJ3NhdmUnLFxuICAgICAgcmVzdGFuZ3VsYXJpemVkOiAncmVzdGFuZ3VsYXJpemVkJ1xuICAgIH07XG4gIG9iamVjdC5zZXRSZXN0YW5ndWxhckZpZWxkcyA9IGZ1bmN0aW9uIChyZXNGaWVsZHMpIHtcbiAgICBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMgPVxuICAgICAgZXh0ZW5kKHt9LCBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMsIHJlc0ZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmlzUmVzdGFuZ3VsYXJpemVkID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiAhIW9ialtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJpemVkXTtcbiAgfTtcblxuICBjb25maWcuc2V0RmllbGRUb0VsZW0gPSBmdW5jdGlvbiAoZmllbGQsIGVsZW0sIHZhbHVlKSB7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgIHZhciBpZFZhbHVlID0gZWxlbTtcbiAgICBlYWNoKGluaXRpYWwocHJvcGVydGllcyksIGZ1bmN0aW9uIChwcm9wOiBhbnkpIHtcbiAgICAgIGlkVmFsdWVbcHJvcF0gPSB7fTtcbiAgICAgIGlkVmFsdWUgPSBpZFZhbHVlW3Byb3BdO1xuICAgIH0pO1xuICAgIHZhciBpbmRleDogYW55ID0gbGFzdChwcm9wZXJ0aWVzKTtcbiAgICBpZFZhbHVlW2luZGV4XSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRGaWVsZEZyb21FbGVtID0gZnVuY3Rpb24gKGZpZWxkLCBlbGVtKSB7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgIHZhciBpZFZhbHVlOiBhbnkgPSBlbGVtO1xuICAgIGVhY2gocHJvcGVydGllcywgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGlmIChpZFZhbHVlKSB7XG4gICAgICAgIGlkVmFsdWUgPSBpZFZhbHVlW3Byb3BdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjbG9uZShpZFZhbHVlKTtcbiAgfTtcblxuICBjb25maWcuc2V0SWRUb0VsZW0gPSBmdW5jdGlvbiAoZWxlbSwgaWQgLyosIHJvdXRlICovKSB7XG4gICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZCwgZWxlbSwgaWQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRJZEZyb21FbGVtID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICByZXR1cm4gY29uZmlnLmdldEZpZWxkRnJvbUVsZW0oY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkLCBlbGVtKTtcbiAgfTtcblxuICBjb25maWcuaXNWYWxpZElkID0gZnVuY3Rpb24gKGVsZW1JZCkge1xuICAgIHJldHVybiAnJyAhPT0gZWxlbUlkICYmICFpc1VuZGVmaW5lZChlbGVtSWQpICYmICFpc051bGwoZWxlbUlkKTtcbiAgfTtcblxuICBjb25maWcuc2V0VXJsVG9FbGVtID0gZnVuY3Rpb24gKGVsZW0sIHVybCAvKiwgcm91dGUgKi8pIHtcbiAgICBjb25maWcuc2V0RmllbGRUb0VsZW0oY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNlbGZMaW5rLCBlbGVtLCB1cmwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRVcmxGcm9tRWxlbSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgcmV0dXJuIGNvbmZpZy5nZXRGaWVsZEZyb21FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zZWxmTGluaywgZWxlbSk7XG4gIH07XG5cbiAgY29uZmlnLnVzZUNhbm5vbmljYWxJZCA9IGlzVW5kZWZpbmVkKGNvbmZpZy51c2VDYW5ub25pY2FsSWQpID8gZmFsc2UgOiBjb25maWcudXNlQ2Fubm9uaWNhbElkO1xuICBvYmplY3Quc2V0VXNlQ2Fubm9uaWNhbElkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgY29uZmlnLnVzZUNhbm5vbmljYWxJZCA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRDYW5ub25pY2FsSWRGcm9tRWxlbSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgdmFyIGNhbm5vbmljYWxJZCA9IGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNhbm5vbmljYWxJZF07XG4gICAgdmFyIGFjdHVhbElkID0gY29uZmlnLmlzVmFsaWRJZChjYW5ub25pY2FsSWQpID8gY2Fubm9uaWNhbElkIDogY29uZmlnLmdldElkRnJvbUVsZW0oZWxlbSk7XG4gICAgcmV0dXJuIGFjdHVhbElkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBSZXNwb25zZSBwYXJzZXIuIFRoaXMgaXMgdXNlZCBpbiBjYXNlIHlvdXIgcmVzcG9uc2UgaXNuJ3QgZGlyZWN0bHkgdGhlIGRhdGEuXG4gICAqIEZvciBleGFtcGxlIGlmIHlvdSBoYXZlIGEgcmVzcG9uc2UgbGlrZSB7bWV0YTogeydtZXRhJ30sIGRhdGE6IHtuYW1lOiAnR29udG8nfX1cbiAgICogeW91IGNhbiBleHRyYWN0IHRoaXMgZGF0YSB3aGljaCBpcyB0aGUgb25lIHRoYXQgbmVlZHMgd3JhcHBpbmdcbiAgICpcbiAgICogVGhlIFJlc3BvbnNlRXh0cmFjdG9yIGlzIGEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgcmVzcG9uc2UgYW5kIHRoZSBtZXRob2QgZXhlY3V0ZWQuXG4gICAqL1xuXG4gIGNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9ycyA9IGNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9ycyA/IFsuLi5jb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnNdIDogW107XG5cbiAgY29uZmlnLmRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yID0gZnVuY3Rpb24gKGRhdGEgLyosIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgc3ViamVjdCAqLykge1xuICAgIHJldHVybiBkYXRhIHx8IHt9O1xuICB9O1xuXG4gIGNvbmZpZy5yZXNwb25zZUV4dHJhY3RvciA9IGZ1bmN0aW9uIChkYXRhLCBvcGVyYXRpb24sIHdoYXQsIHVybCwgcmVzcG9uc2UsIHN1YmplY3QpIHtcbiAgICB2YXIgaW50ZXJjZXB0b3JzID0gY2xvbmUoY29uZmlnLnJlc3BvbnNlSW50ZXJjZXB0b3JzKTtcbiAgICBpbnRlcmNlcHRvcnMucHVzaChjb25maWcuZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3IpO1xuICAgIHZhciB0aGVEYXRhID0gZGF0YTtcbiAgICBlYWNoKGludGVyY2VwdG9ycywgZnVuY3Rpb24gKGludGVyY2VwdG9yOiBhbnkpIHtcbiAgICAgIHRoZURhdGEgPSBpbnRlcmNlcHRvcih0aGVEYXRhLCBvcGVyYXRpb24sXG4gICAgICAgIHdoYXQsIHVybCwgcmVzcG9uc2UsIHN1YmplY3QpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGVEYXRhO1xuICB9O1xuXG4gIG9iamVjdC5hZGRSZXNwb25zZUludGVyY2VwdG9yID0gZnVuY3Rpb24gKGV4dHJhY3Rvcikge1xuICAgIGNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9ycy5wdXNoKGV4dHJhY3Rvcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzID0gY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzID8gWy4uLmNvbmZpZy5lcnJvckludGVyY2VwdG9yc10gOiBbXTtcbiAgb2JqZWN0LmFkZEVycm9ySW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWcuZXJyb3JJbnRlcmNlcHRvcnMgPSBbaW50ZXJjZXB0b3IsIC4uLmNvbmZpZy5lcnJvckludGVyY2VwdG9yc107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnNldFJlc3BvbnNlSW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcjtcbiAgb2JqZWN0LnNldFJlc3BvbnNlRXh0cmFjdG9yID0gb2JqZWN0LmFkZFJlc3BvbnNlSW50ZXJjZXB0b3I7XG4gIG9iamVjdC5zZXRFcnJvckludGVyY2VwdG9yID0gb2JqZWN0LmFkZEVycm9ySW50ZXJjZXB0b3I7XG5cbiAgLyoqXG4gICAqIFJlc3BvbnNlIGludGVyY2VwdG9yIGlzIGNhbGxlZCBqdXN0IGJlZm9yZSByZXNvbHZpbmcgcHJvbWlzZXMuXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgaW50ZXJjZXB0b3IgaXMgY2FsbGVkIGJlZm9yZSBzZW5kaW5nIGFuIG9iamVjdCB0byB0aGUgc2VydmVyLlxuICAgKi9cbiAgY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMgPSBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycyA/IFsuLi5jb25maWcucmVxdWVzdEludGVyY2VwdG9yc10gOiBbXTtcblxuICBjb25maWcuZGVmYXVsdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIGh0dHBDb25maWc6IGh0dHBDb25maWdcbiAgICB9O1xuICB9O1xuXG4gIGNvbmZpZy5mdWxsUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpIHtcbiAgICB2YXIgaW50ZXJjZXB0b3JzID0gY2xvbmUoY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMpO1xuICAgIHZhciBkZWZhdWx0UmVxdWVzdCA9IGNvbmZpZy5kZWZhdWx0SW50ZXJjZXB0b3IoZWxlbWVudCwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgaHR0cENvbmZpZyk7XG4gICAgcmV0dXJuIHJlZHVjZShpbnRlcmNlcHRvcnMsIGZ1bmN0aW9uIChyZXF1ZXN0OiBhbnksIGludGVyY2VwdG9yOiBhbnkpIHtcblxuICAgICAgbGV0IHJldHVybkludGVyY2VwdG9yOiBhbnkgPSBpbnRlcmNlcHRvcihyZXF1ZXN0LmVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCByZXF1ZXN0LmhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLCByZXF1ZXN0Lmh0dHBDb25maWcpO1xuICAgICAgcmV0dXJuIGV4dGVuZChyZXF1ZXN0LCByZXR1cm5JbnRlcmNlcHRvcik7XG4gICAgfSwgZGVmYXVsdFJlcXVlc3QpO1xuICB9O1xuXG4gIG9iamVjdC5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uIChlbGVtLCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgZWxlbWVudDogaW50ZXJjZXB0b3IoZWxlbSwgb3BlcmF0aW9uLCBwYXRoLCB1cmwpLFxuICAgICAgICBodHRwQ29uZmlnOiBodHRwQ29uZmlnXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5zZXRSZXF1ZXN0SW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkUmVxdWVzdEludGVyY2VwdG9yO1xuXG4gIG9iamVjdC5hZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGludGVyY2VwdG9yKSB7XG4gICAgY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMucHVzaChpbnRlcmNlcHRvcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnNldEZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvcjtcblxuICBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkID0gY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCB8fCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfTtcbiAgb2JqZWN0LnNldE9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCA9IHBvc3Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnNldFJlc3Rhbmd1bGFyaXplUHJvbWlzZUludGVyY2VwdG9yID0gZnVuY3Rpb24gKGludGVyY2VwdG9yKSB7XG4gICAgY29uZmlnLnJlc3Rhbmd1bGFyaXplUHJvbWlzZUludGVyY2VwdG9yID0gaW50ZXJjZXB0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciBhbiBlbGVtZW50IGhhcyBiZWVuIFwiUmVzdGFuZ3VsYXJpemVkXCIuXG4gICAqXG4gICAqIEl0IHJlY2VpdmVzIHRoZSBlbGVtZW50LCBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBpdCdzIGFuIGVsZW1lbnQgb3IgYSBjb2xsZWN0aW9uXG4gICAqIGFuZCB0aGUgbmFtZSBvZiB0aGUgbW9kZWxcbiAgICpcbiAgICovXG4gIGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQgPSBjb25maWcub25FbGVtUmVzdGFuZ3VsYXJpemVkIHx8IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9O1xuICBvYmplY3Quc2V0T25FbGVtUmVzdGFuZ3VsYXJpemVkID0gZnVuY3Rpb24gKHBvc3QpIHtcbiAgICBjb25maWcub25FbGVtUmVzdGFuZ3VsYXJpemVkID0gcG9zdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuc2hvdWxkU2F2ZVBhcmVudCA9IGNvbmZpZy5zaG91bGRTYXZlUGFyZW50IHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIG9iamVjdC5zZXRQYXJlbnRsZXNzID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIGlmIChpc0FycmF5KHZhbHVlcykpIHtcbiAgICAgIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50ID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgIHJldHVybiAhaW5jbHVkZXModmFsdWVzLCByb3V0ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlcykpIHtcbiAgICAgIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXZhbHVlcztcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGxldHMgeW91IHNldCBhIHN1ZmZpeCB0byBldmVyeSByZXF1ZXN0LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgeW91ciBhcGkgcmVxdWlyZXMgdGhhdCBmb3IgSlNvbiByZXF1ZXN0cyB5b3UgZG8gL3VzZXJzLzEyMy5qc29uLCB5b3UgY2FuIHNldCB0aGF0XG4gICAqIGluIGhlcmUuXG4gICAqXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSBzdWZmaXggaXMgbnVsbFxuICAgKi9cbiAgY29uZmlnLnN1ZmZpeCA9IGlzVW5kZWZpbmVkKGNvbmZpZy5zdWZmaXgpID8gbnVsbCA6IGNvbmZpZy5zdWZmaXg7XG4gIG9iamVjdC5zZXRSZXF1ZXN0U3VmZml4ID0gZnVuY3Rpb24gKG5ld1N1ZmZpeCkge1xuICAgIGNvbmZpZy5zdWZmaXggPSBuZXdTdWZmaXg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBlbGVtZW50IHRyYW5zZm9ybWVycyBmb3IgY2VydGFpbiByb3V0ZXMuXG4gICAqL1xuICBjb25maWcudHJhbnNmb3JtZXJzID0gY29uZmlnLnRyYW5zZm9ybWVycyB8fCB7fTtcbiAgb2JqZWN0LmFkZEVsZW1lbnRUcmFuc2Zvcm1lciA9IGZ1bmN0aW9uICh0eXBlLCBzZWNvbmRBcmcsIHRoaXJkQXJnKSB7XG4gICAgdmFyIGlzQ29sbGVjdGlvbiA9IG51bGw7XG4gICAgdmFyIHRyYW5zZm9ybWVyID0gbnVsbDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgdHJhbnNmb3JtZXIgPSBzZWNvbmRBcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybWVyID0gdGhpcmRBcmc7XG4gICAgICBpc0NvbGxlY3Rpb24gPSBzZWNvbmRBcmc7XG4gICAgfVxuXG4gICAgdmFyIHR5cGVUcmFuc2Zvcm1lcnMgPSBjb25maWcudHJhbnNmb3JtZXJzW3R5cGVdO1xuICAgIGlmICghdHlwZVRyYW5zZm9ybWVycykge1xuICAgICAgdHlwZVRyYW5zZm9ybWVycyA9IGNvbmZpZy50cmFuc2Zvcm1lcnNbdHlwZV0gPSBbXTtcbiAgICB9XG5cbiAgICB0eXBlVHJhbnNmb3JtZXJzLnB1c2goZnVuY3Rpb24gKGNvbGwsIGVsZW0pIHtcbiAgICAgIGlmIChpc051bGwoaXNDb2xsZWN0aW9uKSB8fCAoY29sbCA9PT0gaXNDb2xsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIoZWxlbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG5cbiAgb2JqZWN0LmV4dGVuZENvbGxlY3Rpb24gPSBmdW5jdGlvbiAocm91dGUsIGZuKSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIocm91dGUsIHRydWUsIGZuKTtcbiAgfTtcblxuICBvYmplY3QuZXh0ZW5kTW9kZWwgPSBmdW5jdGlvbiAocm91dGUsIGZuKSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIocm91dGUsIGZhbHNlLCBmbik7XG4gIH07XG5cbiAgY29uZmlnLnRyYW5zZm9ybUVsZW0gPSBmdW5jdGlvbiAoZWxlbSwgaXNDb2xsZWN0aW9uLCByb3V0ZSwgUmVzdGFuZ3VsYXIsIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSAmJiAhY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMgJiYgIWVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgdmFyIHR5cGVUcmFuc2Zvcm1lcnMgPSBjb25maWcudHJhbnNmb3JtZXJzW3JvdXRlXTtcbiAgICB2YXIgY2hhbmdlZEVsZW0gPSBlbGVtO1xuICAgIGlmICh0eXBlVHJhbnNmb3JtZXJzKSB7XG4gICAgICBlYWNoKHR5cGVUcmFuc2Zvcm1lcnMsIGZ1bmN0aW9uICh0cmFuc2Zvcm1lcjogKGlzQ29sbGVjdGlvbjogYm9vbGVhbiwgY2hhbmdlZEVsZW06IGFueSkgPT4gYW55KSB7XG4gICAgICAgIGNoYW5nZWRFbGVtID0gdHJhbnNmb3JtZXIoaXNDb2xsZWN0aW9uLCBjaGFuZ2VkRWxlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQoY2hhbmdlZEVsZW0sIGlzQ29sbGVjdGlvbiwgcm91dGUsIFJlc3Rhbmd1bGFyKTtcbiAgfTtcblxuICBjb25maWcudHJhbnNmb3JtTG9jYWxFbGVtZW50cyA9IGlzVW5kZWZpbmVkKGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzKSA/XG4gICAgZmFsc2UgOlxuICAgIGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzO1xuXG4gIG9iamVjdC5zZXRUcmFuc2Zvcm1Pbmx5U2VydmVyRWxlbWVudHMgPSBmdW5jdGlvbiAoYWN0aXZlKSB7XG4gICAgY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMgPSAhYWN0aXZlO1xuICB9O1xuXG4gIGNvbmZpZy5mdWxsUmVzcG9uc2UgPSBpc1VuZGVmaW5lZChjb25maWcuZnVsbFJlc3BvbnNlKSA/IGZhbHNlIDogY29uZmlnLmZ1bGxSZXNwb25zZTtcbiAgb2JqZWN0LnNldEZ1bGxSZXNwb25zZSA9IGZ1bmN0aW9uIChmdWxsKSB7XG4gICAgY29uZmlnLmZ1bGxSZXNwb25zZSA9IGZ1bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICAvL0ludGVybmFsIHZhbHVlcyBhbmQgZnVuY3Rpb25zXG4gIGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeSA9IHt9O1xuXG4gIC8qKlxuICAgKiBCYXNlIFVSTCBDcmVhdG9yLiBCYXNlIHByb3RvdHlwZSBmb3IgZXZlcnl0aGluZyByZWxhdGVkIHRvIGl0XG4gICAqKi9cblxuICB2YXIgQmFzZUNyZWF0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIH07XG5cbiAgQmFzZUNyZWF0b3IucHJvdG90eXBlLnNldENvbmZpZyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBCYXNlQ3JlYXRvci5wcm90b3R5cGUucGFyZW50c0FycmF5ID0gZnVuY3Rpb24gKGN1cnJlbnQpIHtcbiAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICBwYXJlbnRzLnB1c2goY3VycmVudCk7XG4gICAgICBjdXJyZW50ID0gY3VycmVudFt0aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV07XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRzLnJldmVyc2UoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBSZXN0YW5ndWxhclJlc291cmNlKGNvbmZpZywgJGh0dHAsIHVybCwgY29uZmlndXJlcikge1xuICAgIHZhciByZXNvdXJjZSA9IHt9O1xuICAgIGVhY2goa2V5cyhjb25maWd1cmVyKSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIHZhbHVlID0gY29uZmlndXJlcltrZXldO1xuXG4gICAgICAvLyBBZGQgZGVmYXVsdCBwYXJhbWV0ZXJzXG4gICAgICB2YWx1ZS5wYXJhbXMgPSBleHRlbmQoe30sIHZhbHVlLnBhcmFtcywgY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zW3ZhbHVlLm1ldGhvZC50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAvLyBXZSBkb24ndCB3YW50IHRoZSA/IGlmIG5vIHBhcmFtcyBhcmUgdGhlcmVcbiAgICAgIGlmIChpc0VtcHR5KHZhbHVlLnBhcmFtcykpIHtcbiAgICAgICAgZGVsZXRlIHZhbHVlLnBhcmFtcztcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5pc1NhZmUodmFsdWUubWV0aG9kKSkge1xuXG4gICAgICAgIHJlc291cmNlW2tleV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGV0IGNvbmZpZyA9IGV4dGVuZCh2YWx1ZSwge1xuICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gJGh0dHAuY3JlYXRlUmVxdWVzdChjb25maWcpO1xuICAgICAgICB9O1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJlc291cmNlW2tleV0gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGxldCBjb25maWcgPSBleHRlbmQodmFsdWUsIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiAkaHR0cC5jcmVhdGVSZXF1ZXN0KGNvbmZpZyk7XG4gICAgICAgIH07XG5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfVxuXG4gIEJhc2VDcmVhdG9yLnByb3RvdHlwZS5yZXNvdXJjZSA9IGZ1bmN0aW9uIChjdXJyZW50LCAkaHR0cCwgbG9jYWxIdHRwQ29uZmlnLCBjYWxsSGVhZGVycywgY2FsbFBhcmFtcywgd2hhdCwgZXRhZywgb3BlcmF0aW9uKSB7XG4gICAgdmFyIHBhcmFtcyA9IGRlZmF1bHRzKGNhbGxQYXJhbXMgfHwge30sIHRoaXMuY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zLmNvbW1vbik7XG4gICAgdmFyIGhlYWRlcnMgPSBkZWZhdWx0cyhjYWxsSGVhZGVycyB8fCB7fSwgdGhpcy5jb25maWcuZGVmYXVsdEhlYWRlcnMpO1xuXG4gICAgaWYgKGV0YWcpIHtcbiAgICAgIGlmICghY29uZmlnLmlzU2FmZShvcGVyYXRpb24pKSB7XG4gICAgICAgIGhlYWRlcnNbJ0lmLU1hdGNoJ10gPSBldGFnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVhZGVyc1snSWYtTm9uZS1NYXRjaCddID0gZXRhZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdXJsID0gdGhpcy5iYXNlKGN1cnJlbnQpO1xuXG4gICAgaWYgKHdoYXQpIHtcbiAgICAgIHZhciBhZGQgPSAnJztcbiAgICAgIGlmICghL1xcLyQvLnRlc3QodXJsKSkge1xuICAgICAgICBhZGQgKz0gJy8nO1xuICAgICAgfVxuICAgICAgYWRkICs9IHdoYXQ7XG4gICAgICB1cmwgKz0gYWRkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5zdWZmaXggJiZcbiAgICAgIHVybC5pbmRleE9mKHRoaXMuY29uZmlnLnN1ZmZpeCwgdXJsLmxlbmd0aCAtIHRoaXMuY29uZmlnLnN1ZmZpeC5sZW5ndGgpID09PSAtMSAmJiAhdGhpcy5jb25maWcuZ2V0VXJsRnJvbUVsZW0oY3VycmVudCkpIHtcbiAgICAgIHVybCArPSB0aGlzLmNvbmZpZy5zdWZmaXg7XG4gICAgfVxuXG4gICAgY3VycmVudFt0aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBSZXN0YW5ndWxhclJlc291cmNlKHRoaXMuY29uZmlnLCAkaHR0cCwgdXJsLCB7XG4gICAgICBnZXRMaXN0OiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIGdldDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBqc29ucDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnanNvbnAnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIHB1dDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBwb3N0OiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICByZW1vdmU6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgaGVhZDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnSEVBRCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgdHJhY2U6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1RSQUNFJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBvcHRpb25zOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdPUFRJT05TJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBwYXRjaDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgUGF0aCBVUkwgY3JlYXRvci4gSXQgdXNlcyBQYXRoIHRvIHNob3cgSGllcmFyY2h5IGluIHRoZSBSZXN0IEFQSS5cbiAgICogVGhpcyBtZWFucyB0aGF0IGlmIHlvdSBoYXZlIGFuIEFjY291bnQgdGhhdCB0aGVuIGhhcyBhIHNldCBvZiBCdWlsZGluZ3MsIGEgVVJMIHRvIGEgYnVpbGRpbmdcbiAgICogd291bGQgYmUgL2FjY291bnRzLzEyMy9idWlsZGluZ3MvNDU2XG4gICAqKi9cbiAgdmFyIFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gIH07XG5cbiAgUGF0aC5wcm90b3R5cGUgPSBuZXcgQmFzZUNyZWF0b3IoKTtcblxuICBQYXRoLnByb3RvdHlwZS5ub3JtYWxpemVVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIHBhcnRzID0gLygoPzpodHRwW3NdPzopP1xcL1xcLyk/KC4qKT8vLmV4ZWModXJsKTtcbiAgICBwYXJ0c1syXSA9IHBhcnRzWzJdLnJlcGxhY2UoL1tcXFxcXFwvXSsvZywgJy8nKTtcbiAgICByZXR1cm4gKHR5cGVvZiBwYXJ0c1sxXSAhPT0gJ3VuZGVmaW5lZCcpID8gcGFydHNbMV0gKyBwYXJ0c1syXSA6IHBhcnRzWzJdO1xuICB9O1xuXG4gIFBhdGgucHJvdG90eXBlLmJhc2UgPSBmdW5jdGlvbiAoY3VycmVudCkge1xuICAgIHZhciBfX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiByZWR1Y2UodGhpcy5wYXJlbnRzQXJyYXkoY3VycmVudCksIGZ1bmN0aW9uIChhY3VtOiBhbnksIGVsZW06IGFueSkge1xuICAgICAgdmFyIGVsZW1Vcmw7XG4gICAgICB2YXIgZWxlbVNlbGZMaW5rID0gX190aGlzLmNvbmZpZy5nZXRVcmxGcm9tRWxlbShlbGVtKTtcbiAgICAgIGlmIChlbGVtU2VsZkxpbmspIHtcbiAgICAgICAgaWYgKF9fdGhpcy5jb25maWcuaXNBYnNvbHV0ZVVybChlbGVtU2VsZkxpbmspKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1TZWxmTGluaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtVXJsID0gZWxlbVNlbGZMaW5rO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtVXJsID0gZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXTtcblxuICAgICAgICBpZiAoZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICB2YXIgaWRzID0gZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkc107XG4gICAgICAgICAgaWYgKGlkcykge1xuICAgICAgICAgICAgZWxlbVVybCArPSAnLycgKyBpZHMuam9pbignLCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZWxlbUlkOiBhbnk7XG4gICAgICAgICAgaWYgKF9fdGhpcy5jb25maWcudXNlQ2Fubm9uaWNhbElkKSB7XG4gICAgICAgICAgICBlbGVtSWQgPSBfX3RoaXMuY29uZmlnLmdldENhbm5vbmljYWxJZEZyb21FbGVtKGVsZW0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtSWQgPSBfX3RoaXMuY29uZmlnLmdldElkRnJvbUVsZW0oZWxlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbmZpZy5pc1ZhbGlkSWQoZWxlbUlkKSAmJiAhZWxlbS5zaW5nbGVPbmUpIHtcbiAgICAgICAgICAgIGVsZW1VcmwgKz0gJy8nICsgKF9fdGhpcy5jb25maWcuZW5jb2RlSWRzID8gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1JZCkgOiBlbGVtSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWN1bSA9IGFjdW0ucmVwbGFjZSgvXFwvJC8sICcnKSArICcvJyArIGVsZW1Vcmw7XG4gICAgICByZXR1cm4gX190aGlzLm5vcm1hbGl6ZVVybChhY3VtKTtcblxuICAgIH0sIHRoaXMuY29uZmlnLmJhc2VVcmwpO1xuICB9O1xuXG5cbiAgUGF0aC5wcm90b3R5cGUuZmV0Y2hVcmwgPSBmdW5jdGlvbiAoY3VycmVudCwgd2hhdCkge1xuICAgIHZhciBiYXNlVXJsID0gdGhpcy5iYXNlKGN1cnJlbnQpO1xuICAgIGlmICh3aGF0KSB7XG4gICAgICBiYXNlVXJsICs9ICcvJyArIHdoYXQ7XG4gICAgfVxuICAgIHJldHVybiBiYXNlVXJsO1xuICB9O1xuXG4gIFBhdGgucHJvdG90eXBlLmZldGNoUmVxdWVzdGVkVXJsID0gZnVuY3Rpb24gKGN1cnJlbnQsIHdoYXQpIHtcbiAgICB2YXIgdXJsID0gdGhpcy5mZXRjaFVybChjdXJyZW50LCB3aGF0KTtcbiAgICB2YXIgcGFyYW1zID0gY3VycmVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVxUGFyYW1zXTtcblxuICAgIC8vIEZyb20gaGVyZSBvbiBhbmQgdW50aWwgdGhlIGVuZCBvZiBmZXRjaFJlcXVlc3RlZFVybCxcbiAgICAvLyB0aGUgY29kZSBoYXMgYmVlbiBraW5kbHkgYm9ycm93ZWQgZnJvbSBhbmd1bGFyLmpzXG4gICAgLy8gVGhlIHJlYXNvbiBmb3Igc3VjaCBjb2RlIGJsb2F0aW5nIGlzIGNvaGVyZW5jZTpcbiAgICAvLyAgIElmIHRoZSB1c2VyIHdlcmUgdG8gdXNlIHRoaXMgZm9yIGNhY2hlIG1hbmFnZW1lbnQsIHRoZVxuICAgIC8vICAgc2VyaWFsaXphdGlvbiBvZiBwYXJhbWV0ZXJzIHdvdWxkIG5lZWQgdG8gYmUgaWRlbnRpY2FsXG4gICAgLy8gICB0byB0aGUgb25lIGRvbmUgYnkgYW5ndWxhciBmb3IgY2FjaGUga2V5cyB0byBtYXRjaC5cbiAgICBmdW5jdGlvbiBzb3J0ZWRLZXlzKG9iaikge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXlzLnNvcnQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JFYWNoU29ydGVkKG9iaiwgaXRlcmF0b3I/LCBjb250ZXh0Pykge1xuICAgICAgdmFyIGtleXMgPSBzb3J0ZWRLZXlzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5c1tpXV0sIGtleXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5jb2RlVXJpUXVlcnkodmFsLCBwY3RFbmNvZGVTcGFjZXM/KSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkucmVwbGFjZSgvJTQwL2dpLCAnQCcpLnJlcGxhY2UoLyUzQS9naSwgJzonKS5yZXBsYWNlKC8lMjQvZywgJyQnKS5yZXBsYWNlKC8lMkMvZ2ksICcsJykucmVwbGFjZSgvJTIwL2csIChwY3RFbmNvZGVTcGFjZXMgPyAnJTIwJyA6ICcrJykpO1xuICAgIH1cblxuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICByZXR1cm4gdXJsICsgKHRoaXMuY29uZmlnLnN1ZmZpeCB8fCAnJyk7XG4gICAgfVxuXG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgZm9yRWFjaFNvcnRlZChwYXJhbXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgIH1cblxuICAgICAgZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlVXJpUXVlcnkoa2V5KSArICc9JyArIGVuY29kZVVyaVF1ZXJ5KHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVybCArICh0aGlzLmNvbmZpZy5zdWZmaXggfHwgJycpICsgKCh1cmwuaW5kZXhPZignPycpID09PSAtMSkgPyAnPycgOiAnJicpICsgcGFydHMuam9pbignJicpO1xuICB9O1xuXG4gIGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeS5wYXRoID0gUGF0aDtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgSW5qZWN0b3IsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICdjb3JlLWpzL2ZuL29iamVjdCc7XG5pbXBvcnQge1xuICBtYXAsXG4gIGJpbmQsXG4gIHVuaW9uLFxuICB2YWx1ZXMsXG4gIHBpY2ssXG4gIGlzRW1wdHksXG4gIGlzRnVuY3Rpb24sXG4gIGlzTnVtYmVyLFxuICBpc1VuZGVmaW5lZCxcbiAgaXNBcnJheSxcbiAgaXNPYmplY3QsXG4gIGV4dGVuZCxcbiAgZWFjaCxcbiAgZXZlcnksXG4gIG9taXQsXG4gIGdldCxcbiAgZGVmYXVsdHMsXG4gIGNsb25lLFxuICBjbG9uZURlZXAsXG4gIGluY2x1ZGVzXG59IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBSRVNUQU5HVUxBUiB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLmNvbmZpZyc7XG5pbXBvcnQgeyBSZXN0YW5ndWxhckh0dHAgfSBmcm9tICcuL25neC1yZXN0YW5ndWxhci1odHRwJztcbmltcG9ydCB7IFJlc3Rhbmd1bGFyQ29uZmlndXJlciB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLWNvbmZpZy5mYWN0b3J5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc3Rhbmd1bGFyIHtcbiAgcHJvdmlkZXI6IHtcbiAgICBzZXRCYXNlVXJsOiBhbnksXG4gICAgc2V0RGVmYXVsdEhlYWRlcnM6IGFueSxcbiAgICBjb25maWd1cmF0aW9uOiBhbnksXG4gICAgc2V0U2VsZkxpbmtBYnNvbHV0ZVVybDogYW55LFxuICAgIHNldEV4dHJhRmllbGRzOiBhbnksXG4gICAgc2V0RGVmYXVsdEh0dHBGaWVsZHM6IGFueSxcbiAgICBzZXRQbGFpbkJ5RGVmYXVsdDogYW55LFxuICAgIHNldEVuY29kZUlkczogYW55LFxuICAgIHNldERlZmF1bHRSZXF1ZXN0UGFyYW1zOiBhbnksXG4gICAgcmVxdWVzdFBhcmFtczogYW55LFxuICAgIGRlZmF1bHRIZWFkZXJzOiBhbnksXG4gICAgc2V0RGVmYXVsdFJlc3BvbnNlTWV0aG9kOiBhbnksXG4gICAgZGVmYXVsdFJlc3BvbnNlTWV0aG9kOiBhbnksXG4gICAgc2V0TWV0aG9kT3ZlcnJpZGVyczogYW55LFxuICAgIHNldEpzb25wOiBhbnksXG4gICAgc2V0VXJsQ3JlYXRvcjogYW55LFxuICAgIHNldFJlc3Rhbmd1bGFyRmllbGRzOiBhbnksXG4gICAgc2V0VXNlQ2Fubm9uaWNhbElkOiBhbnksXG4gICAgYWRkUmVzcG9uc2VJbnRlcmNlcHRvcjogYW55LFxuICAgIGFkZEVycm9ySW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRSZXNwb25zZUludGVyY2VwdG9yOiBhbnksXG4gICAgc2V0UmVzcG9uc2VFeHRyYWN0b3I6IGFueSxcbiAgICBzZXRFcnJvckludGVyY2VwdG9yOiBhbnksXG4gICAgYWRkUmVxdWVzdEludGVyY2VwdG9yOiBhbnksXG4gICAgc2V0UmVxdWVzdEludGVyY2VwdG9yOiBhbnksXG4gICAgc2V0RnVsbFJlcXVlc3RJbnRlcmNlcHRvcjogYW55LFxuICAgIGFkZEZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRPbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQ6IGFueSxcbiAgICBzZXRSZXN0YW5ndWxhcml6ZVByb21pc2VJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldE9uRWxlbVJlc3Rhbmd1bGFyaXplZDogYW55LFxuICAgIHNldFBhcmVudGxlc3M6IGFueSxcbiAgICBzZXRSZXF1ZXN0U3VmZml4OiBhbnksXG4gICAgYWRkRWxlbWVudFRyYW5zZm9ybWVyOiBhbnksXG4gICAgZXh0ZW5kQ29sbGVjdGlvbjogYW55LFxuICAgIGV4dGVuZE1vZGVsOiBhbnksXG4gICAgc2V0VHJhbnNmb3JtT25seVNlcnZlckVsZW1lbnRzOiBhbnksXG4gICAgc2V0RnVsbFJlc3BvbnNlOiBhbnksXG4gICAgJGdldDogYW55XG4gIH07XG4gIGFkZEVsZW1lbnRUcmFuc2Zvcm1lcjogYW55O1xuICBleHRlbmRDb2xsZWN0aW9uOiBhbnk7XG4gIGV4dGVuZE1vZGVsOiBhbnk7XG4gIGNvcHk7XG4gIGNvbmZpZ3VyYXRpb247XG4gIHNlcnZpY2U7XG4gIGlkO1xuICByb3V0ZTtcbiAgcGFyZW50UmVzb3VyY2U7XG4gIHJlc3Rhbmd1bGFyQ29sbGVjdGlvbjtcbiAgY2Fubm9uaWNhbElkO1xuICBldGFnO1xuICBzZWxmTGluaztcbiAgZ2V0O1xuICBnZXRMaXN0O1xuICBwdXQ7XG4gIHBvc3Q7XG4gIHJlbW92ZTtcbiAgaGVhZDtcbiAgdHJhY2U7XG4gIG9wdGlvbnM7XG4gIHBhdGNoO1xuICBnZXRSZXN0YW5ndWxhclVybDtcbiAgZ2V0UmVxdWVzdGVkVXJsO1xuICBwdXRFbGVtZW50O1xuICBhZGRSZXN0YW5ndWxhck1ldGhvZDtcbiAgZ2V0UGFyZW50TGlzdDtcbiAgY2xvbmU7XG4gIGlkcztcbiAgaHR0cENvbmZpZztcbiAgcmVxUGFyYW1zO1xuICBvbmU7XG4gIGFsbDtcbiAgc2V2ZXJhbDtcbiAgb25lVXJsO1xuICBhbGxVcmw7XG4gIGN1c3RvbVBVVDtcbiAgY3VzdG9tUEFUQ0g7XG4gIGN1c3RvbVBPU1Q7XG4gIGN1c3RvbURFTEVURTtcbiAgY3VzdG9tR0VUO1xuICBjdXN0b21HRVRMSVNUO1xuICBjdXN0b21PcGVyYXRpb247XG4gIGRvUFVUO1xuICBkb1BBVENIO1xuICBkb1BPU1Q7XG4gIGRvREVMRVRFO1xuICBkb0dFVDtcbiAgZG9HRVRMSVNUO1xuICBmcm9tU2VydmVyO1xuICB3aXRoQ29uZmlnO1xuICB3aXRoSHR0cENvbmZpZztcbiAgc2luZ2xlT25lO1xuICBwbGFpbjtcbiAgc2F2ZTtcbiAgcmVzdGFuZ3VsYXJpemVkO1xuICByZXN0YW5ndWxhcml6ZUVsZW1lbnQ7XG4gIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFJFU1RBTkdVTEFSKSBwdWJsaWMgY29uZmlnT2JqLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgaHR0cDogUmVzdGFuZ3VsYXJIdHRwXG4gICkge1xuICAgIHRoaXMucHJvdmlkZXIgPSBuZXcgcHJvdmlkZXJDb25maWcoaHR0cCk7XG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLnByb3ZpZGVyLiRnZXQoKTtcbiAgICBhc3NpZ24odGhpcywgZWxlbWVudCk7XG5cbiAgICB0aGlzLnNldERlZmF1bHRDb25maWcoKTtcbiAgfVxuXG4gIHNldERlZmF1bHRDb25maWcoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZ09iaiB8fCAhaXNGdW5jdGlvbih0aGlzLmNvbmZpZ09iai5mbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYXJyREkgPSBtYXAodGhpcy5jb25maWdPYmouYXJyU2VydmljZXMsIChzZXJ2aWNlcykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KHNlcnZpY2VzKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29uZmlnT2JqLmZuKC4uLlt0aGlzLnByb3ZpZGVyLCAuLi5hcnJESV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb3ZpZGVyQ29uZmlnKCRodHRwKSB7XG4gIHZhciBnbG9iYWxDb25maWd1cmF0aW9uID0ge307XG5cbiAgUmVzdGFuZ3VsYXJDb25maWd1cmVyKHRoaXMsIGdsb2JhbENvbmZpZ3VyYXRpb24pO1xuXG4gIHRoaXMuJGdldCA9ICRnZXRcblxuICBmdW5jdGlvbiAkZ2V0KCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VydmljZUZvckNvbmZpZ3VyYXRpb24oY29uZmlnKSB7XG4gICAgICB2YXIgc2VydmljZTogYW55ID0ge307XG5cbiAgICAgIHZhciB1cmxIYW5kbGVyID0gbmV3IGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeVtjb25maWcudXJsQ3JlYXRvcl0oKTtcbiAgICAgIHVybEhhbmRsZXIuc2V0Q29uZmlnKGNvbmZpZyk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3Rhbmd1bGFyaXplQmFzZShwYXJlbnQsIGVsZW0sIHJvdXRlLCByZXFQYXJhbXMsIGZyb21TZXJ2ZXIpIHtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdID0gcm91dGU7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldFJlc3Rhbmd1bGFyVXJsXSA9IGJpbmQodXJsSGFuZGxlci5mZXRjaFVybCwgdXJsSGFuZGxlciwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldFJlcXVlc3RlZFVybF0gPSBiaW5kKHVybEhhbmRsZXIuZmV0Y2hSZXF1ZXN0ZWRVcmwsIHVybEhhbmRsZXIsIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5hZGRSZXN0YW5ndWxhck1ldGhvZF0gPSBiaW5kKGFkZFJlc3Rhbmd1bGFyTWV0aG9kRnVuY3Rpb24sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jbG9uZV0gPSBiaW5kKGNvcHlSZXN0YW5ndWxhcml6ZWRFbGVtZW50LCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVxUGFyYW1zXSA9IGlzRW1wdHkocmVxUGFyYW1zKSA/IG51bGwgOiByZXFQYXJhbXM7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLndpdGhIdHRwQ29uZmlnXSA9IGJpbmQod2l0aEh0dHBDb25maWcsIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wbGFpbl0gPSBiaW5kKHN0cmlwUmVzdGFuZ3VsYXIsIGVsZW0sIGVsZW0pO1xuXG4gICAgICAgIC8vIFRhZyBlbGVtZW50IGFzIHJlc3Rhbmd1bGFyaXplZFxuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhcml6ZWRdID0gdHJ1ZTtcblxuICAgICAgICAvLyBSZXF1ZXN0TGVzcyBjb25uZWN0aW9uXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLm9uZV0gPSBiaW5kKG9uZSwgZWxlbSwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmFsbF0gPSBiaW5kKGFsbCwgZWxlbSwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNldmVyYWxdID0gYmluZChzZXZlcmFsLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub25lVXJsXSA9IGJpbmQob25lVXJsLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuYWxsVXJsXSA9IGJpbmQoYWxsVXJsLCBlbGVtLCBlbGVtKTtcblxuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5mcm9tU2VydmVyXSA9ICEhZnJvbVNlcnZlcjtcblxuICAgICAgICBpZiAocGFyZW50ICYmIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50KHJvdXRlKSkge1xuICAgICAgICAgIHZhciBwYXJlbnRJZCA9IGNvbmZpZy5nZXRJZEZyb21FbGVtKHBhcmVudCk7XG4gICAgICAgICAgdmFyIHBhcmVudFVybCA9IGNvbmZpZy5nZXRVcmxGcm9tRWxlbShwYXJlbnQpO1xuXG4gICAgICAgICAgdmFyIHJlc3Rhbmd1bGFyRmllbGRzRm9yUGFyZW50ID0gdW5pb24oXG4gICAgICAgICAgICB2YWx1ZXMocGljayhjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMsIFsncm91dGUnLCAnc2luZ2xlT25lJywgJ3BhcmVudFJlc291cmNlJ10pKSxcbiAgICAgICAgICAgIGNvbmZpZy5leHRyYUZpZWxkc1xuICAgICAgICAgICk7XG4gICAgICAgICAgdmFyIHBhcmVudFJlc291cmNlID0gcGljayhwYXJlbnQsIHJlc3Rhbmd1bGFyRmllbGRzRm9yUGFyZW50KTtcblxuICAgICAgICAgIGlmIChjb25maWcuaXNWYWxpZElkKHBhcmVudElkKSkge1xuICAgICAgICAgICAgY29uZmlnLnNldElkVG9FbGVtKHBhcmVudFJlc291cmNlLCBwYXJlbnRJZCwgcm91dGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29uZmlnLmlzVmFsaWRJZChwYXJlbnRVcmwpKSB7XG4gICAgICAgICAgICBjb25maWcuc2V0VXJsVG9FbGVtKHBhcmVudFJlc291cmNlLCBwYXJlbnRVcmwsIHJvdXRlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0gPSBwYXJlbnRSZXNvdXJjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbmUocGFyZW50LCByb3V0ZSwgaWQsIHNpbmdsZU9uZSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIGlmIChpc051bWJlcihyb3V0ZSkgfHwgaXNOdW1iZXIocGFyZW50KSkge1xuICAgICAgICAgIGVycm9yID0gJ1lvdVxcJ3JlIGNyZWF0aW5nIGEgUmVzdGFuZ3VsYXIgZW50aXR5IHdpdGggdGhlIG51bWJlciAnO1xuICAgICAgICAgIGVycm9yICs9ICdpbnN0ZWFkIG9mIHRoZSByb3V0ZSBvciB0aGUgcGFyZW50LiBGb3IgZXhhbXBsZSwgeW91IGNhblxcJ3QgY2FsbCAub25lKDEyKS4nO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHJvdXRlKSkge1xuICAgICAgICAgIGVycm9yID0gJ1lvdVxcJ3JlIGNyZWF0aW5nIGEgUmVzdGFuZ3VsYXIgZW50aXR5IGVpdGhlciB3aXRob3V0IHRoZSBwYXRoLiAnO1xuICAgICAgICAgIGVycm9yICs9ICdGb3IgZXhhbXBsZSB5b3UgY2FuXFwndCBjYWxsIC5vbmUoKS4gUGxlYXNlIGNoZWNrIGlmIHlvdXIgYXJndW1lbnRzIGFyZSB2YWxpZC4nO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW0gPSB7fTtcbiAgICAgICAgY29uZmlnLnNldElkVG9FbGVtKGVsZW0sIGlkLCByb3V0ZSk7XG4gICAgICAgIGNvbmZpZy5zZXRGaWVsZFRvRWxlbShjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2luZ2xlT25lLCBlbGVtLCBzaW5nbGVPbmUpO1xuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVFbGVtKHBhcmVudCwgZWxlbSwgcm91dGUsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWxsKHBhcmVudCwgcm91dGUpIHtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIFtdLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXZlcmFsKHBhcmVudCwgcm91dGUgLyosIGlkcyAqLykge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IFtdO1xuICAgICAgICBjb2xsZWN0aW9uW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZHNdID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb24ocGFyZW50LCBjb2xsZWN0aW9uLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbmVVcmwocGFyZW50LCByb3V0ZSwgdXJsKSB7XG4gICAgICAgIGlmICghcm91dGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JvdXRlIGlzIG1hbmRhdG9yeSB3aGVuIGNyZWF0aW5nIG5ldyBSZXN0YW5ndWxhciBvYmplY3RzLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtID0ge307XG4gICAgICAgIGNvbmZpZy5zZXRVcmxUb0VsZW0oZWxlbSwgdXJsLCByb3V0ZSk7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhbGxVcmwocGFyZW50LCByb3V0ZSwgdXJsKSB7XG4gICAgICAgIGlmICghcm91dGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JvdXRlIGlzIG1hbmRhdG9yeSB3aGVuIGNyZWF0aW5nIG5ldyBSZXN0YW5ndWxhciBvYmplY3RzLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtID0ge307XG4gICAgICAgIGNvbmZpZy5zZXRVcmxUb0VsZW0oZWxlbSwgdXJsLCByb3V0ZSk7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb24ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcm9taXNlc1xuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVSZXNwb25zZShzdWJqZWN0LCBpc0NvbGxlY3Rpb24sIHZhbHVlVG9GaWxsKSB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LnBpcGUoZmlsdGVyKHJlcyA9PiAhIXJlcykpLnRvUHJvbWlzZSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgZGF0YSwgZmlsbGVkVmFsdWUpIHtcbiAgICAgICAgZXh0ZW5kKGZpbGxlZFZhbHVlLCBkYXRhKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIHRoZSBmdWxsIHJlc3BvbnNlIGludGVyY2VwdG9yLlxuICAgICAgICBpZiAoY29uZmlnLmZ1bGxSZXNwb25zZSkge1xuICAgICAgICAgIHN1YmplY3QubmV4dChleHRlbmQocmVzcG9uc2UsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ViamVjdC5uZXh0KGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbGVtZW50c1xuICAgICAgZnVuY3Rpb24gc3RyaXBSZXN0YW5ndWxhcihlbGVtKSB7XG4gICAgICAgIGlmIChpc0FycmF5KGVsZW0pKSB7XG4gICAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgICAgZWFjaChlbGVtLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goY29uZmlnLmlzUmVzdGFuZ3VsYXJpemVkKHZhbHVlKSA/IHN0cmlwUmVzdGFuZ3VsYXIodmFsdWUpIDogdmFsdWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb21pdChlbGVtLCB2YWx1ZXMob21pdChjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMsICdpZCcpKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkQ3VzdG9tT3BlcmF0aW9uKGVsZW0pIHtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY3VzdG9tT3BlcmF0aW9uXSA9IGJpbmQoY3VzdG9tRnVuY3Rpb24sIGVsZW0pO1xuICAgICAgICB2YXIgcmVxdWVzdE1ldGhvZHMgPSB7Z2V0OiBjdXN0b21GdW5jdGlvbiwgZGVsZXRlOiBjdXN0b21GdW5jdGlvbn07XG4gICAgICAgIGVhY2goWydwdXQnLCAncGF0Y2gnLCAncG9zdCddLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIHJlcXVlc3RNZXRob2RzW25hbWVdID0gZnVuY3Rpb24gKG9wZXJhdGlvbiwgZWxlbSwgcGF0aCwgcGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gYmluZChjdXN0b21GdW5jdGlvbiwgdGhpcykob3BlcmF0aW9uLCBwYXRoLCBwYXJhbXMsIGhlYWRlcnMsIGVsZW0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBlYWNoKHJlcXVlc3RNZXRob2RzLCBmdW5jdGlvbiAocmVxdWVzdEZ1bmMsIG5hbWUpIHtcbiAgICAgICAgICB2YXIgY2FsbE9wZXJhdGlvbiA9IG5hbWUgPT09ICdkZWxldGUnID8gJ3JlbW92ZScgOiBuYW1lO1xuICAgICAgICAgIGVhY2goWydkbycsICdjdXN0b20nXSwgZnVuY3Rpb24gKGFsaWFzKSB7XG4gICAgICAgICAgICBlbGVtW2FsaWFzICsgbmFtZS50b1VwcGVyQ2FzZSgpXSA9IGJpbmQocmVxdWVzdEZ1bmMsIGVsZW0sIGNhbGxPcGVyYXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY3VzdG9tR0VUTElTVF0gPSBiaW5kKGZldGNoRnVuY3Rpb24sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5kb0dFVExJU1RdID0gZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY3VzdG9tR0VUTElTVF07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNvcHlSZXN0YW5ndWxhcml6ZWRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNvcGllZEVsZW1lbnQgPSBjbG9uZURlZXAoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0oY29waWVkRWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgIGNvcGllZEVsZW1lbnQsIGNvcGllZEVsZW1lbnRbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3Rhbmd1bGFyaXplRWxlbShwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBmcm9tU2VydmVyPywgY29sbGVjdGlvbj8sIHJlcVBhcmFtcz8pIHtcbiAgICAgICAgdmFyIGVsZW0gPSBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkKGVsZW1lbnQsIGZhbHNlLCByb3V0ZSk7XG5cbiAgICAgICAgdmFyIGxvY2FsRWxlbSA9IHJlc3Rhbmd1bGFyaXplQmFzZShwYXJlbnQsIGVsZW0sIHJvdXRlLCByZXFQYXJhbXMsIGZyb21TZXJ2ZXIpO1xuXG4gICAgICAgIGlmIChjb25maWcudXNlQ2Fubm9uaWNhbElkKSB7XG4gICAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jYW5ub25pY2FsSWRdID0gY29uZmlnLmdldElkRnJvbUVsZW0obG9jYWxFbGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5nZXRQYXJlbnRMaXN0XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0gPSBmYWxzZTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5nZXRdID0gYmluZChnZXRGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5nZXRMaXN0XSA9IGJpbmQoZmV0Y2hGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wdXRdID0gYmluZChwdXRGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wb3N0XSA9IGJpbmQocG9zdEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlbW92ZV0gPSBiaW5kKGRlbGV0ZUZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmhlYWRdID0gYmluZChoZWFkRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMudHJhY2VdID0gYmluZCh0cmFjZUZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLm9wdGlvbnNdID0gYmluZChvcHRpb25zRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGF0Y2hdID0gYmluZChwYXRjaEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNhdmVdID0gYmluZChzYXZlLCBsb2NhbEVsZW0pO1xuXG4gICAgICAgIGFkZEN1c3RvbU9wZXJhdGlvbihsb2NhbEVsZW0pO1xuICAgICAgICByZXR1cm4gY29uZmlnLnRyYW5zZm9ybUVsZW0obG9jYWxFbGVtLCBmYWxzZSwgcm91dGUsIHNlcnZpY2UsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb24ocGFyZW50LCBlbGVtZW50LCByb3V0ZSwgZnJvbVNlcnZlcj8sIHJlcVBhcmFtcz8pIHtcbiAgICAgICAgdmFyIGVsZW0gPSBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkKGVsZW1lbnQsIHRydWUsIHJvdXRlKTtcblxuICAgICAgICB2YXIgbG9jYWxFbGVtID0gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcik7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSA9IHRydWU7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucG9zdF0gPSBiaW5kKHBvc3RGdW5jdGlvbiwgbG9jYWxFbGVtLCBudWxsKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZW1vdmVdID0gYmluZChkZWxldGVGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5oZWFkXSA9IGJpbmQoaGVhZEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnRyYWNlXSA9IGJpbmQodHJhY2VGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wdXRFbGVtZW50XSA9IGJpbmQocHV0RWxlbWVudEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLm9wdGlvbnNdID0gYmluZChvcHRpb25zRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGF0Y2hdID0gYmluZChwYXRjaEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldF0gPSBiaW5kKGdldEJ5SWQsIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0TGlzdF0gPSBiaW5kKGZldGNoRnVuY3Rpb24sIGxvY2FsRWxlbSwgbnVsbCk7XG5cbiAgICAgICAgYWRkQ3VzdG9tT3BlcmF0aW9uKGxvY2FsRWxlbSk7XG4gICAgICAgIHJldHVybiBjb25maWcudHJhbnNmb3JtRWxlbShsb2NhbEVsZW0sIHRydWUsIHJvdXRlLCBzZXJ2aWNlLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uQW5kRWxlbWVudHMocGFyZW50LCBlbGVtZW50LCByb3V0ZSkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBmYWxzZSk7XG4gICAgICAgIGVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgcmVzdGFuZ3VsYXJpemVFbGVtKHBhcmVudCwgZWxlbSwgcm91dGUsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0QnlJZChpZCwgcmVxUGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbUdFVChpZC50b1N0cmluZygpLCByZXFQYXJhbXMsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwdXRFbGVtZW50RnVuY3Rpb24oaWR4LCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgdmFyIF9fdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBlbGVtVG9QdXQgPSB0aGlzW2lkeF07XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICAgICAgdmFyIGZpbGxlZEFycmF5ID0gW107XG4gICAgICAgIGZpbGxlZEFycmF5ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkQXJyYXksIHRydWUsIGVsZW1Ub1B1dFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLCBzZXJ2aWNlKTtcblxuICAgICAgICBlbGVtVG9QdXQucHV0KHBhcmFtcywgaGVhZGVycylcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoc2VydmVyRWxlbSkge1xuICAgICAgICAgIHZhciBuZXdBcnJheSA9IGNvcHlSZXN0YW5ndWxhcml6ZWRFbGVtZW50KF9fdGhpcyk7XG4gICAgICAgICAgbmV3QXJyYXlbaWR4XSA9IHNlcnZlckVsZW07XG4gICAgICAgICAgZmlsbGVkQXJyYXkgPSBuZXdBcnJheTtcbiAgICAgICAgICBzdWJqZWN0Lm5leHQobmV3QXJyYXkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBzdWJqZWN0LmVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplUmVzcG9uc2Uoc3ViamVjdCwgdHJ1ZSwgZmlsbGVkQXJyYXkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwYXJzZVJlc3BvbnNlKHJlc0RhdGEsIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLCByZXNwb25zZSwgc3ViamVjdCkge1xuICAgICAgICB2YXIgZGF0YSA9IGNvbmZpZy5yZXNwb25zZUV4dHJhY3RvcihyZXNEYXRhLCBvcGVyYXRpb24sIHJvdXRlLCBmZXRjaFVybCwgcmVzcG9uc2UsIHN1YmplY3QpO1xuICAgICAgICB2YXIgZXRhZyA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdFVGFnJyk7XG4gICAgICAgIGlmIChkYXRhICYmIGV0YWcpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5ldGFnXSA9IGV0YWc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZldGNoRnVuY3Rpb24od2hhdCwgcmVxUGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHZhciBfX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgICAgIHZhciBvcGVyYXRpb24gPSAnZ2V0TGlzdCc7XG4gICAgICAgIHZhciB1cmwgPSB1cmxIYW5kbGVyLmZldGNoVXJsKHRoaXMsIHdoYXQpO1xuICAgICAgICB2YXIgd2hhdEZldGNoZWQgPSB3aGF0IHx8IF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gY29uZmlnLmZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3IobnVsbCwgb3BlcmF0aW9uLFxuICAgICAgICAgIHdoYXRGZXRjaGVkLCB1cmwsIGhlYWRlcnMgfHwge30sIHJlcVBhcmFtcyB8fCB7fSwgdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gfHwge30pO1xuXG4gICAgICAgIHZhciBmaWxsZWRBcnJheSA9IFtdO1xuICAgICAgICBmaWxsZWRBcnJheSA9IGNvbmZpZy50cmFuc2Zvcm1FbGVtKGZpbGxlZEFycmF5LCB0cnVlLCB3aGF0RmV0Y2hlZCwgc2VydmljZSk7XG5cbiAgICAgICAgdmFyIG1ldGhvZCA9ICdnZXRMaXN0JztcblxuICAgICAgICBpZiAoY29uZmlnLmpzb25wKSB7XG4gICAgICAgICAgbWV0aG9kID0gJ2pzb25wJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBva0NhbGxiYWNrID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHJlc0RhdGEgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgIHZhciBmdWxsUGFyYW1zID0gcmVzcG9uc2UuY29uZmlnLnBhcmFtcztcbiAgICAgICAgICB2YXIgZGF0YSA9IHBhcnNlUmVzcG9uc2UocmVzRGF0YSwgb3BlcmF0aW9uLCB3aGF0RmV0Y2hlZCwgdXJsLCByZXNwb25zZSwgc3ViamVjdCk7XG5cbiAgICAgICAgICAvLyBzdXBwb3J0IGVtcHR5IHJlc3BvbnNlIGZvciBnZXRMaXN0KCkgY2FsbHMgKHNvbWUgQVBJcyByZXNwb25kIHdpdGggMjA0IGFuZCBlbXB0eSBib2R5KVxuICAgICAgICAgIGlmIChpc1VuZGVmaW5lZChkYXRhKSB8fCAnJyA9PT0gZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzcG9uc2UgZm9yIGdldExpc3QgU0hPVUxEIGJlIGFuIGFycmF5IGFuZCBub3QgYW4gb2JqZWN0IG9yIHNvbWV0aGluZyBlbHNlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRydWUgPT09IGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBkYXRhLCBmaWxsZWRBcnJheSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBtYXAoZGF0YSwgZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICAgIGlmICghX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0oX190aGlzLCBlbGVtLCB3aGF0LCB0cnVlLCBkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0oX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0sXG4gICAgICAgICAgICAgICAgZWxlbSwgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0sIHRydWUsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcHJvY2Vzc2VkRGF0YSA9IGV4dGVuZChkYXRhLCBwcm9jZXNzZWREYXRhKTtcblxuICAgICAgICAgIGlmICghX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dKSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShcbiAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICAgIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihcbiAgICAgICAgICAgICAgICBfX3RoaXMsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkRGF0YSxcbiAgICAgICAgICAgICAgICB3aGF0LFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgZnVsbFBhcmFtc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBmaWxsZWRBcnJheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UoXG4gICAgICAgICAgICAgIHN1YmplY3QsXG4gICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgICByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb24oXG4gICAgICAgICAgICAgICAgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0sXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkRGF0YSxcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgIGZ1bGxQYXJhbXNcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgZmlsbGVkQXJyYXlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHVybEhhbmRsZXIucmVzb3VyY2UodGhpcywgJGh0dHAsIHJlcXVlc3QuaHR0cENvbmZpZywgcmVxdWVzdC5oZWFkZXJzLCByZXF1ZXN0LnBhcmFtcywgd2hhdCxcbiAgICAgICAgICB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5ldGFnXSwgb3BlcmF0aW9uKVttZXRob2RdKClcbiAgICAgICAgLnN1YnNjcmliZShva0NhbGxiYWNrLCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSkge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDMwNCAmJiBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBfX3RoaXMsIGZpbGxlZEFycmF5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZXJ5KGNvbmZpZy5lcnJvckludGVyY2VwdG9ycywgZnVuY3Rpb24gKGNiOiBhbnkpIHtcblxuICAgICAgICAgICAgICByZXR1cm4gY2IocmVzcG9uc2UsIHN1YmplY3QsIG9rQ2FsbGJhY2spICE9PSBmYWxzZTtcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAvLyB0cmlnZ2VyZWQgaWYgbm8gY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICAgICAgICAgICAgc3ViamVjdC5lcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVSZXNwb25zZShzdWJqZWN0LCB0cnVlLCBmaWxsZWRBcnJheSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHdpdGhIdHRwQ29uZmlnKGh0dHBDb25maWcpIHtcbiAgICAgICAgdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gPSBodHRwQ29uZmlnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2F2ZShwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgaWYgKHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dF0ocGFyYW1zLCBoZWFkZXJzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdwb3N0JywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZWxlbUZ1bmN0aW9uKG9wZXJhdGlvbiwgd2hhdCwgcGFyYW1zLCBvYmosIGhlYWRlcnMpIHtcbiAgICAgICAgdmFyIF9fdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICAgICAgdmFyIHJlc1BhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIHJvdXRlID0gd2hhdCB8fCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV07XG4gICAgICAgIHZhciBmZXRjaFVybCA9IHVybEhhbmRsZXIuZmV0Y2hVcmwodGhpcywgd2hhdCk7XG5cbiAgICAgICAgdmFyIGNhbGxPYmogPSBvYmogfHwgdGhpcztcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gZXRhZyBvbiByZXN0YW5ndWxhciBvYmplY3QgKHNpbmNlIGZvciBjdXN0b20gbWV0aG9kcyB3ZSBwcm9iYWJseSBkb24ndCBleHBsaWNpdGx5IHNwZWNpZnkgdGhlIGV0YWcgZmllbGQpXG4gICAgICAgIHZhciBldGFnID0gY2FsbE9ialtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZXRhZ10gfHwgKG9wZXJhdGlvbiAhPT0gJ3Bvc3QnID8gdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZXRhZ10gOiBudWxsKTtcblxuICAgICAgICBpZiAoaXNPYmplY3QoY2FsbE9iaikgJiYgY29uZmlnLmlzUmVzdGFuZ3VsYXJpemVkKGNhbGxPYmopKSB7XG4gICAgICAgICAgY2FsbE9iaiA9IHN0cmlwUmVzdGFuZ3VsYXIoY2FsbE9iaik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBjb25maWcuZnVsbFJlcXVlc3RJbnRlcmNlcHRvcihjYWxsT2JqLCBvcGVyYXRpb24sIHJvdXRlLCBmZXRjaFVybCxcbiAgICAgICAgICBoZWFkZXJzIHx8IHt9LCByZXNQYXJhbXMgfHwge30sIHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmh0dHBDb25maWddIHx8IHt9KTtcblxuICAgICAgICB2YXIgZmlsbGVkT2JqZWN0ID0ge307XG4gICAgICAgIGZpbGxlZE9iamVjdCA9IGNvbmZpZy50cmFuc2Zvcm1FbGVtKGZpbGxlZE9iamVjdCwgZmFsc2UsIHJvdXRlLCBzZXJ2aWNlKTtcblxuICAgICAgICB2YXIgb2tDYWxsYmFjayA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciByZXNEYXRhID0gZ2V0KHJlc3BvbnNlLCAnYm9keScpO1xuICAgICAgICAgIHZhciBmdWxsUGFyYW1zID0gZ2V0KHJlc3BvbnNlLCAnY29uZmlnLnBhcmFtcycpO1xuXG4gICAgICAgICAgdmFyIGVsZW0gPSBwYXJzZVJlc3BvbnNlKHJlc0RhdGEsIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLCByZXNwb25zZSwgc3ViamVjdCk7XG5cbiAgICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgICAgICBpZiAodHJ1ZSA9PT0gY29uZmlnLnBsYWluQnlEZWZhdWx0KSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgZWxlbSwgZmlsbGVkT2JqZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ3Bvc3QnICYmICFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgICAgZGF0YSA9IHJlc3Rhbmd1bGFyaXplRWxlbShcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBlbGVtLFxuICAgICAgICAgICAgICAgIHJvdXRlLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBmdWxsUGFyYW1zXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBkYXRhLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0YSA9IHJlc3Rhbmd1bGFyaXplRWxlbShcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBlbGVtLFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBmdWxsUGFyYW1zXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgZGF0YVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2luZ2xlT25lXSA9IF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2luZ2xlT25lXTtcbiAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIGRhdGEsIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIHVuZGVmaW5lZCwgZmlsbGVkT2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGVycm9yQ2FsbGJhY2sgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAzMDQgJiYgY29uZmlnLmlzU2FmZShvcGVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgX190aGlzLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlcnkoY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAoY2I6IGFueSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2IocmVzcG9uc2UsIHN1YmplY3QsIG9rQ2FsbGJhY2spICE9PSBmYWxzZTtcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAvLyB0cmlnZ2VyZWQgaWYgbm8gY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICAgICAgICAgICAgc3ViamVjdC5lcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBPdmVycmlkaW5nIEhUVFAgTWV0aG9kXG4gICAgICAgIHZhciBjYWxsT3BlcmF0aW9uID0gb3BlcmF0aW9uO1xuICAgICAgICB2YXIgY2FsbEhlYWRlcnMgPSBleHRlbmQoe30sIHJlcXVlc3QuaGVhZGVycyk7XG4gICAgICAgIHZhciBpc092ZXJyaWRlT3BlcmF0aW9uID0gY29uZmlnLmlzT3ZlcnJpZGVuTWV0aG9kKG9wZXJhdGlvbik7XG4gICAgICAgIGlmIChpc092ZXJyaWRlT3BlcmF0aW9uKSB7XG4gICAgICAgICAgY2FsbE9wZXJhdGlvbiA9ICdwb3N0JztcbiAgICAgICAgICBjYWxsSGVhZGVycyA9IGV4dGVuZChjYWxsSGVhZGVycywgeydYLUhUVFAtTWV0aG9kLU92ZXJyaWRlJzogb3BlcmF0aW9uID09PSAncmVtb3ZlJyA/ICdERUxFVEUnIDogb3BlcmF0aW9uLnRvVXBwZXJDYXNlKCl9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuanNvbnAgJiYgY2FsbE9wZXJhdGlvbiA9PT0gJ2dldCcpIHtcbiAgICAgICAgICBjYWxsT3BlcmF0aW9uID0gJ2pzb25wJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICBpZiAoaXNPdmVycmlkZU9wZXJhdGlvbikge1xuICAgICAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCBjYWxsSGVhZGVycywgcmVxdWVzdC5wYXJhbXMsXG4gICAgICAgICAgICAgIHdoYXQsIGV0YWcsIGNhbGxPcGVyYXRpb24pW2NhbGxPcGVyYXRpb25dKHt9KS5zdWJzY3JpYmUob2tDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybEhhbmRsZXIucmVzb3VyY2UodGhpcywgJGh0dHAsIHJlcXVlc3QuaHR0cENvbmZpZywgY2FsbEhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLFxuICAgICAgICAgICAgICB3aGF0LCBldGFnLCBjYWxsT3BlcmF0aW9uKVtjYWxsT3BlcmF0aW9uXSgpLnN1YnNjcmliZShva0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCBjYWxsSGVhZGVycywgcmVxdWVzdC5wYXJhbXMsXG4gICAgICAgICAgICB3aGF0LCBldGFnLCBjYWxsT3BlcmF0aW9uKVtjYWxsT3BlcmF0aW9uXShyZXF1ZXN0LmVsZW1lbnQpLnN1YnNjcmliZShva0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZVJlc3BvbnNlKHN1YmplY3QsIGZhbHNlLCBmaWxsZWRPYmplY3QpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgnZ2V0JywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRlbGV0ZUZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdyZW1vdmUnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcHV0RnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3B1dCcsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwb3N0RnVuY3Rpb24od2hhdCwgZWxlbSwgcGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3Bvc3QnLCB3aGF0LCBwYXJhbXMsIGVsZW0sIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoZWFkRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ2hlYWQnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdHJhY2VGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgndHJhY2UnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb3B0aW9uc0Z1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdvcHRpb25zJywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBhdGNoRnVuY3Rpb24oZWxlbSwgcGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3BhdGNoJywgdW5kZWZpbmVkLCBwYXJhbXMsIGVsZW0sIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjdXN0b21GdW5jdGlvbihvcGVyYXRpb24sIHBhdGgsIHBhcmFtcywgaGVhZGVycywgZWxlbSkge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKG9wZXJhdGlvbiwgcGF0aCwgcGFyYW1zLCBlbGVtLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkUmVzdGFuZ3VsYXJNZXRob2RGdW5jdGlvbihuYW1lLCBvcGVyYXRpb24sIHBhdGgsIGRlZmF1bHRQYXJhbXMsIGRlZmF1bHRIZWFkZXJzLCBkZWZhdWx0RWxlbSkge1xuICAgICAgICB2YXIgYmluZGVkRnVuY3Rpb247XG4gICAgICAgIGlmIChvcGVyYXRpb24gPT09ICdnZXRMaXN0Jykge1xuICAgICAgICAgIGJpbmRlZEZ1bmN0aW9uID0gYmluZChmZXRjaEZ1bmN0aW9uLCB0aGlzLCBwYXRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiaW5kZWRGdW5jdGlvbiA9IGJpbmQoY3VzdG9tRnVuY3Rpb24sIHRoaXMsIG9wZXJhdGlvbiwgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3JlYXRlZEZ1bmN0aW9uID0gZnVuY3Rpb24gKHBhcmFtcywgaGVhZGVycywgZWxlbSkge1xuICAgICAgICAgIHZhciBjYWxsUGFyYW1zID0gZGVmYXVsdHMoe1xuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgICAgZWxlbTogZWxlbVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHBhcmFtczogZGVmYXVsdFBhcmFtcyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGRlZmF1bHRIZWFkZXJzLFxuICAgICAgICAgICAgZWxlbTogZGVmYXVsdEVsZW1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gYmluZGVkRnVuY3Rpb24oY2FsbFBhcmFtcy5wYXJhbXMsIGNhbGxQYXJhbXMuaGVhZGVycywgY2FsbFBhcmFtcy5lbGVtKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY29uZmlnLmlzU2FmZShvcGVyYXRpb24pKSB7XG4gICAgICAgICAgdGhpc1tuYW1lXSA9IGNyZWF0ZWRGdW5jdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gZnVuY3Rpb24gKGVsZW0sIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZWRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMsIGVsZW0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gd2l0aENvbmZpZ3VyYXRpb25GdW5jdGlvbihjb25maWd1cmVyKSB7XG4gICAgICAgIHZhciBuZXdDb25maWcgPSBjbG9uZShvbWl0KGNvbmZpZywgJ2NvbmZpZ3VyYXRpb24nKSk7XG4gICAgICAgIFJlc3Rhbmd1bGFyQ29uZmlndXJlcihuZXdDb25maWcsIG5ld0NvbmZpZyk7XG4gICAgICAgIGNvbmZpZ3VyZXIobmV3Q29uZmlnKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVNlcnZpY2VGb3JDb25maWd1cmF0aW9uKG5ld0NvbmZpZyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRvU2VydmljZShyb3V0ZSwgcGFyZW50KSB7XG4gICAgICAgIHZhciBrbm93bkNvbGxlY3Rpb25NZXRob2RzID0gdmFsdWVzKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyk7XG4gICAgICAgIHZhciBzZXJ2OiBhbnkgPSB7fTtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSAocGFyZW50IHx8IHNlcnZpY2UpLmFsbChyb3V0ZSk7XG4gICAgICAgIHNlcnYub25lID0gYmluZChvbmUsIChwYXJlbnQgfHwgc2VydmljZSksIHBhcmVudCwgcm91dGUpO1xuICAgICAgICBzZXJ2LmFsbCA9IGJpbmQoY29sbGVjdGlvbi5hbGwsIGNvbGxlY3Rpb24pO1xuICAgICAgICBzZXJ2LnBvc3QgPSBiaW5kKGNvbGxlY3Rpb24ucG9zdCwgY29sbGVjdGlvbik7XG4gICAgICAgIHNlcnYuZ2V0TGlzdCA9IGJpbmQoY29sbGVjdGlvbi5nZXRMaXN0LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgc2Vydi53aXRoSHR0cENvbmZpZyA9IGJpbmQoY29sbGVjdGlvbi53aXRoSHR0cENvbmZpZywgY29sbGVjdGlvbik7XG4gICAgICAgIHNlcnYuZ2V0ID0gYmluZChjb2xsZWN0aW9uLmdldCwgY29sbGVjdGlvbik7XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGNvbGxlY3Rpb24uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgaXNGdW5jdGlvbihjb2xsZWN0aW9uW3Byb3BdKSAmJiAhaW5jbHVkZXMoa25vd25Db2xsZWN0aW9uTWV0aG9kcywgcHJvcCkpIHtcbiAgICAgICAgICAgIHNlcnZbcHJvcF0gPSBiaW5kKGNvbGxlY3Rpb25bcHJvcF0sIGNvbGxlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZXJ2O1xuICAgICAgfVxuXG4gICAgICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIoc2VydmljZSwgY29uZmlnKTtcblxuICAgICAgc2VydmljZS5jb3B5ID0gYmluZChjb3B5UmVzdGFuZ3VsYXJpemVkRWxlbWVudCwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2Uuc2VydmljZSA9IGJpbmQodG9TZXJ2aWNlLCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS53aXRoQ29uZmlnID0gYmluZCh3aXRoQ29uZmlndXJhdGlvbkZ1bmN0aW9uLCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS5vbmUgPSBiaW5kKG9uZSwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2UuYWxsID0gYmluZChhbGwsIHNlcnZpY2UsIG51bGwpO1xuXG4gICAgICBzZXJ2aWNlLnNldmVyYWwgPSBiaW5kKHNldmVyYWwsIHNlcnZpY2UsIG51bGwpO1xuXG4gICAgICBzZXJ2aWNlLm9uZVVybCA9IGJpbmQob25lVXJsLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5hbGxVcmwgPSBiaW5kKGFsbFVybCwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2Uuc3RyaXBSZXN0YW5ndWxhciA9IGJpbmQoc3RyaXBSZXN0YW5ndWxhciwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2UucmVzdGFuZ3VsYXJpemVFbGVtZW50ID0gYmluZChyZXN0YW5ndWxhcml6ZUVsZW0sIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLnJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbiA9IGJpbmQocmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uQW5kRWxlbWVudHMsIHNlcnZpY2UpO1xuXG4gICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlU2VydmljZUZvckNvbmZpZ3VyYXRpb24oZ2xvYmFsQ29uZmlndXJhdGlvbik7XG4gIH07XG5cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyBuby11bnVzZWQtdmFyaWFibGUgKi9cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiwgSW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1JFU1RBTkdVTEFSLCBSZXN0YW5ndWxhckZhY3Rvcnl9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLmNvbmZpZyc7XG5pbXBvcnQge1Jlc3Rhbmd1bGFyfSBmcm9tICcuL25neC1yZXN0YW5ndWxhcic7XG5pbXBvcnQge1Jlc3Rhbmd1bGFySHR0cH0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXItaHR0cCc7XG5cbmV4cG9ydCBjb25zdCBDT05GSUdfT0JKID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ2NvbmZpZ09iaicpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1Jlc3Rhbmd1bGFySHR0cCwgUmVzdGFuZ3VsYXJdXG59KVxuZXhwb3J0IGNsYXNzIFJlc3Rhbmd1bGFyTW9kdWxlIHtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFJlc3Rhbmd1bGFyTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnUmVzdGFuZ3VsYXJNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChjb25maWcxPywgY29uZmlnMj8pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFJlc3Rhbmd1bGFyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBDT05GSUdfT0JKLCB1c2VWYWx1ZTogW2NvbmZpZzEsY29uZmlnMl19LFxuICAgICAgICB7cHJvdmlkZTogUkVTVEFOR1VMQVIsIHVzZUZhY3Rvcnk6IFJlc3Rhbmd1bGFyRmFjdG9yeSwgZGVwczogW0NPTkZJR19PQkpdfSxcbiAgICAgIF1cbiAgICB9XG4gIH1cblxufVxuIl0sIm5hbWVzIjpbIkluamVjdGlvblRva2VuIiwiaXNBcnJheSIsIkh0dHBSZXF1ZXN0IiwiYXNzaWduIiwiSHR0cFBhcmFtcyIsIkh0dHBIZWFkZXJzIiwiaHR0cCIsImZpbHRlciIsIkh0dHBSZXNwb25zZSIsIm1hcCIsInRocm93RXJyb3IiLCJIdHRwRXJyb3JSZXNwb25zZSIsImNhdGNoRXJyb3IiLCJJbmplY3RhYmxlIiwiSHR0cEJhY2tlbmQiLCJvYmplY3QiLCJpbmNsdWRlcyIsImlzVW5kZWZpbmVkIiwiaXNOdWxsIiwiZGVmYXVsdHMiLCJlYWNoIiwiZXh0ZW5kIiwiZmluZCIsImhhcyIsImluaXRpYWwiLCJsYXN0IiwiY2xvbmUiLCJyZWR1Y2UiLCJpc0Jvb2xlYW4iLCJrZXlzIiwiaXNFbXB0eSIsImZvckVhY2giLCJpc09iamVjdCIsImlzRnVuY3Rpb24iLCJPcHRpb25hbCIsIkluamVjdCIsIkluamVjdG9yIiwiYmluZCIsInVuaW9uIiwidmFsdWVzIiwicGljayIsImlzTnVtYmVyIiwib21pdCIsImNsb25lRGVlcCIsIkJlaGF2aW9yU3ViamVjdCIsImV2ZXJ5IiwiZ2V0IiwiTmdNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiU2tpcFNlbGYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5QkFJYSxXQUFXLEdBQUcsSUFBSUEsbUJBQWMsQ0FBUyx1QkFBdUIsQ0FBQyxDQUFDOzs7OztBQUMvRSxnQ0FBbUMsTUFBTTtRQUN2QyxxQkFBSSxTQUFTLEdBQUc7WUFDZCxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUM7UUFFRixJQUFJQyxjQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsU0FBUyxHQUFHO2dCQUNWLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNkLENBQUM7U0FDSDtRQUNELE9BQU8sU0FBUyxDQUFD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