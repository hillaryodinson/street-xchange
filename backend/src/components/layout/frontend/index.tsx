import { Outlet } from "react-router-dom";
import Nav from "../../site/nav";
import Footer from "../../site/footer";
// @ts-expect-error "Already working fine"
import "swiper/css";
import "@/frontend.css";

const FrontendLayout = () => {
	return (
		<>
			<Nav />
			<Outlet />
			<Footer />
		</>
	);
};

export default FrontendLayout;
