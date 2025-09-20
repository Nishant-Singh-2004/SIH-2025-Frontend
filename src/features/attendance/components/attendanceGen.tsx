import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';

type AttendanceGeneratorProps = {
    courseId: string;
    subjectId: string;
}

const AttendanceGenerator = ({ courseId, subjectId }: AttendanceGeneratorProps) => {
    const [qrValue, setQrValue] = useState('');
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    const generateQRCode = async () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();

        try {
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

            if (!response.ok) throw new Error('Failed to start session');
            
            const data = await response.json();
            
            const qrData = JSON.stringify({
                sessionId: data.sessionId,
                timestamp: Date.now(),
            });
            setQrValue(qrData);
            setTimeLeft(600); // Reset timer
        } catch (error) {
            console.error('Failed to generate QR session:', error);
        }
    };

    useEffect(() => {
        if (qrValue && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
        if (timeLeft === 0) {
            setQrValue('');
        }
    }, [qrValue, timeLeft]);

    return (
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Generate Attendance QR Code</h2>
            <Button onClick={generateQRCode} disabled={!!qrValue} className="mb-6">
                {qrValue ? 'Session Active' : 'Generate QR Code'}
            </Button>

            {qrValue && (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-4 rounded-lg inline-block">
                        <QRCodeCanvas value={qrValue} size={256} level="H" />
                    </div>
                    <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                        Code valid for: <span className="text-indigo-500">{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default AttendanceGenerator;
