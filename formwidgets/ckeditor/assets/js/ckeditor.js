/*
 * CKEditor form field control (WYSIWYG)
 *
 * Data attributes:
 * - data-control="wysiwyg" - enables the CKEditor plugin
 *
 * JavaScript API:
 * $('textarea').wysiwyg()
 *
 * Dependencies:
 * - CKEditor (ckeditor.js)
 */
+function ($) { "use strict";
    var Base = $.wn.foundation.base,
        BaseProto = Base.prototype

    // WYSIWYGEDITOR CLASS DEFINITION
    // ============================

    var WyiswygEditor = function(element, options) {
        this.options     = options
        this.$el         = $(element)
        this.$textarea   = this.$el.find('>textarea:first')
        this.$form       = this.$el.closest('form')
        this.editor      = null

        $.wn.foundation.controlUtils.markDisposable(element)

        Base.call(this)

        this.init()
    }

    WyiswygEditor.prototype = Object.create(BaseProto)
    WyiswygEditor.prototype.constructor = WyiswygEditor

    WyiswygEditor.DEFAULTS = {
        width: '',
        height: '',
        toolbar: '',
        theme: '',
        lang: '',
    }

    WyiswygEditor.prototype.init = function() {
        var self = this;

        this.$el.one('dispose-control', this.proxy(this.dispose))

        /*
         * Initialize Froala editor
         */
        this.initCKEditor()
    }

    WyiswygEditor.prototype.initCKEditor = function() {
        var ckEditorOptions = {
                width: this.options.width,
                height: this.options.height,
                toolbar: this.options.toolbar,
                // skin: this.options.theme,
                language: this.options.lang,
                //customparagraph,blockquote2,footnotes,custompullquoteleft,htmlbuttons
                extraPlugins: 'image2,mediamanager,justify,indentblock,button,menubutton',
            },
            _self = this;

        this.$form.on('oc.beforeRequest', this.proxy(this.onFormBeforeRequest))

        this.editor = this.$textarea.ckeditor(ckEditorOptions, function() {
            this.addCommand('submitForm', {
                exec: function (editor) {
                    _self.$form.find(':submit').trigger('click')
                }
            });
            this.keystrokeHandler.keystrokes[CKEDITOR.CTRL + 83 /* S */] = 'submitForm';
        }).editor;

        this.editor.on('change', this.proxy(this.onChange))

        Snowboard.globalEvent("formwidgets.wysiwyg.init", this)
    }

    WyiswygEditor.prototype.dispose = function() {
        this.unregisterHandlers()

        this.editor.destroy();

        this.$el.removeData('wn.richEditor')

        this.options = null
        this.$el = null
        this.$textarea = null
        this.$form = null
        this.editor = null

        BaseProto.dispose.call(this)
    }

    WyiswygEditor.prototype.unregisterHandlers = function() {
        this.$form.off('oc.beforeRequest', this.proxy(this.onFormBeforeRequest))
        this.editor.off('change', this.proxy(this.onChange))

        this.$el.off('dispose-control', this.proxy(this.dispose))
    }

    WyiswygEditor.prototype.getElement = function() {
        return this.$el
    }

    WyiswygEditor.prototype.getEditor = function() {
        return this.editor
    }

    WyiswygEditor.prototype.getTextarea = function() {
        return this.$textarea
    }

    WyiswygEditor.prototype.getContent = function() {
        return this.editor.getData()
    }

    WyiswygEditor.prototype.setContent = function(html) {
        this.editor.setData(html)
    }

    // EVENT HANDLERS
    // ============================

    WyiswygEditor.prototype.onChange = function(ev) {
        this.$textarea.trigger('change')
    }

    /*
     * Synchronizes HTML content before sending AJAX requests
     */
    WyiswygEditor.prototype.onFormBeforeRequest = function(ev) {
        if (!this.editor) {
            return
        }

        this.editor.updateElement();
    }

    // WYSIWYGEDITOR PLUGIN DEFINITION
    // ============================

    var old = $.fn.richEditor

    $.fn.wysiwyg = function (option) {
        var args = Array.prototype.slice.call(arguments, 1), result
        this.each(function () {
            var $this   = $(this)
            var data    = $this.data('wn.wysiwyg')
            var options = $.extend({}, WyiswygEditor.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('wn.wysiwyg', (data = new WyiswygEditor(this, options)))
            if (typeof option == 'string') result = data[option].apply(data, args)
            if (typeof result != 'undefined') return false
        })

        return result ? result : this
    }

    $.fn.wysiwyg.Constructor = WyiswygEditor

    // WYSIWYGEDITOR NO CONFLICT
    // =================

    $.fn.wysiwyg.noConflict = function() {
        $.fn.wysiwyg = old
        return this
    }

    // WYSIWYGEDITOR DATA-API
    // ===============
    $(document).render(function() {
        $('[data-control="wysiwyg"]').wysiwyg()
    })

}(window.jQuery);
