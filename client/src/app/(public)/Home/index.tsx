import React from "react";
import Helmet from "react-helmet";
import HeroSection from "../../../components/site/hero";

const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>{`HOME | ${import.meta.env.VITE_APP_NAME}`}</title>
			</Helmet>
			<HeroSection />
		</>
	);
};

export default HomePage;
