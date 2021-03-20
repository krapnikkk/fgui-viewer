class Toolbar extends fairygui.GComponent {
    public btn_restore: fairygui.GComponent;
    public btn_list: fairygui.GComponent;
    public btn_delete: fairygui.GComponent;
    protected constructFromXML(xml: string): void {
        super.constructFromXML(xml);
        this.btn_restore = this.getChild("restore") as fairygui.GComponent;
        this.btn_restore.addClickListener(this.restore, this);
        this.btn_list = this.getChild("list") as fairygui.GComponent;
        this.btn_list.addClickListener(this.showList, this);
        this.btn_delete = this.getChild("delete") as fairygui.GComponent;
        this.btn_delete.addClickListener(this.deleteView, this);
    }

    public constructor() {
        super();
    }

    restore() {
        window.open("https://github.com/krapnikkk/fgui-restore");
    }

    listFlag:boolean = false;
    showList(){
        if(!this.listFlag){
            EventManager.emit(Events.SHOW_LIST);
        }else{
            EventManager.emit(Events.HIDE_LIST);
        }
        this.listFlag = !this.listFlag;
    }

    deleteView(){
        EventManager.emit(Events.DELETE_VIEW);
    }
}