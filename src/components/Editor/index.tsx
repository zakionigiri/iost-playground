import React from 'react'
import MonacoEditor, { EditorWillMount } from 'react-monaco-editor'
import useStyles from './styles'
import { editor } from 'monaco-editor'
import decl from '../../lib/declaration'

type Mode = 'javascript' | 'json'

type Props = {
  mode: Mode
  code: string
  handleCodeChange: (value: string, event?: any) => void
}

const options: editor.IEditorConstructionOptions = {
  acceptSuggestionOnEnter: 'on',
  //   fixedOverflowWidgets: true
  fontSize: 16,
  showUnused: true,
  snippetSuggestions: 'inline'
}

const Editor: React.FC<Props> = ({ mode, code, handleCodeChange }) => {
  const classes = useStyles()

  const editorWillMount: EditorWillMount = monaco => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    })

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      decl,
      'iost.d.ts'
    )
  }

  return (
    <MonacoEditor
      width="55vw"
      height="80vh"
      theme="vs"
      language="javascript"
      onChange={handleCodeChange}
      options={options}
      editorWillMount={editorWillMount}
      value={code}
    />
  )
}

export default Editor
