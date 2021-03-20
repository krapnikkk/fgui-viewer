class FileParser extends egret.EventDispatcher {
    constructor() {
        super();
    }

    parseFile(files: File[] | FileList) {
        let fileNames: string[] = [], flag = false;
        let pkgName = "",hasImport = false;
        let urls = [];
        for (let i = 0; i < files.length; i++) {
            let file: File = files[i];
            let url = URL.createObjectURL(file);
            urls.push(url);
            let { name, type } = file;
            // todo 
            // 过滤不相关资源
            // if (type !== 'image/jpeg' &&
            //     type !== 'image/png' &&
            //     type !== 'application/octet-stream' &&
            //     name.indexOf(".fui") == -1 &&
            //     name.indexOf(".bin") == -1) {
            //     continue;
            // }
            let temp = name.split(".")
            temp.pop();
            // 以文件类型作为包名
            if (name.indexOf(".fui") != -1 || name.indexOf(".bin") != -1 || name.indexOf(".xml") != -1 || name.indexOf(".bytes") != -1 ) { // 用户自定义
                name = temp.join("");
                name = name.replace(/_fui/g,""); // fix unity file name
                flag = true;
                pkgName = name;
            } else {
                name = temp.join("");
            }

            type = type.replace("application/octet-stream", "bin").replace("image/png", "image") || "bin";
            if (!RES.hasRes(name)) {
                RES.$addResourceData({//添加资源组
                    name,
                    type,
                    url
                });
                fileNames.push(name);
            }else{
                hasImport = true;
            }

        }
        if (fileNames.length == 0 && !hasImport) {
            alert("未发现有效的资源文件！");
        } else {
            if (!flag) {
                alert("未发现有效的fairygui文件！");
            } else {
                // RES.destroyRes(pkgName);
                
                RES.createGroup("import", fileNames, true)
                EventManager.emit(Events.SHOW_VIEW);
                EventManager.emit(Events.UPLOAD_SUCCESS, { pkgName, urls });
            }
        }
    }



}