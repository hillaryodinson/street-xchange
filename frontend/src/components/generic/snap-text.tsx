"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SnapText({ texts }: { texts: React.ReactNode[] }) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % texts.length);
		}, 5000); // every 4s
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative h-32 flex items-center">
			<AnimatePresence mode="wait">
				<motion.h2
					key={index}
					className="absolute text-2xl sm:text-3xl md:text-4xl xl:text-4xl leading-tight font-light"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{
						opacity: 0,
						y: -30,
						filter: "blur(6px)", // fake "snap" fade
						transition: { duration: 1 },
					}}
					transition={{ duration: 0.8 }}>
					{texts[index]}
				</motion.h2>
			</AnimatePresence>
		</div>
	);
}
