"use strict";
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
Object.defineProperty(exports, "__esModule", { value: true });
var ViewLoader = (function (_super) {
    __extends(ViewLoader, _super);
    function ViewLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewLoader.prototype.loadExternal = function () {
        /*
        开始外部载入，地址在url属性
        载入完成后调用OnExternalLoadSuccess
        载入失败调用OnExternalLoadFailed

        注意：如果是外部载入，在载入结束后，调用OnExternalLoadSuccess或OnExternalLoadFailed前，
        比较严谨的做法是先检查url属性是否已经和这个载入的内容不相符。
        如果不相符，表示loader已经被修改了。
        这种情况下应该放弃调用OnExternalLoadSuccess或OnExternalLoadFailed。
        */
    };
    ViewLoader.prototype.freeExternal = function (texture) {
        //释放外部载入的资源
    };
    return ViewLoader;
}(fairygui.GLoader));
exports.ViewLoader = ViewLoader;
__reflect(ViewLoader.prototype, "\"c:/Users/krapn/Documents/EgretProjects/fgui-viewer/src/view/ViewLoader\".ViewLoader");
//# sourceMappingURL=ViewLoader.js.map