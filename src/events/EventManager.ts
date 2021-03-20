class EventManager extends egret.EventDispatcher {
    private static _instance: EventManager;
    public constructor(target:egret.IEventDispatcher = null) {
        super(target);
    }
    private static getInstance() {
        EventManager._instance = EventManager._instance || new EventManager();
        return EventManager._instance;
    }
    /**
     * @type 事件的类型
     * @listener 处理事件的监听器函数
     * @thisObject 侦听函数绑定的this对象
     */
    public static on(type: string, listener: Function, thisObject: any): void {
        this.getInstance().addEventListener(type, listener, thisObject);
    }
    public static off(type: string, listener: Function, thisObject: any): void {
        this.getInstance().removeEventListener(type, listener, thisObject);
    }
    /**
     * 派发一个指定参数的事件
     * @type 事件类型
     * @bubbles 确定event对象是否参与事件的冒泡阶段。默认值为false
     * @data 事件
     * @cancelable 确定是否可以取消event对象。默认值是false
     */
    public static emit(type: string, data? :any): void {
        // dispatchEventWith 可以派发事件并可在事件流中转递数据
        this.getInstance().dispatchEventWith(type, false, data);
    }
  }