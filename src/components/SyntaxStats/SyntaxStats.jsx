import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './styles.css';
ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomColors = numColors => {
  const randomColors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    randomColors.push(color);
  }
  return randomColors;
};

function SyntaxStats({ statistics }) {
  const [errorFrequencyData, setErrorFrequencyData] = useState();
  const [errorSeverityData, setErrorSeverityData] = useState();

  const Messages = () => {
    if (statistics.messages.length !== 0) {
      return (
        <>
          <h2 className='heading-info'>Messages</h2>
          {statistics.messages.map((item, index) => (
            <p className="message" key={index}>
              {item.message}. Line: {item.line} Column: {item.column}
            </p>
          ))}
        </>
      );
    } else {
      return <h2>No messages</h2>;
    }
  };

  const countErrorFrequency = () => {
    if (!statistics) {
      return;
    }
    const frequencies = {};
    statistics.messages.forEach(message => {
      const { ruleId } = message;
      if (frequencies[ruleId]) {
        frequencies[ruleId]++;
      } else {
        frequencies[ruleId] = 1;
      }
    });
    const backgroundColors = generateRandomColors(
      Object.keys(frequencies).length
    );
    setErrorFrequencyData({
      labels: Object.keys(frequencies),
      datasets: [
        {
          label: 'Error Type Frequencies',
          backgroundColor: backgroundColors,
          data: Object.values(frequencies),
        },
      ],
    });
  };

  const countErrorSeverity = () => {
    if (!statistics) {
      return;
    }
    const errorSeverity = {};
    statistics.messages.map(message => {
      const { severity } = message;
      const severityName =
        severity === 2 ? 'Error' : severity === 1 ? 'Warn' : 'Off';
      if (errorSeverity[severityName]) {
        errorSeverity[severityName]++;
      } else {
        errorSeverity[severityName] = 1;
      }
    });
    const backgroundColors = generateRandomColors(
      Object.keys(errorSeverity).length
    );
    setErrorSeverityData({
      labels: Object.keys(errorSeverity),
      datasets: [
        {
          label: 'Error Severity',
          backgroundColor: backgroundColors,
          data: Object.values(errorSeverity),
        },
      ],
    });
  };

  useEffect(() => {
    countErrorFrequency();
    countErrorSeverity();
  }, [statistics]);

  return (
    statistics && (
      <div>
        <h2 className='heading-info'>Main information</h2>
        <ul className="list">
          <li> Total errors: {statistics.errorCount}</li>
          <li> Total warnings: {statistics.warningCount}</li>
        </ul>
        <Messages />
        {errorFrequencyData && (
          <>
            <h2 className='heading-info'>Error Type Frequencies</h2>
            <div
              style={{ width: '50%', display: 'flex', margin: 'auto' }}>
              <Pie data={errorFrequencyData} />
            </div>
          </>
        )}
        {errorSeverityData && (
          <>
            <h2 className='heading-info'>Error Severity Statistics</h2>
            <div
              style={{ width: '50%', display: 'flex', margin: 'auto' }}>
              <Pie data={errorSeverityData} />
            </div>
          </>
        )}
      </div>
    )
  );
}

export default SyntaxStats;
