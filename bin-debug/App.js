var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App(stage) {
        this.initExtension();
        stage.addChild(fairygui.GRoot.inst.displayObject);
        this.viewer = fairygui.UIPackage.createObject("Viewer", "Main");
        this.viewer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this.viewer);
        this.parser = new FileParser();
        stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.createFileInput();
        this.initDropEvent();
    }
    App.prototype.initExtension = function () {
        fairygui.UIPackage.addPackage("Viewer");
        fairygui.UIObjectFactory.setPackageItemExtension("ui://Viewer/Main", Viewer);
        fairygui.UIObjectFactory.setPackageItemExtension("ui://Viewer/toolbar", Toolbar);
        fairygui.UIObjectFactory.setPackageItemExtension("ui://Viewer/componentList", ComponentList);
    };
    App.prototype.initDropEvent = function () {
        var _this = this;
        var canvas = document.querySelector(".egret-player canvas");
        canvas.addEventListener("drop", function (e) {
            e.preventDefault();
            var dataTransfer = e.dataTransfer;
            if (dataTransfer.items !== undefined) {
                var dataTransferItemList = dataTransfer.items;
                var files = [];
                for (var i = 0; i < dataTransferItemList.length; i++) {
                    var item = dataTransferItemList[i];
                    if (item.kind === "file" && item.webkitGetAsEntry().isFile) {
                        var file = item.getAsFile();
                        files.push(file);
                    }
                }
                _this.parser.parseFile(files);
            }
        });
        canvas.addEventListener("dragover", function (e) {
            e.preventDefault();
        });
    };
    App.prototype.createFileInput = function () {
        var _this = this;
        this.fileInput = document.createElement("input");
        this.fileInput.type = "file";
        this.fileInput.style.display = "none";
        this.fileInput.multiple = true;
        this.fileInput.addEventListener('change', function () {
            if (!_this.fileInput.value) {
                return;
            }
            var files = _this.fileInput.files;
            _this.parser.parseFile(files);
            _this.fileInput.value = "";
        });
        EventManager.on(Events.EMIT_UPLOAD, this.emitUploadFile, this);
    };
    App.prototype.emitUploadFile = function () {
        var evt = new MouseEvent("click", {
            bubbles: false,
            cancelable: true,
            view: window
        });
        this.fileInput.dispatchEvent(evt);
    };
    App.prototype.onResize = function () {
        // console.log("resize");
        // fairygui.GRoot.inst.setSize(this.stage.stageWidth, this.stage.stageHeight);
        // this.viewer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    };
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map