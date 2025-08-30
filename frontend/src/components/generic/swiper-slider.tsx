"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface Breakpoints {
	[key: string]: number;
}

interface CarouselProps {
	children: React.ReactNode[];
	breakpoints?: Breakpoints; // e.g. { sm: 2.5, md: 3.5, lg: 4 }
	autoSlide?: boolean;
	autoSlideInterval?: number;
	defaultItemsPerView?: number;
	loop?: boolean; // ✅ new prop
	speed?: number; // ✅ marquee speed (seconds to loop once)
}

const Carousel: React.FC<CarouselProps> = ({
	children,
	breakpoints = { sm: 1, md: 1, lg: 1 },
	autoSlide = true,
	autoSlideInterval = 3000,
	defaultItemsPerView,
	loop = false,
	speed = 20,
}) => {
	const [current, setCurrent] = useState(0);
	const [itemsPerView, setItemsPerView] = useState(1);
	const controls = useAnimation();

	// doubled children for loop illusion
	const slides = [...children, ...children];

	// 🖥 Tailwind-like breakpoints
	const handleResize = () => {
		const width = window.innerWidth;
		if (width >= 1024 && breakpoints.lg) {
			setItemsPerView(breakpoints.lg);
		} else if (width >= 768 && breakpoints.md) {
			setItemsPerView(breakpoints.md);
		} else if (width >= 640 && breakpoints.sm) {
			setItemsPerView(breakpoints.sm);
		} else {
			setItemsPerView(defaultItemsPerView || 1);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// 🎬 Animate: two different modes
	useEffect(() => {
		if (loop) {
			// ✅ Marquee style
			controls.start({
				x: ["0%", `-${100}%`],
				transition: {
					repeat: Infinity,
					ease: "linear",
					duration: speed,
				},
			});
		} else if (autoSlide) {
			// ✅ Normal slide mode with reset
			const interval = setInterval(() => {
				setCurrent((prev) => prev + 1);
			}, autoSlideInterval);
			return () => clearInterval(interval);
		}
	}, [loop, autoSlide, autoSlideInterval, speed, controls]);

	// if we've gone too far in reset mode, snap back
	useEffect(() => {
		if (!loop && current >= slides.length) {
			const timeout = setTimeout(() => {
				setCurrent(0);
			}, 0);
			return () => clearTimeout(timeout);
		}
	}, [current, slides.length, loop]);

	return (
		<div className="overflow-hidden relative w-full">
			<motion.div
				className="flex"
				animate={
					loop
						? controls
						: { x: `-${current * (100 / itemsPerView)}%` }
				}
				transition={
					loop ? undefined : undefined //{ type: "spring", stiffness: 300, damping: 30 }
				}>
				{slides.map((child, idx) => (
					<div
						key={idx}
						style={{ flex: `0 0 ${100 / itemsPerView}%` }}
						className="p-2">
						{child}
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default Carousel;
