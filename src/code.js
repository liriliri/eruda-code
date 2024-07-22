import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import nextTick from 'licia/nextTick'
import copy from 'licia/copy'
import beautify from 'js-beautify'
import stripIndent from 'licia/stripIndent'

export default function (eruda) {
  let { evalCss } = eruda.util

  class Code extends eruda.Tool {
    constructor() {
      super()
      this.name = 'code'
      this._style = evalCss(require('./style.scss'))
      this._CodeMirrorStyle = evalCss(
        require('codemirror/lib/codemirror.css') +
          require('codemirror/theme/material-darker.css')
      )
      this._CodeMirrorCustomStyle = evalCss(require('./CodeMirror.css'))
      this._editor = null
    }
    init($el, container) {
      super.init($el, container)

      $el.html(stripIndent`<textarea class="eruda-editor">function fib(num) {
        if (num <= 2) return 1;
        return fib(num - 1) + fib(num - 2);
      }
      console.log(fib(5));</textarea>
      <div class="eruda-bottom-bar">
        <div class="eruda-btn eruda-beautify">
          Beautify
        </div>
        <div class="eruda-btn eruda-copy">
          Copy
        </div>
        <div class="eruda-btn eruda-clear">
          Clear
        </div>
        <div class="eruda-btn eruda-run">
          Run
        </div>
      </div>`)
      this._bindEvent()
    }
    show() {
      super.show()
      if (!this._editor) {
        let container = this._$el.find('.eruda-editor').get(0)
        this._editor = CodeMirror.fromTextArea(container, {
          lineNumbers: 'true',
          mode: 'javascript',
        })
        nextTick(() => this._editor.refresh())
      }
    }
    hide() {
      super.hide()
    }
    run() {
      try {
        evalJs(this._editor.getValue())
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e)
      }
    }
    beautify() {
      let editor = this._editor

      let value = editor.getValue()
      editor.setValue(beautify(value))
    }
    copy() {
      copy(this._editor.getValue())
      eruda.get().notify('Copied', { icon: 'success' })
    }
    clear() {
      this._editor.setValue('')
    }
    destroy() {
      super.destroy()
      evalCss.remove(this._style)
      evalCss.remove(this._CodeMirrorStyle)
      evalCss.remove(this._CodeMirrorCustomStyle)
    }
    _bindEvent() {
      this._$el
        .on('click', '.eruda-run', () => this.run())
        .on('click', '.eruda-beautify', () => this.beautify())
        .on('click', '.eruda-clear', () => this.clear())
        .on('click', '.eruda-copy', () => this.copy())
    }
  }

  let evalJs = (code) => {
    let ret

    try {
      ret = eval.call(window, `(${code})`)
    } catch (e) {
      ret = eval.call(window, code)
    }

    return ret
  }

  return new Code()
}
