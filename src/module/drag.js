/**
 * @author Park ji man
 * @version 0.0.1
 * @desc Drag and Drop Component by JINDO Library
 * */
nts.Component.DragModel = jindo.$Class({
    $init: function (el) {
        this.activate(el);
    },

    _onActivate: function (el) {
        this._welDragObject = el;
        this._welDocument = jindo.$Element(document);
        this._welCopyDragObject = this._welDragObject.clone().css({'position': 'absolute', 'z-index': 200});

        // attach Event : Document, dragObject
        this._welDocument.attach('mouseup', jindo.$Fn(this._dragEnd, this).bind());
        this._welDocument.attach('mousemove', jindo.$Fn(this._dragging, this).bind());
        this._welDragObject.attach('mousedown', jindo.$Fn(this._dragStart, this).bind());
    },

    _dragStart: function () {
        this._isDragging = true;
        this._welDragObject.after(this._welCopyDragObject.hide());
    },

    _dragging: function (e) {
        if (this._isDragging && this._welCopyDragObject.show()) {
            var nCopyDragObjectWidth = e.pos().pageY - parseInt(this._welCopyDragObject.css("width")) / 2;
            var nCopyDragObjectHeight = e.pos().pageX - parseInt(this._welCopyDragObject.css("height")) / 2;
            this._welCopyDragObject.offset(nCopyDragObjectWidth, nCopyDragObjectHeight);
        }
    },

    _dragEnd: function (e) {
        this._isDragging = false;
        this._welDocument.remove(this._welCopyDragObject);
    }
}).extend(jindo.UIComponent);