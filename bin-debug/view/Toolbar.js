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
var Toolbar = (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        var _this = _super.call(this) || this;
        _this.listFlag = false;
        return _this;
    }
    Toolbar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btn_restore = this.getChild("restore");
        this.btn_restore.addClickListener(this.restore, this);
        this.btn_list = this.getChild("list");
        this.btn_list.addClickListener(this.showList, this);
        this.btn_delete = this.getChild("delete");
        this.btn_delete.addClickListener(this.deleteView, this);
    };
    Toolbar.prototype.restore = function () {
        window.open("https://github.com/krapnikkk/fgui-restore");
    };
    Toolbar.prototype.showList = function () {
        if (!this.listFlag) {
            EventManager.emit(Events.SHOW_LIST);
        }
        else {
            EventManager.emit(Events.HIDE_LIST);
        }
        this.listFlag = !this.listFlag;
    };
    Toolbar.prototype.deleteView = function () {
        EventManager.emit(Events.DELETE_VIEW);
    };
    return Toolbar;
}(fairygui.GComponent));
__reflect(Toolbar.prototype, "Toolbar");
//# sourceMappingURL=Toolbar.js.map