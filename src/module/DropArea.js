/**
 * @author Park ji man
 * @version 0.0.2
 * @desc Drag and Drop Component by JINDO Library
 *
 * @usage
 * var oDropArea = new nts.Component.DropArea((sDropClassName), (sDragClassName)).attach({
 *       drop: function (oCustomEvent) {
 *           //TODO Implement Custom event
 *       }
 *   });
 *
 *   new nts.Component.DropArea( drop 엘리먼트 클래스명(String) , drag 엘리먼트 클래스명(String) ) . attach ({
 *        사용자 커스텀 이벤트 등록
 *   });
 * */
nts.Component.DropArea = jindo.$Class({
    $init: function (sDropClassName, sDragClassName) {
        this._sDropClassName = sDropClassName;
        this._sDragClassName = sDragClassName;
        this._welDocument = jindo.$Element(document);
        this._welDroppableArea = this._welDocument.query(this._sDropClassName);

        this.activate();
    },

    _onActivate: function () {
        this._cachedFunction();
        this._attachEvent();
    },

    _cachedFunction: function () {
        this._wfnDrop = jindo.$Fn(this._onDrop, this).bind();
    },

    _attachEvent: function () {
        this._welDocument.attach('mouseup', this._wfnDrop);
    },

    _onDrop: function (we) {
        var htMousePos = we.pos();

        if (this._isConflict(htMousePos) && this._isOverDragElement(we)) {
            this.fireEvent('drop', we);
        }
    },

    _isConflict: function (htMousePos) {
        var nLeftDropArea = parseInt(this._welDroppableArea.css("left"), 10);
        var nTopDropArea = parseInt(this._welDroppableArea.css("top"), 10);
        var nRightDropArea = nLeftDropArea + parseInt(this._welDroppableArea.css("width"), 10) + parseInt(this._welDroppableArea.css("border-right-width"), 10) * 2;
        var nBottomDropArea = nTopDropArea + parseInt(this._welDroppableArea.css("height"), 10) + parseInt(this._welDroppableArea.css("border-bottom-width"), 10) * 2;

        return htMousePos.pageX >= nLeftDropArea && htMousePos.pageY >= nTopDropArea && htMousePos.pageX <= nRightDropArea && htMousePos.pageY <= nBottomDropArea;
    },

    _isOverDragElement: function (we) {
        return jindo.$Element(we.srcElement).hasClass(this._sDragClassName.replace('.', ''));
    },

    _onDeactivate: function () {
        this._welDocument.detach('mouseup', this._wfnDrop);
    }
}).extend(jindo.UIComponent);