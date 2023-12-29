import React from 'react';
import './style.css';

export default function CheckSyntax({ code, setStatistics }) {
  const handleCheckSyntax = async () => {
    if (!code) {
      console.error('No code to check');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeToCheck: code }),
      });

      if (response.ok) {
        const syntaxCheckStats = await response.json();
        return setStatistics(syntaxCheckStats[0]);
      }
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };
  return (
    <button
      disabled={code ? false : true}
      onClick={handleCheckSyntax}
      className="check-syntax-btn">
      Check Syntax
    </button>
  );
}
