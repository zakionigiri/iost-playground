import React from 'react'
import AceEditor from 'react-ace'
import useStyles from './styles'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-monokai'

type Mode = 'javascript' | 'json'

type Props = {
  mode: Mode
  code: string
  handleCodeChange: (value: string, event?: any) => void
}

const Editor: React.FC<Props> = ({ mode, code, handleCodeChange }) => {
  const classes = useStyles()

  return (
    <AceEditor
      className={classes.editor}
      width="50vw"
      height="80vh"
      placeholder=""
      mode={mode}
      theme="monokai"
      name="blah2"
      onChange={handleCodeChange}
      onLoad={editor => {
        const session = editor.getSession()
        const undoManager = session.getUndoManager()
        editor.once('change', () => {
          editor.session.getUndoManager().reset()
        })
        session.setUndoManager(undoManager)
      }}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={code}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  )
}

export default Editor
