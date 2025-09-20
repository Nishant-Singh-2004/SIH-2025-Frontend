import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './AttendanceGenerator.css'; 

type AttendanceGeneratorProps = {
	courseId:String;
	subjectId:String;
}

const AttendanceGenerator = ({ courseId, subjectId }:AttendanceGeneratorProps) => {
  const [qrValue, setQrValue] = useState('');
  const [sessionInfo, setSessionInfo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds

  const generateQRCode = async () => {
    // Collect the current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    try {
      // 1. Send data to the backend to create an attendance session
      const response = await fetch('/api/teacher/attendance/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          subjectId,
          date: formattedDate,
          time: formattedTime,
        }),
      });
      
      const data = await response.json();
      setSessionInfo(data); // e.g., { sessionId: "uuid-123", classDetails: {...} }
      
      // 2. Construct the QR code value with the unique sessionId and timestamp
      const qrData = JSON.stringify({
        sessionId: data.sessionId,
        timestamp: Date.now(),
      });
      setQrValue(qrData);
      setTimeLeft(600); // Reset timer to 10 minutes
    } catch (error) {
      console.error('Failed to generate QR session:', error);
    }
  };

  useEffect(() => {
    if (qrValue && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); // Update every second
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      setQrValue(''); // Invalidate the QR code
      setSessionInfo(null);
    }
  }, [qrValue, timeLeft]);

  return (
    <div className="attendance-generator-container">
      <h2>Generate Attendance QR Code</h2>
      <button onClick={generateQRCode} disabled={!!qrValue}>
        {qrValue ? 'Generating...' : 'Generate QR Code'}
      </button>

      {qrValue && (
        <div className="qr-code-display">
          <QRCodeCanvas value={qrValue} size={256} level="H" />
          <p>This code is valid for **{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}** minutes.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceGenerator;