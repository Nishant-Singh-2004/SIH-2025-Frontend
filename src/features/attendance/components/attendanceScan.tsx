import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

type AttendanceScannerProps = {
    studentId: string;
}

const AttendanceScanner = ({ studentId }: AttendanceScannerProps) => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'success' | 'error' | 'info'>('info');
    const [loading, setLoading] = useState(true);
    const [cameraError, setCameraError] = useState(false);

    const handleScan = async (data: string | null) => {
        if (data) {
            try {
                const qrData = JSON.parse(data);
                const { sessionId } = qrData;

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
                    setStatus('success');
                } else {
                    setMessage(`Error: ${result.message}`);
                    setStatus('error');
                }
            } catch (error) {
                setMessage('Invalid or malformed QR code.');
                setStatus('error');
                console.error('QR code scan error:', error);
            }
        }
    };

    const handleError = (err: any) => {
        setCameraError(true);
        setLoading(false);
        setMessage('Failed to access camera. Please check permissions and refresh the page.');
        setStatus('error');
        console.error(err);
    };


    // QrReader does not support onLoad, so we use a timeout as a workaround
    // to hide the loading indicator after a short delay if no error occurs
    React.useEffect(() => {
        if (loading && !cameraError) {
            const timer = setTimeout(() => setLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [loading, cameraError]);

    const messageStyles = {
        success: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        error: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Scan QR Code</h2>
            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden border-4 border-gray-300 dark:border-gray-700 relative">
                {loading && !cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-10">
                        <span className="text-gray-500">Initializing camera...</span>
                    </div>
                )}
                {cameraError ? (
                    <div className="flex flex-col items-center justify-center w-full h-full p-4">
                        <span className="text-red-500 font-semibold mb-2">Camera not accessible</span>
                        <span className="text-gray-500 text-sm text-center">Please check browser permissions and refresh the page.</span>
                    </div>
                ) : (
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                handleScan(result?.getText());
                            }
                            if (!!error) {
                                handleError(error);
                            }
                            // Hide loading indicator as soon as we get a result or error
                            if (loading) setLoading(false);
                        }}
                        constraints={{ facingMode: 'environment' }}
                        className="w-full h-full"
                    />
                )}
            </div>
            {message && (
                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${messageStyles[status]}`}>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default AttendanceScanner;
