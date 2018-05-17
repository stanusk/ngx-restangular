/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { includes, isUndefined, isNull, isArray, isObject, isBoolean, defaults, each, extend, find, has, initial, last, clone, reduce, keys, isEmpty, forEach, } from 'lodash';
/**
 * @param {?} object
 * @param {?} config
 * @return {?}
 */
export function RestangularConfigurer(object, config) {
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
    object.setDefaultHttpFields = function (values) {
        config.defaultHttpFields = values;
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
    object.setMethodOverriders = function (values) {
        var /** @type {?} */ overriders = extend([], values);
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
    config.isOverridenMethod = function (method, values) {
        var /** @type {?} */ search = values || config.methodOverriders;
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
    config.responseInterceptors = config.responseInterceptors ? tslib_1.__spread(config.responseInterceptors) : [];
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
    config.errorInterceptors = config.errorInterceptors ? tslib_1.__spread(config.errorInterceptors) : [];
    object.addErrorInterceptor = function (interceptor) {
        config.errorInterceptors = tslib_1.__spread([interceptor], config.errorInterceptors);
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
    object.setParentless = function (values) {
        if (isArray(values)) {
            config.shouldSaveParent = function (route) {
                return !includes(values, route);
            };
        }
        else if (isBoolean(values)) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWNvbmZpZy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJlc3Rhbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL25neC1yZXN0YW5ndWxhci1jb25maWcuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxRQUFRLEVBQ1IsV0FBVyxFQUNYLE1BQU0sRUFDTixPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsSUFBSSxFQUNKLE1BQU0sRUFDTixJQUFJLEVBQ0osR0FBRyxFQUNILE9BQU8sRUFDUCxJQUFJLEVBQ0osS0FBSyxFQUNMLE1BQU0sRUFDTixJQUFJLEVBQ0osT0FBTyxFQUNQLE9BQU8sR0FDUixNQUFNLFFBQVEsQ0FBQzs7Ozs7O0FBRWhCLE1BQU0sZ0NBQWdDLE1BQU0sRUFBRSxNQUFNO0lBQ2xELE1BQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOzs7O0lBSzlCLHFCQUFJLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRSxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsU0FBUztRQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztLQUN2RCxDQUFDO0lBRUYscUJBQUksZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUN0QyxNQUFNLENBQUMsYUFBYSxHQUFHLFVBQVUsTUFBTTtRQUNyQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEUsTUFBTSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQ3RC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QUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQjtZQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkI7Z0JBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNELENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckcsQ0FBQztJQUVGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaW5jbHVkZXMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc051bGwsXG4gIGlzQXJyYXksXG4gIGlzT2JqZWN0LFxuICBpc0Jvb2xlYW4sXG4gIGRlZmF1bHRzLFxuICBlYWNoLFxuICBleHRlbmQsXG4gIGZpbmQsXG4gIGhhcyxcbiAgaW5pdGlhbCxcbiAgbGFzdCxcbiAgY2xvbmUsXG4gIHJlZHVjZSxcbiAga2V5cyxcbiAgaXNFbXB0eSxcbiAgZm9yRWFjaCxcbn0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGZ1bmN0aW9uIFJlc3Rhbmd1bGFyQ29uZmlndXJlcihvYmplY3QsIGNvbmZpZyl7XG4gIG9iamVjdC5jb25maWd1cmF0aW9uID0gY29uZmlnO1xuXG4gIC8qKlxuICAgKiBUaG9zZSBhcmUgSFRUUCBzYWZlIG1ldGhvZHMgZm9yIHdoaWNoIHRoZXJlIGlzIG5vIG5lZWQgdG8gcGFzcyBhbnkgZGF0YSB3aXRoIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgdmFyIHNhZmVNZXRob2RzID0gWydnZXQnLCAnaGVhZCcsICdvcHRpb25zJywgJ3RyYWNlJywgJ2dldGxpc3QnXTtcbiAgY29uZmlnLmlzU2FmZSA9IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcbiAgICByZXR1cm4gaW5jbHVkZXMoc2FmZU1ldGhvZHMsIG9wZXJhdGlvbi50b0xvd2VyQ2FzZSgpKTtcbiAgfTtcblxuICB2YXIgYWJzb2x1dGVQYXR0ZXJuID0gL15odHRwcz86XFwvXFwvL2k7XG4gIGNvbmZpZy5pc0Fic29sdXRlVXJsID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHJldHVybiBpc1VuZGVmaW5lZChjb25maWcuYWJzb2x1dGVVcmwpIHx8IGlzTnVsbChjb25maWcuYWJzb2x1dGVVcmwpID9cbiAgICBzdHJpbmcgJiYgYWJzb2x1dGVQYXR0ZXJuLnRlc3Qoc3RyaW5nKSA6XG4gICAgICBjb25maWcuYWJzb2x1dGVVcmw7XG4gIH07XG5cbiAgY29uZmlnLmFic29sdXRlVXJsID0gaXNVbmRlZmluZWQoY29uZmlnLmFic29sdXRlVXJsKSA/IHRydWUgOiBjb25maWcuYWJzb2x1dGVVcmw7XG4gIG9iamVjdC5zZXRTZWxmTGlua0Fic29sdXRlVXJsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgY29uZmlnLmFic29sdXRlVXJsID0gdmFsdWU7XG4gIH07XG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBCYXNlVVJMIHRvIGJlIHVzZWQgd2l0aCBSZXN0YW5ndWxhclxuICAgKi9cbiAgY29uZmlnLmJhc2VVcmwgPSBpc1VuZGVmaW5lZChjb25maWcuYmFzZVVybCkgPyAnJyA6IGNvbmZpZy5iYXNlVXJsO1xuICBvYmplY3Quc2V0QmFzZVVybCA9IGZ1bmN0aW9uIChuZXdCYXNlVXJsKSB7XG4gICAgY29uZmlnLmJhc2VVcmwgPSAvXFwvJC8udGVzdChuZXdCYXNlVXJsKSA/XG4gICAgICBuZXdCYXNlVXJsLnN1YnN0cmluZygwLCBuZXdCYXNlVXJsLmxlbmd0aCAtIDEpIDpcbiAgICAgIG5ld0Jhc2VVcmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4dHJhIGZpZWxkcyB0byBrZWVwIGZyb20gdGhlIHBhcmVudHNcbiAgICovXG4gIGNvbmZpZy5leHRyYUZpZWxkcyA9IGNvbmZpZy5leHRyYUZpZWxkcyB8fCBbXTtcbiAgb2JqZWN0LnNldEV4dHJhRmllbGRzID0gZnVuY3Rpb24gKG5ld0V4dHJhRmllbGRzKSB7XG4gICAgY29uZmlnLmV4dHJhRmllbGRzID0gbmV3RXh0cmFGaWVsZHM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNvbWUgZGVmYXVsdCAkaHR0cCBwYXJhbWV0ZXIgdG8gYmUgdXNlZCBpbiBFVkVSWSBjYWxsXG4gICAqKi9cbiAgY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzID0gY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzIHx8IHt9O1xuICBvYmplY3Quc2V0RGVmYXVsdEh0dHBGaWVsZHMgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzID0gdmFsdWVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBbHdheXMgcmV0dXJuIHBsYWluIGRhdGEsIG5vIHJlc3Rhbmd1bGFyaXplZCBvYmplY3RcbiAgICoqL1xuICBjb25maWcucGxhaW5CeURlZmF1bHQgPSBjb25maWcucGxhaW5CeURlZmF1bHQgfHwgZmFsc2U7XG4gIG9iamVjdC5zZXRQbGFpbkJ5RGVmYXVsdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCA9IHZhbHVlID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uZmlnLndpdGhIdHRwVmFsdWVzID0gZnVuY3Rpb24gKGh0dHBMb2NhbENvbmZpZywgb2JqKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRzKG9iaiwgaHR0cExvY2FsQ29uZmlnLCBjb25maWcuZGVmYXVsdEh0dHBGaWVsZHMpO1xuICB9O1xuXG4gIGNvbmZpZy5lbmNvZGVJZHMgPSBpc1VuZGVmaW5lZChjb25maWcuZW5jb2RlSWRzKSA/IHRydWUgOiBjb25maWcuZW5jb2RlSWRzO1xuICBvYmplY3Quc2V0RW5jb2RlSWRzID0gZnVuY3Rpb24gKGVuY29kZSkge1xuICAgIGNvbmZpZy5lbmNvZGVJZHMgPSBlbmNvZGU7XG4gIH07XG5cbiAgY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zID0gY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zIHx8IHtcbiAgICAgIGdldDoge30sXG4gICAgICBwb3N0OiB7fSxcbiAgICAgIHB1dDoge30sXG4gICAgICByZW1vdmU6IHt9LFxuICAgICAgY29tbW9uOiB7fVxuICAgIH07XG5cbiAgb2JqZWN0LnNldERlZmF1bHRSZXF1ZXN0UGFyYW1zID0gZnVuY3Rpb24gKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgdmFyIG1ldGhvZHMgPSBbXSxcbiAgICAgIHBhcmFtcyA9IHBhcmFtMiB8fCBwYXJhbTE7XG4gICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbTIpKSB7XG4gICAgICBpZiAoaXNBcnJheShwYXJhbTEpKSB7XG4gICAgICAgIG1ldGhvZHMgPSBwYXJhbTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXRob2RzLnB1c2gocGFyYW0xKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWV0aG9kcy5wdXNoKCdjb21tb24nKTtcbiAgICB9XG5cbiAgICBlYWNoKG1ldGhvZHMsIGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtc1ttZXRob2RdID0gcGFyYW1zO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5yZXF1ZXN0UGFyYW1zID0gY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zO1xuXG4gIGNvbmZpZy5kZWZhdWx0SGVhZGVycyA9IGNvbmZpZy5kZWZhdWx0SGVhZGVycyB8fCB7fTtcbiAgb2JqZWN0LnNldERlZmF1bHRIZWFkZXJzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgICBjb25maWcuZGVmYXVsdEhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIG9iamVjdC5kZWZhdWx0SGVhZGVycyA9IGNvbmZpZy5kZWZhdWx0SGVhZGVycztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3QuZGVmYXVsdEhlYWRlcnMgPSBjb25maWcuZGVmYXVsdEhlYWRlcnM7XG5cblxuICAvKipcbiAgICogTWV0aG9kIG92ZXJyaWRlcnMgcmVzcG9uc2UgTWV0aG9kXG4gICAqKi9cbiAgY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VNZXRob2QgfHwgJ3Byb21pc2UnO1xuICBvYmplY3Quc2V0RGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgIGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VNZXRob2QgPSBtZXRob2Q7XG4gICAgb2JqZWN0LmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VNZXRob2Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIG9iamVjdC5kZWZhdWx0UmVzcG9uc2VNZXRob2QgPSBjb25maWcuZGVmYXVsdFJlc3BvbnNlTWV0aG9kO1xuXG4gIC8qKlxuICAgKiBNZXRob2Qgb3ZlcnJpZGVycyB3aWxsIHNldCB3aGljaCBtZXRob2RzIGFyZSBzZW50IHZpYSBQT1NUIHdpdGggYW4gWC1IVFRQLU1ldGhvZC1PdmVycmlkZVxuICAgKiovXG4gIGNvbmZpZy5tZXRob2RPdmVycmlkZXJzID0gY29uZmlnLm1ldGhvZE92ZXJyaWRlcnMgfHwgW107XG4gIG9iamVjdC5zZXRNZXRob2RPdmVycmlkZXJzID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIHZhciBvdmVycmlkZXJzID0gZXh0ZW5kKFtdLCB2YWx1ZXMpO1xuICAgIGlmIChjb25maWcuaXNPdmVycmlkZW5NZXRob2QoJ2RlbGV0ZScsIG92ZXJyaWRlcnMpKSB7XG4gICAgICBvdmVycmlkZXJzLnB1c2goJ3JlbW92ZScpO1xuICAgIH1cbiAgICBjb25maWcubWV0aG9kT3ZlcnJpZGVycyA9IG92ZXJyaWRlcnM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmpzb25wID0gaXNVbmRlZmluZWQoY29uZmlnLmpzb25wKSA/IGZhbHNlIDogY29uZmlnLmpzb25wO1xuICBvYmplY3Quc2V0SnNvbnAgPSBmdW5jdGlvbiAoYWN0aXZlKSB7XG4gICAgY29uZmlnLmpzb25wID0gYWN0aXZlO1xuICB9O1xuXG4gIGNvbmZpZy5pc092ZXJyaWRlbk1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2QsIHZhbHVlcykge1xuICAgIHZhciBzZWFyY2ggPSB2YWx1ZXMgfHwgY29uZmlnLm1ldGhvZE92ZXJyaWRlcnM7XG4gICAgcmV0dXJuICFpc1VuZGVmaW5lZChmaW5kKHNlYXJjaCwgZnVuY3Rpb24gKG9uZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gb25lLnRvTG93ZXJDYXNlKCkgPT09IG1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICAgIH0pKTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgVVJMIGNyZWF0b3IgdHlwZS4gRm9yIG5vdywgb25seSBQYXRoIGlzIGNyZWF0ZWQuIEluIHRoZSBmdXR1cmUgd2UnbGwgaGF2ZSBxdWVyeVBhcmFtc1xuICAgKiovXG4gIGNvbmZpZy51cmxDcmVhdG9yID0gY29uZmlnLnVybENyZWF0b3IgfHwgJ3BhdGgnO1xuICBvYmplY3Quc2V0VXJsQ3JlYXRvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCFoYXMoY29uZmlnLnVybENyZWF0b3JGYWN0b3J5LCBuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVUkwgUGF0aCBzZWxlY3RlZCBpc25cXCd0IHZhbGlkJyk7XG4gICAgfVxuXG4gICAgY29uZmlnLnVybENyZWF0b3IgPSBuYW1lO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBZb3UgY2FuIHNldCB0aGUgcmVzdGFuZ3VsYXIgZmllbGRzIGhlcmUuIFRoZSAzIHJlcXVpcmVkIGZpZWxkcyBmb3IgUmVzdGFuZ3VsYXIgYXJlOlxuICAgKlxuICAgKiBpZDogSWQgb2YgdGhlIGVsZW1lbnRcbiAgICogcm91dGU6IG5hbWUgb2YgdGhlIHJvdXRlIG9mIHRoaXMgZWxlbWVudFxuICAgKiBwYXJlbnRSZXNvdXJjZTogdGhlIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJlc291cmNlXG4gICAqXG4gICAqICBBbGwgb2YgdGhpcyBmaWVsZHMgZXhjZXB0IGZvciBpZCwgYXJlIGhhbmRsZWQgKGFuZCBjcmVhdGVkKSBieSBSZXN0YW5ndWxhci4gQnkgZGVmYXVsdCxcbiAgICogIHRoZSBmaWVsZCB2YWx1ZXMgd2lsbCBiZSBpZCwgcm91dGUgYW5kIHBhcmVudFJlc291cmNlIHJlc3BlY3RpdmVseVxuICAgKi9cbiAgY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzID0gY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzIHx8IHtcbiAgICAgIGlkOiAnaWQnLFxuICAgICAgcm91dGU6ICdyb3V0ZScsXG4gICAgICBwYXJlbnRSZXNvdXJjZTogJ3BhcmVudFJlc291cmNlJyxcbiAgICAgIHJlc3Rhbmd1bGFyQ29sbGVjdGlvbjogJ3Jlc3Rhbmd1bGFyQ29sbGVjdGlvbicsXG4gICAgICBjYW5ub25pY2FsSWQ6ICdfX2Nhbm5vbmljYWxJZCcsXG4gICAgICBldGFnOiAncmVzdGFuZ3VsYXJFdGFnJyxcbiAgICAgIHNlbGZMaW5rOiAnaHJlZicsXG4gICAgICBnZXQ6ICdnZXQnLFxuICAgICAgZ2V0TGlzdDogJ2dldExpc3QnLFxuICAgICAgcHV0OiAncHV0JyxcbiAgICAgIHBvc3Q6ICdwb3N0JyxcbiAgICAgIHJlbW92ZTogJ3JlbW92ZScsXG4gICAgICBoZWFkOiAnaGVhZCcsXG4gICAgICB0cmFjZTogJ3RyYWNlJyxcbiAgICAgIG9wdGlvbnM6ICdvcHRpb25zJyxcbiAgICAgIHBhdGNoOiAncGF0Y2gnLFxuICAgICAgZ2V0UmVzdGFuZ3VsYXJVcmw6ICdnZXRSZXN0YW5ndWxhclVybCcsXG4gICAgICBnZXRSZXF1ZXN0ZWRVcmw6ICdnZXRSZXF1ZXN0ZWRVcmwnLFxuICAgICAgcHV0RWxlbWVudDogJ3B1dEVsZW1lbnQnLFxuICAgICAgYWRkUmVzdGFuZ3VsYXJNZXRob2Q6ICdhZGRSZXN0YW5ndWxhck1ldGhvZCcsXG4gICAgICBnZXRQYXJlbnRMaXN0OiAnZ2V0UGFyZW50TGlzdCcsXG4gICAgICBjbG9uZTogJ2Nsb25lJyxcbiAgICAgIGlkczogJ2lkcycsXG4gICAgICBodHRwQ29uZmlnOiAnXyRodHRwQ29uZmlnJyxcbiAgICAgIHJlcVBhcmFtczogJ3JlcVBhcmFtcycsXG4gICAgICBvbmU6ICdvbmUnLFxuICAgICAgYWxsOiAnYWxsJyxcbiAgICAgIHNldmVyYWw6ICdzZXZlcmFsJyxcbiAgICAgIG9uZVVybDogJ29uZVVybCcsXG4gICAgICBhbGxVcmw6ICdhbGxVcmwnLFxuICAgICAgY3VzdG9tUFVUOiAnY3VzdG9tUFVUJyxcbiAgICAgIGN1c3RvbVBBVENIOiAnY3VzdG9tUEFUQ0gnLFxuICAgICAgY3VzdG9tUE9TVDogJ2N1c3RvbVBPU1QnLFxuICAgICAgY3VzdG9tREVMRVRFOiAnY3VzdG9tREVMRVRFJyxcbiAgICAgIGN1c3RvbUdFVDogJ2N1c3RvbUdFVCcsXG4gICAgICBjdXN0b21HRVRMSVNUOiAnY3VzdG9tR0VUTElTVCcsXG4gICAgICBjdXN0b21PcGVyYXRpb246ICdjdXN0b21PcGVyYXRpb24nLFxuICAgICAgZG9QVVQ6ICdkb1BVVCcsXG4gICAgICBkb1BBVENIOiAnZG9QQVRDSCcsXG4gICAgICBkb1BPU1Q6ICdkb1BPU1QnLFxuICAgICAgZG9ERUxFVEU6ICdkb0RFTEVURScsXG4gICAgICBkb0dFVDogJ2RvR0VUJyxcbiAgICAgIGRvR0VUTElTVDogJ2RvR0VUTElTVCcsXG4gICAgICBmcm9tU2VydmVyOiAnZnJvbVNlcnZlcicsXG4gICAgICB3aXRoQ29uZmlnOiAnd2l0aENvbmZpZycsXG4gICAgICB3aXRoSHR0cENvbmZpZzogJ3dpdGhIdHRwQ29uZmlnJyxcbiAgICAgIHNpbmdsZU9uZTogJ3NpbmdsZU9uZScsXG4gICAgICBwbGFpbjogJ3BsYWluJyxcbiAgICAgIHNhdmU6ICdzYXZlJyxcbiAgICAgIHJlc3Rhbmd1bGFyaXplZDogJ3Jlc3Rhbmd1bGFyaXplZCdcbiAgICB9O1xuICBvYmplY3Quc2V0UmVzdGFuZ3VsYXJGaWVsZHMgPSBmdW5jdGlvbiAocmVzRmllbGRzKSB7XG4gICAgY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzID1cbiAgICAgIGV4dGVuZCh7fSwgY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLCByZXNGaWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5pc1Jlc3Rhbmd1bGFyaXplZCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gISFvYmpbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyaXplZF07XG4gIH07XG5cbiAgY29uZmlnLnNldEZpZWxkVG9FbGVtID0gZnVuY3Rpb24gKGZpZWxkLCBlbGVtLCB2YWx1ZSkge1xuICAgIHZhciBwcm9wZXJ0aWVzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICB2YXIgaWRWYWx1ZSA9IGVsZW07XG4gICAgZWFjaChpbml0aWFsKHByb3BlcnRpZXMpLCBmdW5jdGlvbiAocHJvcDogYW55KSB7XG4gICAgICBpZFZhbHVlW3Byb3BdID0ge307XG4gICAgICBpZFZhbHVlID0gaWRWYWx1ZVtwcm9wXTtcbiAgICB9KTtcbiAgICB2YXIgaW5kZXg6IGFueSA9IGxhc3QocHJvcGVydGllcyk7XG4gICAgaWRWYWx1ZVtpbmRleF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuZ2V0RmllbGRGcm9tRWxlbSA9IGZ1bmN0aW9uIChmaWVsZCwgZWxlbSkge1xuICAgIHZhciBwcm9wZXJ0aWVzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICB2YXIgaWRWYWx1ZTogYW55ID0gZWxlbTtcbiAgICBlYWNoKHByb3BlcnRpZXMsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBpZiAoaWRWYWx1ZSkge1xuICAgICAgICBpZFZhbHVlID0gaWRWYWx1ZVtwcm9wXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2xvbmUoaWRWYWx1ZSk7XG4gIH07XG5cbiAgY29uZmlnLnNldElkVG9FbGVtID0gZnVuY3Rpb24gKGVsZW0sIGlkIC8qLCByb3V0ZSAqLykge1xuICAgIGNvbmZpZy5zZXRGaWVsZFRvRWxlbShjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaWQsIGVsZW0sIGlkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuZ2V0SWRGcm9tRWxlbSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgcmV0dXJuIGNvbmZpZy5nZXRGaWVsZEZyb21FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZCwgZWxlbSk7XG4gIH07XG5cbiAgY29uZmlnLmlzVmFsaWRJZCA9IGZ1bmN0aW9uIChlbGVtSWQpIHtcbiAgICByZXR1cm4gJycgIT09IGVsZW1JZCAmJiAhaXNVbmRlZmluZWQoZWxlbUlkKSAmJiAhaXNOdWxsKGVsZW1JZCk7XG4gIH07XG5cbiAgY29uZmlnLnNldFVybFRvRWxlbSA9IGZ1bmN0aW9uIChlbGVtLCB1cmwgLyosIHJvdXRlICovKSB7XG4gICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zZWxmTGluaywgZWxlbSwgdXJsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuZ2V0VXJsRnJvbUVsZW0gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgIHJldHVybiBjb25maWcuZ2V0RmllbGRGcm9tRWxlbShjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2VsZkxpbmssIGVsZW0pO1xuICB9O1xuXG4gIGNvbmZpZy51c2VDYW5ub25pY2FsSWQgPSBpc1VuZGVmaW5lZChjb25maWcudXNlQ2Fubm9uaWNhbElkKSA/IGZhbHNlIDogY29uZmlnLnVzZUNhbm5vbmljYWxJZDtcbiAgb2JqZWN0LnNldFVzZUNhbm5vbmljYWxJZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGNvbmZpZy51c2VDYW5ub25pY2FsSWQgPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuZ2V0Q2Fubm9uaWNhbElkRnJvbUVsZW0gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgIHZhciBjYW5ub25pY2FsSWQgPSBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jYW5ub25pY2FsSWRdO1xuICAgIHZhciBhY3R1YWxJZCA9IGNvbmZpZy5pc1ZhbGlkSWQoY2Fubm9uaWNhbElkKSA/IGNhbm5vbmljYWxJZCA6IGNvbmZpZy5nZXRJZEZyb21FbGVtKGVsZW0pO1xuICAgIHJldHVybiBhY3R1YWxJZDtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgUmVzcG9uc2UgcGFyc2VyLiBUaGlzIGlzIHVzZWQgaW4gY2FzZSB5b3VyIHJlc3BvbnNlIGlzbid0IGRpcmVjdGx5IHRoZSBkYXRhLlxuICAgKiBGb3IgZXhhbXBsZSBpZiB5b3UgaGF2ZSBhIHJlc3BvbnNlIGxpa2Uge21ldGE6IHsnbWV0YSd9LCBkYXRhOiB7bmFtZTogJ0dvbnRvJ319XG4gICAqIHlvdSBjYW4gZXh0cmFjdCB0aGlzIGRhdGEgd2hpY2ggaXMgdGhlIG9uZSB0aGF0IG5lZWRzIHdyYXBwaW5nXG4gICAqXG4gICAqIFRoZSBSZXNwb25zZUV4dHJhY3RvciBpcyBhIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHJlc3BvbnNlIGFuZCB0aGUgbWV0aG9kIGV4ZWN1dGVkLlxuICAgKi9cblxuICBjb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnMgPSBjb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnMgPyBbLi4uY29uZmlnLnJlc3BvbnNlSW50ZXJjZXB0b3JzXSA6IFtdO1xuXG4gIGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChkYXRhIC8qLCBvcGVyYXRpb24sIHdoYXQsIHVybCwgcmVzcG9uc2UsIHN1YmplY3QgKi8pIHtcbiAgICByZXR1cm4gZGF0YSB8fCB7fTtcbiAgfTtcblxuICBjb25maWcucmVzcG9uc2VFeHRyYWN0b3IgPSBmdW5jdGlvbiAoZGF0YSwgb3BlcmF0aW9uLCB3aGF0LCB1cmwsIHJlc3BvbnNlLCBzdWJqZWN0KSB7XG4gICAgdmFyIGludGVyY2VwdG9ycyA9IGNsb25lKGNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9ycyk7XG4gICAgaW50ZXJjZXB0b3JzLnB1c2goY29uZmlnLmRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yKTtcbiAgICB2YXIgdGhlRGF0YSA9IGRhdGE7XG4gICAgZWFjaChpbnRlcmNlcHRvcnMsIGZ1bmN0aW9uIChpbnRlcmNlcHRvcjogYW55KSB7XG4gICAgICB0aGVEYXRhID0gaW50ZXJjZXB0b3IodGhlRGF0YSwgb3BlcmF0aW9uLFxuICAgICAgICB3aGF0LCB1cmwsIHJlc3BvbnNlLCBzdWJqZWN0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhlRGF0YTtcbiAgfTtcblxuICBvYmplY3QuYWRkUmVzcG9uc2VJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChleHRyYWN0b3IpIHtcbiAgICBjb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnMucHVzaChleHRyYWN0b3IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5lcnJvckludGVyY2VwdG9ycyA9IGNvbmZpZy5lcnJvckludGVyY2VwdG9ycyA/IFsuLi5jb25maWcuZXJyb3JJbnRlcmNlcHRvcnNdIDogW107XG4gIG9iamVjdC5hZGRFcnJvckludGVyY2VwdG9yID0gZnVuY3Rpb24gKGludGVyY2VwdG9yKSB7XG4gICAgY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzID0gW2ludGVyY2VwdG9yLCAuLi5jb25maWcuZXJyb3JJbnRlcmNlcHRvcnNdO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5zZXRSZXNwb25zZUludGVyY2VwdG9yID0gb2JqZWN0LmFkZFJlc3BvbnNlSW50ZXJjZXB0b3I7XG4gIG9iamVjdC5zZXRSZXNwb25zZUV4dHJhY3RvciA9IG9iamVjdC5hZGRSZXNwb25zZUludGVyY2VwdG9yO1xuICBvYmplY3Quc2V0RXJyb3JJbnRlcmNlcHRvciA9IG9iamVjdC5hZGRFcnJvckludGVyY2VwdG9yO1xuXG4gIC8qKlxuICAgKiBSZXNwb25zZSBpbnRlcmNlcHRvciBpcyBjYWxsZWQganVzdCBiZWZvcmUgcmVzb2x2aW5nIHByb21pc2VzLlxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBSZXF1ZXN0IGludGVyY2VwdG9yIGlzIGNhbGxlZCBiZWZvcmUgc2VuZGluZyBhbiBvYmplY3QgdG8gdGhlIHNlcnZlci5cbiAgICovXG4gIGNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzID0gY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMgPyBbLi4uY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnNdIDogW107XG5cbiAgY29uZmlnLmRlZmF1bHRJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICBodHRwQ29uZmlnOiBodHRwQ29uZmlnXG4gICAgfTtcbiAgfTtcblxuICBjb25maWcuZnVsbFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKSB7XG4gICAgdmFyIGludGVyY2VwdG9ycyA9IGNsb25lKGNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzKTtcbiAgICB2YXIgZGVmYXVsdFJlcXVlc3QgPSBjb25maWcuZGVmYXVsdEludGVyY2VwdG9yKGVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpO1xuICAgIHJldHVybiByZWR1Y2UoaW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAocmVxdWVzdDogYW55LCBpbnRlcmNlcHRvcjogYW55KSB7XG5cbiAgICAgIGxldCByZXR1cm5JbnRlcmNlcHRvcjogYW55ID0gaW50ZXJjZXB0b3IocmVxdWVzdC5lbGVtZW50LCBvcGVyYXRpb24sIHBhdGgsIHVybCwgcmVxdWVzdC5oZWFkZXJzLCByZXF1ZXN0LnBhcmFtcywgcmVxdWVzdC5odHRwQ29uZmlnKTtcbiAgICAgIHJldHVybiBleHRlbmQocmVxdWVzdCwgcmV0dXJuSW50ZXJjZXB0b3IpO1xuICAgIH0sIGRlZmF1bHRSZXF1ZXN0KTtcbiAgfTtcblxuICBvYmplY3QuYWRkUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGludGVyY2VwdG9yKSB7XG4gICAgY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMucHVzaChmdW5jdGlvbiAoZWxlbSwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgaHR0cENvbmZpZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgIGVsZW1lbnQ6IGludGVyY2VwdG9yKGVsZW0sIG9wZXJhdGlvbiwgcGF0aCwgdXJsKSxcbiAgICAgICAgaHR0cENvbmZpZzogaHR0cENvbmZpZ1xuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3Quc2V0UmVxdWVzdEludGVyY2VwdG9yID0gb2JqZWN0LmFkZFJlcXVlc3RJbnRlcmNlcHRvcjtcblxuICBvYmplY3QuYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzLnB1c2goaW50ZXJjZXB0b3IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5zZXRGdWxsUmVxdWVzdEludGVyY2VwdG9yID0gb2JqZWN0LmFkZEZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3I7XG5cbiAgY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCA9IGNvbmZpZy5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQgfHwgZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH07XG4gIG9iamVjdC5zZXRPbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQgPSBmdW5jdGlvbiAocG9zdCkge1xuICAgIGNvbmZpZy5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQgPSBwb3N0O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5zZXRSZXN0YW5ndWxhcml6ZVByb21pc2VJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNvbmZpZy5yZXN0YW5ndWxhcml6ZVByb21pc2VJbnRlcmNlcHRvciA9IGludGVyY2VwdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgYW4gZWxlbWVudCBoYXMgYmVlbiBcIlJlc3Rhbmd1bGFyaXplZFwiLlxuICAgKlxuICAgKiBJdCByZWNlaXZlcyB0aGUgZWxlbWVudCwgYSBib29sZWFuIGluZGljYXRpbmcgaWYgaXQncyBhbiBlbGVtZW50IG9yIGEgY29sbGVjdGlvblxuICAgKiBhbmQgdGhlIG5hbWUgb2YgdGhlIG1vZGVsXG4gICAqXG4gICAqL1xuICBjb25maWcub25FbGVtUmVzdGFuZ3VsYXJpemVkID0gY29uZmlnLm9uRWxlbVJlc3Rhbmd1bGFyaXplZCB8fCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfTtcbiAgb2JqZWN0LnNldE9uRWxlbVJlc3Rhbmd1bGFyaXplZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgY29uZmlnLm9uRWxlbVJlc3Rhbmd1bGFyaXplZCA9IHBvc3Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLnNob3VsZFNhdmVQYXJlbnQgPSBjb25maWcuc2hvdWxkU2F2ZVBhcmVudCB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICBvYmplY3Quc2V0UGFyZW50bGVzcyA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBpZiAoaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICBjb25maWcuc2hvdWxkU2F2ZVBhcmVudCA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICByZXR1cm4gIWluY2x1ZGVzKHZhbHVlcywgcm91dGUpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZXMpKSB7XG4gICAgICBjb25maWcuc2hvdWxkU2F2ZVBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF2YWx1ZXM7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBsZXRzIHlvdSBzZXQgYSBzdWZmaXggdG8gZXZlcnkgcmVxdWVzdC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGlmIHlvdXIgYXBpIHJlcXVpcmVzIHRoYXQgZm9yIEpTb24gcmVxdWVzdHMgeW91IGRvIC91c2Vycy8xMjMuanNvbiwgeW91IGNhbiBzZXQgdGhhdFxuICAgKiBpbiBoZXJlLlxuICAgKlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGUgc3VmZml4IGlzIG51bGxcbiAgICovXG4gIGNvbmZpZy5zdWZmaXggPSBpc1VuZGVmaW5lZChjb25maWcuc3VmZml4KSA/IG51bGwgOiBjb25maWcuc3VmZml4O1xuICBvYmplY3Quc2V0UmVxdWVzdFN1ZmZpeCA9IGZ1bmN0aW9uIChuZXdTdWZmaXgpIHtcbiAgICBjb25maWcuc3VmZml4ID0gbmV3U3VmZml4O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgZWxlbWVudCB0cmFuc2Zvcm1lcnMgZm9yIGNlcnRhaW4gcm91dGVzLlxuICAgKi9cbiAgY29uZmlnLnRyYW5zZm9ybWVycyA9IGNvbmZpZy50cmFuc2Zvcm1lcnMgfHwge307XG4gIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIgPSBmdW5jdGlvbiAodHlwZSwgc2Vjb25kQXJnLCB0aGlyZEFyZykge1xuICAgIHZhciBpc0NvbGxlY3Rpb24gPSBudWxsO1xuICAgIHZhciB0cmFuc2Zvcm1lciA9IG51bGw7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRyYW5zZm9ybWVyID0gc2Vjb25kQXJnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2Zvcm1lciA9IHRoaXJkQXJnO1xuICAgICAgaXNDb2xsZWN0aW9uID0gc2Vjb25kQXJnO1xuICAgIH1cblxuICAgIHZhciB0eXBlVHJhbnNmb3JtZXJzID0gY29uZmlnLnRyYW5zZm9ybWVyc1t0eXBlXTtcbiAgICBpZiAoIXR5cGVUcmFuc2Zvcm1lcnMpIHtcbiAgICAgIHR5cGVUcmFuc2Zvcm1lcnMgPSBjb25maWcudHJhbnNmb3JtZXJzW3R5cGVdID0gW107XG4gICAgfVxuXG4gICAgdHlwZVRyYW5zZm9ybWVycy5wdXNoKGZ1bmN0aW9uIChjb2xsLCBlbGVtKSB7XG4gICAgICBpZiAoaXNOdWxsKGlzQ29sbGVjdGlvbikgfHwgKGNvbGwgPT09IGlzQ29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyKGVsZW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xuXG4gIG9iamVjdC5leHRlbmRDb2xsZWN0aW9uID0gZnVuY3Rpb24gKHJvdXRlLCBmbikge1xuICAgIHJldHVybiBvYmplY3QuYWRkRWxlbWVudFRyYW5zZm9ybWVyKHJvdXRlLCB0cnVlLCBmbik7XG4gIH07XG5cbiAgb2JqZWN0LmV4dGVuZE1vZGVsID0gZnVuY3Rpb24gKHJvdXRlLCBmbikge1xuICAgIHJldHVybiBvYmplY3QuYWRkRWxlbWVudFRyYW5zZm9ybWVyKHJvdXRlLCBmYWxzZSwgZm4pO1xuICB9O1xuXG4gIGNvbmZpZy50cmFuc2Zvcm1FbGVtID0gZnVuY3Rpb24gKGVsZW0sIGlzQ29sbGVjdGlvbiwgcm91dGUsIFJlc3Rhbmd1bGFyLCBmb3JjZSkge1xuICAgIGlmICghZm9yY2UgJiYgIWNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzICYmICFlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5mcm9tU2VydmVyXSkge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIHZhciB0eXBlVHJhbnNmb3JtZXJzID0gY29uZmlnLnRyYW5zZm9ybWVyc1tyb3V0ZV07XG4gICAgdmFyIGNoYW5nZWRFbGVtID0gZWxlbTtcbiAgICBpZiAodHlwZVRyYW5zZm9ybWVycykge1xuICAgICAgZWFjaCh0eXBlVHJhbnNmb3JtZXJzLCBmdW5jdGlvbiAodHJhbnNmb3JtZXI6IChpc0NvbGxlY3Rpb246IGJvb2xlYW4sIGNoYW5nZWRFbGVtOiBhbnkpID0+IGFueSkge1xuICAgICAgICBjaGFuZ2VkRWxlbSA9IHRyYW5zZm9ybWVyKGlzQ29sbGVjdGlvbiwgY2hhbmdlZEVsZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb25maWcub25FbGVtUmVzdGFuZ3VsYXJpemVkKGNoYW5nZWRFbGVtLCBpc0NvbGxlY3Rpb24sIHJvdXRlLCBSZXN0YW5ndWxhcik7XG4gIH07XG5cbiAgY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMgPSBpc1VuZGVmaW5lZChjb25maWcudHJhbnNmb3JtTG9jYWxFbGVtZW50cykgP1xuICAgIGZhbHNlIDpcbiAgICBjb25maWcudHJhbnNmb3JtTG9jYWxFbGVtZW50cztcblxuICBvYmplY3Quc2V0VHJhbnNmb3JtT25seVNlcnZlckVsZW1lbnRzID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICAgIGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzID0gIWFjdGl2ZTtcbiAgfTtcblxuICBjb25maWcuZnVsbFJlc3BvbnNlID0gaXNVbmRlZmluZWQoY29uZmlnLmZ1bGxSZXNwb25zZSkgPyBmYWxzZSA6IGNvbmZpZy5mdWxsUmVzcG9uc2U7XG4gIG9iamVjdC5zZXRGdWxsUmVzcG9uc2UgPSBmdW5jdGlvbiAoZnVsbCkge1xuICAgIGNvbmZpZy5mdWxsUmVzcG9uc2UgPSBmdWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG5cbiAgLy9JbnRlcm5hbCB2YWx1ZXMgYW5kIGZ1bmN0aW9uc1xuICBjb25maWcudXJsQ3JlYXRvckZhY3RvcnkgPSB7fTtcblxuICAvKipcbiAgICogQmFzZSBVUkwgQ3JlYXRvci4gQmFzZSBwcm90b3R5cGUgZm9yIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byBpdFxuICAgKiovXG5cbiAgdmFyIEJhc2VDcmVhdG9yID0gZnVuY3Rpb24gKCkge1xuICB9O1xuXG4gIEJhc2VDcmVhdG9yLnByb3RvdHlwZS5zZXRDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQmFzZUNyZWF0b3IucHJvdG90eXBlLnBhcmVudHNBcnJheSA9IGZ1bmN0aW9uIChjdXJyZW50KSB7XG4gICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgcGFyZW50cy5wdXNoKGN1cnJlbnQpO1xuICAgICAgY3VycmVudCA9IGN1cnJlbnRbdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdO1xuICAgIH1cbiAgICByZXR1cm4gcGFyZW50cy5yZXZlcnNlKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gUmVzdGFuZ3VsYXJSZXNvdXJjZShjb25maWcsICRodHRwLCB1cmwsIGNvbmZpZ3VyZXIpIHtcbiAgICB2YXIgcmVzb3VyY2UgPSB7fTtcbiAgICBlYWNoKGtleXMoY29uZmlndXJlciksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGNvbmZpZ3VyZXJba2V5XTtcblxuICAgICAgLy8gQWRkIGRlZmF1bHQgcGFyYW1ldGVyc1xuICAgICAgdmFsdWUucGFyYW1zID0gZXh0ZW5kKHt9LCB2YWx1ZS5wYXJhbXMsIGNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtc1t2YWx1ZS5tZXRob2QudG9Mb3dlckNhc2UoKV0pO1xuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0aGUgPyBpZiBubyBwYXJhbXMgYXJlIHRoZXJlXG4gICAgICBpZiAoaXNFbXB0eSh2YWx1ZS5wYXJhbXMpKSB7XG4gICAgICAgIGRlbGV0ZSB2YWx1ZS5wYXJhbXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcuaXNTYWZlKHZhbHVlLm1ldGhvZCkpIHtcblxuICAgICAgICByZXNvdXJjZVtrZXldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBjb25maWcgPSBleHRlbmQodmFsdWUsIHtcbiAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuICRodHRwLmNyZWF0ZVJlcXVlc3QoY29uZmlnKTtcbiAgICAgICAgfTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICByZXNvdXJjZVtrZXldID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBsZXQgY29uZmlnID0gZXh0ZW5kKHZhbHVlLCB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gJGh0dHAuY3JlYXRlUmVxdWVzdChjb25maWcpO1xuICAgICAgICB9O1xuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzb3VyY2U7XG4gIH1cblxuICBCYXNlQ3JlYXRvci5wcm90b3R5cGUucmVzb3VyY2UgPSBmdW5jdGlvbiAoY3VycmVudCwgJGh0dHAsIGxvY2FsSHR0cENvbmZpZywgY2FsbEhlYWRlcnMsIGNhbGxQYXJhbXMsIHdoYXQsIGV0YWcsIG9wZXJhdGlvbikge1xuICAgIHZhciBwYXJhbXMgPSBkZWZhdWx0cyhjYWxsUGFyYW1zIHx8IHt9LCB0aGlzLmNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtcy5jb21tb24pO1xuICAgIHZhciBoZWFkZXJzID0gZGVmYXVsdHMoY2FsbEhlYWRlcnMgfHwge30sIHRoaXMuY29uZmlnLmRlZmF1bHRIZWFkZXJzKTtcblxuICAgIGlmIChldGFnKSB7XG4gICAgICBpZiAoIWNvbmZpZy5pc1NhZmUob3BlcmF0aW9uKSkge1xuICAgICAgICBoZWFkZXJzWydJZi1NYXRjaCddID0gZXRhZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWRlcnNbJ0lmLU5vbmUtTWF0Y2gnXSA9IGV0YWc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHVybCA9IHRoaXMuYmFzZShjdXJyZW50KTtcblxuICAgIGlmICh3aGF0KSB7XG4gICAgICB2YXIgYWRkID0gJyc7XG4gICAgICBpZiAoIS9cXC8kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgYWRkICs9ICcvJztcbiAgICAgIH1cbiAgICAgIGFkZCArPSB3aGF0O1xuICAgICAgdXJsICs9IGFkZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuc3VmZml4ICYmXG4gICAgICB1cmwuaW5kZXhPZih0aGlzLmNvbmZpZy5zdWZmaXgsIHVybC5sZW5ndGggLSB0aGlzLmNvbmZpZy5zdWZmaXgubGVuZ3RoKSA9PT0gLTEgJiYgIXRoaXMuY29uZmlnLmdldFVybEZyb21FbGVtKGN1cnJlbnQpKSB7XG4gICAgICB1cmwgKz0gdGhpcy5jb25maWcuc3VmZml4O1xuICAgIH1cblxuICAgIGN1cnJlbnRbdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gPSB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gUmVzdGFuZ3VsYXJSZXNvdXJjZSh0aGlzLmNvbmZpZywgJGh0dHAsIHVybCwge1xuICAgICAgZ2V0TGlzdDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBnZXQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAganNvbnA6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ2pzb25wJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBwdXQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgcG9zdDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgcmVtb3ZlOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIGhlYWQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ0hFQUQnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIHRyYWNlOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdUUkFDRScsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgb3B0aW9uczogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnT1BUSU9OUycsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgcGF0Y2g6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIFBhdGggVVJMIGNyZWF0b3IuIEl0IHVzZXMgUGF0aCB0byBzaG93IEhpZXJhcmNoeSBpbiB0aGUgUmVzdCBBUEkuXG4gICAqIFRoaXMgbWVhbnMgdGhhdCBpZiB5b3UgaGF2ZSBhbiBBY2NvdW50IHRoYXQgdGhlbiBoYXMgYSBzZXQgb2YgQnVpbGRpbmdzLCBhIFVSTCB0byBhIGJ1aWxkaW5nXG4gICAqIHdvdWxkIGJlIC9hY2NvdW50cy8xMjMvYnVpbGRpbmdzLzQ1NlxuICAgKiovXG4gIHZhciBQYXRoID0gZnVuY3Rpb24gKCkge1xuICB9O1xuXG4gIFBhdGgucHJvdG90eXBlID0gbmV3IEJhc2VDcmVhdG9yKCk7XG5cbiAgUGF0aC5wcm90b3R5cGUubm9ybWFsaXplVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgIHZhciBwYXJ0cyA9IC8oKD86aHR0cFtzXT86KT9cXC9cXC8pPyguKik/Ly5leGVjKHVybCk7XG4gICAgcGFydHNbMl0gPSBwYXJ0c1syXS5yZXBsYWNlKC9bXFxcXFxcL10rL2csICcvJyk7XG4gICAgcmV0dXJuICh0eXBlb2YgcGFydHNbMV0gIT09ICd1bmRlZmluZWQnKSA/IHBhcnRzWzFdICsgcGFydHNbMl0gOiBwYXJ0c1syXTtcbiAgfTtcblxuICBQYXRoLnByb3RvdHlwZS5iYXNlID0gZnVuY3Rpb24gKGN1cnJlbnQpIHtcbiAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICByZXR1cm4gcmVkdWNlKHRoaXMucGFyZW50c0FycmF5KGN1cnJlbnQpLCBmdW5jdGlvbiAoYWN1bTogYW55LCBlbGVtOiBhbnkpIHtcbiAgICAgIHZhciBlbGVtVXJsO1xuICAgICAgdmFyIGVsZW1TZWxmTGluayA9IF9fdGhpcy5jb25maWcuZ2V0VXJsRnJvbUVsZW0oZWxlbSk7XG4gICAgICBpZiAoZWxlbVNlbGZMaW5rKSB7XG4gICAgICAgIGlmIChfX3RoaXMuY29uZmlnLmlzQWJzb2x1dGVVcmwoZWxlbVNlbGZMaW5rKSkge1xuICAgICAgICAgIHJldHVybiBlbGVtU2VsZkxpbms7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbVVybCA9IGVsZW1TZWxmTGluaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbVVybCA9IGVsZW1bX190aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV07XG5cbiAgICAgICAgaWYgKGVsZW1bX190aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dKSB7XG4gICAgICAgICAgdmFyIGlkcyA9IGVsZW1bX190aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZHNdO1xuICAgICAgICAgIGlmIChpZHMpIHtcbiAgICAgICAgICAgIGVsZW1VcmwgKz0gJy8nICsgaWRzLmpvaW4oJywnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGVsZW1JZDogYW55O1xuICAgICAgICAgIGlmIChfX3RoaXMuY29uZmlnLnVzZUNhbm5vbmljYWxJZCkge1xuICAgICAgICAgICAgZWxlbUlkID0gX190aGlzLmNvbmZpZy5nZXRDYW5ub25pY2FsSWRGcm9tRWxlbShlbGVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbUlkID0gX190aGlzLmNvbmZpZy5nZXRJZEZyb21FbGVtKGVsZW0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb25maWcuaXNWYWxpZElkKGVsZW1JZCkgJiYgIWVsZW0uc2luZ2xlT25lKSB7XG4gICAgICAgICAgICBlbGVtVXJsICs9ICcvJyArIChfX3RoaXMuY29uZmlnLmVuY29kZUlkcyA/IGVuY29kZVVSSUNvbXBvbmVudChlbGVtSWQpIDogZWxlbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFjdW0gPSBhY3VtLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLycgKyBlbGVtVXJsO1xuICAgICAgcmV0dXJuIF9fdGhpcy5ub3JtYWxpemVVcmwoYWN1bSk7XG5cbiAgICB9LCB0aGlzLmNvbmZpZy5iYXNlVXJsKTtcbiAgfTtcblxuXG4gIFBhdGgucHJvdG90eXBlLmZldGNoVXJsID0gZnVuY3Rpb24gKGN1cnJlbnQsIHdoYXQpIHtcbiAgICB2YXIgYmFzZVVybCA9IHRoaXMuYmFzZShjdXJyZW50KTtcbiAgICBpZiAod2hhdCkge1xuICAgICAgYmFzZVVybCArPSAnLycgKyB3aGF0O1xuICAgIH1cbiAgICByZXR1cm4gYmFzZVVybDtcbiAgfTtcblxuICBQYXRoLnByb3RvdHlwZS5mZXRjaFJlcXVlc3RlZFVybCA9IGZ1bmN0aW9uIChjdXJyZW50LCB3aGF0KSB7XG4gICAgdmFyIHVybCA9IHRoaXMuZmV0Y2hVcmwoY3VycmVudCwgd2hhdCk7XG4gICAgdmFyIHBhcmFtcyA9IGN1cnJlbnRbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlcVBhcmFtc107XG5cbiAgICAvLyBGcm9tIGhlcmUgb24gYW5kIHVudGlsIHRoZSBlbmQgb2YgZmV0Y2hSZXF1ZXN0ZWRVcmwsXG4gICAgLy8gdGhlIGNvZGUgaGFzIGJlZW4ga2luZGx5IGJvcnJvd2VkIGZyb20gYW5ndWxhci5qc1xuICAgIC8vIFRoZSByZWFzb24gZm9yIHN1Y2ggY29kZSBibG9hdGluZyBpcyBjb2hlcmVuY2U6XG4gICAgLy8gICBJZiB0aGUgdXNlciB3ZXJlIHRvIHVzZSB0aGlzIGZvciBjYWNoZSBtYW5hZ2VtZW50LCB0aGVcbiAgICAvLyAgIHNlcmlhbGl6YXRpb24gb2YgcGFyYW1ldGVycyB3b3VsZCBuZWVkIHRvIGJlIGlkZW50aWNhbFxuICAgIC8vICAgdG8gdGhlIG9uZSBkb25lIGJ5IGFuZ3VsYXIgZm9yIGNhY2hlIGtleXMgdG8gbWF0Y2guXG4gICAgZnVuY3Rpb24gc29ydGVkS2V5cyhvYmopIHtcbiAgICAgIHZhciBrZXlzID0gW107XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ga2V5cy5zb3J0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9yRWFjaFNvcnRlZChvYmosIGl0ZXJhdG9yPywgY29udGV4dD8pIHtcbiAgICAgIHZhciBrZXlzID0gc29ydGVkS2V5cyhvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleXNbaV1dLCBrZXlzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuY29kZVVyaVF1ZXJ5KHZhbCwgcGN0RW5jb2RlU3BhY2VzPykge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLnJlcGxhY2UoLyU0MC9naSwgJ0AnKS5yZXBsYWNlKC8lM0EvZ2ksICc6JykucmVwbGFjZSgvJTI0L2csICckJykucmVwbGFjZSgvJTJDL2dpLCAnLCcpLnJlcGxhY2UoLyUyMC9nLCAocGN0RW5jb2RlU3BhY2VzID8gJyUyMCcgOiAnKycpKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgcmV0dXJuIHVybCArICh0aGlzLmNvbmZpZy5zdWZmaXggfHwgJycpO1xuICAgIH1cblxuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIGZvckVhY2hTb3J0ZWQocGFyYW1zLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICB9XG5cbiAgICAgIGZvckVhY2godmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmIChpc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZVVyaVF1ZXJ5KGtleSkgKyAnPScgKyBlbmNvZGVVcmlRdWVyeSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB1cmwgKyAodGhpcy5jb25maWcuc3VmZml4IHx8ICcnKSArICgodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEpID8gJz8nIDogJyYnKSArIHBhcnRzLmpvaW4oJyYnKTtcbiAgfTtcblxuICBjb25maWcudXJsQ3JlYXRvckZhY3RvcnkucGF0aCA9IFBhdGg7XG59XG4iXX0=