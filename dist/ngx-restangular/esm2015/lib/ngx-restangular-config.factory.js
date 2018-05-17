/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
    config.responseInterceptors = config.responseInterceptors ? [...config.responseInterceptors] : [];
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
    config.errorInterceptors = config.errorInterceptors ? [...config.errorInterceptors] : [];
    object.addErrorInterceptor = function (interceptor) {
        config.errorInterceptors = [interceptor, ...config.errorInterceptors];
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
    config.requestInterceptors = config.requestInterceptors ? [...config.requestInterceptors] : [];
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
            let /** @type {?} */ returnInterceptor = interceptor(request.element, operation, path, url, request.headers, request.params, request.httpConfig);
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
                    let /** @type {?} */ config = extend(value, {
                        url: url
                    });
                    return $http.createRequest(config);
                };
            }
            else {
                resource[key] = function (data) {
                    let /** @type {?} */ config = extend(value, {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWNvbmZpZy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJlc3Rhbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL25neC1yZXN0YW5ndWxhci1jb25maWcuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixXQUFXLEVBQ1gsTUFBTSxFQUNOLE9BQU8sRUFDUCxRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNOLElBQUksRUFDSixHQUFHLEVBQ0gsT0FBTyxFQUNQLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUNOLElBQUksRUFDSixPQUFPLEVBQ1AsT0FBTyxHQUNSLE1BQU0sUUFBUSxDQUFDOzs7Ozs7QUFFaEIsTUFBTSxnQ0FBZ0MsTUFBTSxFQUFFLE1BQU07SUFDbEQsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Ozs7SUFLOUIscUJBQUksV0FBVyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxTQUFTO1FBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZELENBQUM7SUFFRixxQkFBSSxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsVUFBVSxNQUFNO1FBQ3JDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0RSxNQUFNLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxXQUFXLENBQUM7S0FDdEIs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QyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pCO1lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0QsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyRyxDQUFDO0lBRUYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpbmNsdWRlcyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzTnVsbCxcbiAgaXNBcnJheSxcbiAgaXNPYmplY3QsXG4gIGlzQm9vbGVhbixcbiAgZGVmYXVsdHMsXG4gIGVhY2gsXG4gIGV4dGVuZCxcbiAgZmluZCxcbiAgaGFzLFxuICBpbml0aWFsLFxuICBsYXN0LFxuICBjbG9uZSxcbiAgcmVkdWNlLFxuICBrZXlzLFxuICBpc0VtcHR5LFxuICBmb3JFYWNoLFxufSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVzdGFuZ3VsYXJDb25maWd1cmVyKG9iamVjdCwgY29uZmlnKXtcbiAgb2JqZWN0LmNvbmZpZ3VyYXRpb24gPSBjb25maWc7XG5cbiAgLyoqXG4gICAqIFRob3NlIGFyZSBIVFRQIHNhZmUgbWV0aG9kcyBmb3Igd2hpY2ggdGhlcmUgaXMgbm8gbmVlZCB0byBwYXNzIGFueSBkYXRhIHdpdGggdGhlIHJlcXVlc3QuXG4gICAqL1xuICB2YXIgc2FmZU1ldGhvZHMgPSBbJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnLCAndHJhY2UnLCAnZ2V0bGlzdCddO1xuICBjb25maWcuaXNTYWZlID0gZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgIHJldHVybiBpbmNsdWRlcyhzYWZlTWV0aG9kcywgb3BlcmF0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xuXG4gIHZhciBhYnNvbHV0ZVBhdHRlcm4gPSAvXmh0dHBzPzpcXC9cXC8vaTtcbiAgY29uZmlnLmlzQWJzb2x1dGVVcmwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGNvbmZpZy5hYnNvbHV0ZVVybCkgfHwgaXNOdWxsKGNvbmZpZy5hYnNvbHV0ZVVybCkgP1xuICAgIHN0cmluZyAmJiBhYnNvbHV0ZVBhdHRlcm4udGVzdChzdHJpbmcpIDpcbiAgICAgIGNvbmZpZy5hYnNvbHV0ZVVybDtcbiAgfTtcblxuICBjb25maWcuYWJzb2x1dGVVcmwgPSBpc1VuZGVmaW5lZChjb25maWcuYWJzb2x1dGVVcmwpID8gdHJ1ZSA6IGNvbmZpZy5hYnNvbHV0ZVVybDtcbiAgb2JqZWN0LnNldFNlbGZMaW5rQWJzb2x1dGVVcmwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBjb25maWcuYWJzb2x1dGVVcmwgPSB2YWx1ZTtcbiAgfTtcbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIEJhc2VVUkwgdG8gYmUgdXNlZCB3aXRoIFJlc3Rhbmd1bGFyXG4gICAqL1xuICBjb25maWcuYmFzZVVybCA9IGlzVW5kZWZpbmVkKGNvbmZpZy5iYXNlVXJsKSA/ICcnIDogY29uZmlnLmJhc2VVcmw7XG4gIG9iamVjdC5zZXRCYXNlVXJsID0gZnVuY3Rpb24gKG5ld0Jhc2VVcmwpIHtcbiAgICBjb25maWcuYmFzZVVybCA9IC9cXC8kLy50ZXN0KG5ld0Jhc2VVcmwpID9cbiAgICAgIG5ld0Jhc2VVcmwuc3Vic3RyaW5nKDAsIG5ld0Jhc2VVcmwubGVuZ3RoIC0gMSkgOlxuICAgICAgbmV3QmFzZVVybDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgZXh0cmEgZmllbGRzIHRvIGtlZXAgZnJvbSB0aGUgcGFyZW50c1xuICAgKi9cbiAgY29uZmlnLmV4dHJhRmllbGRzID0gY29uZmlnLmV4dHJhRmllbGRzIHx8IFtdO1xuICBvYmplY3Quc2V0RXh0cmFGaWVsZHMgPSBmdW5jdGlvbiAobmV3RXh0cmFGaWVsZHMpIHtcbiAgICBjb25maWcuZXh0cmFGaWVsZHMgPSBuZXdFeHRyYUZpZWxkcztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU29tZSBkZWZhdWx0ICRodHRwIHBhcmFtZXRlciB0byBiZSB1c2VkIGluIEVWRVJZIGNhbGxcbiAgICoqL1xuICBjb25maWcuZGVmYXVsdEh0dHBGaWVsZHMgPSBjb25maWcuZGVmYXVsdEh0dHBGaWVsZHMgfHwge307XG4gIG9iamVjdC5zZXREZWZhdWx0SHR0cEZpZWxkcyA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBjb25maWcuZGVmYXVsdEh0dHBGaWVsZHMgPSB2YWx1ZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFsd2F5cyByZXR1cm4gcGxhaW4gZGF0YSwgbm8gcmVzdGFuZ3VsYXJpemVkIG9iamVjdFxuICAgKiovXG4gIGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCA9IGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCB8fCBmYWxzZTtcbiAgb2JqZWN0LnNldFBsYWluQnlEZWZhdWx0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgY29uZmlnLnBsYWluQnlEZWZhdWx0ID0gdmFsdWUgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25maWcud2l0aEh0dHBWYWx1ZXMgPSBmdW5jdGlvbiAoaHR0cExvY2FsQ29uZmlnLCBvYmopIHtcbiAgICByZXR1cm4gZGVmYXVsdHMob2JqLCBodHRwTG9jYWxDb25maWcsIGNvbmZpZy5kZWZhdWx0SHR0cEZpZWxkcyk7XG4gIH07XG5cbiAgY29uZmlnLmVuY29kZUlkcyA9IGlzVW5kZWZpbmVkKGNvbmZpZy5lbmNvZGVJZHMpID8gdHJ1ZSA6IGNvbmZpZy5lbmNvZGVJZHM7XG4gIG9iamVjdC5zZXRFbmNvZGVJZHMgPSBmdW5jdGlvbiAoZW5jb2RlKSB7XG4gICAgY29uZmlnLmVuY29kZUlkcyA9IGVuY29kZTtcbiAgfTtcblxuICBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXMgPSBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXMgfHwge1xuICAgICAgZ2V0OiB7fSxcbiAgICAgIHBvc3Q6IHt9LFxuICAgICAgcHV0OiB7fSxcbiAgICAgIHJlbW92ZToge30sXG4gICAgICBjb21tb246IHt9XG4gICAgfTtcblxuICBvYmplY3Quc2V0RGVmYXVsdFJlcXVlc3RQYXJhbXMgPSBmdW5jdGlvbiAocGFyYW0xLCBwYXJhbTIpIHtcbiAgICB2YXIgbWV0aG9kcyA9IFtdLFxuICAgICAgcGFyYW1zID0gcGFyYW0yIHx8IHBhcmFtMTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtMikpIHtcbiAgICAgIGlmIChpc0FycmF5KHBhcmFtMSkpIHtcbiAgICAgICAgbWV0aG9kcyA9IHBhcmFtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZHMucHVzaChwYXJhbTEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXRob2RzLnB1c2goJ2NvbW1vbicpO1xuICAgIH1cblxuICAgIGVhY2gobWV0aG9kcywgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zW21ldGhvZF0gPSBwYXJhbXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnJlcXVlc3RQYXJhbXMgPSBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXM7XG5cbiAgY29uZmlnLmRlZmF1bHRIZWFkZXJzID0gY29uZmlnLmRlZmF1bHRIZWFkZXJzIHx8IHt9O1xuICBvYmplY3Quc2V0RGVmYXVsdEhlYWRlcnMgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICAgIGNvbmZpZy5kZWZhdWx0SGVhZGVycyA9IGhlYWRlcnM7XG4gICAgb2JqZWN0LmRlZmF1bHRIZWFkZXJzID0gY29uZmlnLmRlZmF1bHRIZWFkZXJzO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5kZWZhdWx0SGVhZGVycyA9IGNvbmZpZy5kZWZhdWx0SGVhZGVycztcblxuXG4gIC8qKlxuICAgKiBNZXRob2Qgb3ZlcnJpZGVycyByZXNwb25zZSBNZXRob2RcbiAgICoqL1xuICBjb25maWcuZGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZCB8fCAncHJvbWlzZSc7XG4gIG9iamVjdC5zZXREZWZhdWx0UmVzcG9uc2VNZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IG1ldGhvZDtcbiAgICBvYmplY3QuZGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gY29uZmlnLmRlZmF1bHRSZXNwb25zZU1ldGhvZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgb2JqZWN0LmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VNZXRob2Q7XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBvdmVycmlkZXJzIHdpbGwgc2V0IHdoaWNoIG1ldGhvZHMgYXJlIHNlbnQgdmlhIFBPU1Qgd2l0aCBhbiBYLUhUVFAtTWV0aG9kLU92ZXJyaWRlXG4gICAqKi9cbiAgY29uZmlnLm1ldGhvZE92ZXJyaWRlcnMgPSBjb25maWcubWV0aG9kT3ZlcnJpZGVycyB8fCBbXTtcbiAgb2JqZWN0LnNldE1ldGhvZE92ZXJyaWRlcnMgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgdmFyIG92ZXJyaWRlcnMgPSBleHRlbmQoW10sIHZhbHVlcyk7XG4gICAgaWYgKGNvbmZpZy5pc092ZXJyaWRlbk1ldGhvZCgnZGVsZXRlJywgb3ZlcnJpZGVycykpIHtcbiAgICAgIG92ZXJyaWRlcnMucHVzaCgncmVtb3ZlJyk7XG4gICAgfVxuICAgIGNvbmZpZy5tZXRob2RPdmVycmlkZXJzID0gb3ZlcnJpZGVycztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuanNvbnAgPSBpc1VuZGVmaW5lZChjb25maWcuanNvbnApID8gZmFsc2UgOiBjb25maWcuanNvbnA7XG4gIG9iamVjdC5zZXRKc29ucCA9IGZ1bmN0aW9uIChhY3RpdmUpIHtcbiAgICBjb25maWcuanNvbnAgPSBhY3RpdmU7XG4gIH07XG5cbiAgY29uZmlnLmlzT3ZlcnJpZGVuTWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZCwgdmFsdWVzKSB7XG4gICAgdmFyIHNlYXJjaCA9IHZhbHVlcyB8fCBjb25maWcubWV0aG9kT3ZlcnJpZGVycztcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKGZpbmQoc2VhcmNoLCBmdW5jdGlvbiAob25lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBvbmUudG9Mb3dlckNhc2UoKSA9PT0gbWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gICAgfSkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBVUkwgY3JlYXRvciB0eXBlLiBGb3Igbm93LCBvbmx5IFBhdGggaXMgY3JlYXRlZC4gSW4gdGhlIGZ1dHVyZSB3ZSdsbCBoYXZlIHF1ZXJ5UGFyYW1zXG4gICAqKi9cbiAgY29uZmlnLnVybENyZWF0b3IgPSBjb25maWcudXJsQ3JlYXRvciB8fCAncGF0aCc7XG4gIG9iamVjdC5zZXRVcmxDcmVhdG9yID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIWhhcyhjb25maWcudXJsQ3JlYXRvckZhY3RvcnksIG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTCBQYXRoIHNlbGVjdGVkIGlzblxcJ3QgdmFsaWQnKTtcbiAgICB9XG5cbiAgICBjb25maWcudXJsQ3JlYXRvciA9IG5hbWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFlvdSBjYW4gc2V0IHRoZSByZXN0YW5ndWxhciBmaWVsZHMgaGVyZS4gVGhlIDMgcmVxdWlyZWQgZmllbGRzIGZvciBSZXN0YW5ndWxhciBhcmU6XG4gICAqXG4gICAqIGlkOiBJZCBvZiB0aGUgZWxlbWVudFxuICAgKiByb3V0ZTogbmFtZSBvZiB0aGUgcm91dGUgb2YgdGhpcyBlbGVtZW50XG4gICAqIHBhcmVudFJlc291cmNlOiB0aGUgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgcmVzb3VyY2VcbiAgICpcbiAgICogIEFsbCBvZiB0aGlzIGZpZWxkcyBleGNlcHQgZm9yIGlkLCBhcmUgaGFuZGxlZCAoYW5kIGNyZWF0ZWQpIGJ5IFJlc3Rhbmd1bGFyLiBCeSBkZWZhdWx0LFxuICAgKiAgdGhlIGZpZWxkIHZhbHVlcyB3aWxsIGJlIGlkLCByb3V0ZSBhbmQgcGFyZW50UmVzb3VyY2UgcmVzcGVjdGl2ZWx5XG4gICAqL1xuICBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMgPSBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMgfHwge1xuICAgICAgaWQ6ICdpZCcsXG4gICAgICByb3V0ZTogJ3JvdXRlJyxcbiAgICAgIHBhcmVudFJlc291cmNlOiAncGFyZW50UmVzb3VyY2UnLFxuICAgICAgcmVzdGFuZ3VsYXJDb2xsZWN0aW9uOiAncmVzdGFuZ3VsYXJDb2xsZWN0aW9uJyxcbiAgICAgIGNhbm5vbmljYWxJZDogJ19fY2Fubm9uaWNhbElkJyxcbiAgICAgIGV0YWc6ICdyZXN0YW5ndWxhckV0YWcnLFxuICAgICAgc2VsZkxpbms6ICdocmVmJyxcbiAgICAgIGdldDogJ2dldCcsXG4gICAgICBnZXRMaXN0OiAnZ2V0TGlzdCcsXG4gICAgICBwdXQ6ICdwdXQnLFxuICAgICAgcG9zdDogJ3Bvc3QnLFxuICAgICAgcmVtb3ZlOiAncmVtb3ZlJyxcbiAgICAgIGhlYWQ6ICdoZWFkJyxcbiAgICAgIHRyYWNlOiAndHJhY2UnLFxuICAgICAgb3B0aW9uczogJ29wdGlvbnMnLFxuICAgICAgcGF0Y2g6ICdwYXRjaCcsXG4gICAgICBnZXRSZXN0YW5ndWxhclVybDogJ2dldFJlc3Rhbmd1bGFyVXJsJyxcbiAgICAgIGdldFJlcXVlc3RlZFVybDogJ2dldFJlcXVlc3RlZFVybCcsXG4gICAgICBwdXRFbGVtZW50OiAncHV0RWxlbWVudCcsXG4gICAgICBhZGRSZXN0YW5ndWxhck1ldGhvZDogJ2FkZFJlc3Rhbmd1bGFyTWV0aG9kJyxcbiAgICAgIGdldFBhcmVudExpc3Q6ICdnZXRQYXJlbnRMaXN0JyxcbiAgICAgIGNsb25lOiAnY2xvbmUnLFxuICAgICAgaWRzOiAnaWRzJyxcbiAgICAgIGh0dHBDb25maWc6ICdfJGh0dHBDb25maWcnLFxuICAgICAgcmVxUGFyYW1zOiAncmVxUGFyYW1zJyxcbiAgICAgIG9uZTogJ29uZScsXG4gICAgICBhbGw6ICdhbGwnLFxuICAgICAgc2V2ZXJhbDogJ3NldmVyYWwnLFxuICAgICAgb25lVXJsOiAnb25lVXJsJyxcbiAgICAgIGFsbFVybDogJ2FsbFVybCcsXG4gICAgICBjdXN0b21QVVQ6ICdjdXN0b21QVVQnLFxuICAgICAgY3VzdG9tUEFUQ0g6ICdjdXN0b21QQVRDSCcsXG4gICAgICBjdXN0b21QT1NUOiAnY3VzdG9tUE9TVCcsXG4gICAgICBjdXN0b21ERUxFVEU6ICdjdXN0b21ERUxFVEUnLFxuICAgICAgY3VzdG9tR0VUOiAnY3VzdG9tR0VUJyxcbiAgICAgIGN1c3RvbUdFVExJU1Q6ICdjdXN0b21HRVRMSVNUJyxcbiAgICAgIGN1c3RvbU9wZXJhdGlvbjogJ2N1c3RvbU9wZXJhdGlvbicsXG4gICAgICBkb1BVVDogJ2RvUFVUJyxcbiAgICAgIGRvUEFUQ0g6ICdkb1BBVENIJyxcbiAgICAgIGRvUE9TVDogJ2RvUE9TVCcsXG4gICAgICBkb0RFTEVURTogJ2RvREVMRVRFJyxcbiAgICAgIGRvR0VUOiAnZG9HRVQnLFxuICAgICAgZG9HRVRMSVNUOiAnZG9HRVRMSVNUJyxcbiAgICAgIGZyb21TZXJ2ZXI6ICdmcm9tU2VydmVyJyxcbiAgICAgIHdpdGhDb25maWc6ICd3aXRoQ29uZmlnJyxcbiAgICAgIHdpdGhIdHRwQ29uZmlnOiAnd2l0aEh0dHBDb25maWcnLFxuICAgICAgc2luZ2xlT25lOiAnc2luZ2xlT25lJyxcbiAgICAgIHBsYWluOiAncGxhaW4nLFxuICAgICAgc2F2ZTogJ3NhdmUnLFxuICAgICAgcmVzdGFuZ3VsYXJpemVkOiAncmVzdGFuZ3VsYXJpemVkJ1xuICAgIH07XG4gIG9iamVjdC5zZXRSZXN0YW5ndWxhckZpZWxkcyA9IGZ1bmN0aW9uIChyZXNGaWVsZHMpIHtcbiAgICBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMgPVxuICAgICAgZXh0ZW5kKHt9LCBjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMsIHJlc0ZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmlzUmVzdGFuZ3VsYXJpemVkID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiAhIW9ialtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJpemVkXTtcbiAgfTtcblxuICBjb25maWcuc2V0RmllbGRUb0VsZW0gPSBmdW5jdGlvbiAoZmllbGQsIGVsZW0sIHZhbHVlKSB7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgIHZhciBpZFZhbHVlID0gZWxlbTtcbiAgICBlYWNoKGluaXRpYWwocHJvcGVydGllcyksIGZ1bmN0aW9uIChwcm9wOiBhbnkpIHtcbiAgICAgIGlkVmFsdWVbcHJvcF0gPSB7fTtcbiAgICAgIGlkVmFsdWUgPSBpZFZhbHVlW3Byb3BdO1xuICAgIH0pO1xuICAgIHZhciBpbmRleDogYW55ID0gbGFzdChwcm9wZXJ0aWVzKTtcbiAgICBpZFZhbHVlW2luZGV4XSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRGaWVsZEZyb21FbGVtID0gZnVuY3Rpb24gKGZpZWxkLCBlbGVtKSB7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBmaWVsZC5zcGxpdCgnLicpO1xuICAgIHZhciBpZFZhbHVlOiBhbnkgPSBlbGVtO1xuICAgIGVhY2gocHJvcGVydGllcywgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGlmIChpZFZhbHVlKSB7XG4gICAgICAgIGlkVmFsdWUgPSBpZFZhbHVlW3Byb3BdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjbG9uZShpZFZhbHVlKTtcbiAgfTtcblxuICBjb25maWcuc2V0SWRUb0VsZW0gPSBmdW5jdGlvbiAoZWxlbSwgaWQgLyosIHJvdXRlICovKSB7XG4gICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZCwgZWxlbSwgaWQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRJZEZyb21FbGVtID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICByZXR1cm4gY29uZmlnLmdldEZpZWxkRnJvbUVsZW0oY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkLCBlbGVtKTtcbiAgfTtcblxuICBjb25maWcuaXNWYWxpZElkID0gZnVuY3Rpb24gKGVsZW1JZCkge1xuICAgIHJldHVybiAnJyAhPT0gZWxlbUlkICYmICFpc1VuZGVmaW5lZChlbGVtSWQpICYmICFpc051bGwoZWxlbUlkKTtcbiAgfTtcblxuICBjb25maWcuc2V0VXJsVG9FbGVtID0gZnVuY3Rpb24gKGVsZW0sIHVybCAvKiwgcm91dGUgKi8pIHtcbiAgICBjb25maWcuc2V0RmllbGRUb0VsZW0oY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNlbGZMaW5rLCBlbGVtLCB1cmwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRVcmxGcm9tRWxlbSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgcmV0dXJuIGNvbmZpZy5nZXRGaWVsZEZyb21FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zZWxmTGluaywgZWxlbSk7XG4gIH07XG5cbiAgY29uZmlnLnVzZUNhbm5vbmljYWxJZCA9IGlzVW5kZWZpbmVkKGNvbmZpZy51c2VDYW5ub25pY2FsSWQpID8gZmFsc2UgOiBjb25maWcudXNlQ2Fubm9uaWNhbElkO1xuICBvYmplY3Quc2V0VXNlQ2Fubm9uaWNhbElkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgY29uZmlnLnVzZUNhbm5vbmljYWxJZCA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZy5nZXRDYW5ub25pY2FsSWRGcm9tRWxlbSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgdmFyIGNhbm5vbmljYWxJZCA9IGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNhbm5vbmljYWxJZF07XG4gICAgdmFyIGFjdHVhbElkID0gY29uZmlnLmlzVmFsaWRJZChjYW5ub25pY2FsSWQpID8gY2Fubm9uaWNhbElkIDogY29uZmlnLmdldElkRnJvbUVsZW0oZWxlbSk7XG4gICAgcmV0dXJuIGFjdHVhbElkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBSZXNwb25zZSBwYXJzZXIuIFRoaXMgaXMgdXNlZCBpbiBjYXNlIHlvdXIgcmVzcG9uc2UgaXNuJ3QgZGlyZWN0bHkgdGhlIGRhdGEuXG4gICAqIEZvciBleGFtcGxlIGlmIHlvdSBoYXZlIGEgcmVzcG9uc2UgbGlrZSB7bWV0YTogeydtZXRhJ30sIGRhdGE6IHtuYW1lOiAnR29udG8nfX1cbiAgICogeW91IGNhbiBleHRyYWN0IHRoaXMgZGF0YSB3aGljaCBpcyB0aGUgb25lIHRoYXQgbmVlZHMgd3JhcHBpbmdcbiAgICpcbiAgICogVGhlIFJlc3BvbnNlRXh0cmFjdG9yIGlzIGEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgcmVzcG9uc2UgYW5kIHRoZSBtZXRob2QgZXhlY3V0ZWQuXG4gICAqL1xuXG4gIGNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9ycyA9IGNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9ycyA/IFsuLi5jb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnNdIDogW107XG5cbiAgY29uZmlnLmRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yID0gZnVuY3Rpb24gKGRhdGEgLyosIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgc3ViamVjdCAqLykge1xuICAgIHJldHVybiBkYXRhIHx8IHt9O1xuICB9O1xuXG4gIGNvbmZpZy5yZXNwb25zZUV4dHJhY3RvciA9IGZ1bmN0aW9uIChkYXRhLCBvcGVyYXRpb24sIHdoYXQsIHVybCwgcmVzcG9uc2UsIHN1YmplY3QpIHtcbiAgICB2YXIgaW50ZXJjZXB0b3JzID0gY2xvbmUoY29uZmlnLnJlc3BvbnNlSW50ZXJjZXB0b3JzKTtcbiAgICBpbnRlcmNlcHRvcnMucHVzaChjb25maWcuZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3IpO1xuICAgIHZhciB0aGVEYXRhID0gZGF0YTtcbiAgICBlYWNoKGludGVyY2VwdG9ycywgZnVuY3Rpb24gKGludGVyY2VwdG9yOiBhbnkpIHtcbiAgICAgIHRoZURhdGEgPSBpbnRlcmNlcHRvcih0aGVEYXRhLCBvcGVyYXRpb24sXG4gICAgICAgIHdoYXQsIHVybCwgcmVzcG9uc2UsIHN1YmplY3QpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGVEYXRhO1xuICB9O1xuXG4gIG9iamVjdC5hZGRSZXNwb25zZUludGVyY2VwdG9yID0gZnVuY3Rpb24gKGV4dHJhY3Rvcikge1xuICAgIGNvbmZpZy5yZXNwb25zZUludGVyY2VwdG9ycy5wdXNoKGV4dHJhY3Rvcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzID0gY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzID8gWy4uLmNvbmZpZy5lcnJvckludGVyY2VwdG9yc10gOiBbXTtcbiAgb2JqZWN0LmFkZEVycm9ySW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWcuZXJyb3JJbnRlcmNlcHRvcnMgPSBbaW50ZXJjZXB0b3IsIC4uLmNvbmZpZy5lcnJvckludGVyY2VwdG9yc107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnNldFJlc3BvbnNlSW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcjtcbiAgb2JqZWN0LnNldFJlc3BvbnNlRXh0cmFjdG9yID0gb2JqZWN0LmFkZFJlc3BvbnNlSW50ZXJjZXB0b3I7XG4gIG9iamVjdC5zZXRFcnJvckludGVyY2VwdG9yID0gb2JqZWN0LmFkZEVycm9ySW50ZXJjZXB0b3I7XG5cbiAgLyoqXG4gICAqIFJlc3BvbnNlIGludGVyY2VwdG9yIGlzIGNhbGxlZCBqdXN0IGJlZm9yZSByZXNvbHZpbmcgcHJvbWlzZXMuXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgaW50ZXJjZXB0b3IgaXMgY2FsbGVkIGJlZm9yZSBzZW5kaW5nIGFuIG9iamVjdCB0byB0aGUgc2VydmVyLlxuICAgKi9cbiAgY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMgPSBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycyA/IFsuLi5jb25maWcucmVxdWVzdEludGVyY2VwdG9yc10gOiBbXTtcblxuICBjb25maWcuZGVmYXVsdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIGh0dHBDb25maWc6IGh0dHBDb25maWdcbiAgICB9O1xuICB9O1xuXG4gIGNvbmZpZy5mdWxsUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpIHtcbiAgICB2YXIgaW50ZXJjZXB0b3JzID0gY2xvbmUoY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMpO1xuICAgIHZhciBkZWZhdWx0UmVxdWVzdCA9IGNvbmZpZy5kZWZhdWx0SW50ZXJjZXB0b3IoZWxlbWVudCwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgaHR0cENvbmZpZyk7XG4gICAgcmV0dXJuIHJlZHVjZShpbnRlcmNlcHRvcnMsIGZ1bmN0aW9uIChyZXF1ZXN0OiBhbnksIGludGVyY2VwdG9yOiBhbnkpIHtcblxuICAgICAgbGV0IHJldHVybkludGVyY2VwdG9yOiBhbnkgPSBpbnRlcmNlcHRvcihyZXF1ZXN0LmVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCByZXF1ZXN0LmhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLCByZXF1ZXN0Lmh0dHBDb25maWcpO1xuICAgICAgcmV0dXJuIGV4dGVuZChyZXF1ZXN0LCByZXR1cm5JbnRlcmNlcHRvcik7XG4gICAgfSwgZGVmYXVsdFJlcXVlc3QpO1xuICB9O1xuXG4gIG9iamVjdC5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uIChlbGVtLCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgZWxlbWVudDogaW50ZXJjZXB0b3IoZWxlbSwgb3BlcmF0aW9uLCBwYXRoLCB1cmwpLFxuICAgICAgICBodHRwQ29uZmlnOiBodHRwQ29uZmlnXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5zZXRSZXF1ZXN0SW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkUmVxdWVzdEludGVyY2VwdG9yO1xuXG4gIG9iamVjdC5hZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGludGVyY2VwdG9yKSB7XG4gICAgY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMucHVzaChpbnRlcmNlcHRvcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnNldEZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvcjtcblxuICBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkID0gY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCB8fCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfTtcbiAgb2JqZWN0LnNldE9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCA9IHBvc3Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnNldFJlc3Rhbmd1bGFyaXplUHJvbWlzZUludGVyY2VwdG9yID0gZnVuY3Rpb24gKGludGVyY2VwdG9yKSB7XG4gICAgY29uZmlnLnJlc3Rhbmd1bGFyaXplUHJvbWlzZUludGVyY2VwdG9yID0gaW50ZXJjZXB0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciBhbiBlbGVtZW50IGhhcyBiZWVuIFwiUmVzdGFuZ3VsYXJpemVkXCIuXG4gICAqXG4gICAqIEl0IHJlY2VpdmVzIHRoZSBlbGVtZW50LCBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBpdCdzIGFuIGVsZW1lbnQgb3IgYSBjb2xsZWN0aW9uXG4gICAqIGFuZCB0aGUgbmFtZSBvZiB0aGUgbW9kZWxcbiAgICpcbiAgICovXG4gIGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQgPSBjb25maWcub25FbGVtUmVzdGFuZ3VsYXJpemVkIHx8IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9O1xuICBvYmplY3Quc2V0T25FbGVtUmVzdGFuZ3VsYXJpemVkID0gZnVuY3Rpb24gKHBvc3QpIHtcbiAgICBjb25maWcub25FbGVtUmVzdGFuZ3VsYXJpemVkID0gcG9zdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWcuc2hvdWxkU2F2ZVBhcmVudCA9IGNvbmZpZy5zaG91bGRTYXZlUGFyZW50IHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIG9iamVjdC5zZXRQYXJlbnRsZXNzID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIGlmIChpc0FycmF5KHZhbHVlcykpIHtcbiAgICAgIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50ID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgIHJldHVybiAhaW5jbHVkZXModmFsdWVzLCByb3V0ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlcykpIHtcbiAgICAgIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXZhbHVlcztcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGxldHMgeW91IHNldCBhIHN1ZmZpeCB0byBldmVyeSByZXF1ZXN0LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgeW91ciBhcGkgcmVxdWlyZXMgdGhhdCBmb3IgSlNvbiByZXF1ZXN0cyB5b3UgZG8gL3VzZXJzLzEyMy5qc29uLCB5b3UgY2FuIHNldCB0aGF0XG4gICAqIGluIGhlcmUuXG4gICAqXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSBzdWZmaXggaXMgbnVsbFxuICAgKi9cbiAgY29uZmlnLnN1ZmZpeCA9IGlzVW5kZWZpbmVkKGNvbmZpZy5zdWZmaXgpID8gbnVsbCA6IGNvbmZpZy5zdWZmaXg7XG4gIG9iamVjdC5zZXRSZXF1ZXN0U3VmZml4ID0gZnVuY3Rpb24gKG5ld1N1ZmZpeCkge1xuICAgIGNvbmZpZy5zdWZmaXggPSBuZXdTdWZmaXg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBlbGVtZW50IHRyYW5zZm9ybWVycyBmb3IgY2VydGFpbiByb3V0ZXMuXG4gICAqL1xuICBjb25maWcudHJhbnNmb3JtZXJzID0gY29uZmlnLnRyYW5zZm9ybWVycyB8fCB7fTtcbiAgb2JqZWN0LmFkZEVsZW1lbnRUcmFuc2Zvcm1lciA9IGZ1bmN0aW9uICh0eXBlLCBzZWNvbmRBcmcsIHRoaXJkQXJnKSB7XG4gICAgdmFyIGlzQ29sbGVjdGlvbiA9IG51bGw7XG4gICAgdmFyIHRyYW5zZm9ybWVyID0gbnVsbDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgdHJhbnNmb3JtZXIgPSBzZWNvbmRBcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybWVyID0gdGhpcmRBcmc7XG4gICAgICBpc0NvbGxlY3Rpb24gPSBzZWNvbmRBcmc7XG4gICAgfVxuXG4gICAgdmFyIHR5cGVUcmFuc2Zvcm1lcnMgPSBjb25maWcudHJhbnNmb3JtZXJzW3R5cGVdO1xuICAgIGlmICghdHlwZVRyYW5zZm9ybWVycykge1xuICAgICAgdHlwZVRyYW5zZm9ybWVycyA9IGNvbmZpZy50cmFuc2Zvcm1lcnNbdHlwZV0gPSBbXTtcbiAgICB9XG5cbiAgICB0eXBlVHJhbnNmb3JtZXJzLnB1c2goZnVuY3Rpb24gKGNvbGwsIGVsZW0pIHtcbiAgICAgIGlmIChpc051bGwoaXNDb2xsZWN0aW9uKSB8fCAoY29sbCA9PT0gaXNDb2xsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIoZWxlbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG5cbiAgb2JqZWN0LmV4dGVuZENvbGxlY3Rpb24gPSBmdW5jdGlvbiAocm91dGUsIGZuKSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIocm91dGUsIHRydWUsIGZuKTtcbiAgfTtcblxuICBvYmplY3QuZXh0ZW5kTW9kZWwgPSBmdW5jdGlvbiAocm91dGUsIGZuKSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIocm91dGUsIGZhbHNlLCBmbik7XG4gIH07XG5cbiAgY29uZmlnLnRyYW5zZm9ybUVsZW0gPSBmdW5jdGlvbiAoZWxlbSwgaXNDb2xsZWN0aW9uLCByb3V0ZSwgUmVzdGFuZ3VsYXIsIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSAmJiAhY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMgJiYgIWVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgdmFyIHR5cGVUcmFuc2Zvcm1lcnMgPSBjb25maWcudHJhbnNmb3JtZXJzW3JvdXRlXTtcbiAgICB2YXIgY2hhbmdlZEVsZW0gPSBlbGVtO1xuICAgIGlmICh0eXBlVHJhbnNmb3JtZXJzKSB7XG4gICAgICBlYWNoKHR5cGVUcmFuc2Zvcm1lcnMsIGZ1bmN0aW9uICh0cmFuc2Zvcm1lcjogKGlzQ29sbGVjdGlvbjogYm9vbGVhbiwgY2hhbmdlZEVsZW06IGFueSkgPT4gYW55KSB7XG4gICAgICAgIGNoYW5nZWRFbGVtID0gdHJhbnNmb3JtZXIoaXNDb2xsZWN0aW9uLCBjaGFuZ2VkRWxlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQoY2hhbmdlZEVsZW0sIGlzQ29sbGVjdGlvbiwgcm91dGUsIFJlc3Rhbmd1bGFyKTtcbiAgfTtcblxuICBjb25maWcudHJhbnNmb3JtTG9jYWxFbGVtZW50cyA9IGlzVW5kZWZpbmVkKGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzKSA/XG4gICAgZmFsc2UgOlxuICAgIGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzO1xuXG4gIG9iamVjdC5zZXRUcmFuc2Zvcm1Pbmx5U2VydmVyRWxlbWVudHMgPSBmdW5jdGlvbiAoYWN0aXZlKSB7XG4gICAgY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMgPSAhYWN0aXZlO1xuICB9O1xuXG4gIGNvbmZpZy5mdWxsUmVzcG9uc2UgPSBpc1VuZGVmaW5lZChjb25maWcuZnVsbFJlc3BvbnNlKSA/IGZhbHNlIDogY29uZmlnLmZ1bGxSZXNwb25zZTtcbiAgb2JqZWN0LnNldEZ1bGxSZXNwb25zZSA9IGZ1bmN0aW9uIChmdWxsKSB7XG4gICAgY29uZmlnLmZ1bGxSZXNwb25zZSA9IGZ1bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICAvL0ludGVybmFsIHZhbHVlcyBhbmQgZnVuY3Rpb25zXG4gIGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeSA9IHt9O1xuXG4gIC8qKlxuICAgKiBCYXNlIFVSTCBDcmVhdG9yLiBCYXNlIHByb3RvdHlwZSBmb3IgZXZlcnl0aGluZyByZWxhdGVkIHRvIGl0XG4gICAqKi9cblxuICB2YXIgQmFzZUNyZWF0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIH07XG5cbiAgQmFzZUNyZWF0b3IucHJvdG90eXBlLnNldENvbmZpZyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBCYXNlQ3JlYXRvci5wcm90b3R5cGUucGFyZW50c0FycmF5ID0gZnVuY3Rpb24gKGN1cnJlbnQpIHtcbiAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICBwYXJlbnRzLnB1c2goY3VycmVudCk7XG4gICAgICBjdXJyZW50ID0gY3VycmVudFt0aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV07XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRzLnJldmVyc2UoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBSZXN0YW5ndWxhclJlc291cmNlKGNvbmZpZywgJGh0dHAsIHVybCwgY29uZmlndXJlcikge1xuICAgIHZhciByZXNvdXJjZSA9IHt9O1xuICAgIGVhY2goa2V5cyhjb25maWd1cmVyKSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIHZhbHVlID0gY29uZmlndXJlcltrZXldO1xuXG4gICAgICAvLyBBZGQgZGVmYXVsdCBwYXJhbWV0ZXJzXG4gICAgICB2YWx1ZS5wYXJhbXMgPSBleHRlbmQoe30sIHZhbHVlLnBhcmFtcywgY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zW3ZhbHVlLm1ldGhvZC50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAvLyBXZSBkb24ndCB3YW50IHRoZSA/IGlmIG5vIHBhcmFtcyBhcmUgdGhlcmVcbiAgICAgIGlmIChpc0VtcHR5KHZhbHVlLnBhcmFtcykpIHtcbiAgICAgICAgZGVsZXRlIHZhbHVlLnBhcmFtcztcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5pc1NhZmUodmFsdWUubWV0aG9kKSkge1xuXG4gICAgICAgIHJlc291cmNlW2tleV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGV0IGNvbmZpZyA9IGV4dGVuZCh2YWx1ZSwge1xuICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gJGh0dHAuY3JlYXRlUmVxdWVzdChjb25maWcpO1xuICAgICAgICB9O1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJlc291cmNlW2tleV0gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGxldCBjb25maWcgPSBleHRlbmQodmFsdWUsIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiAkaHR0cC5jcmVhdGVSZXF1ZXN0KGNvbmZpZyk7XG4gICAgICAgIH07XG5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfVxuXG4gIEJhc2VDcmVhdG9yLnByb3RvdHlwZS5yZXNvdXJjZSA9IGZ1bmN0aW9uIChjdXJyZW50LCAkaHR0cCwgbG9jYWxIdHRwQ29uZmlnLCBjYWxsSGVhZGVycywgY2FsbFBhcmFtcywgd2hhdCwgZXRhZywgb3BlcmF0aW9uKSB7XG4gICAgdmFyIHBhcmFtcyA9IGRlZmF1bHRzKGNhbGxQYXJhbXMgfHwge30sIHRoaXMuY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zLmNvbW1vbik7XG4gICAgdmFyIGhlYWRlcnMgPSBkZWZhdWx0cyhjYWxsSGVhZGVycyB8fCB7fSwgdGhpcy5jb25maWcuZGVmYXVsdEhlYWRlcnMpO1xuXG4gICAgaWYgKGV0YWcpIHtcbiAgICAgIGlmICghY29uZmlnLmlzU2FmZShvcGVyYXRpb24pKSB7XG4gICAgICAgIGhlYWRlcnNbJ0lmLU1hdGNoJ10gPSBldGFnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVhZGVyc1snSWYtTm9uZS1NYXRjaCddID0gZXRhZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdXJsID0gdGhpcy5iYXNlKGN1cnJlbnQpO1xuXG4gICAgaWYgKHdoYXQpIHtcbiAgICAgIHZhciBhZGQgPSAnJztcbiAgICAgIGlmICghL1xcLyQvLnRlc3QodXJsKSkge1xuICAgICAgICBhZGQgKz0gJy8nO1xuICAgICAgfVxuICAgICAgYWRkICs9IHdoYXQ7XG4gICAgICB1cmwgKz0gYWRkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5zdWZmaXggJiZcbiAgICAgIHVybC5pbmRleE9mKHRoaXMuY29uZmlnLnN1ZmZpeCwgdXJsLmxlbmd0aCAtIHRoaXMuY29uZmlnLnN1ZmZpeC5sZW5ndGgpID09PSAtMSAmJiAhdGhpcy5jb25maWcuZ2V0VXJsRnJvbUVsZW0oY3VycmVudCkpIHtcbiAgICAgIHVybCArPSB0aGlzLmNvbmZpZy5zdWZmaXg7XG4gICAgfVxuXG4gICAgY3VycmVudFt0aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBSZXN0YW5ndWxhclJlc291cmNlKHRoaXMuY29uZmlnLCAkaHR0cCwgdXJsLCB7XG4gICAgICBnZXRMaXN0OiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIGdldDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBqc29ucDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnanNvbnAnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIHB1dDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBwb3N0OiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICByZW1vdmU6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgaGVhZDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnSEVBRCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgdHJhY2U6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1RSQUNFJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBvcHRpb25zOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdPUFRJT05TJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBwYXRjaDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgUGF0aCBVUkwgY3JlYXRvci4gSXQgdXNlcyBQYXRoIHRvIHNob3cgSGllcmFyY2h5IGluIHRoZSBSZXN0IEFQSS5cbiAgICogVGhpcyBtZWFucyB0aGF0IGlmIHlvdSBoYXZlIGFuIEFjY291bnQgdGhhdCB0aGVuIGhhcyBhIHNldCBvZiBCdWlsZGluZ3MsIGEgVVJMIHRvIGEgYnVpbGRpbmdcbiAgICogd291bGQgYmUgL2FjY291bnRzLzEyMy9idWlsZGluZ3MvNDU2XG4gICAqKi9cbiAgdmFyIFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gIH07XG5cbiAgUGF0aC5wcm90b3R5cGUgPSBuZXcgQmFzZUNyZWF0b3IoKTtcblxuICBQYXRoLnByb3RvdHlwZS5ub3JtYWxpemVVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIHBhcnRzID0gLygoPzpodHRwW3NdPzopP1xcL1xcLyk/KC4qKT8vLmV4ZWModXJsKTtcbiAgICBwYXJ0c1syXSA9IHBhcnRzWzJdLnJlcGxhY2UoL1tcXFxcXFwvXSsvZywgJy8nKTtcbiAgICByZXR1cm4gKHR5cGVvZiBwYXJ0c1sxXSAhPT0gJ3VuZGVmaW5lZCcpID8gcGFydHNbMV0gKyBwYXJ0c1syXSA6IHBhcnRzWzJdO1xuICB9O1xuXG4gIFBhdGgucHJvdG90eXBlLmJhc2UgPSBmdW5jdGlvbiAoY3VycmVudCkge1xuICAgIHZhciBfX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiByZWR1Y2UodGhpcy5wYXJlbnRzQXJyYXkoY3VycmVudCksIGZ1bmN0aW9uIChhY3VtOiBhbnksIGVsZW06IGFueSkge1xuICAgICAgdmFyIGVsZW1Vcmw7XG4gICAgICB2YXIgZWxlbVNlbGZMaW5rID0gX190aGlzLmNvbmZpZy5nZXRVcmxGcm9tRWxlbShlbGVtKTtcbiAgICAgIGlmIChlbGVtU2VsZkxpbmspIHtcbiAgICAgICAgaWYgKF9fdGhpcy5jb25maWcuaXNBYnNvbHV0ZVVybChlbGVtU2VsZkxpbmspKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1TZWxmTGluaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtVXJsID0gZWxlbVNlbGZMaW5rO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtVXJsID0gZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXTtcblxuICAgICAgICBpZiAoZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICB2YXIgaWRzID0gZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkc107XG4gICAgICAgICAgaWYgKGlkcykge1xuICAgICAgICAgICAgZWxlbVVybCArPSAnLycgKyBpZHMuam9pbignLCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZWxlbUlkOiBhbnk7XG4gICAgICAgICAgaWYgKF9fdGhpcy5jb25maWcudXNlQ2Fubm9uaWNhbElkKSB7XG4gICAgICAgICAgICBlbGVtSWQgPSBfX3RoaXMuY29uZmlnLmdldENhbm5vbmljYWxJZEZyb21FbGVtKGVsZW0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtSWQgPSBfX3RoaXMuY29uZmlnLmdldElkRnJvbUVsZW0oZWxlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbmZpZy5pc1ZhbGlkSWQoZWxlbUlkKSAmJiAhZWxlbS5zaW5nbGVPbmUpIHtcbiAgICAgICAgICAgIGVsZW1VcmwgKz0gJy8nICsgKF9fdGhpcy5jb25maWcuZW5jb2RlSWRzID8gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1JZCkgOiBlbGVtSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWN1bSA9IGFjdW0ucmVwbGFjZSgvXFwvJC8sICcnKSArICcvJyArIGVsZW1Vcmw7XG4gICAgICByZXR1cm4gX190aGlzLm5vcm1hbGl6ZVVybChhY3VtKTtcblxuICAgIH0sIHRoaXMuY29uZmlnLmJhc2VVcmwpO1xuICB9O1xuXG5cbiAgUGF0aC5wcm90b3R5cGUuZmV0Y2hVcmwgPSBmdW5jdGlvbiAoY3VycmVudCwgd2hhdCkge1xuICAgIHZhciBiYXNlVXJsID0gdGhpcy5iYXNlKGN1cnJlbnQpO1xuICAgIGlmICh3aGF0KSB7XG4gICAgICBiYXNlVXJsICs9ICcvJyArIHdoYXQ7XG4gICAgfVxuICAgIHJldHVybiBiYXNlVXJsO1xuICB9O1xuXG4gIFBhdGgucHJvdG90eXBlLmZldGNoUmVxdWVzdGVkVXJsID0gZnVuY3Rpb24gKGN1cnJlbnQsIHdoYXQpIHtcbiAgICB2YXIgdXJsID0gdGhpcy5mZXRjaFVybChjdXJyZW50LCB3aGF0KTtcbiAgICB2YXIgcGFyYW1zID0gY3VycmVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVxUGFyYW1zXTtcblxuICAgIC8vIEZyb20gaGVyZSBvbiBhbmQgdW50aWwgdGhlIGVuZCBvZiBmZXRjaFJlcXVlc3RlZFVybCxcbiAgICAvLyB0aGUgY29kZSBoYXMgYmVlbiBraW5kbHkgYm9ycm93ZWQgZnJvbSBhbmd1bGFyLmpzXG4gICAgLy8gVGhlIHJlYXNvbiBmb3Igc3VjaCBjb2RlIGJsb2F0aW5nIGlzIGNvaGVyZW5jZTpcbiAgICAvLyAgIElmIHRoZSB1c2VyIHdlcmUgdG8gdXNlIHRoaXMgZm9yIGNhY2hlIG1hbmFnZW1lbnQsIHRoZVxuICAgIC8vICAgc2VyaWFsaXphdGlvbiBvZiBwYXJhbWV0ZXJzIHdvdWxkIG5lZWQgdG8gYmUgaWRlbnRpY2FsXG4gICAgLy8gICB0byB0aGUgb25lIGRvbmUgYnkgYW5ndWxhciBmb3IgY2FjaGUga2V5cyB0byBtYXRjaC5cbiAgICBmdW5jdGlvbiBzb3J0ZWRLZXlzKG9iaikge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXlzLnNvcnQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JFYWNoU29ydGVkKG9iaiwgaXRlcmF0b3I/LCBjb250ZXh0Pykge1xuICAgICAgdmFyIGtleXMgPSBzb3J0ZWRLZXlzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5c1tpXV0sIGtleXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5jb2RlVXJpUXVlcnkodmFsLCBwY3RFbmNvZGVTcGFjZXM/KSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkucmVwbGFjZSgvJTQwL2dpLCAnQCcpLnJlcGxhY2UoLyUzQS9naSwgJzonKS5yZXBsYWNlKC8lMjQvZywgJyQnKS5yZXBsYWNlKC8lMkMvZ2ksICcsJykucmVwbGFjZSgvJTIwL2csIChwY3RFbmNvZGVTcGFjZXMgPyAnJTIwJyA6ICcrJykpO1xuICAgIH1cblxuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICByZXR1cm4gdXJsICsgKHRoaXMuY29uZmlnLnN1ZmZpeCB8fCAnJyk7XG4gICAgfVxuXG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgZm9yRWFjaFNvcnRlZChwYXJhbXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgIH1cblxuICAgICAgZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlVXJpUXVlcnkoa2V5KSArICc9JyArIGVuY29kZVVyaVF1ZXJ5KHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVybCArICh0aGlzLmNvbmZpZy5zdWZmaXggfHwgJycpICsgKCh1cmwuaW5kZXhPZignPycpID09PSAtMSkgPyAnPycgOiAnJicpICsgcGFydHMuam9pbignJicpO1xuICB9O1xuXG4gIGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeS5wYXRoID0gUGF0aDtcbn1cbiJdfQ==