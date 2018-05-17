/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { assign } from 'core-js/fn/object';
import { map, bind, union, values, pick, isEmpty, isFunction, isNumber, isUndefined, isArray, isObject, extend, each, every, omit, get, defaults, clone, cloneDeep, includes } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RESTANGULAR } from './ngx-restangular.config';
import { RestangularHttp } from './ngx-restangular-http';
import { RestangularConfigurer } from './ngx-restangular-config.factory';
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
        var /** @type {?} */ arrDI = map(this.configObj.arrServices, function (services) {
            return _this.injector.get(services);
        });
        (_a = this.configObj).fn.apply(_a, tslib_1.__spread([this.provider], arrDI));
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
export { Restangular };
function Restangular_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    Restangular.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    Restangular.ctorParameters;
    /** @type {?} */
    Restangular.prototype.provider;
    /** @type {?} */
    Restangular.prototype.addElementTransformer;
    /** @type {?} */
    Restangular.prototype.extendCollection;
    /** @type {?} */
    Restangular.prototype.extendModel;
    /** @type {?} */
    Restangular.prototype.copy;
    /** @type {?} */
    Restangular.prototype.configuration;
    /** @type {?} */
    Restangular.prototype.service;
    /** @type {?} */
    Restangular.prototype.id;
    /** @type {?} */
    Restangular.prototype.route;
    /** @type {?} */
    Restangular.prototype.parentResource;
    /** @type {?} */
    Restangular.prototype.restangularCollection;
    /** @type {?} */
    Restangular.prototype.cannonicalId;
    /** @type {?} */
    Restangular.prototype.etag;
    /** @type {?} */
    Restangular.prototype.selfLink;
    /** @type {?} */
    Restangular.prototype.get;
    /** @type {?} */
    Restangular.prototype.getList;
    /** @type {?} */
    Restangular.prototype.put;
    /** @type {?} */
    Restangular.prototype.post;
    /** @type {?} */
    Restangular.prototype.remove;
    /** @type {?} */
    Restangular.prototype.head;
    /** @type {?} */
    Restangular.prototype.trace;
    /** @type {?} */
    Restangular.prototype.options;
    /** @type {?} */
    Restangular.prototype.patch;
    /** @type {?} */
    Restangular.prototype.getRestangularUrl;
    /** @type {?} */
    Restangular.prototype.getRequestedUrl;
    /** @type {?} */
    Restangular.prototype.putElement;
    /** @type {?} */
    Restangular.prototype.addRestangularMethod;
    /** @type {?} */
    Restangular.prototype.getParentList;
    /** @type {?} */
    Restangular.prototype.clone;
    /** @type {?} */
    Restangular.prototype.ids;
    /** @type {?} */
    Restangular.prototype.httpConfig;
    /** @type {?} */
    Restangular.prototype.reqParams;
    /** @type {?} */
    Restangular.prototype.one;
    /** @type {?} */
    Restangular.prototype.all;
    /** @type {?} */
    Restangular.prototype.several;
    /** @type {?} */
    Restangular.prototype.oneUrl;
    /** @type {?} */
    Restangular.prototype.allUrl;
    /** @type {?} */
    Restangular.prototype.customPUT;
    /** @type {?} */
    Restangular.prototype.customPATCH;
    /** @type {?} */
    Restangular.prototype.customPOST;
    /** @type {?} */
    Restangular.prototype.customDELETE;
    /** @type {?} */
    Restangular.prototype.customGET;
    /** @type {?} */
    Restangular.prototype.customGETLIST;
    /** @type {?} */
    Restangular.prototype.customOperation;
    /** @type {?} */
    Restangular.prototype.doPUT;
    /** @type {?} */
    Restangular.prototype.doPATCH;
    /** @type {?} */
    Restangular.prototype.doPOST;
    /** @type {?} */
    Restangular.prototype.doDELETE;
    /** @type {?} */
    Restangular.prototype.doGET;
    /** @type {?} */
    Restangular.prototype.doGETLIST;
    /** @type {?} */
    Restangular.prototype.fromServer;
    /** @type {?} */
    Restangular.prototype.withConfig;
    /** @type {?} */
    Restangular.prototype.withHttpConfig;
    /** @type {?} */
    Restangular.prototype.singleOne;
    /** @type {?} */
    Restangular.prototype.plain;
    /** @type {?} */
    Restangular.prototype.save;
    /** @type {?} */
    Restangular.prototype.restangularized;
    /** @type {?} */
    Restangular.prototype.restangularizeElement;
    /** @type {?} */
    Restangular.prototype.restangularizeCollection;
    /** @type {?} */
    Restangular.prototype.configObj;
    /** @type {?} */
    Restangular.prototype.injector;
    /** @type {?} */
    Restangular.prototype.http;
}
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
                    var /** @type {?} */ processedData = map(data, function (elem) {
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
    ;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJlc3Rhbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL25neC1yZXN0YW5ndWxhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssRUFDTCxNQUFNLEVBQ04sSUFBSSxFQUNKLE9BQU8sRUFDUCxVQUFVLEVBQ1YsUUFBUSxFQUNSLFdBQVcsRUFDWCxPQUFPLEVBQ1AsUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixHQUFHLEVBQ0gsUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNULE1BQU0sUUFBUSxDQUFDO0FBRWhCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBdUd2RSxxQkFDMEMsV0FDaEMsVUFDQTtRQUZnQyxjQUFTLEdBQVQsU0FBUztRQUN6QyxhQUFRLEdBQVIsUUFBUTtRQUNSLFNBQUksR0FBSixJQUFJO1FBRVosSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxxQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FB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QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRWxFLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFdEYsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNoQjtRQUVELE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQzNEO0lBQUEsQ0FBQztDQUVIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3RvciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFzc2lnbiB9IGZyb20gJ2NvcmUtanMvZm4vb2JqZWN0JztcbmltcG9ydCB7XG4gIG1hcCxcbiAgYmluZCxcbiAgdW5pb24sXG4gIHZhbHVlcyxcbiAgcGljayxcbiAgaXNFbXB0eSxcbiAgaXNGdW5jdGlvbixcbiAgaXNOdW1iZXIsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0FycmF5LFxuICBpc09iamVjdCxcbiAgZXh0ZW5kLFxuICBlYWNoLFxuICBldmVyeSxcbiAgb21pdCxcbiAgZ2V0LFxuICBkZWZhdWx0cyxcbiAgY2xvbmUsXG4gIGNsb25lRGVlcCxcbiAgaW5jbHVkZXNcbn0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFJFU1RBTkdVTEFSIH0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXIuY29uZmlnJztcbmltcG9ydCB7IFJlc3Rhbmd1bGFySHR0cCB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLWh0dHAnO1xuaW1wb3J0IHsgUmVzdGFuZ3VsYXJDb25maWd1cmVyIH0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXItY29uZmlnLmZhY3RvcnknO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzdGFuZ3VsYXIge1xuICBwcm92aWRlcjoge1xuICAgIHNldEJhc2VVcmw6IGFueSxcbiAgICBzZXREZWZhdWx0SGVhZGVyczogYW55LFxuICAgIGNvbmZpZ3VyYXRpb246IGFueSxcbiAgICBzZXRTZWxmTGlua0Fic29sdXRlVXJsOiBhbnksXG4gICAgc2V0RXh0cmFGaWVsZHM6IGFueSxcbiAgICBzZXREZWZhdWx0SHR0cEZpZWxkczogYW55LFxuICAgIHNldFBsYWluQnlEZWZhdWx0OiBhbnksXG4gICAgc2V0RW5jb2RlSWRzOiBhbnksXG4gICAgc2V0RGVmYXVsdFJlcXVlc3RQYXJhbXM6IGFueSxcbiAgICByZXF1ZXN0UGFyYW1zOiBhbnksXG4gICAgZGVmYXVsdEhlYWRlcnM6IGFueSxcbiAgICBzZXREZWZhdWx0UmVzcG9uc2VNZXRob2Q6IGFueSxcbiAgICBkZWZhdWx0UmVzcG9uc2VNZXRob2Q6IGFueSxcbiAgICBzZXRNZXRob2RPdmVycmlkZXJzOiBhbnksXG4gICAgc2V0SnNvbnA6IGFueSxcbiAgICBzZXRVcmxDcmVhdG9yOiBhbnksXG4gICAgc2V0UmVzdGFuZ3VsYXJGaWVsZHM6IGFueSxcbiAgICBzZXRVc2VDYW5ub25pY2FsSWQ6IGFueSxcbiAgICBhZGRSZXNwb25zZUludGVyY2VwdG9yOiBhbnksXG4gICAgYWRkRXJyb3JJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldFJlc3BvbnNlSW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRSZXNwb25zZUV4dHJhY3RvcjogYW55LFxuICAgIHNldEVycm9ySW50ZXJjZXB0b3I6IGFueSxcbiAgICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRSZXF1ZXN0SW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRGdWxsUmVxdWVzdEludGVyY2VwdG9yOiBhbnksXG4gICAgYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldE9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZDogYW55LFxuICAgIHNldFJlc3Rhbmd1bGFyaXplUHJvbWlzZUludGVyY2VwdG9yOiBhbnksXG4gICAgc2V0T25FbGVtUmVzdGFuZ3VsYXJpemVkOiBhbnksXG4gICAgc2V0UGFyZW50bGVzczogYW55LFxuICAgIHNldFJlcXVlc3RTdWZmaXg6IGFueSxcbiAgICBhZGRFbGVtZW50VHJhbnNmb3JtZXI6IGFueSxcbiAgICBleHRlbmRDb2xsZWN0aW9uOiBhbnksXG4gICAgZXh0ZW5kTW9kZWw6IGFueSxcbiAgICBzZXRUcmFuc2Zvcm1Pbmx5U2VydmVyRWxlbWVudHM6IGFueSxcbiAgICBzZXRGdWxsUmVzcG9uc2U6IGFueSxcbiAgICAkZ2V0OiBhbnlcbiAgfTtcbiAgYWRkRWxlbWVudFRyYW5zZm9ybWVyOiBhbnk7XG4gIGV4dGVuZENvbGxlY3Rpb246IGFueTtcbiAgZXh0ZW5kTW9kZWw6IGFueTtcbiAgY29weTtcbiAgY29uZmlndXJhdGlvbjtcbiAgc2VydmljZTtcbiAgaWQ7XG4gIHJvdXRlO1xuICBwYXJlbnRSZXNvdXJjZTtcbiAgcmVzdGFuZ3VsYXJDb2xsZWN0aW9uO1xuICBjYW5ub25pY2FsSWQ7XG4gIGV0YWc7XG4gIHNlbGZMaW5rO1xuICBnZXQ7XG4gIGdldExpc3Q7XG4gIHB1dDtcbiAgcG9zdDtcbiAgcmVtb3ZlO1xuICBoZWFkO1xuICB0cmFjZTtcbiAgb3B0aW9ucztcbiAgcGF0Y2g7XG4gIGdldFJlc3Rhbmd1bGFyVXJsO1xuICBnZXRSZXF1ZXN0ZWRVcmw7XG4gIHB1dEVsZW1lbnQ7XG4gIGFkZFJlc3Rhbmd1bGFyTWV0aG9kO1xuICBnZXRQYXJlbnRMaXN0O1xuICBjbG9uZTtcbiAgaWRzO1xuICBodHRwQ29uZmlnO1xuICByZXFQYXJhbXM7XG4gIG9uZTtcbiAgYWxsO1xuICBzZXZlcmFsO1xuICBvbmVVcmw7XG4gIGFsbFVybDtcbiAgY3VzdG9tUFVUO1xuICBjdXN0b21QQVRDSDtcbiAgY3VzdG9tUE9TVDtcbiAgY3VzdG9tREVMRVRFO1xuICBjdXN0b21HRVQ7XG4gIGN1c3RvbUdFVExJU1Q7XG4gIGN1c3RvbU9wZXJhdGlvbjtcbiAgZG9QVVQ7XG4gIGRvUEFUQ0g7XG4gIGRvUE9TVDtcbiAgZG9ERUxFVEU7XG4gIGRvR0VUO1xuICBkb0dFVExJU1Q7XG4gIGZyb21TZXJ2ZXI7XG4gIHdpdGhDb25maWc7XG4gIHdpdGhIdHRwQ29uZmlnO1xuICBzaW5nbGVPbmU7XG4gIHBsYWluO1xuICBzYXZlO1xuICByZXN0YW5ndWxhcml6ZWQ7XG4gIHJlc3Rhbmd1bGFyaXplRWxlbWVudDtcbiAgcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUkVTVEFOR1VMQVIpIHB1YmxpYyBjb25maWdPYmosXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBodHRwOiBSZXN0YW5ndWxhckh0dHBcbiAgKSB7XG4gICAgdGhpcy5wcm92aWRlciA9IG5ldyBwcm92aWRlckNvbmZpZyhodHRwKTtcbiAgICBsZXQgZWxlbWVudCA9IHRoaXMucHJvdmlkZXIuJGdldCgpO1xuICAgIGFzc2lnbih0aGlzLCBlbGVtZW50KTtcblxuICAgIHRoaXMuc2V0RGVmYXVsdENvbmZpZygpO1xuICB9XG5cbiAgc2V0RGVmYXVsdENvbmZpZygpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnT2JqIHx8ICFpc0Z1bmN0aW9uKHRoaXMuY29uZmlnT2JqLmZuKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhcnJESSA9IG1hcCh0aGlzLmNvbmZpZ09iai5hcnJTZXJ2aWNlcywgKHNlcnZpY2VzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoc2VydmljZXMpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb25maWdPYmouZm4oLi4uW3RoaXMucHJvdmlkZXIsIC4uLmFyckRJXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvdmlkZXJDb25maWcoJGh0dHApIHtcbiAgdmFyIGdsb2JhbENvbmZpZ3VyYXRpb24gPSB7fTtcblxuICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIodGhpcywgZ2xvYmFsQ29uZmlndXJhdGlvbik7XG5cbiAgdGhpcy4kZ2V0ID0gJGdldFxuXG4gIGZ1bmN0aW9uICRnZXQoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgIHZhciBzZXJ2aWNlOiBhbnkgPSB7fTtcblxuICAgICAgdmFyIHVybEhhbmRsZXIgPSBuZXcgY29uZmlnLnVybENyZWF0b3JGYWN0b3J5W2NvbmZpZy51cmxDcmVhdG9yXSgpO1xuICAgICAgdXJsSGFuZGxlci5zZXRDb25maWcoY29uZmlnKTtcblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcikge1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0gPSByb3V0ZTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UmVzdGFuZ3VsYXJVcmxdID0gYmluZCh1cmxIYW5kbGVyLmZldGNoVXJsLCB1cmxIYW5kbGVyLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UmVxdWVzdGVkVXJsXSA9IGJpbmQodXJsSGFuZGxlci5mZXRjaFJlcXVlc3RlZFVybCwgdXJsSGFuZGxlciwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmFkZFJlc3Rhbmd1bGFyTWV0aG9kXSA9IGJpbmQoYWRkUmVzdGFuZ3VsYXJNZXRob2RGdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNsb25lXSA9IGJpbmQoY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQsIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXFQYXJhbXNdID0gaXNFbXB0eShyZXFQYXJhbXMpID8gbnVsbCA6IHJlcVBhcmFtcztcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMud2l0aEh0dHBDb25maWddID0gYmluZCh3aXRoSHR0cENvbmZpZywgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBsYWluXSA9IGJpbmQoc3RyaXBSZXN0YW5ndWxhciwgZWxlbSwgZWxlbSk7XG5cbiAgICAgICAgLy8gVGFnIGVsZW1lbnQgYXMgcmVzdGFuZ3VsYXJpemVkXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyaXplZF0gPSB0cnVlO1xuXG4gICAgICAgIC8vIFJlcXVlc3RMZXNzIGNvbm5lY3Rpb25cbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub25lXSA9IGJpbmQob25lLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuYWxsXSA9IGJpbmQoYWxsLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2V2ZXJhbF0gPSBiaW5kKHNldmVyYWwsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5vbmVVcmxdID0gYmluZChvbmVVcmwsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5hbGxVcmxdID0gYmluZChhbGxVcmwsIGVsZW0sIGVsZW0pO1xuXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdID0gISFmcm9tU2VydmVyO1xuXG4gICAgICAgIGlmIChwYXJlbnQgJiYgY29uZmlnLnNob3VsZFNhdmVQYXJlbnQocm91dGUpKSB7XG4gICAgICAgICAgdmFyIHBhcmVudElkID0gY29uZmlnLmdldElkRnJvbUVsZW0ocGFyZW50KTtcbiAgICAgICAgICB2YXIgcGFyZW50VXJsID0gY29uZmlnLmdldFVybEZyb21FbGVtKHBhcmVudCk7XG5cbiAgICAgICAgICB2YXIgcmVzdGFuZ3VsYXJGaWVsZHNGb3JQYXJlbnQgPSB1bmlvbihcbiAgICAgICAgICAgIHZhbHVlcyhwaWNrKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgWydyb3V0ZScsICdzaW5nbGVPbmUnLCAncGFyZW50UmVzb3VyY2UnXSkpLFxuICAgICAgICAgICAgY29uZmlnLmV4dHJhRmllbGRzXG4gICAgICAgICAgKTtcbiAgICAgICAgICB2YXIgcGFyZW50UmVzb3VyY2UgPSBwaWNrKHBhcmVudCwgcmVzdGFuZ3VsYXJGaWVsZHNGb3JQYXJlbnQpO1xuXG4gICAgICAgICAgaWYgKGNvbmZpZy5pc1ZhbGlkSWQocGFyZW50SWQpKSB7XG4gICAgICAgICAgICBjb25maWcuc2V0SWRUb0VsZW0ocGFyZW50UmVzb3VyY2UsIHBhcmVudElkLCByb3V0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb25maWcuaXNWYWxpZElkKHBhcmVudFVybCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5zZXRVcmxUb0VsZW0ocGFyZW50UmVzb3VyY2UsIHBhcmVudFVybCwgcm91dGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSA9IHBhcmVudFJlc291cmNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uZShwYXJlbnQsIHJvdXRlLCBpZCwgc2luZ2xlT25lKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgaWYgKGlzTnVtYmVyKHJvdXRlKSB8fCBpc051bWJlcihwYXJlbnQpKSB7XG4gICAgICAgICAgZXJyb3IgPSAnWW91XFwncmUgY3JlYXRpbmcgYSBSZXN0YW5ndWxhciBlbnRpdHkgd2l0aCB0aGUgbnVtYmVyICc7XG4gICAgICAgICAgZXJyb3IgKz0gJ2luc3RlYWQgb2YgdGhlIHJvdXRlIG9yIHRoZSBwYXJlbnQuIEZvciBleGFtcGxlLCB5b3UgY2FuXFwndCBjYWxsIC5vbmUoMTIpLic7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNVbmRlZmluZWQocm91dGUpKSB7XG4gICAgICAgICAgZXJyb3IgPSAnWW91XFwncmUgY3JlYXRpbmcgYSBSZXN0YW5ndWxhciBlbnRpdHkgZWl0aGVyIHdpdGhvdXQgdGhlIHBhdGguICc7XG4gICAgICAgICAgZXJyb3IgKz0gJ0ZvciBleGFtcGxlIHlvdSBjYW5cXCd0IGNhbGwgLm9uZSgpLiBQbGVhc2UgY2hlY2sgaWYgeW91ciBhcmd1bWVudHMgYXJlIHZhbGlkLic7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbSA9IHt9O1xuICAgICAgICBjb25maWcuc2V0SWRUb0VsZW0oZWxlbSwgaWQsIHJvdXRlKTtcbiAgICAgICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zaW5nbGVPbmUsIGVsZW0sIHNpbmdsZU9uZSk7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhbGwocGFyZW50LCByb3V0ZSkge1xuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKHBhcmVudCwgW10sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldmVyYWwocGFyZW50LCByb3V0ZSAvKiwgaWRzICovKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gW107XG4gICAgICAgIGNvbGxlY3Rpb25bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkc10gPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGNvbGxlY3Rpb24sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uZVVybChwYXJlbnQsIHJvdXRlLCB1cmwpIHtcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm91dGUgaXMgbWFuZGF0b3J5IHdoZW4gY3JlYXRpbmcgbmV3IFJlc3Rhbmd1bGFyIG9iamVjdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW0gPSB7fTtcbiAgICAgICAgY29uZmlnLnNldFVybFRvRWxlbShlbGVtLCB1cmwsIHJvdXRlKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShwYXJlbnQsIGVsZW0sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFsbFVybChwYXJlbnQsIHJvdXRlLCB1cmwpIHtcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm91dGUgaXMgbWFuZGF0b3J5IHdoZW4gY3JlYXRpbmcgbmV3IFJlc3Rhbmd1bGFyIG9iamVjdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW0gPSB7fTtcbiAgICAgICAgY29uZmlnLnNldFVybFRvRWxlbShlbGVtLCB1cmwsIHJvdXRlKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW0sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByb21pc2VzXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZVJlc3BvbnNlKHN1YmplY3QsIGlzQ29sbGVjdGlvbiwgdmFsdWVUb0ZpbGwpIHtcbiAgICAgICAgcmV0dXJuIHN1YmplY3QucGlwZShmaWx0ZXIocmVzID0+ICEhcmVzKSkudG9Qcm9taXNlKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBkYXRhLCBmaWxsZWRWYWx1ZSkge1xuICAgICAgICBleHRlbmQoZmlsbGVkVmFsdWUsIGRhdGEpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIGZ1bGwgcmVzcG9uc2UgaW50ZXJjZXB0b3IuXG4gICAgICAgIGlmIChjb25maWcuZnVsbFJlc3BvbnNlKSB7XG4gICAgICAgICAgc3ViamVjdC5uZXh0KGV4dGVuZChyZXNwb25zZSwge1xuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJqZWN0Lm5leHQoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVsZW1lbnRzXG4gICAgICBmdW5jdGlvbiBzdHJpcFJlc3Rhbmd1bGFyKGVsZW0pIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoZWxlbSkpIHtcbiAgICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgICBlYWNoKGVsZW0sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQodmFsdWUpID8gc3RyaXBSZXN0YW5ndWxhcih2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvbWl0KGVsZW0sIHZhbHVlcyhvbWl0KGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgJ2lkJykpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRDdXN0b21PcGVyYXRpb24oZWxlbSkge1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21PcGVyYXRpb25dID0gYmluZChjdXN0b21GdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIHZhciByZXF1ZXN0TWV0aG9kcyA9IHtnZXQ6IGN1c3RvbUZ1bmN0aW9uLCBkZWxldGU6IGN1c3RvbUZ1bmN0aW9ufTtcbiAgICAgICAgZWFjaChbJ3B1dCcsICdwYXRjaCcsICdwb3N0J10sIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgcmVxdWVzdE1ldGhvZHNbbmFtZV0gPSBmdW5jdGlvbiAob3BlcmF0aW9uLCBlbGVtLCBwYXRoLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5kKGN1c3RvbUZ1bmN0aW9uLCB0aGlzKShvcGVyYXRpb24sIHBhdGgsIHBhcmFtcywgaGVhZGVycywgZWxlbSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2gocmVxdWVzdE1ldGhvZHMsIGZ1bmN0aW9uIChyZXF1ZXN0RnVuYywgbmFtZSkge1xuICAgICAgICAgIHZhciBjYWxsT3BlcmF0aW9uID0gbmFtZSA9PT0gJ2RlbGV0ZScgPyAncmVtb3ZlJyA6IG5hbWU7XG4gICAgICAgICAgZWFjaChbJ2RvJywgJ2N1c3RvbSddLCBmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgICAgIGVsZW1bYWxpYXMgKyBuYW1lLnRvVXBwZXJDYXNlKCldID0gYmluZChyZXF1ZXN0RnVuYywgZWxlbSwgY2FsbE9wZXJhdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21HRVRMSVNUXSA9IGJpbmQoZmV0Y2hGdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmRvR0VUTElTVF0gPSBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21HRVRMSVNUXTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgY29waWVkRWxlbWVudCA9IGNsb25lRGVlcChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShjb3BpZWRFbGVtZW50W2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0sXG4gICAgICAgICAgY29waWVkRWxlbWVudCwgY29waWVkRWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVFbGVtKHBhcmVudCwgZWxlbWVudCwgcm91dGUsIGZyb21TZXJ2ZXI/LCBjb2xsZWN0aW9uPywgcmVxUGFyYW1zPykge1xuICAgICAgICB2YXIgZWxlbSA9IGNvbmZpZy5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQoZWxlbWVudCwgZmFsc2UsIHJvdXRlKTtcblxuICAgICAgICB2YXIgbG9jYWxFbGVtID0gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcik7XG5cbiAgICAgICAgaWYgKGNvbmZpZy51c2VDYW5ub25pY2FsSWQpIHtcbiAgICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNhbm5vbmljYWxJZF0gPSBjb25maWcuZ2V0SWRGcm9tRWxlbShsb2NhbEVsZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldFBhcmVudExpc3RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSA9IGZhbHNlO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldF0gPSBiaW5kKGdldEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldExpc3RdID0gYmluZChmZXRjaEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dF0gPSBiaW5kKHB1dEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBvc3RdID0gYmluZChwb3N0RnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVtb3ZlXSA9IGJpbmQoZGVsZXRlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaGVhZF0gPSBiaW5kKGhlYWRGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy50cmFjZV0gPSBiaW5kKHRyYWNlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub3B0aW9uc10gPSBiaW5kKG9wdGlvbnNGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXRjaF0gPSBiaW5kKHBhdGNoRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2F2ZV0gPSBiaW5kKHNhdmUsIGxvY2FsRWxlbSk7XG5cbiAgICAgICAgYWRkQ3VzdG9tT3BlcmF0aW9uKGxvY2FsRWxlbSk7XG4gICAgICAgIHJldHVybiBjb25maWcudHJhbnNmb3JtRWxlbShsb2NhbEVsZW0sIGZhbHNlLCByb3V0ZSwgc2VydmljZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBmcm9tU2VydmVyPywgcmVxUGFyYW1zPykge1xuICAgICAgICB2YXIgZWxlbSA9IGNvbmZpZy5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQoZWxlbWVudCwgdHJ1ZSwgcm91dGUpO1xuXG4gICAgICAgIHZhciBsb2NhbEVsZW0gPSByZXN0YW5ndWxhcml6ZUJhc2UocGFyZW50LCBlbGVtLCByb3V0ZSwgcmVxUGFyYW1zLCBmcm9tU2VydmVyKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dID0gdHJ1ZTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wb3N0XSA9IGJpbmQocG9zdEZ1bmN0aW9uLCBsb2NhbEVsZW0sIG51bGwpO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlbW92ZV0gPSBiaW5kKGRlbGV0ZUZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmhlYWRdID0gYmluZChoZWFkRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMudHJhY2VdID0gYmluZCh0cmFjZUZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dEVsZW1lbnRdID0gYmluZChwdXRFbGVtZW50RnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub3B0aW9uc10gPSBiaW5kKG9wdGlvbnNGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXRjaF0gPSBiaW5kKHBhdGNoRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0XSA9IGJpbmQoZ2V0QnlJZCwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5nZXRMaXN0XSA9IGJpbmQoZmV0Y2hGdW5jdGlvbiwgbG9jYWxFbGVtLCBudWxsKTtcblxuICAgICAgICBhZGRDdXN0b21PcGVyYXRpb24obG9jYWxFbGVtKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy50cmFuc2Zvcm1FbGVtKGxvY2FsRWxlbSwgdHJ1ZSwgcm91dGUsIHNlcnZpY2UsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb25BbmRFbGVtZW50cyhwYXJlbnQsIGVsZW1lbnQsIHJvdXRlKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKHBhcmVudCwgZWxlbWVudCwgcm91dGUsIGZhbHNlKTtcbiAgICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRCeUlkKGlkLCByZXFQYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tR0VUKGlkLnRvU3RyaW5nKCksIHJlcVBhcmFtcywgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHB1dEVsZW1lbnRGdW5jdGlvbihpZHgsIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGVsZW1Ub1B1dCA9IHRoaXNbaWR4XTtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICB2YXIgZmlsbGVkQXJyYXkgPSBbXTtcbiAgICAgICAgZmlsbGVkQXJyYXkgPSBjb25maWcudHJhbnNmb3JtRWxlbShmaWxsZWRBcnJheSwgdHJ1ZSwgZWxlbVRvUHV0W2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0sIHNlcnZpY2UpO1xuXG4gICAgICAgIGVsZW1Ub1B1dC5wdXQocGFyYW1zLCBoZWFkZXJzKVxuICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZXJ2ZXJFbGVtKSB7XG4gICAgICAgICAgdmFyIG5ld0FycmF5ID0gY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQoX190aGlzKTtcbiAgICAgICAgICBuZXdBcnJheVtpZHhdID0gc2VydmVyRWxlbTtcbiAgICAgICAgICBmaWxsZWRBcnJheSA9IG5ld0FycmF5O1xuICAgICAgICAgIHN1YmplY3QubmV4dChuZXdBcnJheSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHN1YmplY3QuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVSZXNwb25zZShzdWJqZWN0LCB0cnVlLCBmaWxsZWRBcnJheSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBhcnNlUmVzcG9uc2UocmVzRGF0YSwgb3BlcmF0aW9uLCByb3V0ZSwgZmV0Y2hVcmwsIHJlc3BvbnNlLCBzdWJqZWN0KSB7XG4gICAgICAgIHZhciBkYXRhID0gY29uZmlnLnJlc3BvbnNlRXh0cmFjdG9yKHJlc0RhdGEsIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLCByZXNwb25zZSwgc3ViamVjdCk7XG4gICAgICAgIHZhciBldGFnID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0VUYWcnKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZXRhZykge1xuICAgICAgICAgIGRhdGFbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddID0gZXRhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmV0Y2hGdW5jdGlvbih3aGF0LCByZXFQYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgdmFyIF9fdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICAgICAgdmFyIG9wZXJhdGlvbiA9ICdnZXRMaXN0JztcbiAgICAgICAgdmFyIHVybCA9IHVybEhhbmRsZXIuZmV0Y2hVcmwodGhpcywgd2hhdCk7XG4gICAgICAgIHZhciB3aGF0RmV0Y2hlZCA9IHdoYXQgfHwgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV07XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBjb25maWcuZnVsbFJlcXVlc3RJbnRlcmNlcHRvcihudWxsLCBvcGVyYXRpb24sXG4gICAgICAgICAgd2hhdEZldGNoZWQsIHVybCwgaGVhZGVycyB8fCB7fSwgcmVxUGFyYW1zIHx8IHt9LCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSB8fCB7fSk7XG5cbiAgICAgICAgdmFyIGZpbGxlZEFycmF5ID0gW107XG4gICAgICAgIGZpbGxlZEFycmF5ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkQXJyYXksIHRydWUsIHdoYXRGZXRjaGVkLCBzZXJ2aWNlKTtcblxuICAgICAgICB2YXIgbWV0aG9kID0gJ2dldExpc3QnO1xuXG4gICAgICAgIGlmIChjb25maWcuanNvbnApIHtcbiAgICAgICAgICBtZXRob2QgPSAnanNvbnAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9rQ2FsbGJhY2sgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgcmVzRGF0YSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgdmFyIGZ1bGxQYXJhbXMgPSByZXNwb25zZS5jb25maWcucGFyYW1zO1xuICAgICAgICAgIHZhciBkYXRhID0gcGFyc2VSZXNwb25zZShyZXNEYXRhLCBvcGVyYXRpb24sIHdoYXRGZXRjaGVkLCB1cmwsIHJlc3BvbnNlLCBzdWJqZWN0KTtcblxuICAgICAgICAgIC8vIHN1cHBvcnQgZW1wdHkgcmVzcG9uc2UgZm9yIGdldExpc3QoKSBjYWxscyAoc29tZSBBUElzIHJlc3BvbmQgd2l0aCAyMDQgYW5kIGVtcHR5IGJvZHkpXG4gICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGRhdGEpIHx8ICcnID09PSBkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNwb25zZSBmb3IgZ2V0TGlzdCBTSE9VTEQgYmUgYW4gYXJyYXkgYW5kIG5vdCBhbiBvYmplY3Qgb3Igc29tZXRoaW5nIGVsc2UnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHJ1ZSA9PT0gY29uZmlnLnBsYWluQnlEZWZhdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIGRhdGEsIGZpbGxlZEFycmF5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IG1hcChkYXRhLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgICAgaWYgKCFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXMsIGVsZW0sIHdoYXQsIHRydWUsIGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBlbGVtLCBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSwgdHJ1ZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9jZXNzZWREYXRhID0gZXh0ZW5kKGRhdGEsIHByb2Nlc3NlZERhdGEpO1xuXG4gICAgICAgICAgaWYgKCFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKFxuICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgICAgcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgIF9fdGhpcyxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWREYXRhLFxuICAgICAgICAgICAgICAgIHdoYXQsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBmdWxsUGFyYW1zXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGZpbGxlZEFycmF5XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShcbiAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICAgIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWREYXRhLFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgZnVsbFBhcmFtc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBmaWxsZWRBcnJheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCByZXF1ZXN0LmhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLCB3aGF0LFxuICAgICAgICAgIHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddLCBvcGVyYXRpb24pW21ldGhvZF0oKVxuICAgICAgICAuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMzA0ICYmIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIF9fdGhpcywgZmlsbGVkQXJyYXkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlcnkoY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAoY2I6IGFueSkge1xuXG4gICAgICAgICAgICAgIHJldHVybiBjYihyZXNwb25zZSwgc3ViamVjdCwgb2tDYWxsYmFjaykgIT09IGZhbHNlO1xuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXJlZCBpZiBubyBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZVJlc3BvbnNlKHN1YmplY3QsIHRydWUsIGZpbGxlZEFycmF5KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gd2l0aEh0dHBDb25maWcoaHR0cENvbmZpZykge1xuICAgICAgICB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSA9IGh0dHBDb25maWc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzYXZlKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICBpZiAodGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZnJvbVNlcnZlcl0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucHV0XShwYXJhbXMsIGhlYWRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3Bvc3QnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbGVtRnVuY3Rpb24ob3BlcmF0aW9uLCB3aGF0LCBwYXJhbXMsIG9iaiwgaGVhZGVycykge1xuICAgICAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICB2YXIgcmVzUGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgICB2YXIgcm91dGUgPSB3aGF0IHx8IHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXTtcbiAgICAgICAgdmFyIGZldGNoVXJsID0gdXJsSGFuZGxlci5mZXRjaFVybCh0aGlzLCB3aGF0KTtcblxuICAgICAgICB2YXIgY2FsbE9iaiA9IG9iaiB8fCB0aGlzO1xuICAgICAgICAvLyBmYWxsYmFjayB0byBldGFnIG9uIHJlc3Rhbmd1bGFyIG9iamVjdCAoc2luY2UgZm9yIGN1c3RvbSBtZXRob2RzIHdlIHByb2JhYmx5IGRvbid0IGV4cGxpY2l0bHkgc3BlY2lmeSB0aGUgZXRhZyBmaWVsZClcbiAgICAgICAgdmFyIGV0YWcgPSBjYWxsT2JqW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5ldGFnXSB8fCAob3BlcmF0aW9uICE9PSAncG9zdCcgPyB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5ldGFnXSA6IG51bGwpO1xuXG4gICAgICAgIGlmIChpc09iamVjdChjYWxsT2JqKSAmJiBjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQoY2FsbE9iaikpIHtcbiAgICAgICAgICBjYWxsT2JqID0gc3RyaXBSZXN0YW5ndWxhcihjYWxsT2JqKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVxdWVzdCA9IGNvbmZpZy5mdWxsUmVxdWVzdEludGVyY2VwdG9yKGNhbGxPYmosIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLFxuICAgICAgICAgIGhlYWRlcnMgfHwge30sIHJlc1BhcmFtcyB8fCB7fSwgdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gfHwge30pO1xuXG4gICAgICAgIHZhciBmaWxsZWRPYmplY3QgPSB7fTtcbiAgICAgICAgZmlsbGVkT2JqZWN0ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkT2JqZWN0LCBmYWxzZSwgcm91dGUsIHNlcnZpY2UpO1xuXG4gICAgICAgIHZhciBva0NhbGxiYWNrID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHJlc0RhdGEgPSBnZXQocmVzcG9uc2UsICdib2R5Jyk7XG4gICAgICAgICAgdmFyIGZ1bGxQYXJhbXMgPSBnZXQocmVzcG9uc2UsICdjb25maWcucGFyYW1zJyk7XG5cbiAgICAgICAgICB2YXIgZWxlbSA9IHBhcnNlUmVzcG9uc2UocmVzRGF0YSwgb3BlcmF0aW9uLCByb3V0ZSwgZmV0Y2hVcmwsIHJlc3BvbnNlLCBzdWJqZWN0KTtcblxuICAgICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgICAgIGlmICh0cnVlID09PSBjb25maWcucGxhaW5CeURlZmF1bHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBlbGVtLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAncG9zdCcgJiYgIV9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgICBkYXRhID0gcmVzdGFuZ3VsYXJpemVFbGVtKFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgICAgICAgcm91dGUsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIGZ1bGxQYXJhbXNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIGRhdGEsIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhID0gcmVzdGFuZ3VsYXJpemVFbGVtKFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgICAgICAgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0sXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIGZ1bGxQYXJhbXNcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBkYXRhW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zaW5nbGVPbmVdID0gX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zaW5nbGVPbmVdO1xuICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgZGF0YSwgZmlsbGVkT2JqZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgdW5kZWZpbmVkLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDMwNCAmJiBjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBfX3RoaXMsIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVyeShjb25maWcuZXJyb3JJbnRlcmNlcHRvcnMsIGZ1bmN0aW9uIChjYjogYW55KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYihyZXNwb25zZSwgc3ViamVjdCwgb2tDYWxsYmFjaykgIT09IGZhbHNlO1xuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXJlZCBpZiBubyBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIE92ZXJyaWRpbmcgSFRUUCBNZXRob2RcbiAgICAgICAgdmFyIGNhbGxPcGVyYXRpb24gPSBvcGVyYXRpb247XG4gICAgICAgIHZhciBjYWxsSGVhZGVycyA9IGV4dGVuZCh7fSwgcmVxdWVzdC5oZWFkZXJzKTtcbiAgICAgICAgdmFyIGlzT3ZlcnJpZGVPcGVyYXRpb24gPSBjb25maWcuaXNPdmVycmlkZW5NZXRob2Qob3BlcmF0aW9uKTtcbiAgICAgICAgaWYgKGlzT3ZlcnJpZGVPcGVyYXRpb24pIHtcbiAgICAgICAgICBjYWxsT3BlcmF0aW9uID0gJ3Bvc3QnO1xuICAgICAgICAgIGNhbGxIZWFkZXJzID0gZXh0ZW5kKGNhbGxIZWFkZXJzLCB7J1gtSFRUUC1NZXRob2QtT3ZlcnJpZGUnOiBvcGVyYXRpb24gPT09ICdyZW1vdmUnID8gJ0RFTEVURScgOiBvcGVyYXRpb24udG9VcHBlckNhc2UoKX0pO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5qc29ucCAmJiBjYWxsT3BlcmF0aW9uID09PSAnZ2V0Jykge1xuICAgICAgICAgIGNhbGxPcGVyYXRpb24gPSAnanNvbnAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5pc1NhZmUob3BlcmF0aW9uKSkge1xuICAgICAgICAgIGlmIChpc092ZXJyaWRlT3BlcmF0aW9uKSB7XG4gICAgICAgICAgICB1cmxIYW5kbGVyLnJlc291cmNlKHRoaXMsICRodHRwLCByZXF1ZXN0Lmh0dHBDb25maWcsIGNhbGxIZWFkZXJzLCByZXF1ZXN0LnBhcmFtcyxcbiAgICAgICAgICAgICAgd2hhdCwgZXRhZywgY2FsbE9wZXJhdGlvbilbY2FsbE9wZXJhdGlvbl0oe30pLnN1YnNjcmliZShva0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCBjYWxsSGVhZGVycywgcmVxdWVzdC5wYXJhbXMsXG4gICAgICAgICAgICAgIHdoYXQsIGV0YWcsIGNhbGxPcGVyYXRpb24pW2NhbGxPcGVyYXRpb25dKCkuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmxIYW5kbGVyLnJlc291cmNlKHRoaXMsICRodHRwLCByZXF1ZXN0Lmh0dHBDb25maWcsIGNhbGxIZWFkZXJzLCByZXF1ZXN0LnBhcmFtcyxcbiAgICAgICAgICAgIHdoYXQsIGV0YWcsIGNhbGxPcGVyYXRpb24pW2NhbGxPcGVyYXRpb25dKHJlcXVlc3QuZWxlbWVudCkuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplUmVzcG9uc2Uoc3ViamVjdCwgZmFsc2UsIGZpbGxlZE9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdnZXQnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGVsZXRlRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3JlbW92ZScsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwdXRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncHV0JywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBvc3RGdW5jdGlvbih3aGF0LCBlbGVtLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncG9zdCcsIHdoYXQsIHBhcmFtcywgZWxlbSwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhlYWRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgnaGVhZCcsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0cmFjZUZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCd0cmFjZScsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvcHRpb25zRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ29wdGlvbnMnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcGF0Y2hGdW5jdGlvbihlbGVtLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncGF0Y2gnLCB1bmRlZmluZWQsIHBhcmFtcywgZWxlbSwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGN1c3RvbUZ1bmN0aW9uKG9wZXJhdGlvbiwgcGF0aCwgcGFyYW1zLCBoZWFkZXJzLCBlbGVtKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykob3BlcmF0aW9uLCBwYXRoLCBwYXJhbXMsIGVsZW0sIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRSZXN0YW5ndWxhck1ldGhvZEZ1bmN0aW9uKG5hbWUsIG9wZXJhdGlvbiwgcGF0aCwgZGVmYXVsdFBhcmFtcywgZGVmYXVsdEhlYWRlcnMsIGRlZmF1bHRFbGVtKSB7XG4gICAgICAgIHZhciBiaW5kZWRGdW5jdGlvbjtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ2dldExpc3QnKSB7XG4gICAgICAgICAgYmluZGVkRnVuY3Rpb24gPSBiaW5kKGZldGNoRnVuY3Rpb24sIHRoaXMsIHBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJpbmRlZEZ1bmN0aW9uID0gYmluZChjdXN0b21GdW5jdGlvbiwgdGhpcywgb3BlcmF0aW9uLCBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjcmVhdGVkRnVuY3Rpb24gPSBmdW5jdGlvbiAocGFyYW1zLCBoZWFkZXJzLCBlbGVtKSB7XG4gICAgICAgICAgdmFyIGNhbGxQYXJhbXMgPSBkZWZhdWx0cyh7XG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBlbGVtXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgcGFyYW1zOiBkZWZhdWx0UGFyYW1zLFxuICAgICAgICAgICAgaGVhZGVyczogZGVmYXVsdEhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBkZWZhdWx0RWxlbVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBiaW5kZWRGdW5jdGlvbihjYWxsUGFyYW1zLnBhcmFtcywgY2FsbFBhcmFtcy5oZWFkZXJzLCBjYWxsUGFyYW1zLmVsZW0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gY3JlYXRlZEZ1bmN0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jdGlvbiAoZWxlbSwgcGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlZEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycywgZWxlbSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3aXRoQ29uZmlndXJhdGlvbkZ1bmN0aW9uKGNvbmZpZ3VyZXIpIHtcbiAgICAgICAgdmFyIG5ld0NvbmZpZyA9IGNsb25lKG9taXQoY29uZmlnLCAnY29uZmlndXJhdGlvbicpKTtcbiAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyKG5ld0NvbmZpZywgbmV3Q29uZmlnKTtcbiAgICAgICAgY29uZmlndXJlcihuZXdDb25maWcpO1xuICAgICAgICByZXR1cm4gY3JlYXRlU2VydmljZUZvckNvbmZpZ3VyYXRpb24obmV3Q29uZmlnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdG9TZXJ2aWNlKHJvdXRlLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIGtub3duQ29sbGVjdGlvbk1ldGhvZHMgPSB2YWx1ZXMoY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzKTtcbiAgICAgICAgdmFyIHNlcnY6IGFueSA9IHt9O1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IChwYXJlbnQgfHwgc2VydmljZSkuYWxsKHJvdXRlKTtcbiAgICAgICAgc2Vydi5vbmUgPSBiaW5kKG9uZSwgKHBhcmVudCB8fCBzZXJ2aWNlKSwgcGFyZW50LCByb3V0ZSk7XG4gICAgICAgIHNlcnYuYWxsID0gYmluZChjb2xsZWN0aW9uLmFsbCwgY29sbGVjdGlvbik7XG4gICAgICAgIHNlcnYucG9zdCA9IGJpbmQoY29sbGVjdGlvbi5wb3N0LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgc2Vydi5nZXRMaXN0ID0gYmluZChjb2xsZWN0aW9uLmdldExpc3QsIGNvbGxlY3Rpb24pO1xuICAgICAgICBzZXJ2LndpdGhIdHRwQ29uZmlnID0gYmluZChjb2xsZWN0aW9uLndpdGhIdHRwQ29uZmlnLCBjb2xsZWN0aW9uKTtcbiAgICAgICAgc2Vydi5nZXQgPSBiaW5kKGNvbGxlY3Rpb24uZ2V0LCBjb2xsZWN0aW9uKTtcblxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICBpZiAoY29sbGVjdGlvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBpc0Z1bmN0aW9uKGNvbGxlY3Rpb25bcHJvcF0pICYmICFpbmNsdWRlcyhrbm93bkNvbGxlY3Rpb25NZXRob2RzLCBwcm9wKSkge1xuICAgICAgICAgICAgc2Vydltwcm9wXSA9IGJpbmQoY29sbGVjdGlvbltwcm9wXSwgY29sbGVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlcnY7XG4gICAgICB9XG5cbiAgICAgIFJlc3Rhbmd1bGFyQ29uZmlndXJlcihzZXJ2aWNlLCBjb25maWcpO1xuXG4gICAgICBzZXJ2aWNlLmNvcHkgPSBiaW5kKGNvcHlSZXN0YW5ndWxhcml6ZWRFbGVtZW50LCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS5zZXJ2aWNlID0gYmluZCh0b1NlcnZpY2UsIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLndpdGhDb25maWcgPSBiaW5kKHdpdGhDb25maWd1cmF0aW9uRnVuY3Rpb24sIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLm9uZSA9IGJpbmQob25lLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5hbGwgPSBiaW5kKGFsbCwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2Uuc2V2ZXJhbCA9IGJpbmQoc2V2ZXJhbCwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2Uub25lVXJsID0gYmluZChvbmVVcmwsIHNlcnZpY2UsIG51bGwpO1xuXG4gICAgICBzZXJ2aWNlLmFsbFVybCA9IGJpbmQoYWxsVXJsLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5zdHJpcFJlc3Rhbmd1bGFyID0gYmluZChzdHJpcFJlc3Rhbmd1bGFyLCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS5yZXN0YW5ndWxhcml6ZUVsZW1lbnQgPSBiaW5kKHJlc3Rhbmd1bGFyaXplRWxlbSwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2UucmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uID0gYmluZChyZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb25BbmRFbGVtZW50cywgc2VydmljZSk7XG5cbiAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihnbG9iYWxDb25maWd1cmF0aW9uKTtcbiAgfTtcblxufVxuIl19