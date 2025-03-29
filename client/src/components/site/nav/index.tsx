import { UserIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Nav = ({ className }: { className?: string }) => {
	const location = useLocation();
	React.useEffect(() => {
		const handleScroll = () => {
			const topnav = document.getElementById("topnav");
			if (window.scrollY > 20) {
				topnav?.classList.add("nav-sticky");
			} else {
				topnav?.classList.remove("nav-sticky");
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const isActive = (path: string, segment = 1) => {
		const currentPath = location.pathname.split("/");

		console.log(currentPath[segment], path);
		// Match the beginning of the path (handle "/about" matching "/about/team")
		return currentPath[1] === path ? "active" : "";
	};

	return (
		<>
			<nav id="topnav" className={`defaultscroll is-sticky ${className}`}>
				<div className="container relative flex items-center justify-between">
					<div className="flex-1">
						<Link className="logo" to="/">
							{/* <img
							src="assets/images/logo-dark.png"
							className="inline-block dark:hidden"
							alt=""
						/>
						<img
							src="assets/images/logo-light.png"
							className="hidden dark:inline-block"
							alt=""
						/> */}
							<h3 className="m-0 text-sm w-[100px]">
								Street Xchange
							</h3>
						</Link>
					</div>

					<div className=" w-full">
						<div className="menu-extras">
							<div className="menu-item">
								<Link
									to=""
									className="navbar-toggle"
									id="isToggle"
									onClick={() => {}}>
									<div className="lines">
										<span></span>
										<span></span>
										<span></span>
									</div>
								</Link>
							</div>
						</div>

						<ul className="buy-button list-none mb-0">
							<li className="inline mb-0">
								<Link
									to="/login"
									className="btn btn-icon bg-orange-600 hover:bg-orange-700 border-orange-600 dark:border-orange-600 text-white !rounded-full">
									<UserIcon width={18} height={18} />
								</Link>
							</li>
							<li className="sm:inline ps-1 mb-0 hidden">
								<Link
									to="/signup"
									className="btn bg-orange-600 hover:bg-orange-700 border-orange-600 dark:border-orange-600 text-white !rounded-full">
									Signup
								</Link>
							</li>
						</ul>

						<div id="navigation">
							<ul className="navigation-menu !justify-end">
								<li
									className={`sub-menu-item ${isActive(
										""
									)} `}>
									<Link to="/">Home</Link>
								</li>
								<li className="has-submenu parent-parent-menu-item">
									<Link to="javascript:void(0)">Sell</Link>
									<span className="menu-arrow"></span>
									<ul className="submenu">
										<li className="has-submenu parent-menu-item">
											<Link to="javascript:void(0)">
												Cryptocurrency
											</Link>
										</li>
										<li className="has-submenu parent-menu-item">
											<Link to="javascript:void(0)">
												Gift Card
											</Link>
										</li>
									</ul>
								</li>
								<li
									className={`sub-menu-item ${isActive(
										"properties"
									)} `}>
									<Link to="/properties/1">
										Book a Flight
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className={`sub-menu-item ${isActive(
											"/contact"
										)} `}>
										Contact
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
