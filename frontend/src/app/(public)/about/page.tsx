import Header from "@/components/generic/header";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
	return (
		<div className="">
			<div className="w-full min-h-screen md:min-h-[40vh] bg-gray-100/60 p-10 md:p-20 mt-28 rounded-[50px] flex flex-col items-start justify-center">
				<Header>About us</Header>
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
						Who we <span className="text-orange-400"> are</span>
					</Header>
					<p className="text-gray-700 text-sm font-medium leading-relaxed">
						<b className="mb-4 block">
							Turning Digital Wealth into Everyday Convenience
						</b>
						At StreetXchange LTD, we believe your digital assets
						should be more than just numbers on a screen — they
						should work for you in real life.
						<br />
						We&apos;ve built a seamless, secure platform where
						customers in Nigeria can spend their cryptocurrency,
						gift cards, and internet money on everyday services —
						from paying electricity bills to booking flights,
						hotels, rides, and even meals.
						<br />
						Our mission is simple: Make it easy, fast, and safe for
						anyone to use digital currencies in their daily lives.
					</p>
				</div>
			</div>

			<div className="flex justify-space-between items-start flex-col mt-5 p-10 md:p-20">
				<Header>Our Services</Header>
				<p className="text-gray-700 text-sm font-medium leading-relaxed">
					From paying bills to booking flights, our platform makes it
					easy to use your digital assets for everyday purchases.
					We&apos;re committed to providing a seamless experience that
					puts you in control of your finances.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3">
					<div className="flex-1 flex flex-col p-4">
						<div className="w-full self-start">
							<Image
								src={"/giftcard.png"}
								alt="Services"
								width={200}
								height={200}
								className="w-full h-full max-w-md object-cover"
							/>
						</div>
						<div className="flex flex-col justify-start gap-2.5">
							<h2 className="text-base font-bold mb-2">
								Swap Gift Cards & Crypto for Cash
							</h2>
							<p className="text-gray-700 text-xs font-medium leading-relaxed">
								Instantly exchange your gift cards, internet
								money, or cryptocurrency for quick, reliable
								cash — fast, secure, and hassle-free.
							</p>
						</div>
					</div>
					<div className="flex flex-1 flex-col p-4 items-center justify-start">
						<div className="w-full self-start">
							<Image
								src={"/crypto.png"}
								alt="Services"
								width={200}
								height={200}
								className="w-full h-full max-w-md object-cover"
							/>
						</div>
						<div className="flex flex-col justify-start gap-2.5">
							<h2 className=" font-bold mb-2">
								Pay Bills with Ease
							</h2>
							<p className="text-gray-700 text-xs font-medium leading-relaxed">
								Settle your electricity and utility bills
								directly with crypto, gift cards, or internet
								money — quick, secure, and stress-free.
							</p>
						</div>
					</div>
					<div className="flex flex-col p-4">
						<div className="w-full self-start">
							<Image
								src={"/travel.png"}
								alt="Services"
								width={200}
								height={300}
								className="w-full h-full max-w-lg object-cover"
							/>
						</div>
						<div className="flex flex-col justify-start gap-2.5">
							<h2 className="font-bold mb-2">
								Flights & Hotels Made Simple
							</h2>
							<p className="text-gray-700 text-xs font-medium leading-relaxed">
								Book local or international flights and enjoy
								secure, comfortable hotel stays — all paid
								seamlessly with your digital assets.
							</p>
						</div>
					</div>
					<div className="flex flex-col p-4">
						<div className="w-full self-start">
							<Image
								src={"/travel.png"}
								alt="Services"
								width={200}
								height={300}
								className="w-full h-full max-w-lg object-cover"
							/>
						</div>
						<div className="flex flex-col justify-start gap-2.5">
							<h2 className="font-bold mb-2">
								Flights & Hotels Made Simple
							</h2>
							<p className="text-gray-700 text-xs font-medium leading-relaxed">
								Book local or international flights and enjoy
								secure, comfortable hotel stays — all paid
								seamlessly with your digital assets.
							</p>
						</div>
					</div>
					<div className="flex flex-col p-4">
						<div className="w-full self-start">
							<Image
								src={"/travel.png"}
								alt="Services"
								width={200}
								height={300}
								className="w-full h-full max-w-lg object-cover"
							/>
						</div>
						<div className="flex flex-col justify-start gap-2.5">
							<h2 className="font-bold mb-2">
								Flights & Hotels Made Simple
							</h2>
							<p className="text-gray-700 text-xs font-medium leading-relaxed">
								Book local or international flights and enjoy
								secure, comfortable hotel stays — all paid
								seamlessly with your digital assets.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
