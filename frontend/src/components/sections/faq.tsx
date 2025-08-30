"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";
import Header from "../generic/header";
import { Button } from "../ui/button";
import { ChatsCircleIcon, PhoneCallIcon } from "@phosphor-icons/react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

const faqs = [
	{
		question: "How does StreetXchange work?",
		answer: "StreetXchange is a secure platform that allows you to exchange your crypto, gift cards, and internet money for cash, as well as use them to pay bills, book rides, flights, hotels, and even meals. Simply sign up, select the service you want, and complete your transaction in a few easy steps.",
	},
	{
		question: "Is it safe to use StreetXchange?",
		answer: "Yes. We use bank-grade security and encrypted transactions to ensure your assets and data remain protected at all times. Our processes are transparent with no hidden fees, giving you peace of mind on every transaction",
	},
	{
		question: "What kind of gift cards and crypto do you accept?",
		answer: "We support popular cryptocurrencies like Bitcoin, Ethereum, and USDT, as well as a wide range of gift cards (Amazon, iTunes, Google Play, Steam, etc.). Availability may vary, so check our platform for the latest supported options.",
	},
	{
		question: "How long does it take to receive cash after an exchange?",
		answer: "Most exchanges are processed within minutes, depending on the network confirmation for crypto or the type of gift card. We prioritize fast payouts so you can access your funds quickly.",
	},
	{
		question: "Can I pay my bills directly with crypto?",
		answer: "Absolutely. You can use your crypto, gift cards, or internet money to pay electricity and other utility bills directly through our platform — no need to first convert to cash.",
	},
	{
		question: "Do you only serve customers in Nigeria?",
		answer: "Currently, our primary market is Nigeria, where we provide seamless local services such as bill payments and ride bookings. However, services like international flight and hotel bookings are available to customers traveling abroad.",
	},
];
const FaqSection = () => {
	return (
		<section className="w-full min-h-[400px] py-24" id="faq">
			<Header className="text-2xl text-center sm:text-left">
				Frequently Asked Questions
			</Header>
			<div className="flex gap-6">
				{/* Left Section */}
				<div className="flex-1">
					<Accordion type="single" collapsible className="space-y-4">
						{faqs &&
							faqs.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="bg-neutral-50  hover:underline-none! rounded-[25px] px-4 data-[state=open]:bg-neutral-150 data-[state=open]:text-black border border-neutral-200 transition-color">
									<AccordionTrigger className=" py-6 font-semibold text-sm border-b rounded-none">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="px-4 py-6 font-medium text-xs font-medium">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
					</Accordion>
				</div>

				{/* Right Section */}
				<div className=" space-y-10 w-[350px] ">
					<div className="bg-primary rounded-[25px] p-6 text-center space-y-2.5 flex flex-col items-center">
						<ChatsCircleIcon
							weight={"duotone"}
							size={80}
							className="text-white self-center"
							color="currentColor"
						/>
						<h2 className="text-sm font-bold mt-4">
							You have a different question?
						</h2>
						<p className="text-xs font-medium">
							Our team will answer all your questions. <br />
							We will ensure a quick response
						</p>
						<Button className="bg-white w-fit mt-4 rounded-full text-primary-500 font-semibold">
							Contact us
						</Button>
					</div>
					<div className="p-6 border rounded-[25px] flex-1 flex items-start gap-2.5 bg-neutral-100">
						<div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary text-white">
							<PhoneCallIcon
								weight="fill"
								color="currentColor"
								size={24}
							/>
						</div>
						<div className="space-y-1.5">
							<p className="text-xs font-semibold">
								Your convenience, our priority
							</p>
							<h1 className="text-2xl font-bold tracking-tight ">
								24/7 Service
							</h1>
							<p className="text-sm font-medium">
								+234 (816) 6689 7526
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FaqSection;
