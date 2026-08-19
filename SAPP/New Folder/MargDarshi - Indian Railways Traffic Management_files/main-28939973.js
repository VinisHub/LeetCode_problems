var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, a as reactDomExports, R as React, b as React$1 } from "./vendor-6e194e19.js";
(/* @__PURE__ */ __name(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  __name(getFetchOpts, "getFetchOpts");
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
  __name(processPreload, "processPreload");
}, "polyfill"))();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
__name(q, "q");
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
__name(_extends$1, "_extends$1");
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  __name(createBrowserLocation, "createBrowserLocation");
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  __name(createBrowserHref, "createBrowserHref");
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
__name(createBrowserHistory, "createBrowserHistory");
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
__name(invariant, "invariant");
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
__name(warning, "warning");
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
__name(createKey, "createKey");
function getHistoryState(location, index2) {
  return {
    usr: location.state,
    key: location.key,
    idx: index2
  };
}
__name(getHistoryState, "getHistoryState");
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$1({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
__name(createLocation, "createLocation");
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
__name(createPath, "createPath");
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
__name(parsePath, "parsePath");
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState(_extends$1({}, globalHistory.state, {
      idx: index2
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  __name(getIndex, "getIndex");
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  __name(handlePop, "handlePop");
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  __name(push, "push");
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex();
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  __name(replace, "replace");
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  __name(createURL, "createURL");
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
__name(getUrlBasedHistory, "getUrlBasedHistory");
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
__name(matchRoutes, "matchRoutes");
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded, allowPartial);
  }
  return matches;
}
__name(matchRoutesImpl, "matchRoutesImpl");
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = /* @__PURE__ */ __name((route, index2, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  }, "flattenRoute");
  routes.forEach((route, index2) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, exploded);
      }
    }
  });
  return branches;
}
__name(flattenRoutes, "flattenRoutes");
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
__name(explodeOptionalSegments, "explodeOptionalSegments");
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
__name(rankRouteBranches, "rankRouteBranches");
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = /* @__PURE__ */ __name((s) => s === "*", "isSplat");
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
__name(computeScore, "computeScore");
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n2, i) => n2 === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
__name(compareIndexes, "compareIndexes");
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
__name(matchRouteBranch, "matchRouteBranch");
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index2) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index2];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
__name(matchPath, "matchPath");
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
__name(compilePath, "compilePath");
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
__name(decodePath, "decodePath");
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
__name(stripBasename, "stripBasename");
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
__name(resolvePath, "resolvePath");
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
__name(resolvePathname, "resolvePathname");
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
__name(getInvalidPathError, "getInvalidPathError");
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
__name(getPathContributingMatches, "getPathContributingMatches");
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
__name(getResolveToMatches, "getResolveToMatches");
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$1({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
__name(resolveTo, "resolveTo");
const joinPaths = /* @__PURE__ */ __name((paths) => paths.join("/").replace(/\/\/+/g, "/"), "joinPaths");
const normalizePathname = /* @__PURE__ */ __name((pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), "normalizePathname");
const normalizeSearch = /* @__PURE__ */ __name((search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, "normalizeSearch");
const normalizeHash = /* @__PURE__ */ __name((hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, "normalizeHash");
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
__name(isRouteErrorResponse, "isRouteErrorResponse");
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
__name(_extends, "_extends");
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
__name(useInRouterContext, "useInRouterContext");
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
__name(useLocation, "useLocation");
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
__name(useIsomorphicLayoutEffect, "useIsomorphicLayoutEffect");
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
__name(useNavigate, "useNavigate");
function useNavigateUnstable() {
  !useInRouterContext() ? invariant(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
__name(useNavigateUnstable, "useNavigateUnstable");
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
__name(useRoutes, "useRoutes");
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
__name(useRoutesImpl, "useRoutesImpl");
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
__name(DefaultErrorComponent, "DefaultErrorComponent");
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
const _RenderErrorBoundary = class _RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
};
__name(_RenderErrorBoundary, "RenderErrorBoundary");
let RenderErrorBoundary = _RenderErrorBoundary;
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
__name(RenderedRoute, "RenderedRoute");
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index2 === 0) {
          warningOnce("route-fallback", false);
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index2) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
    let getChildren = /* @__PURE__ */ __name(() => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    }, "getChildren");
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
__name(_renderMatches, "_renderMatches");
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant(false) : void 0;
  return ctx;
}
__name(useDataRouterContext, "useDataRouterContext");
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
__name(useDataRouterState, "useDataRouterState");
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
__name(useRouteContext, "useRouteContext");
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
__name(useCurrentRouteId, "useCurrentRouteId");
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
__name(useRouteError, "useRouteError");
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
__name(useNavigateStable, "useNavigateStable");
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
  }
}
__name(warningOnce, "warningOnce");
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0)
    ;
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0))
    ;
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === void 0)
      ;
    if (routerFuture.v7_normalizeFormMethod === void 0)
      ;
    if (routerFuture.v7_partialHydration === void 0)
      ;
    if (routerFuture.v7_skipActionErrorRevalidation === void 0)
      ;
  }
}
__name(logV6DeprecationWarnings, "logV6DeprecationWarnings");
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    future,
    static: isStatic
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
__name(Navigate, "Navigate");
function Route(_props) {
  invariant(false);
}
__name(Route, "Route");
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator,
    static: staticProp,
    future: _extends({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
__name(Router, "Router");
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
__name(Routes, "Routes");
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index2) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index2];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
__name(createRoutesFromChildren, "createRoutesFromChildren");
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
const START_TRANSITION = "startTransition";
const startTransitionImpl = React[START_TRANSITION];
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  reactExports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
__name(BrowserRouter, "BrowserRouter");
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
const LanguageContext = reactExports.createContext();
const useLanguage = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}, "useLanguage");
const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    decisionLog: "Decision Log",
    kpiDashboard: "KPI Dashboard",
    simulation: "What-if Simulation",
    notifications: "Push Notifications",
    logout: "Logout",
    // Login
    login: "Login",
    username: "Username",
    password: "Password",
    section: "Section",
    poweredBy: "Powered by AI Decision Support – MargDarshi",
    selectSection: "Select Section",
    enterUsername: "Enter username",
    enterPassword: "Enter password",
    allFieldsRequired: "All fields are required",
    // Dashboard
    liveTrains: "Live Train List",
    railwayMap: "Real-Time Railway Map",
    aiRecommendations: "AI Recommendations",
    blockOccupancy: "Block Occupancy & Timeline",
    next60Minutes: "Next 60 Minutes",
    realTimeBlockOccupancy: "Real-time block occupancy status and timeline (Gantt-style view)",
    // Train details
    trainId: "Train ID",
    trainName: "Train Name",
    type: "Type",
    eta: "ETA",
    delay: "Delay",
    speed: "Speed",
    currentBlock: "Current Block",
    onTime: "On Time",
    block: "Block",
    // Train types
    express: "Express",
    freight: "Freight",
    passenger: "Passenger",
    // Actions
    accept: "Accept",
    rethink: "Rethink",
    send: "Send",
    export: "Export",
    search: "Search",
    filter: "Filter",
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    confirm: "Confirm",
    reset: "Reset",
    run: "Run",
    // Status
    free: "Free",
    reserved: "Reserved",
    occupied: "Occupied",
    available: "Available",
    // Time
    mins: "mins",
    hours: "hours",
    min: "min",
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    // Decision Log
    timestamp: "Timestamp",
    planSummary: "Plan Summary",
    action: "Action",
    reason: "Reason",
    metrics: "Metrics",
    allActions: "All Actions",
    accepted: "Accepted",
    overridden: "Overridden",
    searchTrainsOrPlans: "Search trains or plans...",
    // KPI Dashboard
    averageDelay: "Average Delay",
    throughput: "Throughput",
    blockUtilization: "Block Utilization",
    conflictsResolved: "Conflicts Resolved",
    improving: "Improving",
    reducing: "Reducing",
    delayTrendToday: "Delay Trend (Today)",
    decisionOutcomesLast24h: "Decision Outcomes (Last 24h)",
    performanceSummary: "Performance Summary",
    onTimePerformance: "On-time Performance",
    systemEfficiency: "System Efficiency",
    activeAlerts: "Active Alerts",
    aiAccuracy: "AI Accuracy",
    realTimePerformanceMetrics: "Real-time performance metrics and analytics",
    // Simulation
    simulationSetup: "Simulation Setup",
    selectScenario: "Select Scenario",
    trackBlockage: "Track Blockage",
    simulateBlockedSection: "Simulate a blocked section",
    trainBreakdown: "Train Breakdown",
    simulateTrainMechanicalFailure: "Simulate train mechanical failure",
    vipPriority: "VIP Priority",
    simulateVipTrainPriorityOverride: "Simulate VIP train priority override",
    weatherDelay: "Weather Delay",
    simulateWeatherRelatedDelays: "Simulate weather-related delays",
    trainIdOptional: "Train ID (optional)",
    blockIdOptional: "Block ID (optional)",
    durationMinutes: "Duration (minutes)",
    severity: "Severity",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
    runSimulation: "Run Simulation",
    running: "Running...",
    runningSimulation: "Running Simulation...",
    analyzingScenarioImpact: "Analyzing scenario impact on railway operations",
    impactAnalysis: "Impact Analysis",
    aiRecommendationsTitle: "AI Recommendations",
    simulationTimeline: "Simulation Timeline",
    readyToSimulate: "Ready to Simulate",
    selectScenarioAndConfigure: "Select a scenario and configure parameters to run your simulation",
    testDifferentScenarios: "Test different scenarios and analyze their impact on railway operations",
    // Notifications
    alertType: "Alert Type",
    delayAlert: "Delay Alert",
    conflictAlert: "Conflict Alert",
    safetyAlert: "Safety Alert",
    priorityAlert: "Priority Alert",
    sendTo: "Send To",
    allControllers: "All Controllers",
    sectionControllers: "Section Controllers",
    stationMasters: "Station Masters",
    maintenanceTeam: "Maintenance Team",
    passengers: "Passengers",
    customMessage: "Custom Message",
    customMessageOptional: "Custom Message (Optional)",
    enterCustomMessage: "Enter custom message or leave blank for default template...",
    preview: "Preview",
    sendNotification: "Send Notification",
    notificationSentSuccessfully: "Notification sent successfully!",
    // AI Recommendations
    alternatives: "Alternatives",
    noRecommendations: "No recommendations",
    allSystemsOptimal: "All systems optimal",
    recommendationAcceptedSuccessfully: "Recommendation accepted successfully!",
    recommendationOverriddenSuccessfully: "Recommendation overridden successfully!",
    overrideRecommendation: "Override Recommendation",
    pleaseProvideReasonForOverride: "Please provide a reason for overriding this recommendation:",
    enterReasonForOverride: "Enter reason for override...",
    confirmOverride: "Confirm Override",
    pleaseProvideReason: "Please provide a reason for override",
    // Block Occupancy
    blockSection: "Block Section",
    currentStatus: "Current Status",
    blockOccupancyTimelineLegend: "Block Occupancy Timeline Legend",
    trackStatus: "Track Status",
    freeAvailableForScheduling: "Available for scheduling",
    reservedScheduledApproaching: "Scheduled/Approaching",
    occupiedTrainCurrentlyPresent: "Train currently present",
    trainTypes: "Train Types",
    expressTrains8minSlots: "Express Trains (8min slots)",
    passengerTrains6minSlots: "Passenger Trains (6min slots)",
    freightTrains15minSlots: "Freight Trains (15min slots)",
    timelineDetails: "Timeline Details",
    eachColumn5MinuteInterval: "• Each column = 5-minute interval",
    totalView60MinutesAhead: "• Total view = 60 minutes ahead",
    hoverForTrainDetails: "• Hover for train details",
    realTimeUpdatesEvery30Seconds: "• Real-time updates every 30 seconds",
    scrollHorizontallyOnMobile: "• Scroll horizontally on mobile",
    currentTime: "Current Time",
    // Railway Map
    railwayNetworkMap: "Railway Network Map",
    interactiveMapTemporarilyUnavailable: "Interactive map temporarily unavailable",
    legend: "Legend",
    freeTrack: "Free Track",
    reservedTrack: "Reserved Track",
    occupiedTrack: "Occupied Track",
    expressTrain: "Express Train",
    freightTrain: "Freight Train",
    passengerTrain: "Passenger Train",
    // Error messages
    somethingWentWrong: "Something went wrong",
    errorOccurredWhileLoading: "An error occurred while loading this component. Please refresh the page to try again.",
    refreshPage: "Refresh Page",
    // Settings
    settings: "Settings",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Toggle language",
    // Government branding
    irctc: "IRCTC",
    indianRailways: "Indian Railways",
    govtOfIndia: "Govt. of India",
    indianRailwaysTrafficManagementSystem: "Indian Railways Traffic Management System",
    // Misc
    initializingMargdarshi: "Initializing MargDarshi...",
    trainsPerHour: "trains/hr",
    efficiency: "eff",
    total: "Total"
  },
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    decisionLog: "निर्णय लॉग",
    kpiDashboard: "KPI डैशबोर्ड",
    simulation: "क्या-यदि सिमुलेशन",
    notifications: "पुश नोटिफिकेशन",
    logout: "लॉगआउट",
    // Login
    login: "लॉगिन",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    section: "अनुभाग",
    poweredBy: "AI निर्णय सहायता द्वारा संचालित – मार्गदर्शी",
    selectSection: "अनुभाग चुनें",
    enterUsername: "उपयोगकर्ता नाम दर्ज करें",
    enterPassword: "पासवर्ड दर्ज करें",
    allFieldsRequired: "सभी फील्ड आवश्यक हैं",
    // Dashboard
    liveTrains: "लाइव ट्रेन सूची",
    railwayMap: "रियल-टाइम रेलवे मैप",
    aiRecommendations: "AI सिफारिशें",
    blockOccupancy: "ब्लॉक कब्जा और समयरेखा",
    next60Minutes: "अगले 60 मिनट",
    realTimeBlockOccupancy: "रियल-टाइम ब्लॉक कब्जा स्थिति और समयरेखा (गैंट-स्टाइल दृश्य)",
    // Train details
    trainId: "ट्रेन ID",
    trainName: "ट्रेन नाम",
    type: "प्रकार",
    eta: "ETA",
    delay: "देरी",
    speed: "गति",
    currentBlock: "वर्तमान ब्लॉक",
    onTime: "समय पर",
    block: "ब्लॉक",
    // Train types
    express: "एक्सप्रेस",
    freight: "मालगाड़ी",
    passenger: "यात्री",
    // Actions
    accept: "स्वीकार करें",
    rethink: "पुनर्विचार",
    send: "भेजें",
    export: "निर्यात",
    search: "खोजें",
    filter: "फिल्टर",
    cancel: "रद्द करें",
    save: "सहेजें",
    close: "बंद करें",
    confirm: "पुष्टि करें",
    reset: "रीसेट",
    run: "चलाएं",
    // Status
    free: "मुक्त",
    reserved: "आरक्षित",
    occupied: "कब्जे में",
    available: "उपलब्ध",
    // Time
    mins: "मिनट",
    hours: "घंटे",
    min: "मिनट",
    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    // Decision Log
    timestamp: "समयचिह्न",
    planSummary: "योजना सारांश",
    action: "कार्य",
    reason: "कारण",
    metrics: "मेट्रिक्स",
    allActions: "सभी कार्य",
    accepted: "स्वीकृत",
    overridden: "ओवरराइड",
    searchTrainsOrPlans: "ट्रेन या योजनाएं खोजें...",
    // KPI Dashboard
    averageDelay: "औसत देरी",
    throughput: "थ्रूपुट",
    blockUtilization: "ब्लॉक उपयोग",
    conflictsResolved: "संघर्ष हल",
    improving: "सुधार हो रहा है",
    reducing: "कम हो रहा है",
    delayTrendToday: "देरी की प्रवृत्ति (आज)",
    decisionOutcomesLast24h: "निर्णय परिणाम (पिछले 24 घंटे)",
    performanceSummary: "प्रदर्शन सारांश",
    onTimePerformance: "समय पर प्रदर्शन",
    systemEfficiency: "सिस्टम दक्षता",
    activeAlerts: "सक्रिय अलर्ट",
    aiAccuracy: "AI सटीकता",
    realTimePerformanceMetrics: "रियल-टाइम प्रदर्शन मेट्रिक्स और विश्लेषण",
    // Simulation
    simulationSetup: "सिमुलेशन सेटअप",
    selectScenario: "परिदृश्य चुनें",
    trackBlockage: "ट्रैक अवरोध",
    simulateBlockedSection: "अवरुद्ध अनुभाग का सिमुलेशन",
    trainBreakdown: "ट्रेन खराबी",
    simulateTrainMechanicalFailure: "ट्रेन यांत्रिक विफलता का सिमुलेशन",
    vipPriority: "VIP प्राथमिकता",
    simulateVipTrainPriorityOverride: "VIP ट्रेन प्राथमिकता ओवरराइड का सिमुलेशन",
    weatherDelay: "मौसम देरी",
    simulateWeatherRelatedDelays: "मौसम संबंधी देरी का सिमुलेशन",
    trainIdOptional: "ट्रेन ID (वैकल्पिक)",
    blockIdOptional: "ब्लॉक ID (वैकल्पिक)",
    durationMinutes: "अवधि (मिनट)",
    severity: "गंभीरता",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    runSimulation: "सिमुलेशन चलाएं",
    running: "चल रहा है...",
    runningSimulation: "सिमुलेशन चल रहा है...",
    analyzingScenarioImpact: "रेलवे संचालन पर परिदृश्य प्रभाव का विश्लेषण",
    impactAnalysis: "प्रभाव विश्लेषण",
    aiRecommendationsTitle: "AI सिफारिशें",
    simulationTimeline: "सिमुलेशन समयरेखा",
    readyToSimulate: "सिमुलेशन के लिए तैयार",
    selectScenarioAndConfigure: "अपना सिमुलेशन चलाने के लिए एक परिदृश्य चुनें और पैरामीटर कॉन्फ़िगर करें",
    testDifferentScenarios: "विभिन्न परिदृश्यों का परीक्षण करें और रेलवे संचालन पर उनके प्रभाव का विश्लेषण करें",
    // Notifications
    alertType: "अलर्ट प्रकार",
    delayAlert: "देरी अलर्ट",
    conflictAlert: "संघर्ष अलर्ट",
    safetyAlert: "सुरक्षा अलर्ट",
    priorityAlert: "प्राथमिकता अलर्ट",
    sendTo: "भेजें",
    allControllers: "सभी नियंत्रक",
    sectionControllers: "अनुभाग नियंत्रक",
    stationMasters: "स्टेशन मास्टर",
    maintenanceTeam: "रखरखाव टीम",
    passengers: "यात्री",
    customMessage: "कस्टम संदेश",
    customMessageOptional: "कस्टम संदेश (वैकल्पिक)",
    enterCustomMessage: "कस्टम संदेश दर्ज करें या डिफ़ॉल्ट टेम्प्लेट के लिए खाली छोड़ें...",
    preview: "पूर्वावलोकन",
    sendNotification: "नोटिफिकेशन भेजें",
    notificationSentSuccessfully: "नोटिफिकेशन सफलतापूर्वक भेजा गया!",
    // AI Recommendations
    alternatives: "विकल्प",
    noRecommendations: "कोई सिफारिश नहीं",
    allSystemsOptimal: "सभी सिस्टम इष्टतम",
    recommendationAcceptedSuccessfully: "सिफारिश सफलतापूर्वक स्वीकार की गई!",
    recommendationOverriddenSuccessfully: "सिफारिश सफलतापूर्वक ओवरराइड की गई!",
    overrideRecommendation: "सिफारिश ओवरराइड करें",
    pleaseProvideReasonForOverride: "कृपया इस सिफारिश को ओवरराइड करने का कारण प्रदान करें:",
    enterReasonForOverride: "ओवरराइड का कारण दर्ज करें...",
    confirmOverride: "ओवरराइड की पुष्टि करें",
    pleaseProvideReason: "कृपया ओवरराइड का कारण प्रदान करें",
    // Block Occupancy
    blockSection: "ब्लॉक अनुभाग",
    currentStatus: "वर्तमान स्थिति",
    blockOccupancyTimelineLegend: "ब्लॉक कब्जा समयरेखा लेजेंड",
    trackStatus: "ट्रैक स्थिति",
    freeAvailableForScheduling: "शेड्यूलिंग के लिए उपलब्ध",
    reservedScheduledApproaching: "निर्धारित/पहुंच रहा है",
    occupiedTrainCurrentlyPresent: "ट्रेन वर्तमान में मौजूद",
    trainTypes: "ट्रेन प्रकार",
    expressTrains8minSlots: "एक्सप्रेस ट्रेनें (8 मिनट स्लॉट)",
    passengerTrains6minSlots: "यात्री ट्रेनें (6 मिनट स्लॉट)",
    freightTrains15minSlots: "मालगाड़ी ट्रेनें (15 मिनट स्लॉट)",
    timelineDetails: "समयरेखा विवरण",
    eachColumn5MinuteInterval: "• प्रत्येक कॉलम = 5-मिनट अंतराल",
    totalView60MinutesAhead: "• कुल दृश्य = 60 मिनट आगे",
    hoverForTrainDetails: "• ट्रेन विवरण के लिए होवर करें",
    realTimeUpdatesEvery30Seconds: "• हर 30 सेकंड में रियल-टाइम अपडेट",
    scrollHorizontallyOnMobile: "• मोबाइल पर क्षैतिज रूप से स्क्रॉल करें",
    currentTime: "वर्तमान समय",
    // Railway Map
    railwayNetworkMap: "रेलवे नेटवर्क मैप",
    interactiveMapTemporarilyUnavailable: "इंटरैक्टिव मैप अस्थायी रूप से अनुपलब्ध",
    legend: "लेजेंड",
    freeTrack: "मुक्त ट्रैक",
    reservedTrack: "आरक्षित ट्रैक",
    occupiedTrack: "कब्जे में ट्रैक",
    expressTrain: "एक्सप्रेस ट्रेन",
    freightTrain: "मालगाड़ी ट्रेन",
    passengerTrain: "यात्री ट्रेन",
    // Error messages
    somethingWentWrong: "कुछ गलत हुआ",
    errorOccurredWhileLoading: "इस घटक को लोड करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करने के लिए पृष्ठ को रीफ्रेश करें।",
    refreshPage: "पृष्ठ रीफ्रेश करें",
    // Settings
    settings: "सेटिंग्स",
    toggleTheme: "थीम टॉगल करें",
    toggleLanguage: "भाषा टॉगल करें",
    // Government branding
    irctc: "IRCTC",
    indianRailways: "भारतीय रेलवे",
    govtOfIndia: "भारत सरकार",
    indianRailwaysTrafficManagementSystem: "भारतीय रेलवे यातायात प्रबंधन प्रणाली",
    // Misc
    initializingMargdarshi: "मार्गदर्शी प्रारंभ हो रहा है...",
    trainsPerHour: "ट्रेन/घंटा",
    efficiency: "दक्षता",
    total: "कुल"
  }
};
const LanguageProvider = /* @__PURE__ */ __name(({ children }) => {
  const [language, setLanguage] = reactExports.useState("en");
  const toggleLanguage = /* @__PURE__ */ __name(() => {
    setLanguage((prev) => prev === "en" ? "hi" : "en");
  }, "toggleLanguage");
  const t = /* @__PURE__ */ __name((key) => {
    return translations[language][key] || key;
  }, "t");
  const value = {
    language,
    toggleLanguage,
    t
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageContext.Provider, { value, children });
}, "LanguageProvider");
const ThemeContext = reactExports.createContext();
const useTheme = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}, "useTheme");
const ThemeProvider = /* @__PURE__ */ __name(({ children }) => {
  const [isDark, setIsDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const savedTheme = localStorage.getItem("margdarshi_theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);
  reactExports.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("margdarshi_theme", isDark ? "dark" : "light");
  }, [isDark]);
  const toggleTheme = /* @__PURE__ */ __name(() => {
    setIsDark((prev) => !prev);
  }, "toggleTheme");
  const value = {
    isDark,
    toggleTheme
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value, children });
}, "ThemeProvider");
const AuthContext = reactExports.createContext();
const useAuth = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}, "useAuth");
const AuthProvider = /* @__PURE__ */ __name(({ children }) => {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const savedUser = localStorage.getItem("margdarshi_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  const login = /* @__PURE__ */ __name(async (credentials) => {
    try {
      const mockUser = {
        id: 1,
        username: credentials.username,
        section: credentials.section,
        name: `${credentials.username} (${credentials.section})`,
        role: "Traffic Controller"
      };
      setUser(mockUser);
      localStorage.setItem("margdarshi_user", JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  }, "login");
  const logout = /* @__PURE__ */ __name(() => {
    setUser(null);
    localStorage.removeItem("margdarshi_user");
  }, "logout");
  const value = {
    user,
    login,
    logout,
    loading
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}, "AuthProvider");
const mockTrains = [
  {
    id: "12432",
    name: "Rajdhani Express",
    type: "Express",
    eta: "10:32",
    delay: 5,
    currentSpeed: 120,
    currentBlock: "A12",
    route: "Delhi-Mumbai",
    passengerLoad: 85
  },
  {
    id: "12951",
    name: "Mumbai Rajdhani",
    type: "Express",
    eta: "11:15",
    delay: 0,
    currentSpeed: 110,
    currentBlock: "B08",
    route: "Mumbai-Delhi",
    passengerLoad: 92
  },
  {
    id: "18448",
    name: "Hirakud Express",
    type: "Passenger",
    eta: "12:45",
    delay: 12,
    currentSpeed: 85,
    currentBlock: "C15",
    route: "Bhubaneswar-Delhi",
    passengerLoad: 78
  },
  {
    id: "16032",
    name: "Andaman Express",
    type: "Express",
    eta: "13:20",
    delay: 3,
    currentSpeed: 95,
    currentBlock: "D22",
    route: "Chennai-Jammu",
    passengerLoad: 88
  },
  {
    id: "22691",
    name: "Freight Special",
    type: "Freight",
    eta: "14:10",
    delay: 8,
    currentSpeed: 65,
    currentBlock: "E05",
    route: "Mumbai-Kolkata",
    passengerLoad: 0
  },
  {
    id: "12002",
    name: "Shatabdi Express",
    type: "Express",
    eta: "15:30",
    delay: 0,
    currentSpeed: 130,
    currentBlock: "F18",
    route: "Delhi-Chandigarh",
    passengerLoad: 95
  },
  {
    id: "19037",
    name: "Avadh Express",
    type: "Passenger",
    eta: "16:45",
    delay: 15,
    currentSpeed: 75,
    currentBlock: "G12",
    route: "Lucknow-Mumbai",
    passengerLoad: 82
  },
  {
    id: "22470",
    name: "Cargo Express",
    type: "Freight",
    eta: "17:20",
    delay: 5,
    currentSpeed: 70,
    currentBlock: "H09",
    route: "Delhi-Chennai",
    passengerLoad: 0
  }
];
const mockRecommendations = [
  {
    id: 1,
    trainId: "12432",
    description: "Hold Train 12432 for 3 mins at Aligarh Jn to allow Express 12951 priority passage. This will optimize overall network throughput.",
    confidence: 87,
    impact: "high",
    metrics: {
      throughputGain: 2,
      delayReduction: 5,
      efficiency: 94
    },
    alternatives: [
      "Reduce speed of 12432 to 80 km/h for next 10 km",
      "Reroute via alternate track (adds 8 min journey time)"
    ]
  },
  {
    id: 2,
    trainId: "18448",
    description: "Reroute Train 18448 via alternate track due to maintenance work on primary route. Expected delay: +6 minutes.",
    confidence: 92,
    impact: "medium",
    metrics: {
      throughputGain: 1,
      delayReduction: 8,
      efficiency: 89
    },
    alternatives: [
      "Wait for maintenance completion (15 min delay)",
      "Transfer passengers to next available train"
    ]
  },
  {
    id: 3,
    trainId: "22691",
    description: "Prioritize freight train 22691 during off-peak hours to maximize track utilization efficiency.",
    confidence: 78,
    impact: "low",
    metrics: {
      throughputGain: 3,
      delayReduction: 2,
      efficiency: 91
    },
    alternatives: [
      "Schedule during night hours (22:00-04:00)",
      "Split cargo across multiple smaller trains"
    ]
  }
];
const mockBlocks = [
  {
    id: "A12",
    name: "Delhi-Ghaziabad Section",
    currentTrain: "12432",
    estimatedClearTime: 15,
    status: "occupied"
  },
  {
    id: "B08",
    name: "Agra-Mathura Section",
    currentTrain: "12951",
    estimatedClearTime: 8,
    status: "occupied"
  },
  {
    id: "C15",
    name: "Kanpur-Lucknow Section",
    currentTrain: null,
    estimatedClearTime: 0,
    status: "free"
  },
  {
    id: "D22",
    name: "Allahabad-Varanasi Section",
    currentTrain: null,
    estimatedClearTime: 0,
    status: "reserved"
  },
  {
    id: "E05",
    name: "Patna-Gaya Section",
    currentTrain: "22691",
    estimatedClearTime: 25,
    status: "occupied"
  },
  {
    id: "F18",
    name: "Howrah-Kharagpur Section",
    currentTrain: null,
    estimatedClearTime: 0,
    status: "free"
  },
  {
    id: "G12",
    name: "Bhubaneswar-Cuttack Section",
    currentTrain: "19037",
    estimatedClearTime: 12,
    status: "occupied"
  },
  {
    id: "H09",
    name: "Chennai-Bangalore Section",
    currentTrain: null,
    estimatedClearTime: 0,
    status: "reserved"
  }
];
const STORAGE_PREFIX = "margdarshi_";
const initializeDatabase = /* @__PURE__ */ __name(async () => {
  try {
    if (!localStorage.getItem(`${STORAGE_PREFIX}trains`)) {
      localStorage.setItem(`${STORAGE_PREFIX}trains`, JSON.stringify(mockTrains));
    }
    if (!localStorage.getItem(`${STORAGE_PREFIX}blocks`)) {
      localStorage.setItem(`${STORAGE_PREFIX}blocks`, JSON.stringify(mockBlocks));
    }
    if (!localStorage.getItem(`${STORAGE_PREFIX}decisions`)) {
      localStorage.setItem(`${STORAGE_PREFIX}decisions`, JSON.stringify([]));
    }
    console.log("Database initialized successfully with localStorage");
    return { success: true, message: "Database initialized successfully" };
  } catch (error) {
    console.error("Database initialization error:", error);
    return { success: false, error: error.message };
  }
}, "initializeDatabase");
const getTrains = /* @__PURE__ */ __name(async () => {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}trains`);
    if (stored) {
      return JSON.parse(stored);
    }
    return mockTrains;
  } catch (error) {
    console.error("Error fetching trains:", error);
    return mockTrains;
  }
}, "getTrains");
const getBlocks = /* @__PURE__ */ __name(async () => {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}blocks`);
    if (stored) {
      return JSON.parse(stored);
    }
    return mockBlocks;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return mockBlocks;
  }
}, "getBlocks");
const getDecisions = /* @__PURE__ */ __name(async (limit = 50) => {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}decisions`);
    const decisions = stored ? JSON.parse(stored) : [];
    return decisions.slice(0, limit);
  } catch (error) {
    console.error("Error fetching decisions:", error);
    return [];
  }
}, "getDecisions");
const saveDecision = /* @__PURE__ */ __name(async (decision) => {
  try {
    const decisions = await getDecisions();
    const newDecision = {
      id: Date.now(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...decision
    };
    decisions.unshift(newDecision);
    localStorage.setItem(`${STORAGE_PREFIX}decisions`, JSON.stringify(decisions.slice(0, 100)));
    return newDecision;
  } catch (error) {
    console.error("Error saving decision:", error);
    return null;
  }
}, "saveDecision");
const _ErrorBoundary = class _ErrorBoundary extends React$1.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundaryContent, {});
    }
    return this.props.children;
  }
};
__name(_ErrorBoundary, "ErrorBoundary");
let ErrorBoundary = _ErrorBoundary;
const ErrorBoundaryContent = /* @__PURE__ */ __name(() => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full card p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-red-600 dark:text-red-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2", children: t("somethingWentWrong") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: t("errorOccurredWhileLoading") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => window.location.reload(),
        className: "btn-primary",
        children: t("refreshPage")
      }
    )
  ] }) });
}, "ErrorBoundaryContent");
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const toKebabCase = /* @__PURE__ */ __name((string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), "toKebabCase");
const createLucideIcon = /* @__PURE__ */ __name((iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
}, "createLucideIcon");
var createLucideIcon$1 = createLucideIcon;
const Activity = createLucideIcon$1("Activity", [
  ["path", { d: "M22 12h-4l-3 9L9 3l-3 9H2", key: "d5dnw9" }]
]);
const AlertTriangle = createLucideIcon$1("AlertTriangle", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
      key: "c3ski4"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
const BarChart3 = createLucideIcon$1("BarChart3", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
const Bell = createLucideIcon$1("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }]
]);
const Calendar = createLucideIcon$1("Calendar", [
  [
    "rect",
    {
      width: "18",
      height: "18",
      x: "3",
      y: "4",
      rx: "2",
      ry: "2",
      key: "eu3xkr"
    }
  ],
  ["line", { x1: "16", x2: "16", y1: "2", y2: "6", key: "m3sa8f" }],
  ["line", { x1: "8", x2: "8", y1: "2", y2: "6", key: "18kwsl" }],
  ["line", { x1: "3", x2: "21", y1: "10", y2: "10", key: "xt86sb" }]
]);
const CheckCircle = createLucideIcon$1("CheckCircle", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["polyline", { points: "22 4 12 14.01 9 11.01", key: "6xbx8j" }]
]);
const Clock = createLucideIcon$1("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
const Download = createLucideIcon$1("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
const FileText = createLucideIcon$1("FileText", [
  [
    "path",
    {
      d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",
      key: "1nnpy2"
    }
  ],
  ["polyline", { points: "14 2 14 8 20 8", key: "1ew0cm" }],
  ["line", { x1: "16", x2: "8", y1: "13", y2: "13", key: "14keom" }],
  ["line", { x1: "16", x2: "8", y1: "17", y2: "17", key: "17nazh" }],
  ["line", { x1: "10", x2: "8", y1: "9", y2: "9", key: "1a5vjj" }]
]);
const Globe = createLucideIcon$1("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "2", x2: "22", y1: "12", y2: "12", key: "1dnqot" }],
  [
    "path",
    {
      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
      key: "nb9nel"
    }
  ]
]);
const LogOut = createLucideIcon$1("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
const MapPin = createLucideIcon$1("MapPin", [
  [
    "path",
    { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", key: "2oe9fu" }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
const Menu = createLucideIcon$1("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
const Moon = createLucideIcon$1("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
const Play = createLucideIcon$1("Play", [
  ["polygon", { points: "5 3 19 12 5 21 5 3", key: "191637" }]
]);
const RotateCcw = createLucideIcon$1("RotateCcw", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const Search = createLucideIcon$1("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const Send = createLucideIcon$1("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]);
const Settings = createLucideIcon$1("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
const Shield = createLucideIcon$1("Shield", [
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", key: "3xmgem" }]
]);
const Sun = createLucideIcon$1("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
const Train = createLucideIcon$1("Train", [
  [
    "rect",
    { width: "16", height: "16", x: "4", y: "3", rx: "2", key: "1wxw4b" }
  ],
  ["path", { d: "M4 11h16", key: "mpoxn0" }],
  ["path", { d: "M12 3v8", key: "1h2ygw" }],
  ["path", { d: "m8 19-2 3", key: "13i0xs" }],
  ["path", { d: "m18 22-2-3", key: "1p0ohu" }],
  ["path", { d: "M8 15h0", key: "q9eq1f" }],
  ["path", { d: "M16 15h0", key: "pzrbjg" }]
]);
const TrendingDown = createLucideIcon$1("TrendingDown", [
  ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7", key: "1r2t7k" }],
  ["polyline", { points: "16 17 22 17 22 11", key: "11uiuu" }]
]);
const TrendingUp = createLucideIcon$1("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const User = createLucideIcon$1("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
const Users = createLucideIcon$1("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
const XCircle = createLucideIcon$1("XCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
const X = createLucideIcon$1("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const Zap = createLucideIcon$1("Zap", [
  [
    "polygon",
    { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2", key: "45s27k" }
  ]
]);
const LoginPage = /* @__PURE__ */ __name(() => {
  const { login } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = reactExports.useState({
    section: "",
    username: "",
    password: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const sections = [
    "Delhi Division",
    "Mumbai Division",
    "Chennai Division",
    "Kolkata Division",
    "Bangalore Division",
    "Hyderabad Division"
  ];
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!formData.section || !formData.username || !formData.password) {
      setError(t("allFieldsRequired"));
      setLoading(false);
      return;
    }
    const result = await login(formData);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  }, "handleSubmit");
  const handleChange = /* @__PURE__ */ __name((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, "handleChange");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: toggleTheme,
          className: "p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow",
          "aria-label": t("toggleTheme"),
          children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: toggleLanguage,
          className: "p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow flex items-center gap-1",
          "aria-label": t("toggleLanguage"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: language.toUpperCase() })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-10 h-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2C8.69 2 6 4.69 6 8v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-3.31-2.69-6-6-6zm-2 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-7H8V8c0-2.21 1.79-4 4-4s4 1.79 4 4v2z" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-railway-blue dark:text-blue-400 mb-2", children: "MargDarshi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400", children: t("indianRailwaysTrafficManagementSystem") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "government-branding mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logo-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-placeholder", children: "IRCTC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: t("irctc") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logo-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-placeholder", children: "IR" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: t("indianRailways") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logo-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-placeholder", children: "GOI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: t("govtOfIndia") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "section", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("section") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "section",
              name: "section",
              value: formData.section,
              onChange: handleChange,
              className: "input-field",
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("selectSection") }),
                sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: section, children: section }, section))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("username") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "username",
              name: "username",
              value: formData.username,
              onChange: handleChange,
              className: "input-field",
              placeholder: t("enterUsername"),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("password") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              id: "password",
              name: "password",
              value: formData.password,
              onChange: handleChange,
              className: "input-field",
              placeholder: t("enterPassword"),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
            children: loading ? t("loading") : t("login")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: t("poweredBy") }) })
    ] })
  ] }) });
}, "LoginPage");
const NotificationDropdown = /* @__PURE__ */ __name(({ onClose }) => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = reactExports.useState("delay");
  const [message, setMessage] = reactExports.useState("");
  const [recipient, setRecipient] = reactExports.useState("all");
  const notificationTypes = [
    { id: "delay", name: t("delayAlert"), icon: Clock, color: "text-yellow-600 dark:text-yellow-400" },
    { id: "conflict", name: t("conflictAlert"), icon: AlertTriangle, color: "text-red-600 dark:text-red-400" },
    { id: "safety", name: t("safetyAlert"), icon: Shield, color: "text-orange-600 dark:text-orange-400" },
    { id: "priority", name: t("priorityAlert"), icon: Zap, color: "text-blue-600 dark:text-blue-400" }
  ];
  const recipients = [
    { id: "all", name: t("allControllers") },
    { id: "section", name: t("sectionControllers") },
    { id: "station", name: t("stationMasters") },
    { id: "maintenance", name: t("maintenanceTeam") },
    { id: "passengers", name: "Passengers" }
  ];
  const generatePreview = /* @__PURE__ */ __name(() => {
    var _a;
    notificationTypes.find((t2) => t2.id === selectedType);
    ((_a = recipients.find((r) => r.id === recipient)) == null ? void 0 : _a.name) || t("allControllers");
    const templates = {
      delay: `🚂 ${t("delayAlert").toUpperCase()}: Train 12432 delayed by 15 minutes at Aligarh Junction. Expected arrival: 11:45. Reason: Signal clearance.`,
      conflict: `⚠️ ${t("conflictAlert").toUpperCase()}: Potential collision risk detected between trains 12432 and 18448 at Block A12. Immediate action required.`,
      safety: `🛡️ ${t("safetyAlert").toUpperCase()}: Track maintenance scheduled on Section B5-B8 from 14:00-16:00. All trains rerouted via alternate track.`,
      priority: `⚡ ${t("priorityAlert").toUpperCase()}: VIP train 12951 requires immediate clearance. Hold all conflicting trains until further notice.`
    };
    return message || templates[selectedType] || "Custom notification message...";
  }, "generatePreview");
  const handleSend = /* @__PURE__ */ __name(async () => {
    var _a;
    try {
      const notification = { message: generatePreview() };
      const response = await fetch("/api/sendNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: notification.message })
      });
      const data = await response.json();
      if (data.success) {
        alert("Notification sent successfully!");
      } else {
        console.error("WhatsApp API error:", data.error);
        alert("Failed: " + (((_a = data.error) == null ? void 0 : _a.message) || data.error));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error sending notification: " + err.message);
    }
  }, "handleSend");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-dropdown", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-header p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: t("notifications") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-gray-500 dark:text-gray-400" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-content p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("alertType") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: notificationTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSelectedType(type.id),
              className: `notification-type-btn p-2 rounded-lg border text-left transition-all duration-200 ${isSelected ? "selected border-railway-blue bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400" : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${type.color}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-gray-100", children: type.name })
              ] })
            },
            type.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("sendTo") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: recipient,
            onChange: (e) => setRecipient(e.target.value),
            className: "form-input w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-railway-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors",
            children: recipients.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.id, children: r.name }, r.id))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("customMessageOptional") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: message,
            onChange: (e) => setMessage(e.target.value),
            className: "form-input w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-railway-blue focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-colors",
            placeholder: t("enterCustomMessage")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t("preview") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "whatsapp-preview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-800 dark:text-gray-200", children: generatePreview() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleSend,
          className: "w-full bg-railway-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
            t("sendNotification")
          ]
        }
      )
    ] })
  ] });
}, "NotificationDropdown");
const logo1 = "/assets/logo1-9a613de5.png";
const TopNavigation = reactExports.forwardRef((props, ref) => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = reactExports.useState(/* @__PURE__ */ new Date());
  const [showUserMenu, setShowUserMenu] = reactExports.useState(false);
  const [showNotifications, setShowNotifications] = reactExports.useState(false);
  const [showMobileMenu, setShowMobileMenu] = reactExports.useState(false);
  reactExports.useImperativeHandle(ref, () => ({
    openNotifications: () => {
      setShowNotifications(true);
    }
  }));
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const formatTime = /* @__PURE__ */ __name((date) => {
    return date.toLocaleTimeString("en-IN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }, "formatTime");
  const formatDate = /* @__PURE__ */ __name((date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }, "formatDate");
  const menuItems = [
    { path: "/dashboard", label: t("dashboard"), icon: BarChart3 },
    { path: "/decision-log", label: t("decisionLog"), icon: FileText },
    { path: "/kpi", label: t("kpiDashboard"), icon: BarChart3 },
    { path: "/simulation", label: t("simulation"), icon: Zap }
  ];
  const handleLogout = /* @__PURE__ */ __name(() => {
    logout();
    navigate("/");
  }, "handleLogout");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-container mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-container mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo1, alt: "Logo", className: "h-12 w-12 object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-30" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-railway-blue dark:text-blue-400", children: "MargDarshi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: user == null ? void 0 : user.section })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center space-x-1 ml-6", children: menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate(item.path),
              className: `nav-item flex items-center gap-2 ${isActive ? "bg-railway-blue text-white" : "text-gray-700 dark:text-gray-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                item.label
              ]
            },
            item.path
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center space-x-2 live-clock", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-gray-600 dark:text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-gray-900 dark:text-gray-100", children: formatTime(currentTime) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: formatDate(currentTime) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleLanguage,
            className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            "aria-label": "Toggle language",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: language.toUpperCase() })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleTheme,
            className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            "aria-label": "Toggle theme",
            children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowNotifications(!showNotifications),
              className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative notification-bell",
              "aria-label": "Notifications",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" })
            }
          ),
          showNotifications && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationDropdown, { onClose: () => setShowNotifications(false) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowUserMenu(!showUserMenu),
              className: "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block text-sm font-medium", children: user == null ? void 0 : user.name })
              ]
            }
          ),
          showUserMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setShowUserMenu(false);
                },
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
                  "Settings"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setShowUserMenu(false);
                  handleLogout();
                },
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                  t("logout")
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowMobileMenu(!showMobileMenu),
            className: "md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            children: showMobileMenu ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    showMobileMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden border-t border-gray-200 dark:border-gray-700 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col space-y-1", children: menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              navigate(item.path);
              setShowMobileMenu(false);
            },
            className: `nav-item flex items-center gap-2 ${isActive ? "bg-railway-blue text-white" : "text-gray-700 dark:text-gray-300"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
              item.label
            ]
          },
          item.path
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-2 live-clock", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-gray-600 dark:text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-gray-900 dark:text-gray-100", children: formatTime(currentTime) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: formatDate(currentTime) })
        ] })
      ] }) })
    ] })
  ] }) });
});
TopNavigation.displayName = "TopNavigation";
const TrainList = /* @__PURE__ */ __name(({ trains }) => {
  const { t } = useLanguage();
  const getTrainIcon = /* @__PURE__ */ __name((type) => {
    switch (type.toLowerCase()) {
      case "express":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Train, { className: "w-2.5 h-2.5 text-blue-600 dark:text-blue-400 flex-shrink-0" });
      case "freight":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-2.5 h-2.5 text-orange-600 dark:text-orange-400 flex-shrink-0" });
      case "passenger":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-2.5 h-2.5 text-green-600 dark:text-green-400 flex-shrink-0" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Train, { className: "w-2.5 h-2.5 text-gray-600 dark:text-gray-400 flex-shrink-0" });
    }
  }, "getTrainIcon");
  const getDelayColor = /* @__PURE__ */ __name((delay) => {
    if (delay === 0)
      return "text-green-600 dark:text-green-400";
    if (delay <= 5)
      return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  }, "getDelayColor");
  const getSpeedColor = /* @__PURE__ */ __name((speed) => {
    if (speed >= 80)
      return "text-green-600 dark:text-green-400";
    if (speed >= 40)
      return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  }, "getSpeedColor");
  const getTrainTypeText = /* @__PURE__ */ __name((type) => {
    switch (type.toLowerCase()) {
      case "express":
        return t("express");
      case "freight":
        return t("freight");
      case "passenger":
        return t("passenger");
      default:
        return type;
    }
  }, "getTrainTypeText");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: trains.map((train) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer bg-white dark:bg-gray-900",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            getTrainIcon(train.type),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-railway-blue dark:text-blue-400 text-xs", children: train.id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${getDelayColor(train.delay)}`, children: train.delay === 0 ? t("onTime") : `+${train.delay}m` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-900 dark:text-gray-100 font-medium mb-1 truncate", children: train.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2 h-2 text-gray-400 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 dark:text-gray-300", children: train.eta })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-medium ${getSpeedColor(train.currentSpeed)}`, children: [
            Math.round(train.currentSpeed),
            " km/h"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 dark:text-gray-400 mb-1", children: [
          t("block"),
          ": ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800 dark:text-gray-200", children: train.currentBlock })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block text-xs px-2 py-0.5 rounded-full font-medium ${train.type === "Express" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : train.type === "Freight" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`, children: getTrainTypeText(train.type) }) })
      ]
    },
    train.id
  )) }) });
}, "TrainList");
const RailwayMap = /* @__PURE__ */ __name(({ trains }) => {
  useLanguage();
  reactExports.useRef();
  const [mapError, setMapError] = reactExports.useState(false);
  const [leafletLoaded, setLeafletLoaded] = reactExports.useState(false);
  const [loadingLeaflet, setLoadingLeaflet] = reactExports.useState(true);
  const mapInstanceRef = reactExports.useRef(null);
  const cityCoordinates = {
    mumbai: { lat: 19.076, lng: 72.8777, name: "Mumbai" },
    delhi: { lat: 28.6139, lng: 77.209, name: "Delhi" },
    kolkata: { lat: 22.5726, lng: 88.3639, name: "Kolkata" }
  };
  reactExports.useEffect(() => {
    let timeoutId;
    if (typeof window !== "undefined" && window.L) {
      setLeafletLoaded(true);
      setLoadingLeaflet(false);
    } else {
      timeoutId = setTimeout(() => {
        setMapError(true);
        setLoadingLeaflet(false);
      }, 5e3);
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        clearTimeout(timeoutId);
        setLeafletLoaded(true);
        setLoadingLeaflet(false);
      };
      script.onerror = () => {
        clearTimeout(timeoutId);
        setMapError(true);
        setLoadingLeaflet(false);
      };
      document.head.appendChild(script);
    }
    return () => {
      if (timeoutId)
        clearTimeout(timeoutId);
    };
  }, []);
  if (loadingLeaflet) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Loading railway map..." })
    ] }) });
  }
  const FallbackMap = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-blue-600 dark:text-blue-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2", children: "Railway Network Map" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Mumbai" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 bg-gray-400 mx-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-red-500 rounded-full mx-auto mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Delhi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 bg-gray-400 mx-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full mx-auto mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Kolkata" })
      ] })
    ] }) })
  ] }) }), "FallbackMap");
  const SimpleLeafletMap = /* @__PURE__ */ __name(() => {
    const mapContainerRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      if (!window.L || !mapContainerRef.current)
        return;
      let map;
      try {
        map = window.L.map(mapContainerRef.current).setView([23.5937, 78.9629], 5);
        mapInstanceRef.current = map;
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 18
        }).addTo(map);
        Object.values(cityCoordinates).forEach((city) => {
          window.L.marker([city.lat, city.lng]).addTo(map).bindPopup(city.name);
        });
        const mumbaiToDelhi = window.L.polyline([
          [cityCoordinates.mumbai.lat, cityCoordinates.mumbai.lng],
          [cityCoordinates.delhi.lat, cityCoordinates.delhi.lng]
        ], { color: "blue", weight: 3 }).addTo(map);
        const delhiToKolkata = window.L.polyline([
          [cityCoordinates.delhi.lat, cityCoordinates.delhi.lng],
          [cityCoordinates.kolkata.lat, cityCoordinates.kolkata.lng]
        ], { color: "blue", weight: 3 }).addTo(map);
        return () => {
          if (map) {
            try {
              map.remove();
              mapInstanceRef.current = null;
            } catch (error) {
              console.error("Error removing map:", error);
            }
          }
        };
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError(true);
      }
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mapContainerRef, style: { height: "100%", width: "100%" } });
  }, "SimpleLeafletMap");
  if (mapError || !leafletLoaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FallbackMap, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleLeafletMap, {}) }) });
}, "RailwayMap");
const AIRecommendations = /* @__PURE__ */ __name(({ recommendations, onAccept, onOverride, onPushNotification }) => {
  const { t } = useLanguage();
  const [overrideReason, setOverrideReason] = reactExports.useState("");
  const [showOverrideModal, setShowOverrideModal] = reactExports.useState(null);
  const [recommendationStates, setRecommendationStates] = reactExports.useState(/* @__PURE__ */ new Map());
  const [showNotificationButtons, setShowNotificationButtons] = reactExports.useState(/* @__PURE__ */ new Set());
  const [rethinkInput, setRethinkInput] = reactExports.useState("");
  const [showRethinkModal, setShowRethinkModal] = reactExports.useState(null);
  const [scenarioInput, setScenarioInput] = reactExports.useState("");
  const handleAccept = /* @__PURE__ */ __name((id) => {
    var _a, _b, _c, _d, _e, _f, _g;
    setRecommendationStates((prev) => new Map(prev.set(id, { status: "accepted", timestamp: /* @__PURE__ */ new Date() })));
    setShowNotificationButtons((prev) => /* @__PURE__ */ new Set([...prev, id]));
    const decision = {
      trainId: (_a = recommendations.find((r) => r.id === id)) == null ? void 0 : _a.trainId,
      planSummary: (_b = recommendations.find((r) => r.id === id)) == null ? void 0 : _b.description,
      action: "Accept",
      reason: "",
      delayReduction: ((_d = (_c = recommendations.find((r) => r.id === id)) == null ? void 0 : _c.metrics) == null ? void 0 : _d.delayReduction) || 0,
      throughputGain: ((_f = (_e = recommendations.find((r) => r.id === id)) == null ? void 0 : _e.metrics) == null ? void 0 : _f.throughputGain) || 0,
      confidence: ((_g = recommendations.find((r) => r.id === id)) == null ? void 0 : _g.confidence) || 0
    };
    onAccept(id, decision);
    showSuccessMessage(t("recommendationAcceptedSuccessfully"));
  }, "handleAccept");
  const handleRethink = /* @__PURE__ */ __name((id) => {
    setShowRethinkModal(id);
  }, "handleRethink");
  const submitRethink = /* @__PURE__ */ __name((id) => {
    var _a, _b, _c;
    if (!rethinkInput.trim()) {
      alert("Please provide input for betterment");
      return;
    }
    setRecommendationStates((prev) => new Map(prev.set(id, {
      status: "processing",
      timestamp: /* @__PURE__ */ new Date(),
      message: "Processing section controller input...",
      input: rethinkInput,
      scenario: scenarioInput
    })));
    const decision = {
      trainId: (_a = recommendations.find((r) => r.id === id)) == null ? void 0 : _a.trainId,
      planSummary: (_b = recommendations.find((r) => r.id === id)) == null ? void 0 : _b.description,
      action: "Rethink",
      reason: `Section controller input: ${rethinkInput}${scenarioInput ? ` | Scenario: ${scenarioInput}` : ""}`,
      delayReduction: 0,
      throughputGain: 0,
      confidence: ((_c = recommendations.find((r) => r.id === id)) == null ? void 0 : _c.confidence) || 0
    };
    onOverride(id, `Section controller input: ${rethinkInput}${scenarioInput ? ` | Scenario: ${scenarioInput}` : ""}`, decision);
    setShowRethinkModal(null);
    setRethinkInput("");
    setScenarioInput("");
    setTimeout(() => {
      const newSuggestion = generateRevisedSuggestion(id, rethinkInput, scenarioInput);
      setRecommendationStates((prev) => new Map(prev.set(id, {
        status: "revised",
        timestamp: /* @__PURE__ */ new Date(),
        newSuggestion,
        message: "AI has generated an improved suggestion based on your input:",
        originalInput: rethinkInput,
        originalScenario: scenarioInput
      })));
    }, 3e3);
    showSuccessMessage("Input sent to AI optimizer!");
  }, "submitRethink");
  const handleAcceptRevised = /* @__PURE__ */ __name((id) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const decision = {
      trainId: (_a = recommendations.find((r) => r.id === id)) == null ? void 0 : _a.trainId,
      planSummary: `Revised: ${((_b = recommendationStates.get(id)) == null ? void 0 : _b.newSuggestion) || "AI-improved recommendation"}`,
      action: "Accept",
      reason: `Accepted revised recommendation based on input: ${(_c = recommendationStates.get(id)) == null ? void 0 : _c.originalInput}`,
      delayReduction: ((_e = (_d = recommendations.find((r) => r.id === id)) == null ? void 0 : _d.metrics) == null ? void 0 : _e.delayReduction) || 0,
      throughputGain: ((_g = (_f = recommendations.find((r) => r.id === id)) == null ? void 0 : _f.metrics) == null ? void 0 : _g.throughputGain) || 0,
      confidence: ((_h = recommendations.find((r) => r.id === id)) == null ? void 0 : _h.confidence) || 0
    };
    onAccept(id, decision);
    setRecommendationStates((prev) => new Map(prev.set(id, {
      status: "removed",
      timestamp: /* @__PURE__ */ new Date(),
      reason: "Revised recommendation accepted and notification sent"
    })));
    setShowNotificationButtons((prev) => /* @__PURE__ */ new Set([...prev, id]));
    setTimeout(() => {
      handlePushNotification(id);
      setRecommendationStates((prev) => new Map(prev.set(id, { status: "removed" })));
    }, 1e3);
    showSuccessMessage("Revised recommendation accepted! Notification sent.");
  }, "handleAcceptRevised");
  const handleOverride = /* @__PURE__ */ __name((id) => {
    var _a, _b, _c;
    if (!overrideReason.trim()) {
      alert(t("pleaseProvideReason"));
      return;
    }
    setRecommendationStates((prev) => new Map(prev.set(id, {
      status: "removed",
      timestamp: /* @__PURE__ */ new Date(),
      reason: overrideReason
    })));
    const decision = {
      trainId: (_a = recommendations.find((r) => r.id === id)) == null ? void 0 : _a.trainId,
      planSummary: (_b = recommendations.find((r) => r.id === id)) == null ? void 0 : _b.description,
      action: "Override",
      reason: overrideReason,
      delayReduction: 0,
      throughputGain: 0,
      confidence: ((_c = recommendations.find((r) => r.id === id)) == null ? void 0 : _c.confidence) || 0
    };
    onOverride(id, overrideReason, decision);
    setShowOverrideModal(null);
    setOverrideReason("");
    showSuccessMessage("Recommendation overridden and removed!");
  }, "handleOverride");
  const handlePushNotification = /* @__PURE__ */ __name((id) => {
    var _a;
    const decision = {
      trainId: (_a = recommendations.find((r) => r.id === id)) == null ? void 0 : _a.trainId,
      planSummary: "Push notification sent to relevant personnel",
      action: "Notify",
      reason: "Notification sent after recommendation acceptance",
      delayReduction: 0,
      throughputGain: 0,
      confidence: 100
    };
    onAccept(id, decision);
    if (onPushNotification) {
      onPushNotification(id);
    }
    setTimeout(() => {
      setRecommendationStates((prev) => new Map(prev.set(id, { status: "removed" })));
    }, 2e3);
  }, "handlePushNotification");
  const generateRevisedSuggestion = /* @__PURE__ */ __name((id, input, scenario) => {
    const inputLower = input.toLowerCase();
    const scenarioLower = scenario ? scenario.toLowerCase() : "";
    if (scenarioLower.includes("emergency") || scenarioLower.includes("medical")) {
      return "Emergency protocol: Immediate priority clearance with medical assistance coordination. All conflicting trains held, emergency services notified at destination station.";
    } else if (scenarioLower.includes("weather") || scenarioLower.includes("fog") || scenarioLower.includes("rain")) {
      return "Weather-adapted strategy: Reduced speed limits (60 km/h), increased following distance, enhanced signal visibility protocols, and passenger safety announcements.";
    } else if (scenarioLower.includes("vip") || scenarioLower.includes("special")) {
      return "VIP protocol: Priority corridor established, security coordination activated, platform clearance ensured, and backup route prepared for contingency.";
    } else if (scenarioLower.includes("maintenance") || scenarioLower.includes("repair")) {
      return "Maintenance coordination: Work window optimized, alternate routing via parallel tracks, minimal passenger impact with coordinated announcements.";
    } else if (inputLower.includes("delay") || inputLower.includes("time")) {
      return "Optimized timing: Hold train for 2 minutes instead of 3, with coordinated signal clearance to minimize passenger impact while maintaining network efficiency.";
    } else if (inputLower.includes("route") || inputLower.includes("track")) {
      return "Enhanced routing: Use parallel track with dynamic switching at Junction B12, reducing delay by additional 3 minutes and improving passenger comfort.";
    } else if (inputLower.includes("speed") || inputLower.includes("slow")) {
      return "Speed optimization: Implement gradual deceleration over 8km instead of sudden braking, maintaining 85km/h average while ensuring safety protocols.";
    } else if (inputLower.includes("passenger") || inputLower.includes("comfort")) {
      return "Passenger-centric approach: Coordinate with station announcements and provide real-time updates, while optimizing platform allocation for seamless transfers.";
    } else {
      return "Improved strategy: Enhanced coordination with adjacent control centers, implementing predictive conflict resolution with 15% better efficiency than original plan.";
    }
  }, "generateRevisedSuggestion");
  const showSuccessMessage = /* @__PURE__ */ __name((message) => {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 3e3);
  }, "showSuccessMessage");
  const getConfidenceColor = /* @__PURE__ */ __name((confidence) => {
    if (confidence >= 90)
      return "text-green-600 dark:text-green-400";
    if (confidence >= 70)
      return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  }, "getConfidenceColor");
  const getImpactIcon = /* @__PURE__ */ __name((impact) => {
    switch (impact) {
      case "high":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-green-500 flex-shrink-0" });
      case "medium":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-yellow-500 flex-shrink-0" });
      case "low":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-3 h-3 text-orange-500 flex-shrink-0" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-3 h-3 text-gray-500 flex-shrink-0" });
    }
  }, "getImpactIcon");
  const getRecommendationCardClass = /* @__PURE__ */ __name((id) => {
    const state = recommendationStates.get(id);
    if (!state)
      return "bg-white dark:bg-gray-800";
    switch (state.status) {
      case "accepted":
        return "recommendation-status-accepted";
      case "processing":
        return "recommendation-status-rethinking animate-pulse-glow";
      case "revised":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case "removed":
        return "hidden";
      default:
        return "bg-white dark:bg-gray-800";
    }
  }, "getRecommendationCardClass");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      recommendations.map((rec) => {
        const state = recommendationStates.get(rec.id);
        const isProcessed = state && ["accepted", "removed"].includes(state.status);
        const isRemoved = state && state.status === "removed";
        if (isRemoved)
          return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 border-l-railway-orange p-3 transition-all duration-300 hover:shadow-md ${getRecommendationCardClass(rec.id)}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 min-w-0", children: [
                  getImpactIcon(rec.impact),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-gray-600 dark:text-gray-400 truncate", children: [
                    t("trainId"),
                    " ",
                    rec.trainId
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-bold ${getConfidenceColor(rec.confidence)}`, children: [
                  rec.confidence,
                  "%"
                ] }) })
              ] }),
              (state == null ? void 0 : state.status) === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "processing-message", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: state.message })
              ] }),
              (state == null ? void 0 : state.status) === "revised" && state.newSuggestion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-blue-800 dark:text-blue-200 mb-2", children: [
                  "🤖 ",
                  state.message
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-700 dark:text-blue-300 font-medium mb-2", children: state.newSuggestion }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-blue-600 dark:text-blue-400 italic", children: [
                  'Based on your input: "',
                  state.originalInput,
                  '"',
                  state.originalScenario && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    ' | Scenario: "',
                    state.originalScenario,
                    '"'
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleAcceptRevised(rec.id),
                    className: "btn-accept flex-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-3 h-3" }),
                      "Accept Improved"
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-900 dark:text-gray-100 mb-2 text-xs leading-relaxed", children: rec.description }),
              state && state.status !== "processing" && state.status !== "revised" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs", children: state.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 dark:text-green-400 font-medium", children: [
                "✅ ",
                t("accepted"),
                " - ",
                state.timestamp.toLocaleTimeString()
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1 mb-3 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-1 bg-green-50 dark:bg-green-900/20 rounded", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-green-700 dark:text-green-400 text-xs", children: [
                    "+",
                    rec.metrics.throughputGain
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-green-600 dark:text-green-500 text-xs", children: t("trainsPerHour") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-1 bg-blue-50 dark:bg-blue-900/20 rounded", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-blue-700 dark:text-blue-400 text-xs", children: [
                    "-",
                    rec.metrics.delayReduction
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-blue-600 dark:text-blue-500 text-xs", children: t("min") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-1 bg-purple-50 dark:bg-purple-900/20 rounded", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-purple-700 dark:text-purple-400 text-xs", children: [
                    rec.metrics.efficiency,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-purple-600 dark:text-purple-500 text-xs", children: t("efficiency") })
                ] })
              ] }),
              !isProcessed && (state == null ? void 0 : state.status) !== "processing" && (state == null ? void 0 : state.status) !== "revised" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-action-buttons", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleAccept(rec.id),
                    className: "btn-accept",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-3 h-3" }),
                      t("accept")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleRethink(rec.id),
                    className: "btn-rethink",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
                      t("rethink")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setShowOverrideModal(rec.id),
                    className: "btn-override",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(XCircle, { className: "w-3 h-3" }),
                      "Override"
                    ]
                  }
                )
              ] }),
              (state == null ? void 0 : state.status) === "accepted" && showNotificationButtons.has(rec.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 pt-2 border-t border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handlePushNotification(rec.id),
                  className: "w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 animate-fadeIn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 animate-pulse" }),
                    t("notifications")
                  ]
                }
              ) }),
              rec.alternatives && rec.alternatives.length > 0 && !isProcessed && (state == null ? void 0 : state.status) !== "processing" && (state == null ? void 0 : state.status) !== "revised" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-gray-200 dark:border-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-600 dark:text-gray-400 mb-1", children: [
                  t("alternatives"),
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: rec.alternatives.slice(0, 2).map((alt, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-700 dark:text-gray-300 p-1 bg-gray-50 dark:bg-gray-700 rounded", children: alt.length > 60 ? `${alt.substring(0, 60)}...` : alt }, index2)) })
              ] })
            ]
          },
          rec.id
        );
      }),
      recommendations.filter((rec) => {
        const state = recommendationStates.get(rec.id);
        return !state || state.status !== "removed";
      }).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-8 h-8 text-green-500 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400 text-sm", children: t("noRecommendations") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-500 mt-1", children: t("allSystemsOptimal") })
      ] })
    ] }),
    showRethinkModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "modal-title", children: "🤔 Rethink Recommendation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "modal-description", children: "Please provide your input on how this recommendation can be improved. Optionally, describe a specific scenario to consider." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Input for Betterment (Required)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: rethinkInput,
              onChange: (e) => setRethinkInput(e.target.value),
              className: "modal-textarea",
              placeholder: "e.g., Consider passenger comfort, reduce delay time, use alternate route, coordinate with adjacent stations...",
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Scenario (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: scenarioInput,
              onChange: (e) => setScenarioInput(e.target.value),
              className: "modal-textarea h-20",
              placeholder: "e.g., Emergency medical situation, VIP train priority, weather conditions, maintenance work, peak hour traffic..."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => submitRethink(showRethinkModal),
            className: "btn-modal-primary bg-orange-600 hover:bg-orange-700",
            children: "Submit for AI Analysis"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setShowRethinkModal(null);
              setRethinkInput("");
              setScenarioInput("");
            },
            className: "btn-modal-secondary",
            children: t("cancel")
          }
        )
      ] })
    ] }) }),
    showOverrideModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "modal-title", children: "❌ Override Recommendation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "modal-description", children: "Please provide a reason for overriding this recommendation. This will remove the suggestion and log your decision." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: overrideReason,
          onChange: (e) => setOverrideReason(e.target.value),
          className: "modal-textarea",
          placeholder: "e.g., Manual intervention required, emergency situation, or operational constraints...",
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleOverride(showOverrideModal),
            className: "btn-modal-primary bg-red-600 hover:bg-red-700",
            children: "Confirm Override"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setShowOverrideModal(null);
              setOverrideReason("");
            },
            className: "btn-modal-secondary",
            children: t("cancel")
          }
        )
      ] })
    ] }) })
  ] });
}, "AIRecommendations");
const BlockOccupancy = /* @__PURE__ */ __name(({ blocks }) => {
  const { t } = useLanguage();
  const generateTimeSlots = /* @__PURE__ */ __name(() => {
    const slots = [];
    const now = /* @__PURE__ */ new Date();
    for (let i = 0; i < 12; i++) {
      const time = new Date(now.getTime() + i * 5 * 6e4);
      slots.push({
        time: time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        timestamp: time.getTime(),
        minutes: i * 5
      });
    }
    return slots;
  }, "generateTimeSlots");
  const timeSlots = generateTimeSlots();
  const getBlockStatus = /* @__PURE__ */ __name((block, slotMinutes) => {
    const blockNum = parseInt(block.id.replace(/\D/g, ""));
    if (block.currentTrain && slotMinutes < block.estimatedClearTime) {
      return {
        status: "occupied",
        train: block.currentTrain,
        details: `${block.currentTrain} - ETA: ${block.estimatedClearTime - slotMinutes}min`
      };
    }
    const patterns = [
      // Express trains - regular intervals
      { trainPrefix: "12", interval: 20, duration: 8, type: t("express") },
      // Freight trains - longer occupancy
      { trainPrefix: "22", interval: 35, duration: 15, type: t("freight") },
      // Passenger trains - frequent but shorter
      { trainPrefix: "18", interval: 15, duration: 6, type: t("passenger") }
    ];
    for (const pattern of patterns) {
      const cyclePosition = (slotMinutes + blockNum * 5) % pattern.interval;
      if (cyclePosition < pattern.duration) {
        const trainId = `${pattern.trainPrefix}${String(blockNum + Math.floor(slotMinutes / pattern.interval)).padStart(3, "0")}`;
        return {
          status: slotMinutes < 5 ? "reserved" : "occupied",
          train: trainId,
          details: `${trainId} (${pattern.type}) - ${pattern.duration}min slot`
        };
      }
    }
    return { status: "free", train: null, details: t("available") };
  }, "getBlockStatus");
  const getStatusClass = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "occupied":
        return "bg-red-500 text-white animate-pulse";
      case "reserved":
        return "bg-yellow-500 text-white";
      case "free":
        return "bg-green-500 text-white opacity-60";
      default:
        return "bg-gray-300 dark:bg-gray-600";
    }
  }, "getStatusClass");
  const getStatusIcon = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "occupied":
        return "🚂";
      case "reserved":
        return "⏳";
      case "free":
        return "✓";
      default:
        return "?";
    }
  }, "getStatusIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "block-occupancy-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block-occupancy-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 p-4 font-semibold text-gray-900 dark:text-gray-100 border-r-2 border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: t("blockSection") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: t("currentStatus") })
      ] }),
      timeSlots.map((slot, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-28 p-3 text-center border-r border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-gray-900 dark:text-gray-100", children: slot.time }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
          "+",
          slot.minutes,
          t("min")
        ] })
      ] }, index2))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white dark:bg-gray-900", children: blocks.map((block) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 p-4 border-r-2 border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col justify-center bg-white dark:bg-gray-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg text-railway-blue dark:text-blue-400", children: block.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-900 dark:text-gray-100 font-medium truncate", children: block.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-400 mt-1", children: block.currentTrain ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 bg-red-500 rounded-full animate-pulse" }),
          block.currentTrain
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
          t("available")
        ] }) })
      ] }),
      timeSlots.map((slot, index2) => {
        const blockStatus = getBlockStatus(block, slot.minutes);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 p-2 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex items-center justify-center bg-white dark:bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-full h-12 rounded-lg flex items-center justify-center text-sm font-bold cursor-pointer transition-all hover:scale-105 hover:shadow-md ${getStatusClass(blockStatus.status)}`,
            title: blockStatus.details,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg", children: getStatusIcon(blockStatus.status) }),
              blockStatus.train && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono truncate max-w-full", children: blockStatus.train.length > 6 ? blockStatus.train.substring(0, 6) : blockStatus.train })
            ] })
          }
        ) }, index2);
      })
    ] }, block.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 text-center", children: t("blockOccupancyTimelineLegend") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-gray-800 dark:text-gray-200 mb-3", children: t("trackStatus") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center opacity-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "✓" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: [
                t("free"),
                " - ",
                t("freeAvailableForScheduling")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-yellow-500 text-white rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "⏳" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: [
                t("reserved"),
                " - ",
                t("reservedScheduledApproaching")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🚂" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: [
                t("occupied"),
                " - ",
                t("occupiedTrainCurrentlyPresent")
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-gray-800 dark:text-gray-200 mb-3", children: t("trainTypes") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-blue-600 dark:text-blue-400", children: "12xxx" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 dark:text-gray-300", children: t("expressTrains8minSlots") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-green-600 dark:text-green-400", children: "18xxx" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 dark:text-gray-300", children: t("passengerTrains6minSlots") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-orange-600 dark:text-orange-400", children: "22xxx" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 dark:text-gray-300", children: t("freightTrains15minSlots") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-gray-800 dark:text-gray-200 mb-3", children: t("timelineDetails") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm text-gray-700 dark:text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("eachColumn5MinuteInterval") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("totalView60MinutesAhead") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("hoverForTrainDetails") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("realTimeUpdatesEvery30Seconds") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("scrollHorizontallyOnMobile") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-gray-300 dark:border-gray-600 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-railway-blue text-white rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 bg-white rounded-full animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          t("currentTime"),
          ": ",
          (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        ] })
      ] }) })
    ] })
  ] });
}, "BlockOccupancy");
const Dashboard = /* @__PURE__ */ __name(() => {
  useAuth();
  const { t } = useLanguage();
  const topNavRef = reactExports.useRef();
  const [trains, setTrains] = reactExports.useState([]);
  const [recommendations, setRecommendations] = reactExports.useState(mockRecommendations);
  const [blocks, setBlocks] = reactExports.useState([]);
  const [decisionLog, setDecisionLog] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const loadData = /* @__PURE__ */ __name(async () => {
      try {
        setLoading(true);
        const [trainsData, blocksData] = await Promise.all([
          getTrains(),
          getBlocks()
        ]);
        setTrains(trainsData);
        setBlocks(blocksData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }, "loadData");
    loadData();
  }, []);
  reactExports.useEffect(() => {
    if (trains.length === 0)
      return;
    const interval = setInterval(() => {
      setTrains(
        (prevTrains) => prevTrains.map((train) => ({
          ...train,
          currentSpeed: Math.max(0, train.currentSpeed + (Math.random() - 0.5) * 10),
          delay: Math.max(0, train.delay + (Math.random() - 0.5) * 2)
        }))
      );
    }, 5e3);
    return () => clearInterval(interval);
  }, [trains]);
  const handleAcceptRecommendation = /* @__PURE__ */ __name(async (id, decision) => {
    console.log("Accepted recommendation:", id, decision);
    try {
      const savedDecision = await saveDecision(decision);
      if (savedDecision) {
        setDecisionLog((prev) => [savedDecision, ...prev]);
      }
    } catch (error) {
      console.error("Error saving decision:", error);
    }
    const logEntry = {
      id: Date.now(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...decision
    };
    setDecisionLog((prev) => [logEntry, ...prev]);
  }, "handleAcceptRecommendation");
  const handleOverrideRecommendation = /* @__PURE__ */ __name(async (id, reason, decision) => {
    console.log("Override recommendation:", id, "Reason:", reason, decision);
    try {
      const savedDecision = await saveDecision(decision);
      if (savedDecision) {
        setDecisionLog((prev) => [savedDecision, ...prev]);
      }
    } catch (error) {
      console.error("Error saving decision:", error);
    }
    const logEntry = {
      id: Date.now(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...decision
    };
    setDecisionLog((prev) => [logEntry, ...prev]);
  }, "handleOverrideRecommendation");
  const handlePushNotification = /* @__PURE__ */ __name((recommendationId) => {
    if (topNavRef.current && topNavRef.current.openNotifications) {
      topNavRef.current.openNotifications();
    }
    const successMessage = document.createElement("div");
    successMessage.className = "fixed top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce";
    successMessage.textContent = "Opening notification panel...";
    document.body.appendChild(successMessage);
    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage);
      }
    }, 2e3);
  }, "handlePushNotification");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopNavigation, { ref: topNavRef }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-16 p-4 main-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Loading dashboard..." })
      ] }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNavigation, { ref: topNavRef }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 p-4 main-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-main-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-left-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card dashboard-panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-panel-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-gray-900 dark:text-gray-100", children: t("liveTrains") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-panel-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrainList, { trains }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-center-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card dashboard-panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-panel-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: t("railwayMap") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-panel-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RailwayMap, { trains }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-right-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card dashboard-panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-panel-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: t("aiRecommendations") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-panel-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AIRecommendations,
            {
              recommendations,
              onAccept: handleAcceptRecommendation,
              onOverride: handleOverrideRecommendation,
              onPushNotification: handlePushNotification
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-block-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: [
            t("blockOccupancy"),
            " - ",
            t("next60Minutes")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-2", children: t("realTimeBlockOccupancy") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block-occupancy-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlockOccupancy, { blocks }) })
      ] }) })
    ] })
  ] });
}, "Dashboard");
const DecisionLog = /* @__PURE__ */ __name(() => {
  const { t } = useLanguage();
  const [decisions, setDecisions] = reactExports.useState([]);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    setTimeout(() => {
      setDecisions([
        {
          id: 1,
          timestamp: "2024-01-15 10:30:00",
          trainId: "12432",
          planSummary: "Hold train for 3 mins at Aligarh Jn",
          action: "Accept",
          reason: "",
          delayReduction: 5,
          throughputGain: 2,
          confidence: 87
        },
        {
          id: 2,
          timestamp: "2024-01-15 10:25:00",
          trainId: "12951",
          planSummary: "Priority override for VIP train",
          action: "Rethink",
          reason: "Emergency medical passenger",
          delayReduction: -2,
          throughputGain: 0,
          confidence: 95
        },
        {
          id: 3,
          timestamp: "2024-01-15 10:20:00",
          trainId: "18448",
          planSummary: "Reroute via alternate track",
          action: "Accept",
          reason: "",
          delayReduction: 8,
          throughputGain: 3,
          confidence: 92
        }
      ]);
      setLoading(false);
    }, 1e3);
  }, []);
  const filteredDecisions = decisions.filter((decision) => {
    const matchesSearch = decision.trainId.includes(searchTerm) || decision.planSummary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || decision.action.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });
  const exportToCSV = /* @__PURE__ */ __name(() => {
    const headers = [t("timestamp"), t("trainId"), t("planSummary"), t("action"), t("reason"), "Delay Reduction", "Throughput Gain", "Confidence"];
    const csvContent = [
      headers.join(","),
      ...filteredDecisions.map((decision) => [
        decision.timestamp,
        decision.trainId,
        `"${decision.planSummary}"`,
        decision.action,
        `"${decision.reason}"`,
        decision.delayReduction,
        decision.throughputGain,
        decision.confidence
      ].join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decision-log.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }, "exportToCSV");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNavigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-16 p-6 main-content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4", children: t("decisionLog") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: t("searchTrainsOrPlans"),
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "input-field pl-10"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: filterType,
                onChange: (e) => setFilterType(e.target.value),
                className: "input-field",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("allActions") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "accept", children: t("accepted") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rethink", children: t("rethink") })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: exportToCSV,
                className: "btn-primary flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  t("export"),
                  " CSV"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card overflow-hidden", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-railway-blue mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: t("loading") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: t("timestamp") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: t("trainId") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: t("planSummary") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: t("action") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: t("reason") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: t("metrics") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700", children: filteredDecisions.map((decision) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-2 text-gray-400" }),
            decision.timestamp
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-railway-blue dark:text-blue-400", children: decision.trainId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-sm text-gray-900 dark:text-gray-100", children: decision.planSummary }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${decision.action === "Accept" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`, children: decision.action === "Accept" ? t("accepted") : t("rethink") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-sm text-gray-900 dark:text-gray-100", children: decision.reason || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-sm text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              t("delay"),
              ": ",
              decision.delayReduction > 0 ? "-" : "+",
              Math.abs(decision.delayReduction),
              " ",
              t("min")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              t("throughput"),
              ": +",
              decision.throughputGain,
              " ",
              t("trainsPerHour")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Confidence: ",
              decision.confidence,
              "%"
            ] })
          ] }) })
        ] }, decision.id)) })
      ] }) }) })
    ] }) })
  ] });
}, "DecisionLog");
const scriptRel = "modulepreload";
const assetsURL = /* @__PURE__ */ __name(function(dep) {
  return "/" + dep;
}, "assetsURL");
const seen = {};
const __vitePreload = /* @__PURE__ */ __name(function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
}, "preload");
const KPIDashboard = /* @__PURE__ */ __name(() => {
  const { t } = useLanguage();
  const [kpiData, setKpiData] = reactExports.useState({
    avgDelay: 12.5,
    throughput: 45,
    blockUtilization: 78,
    conflictsResolved: 23,
    delayTrend: "down",
    throughputTrend: "up"
  });
  const delayTrendData = [
    { time: "06:00", delay: 15 },
    { time: "08:00", delay: 18 },
    { time: "10:00", delay: 12 },
    { time: "12:00", delay: 10 },
    { time: "14:00", delay: 8 },
    { time: "16:00", delay: 14 },
    { time: "18:00", delay: 16 }
  ];
  const utilizationData = [
    { block: "A1-A5", utilization: 85 },
    { block: "B1-B5", utilization: 72 },
    { block: "C1-C5", utilization: 91 },
    { block: "D1-D5", utilization: 68 },
    { block: "E1-E5", utilization: 79 }
  ];
  const decisionData = [
    { name: t("accepted"), value: 75, color: "#10B981" },
    { name: t("rethink"), value: 20, color: "#F59E0B" },
    { name: "Rejected", value: 5, color: "#EF4444" }
  ];
  const KPICard = /* @__PURE__ */ __name(({ title, value, unit, trend, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1", children: [
          value,
          unit
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-full ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-white" }) })
    ] }),
    trend && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center", children: [
      trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-green-500 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4 text-green-500 mr-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-green-600 dark:text-green-400", children: trend === "up" ? t("improving") : t("reducing") })
    ] })
  ] }), "KPICard");
  const SimpleLineChart = /* @__PURE__ */ __name(({ data, dataKey, color = "#3B82F6" }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 flex items-end justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded", children: data.map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 bg-blue-500 rounded-t",
        style: {
          height: `${item[dataKey] / Math.max(...data.map((d) => d[dataKey])) * 150}px`,
          backgroundColor: color
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs mt-2 text-gray-600 dark:text-gray-400", children: item.time })
  ] }, index2)) }), "SimpleLineChart");
  const SimpleBarChart = /* @__PURE__ */ __name(({ data, dataKey, color = "#10B981" }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 flex items-end justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded", children: data.map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-12 rounded-t",
        style: {
          height: `${item[dataKey] / 100 * 150}px`,
          backgroundColor: color
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs mt-2 text-gray-600 dark:text-gray-400", children: item.block })
  ] }, index2)) }), "SimpleBarChart");
  const SimplePieChart = /* @__PURE__ */ __name(({ data }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-48 h-48", children: [
    data.map((item, index2) => {
      item.value;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-32 h-32 rounded-full border-8",
          style: {
            borderColor: item.color,
            transform: `rotate(${index2 * 120}deg)`
          }
        }
      ) }, index2);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: "100%" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: t("total") })
    ] }) })
  ] }) }), "SimplePieChart");
  const ChartsComponent = /* @__PURE__ */ __name(() => {
    const [chartsLoaded, setChartsLoaded] = reactExports.useState(false);
    const [chartsError, setChartsError] = reactExports.useState(false);
    const [RechartsComponents, setRechartsComponents] = reactExports.useState(null);
    reactExports.useEffect(() => {
      let timeoutId = setTimeout(() => {
        setChartsError(true);
        setChartsLoaded(true);
      }, 5e3);
      __vitePreload(() => import("./index-63383369.js"), true ? ["assets/index-63383369.js","assets/vendor-6e194e19.js"] : void 0).then((recharts) => {
        clearTimeout(timeoutId);
        setRechartsComponents(recharts);
        setChartsLoaded(true);
      }).catch((error) => {
        clearTimeout(timeoutId);
        console.log("Recharts not available, using fallback charts:", error);
        setChartsError(true);
        setChartsLoaded(true);
      });
      return () => clearTimeout(timeoutId);
    }, []);
    if (!chartsLoaded) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded" });
    }
    if (chartsError || !RechartsComponents) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleLineChart, { data: delayTrendData, dataKey: "delay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleBarChart, { data: utilizationData, dataKey: "utilization" })
      ] });
    }
    const { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = RechartsComponents;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: delayTrendData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "delay",
            stroke: "#3B82F6",
            strokeWidth: 2,
            dot: { fill: "#3B82F6" }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: utilizationData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "utilization", fill: "#10B981" })
      ] }) })
    ] });
  }, "ChartsComponent");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNavigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-16 p-6 main-content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: t("kpiDashboard") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400 mt-1", children: t("realTimePerformanceMetrics") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            title: t("averageDelay"),
            value: kpiData.avgDelay,
            unit: ` ${t("min")}`,
            trend: kpiData.delayTrend,
            icon: Clock,
            color: "bg-blue-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            title: t("throughput"),
            value: kpiData.throughput,
            unit: ` ${t("trainsPerHour")}`,
            trend: kpiData.throughputTrend,
            icon: Activity,
            color: "bg-green-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            title: t("blockUtilization"),
            value: kpiData.blockUtilization,
            unit: "%",
            icon: TrendingUp,
            color: "bg-orange-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPICard,
          {
            title: t("conflictsResolved"),
            value: kpiData.conflictsResolved,
            unit: "",
            icon: CheckCircle,
            color: "bg-purple-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4", children: t("delayTrendToday") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartsComponent, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4", children: t("blockUtilization") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleBarChart, { data: utilizationData, dataKey: "utilization" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4", children: t("decisionOutcomesLast24h") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SimplePieChart, { data: decisionData }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4", children: t("performanceSummary") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-5 h-5 text-green-500 mr-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("onTimePerformance") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-green-600", children: "87%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-blue-500 mr-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("systemEfficiency") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-blue-600", children: "92%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-5 h-5 text-orange-500 mr-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("activeAlerts") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-orange-600", children: "3" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-purple-500 mr-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("aiAccuracy") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-purple-600", children: "94%" })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}, "KPIDashboard");
const Simulation = /* @__PURE__ */ __name(() => {
  const { t } = useLanguage();
  const [scenario, setScenario] = reactExports.useState("");
  const [parameters, setParameters] = reactExports.useState({
    // Hold train parameters
    holdDuration: 5,
    selectedTrain: "",
    priorityOverride: false,
    // Speed adjust parameters
    speedDelta: 0,
    selectedTrains: [],
    horizon: 10,
    // Reroute parameters
    alternateRoute: "",
    showMapPreview: false
  });
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState(null);
  const scenarios = [
    {
      id: "hold",
      name: "Hold Train",
      description: "Evaluate holding strategies and platform allocations",
      icon: Clock
    },
    {
      id: "speed",
      name: "Speed Adjust",
      description: "Analyze speed modifications and acceleration/deceleration limits",
      icon: Zap
    },
    {
      id: "reroute",
      name: "Reroute",
      description: "Explore alternative routing options and network topology",
      icon: MapPin
    }
  ];
  const availableTrains = [
    { id: "12432", name: "Rajdhani Express", currentSpeed: 120, eta: "10:32" },
    { id: "12951", name: "Mumbai Rajdhani", currentSpeed: 110, eta: "11:15" },
    { id: "18448", name: "Hirakud Express", currentSpeed: 85, eta: "12:45" },
    { id: "16032", name: "Andaman Express", currentSpeed: 95, eta: "13:20" }
  ];
  const alternateRoutes = [
    { id: "route1", name: "Via Agra-Mathura (Primary)", distance: "245 km", time: "3h 15m" },
    { id: "route2", name: "Via Gwalior-Jhansi (Alternate)", distance: "267 km", time: "3h 45m" },
    { id: "route3", name: "Via Kanpur-Lucknow (Backup)", distance: "289 km", time: "4h 10m" }
  ];
  const runSimulation = /* @__PURE__ */ __name(async () => {
    setIsRunning(true);
    setTimeout(() => {
      let scenarioResults = {};
      switch (scenario) {
        case "hold":
          scenarioResults = {
            scenario: "Hold Train Strategy",
            action: `Hold ${parameters.selectedTrain || "selected train"} for ${parameters.holdDuration} minutes`,
            conflictDetection: parameters.priorityOverride ? "Priority override applied" : "Standard conflict resolution",
            originalMetrics: { avgDelay: 12.5, throughput: 45, conflicts: 3 },
            simulatedMetrics: { avgDelay: 14.2, throughput: 43, conflicts: 1 },
            recommendations: [
              `Apply ${parameters.holdDuration}-minute hold at current platform`,
              parameters.priorityOverride ? "Priority train given immediate clearance" : "Standard scheduling maintained",
              "Platform allocation optimized for minimal passenger impact"
            ]
          };
          break;
        case "speed":
          scenarioResults = {
            scenario: "Speed Adjustment Analysis",
            action: `Adjust speed by ${parameters.speedDelta > 0 ? "+" : ""}${parameters.speedDelta} km/h over ${parameters.horizon} km horizon`,
            speedModification: `Target trains: ${parameters.selectedTrains.length || 1} train(s)`,
            originalMetrics: { avgDelay: 12.5, throughput: 45, conflicts: 3 },
            simulatedMetrics: {
              avgDelay: 12.5 + (parameters.speedDelta < 0 ? 2 : -1),
              throughput: 45 + (parameters.speedDelta > 0 ? 2 : -1),
              conflicts: Math.max(0, 3 + (parameters.speedDelta < 0 ? 1 : -1))
            },
            recommendations: [
              `Speed modification: ${parameters.speedDelta > 0 ? "Increase" : "Decrease"} by ${Math.abs(parameters.speedDelta)} km/h`,
              `Acceleration/deceleration limits respected over ${parameters.horizon} km`,
              "Energy efficiency and safety parameters maintained"
            ]
          };
          break;
        case "reroute":
          const selectedRoute = alternateRoutes.find((r) => r.id === parameters.alternateRoute) || alternateRoutes[0];
          scenarioResults = {
            scenario: "Alternative Routing Analysis",
            action: `Reroute via ${selectedRoute.name}`,
            routeCalculation: `NetworkX shortest path: ${selectedRoute.distance}, ${selectedRoute.time}`,
            originalMetrics: { avgDelay: 12.5, throughput: 45, conflicts: 3 },
            simulatedMetrics: { avgDelay: 15.8, throughput: 42, conflicts: 2 },
            recommendations: [
              `Primary route: ${selectedRoute.name}`,
              `Distance impact: ${selectedRoute.distance}`,
              "Platform availability confirmed at alternate stations"
            ]
          };
          break;
        default:
          scenarioResults = {
            scenario: "General Analysis",
            originalMetrics: { avgDelay: 12.5, throughput: 45, conflicts: 3 },
            simulatedMetrics: { avgDelay: 13.1, throughput: 44, conflicts: 2 },
            recommendations: ["Select a specific scenario for detailed analysis"]
          };
      }
      setResults({
        ...scenarioResults,
        timeline: [
          { time: "10:00", event: `${scenarioResults.scenario} initiated` },
          { time: "10:05", event: "Conflict detection and analysis completed" },
          { time: "10:10", event: "Alternative solutions calculated" },
          { time: "10:15", event: "Optimal strategy determined" },
          { time: "10:20", event: "Implementation ready" }
        ]
      });
      setIsRunning(false);
    }, 3e3);
  }, "runSimulation");
  const resetSimulation = /* @__PURE__ */ __name(() => {
    setResults(null);
    setScenario("");
    setParameters({
      holdDuration: 5,
      selectedTrain: "",
      priorityOverride: false,
      speedDelta: 0,
      selectedTrains: [],
      horizon: 10,
      alternateRoute: "",
      showMapPreview: false
    });
  }, "resetSimulation");
  const renderScenarioParameters = /* @__PURE__ */ __name(() => {
    switch (scenario) {
      case "hold":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Hold Duration (minutes)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: "1",
                max: "30",
                value: parameters.holdDuration,
                onChange: (e) => setParameters((prev) => ({ ...prev, holdDuration: parseInt(e.target.value) })),
                className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1 min" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                parameters.holdDuration,
                " minutes"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "30 min" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Select Train" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: parameters.selectedTrain,
                onChange: (e) => setParameters((prev) => ({ ...prev, selectedTrain: e.target.value })),
                className: "input-field",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose train to hold..." }),
                  availableTrains.map((train) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: train.id, children: [
                    train.id,
                    " - ",
                    train.name,
                    " (ETA: ",
                    train.eta,
                    ")"
                  ] }, train.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: parameters.priorityOverride,
                onChange: (e) => setParameters((prev) => ({ ...prev, priorityOverride: e.target.checked })),
                className: "mr-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Priority Override (Emergency/VIP)" })
          ] }) })
        ] });
      case "speed":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Speed Delta (km/h)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: "-50",
                max: "50",
                value: parameters.speedDelta,
                onChange: (e) => setParameters((prev) => ({ ...prev, speedDelta: parseInt(e.target.value) })),
                className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "-50 km/h" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                parameters.speedDelta > 0 ? "+" : "",
                parameters.speedDelta,
                " km/h"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+50 km/h" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Select Train(s)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                multiple: true,
                value: parameters.selectedTrains,
                onChange: (e) => {
                  const values = Array.from(e.target.selectedOptions, (option) => option.value);
                  setParameters((prev) => ({ ...prev, selectedTrains: values }));
                },
                className: "input-field h-24",
                children: availableTrains.map((train) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: train.id, children: [
                  train.id,
                  " - ",
                  train.name,
                  " (",
                  train.currentSpeed,
                  " km/h)"
                ] }, train.id))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Hold Ctrl/Cmd to select multiple trains" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Horizon Distance (km)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: "5",
                max: "50",
                value: parameters.horizon,
                onChange: (e) => setParameters((prev) => ({ ...prev, horizon: parseInt(e.target.value) })),
                className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "5 km" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                parameters.horizon,
                " km"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "50 km" })
            ] })
          ] })
        ] });
      case "reroute":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Alternate Route Options" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: parameters.alternateRoute,
                onChange: (e) => setParameters((prev) => ({ ...prev, alternateRoute: e.target.value })),
                className: "input-field",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select alternate route..." }),
                  alternateRoutes.map((route) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: route.id, children: [
                    route.name,
                    " - ",
                    route.distance,
                    " (",
                    route.time,
                    ")"
                  ] }, route.id))
                ]
              }
            )
          ] }),
          parameters.alternateRoute && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-blue-900 dark:text-blue-100 mb-2", children: "Route Preview" }),
            (() => {
              const selectedRoute = alternateRoutes.find((r) => r.id === parameters.alternateRoute);
              return selectedRoute ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Distance:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedRoute.distance })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Est. Time:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedRoute.time })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Route:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedRoute.name })
                ] })
              ] }) : null;
            })()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: parameters.showMapPreview,
                onChange: (e) => setParameters((prev) => ({ ...prev, showMapPreview: e.target.checked })),
                className: "mr-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Show Network Topology Map Preview" })
          ] }) }),
          parameters.showMapPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-gray-100 dark:bg-gray-800 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-600 dark:text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-12 h-12 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Network topology map would be displayed here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Showing alternative paths and platform availability" })
          ] }) })
        ] });
      default:
        return null;
    }
  }, "renderScenarioParameters");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNavigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-16 p-6 main-content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: t("simulation") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400 mt-1", children: "Support what-if simulation and scenario analysis to evaluate alternative routings, holding strategies, and platform allocations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 mr-2" }),
            t("simulationSetup")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: t("selectScenario") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: scenarios.map((s) => {
              const Icon = s.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "scenario",
                    value: s.id,
                    checked: scenario === s.id,
                    onChange: (e) => setScenario(e.target.value),
                    className: "mr-3 mt-1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                    s.name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400 mt-1", children: s.description })
                ] })
              ] }, s.id);
            }) })
          ] }),
          scenario && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Configuration Options" }),
            renderScenarioParameters()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: runSimulation,
                disabled: !scenario || isRunning,
                className: "btn-primary flex items-center gap-2 flex-1 disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                  isRunning ? t("running") : t("runSimulation")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: resetSimulation,
                className: "btn-secondary flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                  t("reset")
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
          isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-railway-blue mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2", children: t("runningSimulation") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400", children: t("analyzingScenarioImpact") })
          ] }),
          results && !isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "w-5 h-5 mr-2" }),
                results.scenario,
                " - ",
                t("impactAnalysis")
              ] }),
              results.action && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-blue-800 dark:text-blue-200", children: [
                  "Action: ",
                  results.action
                ] }),
                results.conflictDetection && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 dark:text-blue-300 mt-1", children: results.conflictDetection }),
                results.speedModification && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 dark:text-blue-300 mt-1", children: results.speedModification }),
                results.routeCalculation && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 dark:text-blue-300 mt-1", children: results.routeCalculation })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400 mb-1", children: t("averageDelay") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: [
                    results.originalMetrics.avgDelay,
                    " → ",
                    results.simulatedMetrics.avgDelay
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm ${results.simulatedMetrics.avgDelay > results.originalMetrics.avgDelay ? "text-red-600" : "text-green-600"}`, children: [
                    results.simulatedMetrics.avgDelay > results.originalMetrics.avgDelay ? "+" : "",
                    (results.simulatedMetrics.avgDelay - results.originalMetrics.avgDelay).toFixed(1),
                    " ",
                    t("min")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400 mb-1", children: t("throughput") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: [
                    results.originalMetrics.throughput,
                    " → ",
                    results.simulatedMetrics.throughput
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm ${results.simulatedMetrics.throughput < results.originalMetrics.throughput ? "text-red-600" : "text-green-600"}`, children: [
                    results.simulatedMetrics.throughput > results.originalMetrics.throughput ? "+" : "",
                    results.simulatedMetrics.throughput - results.originalMetrics.throughput,
                    " ",
                    t("trainsPerHour")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400 mb-1", children: "Conflicts" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: [
                    results.originalMetrics.conflicts,
                    " → ",
                    results.simulatedMetrics.conflicts
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm ${results.simulatedMetrics.conflicts > results.originalMetrics.conflicts ? "text-red-600" : "text-green-600"}`, children: [
                    results.simulatedMetrics.conflicts > results.originalMetrics.conflicts ? "+" : "",
                    results.simulatedMetrics.conflicts - results.originalMetrics.conflicts
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4", children: t("aiRecommendationsTitle") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: results.recommendations.map((rec, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold", children: index2 + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-900 dark:text-gray-100", children: rec })
              ] }, index2)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4", children: t("simulationTimeline") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: results.timeline.map((event, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 text-sm font-mono text-gray-600 dark:text-gray-400", children: event.time }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-railway-blue rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-gray-900 dark:text-gray-100", children: event.event })
              ] }, index2)) })
            ] })
          ] }),
          !results && !isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-gray-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2", children: t("readyToSimulate") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400", children: t("selectScenarioAndConfigure") })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}, "Simulation");
const App$1 = "";
function AppRoutes() {
  const { user } = useAuth();
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/decision-log", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DecisionLog, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/kpi", element: /* @__PURE__ */ jsxRuntimeExports.jsx(KPIDashboard, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/simulation", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Simulation, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard", replace: true }) })
  ] });
}
__name(AppRoutes, "AppRoutes");
function AppContent() {
  const [dbInitialized, setDbInitialized] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const initDB = /* @__PURE__ */ __name(async () => {
      try {
        const result = await initializeDatabase();
        if (result.success) {
          console.log("Database initialized successfully");
        } else {
          console.error("Database initialization failed:", result.error);
        }
      } catch (error) {
        console.error("Database initialization error:", error);
      } finally {
        setDbInitialized(true);
      }
    }, "initDB");
    initDB();
  }, []);
  if (!dbInitialized) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Initializing MargDarshi..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppRoutes, {}) });
}
__name(AppContent, "AppContent");
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppContent, {}) }) }) }) }) });
}
__name(App, "App");
const index = "";
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$1.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
