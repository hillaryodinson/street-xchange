import Header from "@/components/generic/header";
import Image from "next/image";
import React from "react";

const RatePage = () => {
	return (
		<div className="">
			<div className="w-full min-h-screen md:min-h-[40vh] bg-gray-100/60 p-10 md:p-20 mt-28 rounded-[50px] flex flex-col items-start justify-center">
				<Header>Rates</Header>
			</div>

			<div className="flex justify-space-between items-start flex-col md:flex-row mt-10 p-10 md:px-20 md:py-10">
				{/* Left Column */}
				<div className="flex-1 h-fit">
					<Image
						src={"/about-us.png"}
						alt="About Us"
						width={1000}
						height={1000}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="w-full md:w-1/2 max-w-6xl px-4 md:px-8 py-10">
					<Header className="text-2xl md:text-3xl">
						Our <span className="text-orange-400"> Rates</span> as
						of today
					</Header>
					<p className="text-gray-700 text-sm font-medium leading-relaxed"></p>
				</div>
			</div>
		</div>
	);
};

export default RatePage;
