import React from 'react'
import MonacoEditor, {
  EditorWillMount,
  EditorDidMount,
} from 'react-monaco-editor'
import * as monacoEditor from 'monaco-editor'
import decl from '../../lib/declaration'

type Mode = 'javascript' | 'json'

type Props = {
  mode: Mode
  code: string
  handleCodeChange: (value: string, event?: any) => void
}

const options: monacoEditor.editor.IEditorConstructionOptions = {
  acceptSuggestionOnEnter: 'on',
  fontSize: 16,
  showUnused: true,
  snippetSuggestions: 'inline',
}

const Editor: React.FC<Props> = ({ mode, code, handleCodeChange }) => {
  //const editorWillMount: EditorWillMount = monaco => {
  //  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  //    noSemanticValidation: false,
  //    noSyntaxValidation: false
  //  })
  //  monaco.languages.typescript.javascriptDefaults.addExtraLib(
  //    decl,
  //    'iost-contract'
  //  )
  //}

  const editorDidMount: EditorDidMount = monaco => {
    monaco.layout({
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.75,
    })

    window.addEventListener('resize', () => {
      monaco.layout({
        width: window.innerWidth * 0.5,
        height: window.innerHeight * 0.75,
      })
    })
  }

  return (
    <MonacoEditor
      language={mode}
      onChange={handleCodeChange}
      options={options}
      editorDidMount={editorDidMount}
      value={code}
    />
  )
}

export default Editor
