import { useState } from 'react';
import FileButton from './components/FileButton/FileButton';
import CheckSyntax from './components/CheckSyntax/CheckSyntax';
import CodeEditor from '@uiw/react-textarea-code-editor';
import './App.css';
import SyntaxStats from './components/SyntaxStats/SyntaxStats'

function App() {
  const [code, setCode] = useState("console.log('hello world');");
  const [statistics, setStatistics] = useState(null);

  return (
    <main>
      <h1>Static Syntax Check For JS</h1>
      <FileButton onFileUpload={setCode} />
      <CodeEditor
        value={code}
        language="js"
        placeholder="Enter JS code"
        onChange={evn => setCode(evn.target.value)}
        padding={15}
        data-color-mode="dark"
        style={{
          display: 'flex',
          margin: '0.75rem auto',
          backgroundColor: '#161616',
          marginBottom: '0.75rem',
          border: '1px solid #646cff',
          borderRadius: '8px',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <CheckSyntax code={code} setStatistics={setStatistics} />
      <SyntaxStats statistics={statistics}/>
    </main>
  );
}

export default App;
