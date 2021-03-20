class Viewer extends fairygui.GComponent {
    public loader: fairygui.GLoader;
    public tips: fairygui.GComponent;
    public toolbar: Toolbar;
    public canvas: fairygui.GGraph;
    public link: fairygui.GComponent;
    protected constructFromXML(xml: string): void {
        super.constructFromXML(xml);
        this.loader = this.getChild("viewer") as fairygui.GLoader;
        this.tips = this.getChild("gc_tips") as fairygui.GComponent;
        this.canvas = this.getChild("canvas") as fairygui.GGraph;
        this.toolbar = this.getChild("toolbar") as Toolbar;
        this.link = this.getChild("link") as fairygui.GComponent;
        this.link.addClickListener(this.href, this);
        this.tips.addClickListener(this.selectFile, this);
        EventManager.on(Events.SHOW_VIEW, this.showLoader, this);
        EventManager.on(Events.DELETE_VIEW, this.hideLoader, this);
        EventManager.on(Events.UPLOAD_SUCCESS, this.createView, this);
        EventManager.on(Events.UPDATE_VIEW, this.loadViewEvent, this);
    }

    public constructor() {
        super();
    }

    showLoader() {
        this.tips.visible = false;
        this.canvas.visible = true;
        this.toolbar.visible = true;
        this.toolbar.listFlag = false;
        this.loader.visible = true;
    }

    hideLoader() {
        this.tips.visible = true;
        this.canvas.visible = false;
        this.toolbar.visible = false;
        this.loader.visible = false;
        EventManager.emit(Events.HIDE_LIST);
    }

    selectFile() {
        EventManager.emit(Events.EMIT_UPLOAD);
    }

    href() {
        window.location.href = "https://github.com/krapnikkk/fgui-viewer";
    }

    pkgName: string = "";
    createView(evt: any) {
        let { pkgName, urls } = evt.data;
        this.pkgName = pkgName;
        RES.loadGroup("import", 0).then(() => {
            let pkg = fairygui.UIPackage.addPackage(this.pkgName);
            let pkgChildren = [];
            let pkgItems = pkg["_itemsByName"];
            for (let key in pkgItems) {
                if (pkgItems[key]["type"] == 3) {
                    pkgChildren.push(key);
                }
            }
            EventManager.emit(Events.INIT_LIST, { pkgChildren });
            this.loadView();
            // urls.forEach((url) => {
            //     window.URL.revokeObjectURL(url);
            // })
        });
    }

    loadView(name: string = "Main") {
        let pkgUrl = fairygui.UIPackage.getItemURL(this.pkgName, name);
        this.loader.url = pkgUrl;
    }

    loadViewEvent(evt: any){
        let { name } = evt.data;
        this.loadView(name);
    }
}