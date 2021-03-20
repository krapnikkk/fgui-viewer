class App {
    private viewer: Viewer
    private parser: FileParser;
    public fileInput: HTMLInputElement;
    constructor(stage: egret.Stage) {
        this.initExtension();
        stage.addChild(fairygui.GRoot.inst.displayObject);
        this.viewer = fairygui.UIPackage.createObject("Viewer", "Main") as Viewer;
        this.viewer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this.viewer);
        this.parser = new FileParser();
        stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.createFileInput();
        this.initDropEvent();
    }

    initExtension(){
        fairygui.UIPackage.addPackage("Viewer");
        fairygui.UIObjectFactory.setPackageItemExtension("ui://Viewer/Main", Viewer);
        fairygui.UIObjectFactory.setPackageItemExtension("ui://Viewer/toolbar", Toolbar);
        fairygui.UIObjectFactory.setPackageItemExtension("ui://Viewer/componentList", ComponentList);
    }

    initDropEvent() {
        let canvas = document.querySelector(".egret-player canvas");
        canvas.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            let dataTransfer = e.dataTransfer;
            if (dataTransfer.items !== undefined) {
                let dataTransferItemList = dataTransfer.items;
                let files: File[] = [];
                for (let i = 0; i < dataTransferItemList.length; i++) {
                    let item = dataTransferItemList[i];
                    if (item.kind === "file" && item.webkitGetAsEntry().isFile) {
                        let file = item.getAsFile();
                        files.push(file);
                    }
                }
                this.parser.parseFile(files);
            }
        });

        canvas.addEventListener("dragover", (e) => {
            e.preventDefault();
        });
    }

    public createFileInput() {
        this.fileInput = document.createElement("input");
        this.fileInput.type = "file";
        this.fileInput.style.display = "none";
        this.fileInput.multiple = true;
        this.fileInput.addEventListener('change', () => {
            if (!this.fileInput.value) {
                return;
            }
            let files = this.fileInput.files;
            this.parser.parseFile(files);
            this.fileInput.value = "";
        });
        EventManager.on(Events.EMIT_UPLOAD, this.emitUploadFile, this);
    }

    public emitUploadFile() {
        let evt = new MouseEvent("click", {
            bubbles: false,
            cancelable: true,
            view: window
        });
        this.fileInput.dispatchEvent(evt);
    }

    onResize() {
        // console.log("resize");
        // fairygui.GRoot.inst.setSize(this.stage.stageWidth, this.stage.stageHeight);
        // this.viewer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    }
}