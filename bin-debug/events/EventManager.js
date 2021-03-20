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
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager(target) {
        if (target === void 0) { target = null; }
        return _super.call(this, target) || this;
    }
    EventManager.getInstance = function () {
        EventManager._instance = EventManager._instance || new EventManager();
        return EventManager._instance;
    };
    /**
     * @type 事件的类型
     * @listener 处理事件的监听器函数
     * @thisObject 侦听函数绑定的this对象
     */
    EventManager.on = function (type, listener, thisObject) {
        this.getInstance().addEventListener(type, listener, thisObject);
    };
    EventManager.off = function (type, listener, thisObject) {
        this.getInstance().removeEventListener(type, listener, thisObject);
    };
    /**
     * 派发一个指定参数的事件
     * @type 事件类型
     * @bubbles 确定event对象是否参与事件的冒泡阶段。默认值为false
     * @data 事件
     * @cancelable 确定是否可以取消event对象。默认值是false
     */
    EventManager.emit = function (type, data) {
        // dispatchEventWith 可以派发事件并可在事件流中转递数据
        this.getInstance().dispatchEventWith(type, false, data);
    };
    return EventManager;
}(egret.EventDispatcher));
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map