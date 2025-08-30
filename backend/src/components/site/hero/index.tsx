const HeroSection = () => {
	return (
		<section className="hero-bg relative overflow-hidden md:h-screen flex items-center md:py-0 py-36 pt-24 bg-white dark:bg-white ">
			<div className="container relative">
				<div className="grid grid-cols-1 items-center mt-10">
					<div className="md:text-start text-center">
						<h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">
							We always got the perfect <br /> deal for you
						</h1>
						<p className="text-xl max-w-xl">
							A great platform to buy, sell your giftcard or
							crypto and book your flight without any agent or
							commisions.
						</p>

						<div className="relative flex mt-8">
							<div className="lg:w-5/6 w-full">
								<ul
									className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b border-gray-200 dark:border-gray-800"
									id="myTab"
									data-tabs-toggle="#StarterContent"
									role="tablist">
									<li
										role="presentation"
										className="inline-block">
										<button
											className="px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out text-white bg-orange-600"
											id="buy-home-tab"
											data-tabs-target="#buy-home"
											type="button"
											role="tab"
											aria-controls="buy-home"
											aria-selected="true">
											Sell Gift Card
										</button>
									</li>
									<li
										role="presentation"
										className="inline-block">
										<button
											className="px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out hover:text-orange-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
											id="sell-home-tab"
											data-tabs-target="#sell-home"
											type="button"
											role="tab"
											aria-controls="sell-home"
											aria-selected="false">
											Sell Crypto
										</button>
									</li>
									<li
										role="presentation"
										className="inline-block">
										<button
											className="px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out hover:text-orange-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
											id="rent-home-tab"
											data-tabs-target="#rent-home"
											type="button"
											role="tab"
											aria-controls="rent-home"
											aria-selected="false">
											Book a Flight
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
