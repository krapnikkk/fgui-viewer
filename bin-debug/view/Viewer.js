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
var Viewer = (function (_super) {
    __extends(Viewer, _super);
    function Viewer() {
        var _this = _super.call(this) || this;
        _this.pkgName = "";
        return _this;
    }
    Viewer.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.loader = this.getChild("viewer");
        this.tips = this.getChild("gc_tips");
        this.canvas = this.getChild("canvas");
        this.toolbar = this.getChild("toolbar");
        this.link = this.getChild("link");
        this.link.addClickListener(this.href, this);
        this.tips.addClickListener(this.selectFile, this);
        EventManager.on(Events.SHOW_VIEW, this.showLoader, this);
        EventManager.on(Events.DELETE_VIEW, this.hideLoader, this);
        EventManager.on(Events.UPLOAD_SUCCESS, this.createView, this);
        EventManager.on(Events.UPDATE_VIEW, this.loadViewEvent, this);
    };
    Viewer.prototype.showLoader = function () {
        this.tips.visible = false;
        this.canvas.visible = true;
        this.toolbar.visible = true;
        this.toolbar.listFlag = false;
        this.loader.visible = true;
    };
    Viewer.prototype.hideLoader = function () {
        this.tips.visible = true;
        this.canvas.visible = false;
        this.toolbar.visible = false;
        this.loader.visible = false;
        EventManager.emit(Events.HIDE_LIST);
    };
    Viewer.prototype.selectFile = function () {
        EventManager.emit(Events.EMIT_UPLOAD);
    };
    Viewer.prototype.href = function () {
        window.location.href = "https://github.com/krapnikkk/fgui-viewer";
    };
    Viewer.prototype.createView = function (evt) {
        var _this = this;
        var _a = evt.data, pkgName = _a.pkgName, urls = _a.urls;
        this.pkgName = pkgName;
        RES.loadGroup("import", 0).then(function () {
            var pkg = fairygui.UIPackage.addPackage(_this.pkgName);
            var pkgChildren = [];
            var pkgItems = pkg["_itemsByName"];
            for (var key in pkgItems) {
                if (pkgItems[key]["type"] == 3) {
                    pkgChildren.push(key);
                }
            }
            EventManager.emit(Events.INIT_LIST, { pkgChildren: pkgChildren });
            _this.loadView();
            // urls.forEach((url) => {
            //     window.URL.revokeObjectURL(url);
            // })
        });
    };
    Viewer.prototype.loadView = function (name) {
        if (name === void 0) { name = "Main"; }
        var pkgUrl = fairygui.UIPackage.getItemURL(this.pkgName, name);
        this.loader.url = pkgUrl;
    };
    Viewer.prototype.loadViewEvent = function (evt) {
        var name = evt.data.name;
        this.loadView(name);
    };
    return Viewer;
}(fairygui.GComponent));
__reflect(Viewer.prototype, "Viewer");
//# sourceMappingURL=Viewer.js.map