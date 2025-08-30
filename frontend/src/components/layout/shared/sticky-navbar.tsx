"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import * as motion from "motion/react-client";
import { animate } from "framer-motion";

const scrollToSection = (id: string) => {
	const target = document.getElementById(id);
	if (!target) return;

	const targetY = target.getBoundingClientRect().top + window.scrollY;
	animate(window.scrollY, targetY, {
		duration: 0.8,
		ease: "easeInOut",
		onUpdate: (latest) => window.scrollTo(0, latest),
	});
};

export default function StickyNavbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<>
			<div
				className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
					isScrolled ? "mt-4" : "mt-0"
				}`}>
				<div
					className={`flex justify-between items-center px-8 transition-all duration-300 ${
						isScrolled
							? "w-[80vw] md:w-[70vw] h-[80px] bg-white/10 backdrop-blur-md border border-white/20 rounded-[100px] shadow-lg"
							: "w-[100vw] md:w-[80vw] h-[130px] bg-transparent"
					}`}>
					<div className="flex items-center gap-40">
						<Image
							src={"/logo.png"}
							alt="Logo"
							width={200}
							height={200}
							className="w-[150px] lg:w-[200px]"
						/>
						<nav
							className={cn("hidden lg:flex  text-sm", {
								"gap-5": isScrolled,
								"gap-10": !isScrolled,
							})}>
							<Link
								href={"/"}
								className="hover:text-primary transition-colors">
								Home
							</Link>
							<Link
								href={"#services"}
								className="hover:text-primary transition-colors"
								onClick={() => scrollToSection("services")}>
								Our Services
							</Link>
							<Link
								href={"/#testimonials"}
								className="hover:text-primary transition-colors"
								onClick={() => scrollToSection("testimonials")}>
								Testimonials
							</Link>
							<Link
								href={"/#faq"}
								className="hover:text-primary transition-colors"
								onClick={() => scrollToSection("faq")}>
								Faq
							</Link>
						</nav>
					</div>

					<div className="hidden lg:flex gap-2">
						<Link
							href={"/login"}
							className={buttonVariants({
								variant: "ghost",
								className:
									"hover:bg-white/10 hover:border-white/20 border-transparent transition-all",
							})}>
							Log in
						</Link>
						<Link
							href={"/signup"}
							className={buttonVariants({
								className:
									"rounded-sm rounded-tr-[30px] bg-orange-600 text-white hover:bg-gray-800 transition-colors",
							})}>
							Get Started
						</Link>
					</div>

					<Button
						size={"icon"}
						className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors hover:border-orange-400"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Toggle mobile menu">
						{isMobileMenuOpen ? (
							<XIcon
								className="w-6 h-6 hover:text-primary"
								color="currentColor"
							/>
						) : (
							<ListIcon
								className="w-6 h-6 hover:text-primary"
								color="currentColor"
							/>
						)}
					</Button>
				</div>
			</div>
			<div
				className={`fixed inset-0 z-60 lg:hidden transition-all duration-300 ${
					isMobileMenuOpen ? "visible" : "invisible"
				}`}>
				{/* Backdrop */}
				<div
					className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
						isMobileMenuOpen ? "opacity-100" : "opacity-0"
					}`}
					onClick={closeMobileMenu}
				/>

				{/* Slide-in menu */}
				<motion.div
					initial={false}
					className={`absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md border-l border-white/20 shadow-xl z-60 transform transition-transform duration-300 ${
						isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
					}`}
					variants={navVariants}
					animate={isMobileMenuOpen ? "open" : "closed"}>
					<div className="flex flex-col h-full pt-20 px-8">
						<nav className="flex flex-col gap-6 font-medium">
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								variants={itemVariants}>
								<Link
									href={"/"}
									className="hover:text-primary transition-colors py-2"
									onClick={closeMobileMenu}>
									Home
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								variants={itemVariants}>
								<Link
									href={"/#services"}
									className="hover:text-primary transition-colors py-2"
									onClick={() => {
										closeMobileMenu;
										scrollToSection("services");
									}}>
									Our Services
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								variants={itemVariants}>
								<Link
									href={"/#testimonials"}
									className="hover:text-primary transition-colors py-2"
									onClick={() => {
										closeMobileMenu;
										scrollToSection("testimonials");
									}}>
									Testimonials
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								variants={itemVariants}>
								<Link
									href={"/#faq"}
									className="hover:text-primary transition-colors py-2"
									onClick={() => {
										closeMobileMenu;
										scrollToSection("faq");
									}}>
									FAQ
								</Link>
							</motion.div>
						</nav>

						<motion.div className="flex flex-col gap-4 mt-8">
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								variants={itemVariants}>
								<Link
									href={"/"}
									className={buttonVariants({
										variant: "outline",
										className:
											"transition-colors w-full rounded-sm rounded-tr-[30px] border-orange-600/50 hover:border-none text-orange-600 hover:bg-orange-600/50 hover:text-white",
									})}
									onClick={closeMobileMenu}>
									Login
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								variants={itemVariants}>
								<Link
									href={"/"}
									className={buttonVariants({
										className:
											"w-full rounded-sm rounded-tr-[30px] bg-orange-600 text-white transition-colors",
									})}
									onClick={closeMobileMenu}>
									Get Started
								</Link>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</>
	);
}

const itemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const navVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};
