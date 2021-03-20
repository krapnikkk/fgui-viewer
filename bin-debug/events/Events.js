var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Events = (function () {
    function Events() {
    }
    Events.UPLOAD_SUCCESS = "upload_success";
    Events.SHOW_VIEW = "show_view";
    Events.UPDATE_VIEW = "update_view";
    Events.DELETE_VIEW = "delete_view";
    Events.SHOW_LIST = "show_list";
    Events.HIDE_LIST = "hide_list";
    Events.INIT_LIST = "init_list";
    Events.EMIT_UPLOAD = "emit_upload";
    return Events;
}());
__reflect(Events.prototype, "Events");
//# sourceMappingURL=Events.js.map