"use client";
import Header from "@/components/generic/header";
import { Button } from "@/components/ui/button";
import { ChatsCircleIcon, PhoneCallIcon } from "@phosphor-icons/react";
import React from "react";

const HowItWorksPage = () => {
	return (
		<div className="">
			<div className="w-full min-h-screen md:min-h-[40vh] bg-gray-100/60 p-10 md:p-20 mt-28 rounded-[50px] flex flex-col items-start justify-center">
				<Header>How it Works</Header>
			</div>

			<section className="w-full min-h-[400px] py-20">
				<Header className="text-xl text-center sm:text-left">
					Create an account
				</Header>
				<div className="flex gap-6">
					{/* Left Section */}
					<div className="flex-1"></div>

					{/* Right Section */}
					<div className=" space-y-10 w-[350px] ">
						<div className="bg-orange-500 rounded-[25px] p-6 text-center space-y-2.5 flex flex-col items-center">
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
							<Button className="bg-white w-fit mt-4 rounded-full text-orange-500 font-semibold">
								Contact us
							</Button>
						</div>
						<div className="p-6 border rounded-[25px] flex-1 flex items-start gap-2.5 bg-neutral-100">
							<div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-500 text-white">
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
		</div>
	);
};

export default HowItWorksPage;
