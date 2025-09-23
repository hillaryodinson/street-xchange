"use client";
import Header from "@/components/generic/header";
import SnapText from "@/components/generic/snap-text";
import SwipeSlider from "@/components/generic/swiper-slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import TestimonialSection from "@/components/sections/testimonials";
import FaqSection from "@/components/sections/faq";
import CTASection from "@/components/sections/cta-section";

const texts = [
	<React.Fragment key="welcome">
		Welcome to your <br />
		<span className="font-semibold text-primary">all-in-One</span>
		<br />
		<span className="font-semibold">digital exchange hub</span>
	</React.Fragment>,
	<React.Fragment key="swap">
		Swap your <br />
		<span className="font-semibold text-primary">cryptocurrency</span>
		<br />
		<span className="font-semibold">for cash and services</span>
	</React.Fragment>,
	<React.Fragment key="exchange">
		Sell your <br />
		<span className="font-semibold text-primary">gift card</span>
		<br />
		<span className="font-semibold">at an excellent rate</span>
	</React.Fragment>,
	<React.Fragment key="exchange">
		Book your <br />
		<span className="font-semibold text-primary">travels & lodgings</span>
		<br />
		<span className="font-semibold">with cryptocurrency</span>
	</React.Fragment>,
	<React.Fragment key="exchange">
		book your
		<br />
		<span className="font-semibold text-primary">ride</span>
		<br />
		<span className="font-semibold">with your crypto</span>
	</React.Fragment>,
];

