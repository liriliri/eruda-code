import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

module.exports = function (eruda) 
{
    let {evalCss} = eruda.util;

    class Code extends eruda.Tool {
        constructor() {
            super();
            this.name = 'code';
            this._style = evalCss(require('./style.scss'));
            this._CodeMirrorStyle = evalCss(require('codemirror/lib/codemirror.css'));
            this._CodeMirrorCustomStyle = evalCss(require('./CodeMirror.css'));
            this._editor = null;
        }
        init($el, container) 
        {
            super.init($el, container);

            $el.html(require('./template.hbs')());
        }
        show() 
        {
            super.show();
            if (!this._editor) 
            {
                let container = this._$el.find('.eruda-editor').get(0);
                this._editor = CodeMirror(container, {
                    value: 'console.log("Hello world")!',
                    lineNumbers: 'true',
                    mode: 'javascript'
                });
                this._editor.refresh();
            }
        }
        hide()
        {
            super.hide();
        }
        destroy() 
        {
            super.destroy();
            evalCss.remove(this._style);
            evalCss.remove(this._CodeMirrorStyle);
            evalCss.remove(this._CodeMirrorCustomStyle);
        }
    }

    return new Code();
};