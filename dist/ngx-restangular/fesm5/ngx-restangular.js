import { InjectionToken, Injectable, Inject, Injector, Optional, NgModule, SkipSelf } from '@angular/core';
import { isArray, includes, isUndefined, isNull, isObject, isBoolean, defaults, each, extend, find, has, initial, last, clone, reduce, keys, isEmpty, forEach, map as map$1, bind, union, values, pick, isFunction, isNumber, every, omit, get, cloneDeep } from 'lodash';
import { HttpRequest, HttpHeaders, HttpParams, HttpBackend, HttpErrorResponse, HttpResponse, HttpClientModule } from '@angular/common/http';
import { assign } from 'core-js/fn/object';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { __spread } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ RESTANGULAR = new InjectionToken('restangularWithConfig');
/**
 * @param {?} config
 * @return {?}
 */
function RestangularFactory(config) {
    var /** @type {?} */ configObj = {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RestangularHelper = /** @class */ (function () {
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
        var /** @type {?} */ request = new HttpRequest(methodName, options.url, options.data, {
            headers: requestHeaders,
            params: requestQueryParams,
            responseType: options.responseType,
            withCredentials: withCredentials
        });
        if (['GET', 'DELETE', 'HEAD', 'JSONP', 'OPTIONS'].indexOf(methodName) >= 0) {
            request = new HttpRequest(methodName, options.url, {
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
        var /** @type {?} */ requestQueryParams = assign({}, queryParams);
        var /** @type {?} */ search = new HttpParams();
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
        return new HttpHeaders(assign({}, headers));
    };
    return RestangularHelper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} object
 * @param {?} config
 * @return {?}
 */
function RestangularConfigurer(object, config) {
    object.configuration = config;
    /**
     * Those are HTTP safe methods for which there is no need to pass any data with the request.
     */
    var /** @type {?} */ safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];
    config.isSafe = function (operation) {
        return includes(safeMethods, operation.toLowerCase());
    };
    var /** @type {?} */ absolutePattern = /^https?:\/\//i;
    config.isAbsoluteUrl = function (string) {
        return isUndefined(config.absoluteUrl) || isNull(config.absoluteUrl) ?
            string && absolutePattern.test(string) :
            config.absoluteUrl;
    };
    config.absoluteUrl = isUndefined(config.absoluteUrl) ? true : config.absoluteUrl;
    object.setSelfLinkAbsoluteUrl = function (value) {
        config.absoluteUrl = value;
    };
    /**
       * This is the BaseURL to be used with Restangular
       */
    config.baseUrl = isUndefined(config.baseUrl) ? '' : config.baseUrl;
    object.setBaseUrl = function (newBaseUrl) {
        config.baseUrl = /\/$/.test(newBaseUrl) ?
            newBaseUrl.substring(0, newBaseUrl.length - 1) :
            newBaseUrl;
        return this;
    };
    /**
       * Sets the extra fields to keep from the parents
       */
    config.extraFields = config.extraFields || [];
    object.setExtraFields = function (newExtraFields) {
        config.extraFields = newExtraFields;
        return this;
    };
    /**
       * Some default $http parameter to be used in EVERY call
       **/
    config.defaultHttpFields = config.defaultHttpFields || {};
    object.setDefaultHttpFields = function (values$$1) {
        config.defaultHttpFields = values$$1;
        return this;
    };
    /**
       * Always return plain data, no restangularized object
       **/
    config.plainByDefault = config.plainByDefault || false;
    object.setPlainByDefault = function (value) {
        config.plainByDefault = value === true ? true : false;
        return this;
    };
    config.withHttpValues = function (httpLocalConfig, obj) {
        return defaults(obj, httpLocalConfig, config.defaultHttpFields);
    };
    config.encodeIds = isUndefined(config.encodeIds) ? true : config.encodeIds;
    object.setEncodeIds = function (encode) {
        config.encodeIds = encode;
    };
    config.defaultRequestParams = config.defaultRequestParams || {
        get: {},
        post: {},
        put: {},
        remove: {},
        common: {}
    };
    object.setDefaultRequestParams = function (param1, param2) {
        var /** @type {?} */ methods = [], /** @type {?} */
        params = param2 || param1;
        if (!isUndefined(param2)) {
            if (isArray(param1)) {
                methods = param1;
            }
            else {
                methods.push(param1);
            }
        }
        else {
            methods.push('common');
        }
        each(methods, function (method) {
            config.defaultRequestParams[method] = params;
        });
        return this;
    };
    object.requestParams = config.defaultRequestParams;
    config.defaultHeaders = config.defaultHeaders || {};
    object.setDefaultHeaders = function (headers) {
        config.defaultHeaders = headers;
        object.defaultHeaders = config.defaultHeaders;
        return this;
    };
    object.defaultHeaders = config.defaultHeaders;
    /**
       * Method overriders response Method
       **/
    config.defaultResponseMethod = config.defaultResponseMethod || 'promise';
    object.setDefaultResponseMethod = function (method) {
        config.defaultResponseMethod = method;
        object.defaultResponseMethod = config.defaultResponseMethod;
        return this;
    };
    object.defaultResponseMethod = config.defaultResponseMethod;
    /**
       * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
       **/
    config.methodOverriders = config.methodOverriders || [];
    object.setMethodOverriders = function (values$$1) {
        var /** @type {?} */ overriders = extend([], values$$1);
        if (config.isOverridenMethod('delete', overriders)) {
            overriders.push('remove');
        }
        config.methodOverriders = overriders;
        return this;
    };
    config.jsonp = isUndefined(config.jsonp) ? false : config.jsonp;
    object.setJsonp = function (active) {
        config.jsonp = active;
    };
    config.isOverridenMethod = function (method, values$$1) {
        var /** @type {?} */ search = values$$1 || config.methodOverriders;
        return !isUndefined(find(search, function (one) {
            return one.toLowerCase() === method.toLowerCase();
        }));
    };
    /**
       * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
       **/
    config.urlCreator = config.urlCreator || 'path';
    object.setUrlCreator = function (name) {
        if (!has(config.urlCreatorFactory, name)) {
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
    object.setRestangularFields = function (resFields) {
        config.restangularFields =
            extend({}, config.restangularFields, resFields);
        return this;
    };
    config.isRestangularized = function (obj) {
        return !!obj[config.restangularFields.restangularized];
    };
    config.setFieldToElem = function (field, elem, value) {
        var /** @type {?} */ properties = field.split('.');
        var /** @type {?} */ idValue = elem;
        each(initial(properties), function (prop) {
            idValue[prop] = {};
            idValue = idValue[prop];
        });
        var /** @type {?} */ index = last(properties);
        idValue[index] = value;
        return this;
    };
    config.getFieldFromElem = function (field, elem) {
        var /** @type {?} */ properties = field.split('.');
        var /** @type {?} */ idValue = elem;
        each(properties, function (prop) {
            if (idValue) {
                idValue = idValue[prop];
            }
        });
        return clone(idValue);
    };
    config.setIdToElem = function (elem, id /*, route */) {
        config.setFieldToElem(config.restangularFields.id, elem, id);
        return this;
    };
    config.getIdFromElem = function (elem) {
        return config.getFieldFromElem(config.restangularFields.id, elem);
    };
    config.isValidId = function (elemId) {
        return '' !== elemId && !isUndefined(elemId) && !isNull(elemId);
    };
    config.setUrlToElem = function (elem, url /*, route */) {
        config.setFieldToElem(config.restangularFields.selfLink, elem, url);
        return this;
    };
    config.getUrlFromElem = function (elem) {
        return config.getFieldFromElem(config.restangularFields.selfLink, elem);
    };
    config.useCannonicalId = isUndefined(config.useCannonicalId) ? false : config.useCannonicalId;
    object.setUseCannonicalId = function (value) {
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
    config.responseInterceptors = config.responseInterceptors ? __spread(config.responseInterceptors) : [];
    config.defaultResponseInterceptor = function (data /*, operation, what, url, response, subject */) {
        return data || {};
    };
    config.responseExtractor = function (data, operation, what, url, response, subject) {
        var /** @type {?} */ interceptors = clone(config.responseInterceptors);
        interceptors.push(config.defaultResponseInterceptor);
        var /** @type {?} */ theData = data;
        each(interceptors, function (interceptor) {
            theData = interceptor(theData, operation, what, url, response, subject);
        });
        return theData;
    };
    object.addResponseInterceptor = function (extractor) {
        config.responseInterceptors.push(extractor);
        return this;
    };
    config.errorInterceptors = config.errorInterceptors ? __spread(config.errorInterceptors) : [];
    object.addErrorInterceptor = function (interceptor) {
        config.errorInterceptors = __spread([interceptor], config.errorInterceptors);
        return this;
    };
    object.setResponseInterceptor = object.addResponseInterceptor;
    object.setResponseExtractor = object.addResponseInterceptor;
    object.setErrorInterceptor = object.addErrorInterceptor;
    /**
       * Response interceptor is called just before resolving promises.
       */
    /**
       * Request interceptor is called before sending an object to the server.
       */
    config.requestInterceptors = config.requestInterceptors ? __spread(config.requestInterceptors) : [];
    config.defaultInterceptor = function (element, operation, path, url, headers, params, httpConfig) {
        return {
            element: element,
            headers: headers,
            params: params,
            httpConfig: httpConfig
        };
    };
    config.fullRequestInterceptor = function (element, operation, path, url, headers, params, httpConfig) {
        var /** @type {?} */ interceptors = clone(config.requestInterceptors);
        var /** @type {?} */ defaultRequest = config.defaultInterceptor(element, operation, path, url, headers, params, httpConfig);
        return reduce(interceptors, function (request, interceptor) {
            var /** @type {?} */ returnInterceptor = interceptor(request.element, operation, path, url, request.headers, request.params, request.httpConfig);
            return extend(request, returnInterceptor);
        }, defaultRequest);
    };
    object.addRequestInterceptor = function (interceptor) {
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
    object.setRequestInterceptor = object.addRequestInterceptor;
    object.addFullRequestInterceptor = function (interceptor) {
        config.requestInterceptors.push(interceptor);
        return this;
    };
    object.setFullRequestInterceptor = object.addFullRequestInterceptor;
    config.onBeforeElemRestangularized = config.onBeforeElemRestangularized || function (elem) {
        return elem;
    };
    object.setOnBeforeElemRestangularized = function (post) {
        config.onBeforeElemRestangularized = post;
        return this;
    };
    object.setRestangularizePromiseInterceptor = function (interceptor) {
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
    object.setOnElemRestangularized = function (post) {
        config.onElemRestangularized = post;
        return this;
    };
    config.shouldSaveParent = config.shouldSaveParent || function () {
        return true;
    };
    object.setParentless = function (values$$1) {
        if (isArray(values$$1)) {
            config.shouldSaveParent = function (route) {
                return !includes(values$$1, route);
            };
        }
        else if (isBoolean(values$$1)) {
            config.shouldSaveParent = function () {
                return !values$$1;
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
    config.suffix = isUndefined(config.suffix) ? null : config.suffix;
    object.setRequestSuffix = function (newSuffix) {
        config.suffix = newSuffix;
        return this;
    };
    /**
       * Add element transformers for certain routes.
       */
    config.transformers = config.transformers || {};
    object.addElementTransformer = function (type, secondArg, thirdArg) {
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
            if (isNull(isCollection) || (coll === isCollection)) {
                return transformer(elem);
            }
            return elem;
        });
        return object;
    };
    object.extendCollection = function (route, fn) {
        return object.addElementTransformer(route, true, fn);
    };
    object.extendModel = function (route, fn) {
        return object.addElementTransformer(route, false, fn);
    };
    config.transformElem = function (elem, isCollection, route, Restangular, force) {
        if (!force && !config.transformLocalElements && !elem[config.restangularFields.fromServer]) {
            return elem;
        }
        var /** @type {?} */ typeTransformers = config.transformers[route];
        var /** @type {?} */ changedElem = elem;
        if (typeTransformers) {
            each(typeTransformers, function (transformer) {
                changedElem = transformer(isCollection, changedElem);
            });
        }
        return config.onElemRestangularized(changedElem, isCollection, route, Restangular);
    };
    config.transformLocalElements = isUndefined(config.transformLocalElements) ?
        false :
        config.transformLocalElements;
    object.setTransformOnlyServerElements = function (active) {
        config.transformLocalElements = !active;
    };
    config.fullResponse = isUndefined(config.fullResponse) ? false : config.fullResponse;
    object.setFullResponse = function (full) {
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
        each(keys(configurer), function (key) {
            var /** @type {?} */ value = configurer[key];
            // Add default parameters
            value.params = extend({}, value.params, config.defaultRequestParams[value.method.toLowerCase()]);
            // We don't want the ? if no params are there
            if (isEmpty(value.params)) {
                delete value.params;
            }
            if (config.isSafe(value.method)) {
                resource[key] = function () {
                    var /** @type {?} */ config = extend(value, {
                        url: url
                    });
                    return $http.createRequest(config);
                };
            }
            else {
                resource[key] = function (data) {
                    var /** @type {?} */ config = extend(value, {
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
        var /** @type {?} */ params = defaults(callParams || {}, this.config.defaultRequestParams.common);
        var /** @type {?} */ headers = defaults(callHeaders || {}, this.config.defaultHeaders);
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
        return reduce(this.parentsArray(current), function (acum, elem) {
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
            var /** @type {?} */ keys$$1 = [];
            for (var /** @type {?} */ key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys$$1.push(key);
                }
            }
            return keys$$1.sort();
        }
        /**
         * @param {?} obj
         * @param {?=} iterator
         * @param {?=} context
         * @return {?}
         */
        function forEachSorted(obj, iterator, context) {
            var /** @type {?} */ keys$$1 = sortedKeys(obj);
            for (var /** @type {?} */ i = 0; i < keys$$1.length; i++) {
                iterator.call(context, obj[keys$$1[i]], keys$$1[i]);
            }
            return keys$$1;
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
            if (!isArray(value)) {
                value = [value];
            }
            forEach(value, function (v) {
                if (isObject(v)) {
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
var Restangular = /** @class */ (function () {
    function Restangular(configObj, injector, http) {
        this.configObj = configObj;
        this.injector = injector;
        this.http = http;
        this.provider = new providerConfig(http);
        var /** @type {?} */ element = this.provider.$get();
        assign(this, element);
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
        if (!this.configObj || !isFunction(this.configObj.fn)) {
            return;
        }
        var /** @type {?} */ arrDI = map$1(this.configObj.arrServices, function (services) {
            return _this.injector.get(services);
        });
        (_a = this.configObj).fn.apply(_a, __spread([this.provider], arrDI));
        var _a;
    };
    Restangular.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Restangular.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RESTANGULAR,] },] },
        { type: Injector, },
        { type: RestangularHttp, },
    ]; };
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
                elem[config.restangularFields.getRestangularUrl] = bind(urlHandler.fetchUrl, urlHandler, elem);
                elem[config.restangularFields.getRequestedUrl] = bind(urlHandler.fetchRequestedUrl, urlHandler, elem);
                elem[config.restangularFields.addRestangularMethod] = bind(addRestangularMethodFunction, elem);
                elem[config.restangularFields.clone] = bind(copyRestangularizedElement, elem);
                elem[config.restangularFields.reqParams] = isEmpty(reqParams) ? null : reqParams;
                elem[config.restangularFields.withHttpConfig] = bind(withHttpConfig, elem);
                elem[config.restangularFields.plain] = bind(stripRestangular, elem, elem);
                // Tag element as restangularized
                elem[config.restangularFields.restangularized] = true;
                // RequestLess connection
                elem[config.restangularFields.one] = bind(one, elem, elem);
                elem[config.restangularFields.all] = bind(all, elem, elem);
                elem[config.restangularFields.several] = bind(several, elem, elem);
                elem[config.restangularFields.oneUrl] = bind(oneUrl, elem, elem);
                elem[config.restangularFields.allUrl] = bind(allUrl, elem, elem);
                elem[config.restangularFields.fromServer] = !!fromServer;
                if (parent && config.shouldSaveParent(route)) {
                    var /** @type {?} */ parentId = config.getIdFromElem(parent);
                    var /** @type {?} */ parentUrl = config.getUrlFromElem(parent);
                    var /** @type {?} */ restangularFieldsForParent = union(values(pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])), config.extraFields);
                    var /** @type {?} */ parentResource = pick(parent, restangularFieldsForParent);
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
                if (isNumber(route) || isNumber(parent)) {
                    error = 'You\'re creating a Restangular entity with the number ';
                    error += 'instead of the route or the parent. For example, you can\'t call .one(12).';
                    throw new Error(error);
                }
                if (isUndefined(route)) {
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
                return subject.pipe(filter(function (res) { return !!res; })).toPromise();
            }
            /**
             * @param {?} subject
             * @param {?} response
             * @param {?} data
             * @param {?} filledValue
             * @return {?}
             */
            function resolvePromise(subject, response, data, filledValue) {
                extend(filledValue, data);
                // Trigger the full response interceptor.
                if (config.fullResponse) {
                    subject.next(extend(response, {
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
                if (isArray(elem)) {
                    var /** @type {?} */ array = [];
                    each(elem, function (value) {
                        array.push(config.isRestangularized(value) ? stripRestangular(value) : value);
                    });
                    return array;
                }
                else {
                    return omit(elem, values(omit(config.restangularFields, 'id')));
                }
            }
            /**
             * @param {?} elem
             * @return {?}
             */
            function addCustomOperation(elem) {
                elem[config.restangularFields.customOperation] = bind(customFunction, elem);
                var /** @type {?} */ requestMethods = { get: customFunction, delete: customFunction };
                each(['put', 'patch', 'post'], function (name) {
                    requestMethods[name] = function (operation, elem, path, params, headers) {
                        return bind(customFunction, this)(operation, path, params, headers, elem);
                    };
                });
                each(requestMethods, function (requestFunc, name) {
                    var /** @type {?} */ callOperation = name === 'delete' ? 'remove' : name;
                    each(['do', 'custom'], function (alias) {
                        elem[alias + name.toUpperCase()] = bind(requestFunc, elem, callOperation);
                    });
                });
                elem[config.restangularFields.customGETLIST] = bind(fetchFunction, elem);
                elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
            }
            /**
             * @param {?} element
             * @return {?}
             */
            function copyRestangularizedElement(element) {
                var /** @type {?} */ copiedElement = cloneDeep(element);
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
                localElem[config.restangularFields.get] = bind(getFunction, localElem);
                localElem[config.restangularFields.getList] = bind(fetchFunction, localElem);
                localElem[config.restangularFields.put] = bind(putFunction, localElem);
                localElem[config.restangularFields.post] = bind(postFunction, localElem);
                localElem[config.restangularFields.remove] = bind(deleteFunction, localElem);
                localElem[config.restangularFields.head] = bind(headFunction, localElem);
                localElem[config.restangularFields.trace] = bind(traceFunction, localElem);
                localElem[config.restangularFields.options] = bind(optionsFunction, localElem);
                localElem[config.restangularFields.patch] = bind(patchFunction, localElem);
                localElem[config.restangularFields.save] = bind(save, localElem);
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
                localElem[config.restangularFields.post] = bind(postFunction, localElem, null);
                localElem[config.restangularFields.remove] = bind(deleteFunction, localElem);
                localElem[config.restangularFields.head] = bind(headFunction, localElem);
                localElem[config.restangularFields.trace] = bind(traceFunction, localElem);
                localElem[config.restangularFields.putElement] = bind(putElementFunction, localElem);
                localElem[config.restangularFields.options] = bind(optionsFunction, localElem);
                localElem[config.restangularFields.patch] = bind(patchFunction, localElem);
                localElem[config.restangularFields.get] = bind(getById, localElem);
                localElem[config.restangularFields.getList] = bind(fetchFunction, localElem, null);
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
                each(collection, function (elem) {
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
                var /** @type {?} */ subject = new BehaviorSubject(null);
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
                var /** @type {?} */ subject = new BehaviorSubject(null);
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
                    if (isUndefined(data) || '' === data) {
                        data = [];
                    }
                    if (!isArray(data)) {
                        throw new Error('Response for getList SHOULD be an array and not an object or something else');
                    }
                    if (true === config.plainByDefault) {
                        return resolvePromise(subject, response, data, filledArray);
                    }
                    var /** @type {?} */ processedData = map$1(data, function (elem) {
                        if (!__this[config.restangularFields.restangularCollection]) {
                            return restangularizeElem(__this, elem, what, true, data);
                        }
                        else {
                            return restangularizeElem(__this[config.restangularFields.parentResource], elem, __this[config.restangularFields.route], true, data);
                        }
                    });
                    processedData = extend(data, processedData);
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
                    else if (every(config.errorInterceptors, function (cb) {
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
                    return bind(elemFunction, this)('post', undefined, params, undefined, headers);
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
                var /** @type {?} */ subject = new BehaviorSubject(null);
                var /** @type {?} */ resParams = params || {};
                var /** @type {?} */ route = what || this[config.restangularFields.route];
                var /** @type {?} */ fetchUrl = urlHandler.fetchUrl(this, what);
                var /** @type {?} */ callObj = obj || this;
                // fallback to etag on restangular object (since for custom methods we probably don't explicitly specify the etag field)
                var /** @type {?} */ etag = callObj[config.restangularFields.etag] || (operation !== 'post' ? this[config.restangularFields.etag] : null);
                if (isObject(callObj) && config.isRestangularized(callObj)) {
                    callObj = stripRestangular(callObj);
                }
                var /** @type {?} */ request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl, headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});
                var /** @type {?} */ filledObject = {};
                filledObject = config.transformElem(filledObject, false, route, service);
                var /** @type {?} */ okCallback = function (response) {
                    var /** @type {?} */ resData = get(response, 'body');
                    var /** @type {?} */ fullParams = get(response, 'config.params');
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
                    else if (every(config.errorInterceptors, function (cb) {
                        return cb(response, subject, okCallback) !== false;
                    })) {
                        // triggered if no callback returns false
                        subject.error(response);
                    }
                };
                // Overriding HTTP Method
                var /** @type {?} */ callOperation = operation;
                var /** @type {?} */ callHeaders = extend({}, request.headers);
                var /** @type {?} */ isOverrideOperation = config.isOverridenMethod(operation);
                if (isOverrideOperation) {
                    callOperation = 'post';
                    callHeaders = extend(callHeaders, { 'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase() });
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
                return bind(elemFunction, this)('get', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function deleteFunction(params, headers) {
                return bind(elemFunction, this)('remove', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function putFunction(params, headers) {
                return bind(elemFunction, this)('put', undefined, params, undefined, headers);
            }
            /**
             * @param {?} what
             * @param {?} elem
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function postFunction(what, elem, params, headers) {
                return bind(elemFunction, this)('post', what, params, elem, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function headFunction(params, headers) {
                return bind(elemFunction, this)('head', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function traceFunction(params, headers) {
                return bind(elemFunction, this)('trace', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function optionsFunction(params, headers) {
                return bind(elemFunction, this)('options', undefined, params, undefined, headers);
            }
            /**
             * @param {?} elem
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function patchFunction(elem, params, headers) {
                return bind(elemFunction, this)('patch', undefined, params, elem, headers);
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
                return bind(elemFunction, this)(operation, path, params, elem, headers);
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
                    bindedFunction = bind(fetchFunction, this, path);
                }
                else {
                    bindedFunction = bind(customFunction, this, operation, path);
                }
                var /** @type {?} */ createdFunction = function (params, headers, elem) {
                    var /** @type {?} */ callParams = defaults({
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
                var /** @type {?} */ newConfig = clone(omit(config, 'configuration'));
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
                var /** @type {?} */ knownCollectionMethods = values(config.restangularFields);
                var /** @type {?} */ serv = {};
                var /** @type {?} */ collection = (parent || service).all(route);
                serv.one = bind(one, (parent || service), parent, route);
                serv.all = bind(collection.all, collection);
                serv.post = bind(collection.post, collection);
                serv.getList = bind(collection.getList, collection);
                serv.withHttpConfig = bind(collection.withHttpConfig, collection);
                serv.get = bind(collection.get, collection);
                for (var /** @type {?} */ prop in collection) {
                    if (collection.hasOwnProperty(prop) && isFunction(collection[prop]) && !includes(knownCollectionMethods, prop)) {
                        serv[prop] = bind(collection[prop], collection);
                    }
                }
                return serv;
            }
            RestangularConfigurer(service, config);
            service.copy = bind(copyRestangularizedElement, service);
            service.service = bind(toService, service);
            service.withConfig = bind(withConfigurationFunction, service);
            service.one = bind(one, service, null);
            service.all = bind(all, service, null);
            service.several = bind(several, service, null);
            service.oneUrl = bind(oneUrl, service, null);
            service.allUrl = bind(allUrl, service, null);
            service.stripRestangular = bind(stripRestangular, service);
            service.restangularizeElement = bind(restangularizeElem, service);
            service.restangularizeCollection = bind(restangularizeCollectionAndElements, service);
            return service;
        }
        return createServiceForConfiguration(globalConfiguration);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ CONFIG_OBJ = new InjectionToken('configObj');
var RestangularModule = /** @class */ (function () {
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
        { type: NgModule, args: [{
                    imports: [HttpClientModule],
                    providers: [RestangularHttp, Restangular]
                },] },
    ];
    /** @nocollapse */
    RestangularModule.ctorParameters = function () { return [
        { type: RestangularModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    ]; };
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

export { RestangularModule, Restangular, RestangularHttp, RESTANGULAR as ɵb, RestangularFactory as ɵc, CONFIG_OBJ as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtcmVzdGFuZ3VsYXIvbGliL25neC1yZXN0YW5ndWxhci5jb25maWcudHMiLCJuZzovL25neC1yZXN0YW5ndWxhci9saWIvbmd4LXJlc3Rhbmd1bGFyLWhlbHBlci50cyIsIm5nOi8vbmd4LXJlc3Rhbmd1bGFyL2xpYi9uZ3gtcmVzdGFuZ3VsYXItaHR0cC50cyIsIm5nOi8vbmd4LXJlc3Rhbmd1bGFyL2xpYi9uZ3gtcmVzdGFuZ3VsYXItY29uZmlnLmZhY3RvcnkudHMiLCJuZzovL25neC1yZXN0YW5ndWxhci9saWIvbmd4LXJlc3Rhbmd1bGFyLnRzIiwibmc6Ly9uZ3gtcmVzdGFuZ3VsYXIvbGliL25neC1yZXN0YW5ndWxhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcblxuXG5leHBvcnQgY29uc3QgUkVTVEFOR1VMQVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPigncmVzdGFuZ3VsYXJXaXRoQ29uZmlnJyk7XG5leHBvcnQgZnVuY3Rpb24gUmVzdGFuZ3VsYXJGYWN0b3J5KGNvbmZpZykge1xuICBsZXQgY29uZmlnT2JqID0ge1xuICAgIGZuOiBjb25maWdbMF0sXG4gICAgYXJyU2VydmljZXM6IFtdLFxuICB9O1xuXG4gIGlmIChpc0FycmF5KGNvbmZpZ1swXSkpIHtcbiAgICBjb25maWdPYmogPSB7XG4gICAgICBhcnJTZXJ2aWNlczogY29uZmlnWzBdLFxuICAgICAgZm46IGNvbmZpZ1sxXVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGNvbmZpZ09iajtcbn1cbiIsImltcG9ydCB7SHR0cFJlcXVlc3QsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7YXNzaWdufSBmcm9tICdjb3JlLWpzL2ZuL29iamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBSZXN0YW5ndWxhckhlbHBlciB7XG5cbiAgc3RhdGljIGNyZWF0ZVJlcXVlc3Qob3B0aW9ucykge1xuICAgIGxldCByZXF1ZXN0UXVlcnlQYXJhbXMgPSBSZXN0YW5ndWxhckhlbHBlci5jcmVhdGVSZXF1ZXN0UXVlcnlQYXJhbXMob3B0aW9ucy5wYXJhbXMpO1xuICAgIGxldCByZXF1ZXN0SGVhZGVycyA9IFJlc3Rhbmd1bGFySGVscGVyLmNyZWF0ZVJlcXVlc3RIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgbGV0IG1ldGhvZE5hbWUgPSBvcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgIGxldCB3aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zLndpdGhDcmVkZW50aWFscyB8fCBmYWxzZTtcblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KFxuICAgICAgbWV0aG9kTmFtZSxcbiAgICAgIG9wdGlvbnMudXJsLFxuICAgICAgb3B0aW9ucy5kYXRhLFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgcGFyYW1zOiByZXF1ZXN0UXVlcnlQYXJhbXMsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogb3B0aW9ucy5yZXNwb25zZVR5cGUsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsc1xuICAgICAgfVxuICAgICk7XG5cbiAgICBpZihbJ0dFVCcsICdERUxFVEUnLCAnSEVBRCcsICdKU09OUCcsICdPUFRJT05TJ10uaW5kZXhPZihtZXRob2ROYW1lKSA+PSAwKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KFxuICAgICAgICBtZXRob2ROYW1lLFxuICAgICAgICBvcHRpb25zLnVybCxcbiAgICAgICAge1xuICAgICAgICAgIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxuICAgICAgICAgIHBhcmFtczogcmVxdWVzdFF1ZXJ5UGFyYW1zLFxuICAgICAgICAgIHJlc3BvbnNlVHlwZTogb3B0aW9ucy5yZXNwb25zZVR5cGUsXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlUmVxdWVzdFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKSB7XG4gICAgbGV0IHJlcXVlc3RRdWVyeVBhcmFtcyA9IGFzc2lnbih7fSwgcXVlcnlQYXJhbXMpO1xuICAgIGxldCBzZWFyY2g6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHJlcXVlc3RRdWVyeVBhcmFtcykge1xuICAgICAgbGV0IHZhbHVlOiBhbnkgPSByZXF1ZXN0UXVlcnlQYXJhbXNba2V5XTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24odmFsKXtcbiAgICAgICAgICBzZWFyY2ggPSBzZWFyY2guYXBwZW5kKGtleSwgdmFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHNlYXJjaCA9IHNlYXJjaC5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VhcmNoO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVJlcXVlc3RIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gaGVhZGVycykge1xuICAgICAgbGV0IHZhbHVlOiBhbnkgPSBoZWFkZXJzW2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoYXNzaWduKHt9LCBoZWFkZXJzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBCYWNrZW5kLCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgdGhyb3dFcnJvciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSZXN0YW5ndWxhckhlbHBlciB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLWhlbHBlcic7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SHR0cEV2ZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cC9zcmMvcmVzcG9uc2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzdGFuZ3VsYXJIdHRwIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cEJhY2tlbmQpIHtcbiAgfVxuXG4gIGNyZWF0ZVJlcXVlc3Qob3B0aW9ucyk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gUmVzdGFuZ3VsYXJIZWxwZXIuY3JlYXRlUmVxdWVzdChvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QocmVxdWVzdCk7XG4gIH1cblxuICByZXF1ZXN0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5oYW5kbGUocmVxdWVzdClcbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSksXG4gICAgICBtYXAoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBIdHRwRXJyb3JSZXNwb25zZShyZXNwb25zZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pLFxuICAgICAgbWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmVzcG9uc2UuY29uZmlnID0ge3BhcmFtczogcmVxdWVzdH07XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xuICAgICAgICBlcnIucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIGVyci5kYXRhID0gZXJyLmVycm9yO1xuICAgICAgICBlcnIucmVwZWF0UmVxdWVzdCA9IChuZXdSZXF1ZXN0PykgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobmV3UmVxdWVzdCB8fCByZXF1ZXN0KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG5cbiIsImltcG9ydCB7XG4gIGluY2x1ZGVzLFxuICBpc1VuZGVmaW5lZCxcbiAgaXNOdWxsLFxuICBpc0FycmF5LFxuICBpc09iamVjdCxcbiAgaXNCb29sZWFuLFxuICBkZWZhdWx0cyxcbiAgZWFjaCxcbiAgZXh0ZW5kLFxuICBmaW5kLFxuICBoYXMsXG4gIGluaXRpYWwsXG4gIGxhc3QsXG4gIGNsb25lLFxuICByZWR1Y2UsXG4gIGtleXMsXG4gIGlzRW1wdHksXG4gIGZvckVhY2gsXG59IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXN0YW5ndWxhckNvbmZpZ3VyZXIob2JqZWN0LCBjb25maWcpe1xuICBvYmplY3QuY29uZmlndXJhdGlvbiA9IGNvbmZpZztcblxuICAvKipcbiAgICogVGhvc2UgYXJlIEhUVFAgc2FmZSBtZXRob2RzIGZvciB3aGljaCB0aGVyZSBpcyBubyBuZWVkIHRvIHBhc3MgYW55IGRhdGEgd2l0aCB0aGUgcmVxdWVzdC5cbiAgICovXG4gIHZhciBzYWZlTWV0aG9kcyA9IFsnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucycsICd0cmFjZScsICdnZXRsaXN0J107XG4gIGNvbmZpZy5pc1NhZmUgPSBmdW5jdGlvbiAob3BlcmF0aW9uKSB7XG4gICAgcmV0dXJuIGluY2x1ZGVzKHNhZmVNZXRob2RzLCBvcGVyYXRpb24udG9Mb3dlckNhc2UoKSk7XG4gIH07XG5cbiAgdmFyIGFic29sdXRlUGF0dGVybiA9IC9eaHR0cHM/OlxcL1xcLy9pO1xuICBjb25maWcuaXNBYnNvbHV0ZVVybCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoY29uZmlnLmFic29sdXRlVXJsKSB8fCBpc051bGwoY29uZmlnLmFic29sdXRlVXJsKSA/XG4gICAgc3RyaW5nICYmIGFic29sdXRlUGF0dGVybi50ZXN0KHN0cmluZykgOlxuICAgICAgY29uZmlnLmFic29sdXRlVXJsO1xuICB9O1xuXG4gIGNvbmZpZy5hYnNvbHV0ZVVybCA9IGlzVW5kZWZpbmVkKGNvbmZpZy5hYnNvbHV0ZVVybCkgPyB0cnVlIDogY29uZmlnLmFic29sdXRlVXJsO1xuICBvYmplY3Quc2V0U2VsZkxpbmtBYnNvbHV0ZVVybCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGNvbmZpZy5hYnNvbHV0ZVVybCA9IHZhbHVlO1xuICB9O1xuICAvKipcbiAgICogVGhpcyBpcyB0aGUgQmFzZVVSTCB0byBiZSB1c2VkIHdpdGggUmVzdGFuZ3VsYXJcbiAgICovXG4gIGNvbmZpZy5iYXNlVXJsID0gaXNVbmRlZmluZWQoY29uZmlnLmJhc2VVcmwpID8gJycgOiBjb25maWcuYmFzZVVybDtcbiAgb2JqZWN0LnNldEJhc2VVcmwgPSBmdW5jdGlvbiAobmV3QmFzZVVybCkge1xuICAgIGNvbmZpZy5iYXNlVXJsID0gL1xcLyQvLnRlc3QobmV3QmFzZVVybCkgP1xuICAgICAgbmV3QmFzZVVybC5zdWJzdHJpbmcoMCwgbmV3QmFzZVVybC5sZW5ndGggLSAxKSA6XG4gICAgICBuZXdCYXNlVXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleHRyYSBmaWVsZHMgdG8ga2VlcCBmcm9tIHRoZSBwYXJlbnRzXG4gICAqL1xuICBjb25maWcuZXh0cmFGaWVsZHMgPSBjb25maWcuZXh0cmFGaWVsZHMgfHwgW107XG4gIG9iamVjdC5zZXRFeHRyYUZpZWxkcyA9IGZ1bmN0aW9uIChuZXdFeHRyYUZpZWxkcykge1xuICAgIGNvbmZpZy5leHRyYUZpZWxkcyA9IG5ld0V4dHJhRmllbGRzO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTb21lIGRlZmF1bHQgJGh0dHAgcGFyYW1ldGVyIHRvIGJlIHVzZWQgaW4gRVZFUlkgY2FsbFxuICAgKiovXG4gIGNvbmZpZy5kZWZhdWx0SHR0cEZpZWxkcyA9IGNvbmZpZy5kZWZhdWx0SHR0cEZpZWxkcyB8fCB7fTtcbiAgb2JqZWN0LnNldERlZmF1bHRIdHRwRmllbGRzID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIGNvbmZpZy5kZWZhdWx0SHR0cEZpZWxkcyA9IHZhbHVlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQWx3YXlzIHJldHVybiBwbGFpbiBkYXRhLCBubyByZXN0YW5ndWxhcml6ZWQgb2JqZWN0XG4gICAqKi9cbiAgY29uZmlnLnBsYWluQnlEZWZhdWx0ID0gY29uZmlnLnBsYWluQnlEZWZhdWx0IHx8IGZhbHNlO1xuICBvYmplY3Quc2V0UGxhaW5CeURlZmF1bHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBjb25maWcucGxhaW5CeURlZmF1bHQgPSB2YWx1ZSA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmZpZy53aXRoSHR0cFZhbHVlcyA9IGZ1bmN0aW9uIChodHRwTG9jYWxDb25maWcsIG9iaikge1xuICAgIHJldHVybiBkZWZhdWx0cyhvYmosIGh0dHBMb2NhbENvbmZpZywgY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzKTtcbiAgfTtcblxuICBjb25maWcuZW5jb2RlSWRzID0gaXNVbmRlZmluZWQoY29uZmlnLmVuY29kZUlkcykgPyB0cnVlIDogY29uZmlnLmVuY29kZUlkcztcbiAgb2JqZWN0LnNldEVuY29kZUlkcyA9IGZ1bmN0aW9uIChlbmNvZGUpIHtcbiAgICBjb25maWcuZW5jb2RlSWRzID0gZW5jb2RlO1xuICB9O1xuXG4gIGNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtcyA9IGNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtcyB8fCB7XG4gICAgICBnZXQ6IHt9LFxuICAgICAgcG9zdDoge30sXG4gICAgICBwdXQ6IHt9LFxuICAgICAgcmVtb3ZlOiB7fSxcbiAgICAgIGNvbW1vbjoge31cbiAgICB9O1xuXG4gIG9iamVjdC5zZXREZWZhdWx0UmVxdWVzdFBhcmFtcyA9IGZ1bmN0aW9uIChwYXJhbTEsIHBhcmFtMikge1xuICAgIHZhciBtZXRob2RzID0gW10sXG4gICAgICBwYXJhbXMgPSBwYXJhbTIgfHwgcGFyYW0xO1xuICAgIGlmICghaXNVbmRlZmluZWQocGFyYW0yKSkge1xuICAgICAgaWYgKGlzQXJyYXkocGFyYW0xKSkge1xuICAgICAgICBtZXRob2RzID0gcGFyYW0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWV0aG9kcy5wdXNoKHBhcmFtMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1ldGhvZHMucHVzaCgnY29tbW9uJyk7XG4gICAgfVxuXG4gICAgZWFjaChtZXRob2RzLCBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXNbbWV0aG9kXSA9IHBhcmFtcztcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3QucmVxdWVzdFBhcmFtcyA9IGNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtcztcblxuICBjb25maWcuZGVmYXVsdEhlYWRlcnMgPSBjb25maWcuZGVmYXVsdEhlYWRlcnMgfHwge307XG4gIG9iamVjdC5zZXREZWZhdWx0SGVhZGVycyA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gICAgY29uZmlnLmRlZmF1bHRIZWFkZXJzID0gaGVhZGVycztcbiAgICBvYmplY3QuZGVmYXVsdEhlYWRlcnMgPSBjb25maWcuZGVmYXVsdEhlYWRlcnM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LmRlZmF1bHRIZWFkZXJzID0gY29uZmlnLmRlZmF1bHRIZWFkZXJzO1xuXG5cbiAgLyoqXG4gICAqIE1ldGhvZCBvdmVycmlkZXJzIHJlc3BvbnNlIE1ldGhvZFxuICAgKiovXG4gIGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VNZXRob2QgPSBjb25maWcuZGVmYXVsdFJlc3BvbnNlTWV0aG9kIHx8ICdwcm9taXNlJztcbiAgb2JqZWN0LnNldERlZmF1bHRSZXNwb25zZU1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICBjb25maWcuZGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gbWV0aG9kO1xuICAgIG9iamVjdC5kZWZhdWx0UmVzcG9uc2VNZXRob2QgPSBjb25maWcuZGVmYXVsdFJlc3BvbnNlTWV0aG9kO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBvYmplY3QuZGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZDtcblxuICAvKipcbiAgICogTWV0aG9kIG92ZXJyaWRlcnMgd2lsbCBzZXQgd2hpY2ggbWV0aG9kcyBhcmUgc2VudCB2aWEgUE9TVCB3aXRoIGFuIFgtSFRUUC1NZXRob2QtT3ZlcnJpZGVcbiAgICoqL1xuICBjb25maWcubWV0aG9kT3ZlcnJpZGVycyA9IGNvbmZpZy5tZXRob2RPdmVycmlkZXJzIHx8IFtdO1xuICBvYmplY3Quc2V0TWV0aG9kT3ZlcnJpZGVycyA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICB2YXIgb3ZlcnJpZGVycyA9IGV4dGVuZChbXSwgdmFsdWVzKTtcbiAgICBpZiAoY29uZmlnLmlzT3ZlcnJpZGVuTWV0aG9kKCdkZWxldGUnLCBvdmVycmlkZXJzKSkge1xuICAgICAgb3ZlcnJpZGVycy5wdXNoKCdyZW1vdmUnKTtcbiAgICB9XG4gICAgY29uZmlnLm1ldGhvZE92ZXJyaWRlcnMgPSBvdmVycmlkZXJzO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5qc29ucCA9IGlzVW5kZWZpbmVkKGNvbmZpZy5qc29ucCkgPyBmYWxzZSA6IGNvbmZpZy5qc29ucDtcbiAgb2JqZWN0LnNldEpzb25wID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICAgIGNvbmZpZy5qc29ucCA9IGFjdGl2ZTtcbiAgfTtcblxuICBjb25maWcuaXNPdmVycmlkZW5NZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kLCB2YWx1ZXMpIHtcbiAgICB2YXIgc2VhcmNoID0gdmFsdWVzIHx8IGNvbmZpZy5tZXRob2RPdmVycmlkZXJzO1xuICAgIHJldHVybiAhaXNVbmRlZmluZWQoZmluZChzZWFyY2gsIGZ1bmN0aW9uIChvbmU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIG9uZS50b0xvd2VyQ2FzZSgpID09PSBtZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgICB9KSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFVSTCBjcmVhdG9yIHR5cGUuIEZvciBub3csIG9ubHkgUGF0aCBpcyBjcmVhdGVkLiBJbiB0aGUgZnV0dXJlIHdlJ2xsIGhhdmUgcXVlcnlQYXJhbXNcbiAgICoqL1xuICBjb25maWcudXJsQ3JlYXRvciA9IGNvbmZpZy51cmxDcmVhdG9yIHx8ICdwYXRoJztcbiAgb2JqZWN0LnNldFVybENyZWF0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghaGFzKGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeSwgbmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVVJMIFBhdGggc2VsZWN0ZWQgaXNuXFwndCB2YWxpZCcpO1xuICAgIH1cblxuICAgIGNvbmZpZy51cmxDcmVhdG9yID0gbmFtZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogWW91IGNhbiBzZXQgdGhlIHJlc3Rhbmd1bGFyIGZpZWxkcyBoZXJlLiBUaGUgMyByZXF1aXJlZCBmaWVsZHMgZm9yIFJlc3Rhbmd1bGFyIGFyZTpcbiAgICpcbiAgICogaWQ6IElkIG9mIHRoZSBlbGVtZW50XG4gICAqIHJvdXRlOiBuYW1lIG9mIHRoZSByb3V0ZSBvZiB0aGlzIGVsZW1lbnRcbiAgICogcGFyZW50UmVzb3VyY2U6IHRoZSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCByZXNvdXJjZVxuICAgKlxuICAgKiAgQWxsIG9mIHRoaXMgZmllbGRzIGV4Y2VwdCBmb3IgaWQsIGFyZSBoYW5kbGVkIChhbmQgY3JlYXRlZCkgYnkgUmVzdGFuZ3VsYXIuIEJ5IGRlZmF1bHQsXG4gICAqICB0aGUgZmllbGQgdmFsdWVzIHdpbGwgYmUgaWQsIHJvdXRlIGFuZCBwYXJlbnRSZXNvdXJjZSByZXNwZWN0aXZlbHlcbiAgICovXG4gIGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyA9IGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyB8fCB7XG4gICAgICBpZDogJ2lkJyxcbiAgICAgIHJvdXRlOiAncm91dGUnLFxuICAgICAgcGFyZW50UmVzb3VyY2U6ICdwYXJlbnRSZXNvdXJjZScsXG4gICAgICByZXN0YW5ndWxhckNvbGxlY3Rpb246ICdyZXN0YW5ndWxhckNvbGxlY3Rpb24nLFxuICAgICAgY2Fubm9uaWNhbElkOiAnX19jYW5ub25pY2FsSWQnLFxuICAgICAgZXRhZzogJ3Jlc3Rhbmd1bGFyRXRhZycsXG4gICAgICBzZWxmTGluazogJ2hyZWYnLFxuICAgICAgZ2V0OiAnZ2V0JyxcbiAgICAgIGdldExpc3Q6ICdnZXRMaXN0JyxcbiAgICAgIHB1dDogJ3B1dCcsXG4gICAgICBwb3N0OiAncG9zdCcsXG4gICAgICByZW1vdmU6ICdyZW1vdmUnLFxuICAgICAgaGVhZDogJ2hlYWQnLFxuICAgICAgdHJhY2U6ICd0cmFjZScsXG4gICAgICBvcHRpb25zOiAnb3B0aW9ucycsXG4gICAgICBwYXRjaDogJ3BhdGNoJyxcbiAgICAgIGdldFJlc3Rhbmd1bGFyVXJsOiAnZ2V0UmVzdGFuZ3VsYXJVcmwnLFxuICAgICAgZ2V0UmVxdWVzdGVkVXJsOiAnZ2V0UmVxdWVzdGVkVXJsJyxcbiAgICAgIHB1dEVsZW1lbnQ6ICdwdXRFbGVtZW50JyxcbiAgICAgIGFkZFJlc3Rhbmd1bGFyTWV0aG9kOiAnYWRkUmVzdGFuZ3VsYXJNZXRob2QnLFxuICAgICAgZ2V0UGFyZW50TGlzdDogJ2dldFBhcmVudExpc3QnLFxuICAgICAgY2xvbmU6ICdjbG9uZScsXG4gICAgICBpZHM6ICdpZHMnLFxuICAgICAgaHR0cENvbmZpZzogJ18kaHR0cENvbmZpZycsXG4gICAgICByZXFQYXJhbXM6ICdyZXFQYXJhbXMnLFxuICAgICAgb25lOiAnb25lJyxcbiAgICAgIGFsbDogJ2FsbCcsXG4gICAgICBzZXZlcmFsOiAnc2V2ZXJhbCcsXG4gICAgICBvbmVVcmw6ICdvbmVVcmwnLFxuICAgICAgYWxsVXJsOiAnYWxsVXJsJyxcbiAgICAgIGN1c3RvbVBVVDogJ2N1c3RvbVBVVCcsXG4gICAgICBjdXN0b21QQVRDSDogJ2N1c3RvbVBBVENIJyxcbiAgICAgIGN1c3RvbVBPU1Q6ICdjdXN0b21QT1NUJyxcbiAgICAgIGN1c3RvbURFTEVURTogJ2N1c3RvbURFTEVURScsXG4gICAgICBjdXN0b21HRVQ6ICdjdXN0b21HRVQnLFxuICAgICAgY3VzdG9tR0VUTElTVDogJ2N1c3RvbUdFVExJU1QnLFxuICAgICAgY3VzdG9tT3BlcmF0aW9uOiAnY3VzdG9tT3BlcmF0aW9uJyxcbiAgICAgIGRvUFVUOiAnZG9QVVQnLFxuICAgICAgZG9QQVRDSDogJ2RvUEFUQ0gnLFxuICAgICAgZG9QT1NUOiAnZG9QT1NUJyxcbiAgICAgIGRvREVMRVRFOiAnZG9ERUxFVEUnLFxuICAgICAgZG9HRVQ6ICdkb0dFVCcsXG4gICAgICBkb0dFVExJU1Q6ICdkb0dFVExJU1QnLFxuICAgICAgZnJvbVNlcnZlcjogJ2Zyb21TZXJ2ZXInLFxuICAgICAgd2l0aENvbmZpZzogJ3dpdGhDb25maWcnLFxuICAgICAgd2l0aEh0dHBDb25maWc6ICd3aXRoSHR0cENvbmZpZycsXG4gICAgICBzaW5nbGVPbmU6ICdzaW5nbGVPbmUnLFxuICAgICAgcGxhaW46ICdwbGFpbicsXG4gICAgICBzYXZlOiAnc2F2ZScsXG4gICAgICByZXN0YW5ndWxhcml6ZWQ6ICdyZXN0YW5ndWxhcml6ZWQnXG4gICAgfTtcbiAgb2JqZWN0LnNldFJlc3Rhbmd1bGFyRmllbGRzID0gZnVuY3Rpb24gKHJlc0ZpZWxkcykge1xuICAgIGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyA9XG4gICAgICBleHRlbmQoe30sIGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgcmVzRmllbGRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuICEhb2JqW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhcml6ZWRdO1xuICB9O1xuXG4gIGNvbmZpZy5zZXRGaWVsZFRvRWxlbSA9IGZ1bmN0aW9uIChmaWVsZCwgZWxlbSwgdmFsdWUpIHtcbiAgICB2YXIgcHJvcGVydGllcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgdmFyIGlkVmFsdWUgPSBlbGVtO1xuICAgIGVhY2goaW5pdGlhbChwcm9wZXJ0aWVzKSwgZnVuY3Rpb24gKHByb3A6IGFueSkge1xuICAgICAgaWRWYWx1ZVtwcm9wXSA9IHt9O1xuICAgICAgaWRWYWx1ZSA9IGlkVmFsdWVbcHJvcF07XG4gICAgfSk7XG4gICAgdmFyIGluZGV4OiBhbnkgPSBsYXN0KHByb3BlcnRpZXMpO1xuICAgIGlkVmFsdWVbaW5kZXhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmdldEZpZWxkRnJvbUVsZW0gPSBmdW5jdGlvbiAoZmllbGQsIGVsZW0pIHtcbiAgICB2YXIgcHJvcGVydGllcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgdmFyIGlkVmFsdWU6IGFueSA9IGVsZW07XG4gICAgZWFjaChwcm9wZXJ0aWVzLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgaWYgKGlkVmFsdWUpIHtcbiAgICAgICAgaWRWYWx1ZSA9IGlkVmFsdWVbcHJvcF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNsb25lKGlkVmFsdWUpO1xuICB9O1xuXG4gIGNvbmZpZy5zZXRJZFRvRWxlbSA9IGZ1bmN0aW9uIChlbGVtLCBpZCAvKiwgcm91dGUgKi8pIHtcbiAgICBjb25maWcuc2V0RmllbGRUb0VsZW0oY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkLCBlbGVtLCBpZCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmdldElkRnJvbUVsZW0gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgIHJldHVybiBjb25maWcuZ2V0RmllbGRGcm9tRWxlbShjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaWQsIGVsZW0pO1xuICB9O1xuXG4gIGNvbmZpZy5pc1ZhbGlkSWQgPSBmdW5jdGlvbiAoZWxlbUlkKSB7XG4gICAgcmV0dXJuICcnICE9PSBlbGVtSWQgJiYgIWlzVW5kZWZpbmVkKGVsZW1JZCkgJiYgIWlzTnVsbChlbGVtSWQpO1xuICB9O1xuXG4gIGNvbmZpZy5zZXRVcmxUb0VsZW0gPSBmdW5jdGlvbiAoZWxlbSwgdXJsIC8qLCByb3V0ZSAqLykge1xuICAgIGNvbmZpZy5zZXRGaWVsZFRvRWxlbShjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2VsZkxpbmssIGVsZW0sIHVybCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmdldFVybEZyb21FbGVtID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICByZXR1cm4gY29uZmlnLmdldEZpZWxkRnJvbUVsZW0oY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNlbGZMaW5rLCBlbGVtKTtcbiAgfTtcblxuICBjb25maWcudXNlQ2Fubm9uaWNhbElkID0gaXNVbmRlZmluZWQoY29uZmlnLnVzZUNhbm5vbmljYWxJZCkgPyBmYWxzZSA6IGNvbmZpZy51c2VDYW5ub25pY2FsSWQ7XG4gIG9iamVjdC5zZXRVc2VDYW5ub25pY2FsSWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBjb25maWcudXNlQ2Fubm9uaWNhbElkID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmdldENhbm5vbmljYWxJZEZyb21FbGVtID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICB2YXIgY2Fubm9uaWNhbElkID0gZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY2Fubm9uaWNhbElkXTtcbiAgICB2YXIgYWN0dWFsSWQgPSBjb25maWcuaXNWYWxpZElkKGNhbm5vbmljYWxJZCkgPyBjYW5ub25pY2FsSWQgOiBjb25maWcuZ2V0SWRGcm9tRWxlbShlbGVtKTtcbiAgICByZXR1cm4gYWN0dWFsSWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFJlc3BvbnNlIHBhcnNlci4gVGhpcyBpcyB1c2VkIGluIGNhc2UgeW91ciByZXNwb25zZSBpc24ndCBkaXJlY3RseSB0aGUgZGF0YS5cbiAgICogRm9yIGV4YW1wbGUgaWYgeW91IGhhdmUgYSByZXNwb25zZSBsaWtlIHttZXRhOiB7J21ldGEnfSwgZGF0YToge25hbWU6ICdHb250byd9fVxuICAgKiB5b3UgY2FuIGV4dHJhY3QgdGhpcyBkYXRhIHdoaWNoIGlzIHRoZSBvbmUgdGhhdCBuZWVkcyB3cmFwcGluZ1xuICAgKlxuICAgKiBUaGUgUmVzcG9uc2VFeHRyYWN0b3IgaXMgYSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSByZXNwb25zZSBhbmQgdGhlIG1ldGhvZCBleGVjdXRlZC5cbiAgICovXG5cbiAgY29uZmlnLnJlc3BvbnNlSW50ZXJjZXB0b3JzID0gY29uZmlnLnJlc3BvbnNlSW50ZXJjZXB0b3JzID8gWy4uLmNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9yc10gOiBbXTtcblxuICBjb25maWcuZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoZGF0YSAvKiwgb3BlcmF0aW9uLCB3aGF0LCB1cmwsIHJlc3BvbnNlLCBzdWJqZWN0ICovKSB7XG4gICAgcmV0dXJuIGRhdGEgfHwge307XG4gIH07XG5cbiAgY29uZmlnLnJlc3BvbnNlRXh0cmFjdG9yID0gZnVuY3Rpb24gKGRhdGEsIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgc3ViamVjdCkge1xuICAgIHZhciBpbnRlcmNlcHRvcnMgPSBjbG9uZShjb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnMpO1xuICAgIGludGVyY2VwdG9ycy5wdXNoKGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvcik7XG4gICAgdmFyIHRoZURhdGEgPSBkYXRhO1xuICAgIGVhY2goaW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAoaW50ZXJjZXB0b3I6IGFueSkge1xuICAgICAgdGhlRGF0YSA9IGludGVyY2VwdG9yKHRoZURhdGEsIG9wZXJhdGlvbixcbiAgICAgICAgd2hhdCwgdXJsLCByZXNwb25zZSwgc3ViamVjdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoZURhdGE7XG4gIH07XG5cbiAgb2JqZWN0LmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoZXh0cmFjdG9yKSB7XG4gICAgY29uZmlnLnJlc3BvbnNlSW50ZXJjZXB0b3JzLnB1c2goZXh0cmFjdG9yKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuZXJyb3JJbnRlcmNlcHRvcnMgPSBjb25maWcuZXJyb3JJbnRlcmNlcHRvcnMgPyBbLi4uY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzXSA6IFtdO1xuICBvYmplY3QuYWRkRXJyb3JJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNvbmZpZy5lcnJvckludGVyY2VwdG9ycyA9IFtpbnRlcmNlcHRvciwgLi4uY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3Quc2V0UmVzcG9uc2VJbnRlcmNlcHRvciA9IG9iamVjdC5hZGRSZXNwb25zZUludGVyY2VwdG9yO1xuICBvYmplY3Quc2V0UmVzcG9uc2VFeHRyYWN0b3IgPSBvYmplY3QuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcjtcbiAgb2JqZWN0LnNldEVycm9ySW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkRXJyb3JJbnRlcmNlcHRvcjtcblxuICAvKipcbiAgICogUmVzcG9uc2UgaW50ZXJjZXB0b3IgaXMgY2FsbGVkIGp1c3QgYmVmb3JlIHJlc29sdmluZyBwcm9taXNlcy5cbiAgICovXG5cblxuICAvKipcbiAgICogUmVxdWVzdCBpbnRlcmNlcHRvciBpcyBjYWxsZWQgYmVmb3JlIHNlbmRpbmcgYW4gb2JqZWN0IHRvIHRoZSBzZXJ2ZXIuXG4gICAqL1xuICBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycyA9IGNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzID8gWy4uLmNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzXSA6IFtdO1xuXG4gIGNvbmZpZy5kZWZhdWx0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgaHR0cENvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgaHR0cENvbmZpZzogaHR0cENvbmZpZ1xuICAgIH07XG4gIH07XG5cbiAgY29uZmlnLmZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgaHR0cENvbmZpZykge1xuICAgIHZhciBpbnRlcmNlcHRvcnMgPSBjbG9uZShjb25maWcucmVxdWVzdEludGVyY2VwdG9ycyk7XG4gICAgdmFyIGRlZmF1bHRSZXF1ZXN0ID0gY29uZmlnLmRlZmF1bHRJbnRlcmNlcHRvcihlbGVtZW50LCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKTtcbiAgICByZXR1cm4gcmVkdWNlKGludGVyY2VwdG9ycywgZnVuY3Rpb24gKHJlcXVlc3Q6IGFueSwgaW50ZXJjZXB0b3I6IGFueSkge1xuXG4gICAgICBsZXQgcmV0dXJuSW50ZXJjZXB0b3I6IGFueSA9IGludGVyY2VwdG9yKHJlcXVlc3QuZWxlbWVudCwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIHJlcXVlc3QuaGVhZGVycywgcmVxdWVzdC5wYXJhbXMsIHJlcXVlc3QuaHR0cENvbmZpZyk7XG4gICAgICByZXR1cm4gZXh0ZW5kKHJlcXVlc3QsIHJldHVybkludGVyY2VwdG9yKTtcbiAgICB9LCBkZWZhdWx0UmVxdWVzdCk7XG4gIH07XG5cbiAgb2JqZWN0LmFkZFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzLnB1c2goZnVuY3Rpb24gKGVsZW0sIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBlbGVtZW50OiBpbnRlcmNlcHRvcihlbGVtLCBvcGVyYXRpb24sIHBhdGgsIHVybCksXG4gICAgICAgIGh0dHBDb25maWc6IGh0dHBDb25maWdcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnNldFJlcXVlc3RJbnRlcmNlcHRvciA9IG9iamVjdC5hZGRSZXF1ZXN0SW50ZXJjZXB0b3I7XG5cbiAgb2JqZWN0LmFkZEZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycy5wdXNoKGludGVyY2VwdG9yKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3Quc2V0RnVsbFJlcXVlc3RJbnRlcmNlcHRvciA9IG9iamVjdC5hZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yO1xuXG4gIGNvbmZpZy5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQgPSBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkIHx8IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9O1xuICBvYmplY3Quc2V0T25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkID0gZnVuY3Rpb24gKHBvc3QpIHtcbiAgICBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkID0gcG9zdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3Quc2V0UmVzdGFuZ3VsYXJpemVQcm9taXNlSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWcucmVzdGFuZ3VsYXJpemVQcm9taXNlSW50ZXJjZXB0b3IgPSBpbnRlcmNlcHRvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGFmdGVyIGFuIGVsZW1lbnQgaGFzIGJlZW4gXCJSZXN0YW5ndWxhcml6ZWRcIi5cbiAgICpcbiAgICogSXQgcmVjZWl2ZXMgdGhlIGVsZW1lbnQsIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGl0J3MgYW4gZWxlbWVudCBvciBhIGNvbGxlY3Rpb25cbiAgICogYW5kIHRoZSBuYW1lIG9mIHRoZSBtb2RlbFxuICAgKlxuICAgKi9cbiAgY29uZmlnLm9uRWxlbVJlc3Rhbmd1bGFyaXplZCA9IGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQgfHwgZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH07XG4gIG9iamVjdC5zZXRPbkVsZW1SZXN0YW5ndWxhcml6ZWQgPSBmdW5jdGlvbiAocG9zdCkge1xuICAgIGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQgPSBwb3N0O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50ID0gY29uZmlnLnNob3VsZFNhdmVQYXJlbnQgfHwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgb2JqZWN0LnNldFBhcmVudGxlc3MgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgaWYgKGlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgY29uZmlnLnNob3VsZFNhdmVQYXJlbnQgPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgcmV0dXJuICFpbmNsdWRlcyh2YWx1ZXMsIHJvdXRlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWVzKSkge1xuICAgICAgY29uZmlnLnNob3VsZFNhdmVQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdmFsdWVzO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgbGV0cyB5b3Ugc2V0IGEgc3VmZml4IHRvIGV2ZXJ5IHJlcXVlc3QuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBpZiB5b3VyIGFwaSByZXF1aXJlcyB0aGF0IGZvciBKU29uIHJlcXVlc3RzIHlvdSBkbyAvdXNlcnMvMTIzLmpzb24sIHlvdSBjYW4gc2V0IHRoYXRcbiAgICogaW4gaGVyZS5cbiAgICpcbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhlIHN1ZmZpeCBpcyBudWxsXG4gICAqL1xuICBjb25maWcuc3VmZml4ID0gaXNVbmRlZmluZWQoY29uZmlnLnN1ZmZpeCkgPyBudWxsIDogY29uZmlnLnN1ZmZpeDtcbiAgb2JqZWN0LnNldFJlcXVlc3RTdWZmaXggPSBmdW5jdGlvbiAobmV3U3VmZml4KSB7XG4gICAgY29uZmlnLnN1ZmZpeCA9IG5ld1N1ZmZpeDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGVsZW1lbnQgdHJhbnNmb3JtZXJzIGZvciBjZXJ0YWluIHJvdXRlcy5cbiAgICovXG4gIGNvbmZpZy50cmFuc2Zvcm1lcnMgPSBjb25maWcudHJhbnNmb3JtZXJzIHx8IHt9O1xuICBvYmplY3QuYWRkRWxlbWVudFRyYW5zZm9ybWVyID0gZnVuY3Rpb24gKHR5cGUsIHNlY29uZEFyZywgdGhpcmRBcmcpIHtcbiAgICB2YXIgaXNDb2xsZWN0aW9uID0gbnVsbDtcbiAgICB2YXIgdHJhbnNmb3JtZXIgPSBudWxsO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICB0cmFuc2Zvcm1lciA9IHNlY29uZEFyZztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNmb3JtZXIgPSB0aGlyZEFyZztcbiAgICAgIGlzQ29sbGVjdGlvbiA9IHNlY29uZEFyZztcbiAgICB9XG5cbiAgICB2YXIgdHlwZVRyYW5zZm9ybWVycyA9IGNvbmZpZy50cmFuc2Zvcm1lcnNbdHlwZV07XG4gICAgaWYgKCF0eXBlVHJhbnNmb3JtZXJzKSB7XG4gICAgICB0eXBlVHJhbnNmb3JtZXJzID0gY29uZmlnLnRyYW5zZm9ybWVyc1t0eXBlXSA9IFtdO1xuICAgIH1cblxuICAgIHR5cGVUcmFuc2Zvcm1lcnMucHVzaChmdW5jdGlvbiAoY29sbCwgZWxlbSkge1xuICAgICAgaWYgKGlzTnVsbChpc0NvbGxlY3Rpb24pIHx8IChjb2xsID09PSBpc0NvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lcihlbGVtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcblxuICBvYmplY3QuZXh0ZW5kQ29sbGVjdGlvbiA9IGZ1bmN0aW9uIChyb3V0ZSwgZm4pIHtcbiAgICByZXR1cm4gb2JqZWN0LmFkZEVsZW1lbnRUcmFuc2Zvcm1lcihyb3V0ZSwgdHJ1ZSwgZm4pO1xuICB9O1xuXG4gIG9iamVjdC5leHRlbmRNb2RlbCA9IGZ1bmN0aW9uIChyb3V0ZSwgZm4pIHtcbiAgICByZXR1cm4gb2JqZWN0LmFkZEVsZW1lbnRUcmFuc2Zvcm1lcihyb3V0ZSwgZmFsc2UsIGZuKTtcbiAgfTtcblxuICBjb25maWcudHJhbnNmb3JtRWxlbSA9IGZ1bmN0aW9uIChlbGVtLCBpc0NvbGxlY3Rpb24sIHJvdXRlLCBSZXN0YW5ndWxhciwgZm9yY2UpIHtcbiAgICBpZiAoIWZvcmNlICYmICFjb25maWcudHJhbnNmb3JtTG9jYWxFbGVtZW50cyAmJiAhZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZnJvbVNlcnZlcl0pIHtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH1cbiAgICB2YXIgdHlwZVRyYW5zZm9ybWVycyA9IGNvbmZpZy50cmFuc2Zvcm1lcnNbcm91dGVdO1xuICAgIHZhciBjaGFuZ2VkRWxlbSA9IGVsZW07XG4gICAgaWYgKHR5cGVUcmFuc2Zvcm1lcnMpIHtcbiAgICAgIGVhY2godHlwZVRyYW5zZm9ybWVycywgZnVuY3Rpb24gKHRyYW5zZm9ybWVyOiAoaXNDb2xsZWN0aW9uOiBib29sZWFuLCBjaGFuZ2VkRWxlbTogYW55KSA9PiBhbnkpIHtcbiAgICAgICAgY2hhbmdlZEVsZW0gPSB0cmFuc2Zvcm1lcihpc0NvbGxlY3Rpb24sIGNoYW5nZWRFbGVtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnLm9uRWxlbVJlc3Rhbmd1bGFyaXplZChjaGFuZ2VkRWxlbSwgaXNDb2xsZWN0aW9uLCByb3V0ZSwgUmVzdGFuZ3VsYXIpO1xuICB9O1xuXG4gIGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzID0gaXNVbmRlZmluZWQoY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMpID9cbiAgICBmYWxzZSA6XG4gICAgY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHM7XG5cbiAgb2JqZWN0LnNldFRyYW5zZm9ybU9ubHlTZXJ2ZXJFbGVtZW50cyA9IGZ1bmN0aW9uIChhY3RpdmUpIHtcbiAgICBjb25maWcudHJhbnNmb3JtTG9jYWxFbGVtZW50cyA9ICFhY3RpdmU7XG4gIH07XG5cbiAgY29uZmlnLmZ1bGxSZXNwb25zZSA9IGlzVW5kZWZpbmVkKGNvbmZpZy5mdWxsUmVzcG9uc2UpID8gZmFsc2UgOiBjb25maWcuZnVsbFJlc3BvbnNlO1xuICBvYmplY3Quc2V0RnVsbFJlc3BvbnNlID0gZnVuY3Rpb24gKGZ1bGwpIHtcbiAgICBjb25maWcuZnVsbFJlc3BvbnNlID0gZnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuXG4gIC8vSW50ZXJuYWwgdmFsdWVzIGFuZCBmdW5jdGlvbnNcbiAgY29uZmlnLnVybENyZWF0b3JGYWN0b3J5ID0ge307XG5cbiAgLyoqXG4gICAqIEJhc2UgVVJMIENyZWF0b3IuIEJhc2UgcHJvdG90eXBlIGZvciBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gaXRcbiAgICoqL1xuXG4gIHZhciBCYXNlQ3JlYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgfTtcblxuICBCYXNlQ3JlYXRvci5wcm90b3R5cGUuc2V0Q29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJhc2VDcmVhdG9yLnByb3RvdHlwZS5wYXJlbnRzQXJyYXkgPSBmdW5jdGlvbiAoY3VycmVudCkge1xuICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgIHBhcmVudHMucHVzaChjdXJyZW50KTtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudHMucmV2ZXJzZSgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIFJlc3Rhbmd1bGFyUmVzb3VyY2UoY29uZmlnLCAkaHR0cCwgdXJsLCBjb25maWd1cmVyKSB7XG4gICAgdmFyIHJlc291cmNlID0ge307XG4gICAgZWFjaChrZXlzKGNvbmZpZ3VyZXIpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgdmFsdWUgPSBjb25maWd1cmVyW2tleV07XG5cbiAgICAgIC8vIEFkZCBkZWZhdWx0IHBhcmFtZXRlcnNcbiAgICAgIHZhbHVlLnBhcmFtcyA9IGV4dGVuZCh7fSwgdmFsdWUucGFyYW1zLCBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXNbdmFsdWUubWV0aG9kLnRvTG93ZXJDYXNlKCldKTtcbiAgICAgIC8vIFdlIGRvbid0IHdhbnQgdGhlID8gaWYgbm8gcGFyYW1zIGFyZSB0aGVyZVxuICAgICAgaWYgKGlzRW1wdHkodmFsdWUucGFyYW1zKSkge1xuICAgICAgICBkZWxldGUgdmFsdWUucGFyYW1zO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLmlzU2FmZSh2YWx1ZS5tZXRob2QpKSB7XG5cbiAgICAgICAgcmVzb3VyY2Vba2V5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZXQgY29uZmlnID0gZXh0ZW5kKHZhbHVlLCB7XG4gICAgICAgICAgICB1cmw6IHVybFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiAkaHR0cC5jcmVhdGVSZXF1ZXN0KGNvbmZpZyk7XG4gICAgICAgIH07XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmVzb3VyY2Vba2V5XSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgbGV0IGNvbmZpZyA9IGV4dGVuZCh2YWx1ZSwge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuICRodHRwLmNyZWF0ZVJlcXVlc3QoY29uZmlnKTtcbiAgICAgICAgfTtcblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc291cmNlO1xuICB9XG5cbiAgQmFzZUNyZWF0b3IucHJvdG90eXBlLnJlc291cmNlID0gZnVuY3Rpb24gKGN1cnJlbnQsICRodHRwLCBsb2NhbEh0dHBDb25maWcsIGNhbGxIZWFkZXJzLCBjYWxsUGFyYW1zLCB3aGF0LCBldGFnLCBvcGVyYXRpb24pIHtcbiAgICB2YXIgcGFyYW1zID0gZGVmYXVsdHMoY2FsbFBhcmFtcyB8fCB7fSwgdGhpcy5jb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXMuY29tbW9uKTtcbiAgICB2YXIgaGVhZGVycyA9IGRlZmF1bHRzKGNhbGxIZWFkZXJzIHx8IHt9LCB0aGlzLmNvbmZpZy5kZWZhdWx0SGVhZGVycyk7XG5cbiAgICBpZiAoZXRhZykge1xuICAgICAgaWYgKCFjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgaGVhZGVyc1snSWYtTWF0Y2gnXSA9IGV0YWc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkZXJzWydJZi1Ob25lLU1hdGNoJ10gPSBldGFnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB1cmwgPSB0aGlzLmJhc2UoY3VycmVudCk7XG5cbiAgICBpZiAod2hhdCkge1xuICAgICAgdmFyIGFkZCA9ICcnO1xuICAgICAgaWYgKCEvXFwvJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIGFkZCArPSAnLyc7XG4gICAgICB9XG4gICAgICBhZGQgKz0gd2hhdDtcbiAgICAgIHVybCArPSBhZGQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnN1ZmZpeCAmJlxuICAgICAgdXJsLmluZGV4T2YodGhpcy5jb25maWcuc3VmZml4LCB1cmwubGVuZ3RoIC0gdGhpcy5jb25maWcuc3VmZml4Lmxlbmd0aCkgPT09IC0xICYmICF0aGlzLmNvbmZpZy5nZXRVcmxGcm9tRWxlbShjdXJyZW50KSkge1xuICAgICAgdXJsICs9IHRoaXMuY29uZmlnLnN1ZmZpeDtcbiAgICB9XG5cbiAgICBjdXJyZW50W3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmh0dHBDb25maWddID0gdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIFJlc3Rhbmd1bGFyUmVzb3VyY2UodGhpcy5jb25maWcsICRodHRwLCB1cmwsIHtcbiAgICAgIGdldExpc3Q6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgZ2V0OiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIGpzb25wOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdqc29ucCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgcHV0OiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIHBvc3Q6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIHJlbW92ZTogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBoZWFkOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdIRUFEJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICB0cmFjZTogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnVFJBQ0UnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIG9wdGlvbnM6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ09QVElPTlMnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIHBhdGNoOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KVxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBQYXRoIFVSTCBjcmVhdG9yLiBJdCB1c2VzIFBhdGggdG8gc2hvdyBIaWVyYXJjaHkgaW4gdGhlIFJlc3QgQVBJLlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgaWYgeW91IGhhdmUgYW4gQWNjb3VudCB0aGF0IHRoZW4gaGFzIGEgc2V0IG9mIEJ1aWxkaW5ncywgYSBVUkwgdG8gYSBidWlsZGluZ1xuICAgKiB3b3VsZCBiZSAvYWNjb3VudHMvMTIzL2J1aWxkaW5ncy80NTZcbiAgICoqL1xuICB2YXIgUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgfTtcblxuICBQYXRoLnByb3RvdHlwZSA9IG5ldyBCYXNlQ3JlYXRvcigpO1xuXG4gIFBhdGgucHJvdG90eXBlLm5vcm1hbGl6ZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICB2YXIgcGFydHMgPSAvKCg/Omh0dHBbc10/Oik/XFwvXFwvKT8oLiopPy8uZXhlYyh1cmwpO1xuICAgIHBhcnRzWzJdID0gcGFydHNbMl0ucmVwbGFjZSgvW1xcXFxcXC9dKy9nLCAnLycpO1xuICAgIHJldHVybiAodHlwZW9mIHBhcnRzWzFdICE9PSAndW5kZWZpbmVkJykgPyBwYXJ0c1sxXSArIHBhcnRzWzJdIDogcGFydHNbMl07XG4gIH07XG5cbiAgUGF0aC5wcm90b3R5cGUuYmFzZSA9IGZ1bmN0aW9uIChjdXJyZW50KSB7XG4gICAgdmFyIF9fdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIHJlZHVjZSh0aGlzLnBhcmVudHNBcnJheShjdXJyZW50KSwgZnVuY3Rpb24gKGFjdW06IGFueSwgZWxlbTogYW55KSB7XG4gICAgICB2YXIgZWxlbVVybDtcbiAgICAgIHZhciBlbGVtU2VsZkxpbmsgPSBfX3RoaXMuY29uZmlnLmdldFVybEZyb21FbGVtKGVsZW0pO1xuICAgICAgaWYgKGVsZW1TZWxmTGluaykge1xuICAgICAgICBpZiAoX190aGlzLmNvbmZpZy5pc0Fic29sdXRlVXJsKGVsZW1TZWxmTGluaykpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbVNlbGZMaW5rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1VcmwgPSBlbGVtU2VsZkxpbms7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1VcmwgPSBlbGVtW19fdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdO1xuXG4gICAgICAgIGlmIChlbGVtW19fdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgIHZhciBpZHMgPSBlbGVtW19fdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaWRzXTtcbiAgICAgICAgICBpZiAoaWRzKSB7XG4gICAgICAgICAgICBlbGVtVXJsICs9ICcvJyArIGlkcy5qb2luKCcsJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBlbGVtSWQ6IGFueTtcbiAgICAgICAgICBpZiAoX190aGlzLmNvbmZpZy51c2VDYW5ub25pY2FsSWQpIHtcbiAgICAgICAgICAgIGVsZW1JZCA9IF9fdGhpcy5jb25maWcuZ2V0Q2Fubm9uaWNhbElkRnJvbUVsZW0oZWxlbSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1JZCA9IF9fdGhpcy5jb25maWcuZ2V0SWRGcm9tRWxlbShlbGVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29uZmlnLmlzVmFsaWRJZChlbGVtSWQpICYmICFlbGVtLnNpbmdsZU9uZSkge1xuICAgICAgICAgICAgZWxlbVVybCArPSAnLycgKyAoX190aGlzLmNvbmZpZy5lbmNvZGVJZHMgPyBlbmNvZGVVUklDb21wb25lbnQoZWxlbUlkKSA6IGVsZW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhY3VtID0gYWN1bS5yZXBsYWNlKC9cXC8kLywgJycpICsgJy8nICsgZWxlbVVybDtcbiAgICAgIHJldHVybiBfX3RoaXMubm9ybWFsaXplVXJsKGFjdW0pO1xuXG4gICAgfSwgdGhpcy5jb25maWcuYmFzZVVybCk7XG4gIH07XG5cblxuICBQYXRoLnByb3RvdHlwZS5mZXRjaFVybCA9IGZ1bmN0aW9uIChjdXJyZW50LCB3aGF0KSB7XG4gICAgdmFyIGJhc2VVcmwgPSB0aGlzLmJhc2UoY3VycmVudCk7XG4gICAgaWYgKHdoYXQpIHtcbiAgICAgIGJhc2VVcmwgKz0gJy8nICsgd2hhdDtcbiAgICB9XG4gICAgcmV0dXJuIGJhc2VVcmw7XG4gIH07XG5cbiAgUGF0aC5wcm90b3R5cGUuZmV0Y2hSZXF1ZXN0ZWRVcmwgPSBmdW5jdGlvbiAoY3VycmVudCwgd2hhdCkge1xuICAgIHZhciB1cmwgPSB0aGlzLmZldGNoVXJsKGN1cnJlbnQsIHdoYXQpO1xuICAgIHZhciBwYXJhbXMgPSBjdXJyZW50W2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXFQYXJhbXNdO1xuXG4gICAgLy8gRnJvbSBoZXJlIG9uIGFuZCB1bnRpbCB0aGUgZW5kIG9mIGZldGNoUmVxdWVzdGVkVXJsLFxuICAgIC8vIHRoZSBjb2RlIGhhcyBiZWVuIGtpbmRseSBib3Jyb3dlZCBmcm9tIGFuZ3VsYXIuanNcbiAgICAvLyBUaGUgcmVhc29uIGZvciBzdWNoIGNvZGUgYmxvYXRpbmcgaXMgY29oZXJlbmNlOlxuICAgIC8vICAgSWYgdGhlIHVzZXIgd2VyZSB0byB1c2UgdGhpcyBmb3IgY2FjaGUgbWFuYWdlbWVudCwgdGhlXG4gICAgLy8gICBzZXJpYWxpemF0aW9uIG9mIHBhcmFtZXRlcnMgd291bGQgbmVlZCB0byBiZSBpZGVudGljYWxcbiAgICAvLyAgIHRvIHRoZSBvbmUgZG9uZSBieSBhbmd1bGFyIGZvciBjYWNoZSBrZXlzIHRvIG1hdGNoLlxuICAgIGZ1bmN0aW9uIHNvcnRlZEtleXMob2JqKSB7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGtleXMuc29ydCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvckVhY2hTb3J0ZWQob2JqLCBpdGVyYXRvcj8sIGNvbnRleHQ/KSB7XG4gICAgICB2YXIga2V5cyA9IHNvcnRlZEtleXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXlzW2ldXSwga2V5c1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmNvZGVVcmlRdWVyeSh2YWwsIHBjdEVuY29kZVNwYWNlcz8pIHtcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5yZXBsYWNlKC8lNDAvZ2ksICdAJykucmVwbGFjZSgvJTNBL2dpLCAnOicpLnJlcGxhY2UoLyUyNC9nLCAnJCcpLnJlcGxhY2UoLyUyQy9naSwgJywnKS5yZXBsYWNlKC8lMjAvZywgKHBjdEVuY29kZVNwYWNlcyA/ICclMjAnIDogJysnKSk7XG4gICAgfVxuXG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgIHJldHVybiB1cmwgKyAodGhpcy5jb25maWcuc3VmZml4IHx8ICcnKTtcbiAgICB9XG5cbiAgICB2YXIgcGFydHMgPSBbXTtcbiAgICBmb3JFYWNoU29ydGVkKHBhcmFtcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgfVxuXG4gICAgICBmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAoaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGVVcmlRdWVyeShrZXkpICsgJz0nICsgZW5jb2RlVXJpUXVlcnkodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdXJsICsgKHRoaXMuY29uZmlnLnN1ZmZpeCB8fCAnJykgKyAoKHVybC5pbmRleE9mKCc/JykgPT09IC0xKSA/ICc/JyA6ICcmJykgKyBwYXJ0cy5qb2luKCcmJyk7XG4gIH07XG5cbiAgY29uZmlnLnVybENyZWF0b3JGYWN0b3J5LnBhdGggPSBQYXRoO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3RvciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFzc2lnbiB9IGZyb20gJ2NvcmUtanMvZm4vb2JqZWN0JztcbmltcG9ydCB7XG4gIG1hcCxcbiAgYmluZCxcbiAgdW5pb24sXG4gIHZhbHVlcyxcbiAgcGljayxcbiAgaXNFbXB0eSxcbiAgaXNGdW5jdGlvbixcbiAgaXNOdW1iZXIsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0FycmF5LFxuICBpc09iamVjdCxcbiAgZXh0ZW5kLFxuICBlYWNoLFxuICBldmVyeSxcbiAgb21pdCxcbiAgZ2V0LFxuICBkZWZhdWx0cyxcbiAgY2xvbmUsXG4gIGNsb25lRGVlcCxcbiAgaW5jbHVkZXNcbn0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFJFU1RBTkdVTEFSIH0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXIuY29uZmlnJztcbmltcG9ydCB7IFJlc3Rhbmd1bGFySHR0cCB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLWh0dHAnO1xuaW1wb3J0IHsgUmVzdGFuZ3VsYXJDb25maWd1cmVyIH0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXItY29uZmlnLmZhY3RvcnknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzdGFuZ3VsYXIge1xuICBwcm92aWRlcjoge1xuICAgIHNldEJhc2VVcmw6IGFueSxcbiAgICBzZXREZWZhdWx0SGVhZGVyczogYW55LFxuICAgIGNvbmZpZ3VyYXRpb246IGFueSxcbiAgICBzZXRTZWxmTGlua0Fic29sdXRlVXJsOiBhbnksXG4gICAgc2V0RXh0cmFGaWVsZHM6IGFueSxcbiAgICBzZXREZWZhdWx0SHR0cEZpZWxkczogYW55LFxuICAgIHNldFBsYWluQnlEZWZhdWx0OiBhbnksXG4gICAgc2V0RW5jb2RlSWRzOiBhbnksXG4gICAgc2V0RGVmYXVsdFJlcXVlc3RQYXJhbXM6IGFueSxcbiAgICByZXF1ZXN0UGFyYW1zOiBhbnksXG4gICAgZGVmYXVsdEhlYWRlcnM6IGFueSxcbiAgICBzZXREZWZhdWx0UmVzcG9uc2VNZXRob2Q6IGFueSxcbiAgICBkZWZhdWx0UmVzcG9uc2VNZXRob2Q6IGFueSxcbiAgICBzZXRNZXRob2RPdmVycmlkZXJzOiBhbnksXG4gICAgc2V0SnNvbnA6IGFueSxcbiAgICBzZXRVcmxDcmVhdG9yOiBhbnksXG4gICAgc2V0UmVzdGFuZ3VsYXJGaWVsZHM6IGFueSxcbiAgICBzZXRVc2VDYW5ub25pY2FsSWQ6IGFueSxcbiAgICBhZGRSZXNwb25zZUludGVyY2VwdG9yOiBhbnksXG4gICAgYWRkRXJyb3JJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldFJlc3BvbnNlSW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRSZXNwb25zZUV4dHJhY3RvcjogYW55LFxuICAgIHNldEVycm9ySW50ZXJjZXB0b3I6IGFueSxcbiAgICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRSZXF1ZXN0SW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRGdWxsUmVxdWVzdEludGVyY2VwdG9yOiBhbnksXG4gICAgYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldE9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZDogYW55LFxuICAgIHNldFJlc3Rhbmd1bGFyaXplUHJvbWlzZUludGVyY2VwdG9yOiBhbnksXG4gICAgc2V0T25FbGVtUmVzdGFuZ3VsYXJpemVkOiBhbnksXG4gICAgc2V0UGFyZW50bGVzczogYW55LFxuICAgIHNldFJlcXVlc3RTdWZmaXg6IGFueSxcbiAgICBhZGRFbGVtZW50VHJhbnNmb3JtZXI6IGFueSxcbiAgICBleHRlbmRDb2xsZWN0aW9uOiBhbnksXG4gICAgZXh0ZW5kTW9kZWw6IGFueSxcbiAgICBzZXRUcmFuc2Zvcm1Pbmx5U2VydmVyRWxlbWVudHM6IGFueSxcbiAgICBzZXRGdWxsUmVzcG9uc2U6IGFueSxcbiAgICAkZ2V0OiBhbnlcbiAgfTtcbiAgYWRkRWxlbWVudFRyYW5zZm9ybWVyOiBhbnk7XG4gIGV4dGVuZENvbGxlY3Rpb246IGFueTtcbiAgZXh0ZW5kTW9kZWw6IGFueTtcbiAgY29weTtcbiAgY29uZmlndXJhdGlvbjtcbiAgc2VydmljZTtcbiAgaWQ7XG4gIHJvdXRlO1xuICBwYXJlbnRSZXNvdXJjZTtcbiAgcmVzdGFuZ3VsYXJDb2xsZWN0aW9uO1xuICBjYW5ub25pY2FsSWQ7XG4gIGV0YWc7XG4gIHNlbGZMaW5rO1xuICBnZXQ7XG4gIGdldExpc3Q7XG4gIHB1dDtcbiAgcG9zdDtcbiAgcmVtb3ZlO1xuICBoZWFkO1xuICB0cmFjZTtcbiAgb3B0aW9ucztcbiAgcGF0Y2g7XG4gIGdldFJlc3Rhbmd1bGFyVXJsO1xuICBnZXRSZXF1ZXN0ZWRVcmw7XG4gIHB1dEVsZW1lbnQ7XG4gIGFkZFJlc3Rhbmd1bGFyTWV0aG9kO1xuICBnZXRQYXJlbnRMaXN0O1xuICBjbG9uZTtcbiAgaWRzO1xuICBodHRwQ29uZmlnO1xuICByZXFQYXJhbXM7XG4gIG9uZTtcbiAgYWxsO1xuICBzZXZlcmFsO1xuICBvbmVVcmw7XG4gIGFsbFVybDtcbiAgY3VzdG9tUFVUO1xuICBjdXN0b21QQVRDSDtcbiAgY3VzdG9tUE9TVDtcbiAgY3VzdG9tREVMRVRFO1xuICBjdXN0b21HRVQ7XG4gIGN1c3RvbUdFVExJU1Q7XG4gIGN1c3RvbU9wZXJhdGlvbjtcbiAgZG9QVVQ7XG4gIGRvUEFUQ0g7XG4gIGRvUE9TVDtcbiAgZG9ERUxFVEU7XG4gIGRvR0VUO1xuICBkb0dFVExJU1Q7XG4gIGZyb21TZXJ2ZXI7XG4gIHdpdGhDb25maWc7XG4gIHdpdGhIdHRwQ29uZmlnO1xuICBzaW5nbGVPbmU7XG4gIHBsYWluO1xuICBzYXZlO1xuICByZXN0YW5ndWxhcml6ZWQ7XG4gIHJlc3Rhbmd1bGFyaXplRWxlbWVudDtcbiAgcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUkVTVEFOR1VMQVIpIHB1YmxpYyBjb25maWdPYmosXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBodHRwOiBSZXN0YW5ndWxhckh0dHBcbiAgKSB7XG4gICAgdGhpcy5wcm92aWRlciA9IG5ldyBwcm92aWRlckNvbmZpZyhodHRwKTtcbiAgICBsZXQgZWxlbWVudCA9IHRoaXMucHJvdmlkZXIuJGdldCgpO1xuICAgIGFzc2lnbih0aGlzLCBlbGVtZW50KTtcblxuICAgIHRoaXMuc2V0RGVmYXVsdENvbmZpZygpO1xuICB9XG5cbiAgc2V0RGVmYXVsdENvbmZpZygpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnT2JqIHx8ICFpc0Z1bmN0aW9uKHRoaXMuY29uZmlnT2JqLmZuKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhcnJESSA9IG1hcCh0aGlzLmNvbmZpZ09iai5hcnJTZXJ2aWNlcywgKHNlcnZpY2VzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoc2VydmljZXMpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb25maWdPYmouZm4oLi4uW3RoaXMucHJvdmlkZXIsIC4uLmFyckRJXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvdmlkZXJDb25maWcoJGh0dHApIHtcbiAgdmFyIGdsb2JhbENvbmZpZ3VyYXRpb24gPSB7fTtcblxuICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIodGhpcywgZ2xvYmFsQ29uZmlndXJhdGlvbik7XG5cbiAgdGhpcy4kZ2V0ID0gJGdldFxuXG4gIGZ1bmN0aW9uICRnZXQoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgIHZhciBzZXJ2aWNlOiBhbnkgPSB7fTtcblxuICAgICAgdmFyIHVybEhhbmRsZXIgPSBuZXcgY29uZmlnLnVybENyZWF0b3JGYWN0b3J5W2NvbmZpZy51cmxDcmVhdG9yXSgpO1xuICAgICAgdXJsSGFuZGxlci5zZXRDb25maWcoY29uZmlnKTtcblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcikge1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0gPSByb3V0ZTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UmVzdGFuZ3VsYXJVcmxdID0gYmluZCh1cmxIYW5kbGVyLmZldGNoVXJsLCB1cmxIYW5kbGVyLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UmVxdWVzdGVkVXJsXSA9IGJpbmQodXJsSGFuZGxlci5mZXRjaFJlcXVlc3RlZFVybCwgdXJsSGFuZGxlciwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmFkZFJlc3Rhbmd1bGFyTWV0aG9kXSA9IGJpbmQoYWRkUmVzdGFuZ3VsYXJNZXRob2RGdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNsb25lXSA9IGJpbmQoY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQsIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXFQYXJhbXNdID0gaXNFbXB0eShyZXFQYXJhbXMpID8gbnVsbCA6IHJlcVBhcmFtcztcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMud2l0aEh0dHBDb25maWddID0gYmluZCh3aXRoSHR0cENvbmZpZywgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBsYWluXSA9IGJpbmQoc3RyaXBSZXN0YW5ndWxhciwgZWxlbSwgZWxlbSk7XG5cbiAgICAgICAgLy8gVGFnIGVsZW1lbnQgYXMgcmVzdGFuZ3VsYXJpemVkXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyaXplZF0gPSB0cnVlO1xuXG4gICAgICAgIC8vIFJlcXVlc3RMZXNzIGNvbm5lY3Rpb25cbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub25lXSA9IGJpbmQob25lLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuYWxsXSA9IGJpbmQoYWxsLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2V2ZXJhbF0gPSBiaW5kKHNldmVyYWwsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5vbmVVcmxdID0gYmluZChvbmVVcmwsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5hbGxVcmxdID0gYmluZChhbGxVcmwsIGVsZW0sIGVsZW0pO1xuXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdID0gISFmcm9tU2VydmVyO1xuXG4gICAgICAgIGlmIChwYXJlbnQgJiYgY29uZmlnLnNob3VsZFNhdmVQYXJlbnQocm91dGUpKSB7XG4gICAgICAgICAgdmFyIHBhcmVudElkID0gY29uZmlnLmdldElkRnJvbUVsZW0ocGFyZW50KTtcbiAgICAgICAgICB2YXIgcGFyZW50VXJsID0gY29uZmlnLmdldFVybEZyb21FbGVtKHBhcmVudCk7XG5cbiAgICAgICAgICB2YXIgcmVzdGFuZ3VsYXJGaWVsZHNGb3JQYXJlbnQgPSB1bmlvbihcbiAgICAgICAgICAgIHZhbHVlcyhwaWNrKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgWydyb3V0ZScsICdzaW5nbGVPbmUnLCAncGFyZW50UmVzb3VyY2UnXSkpLFxuICAgICAgICAgICAgY29uZmlnLmV4dHJhRmllbGRzXG4gICAgICAgICAgKTtcbiAgICAgICAgICB2YXIgcGFyZW50UmVzb3VyY2UgPSBwaWNrKHBhcmVudCwgcmVzdGFuZ3VsYXJGaWVsZHNGb3JQYXJlbnQpO1xuXG4gICAgICAgICAgaWYgKGNvbmZpZy5pc1ZhbGlkSWQocGFyZW50SWQpKSB7XG4gICAgICAgICAgICBjb25maWcuc2V0SWRUb0VsZW0ocGFyZW50UmVzb3VyY2UsIHBhcmVudElkLCByb3V0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb25maWcuaXNWYWxpZElkKHBhcmVudFVybCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5zZXRVcmxUb0VsZW0ocGFyZW50UmVzb3VyY2UsIHBhcmVudFVybCwgcm91dGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSA9IHBhcmVudFJlc291cmNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uZShwYXJlbnQsIHJvdXRlLCBpZCwgc2luZ2xlT25lKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgaWYgKGlzTnVtYmVyKHJvdXRlKSB8fCBpc051bWJlcihwYXJlbnQpKSB7XG4gICAgICAgICAgZXJyb3IgPSAnWW91XFwncmUgY3JlYXRpbmcgYSBSZXN0YW5ndWxhciBlbnRpdHkgd2l0aCB0aGUgbnVtYmVyICc7XG4gICAgICAgICAgZXJyb3IgKz0gJ2luc3RlYWQgb2YgdGhlIHJvdXRlIG9yIHRoZSBwYXJlbnQuIEZvciBleGFtcGxlLCB5b3UgY2FuXFwndCBjYWxsIC5vbmUoMTIpLic7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNVbmRlZmluZWQocm91dGUpKSB7XG4gICAgICAgICAgZXJyb3IgPSAnWW91XFwncmUgY3JlYXRpbmcgYSBSZXN0YW5ndWxhciBlbnRpdHkgZWl0aGVyIHdpdGhvdXQgdGhlIHBhdGguICc7XG4gICAgICAgICAgZXJyb3IgKz0gJ0ZvciBleGFtcGxlIHlvdSBjYW5cXCd0IGNhbGwgLm9uZSgpLiBQbGVhc2UgY2hlY2sgaWYgeW91ciBhcmd1bWVudHMgYXJlIHZhbGlkLic7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbSA9IHt9O1xuICAgICAgICBjb25maWcuc2V0SWRUb0VsZW0oZWxlbSwgaWQsIHJvdXRlKTtcbiAgICAgICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zaW5nbGVPbmUsIGVsZW0sIHNpbmdsZU9uZSk7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhbGwocGFyZW50LCByb3V0ZSkge1xuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKHBhcmVudCwgW10sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldmVyYWwocGFyZW50LCByb3V0ZSAvKiwgaWRzICovKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gW107XG4gICAgICAgIGNvbGxlY3Rpb25bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkc10gPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGNvbGxlY3Rpb24sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uZVVybChwYXJlbnQsIHJvdXRlLCB1cmwpIHtcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm91dGUgaXMgbWFuZGF0b3J5IHdoZW4gY3JlYXRpbmcgbmV3IFJlc3Rhbmd1bGFyIG9iamVjdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW0gPSB7fTtcbiAgICAgICAgY29uZmlnLnNldFVybFRvRWxlbShlbGVtLCB1cmwsIHJvdXRlKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShwYXJlbnQsIGVsZW0sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFsbFVybChwYXJlbnQsIHJvdXRlLCB1cmwpIHtcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm91dGUgaXMgbWFuZGF0b3J5IHdoZW4gY3JlYXRpbmcgbmV3IFJlc3Rhbmd1bGFyIG9iamVjdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW0gPSB7fTtcbiAgICAgICAgY29uZmlnLnNldFVybFRvRWxlbShlbGVtLCB1cmwsIHJvdXRlKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW0sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByb21pc2VzXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZVJlc3BvbnNlKHN1YmplY3QsIGlzQ29sbGVjdGlvbiwgdmFsdWVUb0ZpbGwpIHtcbiAgICAgICAgcmV0dXJuIHN1YmplY3QucGlwZShmaWx0ZXIocmVzID0+ICEhcmVzKSkudG9Qcm9taXNlKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBkYXRhLCBmaWxsZWRWYWx1ZSkge1xuICAgICAgICBleHRlbmQoZmlsbGVkVmFsdWUsIGRhdGEpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIGZ1bGwgcmVzcG9uc2UgaW50ZXJjZXB0b3IuXG4gICAgICAgIGlmIChjb25maWcuZnVsbFJlc3BvbnNlKSB7XG4gICAgICAgICAgc3ViamVjdC5uZXh0KGV4dGVuZChyZXNwb25zZSwge1xuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJqZWN0Lm5leHQoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVsZW1lbnRzXG4gICAgICBmdW5jdGlvbiBzdHJpcFJlc3Rhbmd1bGFyKGVsZW0pIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoZWxlbSkpIHtcbiAgICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgICBlYWNoKGVsZW0sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQodmFsdWUpID8gc3RyaXBSZXN0YW5ndWxhcih2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvbWl0KGVsZW0sIHZhbHVlcyhvbWl0KGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgJ2lkJykpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRDdXN0b21PcGVyYXRpb24oZWxlbSkge1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21PcGVyYXRpb25dID0gYmluZChjdXN0b21GdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIHZhciByZXF1ZXN0TWV0aG9kcyA9IHtnZXQ6IGN1c3RvbUZ1bmN0aW9uLCBkZWxldGU6IGN1c3RvbUZ1bmN0aW9ufTtcbiAgICAgICAgZWFjaChbJ3B1dCcsICdwYXRjaCcsICdwb3N0J10sIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgcmVxdWVzdE1ldGhvZHNbbmFtZV0gPSBmdW5jdGlvbiAob3BlcmF0aW9uLCBlbGVtLCBwYXRoLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5kKGN1c3RvbUZ1bmN0aW9uLCB0aGlzKShvcGVyYXRpb24sIHBhdGgsIHBhcmFtcywgaGVhZGVycywgZWxlbSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2gocmVxdWVzdE1ldGhvZHMsIGZ1bmN0aW9uIChyZXF1ZXN0RnVuYywgbmFtZSkge1xuICAgICAgICAgIHZhciBjYWxsT3BlcmF0aW9uID0gbmFtZSA9PT0gJ2RlbGV0ZScgPyAncmVtb3ZlJyA6IG5hbWU7XG4gICAgICAgICAgZWFjaChbJ2RvJywgJ2N1c3RvbSddLCBmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgICAgIGVsZW1bYWxpYXMgKyBuYW1lLnRvVXBwZXJDYXNlKCldID0gYmluZChyZXF1ZXN0RnVuYywgZWxlbSwgY2FsbE9wZXJhdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21HRVRMSVNUXSA9IGJpbmQoZmV0Y2hGdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmRvR0VUTElTVF0gPSBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21HRVRMSVNUXTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgY29waWVkRWxlbWVudCA9IGNsb25lRGVlcChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShjb3BpZWRFbGVtZW50W2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0sXG4gICAgICAgICAgY29waWVkRWxlbWVudCwgY29waWVkRWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVFbGVtKHBhcmVudCwgZWxlbWVudCwgcm91dGUsIGZyb21TZXJ2ZXI/LCBjb2xsZWN0aW9uPywgcmVxUGFyYW1zPykge1xuICAgICAgICB2YXIgZWxlbSA9IGNvbmZpZy5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQoZWxlbWVudCwgZmFsc2UsIHJvdXRlKTtcblxuICAgICAgICB2YXIgbG9jYWxFbGVtID0gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcik7XG5cbiAgICAgICAgaWYgKGNvbmZpZy51c2VDYW5ub25pY2FsSWQpIHtcbiAgICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNhbm5vbmljYWxJZF0gPSBjb25maWcuZ2V0SWRGcm9tRWxlbShsb2NhbEVsZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldFBhcmVudExpc3RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSA9IGZhbHNlO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldF0gPSBiaW5kKGdldEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldExpc3RdID0gYmluZChmZXRjaEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dF0gPSBiaW5kKHB1dEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBvc3RdID0gYmluZChwb3N0RnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVtb3ZlXSA9IGJpbmQoZGVsZXRlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaGVhZF0gPSBiaW5kKGhlYWRGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy50cmFjZV0gPSBiaW5kKHRyYWNlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub3B0aW9uc10gPSBiaW5kKG9wdGlvbnNGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXRjaF0gPSBiaW5kKHBhdGNoRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2F2ZV0gPSBiaW5kKHNhdmUsIGxvY2FsRWxlbSk7XG5cbiAgICAgICAgYWRkQ3VzdG9tT3BlcmF0aW9uKGxvY2FsRWxlbSk7XG4gICAgICAgIHJldHVybiBjb25maWcudHJhbnNmb3JtRWxlbShsb2NhbEVsZW0sIGZhbHNlLCByb3V0ZSwgc2VydmljZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBmcm9tU2VydmVyPywgcmVxUGFyYW1zPykge1xuICAgICAgICB2YXIgZWxlbSA9IGNvbmZpZy5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQoZWxlbWVudCwgdHJ1ZSwgcm91dGUpO1xuXG4gICAgICAgIHZhciBsb2NhbEVsZW0gPSByZXN0YW5ndWxhcml6ZUJhc2UocGFyZW50LCBlbGVtLCByb3V0ZSwgcmVxUGFyYW1zLCBmcm9tU2VydmVyKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dID0gdHJ1ZTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wb3N0XSA9IGJpbmQocG9zdEZ1bmN0aW9uLCBsb2NhbEVsZW0sIG51bGwpO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlbW92ZV0gPSBiaW5kKGRlbGV0ZUZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmhlYWRdID0gYmluZChoZWFkRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMudHJhY2VdID0gYmluZCh0cmFjZUZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dEVsZW1lbnRdID0gYmluZChwdXRFbGVtZW50RnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub3B0aW9uc10gPSBiaW5kKG9wdGlvbnNGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXRjaF0gPSBiaW5kKHBhdGNoRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0XSA9IGJpbmQoZ2V0QnlJZCwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5nZXRMaXN0XSA9IGJpbmQoZmV0Y2hGdW5jdGlvbiwgbG9jYWxFbGVtLCBudWxsKTtcblxuICAgICAgICBhZGRDdXN0b21PcGVyYXRpb24obG9jYWxFbGVtKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy50cmFuc2Zvcm1FbGVtKGxvY2FsRWxlbSwgdHJ1ZSwgcm91dGUsIHNlcnZpY2UsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb25BbmRFbGVtZW50cyhwYXJlbnQsIGVsZW1lbnQsIHJvdXRlKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKHBhcmVudCwgZWxlbWVudCwgcm91dGUsIGZhbHNlKTtcbiAgICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRCeUlkKGlkLCByZXFQYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tR0VUKGlkLnRvU3RyaW5nKCksIHJlcVBhcmFtcywgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHB1dEVsZW1lbnRGdW5jdGlvbihpZHgsIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGVsZW1Ub1B1dCA9IHRoaXNbaWR4XTtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICB2YXIgZmlsbGVkQXJyYXkgPSBbXTtcbiAgICAgICAgZmlsbGVkQXJyYXkgPSBjb25maWcudHJhbnNmb3JtRWxlbShmaWxsZWRBcnJheSwgdHJ1ZSwgZWxlbVRvUHV0W2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0sIHNlcnZpY2UpO1xuXG4gICAgICAgIGVsZW1Ub1B1dC5wdXQocGFyYW1zLCBoZWFkZXJzKVxuICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZXJ2ZXJFbGVtKSB7XG4gICAgICAgICAgdmFyIG5ld0FycmF5ID0gY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQoX190aGlzKTtcbiAgICAgICAgICBuZXdBcnJheVtpZHhdID0gc2VydmVyRWxlbTtcbiAgICAgICAgICBmaWxsZWRBcnJheSA9IG5ld0FycmF5O1xuICAgICAgICAgIHN1YmplY3QubmV4dChuZXdBcnJheSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHN1YmplY3QuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVSZXNwb25zZShzdWJqZWN0LCB0cnVlLCBmaWxsZWRBcnJheSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBhcnNlUmVzcG9uc2UocmVzRGF0YSwgb3BlcmF0aW9uLCByb3V0ZSwgZmV0Y2hVcmwsIHJlc3BvbnNlLCBzdWJqZWN0KSB7XG4gICAgICAgIHZhciBkYXRhID0gY29uZmlnLnJlc3BvbnNlRXh0cmFjdG9yKHJlc0RhdGEsIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLCByZXNwb25zZSwgc3ViamVjdCk7XG4gICAgICAgIHZhciBldGFnID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0VUYWcnKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZXRhZykge1xuICAgICAgICAgIGRhdGFbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddID0gZXRhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmV0Y2hGdW5jdGlvbih3aGF0LCByZXFQYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgdmFyIF9fdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICAgICAgdmFyIG9wZXJhdGlvbiA9ICdnZXRMaXN0JztcbiAgICAgICAgdmFyIHVybCA9IHVybEhhbmRsZXIuZmV0Y2hVcmwodGhpcywgd2hhdCk7XG4gICAgICAgIHZhciB3aGF0RmV0Y2hlZCA9IHdoYXQgfHwgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV07XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBjb25maWcuZnVsbFJlcXVlc3RJbnRlcmNlcHRvcihudWxsLCBvcGVyYXRpb24sXG4gICAgICAgICAgd2hhdEZldGNoZWQsIHVybCwgaGVhZGVycyB8fCB7fSwgcmVxUGFyYW1zIHx8IHt9LCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSB8fCB7fSk7XG5cbiAgICAgICAgdmFyIGZpbGxlZEFycmF5ID0gW107XG4gICAgICAgIGZpbGxlZEFycmF5ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkQXJyYXksIHRydWUsIHdoYXRGZXRjaGVkLCBzZXJ2aWNlKTtcblxuICAgICAgICB2YXIgbWV0aG9kID0gJ2dldExpc3QnO1xuXG4gICAgICAgIGlmIChjb25maWcuanNvbnApIHtcbiAgICAgICAgICBtZXRob2QgPSAnanNvbnAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9rQ2FsbGJhY2sgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgcmVzRGF0YSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgdmFyIGZ1bGxQYXJhbXMgPSByZXNwb25zZS5jb25maWcucGFyYW1zO1xuICAgICAgICAgIHZhciBkYXRhID0gcGFyc2VSZXNwb25zZShyZXNEYXRhLCBvcGVyYXRpb24sIHdoYXRGZXRjaGVkLCB1cmwsIHJlc3BvbnNlLCBzdWJqZWN0KTtcblxuICAgICAgICAgIC8vIHN1cHBvcnQgZW1wdHkgcmVzcG9uc2UgZm9yIGdldExpc3QoKSBjYWxscyAoc29tZSBBUElzIHJlc3BvbmQgd2l0aCAyMDQgYW5kIGVtcHR5IGJvZHkpXG4gICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGRhdGEpIHx8ICcnID09PSBkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNwb25zZSBmb3IgZ2V0TGlzdCBTSE9VTEQgYmUgYW4gYXJyYXkgYW5kIG5vdCBhbiBvYmplY3Qgb3Igc29tZXRoaW5nIGVsc2UnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHJ1ZSA9PT0gY29uZmlnLnBsYWluQnlEZWZhdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIGRhdGEsIGZpbGxlZEFycmF5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IG1hcChkYXRhLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgICAgaWYgKCFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXMsIGVsZW0sIHdoYXQsIHRydWUsIGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBlbGVtLCBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSwgdHJ1ZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9jZXNzZWREYXRhID0gZXh0ZW5kKGRhdGEsIHByb2Nlc3NlZERhdGEpO1xuXG4gICAgICAgICAgaWYgKCFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKFxuICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgICAgcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgIF9fdGhpcyxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWREYXRhLFxuICAgICAgICAgICAgICAgIHdoYXQsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBmdWxsUGFyYW1zXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGZpbGxlZEFycmF5XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShcbiAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICAgIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWREYXRhLFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgZnVsbFBhcmFtc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBmaWxsZWRBcnJheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCByZXF1ZXN0LmhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLCB3aGF0LFxuICAgICAgICAgIHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddLCBvcGVyYXRpb24pW21ldGhvZF0oKVxuICAgICAgICAuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMzA0ICYmIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIF9fdGhpcywgZmlsbGVkQXJyYXkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlcnkoY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAoY2I6IGFueSkge1xuXG4gICAgICAgICAgICAgIHJldHVybiBjYihyZXNwb25zZSwgc3ViamVjdCwgb2tDYWxsYmFjaykgIT09IGZhbHNlO1xuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXJlZCBpZiBubyBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZVJlc3BvbnNlKHN1YmplY3QsIHRydWUsIGZpbGxlZEFycmF5KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gd2l0aEh0dHBDb25maWcoaHR0cENvbmZpZykge1xuICAgICAgICB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSA9IGh0dHBDb25maWc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzYXZlKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICBpZiAodGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZnJvbVNlcnZlcl0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucHV0XShwYXJhbXMsIGhlYWRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3Bvc3QnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbGVtRnVuY3Rpb24ob3BlcmF0aW9uLCB3aGF0LCBwYXJhbXMsIG9iaiwgaGVhZGVycykge1xuICAgICAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICB2YXIgcmVzUGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgICB2YXIgcm91dGUgPSB3aGF0IHx8IHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXTtcbiAgICAgICAgdmFyIGZldGNoVXJsID0gdXJsSGFuZGxlci5mZXRjaFVybCh0aGlzLCB3aGF0KTtcblxuICAgICAgICB2YXIgY2FsbE9iaiA9IG9iaiB8fCB0aGlzO1xuICAgICAgICAvLyBmYWxsYmFjayB0byBldGFnIG9uIHJlc3Rhbmd1bGFyIG9iamVjdCAoc2luY2UgZm9yIGN1c3RvbSBtZXRob2RzIHdlIHByb2JhYmx5IGRvbid0IGV4cGxpY2l0bHkgc3BlY2lmeSB0aGUgZXRhZyBmaWVsZClcbiAgICAgICAgdmFyIGV0YWcgPSBjYWxsT2JqW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5ldGFnXSB8fCAob3BlcmF0aW9uICE9PSAncG9zdCcgPyB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5ldGFnXSA6IG51bGwpO1xuXG4gICAgICAgIGlmIChpc09iamVjdChjYWxsT2JqKSAmJiBjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQoY2FsbE9iaikpIHtcbiAgICAgICAgICBjYWxsT2JqID0gc3RyaXBSZXN0YW5ndWxhcihjYWxsT2JqKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVxdWVzdCA9IGNvbmZpZy5mdWxsUmVxdWVzdEludGVyY2VwdG9yKGNhbGxPYmosIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLFxuICAgICAgICAgIGhlYWRlcnMgfHwge30sIHJlc1BhcmFtcyB8fCB7fSwgdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gfHwge30pO1xuXG4gICAgICAgIHZhciBmaWxsZWRPYmplY3QgPSB7fTtcbiAgICAgICAgZmlsbGVkT2JqZWN0ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkT2JqZWN0LCBmYWxzZSwgcm91dGUsIHNlcnZpY2UpO1xuXG4gICAgICAgIHZhciBva0NhbGxiYWNrID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHJlc0RhdGEgPSBnZXQocmVzcG9uc2UsICdib2R5Jyk7XG4gICAgICAgICAgdmFyIGZ1bGxQYXJhbXMgPSBnZXQocmVzcG9uc2UsICdjb25maWcucGFyYW1zJyk7XG5cbiAgICAgICAgICB2YXIgZWxlbSA9IHBhcnNlUmVzcG9uc2UocmVzRGF0YSwgb3BlcmF0aW9uLCByb3V0ZSwgZmV0Y2hVcmwsIHJlc3BvbnNlLCBzdWJqZWN0KTtcblxuICAgICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgICAgIGlmICh0cnVlID09PSBjb25maWcucGxhaW5CeURlZmF1bHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBlbGVtLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAncG9zdCcgJiYgIV9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgICBkYXRhID0gcmVzdGFuZ3VsYXJpemVFbGVtKFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgICAgICAgcm91dGUsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIGZ1bGxQYXJhbXNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIGRhdGEsIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhID0gcmVzdGFuZ3VsYXJpemVFbGVtKFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgICAgICAgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0sXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIGZ1bGxQYXJhbXNcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBkYXRhW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zaW5nbGVPbmVdID0gX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zaW5nbGVPbmVdO1xuICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgZGF0YSwgZmlsbGVkT2JqZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgdW5kZWZpbmVkLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDMwNCAmJiBjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBfX3RoaXMsIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVyeShjb25maWcuZXJyb3JJbnRlcmNlcHRvcnMsIGZ1bmN0aW9uIChjYjogYW55KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYihyZXNwb25zZSwgc3ViamVjdCwgb2tDYWxsYmFjaykgIT09IGZhbHNlO1xuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXJlZCBpZiBubyBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIE92ZXJyaWRpbmcgSFRUUCBNZXRob2RcbiAgICAgICAgdmFyIGNhbGxPcGVyYXRpb24gPSBvcGVyYXRpb247XG4gICAgICAgIHZhciBjYWxsSGVhZGVycyA9IGV4dGVuZCh7fSwgcmVxdWVzdC5oZWFkZXJzKTtcbiAgICAgICAgdmFyIGlzT3ZlcnJpZGVPcGVyYXRpb24gPSBjb25maWcuaXNPdmVycmlkZW5NZXRob2Qob3BlcmF0aW9uKTtcbiAgICAgICAgaWYgKGlzT3ZlcnJpZGVPcGVyYXRpb24pIHtcbiAgICAgICAgICBjYWxsT3BlcmF0aW9uID0gJ3Bvc3QnO1xuICAgICAgICAgIGNhbGxIZWFkZXJzID0gZXh0ZW5kKGNhbGxIZWFkZXJzLCB7J1gtSFRUUC1NZXRob2QtT3ZlcnJpZGUnOiBvcGVyYXRpb24gPT09ICdyZW1vdmUnID8gJ0RFTEVURScgOiBvcGVyYXRpb24udG9VcHBlckNhc2UoKX0pO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5qc29ucCAmJiBjYWxsT3BlcmF0aW9uID09PSAnZ2V0Jykge1xuICAgICAgICAgIGNhbGxPcGVyYXRpb24gPSAnanNvbnAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5pc1NhZmUob3BlcmF0aW9uKSkge1xuICAgICAgICAgIGlmIChpc092ZXJyaWRlT3BlcmF0aW9uKSB7XG4gICAgICAgICAgICB1cmxIYW5kbGVyLnJlc291cmNlKHRoaXMsICRodHRwLCByZXF1ZXN0Lmh0dHBDb25maWcsIGNhbGxIZWFkZXJzLCByZXF1ZXN0LnBhcmFtcyxcbiAgICAgICAgICAgICAgd2hhdCwgZXRhZywgY2FsbE9wZXJhdGlvbilbY2FsbE9wZXJhdGlvbl0oe30pLnN1YnNjcmliZShva0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCBjYWxsSGVhZGVycywgcmVxdWVzdC5wYXJhbXMsXG4gICAgICAgICAgICAgIHdoYXQsIGV0YWcsIGNhbGxPcGVyYXRpb24pW2NhbGxPcGVyYXRpb25dKCkuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmxIYW5kbGVyLnJlc291cmNlKHRoaXMsICRodHRwLCByZXF1ZXN0Lmh0dHBDb25maWcsIGNhbGxIZWFkZXJzLCByZXF1ZXN0LnBhcmFtcyxcbiAgICAgICAgICAgIHdoYXQsIGV0YWcsIGNhbGxPcGVyYXRpb24pW2NhbGxPcGVyYXRpb25dKHJlcXVlc3QuZWxlbWVudCkuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplUmVzcG9uc2Uoc3ViamVjdCwgZmFsc2UsIGZpbGxlZE9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdnZXQnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGVsZXRlRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3JlbW92ZScsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwdXRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncHV0JywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBvc3RGdW5jdGlvbih3aGF0LCBlbGVtLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncG9zdCcsIHdoYXQsIHBhcmFtcywgZWxlbSwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhlYWRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgnaGVhZCcsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0cmFjZUZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCd0cmFjZScsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvcHRpb25zRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ29wdGlvbnMnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcGF0Y2hGdW5jdGlvbihlbGVtLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncGF0Y2gnLCB1bmRlZmluZWQsIHBhcmFtcywgZWxlbSwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGN1c3RvbUZ1bmN0aW9uKG9wZXJhdGlvbiwgcGF0aCwgcGFyYW1zLCBoZWFkZXJzLCBlbGVtKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykob3BlcmF0aW9uLCBwYXRoLCBwYXJhbXMsIGVsZW0sIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRSZXN0YW5ndWxhck1ldGhvZEZ1bmN0aW9uKG5hbWUsIG9wZXJhdGlvbiwgcGF0aCwgZGVmYXVsdFBhcmFtcywgZGVmYXVsdEhlYWRlcnMsIGRlZmF1bHRFbGVtKSB7XG4gICAgICAgIHZhciBiaW5kZWRGdW5jdGlvbjtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ2dldExpc3QnKSB7XG4gICAgICAgICAgYmluZGVkRnVuY3Rpb24gPSBiaW5kKGZldGNoRnVuY3Rpb24sIHRoaXMsIHBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJpbmRlZEZ1bmN0aW9uID0gYmluZChjdXN0b21GdW5jdGlvbiwgdGhpcywgb3BlcmF0aW9uLCBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjcmVhdGVkRnVuY3Rpb24gPSBmdW5jdGlvbiAocGFyYW1zLCBoZWFkZXJzLCBlbGVtKSB7XG4gICAgICAgICAgdmFyIGNhbGxQYXJhbXMgPSBkZWZhdWx0cyh7XG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBlbGVtXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgcGFyYW1zOiBkZWZhdWx0UGFyYW1zLFxuICAgICAgICAgICAgaGVhZGVyczogZGVmYXVsdEhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBkZWZhdWx0RWxlbVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBiaW5kZWRGdW5jdGlvbihjYWxsUGFyYW1zLnBhcmFtcywgY2FsbFBhcmFtcy5oZWFkZXJzLCBjYWxsUGFyYW1zLmVsZW0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gY3JlYXRlZEZ1bmN0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jdGlvbiAoZWxlbSwgcGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlZEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycywgZWxlbSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3aXRoQ29uZmlndXJhdGlvbkZ1bmN0aW9uKGNvbmZpZ3VyZXIpIHtcbiAgICAgICAgdmFyIG5ld0NvbmZpZyA9IGNsb25lKG9taXQoY29uZmlnLCAnY29uZmlndXJhdGlvbicpKTtcbiAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyKG5ld0NvbmZpZywgbmV3Q29uZmlnKTtcbiAgICAgICAgY29uZmlndXJlcihuZXdDb25maWcpO1xuICAgICAgICByZXR1cm4gY3JlYXRlU2VydmljZUZvckNvbmZpZ3VyYXRpb24obmV3Q29uZmlnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdG9TZXJ2aWNlKHJvdXRlLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIGtub3duQ29sbGVjdGlvbk1ldGhvZHMgPSB2YWx1ZXMoY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzKTtcbiAgICAgICAgdmFyIHNlcnY6IGFueSA9IHt9O1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IChwYXJlbnQgfHwgc2VydmljZSkuYWxsKHJvdXRlKTtcbiAgICAgICAgc2Vydi5vbmUgPSBiaW5kKG9uZSwgKHBhcmVudCB8fCBzZXJ2aWNlKSwgcGFyZW50LCByb3V0ZSk7XG4gICAgICAgIHNlcnYuYWxsID0gYmluZChjb2xsZWN0aW9uLmFsbCwgY29sbGVjdGlvbik7XG4gICAgICAgIHNlcnYucG9zdCA9IGJpbmQoY29sbGVjdGlvbi5wb3N0LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgc2Vydi5nZXRMaXN0ID0gYmluZChjb2xsZWN0aW9uLmdldExpc3QsIGNvbGxlY3Rpb24pO1xuICAgICAgICBzZXJ2LndpdGhIdHRwQ29uZmlnID0gYmluZChjb2xsZWN0aW9uLndpdGhIdHRwQ29uZmlnLCBjb2xsZWN0aW9uKTtcbiAgICAgICAgc2Vydi5nZXQgPSBiaW5kKGNvbGxlY3Rpb24uZ2V0LCBjb2xsZWN0aW9uKTtcblxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICBpZiAoY29sbGVjdGlvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBpc0Z1bmN0aW9uKGNvbGxlY3Rpb25bcHJvcF0pICYmICFpbmNsdWRlcyhrbm93bkNvbGxlY3Rpb25NZXRob2RzLCBwcm9wKSkge1xuICAgICAgICAgICAgc2Vydltwcm9wXSA9IGJpbmQoY29sbGVjdGlvbltwcm9wXSwgY29sbGVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlcnY7XG4gICAgICB9XG5cbiAgICAgIFJlc3Rhbmd1bGFyQ29uZmlndXJlcihzZXJ2aWNlLCBjb25maWcpO1xuXG4gICAgICBzZXJ2aWNlLmNvcHkgPSBiaW5kKGNvcHlSZXN0YW5ndWxhcml6ZWRFbGVtZW50LCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS5zZXJ2aWNlID0gYmluZCh0b1NlcnZpY2UsIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLndpdGhDb25maWcgPSBiaW5kKHdpdGhDb25maWd1cmF0aW9uRnVuY3Rpb24sIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLm9uZSA9IGJpbmQob25lLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5hbGwgPSBiaW5kKGFsbCwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2Uuc2V2ZXJhbCA9IGJpbmQoc2V2ZXJhbCwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2Uub25lVXJsID0gYmluZChvbmVVcmwsIHNlcnZpY2UsIG51bGwpO1xuXG4gICAgICBzZXJ2aWNlLmFsbFVybCA9IGJpbmQoYWxsVXJsLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5zdHJpcFJlc3Rhbmd1bGFyID0gYmluZChzdHJpcFJlc3Rhbmd1bGFyLCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS5yZXN0YW5ndWxhcml6ZUVsZW1lbnQgPSBiaW5kKHJlc3Rhbmd1bGFyaXplRWxlbSwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2UucmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uID0gYmluZChyZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb25BbmRFbGVtZW50cywgc2VydmljZSk7XG5cbiAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihnbG9iYWxDb25maWd1cmF0aW9uKTtcbiAgfTtcblxufVxuIiwiLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nIG5vLXVudXNlZC12YXJpYWJsZSAqL1xuaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7UkVTVEFOR1VMQVIsIFJlc3Rhbmd1bGFyRmFjdG9yeX0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXIuY29uZmlnJztcbmltcG9ydCB7UmVzdGFuZ3VsYXJ9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyJztcbmltcG9ydCB7UmVzdGFuZ3VsYXJIdHRwfSBmcm9tICcuL25neC1yZXN0YW5ndWxhci1odHRwJztcblxuZXhwb3J0IGNvbnN0IENPTkZJR19PQkogPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignY29uZmlnT2JqJyk7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbUmVzdGFuZ3VsYXJIdHRwLCBSZXN0YW5ndWxhcl1cbn0pXG5leHBvcnQgY2xhc3MgUmVzdGFuZ3VsYXJNb2R1bGUge1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUmVzdGFuZ3VsYXJNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdSZXN0YW5ndWxhck1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzE/LCBjb25maWcyPyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUmVzdGFuZ3VsYXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IENPTkZJR19PQkosIHVzZVZhbHVlOiBbY29uZmlnMSxjb25maWcyXX0sXG4gICAgICAgIHtwcm92aWRlOiBSRVNUQU5HVUxBUiwgdXNlRmFjdG9yeTogUmVzdGFuZ3VsYXJGYWN0b3J5LCBkZXBzOiBbQ09ORklHX09CSl19LFxuICAgICAgXVxuICAgIH1cbiAgfVxuXG59XG4iXSwibmFtZXMi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