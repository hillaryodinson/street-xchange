import Footer from "@/components/layout/shared/footer";
import StickyNavbar from "@/components/layout/shared/sticky-navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full">
			<StickyNavbar />
			<div className="w-[90%] lg:w-[80%] mx-auto mt-20 min-h-[500px]">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default layout;
