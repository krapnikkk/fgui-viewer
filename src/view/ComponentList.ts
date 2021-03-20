class ComponentList extends fairygui.GComponent {
    public list: fairygui.GList;
    public trans_show: fairygui.Transition;
    public trans_hide: fairygui.Transition;
    public listItem:string = "ui://2uyz29olaocdl";
    protected constructFromXML(xml: string): void {
        super.constructFromXML(xml);
        this.list = this.getChild("list") as fairygui.GList;
        this.trans_show = this.getTransition("show");
        this.trans_hide = this.getTransition("hide");
        EventManager.on(Events.SHOW_LIST, this.showList, this);
        EventManager.on(Events.HIDE_LIST, this.hideList, this);
        EventManager.on(Events.INIT_LIST, this.initList, this);
    }

    public constructor() {
        super();
    }

    public initList(evt:any){
        let { pkgChildren } = evt.data;
        this.list.removeChildrenToPool();
        this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.onClickItem, this);
        pkgChildren.forEach((element) => {
            let item = this.list.addItem(this.listItem) as fairygui.GButton;
            item.title = element;
            if(element == "Main"){
                item.selected = true;
            }
        });
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.onClickItem, this);
        
    }
     public onClickItem(evt:any){
         let item = evt.itemObject;
         let name = item.title;
         EventManager.emit(Events.UPDATE_VIEW, { name });
     }

    public showList() {
        egret.MainContext.instance.stage.touchChildren = false;
        this.trans_show.play(this.toucEnable,this);
    }

    public hideList() {
        egret.MainContext.instance.stage.touchChildren = false;
        this.trans_hide.play(this.toucEnable,this);
    }

    public toucEnable(){
        egret.MainContext.instance.stage.touchChildren = true;
    }
}