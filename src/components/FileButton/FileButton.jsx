import React, { useState } from 'react';
import fileToBase64 from '../../utils/fileToBase64.js';
import './style.css';

export default function FileButton({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file found');
      return;
    }

    try {
      const base64File = await fileToBase64(selectedFile);

      const response = await fetch('http://localhost:3000/file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: base64File }),
      });

      if (response.ok) {
        const code = await response.text();
        return onFileUpload(code);
      }
      console.error('File upload failed');
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  return (
    <div className="file-section d-flex justify-between">
      <h3 className="file-name">{selectedFile?.name ?? 'No file'}</h3>
      <div className="d-flex to-end gap-3">
        <label htmlFor="fileInput">
          <input
            type="file"
            id="fileInput"
            accept=".js"
            onChange={handleFileChange}
          />
          Select File
        </label>
        <button disabled={selectedFile ? false : true} onClick={handleUpload}>
          Upload File
        </button>
      </div>
    </div>
  );
}
