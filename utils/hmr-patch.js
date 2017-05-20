var path = require('path');
var fs = require('fs-extra');

// WARNING: THIS IS A DIRTY HACK
// Patch Webpack HMR to support running in a Chrome extension context
// Hot update is loaded via XMLHttpRequest and evaled in extension
// context instead of including script tag with that hot update

var JsonpPatch = 'var context = this;\
\
function evalInContext(js, context) {\
  return function() { return eval(js); }.call(context); \
} \
\
function reqListener() {\
  evalInContext(this.responseText, context);\
}\
\
context.hotDownloadUpdateChunk = function(chunkId) {\
  var src = __webpack_require__.p + chunkId + "." + hotCurrentHash + ".hot-update.js";\
  var request = new XMLHttpRequest();\
\
  request.onload = reqListener;\
  request.open("get", src, true);\
  request.send();\
}';

var JsonpMainTemplatePath = path.join(__dirname, '../node_modules/webpack/lib/JsonpMainTemplate.runtime.js');
var JsonpMainTemplate = fs.readFileSync(JsonpMainTemplatePath, { encoding: 'utf8' });
JsonpMainTemplate = JsonpMainTemplate.replace(/function hotDownloadUpdateChunk[\S\s]*?}/, JsonpPatch);
fs.writeFileSync(JsonpMainTemplatePath, JsonpMainTemplate);

var LogApplyPatch = '\
    if(chrome && chrome.runtime && chrome.runtime.reload) {\
			console.warn("[HMR] Processing full extension reload");\
			chrome.runtime.reload();\
		} else {\
			console.warn("[HMR] Can\'t proceed full reload. chrome.runtime.reload is not available");\
		}\
';

var LogApplyResultPath = path.join(__dirname, '../node_modules/webpack/hot/log-apply-result.js');
var LogApplyResult = fs.readFileSync(LogApplyResultPath, { encoding: 'utf8' });
LogApplyResult = LogApplyResult.replace(/(if\s?\(\s?unacceptedModules\.length[\S\s]*?)}(?!\))/, '$1' + LogApplyPatch + '}');
fs.writeFileSync(LogApplyResultPath, LogApplyResult);
