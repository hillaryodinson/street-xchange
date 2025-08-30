"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "../generic/header";

const testimonials = [
	{
		id: 1,
		name: "Jane Doe",
		comment:
			"This service completely changed my business. Highly recommend!",
		rating: 5,
		avatar: "/default.png",
	},
	{
		id: 2,
		name: "John Smith",
		comment: "Fantastic experience, smooth and reliable every time!",
		rating: 4,
		avatar: "/default.png",
	},
	{
		id: 3,
		name: "Sarah Lee",
		comment: "The best investment I’ve made this year. Truly outstanding.",
		rating: 5,
		avatar: "/default.png",
	},
];

export default function TestimonialSection() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % testimonials.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const testimonial = testimonials[index];

	return (
		<section
			className="flex flex-col md:flex-row w-full py-24 "
			id="testimonials">
			{/* Left Section */}
			<div className="flex-1">
				<Header className="text-2xl text-center">
					What our customers are saying
				</Header>
				<div className="flex justify-center items-center p-12 text-center">
					<AnimatePresence mode="wait">
						<motion.div
							key={testimonial.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.6 }}
							className="max-w-md">
							<div className="flex flex-col items-center gap-4">
								<div className="w-16 h-16 overflow-hidden rounded-full border">
									<Image
										src={testimonial.avatar}
										alt={testimonial.name}
										width={1000}
										height={1000}
										className="object-cover"
									/>
								</div>
								<h3 className="text-lg font-semibold">
									{testimonial.name}
								</h3>
								<p className="text-gray-700">
									{testimonial.comment}
								</p>
								<div className="flex gap-1">
									{Array.from({
										length: testimonial.rating,
									}).map((_, i) => (
										<span
											key={i}
											className="text-yellow-500 text-xl">
											★
										</span>
									))}
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			{/* Right Section */}
			<div className="hidden md:block md:w-1/2 h-[400px] bg-primary rounded-[50px] overflow-hidden">
				<Image
					width={1000}
					height={1000}
					className="w-full h-full object-cover"
					src="/trophy-room.jpeg"
					alt="trophy room"
				/>
			</div>
		</section>
	);
}
