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
var FileParser = (function (_super) {
    __extends(FileParser, _super);
    function FileParser() {
        return _super.call(this) || this;
    }
    FileParser.prototype.parseFile = function (files) {
        var fileNames = [], flag = false;
        var pkgName = "", hasImport = false;
        var urls = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var url = URL.createObjectURL(file);
            urls.push(url);
            var name_1 = file.name, type = file.type;
            // todo 
            // 过滤不相关资源
            // if (type !== 'image/jpeg' &&
            //     type !== 'image/png' &&
            //     type !== 'application/octet-stream' &&
            //     name.indexOf(".fui") == -1 &&
            //     name.indexOf(".bin") == -1) {
            //     continue;
            // }
            var temp = name_1.split(".");
            temp.pop();
            // 以文件类型作为包名
            if (name_1.indexOf(".fui") != -1 || name_1.indexOf(".bin") != -1 || name_1.indexOf(".xml") != -1 || name_1.indexOf(".bytes") != -1) {
                name_1 = temp.join("");
                name_1 = name_1.replace(/_fui/g, ""); // fix unity file name
                flag = true;
                pkgName = name_1;
            }
            else {
                name_1 = temp.join("");
            }
            type = type.replace("application/octet-stream", "bin").replace("image/png", "image") || "bin";
            if (!RES.hasRes(name_1)) {
                RES.$addResourceData({
                    name: name_1,
                    type: type,
                    url: url
                });
                fileNames.push(name_1);
            }
            else {
                hasImport = true;
            }
        }
        if (fileNames.length == 0 && !hasImport) {
            alert("未发现有效的资源文件！");
        }
        else {
            if (!flag) {
                alert("未发现有效的fairygui文件！");
            }
            else {
                // RES.destroyRes(pkgName);
                RES.createGroup("import", fileNames, true);
                EventManager.emit(Events.SHOW_VIEW);
                EventManager.emit(Events.UPLOAD_SUCCESS, { pkgName: pkgName, urls: urls });
            }
        }
    };
    return FileParser;
}(egret.EventDispatcher));
__reflect(FileParser.prototype, "FileParser");
//# sourceMappingURL=FileParser.js.map