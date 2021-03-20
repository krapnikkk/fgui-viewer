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
var ComponentList = (function (_super) {
    __extends(ComponentList, _super);
    function ComponentList() {
        var _this = _super.call(this) || this;
        _this.listItem = "ui://2uyz29olaocdl";
        return _this;
    }
    ComponentList.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.list = this.getChild("list");
        this.trans_show = this.getTransition("show");
        this.trans_hide = this.getTransition("hide");
        EventManager.on(Events.SHOW_LIST, this.showList, this);
        EventManager.on(Events.HIDE_LIST, this.hideList, this);
        EventManager.on(Events.INIT_LIST, this.initList, this);
    };
    ComponentList.prototype.initList = function (evt) {
        var _this = this;
        var pkgChildren = evt.data.pkgChildren;
        this.list.removeChildrenToPool();
        this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.onClickItem, this);
        pkgChildren.forEach(function (element) {
            var item = _this.list.addItem(_this.listItem);
            item.title = element;
            if (element == "Main") {
                item.selected = true;
            }
        });
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.onClickItem, this);
    };
    ComponentList.prototype.onClickItem = function (evt) {
        var item = evt.itemObject;
        var name = item.title;
        EventManager.emit(Events.UPDATE_VIEW, { name: name });
    };
    ComponentList.prototype.showList = function () {
        egret.MainContext.instance.stage.touchChildren = false;
        this.trans_show.play(this.toucEnable, this);
    };
    ComponentList.prototype.hideList = function () {
        egret.MainContext.instance.stage.touchChildren = false;
        this.trans_hide.play(this.toucEnable, this);
    };
    ComponentList.prototype.toucEnable = function () {
        egret.MainContext.instance.stage.touchChildren = true;
    };
    return ComponentList;
}(fairygui.GComponent));
__reflect(ComponentList.prototype, "ComponentList");
//# sourceMappingURL=ComponentList.js.map