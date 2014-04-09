/**
 * @author Park ji man
 * @version 0.0.2
 * @desc Drag Component by JINDO Library
 *
 * @usage
 * var oDragArea = new nts.Component.DragArea(  sClassName  );
 *
 * sClassName(String) : Drag 객체로 지정하고 싶은 엘리먼트의 ClassName
 *
 * */
nts.Component.DragArea = jindo.$Class({
    $init: function (sClassName) {
        this._sDropClassName = sClassName;
        this._welDocument = jindo.$Element(document);
        this.activate();
    },

    _onActivate: function () {
        this._cachedFunction();
        this._attachEvent();
    },

    _cachedFunction: function () {
        this._fnOnLeftMouseButton = function (we) {
            return we._event.which === 1
        };
        this._wfnOnDragStart = jindo.$Fn(this._onDragStart, this).bind();
        this._wfnOnDrag = jindo.$Fn(this._onDrag, this).bind();
        this._wfnOnDragEnd = jindo.$Fn(this._onDragEnd, this).bind();
        this._wfnOnSelectPrevent = jindo.$Fn(this._onSelectPrevent, this).bind();
    },

    _attachEvent: function () {
        this._welDocument.delegate('mousedown', this._sDropClassName, this._wfnOnDragStart);
        this._welDocument.attach('selectstart', this._wfnOnSelectPrevent);
        this._welDocument.attach('mousemove', this._wfnOnDrag);
        this._welDocument.attach('mouseup', this._wfnOnDragEnd);
    },

    _onDragStart: function (we) {
        if (this._fnOnLeftMouseButton(we)) {
            this._bIsDragging = true;
            this._welDraggableArea = jindo.$Element(we.element);
            if (this._welDraggableArea.hasClass(this._sDropClassName.replace('.', ''))) {
                var zIndexMaxValue = 2147483647;
                this._welCopyDraggableArea = this._welDraggableArea.clone();
                this._welCopyDraggableArea.css({'position': 'absolute', 'z-index': zIndexMaxValue});
            }
        }
    },

    _onDrag: function (we) {
        if (this._fnOnLeftMouseButton(we) && this._bIsDragging) {
            this._welDraggableArea.after(this._welCopyDraggableArea);
            var nTopPosition = we.pos().pageY - (parseInt(this._welCopyDraggableArea.css("width"), 10) / 2);
            var nLeftPosition = we.pos().pageX - (parseInt(this._welCopyDraggableArea.css("height"), 10) / 2);
            this._welCopyDraggableArea.offset(nTopPosition, nLeftPosition);
        }
    },

    _onDragEnd: function () {
        if (this._welCopyDraggableArea != undefined) {
            this._bIsDragging = false;
            this._welDocument.remove(this._welCopyDraggableArea);
        }
    },

    _onSelectPrevent: function (we) {
        we.stopDefault();
    },

    _onDeactivate: function () {
        this._welDocument.undelegate('mousedown', this._sDropClassName, this._wfnOnDragStart);
        this._welDocument.detach('selectstart', this._wfnOnSelectPrevent);
        this._welDocument.detach('mouseup', this._wfnOnDragEnd);
        this._welDocument.detach('mousemove', this._wfnOnDrag);
    }
}).extend(jindo.UIComponent);