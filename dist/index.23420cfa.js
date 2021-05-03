// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1sDb8":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "ba76236dc15f498c73ded0e523420cfa";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"2X3X1":[function(require,module,exports) {

// 1。 初始化数据
var init = initData()
var keys = init['keys']
var hash = init['hash']

// 2. 生成键盘
generateKeboard(keys,hash)


// 3. 监听用户键盘操作
listenToUser(hash)


// 下面是工具函数 位置不重要 

// 从localStorage中拿hash数据
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || 'null')
 }
// 创建标签
function tag(tagName, attributes){
    var element = document.createElement(tagName)
    // for in 循环可以遍历一个hash 为啥不用for循环 因为你不知道attributes里面具体有什么 有多少
    for(var key in attributes){// key 为className，id，textContent 就是xx.后边的内容
        element[key] = attributes[key]

    }
    return element
 }

// 创建ImgIcon
function createImgIcon(domain){
     // 创建img标签
    var imgIcon = tag('img')
    if(domain){
        imgIcon.src = 'http://' + domain + '/favicon.ico'
    }else{
        imgIcon.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
        console.log('上面图片一定成功，如果失败说明图挂了。')
    }
    imgIcon.onerror = function(e){
        console.log("下载失败了,帮你添加一个肯定成功的favicon.ico,地址为https://i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg")
        e.target.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
    }
    return imgIcon
}
function createButton(textName,id){
    // 给按键添加一个按钮
    var button = tag('button',{textContent: textName,id: id})
    button.onclick = function(e){
        // 用户输入的键 e[target]就是用户点击的元素
        var button =  e.target
        var key = button.id
        // 就是在用户点击button的时候重新获取imgIconNew图片地址
        var imgIconNew = button.previousSibling
        var userWebsiteEdit = prompt('请输入您想输入的website')
        // 将用户输入的网址存入对应的hash中去
        hash[key] = userWebsiteEdit // hash 变更
        imgIconNew.src = 'http://' + userWebsiteEdit + '/favicon.ico'
        imgIconNew.onerror = function(e){
            console.log("下载失败了,帮你添加一个肯定成功的favicon.ico,地址为https://i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg")
            e.target.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
        }

        // 只要用户修改website 就将修改后的hash存入'userWebsiteEdit'保存
        // 由于这个方法只接受参数是string所以将hash转换成字符串存入
        localStorage.setItem('userWebsiteEdit',JSON.stringify(hash))
        // console.log(hash);
    }
    return button
}

function initData(){
    // 初始化数据
    var keys = [
        [
            'esc','F1','F2','F3','F4','F5',
            'F6','F7','F8','F9','F10','F11',
            'F12','Print','Pause','Del',
        
        ],
        
        [
            '`','1','2','3','4','5','6',
            '7','8','9','0','-','=','Back','Home',
        ],
        
        [
            'Tab','q','w','e','r','t','y',
            'U','I','O','P','[',']','\\','Up'
        ],
        
        [
            'Ctrl','a','s','d','f','g','h',
            'j','k','l',';','\'','Enter','Down',
        ],
        
        [
            'Shift','z','x','c','v','b','n',
            'm',',','.','/','Shift','↑','End',
        ],
        
        [
            'Caps','option','command','niz','Alt','Fn',
            'Ctrl','←','↓','→',
        ],
        
    ]
    // js中的hash,可以理解为初始化用到的数据。
    var hash = {
        
            'esc':'qq.com','F1':'qq.com','F2':'qq.com','F3':'qq.com','F4':'qq.com','F5':'qq.com',
            'F6':'qq.com','F7':'qq.com','F8':'qq.com','F9':'qq.com','F10':'qq.com','F11':'qq.com',
            'F12':'qq.com','Print':'qq.com','Pause':'qq.com','Del':'qq.com',
        
            '`':'diandian.com','1':'qq.com','2':'qq.com','3':'qq.com','4':'qq.com','5':'qq.com','6':'qq.com',
            '7':'qq.com','8':'qq.com','9':'qq.com','0':'qq.com','-':'qq.com','=':'qq.com','Back':'qq.com','Home':'qq.com',
        
            'Tab':'qq.com','q':'qq.com','w':'weibo.com','e':'','r':'qq.com','t':'','y':'youtube.com',
            'u':'qq.com','i':'iconfont.cn','o':'qq.com','p':'qq.com','[':'qq.com',']':'qq.com','\\':'qq.com','Up':'qq.com',
        
            'Ctrl':'qq.com','a':'acfun.com','s':'sm.ms','d':'dribble.com','f':'','g':'github.com','h':'qq.com',
            'j':'jdbbs.com','k':'qq.com','l':'qq.com',';':'qq.com','\'':'qq.com','Enter':'qq.com','Down':'qq.com',
        
            'Shift':'qq.com','z':'qq.com','x':'qq.com','c':'cssgradient.io','v':'v2ex.com','b':'bilili.com','n':'qq.com',
            'm':'mcguffen.github.io',',':'qq.com','.':'qq.com','/':'qq.com','Shift':'qq.com','↑':'qq.com','End':'qq.com',
        
            'Caps':'qq.com','option':'qq.com','command':'qq.com','niz':'qq.com','Alt':'qq.com','Fn':'qq.com',
            'Ctrl':'qq.com','←':'qq.com','↓':'qq.com','→':'qq.com',
        
    }
    // 浏览器中的hash
    // 取出localStorage中的'userWebsiteEdit'内容，因为是字符串所以解析成hash
    var hashInLocalStorage = getFromLocalStorage('userWebsiteEdit')
    
        // 覆盖修改前的js给浏览器的hash 
        if(hashInLocalStorage){
            hash = hashInLocalStorage
        }
    
        return {
            "keys": keys,
            "hash": hash
        }
    }

    // 生成键盘
function generateKeboard(keys,hash){
    var keyboard = document.getElementById("keyboard")

    // 遍历keys，生成kbd标签。
    for(var index = 0; index < keys.length; index += 1){
        // index 0 1 2 3 4 5
     
        // console.log(row)
    
        var div = tag("div",{className:'row'})
    
        keyboard.appendChild(div)
        
           // row 代表第 1 2 3 4 5个数组
           var row = keys[index]
            for(var index2 = 0; index2 < row.length; index2 += 1){
    
                    // 给按键添加一个编辑按钮
                    var button = createButton('edit',row[index2])
     
                    // 添加网址icon图标
                    var imgIcon = createImgIcon(hash[row[index2]])
            
                    // 创建kbd标签
                    var kbd = tag('kbd',{className: 'key',textContent: row[index2]})
                    kbd.appendChild(imgIcon)
                    kbd.appendChild(button)
                    div.appendChild(kbd)    
            
        } 
    }
}
// 监听用户键盘方法
function listenToUser(hash){
    document.onkeypress = function(e){
        // 监听键盘按下的按键
            var key = e['key'] // qwertyuiop[]\
            var website = hash[key]
            console.log(website)
            // 将当前浏览器页面地址换成我们按下按键对应的地址
            // 模拟用户在地址栏输入
            // location.href = 'http://' + website
            //在浏览器新页面窗口打开我们按下按键对应的网址
            // 模拟用户新打开一个浏览器页面
            window.open('http://' + website, '_blank')
    }
}
},{}]},["1sDb8","2X3X1"], "2X3X1", "parcelRequire427e")

//# sourceMappingURL=index.23420cfa.js.map
