import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import './AttendanceScanner.css';

type AttendanceScannerProps = {
	studentId:String;
}

const AttendanceScanner = ({ studentId }:AttendanceScannerProps) => {
  const [scanResult, setScanResult] = useState('');
  const [message, setMessage] = useState('');

  const handleScan = async (data:any) => {
    if (data) {
      setScanResult(data);
      try {
        const qrData = JSON.parse(data);
        const { sessionId } = qrData;

        // The backend will handle the validation of the sessionId and the timestamp
        const response = await fetch('/api/student/attendance/mark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            studentId,
            method: 'QR',
          }),
        });

        const result = await response.json();
        if (response.ok) {
          setMessage(`Attendance marked successfully! Status: ${result.status}`);
        } else {
          setMessage(`Error: ${result.message}`);
        }
      } catch (error) {
        setMessage('Invalid or malformed QR code.');
        console.error('QR code scan error:', error);
      }
    }
  };

  const handleError = (err:any) => {
    console.error(err);
    setMessage('Failed to access camera. Please check permissions.');
  };

  return (
    <div className="attendance-scanner-container">
      <h2>Scan QR Code for Attendance</h2>
      <QrReader
        onResult={(result, error) => {
            if (!!result) {
                handleScan(result?.getText());
            }
            if (!!error) {
                handleError(error);
            }
        }}
        scanDelay={300}
        constraints={{ facingMode: 'environment' }}
        className="qr-reader"
      />
      <div className="status-message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AttendanceScanner;