export default function Home() {
	return (
		<>
			<main className="flex-col md:flex-row w-full min-h-100dvh! lg:min-h-[calc(100vh-260px)] bg-hero-fade rounded-b-[50px] lg:rounded-b-[100px] flex items-center py-20 px-5">
				<div className="flex flex-1 justify-end items-center md:order-2!">
					<SwipeSlider
						defaultItemsPerView={1}
						autoSlideInterval={5000}>
						<Image
							src={"/generic.png"}
							alt="hero"
							width={500}
							height={500}
							className="w-full object-cover"
						/>
						<Image
							src={"/coins.png"}
							alt="crypto"
							width={500}
							height={500}
							className="w-full object-cover"
						/>
						<Image
							src={"/giftcard.png"}
							alt="hero"
							width={500}
							height={500}
							className="w-full object-cover"
						/>
						<Image
							src={"/travel.png"}
							alt="hero"
							width={500}
							height={500}
							className="w-full object-cover"
						/>
						<Image
							src={"/ride.png"}
							alt="hero"
							width={500}
							height={500}
							className="w-full object-cover"
						/>
					</SwipeSlider>
				</div>
				<div className="flex flex-col w-full md:w-2/4 px-6 lg:px-12 md:order-1!">
					<h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl leading-tight font-light">
						<SnapText texts={texts} />
					</h2>
					<Button className="mt-6 md:mt-10 w-fit px-6 md:px-10 py-4 lg:py-6 bg-black text-white rounded-sm rounded-tr-[30px] font-semibold">
						<Link
							href={`${
								process.env.NEXT_PUBLIC_APP_URL ||
								"localhost:3002"
							}/login`}>
							Get Started
						</Link>
					</Button>
				</div>
			</main>

			{/* Beginning of services */}
			<section className="py-24" id="services">
				<Header className="text-2xl">Our Services</Header>

				<div className="space-y-10 w-full md:w-[90%] mx-auto mt-20">
					<div className="flex flex-col md:flex-row w-full gap-5 items-center">
						{/* Image block */}
						<motion.div
							className="md:w-1/2"
							role="image placeholder"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							<div className="flex w-full gap-4">
								{/* Line decoration */}
								<div className="h-40 w-1 flex flex-col space-y-2 justify-end items-center">
									<div className="h-35 w-1 bg-black/30 rounded-full"></div>
									<div className="h-3 w-3 bg-black/30 rounded-full"></div>
									<div className="h-2 w-2 bg-black rounded-full"></div>
								</div>

								{/* Image container */}
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: false, amount: 0.3 }}
									transition={{
										duration: 0.8,
										ease: "easeOut",
									}}
									className="flex-1 w-full h-full self-end">
									<Image
										src="/exchange.jpg"
										width={400}
										height={400}
										className="object-cover rounded-sm rounded-tl-[50px] shadow-sm"
										alt="Pay Bills"
									/>
								</motion.div>
							</div>
						</motion.div>

						<motion.div
							className="flex-1"
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.8, ease: "easeOut" }}>
							<h2 className=" font-bold mb-2">
								Exchange Crypto & Gift Cards
							</h2>
							<p className="text-gray-700 text-sm font-medium leading-relaxed mb-10">
								Instantly convert your crypto or gift cards into
								reliable cash — anytime, anywhere. Enjoy fast
								transactions, the best rates, and secure payouts
								straight to you.
							</p>

							<Link
								href={`${
									process.env.NEXT_PUBLIC_APP_URL ||
									"localhost:3002"
								}/login`}
								className="rounded-tr-[50px]">
								Swap now
							</Link>
						</motion.div>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-5 items-center">
						{/* Image block */}
						<motion.div
							className="md:w-1/3 md:order-2"
							role="image placeholder"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							<div className="flex w-full gap-4">
								{/* Line decoration */}
								<div className="h-40 w-1 flex flex-col space-y-2 justify-end items-center">
									<div className="h-35 w-1 bg-black/30 rounded-full"></div>
									<div className="h-3 w-3 bg-black/30 rounded-full"></div>
									<div className="h-2 w-2 bg-black rounded-full"></div>
								</div>

								{/* Image container */}
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: false, amount: 0.3 }}
									transition={{
										duration: 0.8,
										ease: "easeOut",
									}}
									className="flex-1 w-full h-full self-end">
									<Image
										src="/smart-ride.jpg"
										width={400}
										height={400}
										className="object-cover rounded-sm rounded-br-[50px] shadow-sm"
										alt="Pay Bills"
									/>
								</motion.div>
							</div>
						</motion.div>

						<motion.div
							className="flex-1 md:order-1"
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.8, ease: "easeOut" }}>
							<h2 className="font-bold mb-2">
								Purchase Services & Pay Bills with Crypto
							</h2>
							<p className="text-gray-700 text-sm font-medium leading-relaxed mb-10">
								Use your digital assets to cover everyday
								essentials with ease. From electricity and
								utility bills to lifestyle services,
								StreetXchange makes it simple to pay directly
								with crypto. No stress, no delays — just fast,
								secure payments that put your digital wealth to
								work in real life.
							</p>
							<Link href={""} className="rounded-tr-[50px]">
								Start paying with crypto today
							</Link>
						</motion.div>
					</div>
					<div className="flex flex-col md:flex-row w-full gap-5 items-center">
						{/* Image block */}
						<motion.div
							className="md:w-1/2"
							role="image placeholder"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							<div className="flex w-full gap-4">
								{/* Line decoration */}
								<div className="h-40 w-1 flex flex-col space-y-2 justify-end items-center">
									<div className="h-35 w-1 bg-black/30 rounded-full"></div>
									<div className="h-3 w-3 bg-black/30 rounded-full"></div>
									<div className="h-2 w-2 bg-black rounded-full"></div>
								</div>

								{/* Image container */}
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: false, amount: 0.3 }}
									transition={{
										duration: 0.8,
										ease: "easeOut",
									}}
									className="flex-1 w-full h-full self-end">
									<Image
										src="/bookflight.jpg"
										width={400}
										height={400}
										className="object-cover rounded-sm rounded-bl-[50px] shadow-sm"
										alt="Pay Bills"
									/>
								</motion.div>
							</div>
						</motion.div>

						<motion.div
							className="flex-1"
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.8, ease: "easeOut" }}>
							<h2 className=" font-bold mb-2">
								Book Flights & Hotels with Crypto or Gift Cards
							</h2>
							<p className="text-gray-700 text-sm font-medium leading-relaxed mb-10">
								Turn your digital assets into unforgettable
								travel experiences. Whether you’re booking local
								or international flights or reserving a
								comfortable hotel stay, StreetXchange makes it
								easy to pay with crypto or gift cards. Travel
								smarter, spend simpler — no cash, no limits.
							</p>

							<Button className=" rounded-tr-[50px]">
								Book your next trip with us today.
							</Button>
						</motion.div>
					</div>
				</div>
			</section>
			{/* End of services */}

			{/* Supported gift cards */}
			<section className="mb-20">
				<Header className="text-2xl text-center sm:text-left">
					Supported Assets
				</Header>
				<SwipeSlider
					breakpoints={{ sm: 2, md: 3.5, lg: 4.5 }}
					defaultItemsPerView={2.5}
					loop={true}
					autoSlideInterval={500}>
					<div className="min-h-[100px]">
						<Image
							src={"/amazon.png"}
							alt="amazon card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/hulu.png"}
							alt="hulu card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/psn.png"}
							alt="playstation card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/amazon-white.png"}
							alt="amazon card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/google.png"}
							alt="google card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/steam.png"}
							alt="steam card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/usdt.png"}
							alt="usdt supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/apple.png"}
							alt="apple card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/discord.png"}
							alt="discord card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
					<div className="min-h-[100px]">
						<Image
							src={"/paypal.png"}
							alt="paypal card supported"
							className="object-fit object-cover"
							width={226}
							height={226}
						/>
					</div>
				</SwipeSlider>
			</section>

			{/* Testimonial */}
			<TestimonialSection />

			{/* Faq */}
			<FaqSection />

			{/* Call to action section */}
			<CTASection />
		</>
	);
}
