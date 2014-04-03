/**
 * @author Park ji man
 * @version 0.0.1
 * @desc Drag and Drop Component by JINDO Library
 * */
nts.Component.DropModel = jindo.$Class({
    $init: function (el, sClassName) {
        this.activate(el, sClassName);
    },

    _onActivate: function (el, sClassName) {
        this._welDropAreaObject = el;
        this._welDocumentBody = jindo.$Element(document.body);

        this._welDocumentBody.delegate("mouseup", sClassName, jindo.$Fn(this.drop, this).bind());
    },

    drop: function (oCustomEvent) { // this for public method for fireEvent
        var oMouse = oCustomEvent.pos();

        if (this._isConflict(oMouse)) {
            alert(jindo.$Element(oCustomEvent.element).text() + " is Dropped. ");
        }
    },

    _isConflict: function (oMouse) {
        var nLeftDropArea = parseInt(this._welDropAreaObject.css("left"), 10);
        var nTopDropArea = parseInt(this._welDropAreaObject.css("top"), 10);
        var nRightDropArea = nLeftDropArea + parseInt(this._welDropAreaObject.css("width")) + parseInt(this._welDropAreaObject.css("border-left-width")) * 2;
        var nBottomDropArea = nTopDropArea + parseInt(this._welDropAreaObject.css("height")) + parseInt(this._welDropAreaObject.css("border-top-width")) * 2;

        return oMouse.pageX >= nLeftDropArea && oMouse.pageY >= nTopDropArea && oMouse.pageX <= nRightDropArea && oMouse.pageY <= nBottomDropArea;
    }
}).extend(jindo.UIComponent);