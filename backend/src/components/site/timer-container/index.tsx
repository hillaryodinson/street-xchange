import React, { useState, useEffect } from "react";

interface TimerContainerProps {
	startTime: Date;
	expiryTimeInSeconds: number;
	children: React.ReactNode;
}

const TimerContainer: React.FC<TimerContainerProps> = ({
	startTime,
	expiryTimeInSeconds,
	children,
}) => {
	const [timeLeft, setTimeLeft] = useState<number>(expiryTimeInSeconds);

	useEffect(() => {
		const targetTime = new Date(
			startTime.getTime() + expiryTimeInSeconds * 1000
		);

		const interval = setInterval(() => {
			const now = new Date();
			const diff = Math.max(
				0,
				Math.floor((targetTime.getTime() - now.getTime()) / 1000)
			); // Calculate remaining time in seconds
			setTimeLeft(diff);

			if (diff <= 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [startTime, expiryTimeInSeconds]);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	if (timeLeft <= 0) {
		return <p className="text-red-500">Time expired!</p>;
	}

	return (
		<div className="w-full flex flex-col items-center justify-center p-4 border rounded-md bg-gray-50">
			<p className="text-sm text-muted-foreground">
				Time left: {minutes}m {seconds}s before transaction is cancelled
			</p>
			{children}
		</div>
	);
};

export default TimerContainer;
