import { useState, useEffect } from "react";

export function useTimer(start: number = 0) {
    const [time, setTime] = useState<number>(start);

    useEffect(() => {
        const timer = setInterval(() => setTime(prev => prev + 1), 1000);

        return () => clearInterval(timer);
    }, []);

    const reset = () => setTime(0);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    return { time, reset, formatTime };
}
