import React from "react";
import {
	Facebook,
	Instagram,
	LifeBuoy,
	LockIcon,
	ShieldIcon,
	Twitter,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<section className="w-full py-6 flex items-center justify-center bg-white z-20">
			<div className="relative z-10 px-6 lg:px-20 py-20">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 max-w-6xl">
					{/* Get Help Column */}
					<div className="space-y-4 col-span-2">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
								<LifeBuoy className="w-4 h-4 text-white" />
							</div>
							<h3 className="text-xl font-medium text-gray-900">
								Get in touch
							</h3>
						</div>
						<div className="border-l-2 border-gray-300 pl-0 ml-4">
							<p className="text-gray-500 text-xs leading-relaxed pl-7">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore.
							</p>
						</div>
					</div>

					{/* Secure Data Column */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
								<ShieldIcon className="w-4 h-4 text-white" />
							</div>
							<h3 className="text-xl font-medium text-gray-900">
								Links
							</h3>
						</div>
						<div className="border-l-2 border-gray-300 pl-0 ml-4">
							<nav className="flex flex-col gap-2 pl-7 text-xs font-medium">
								<Link href="/" className="hover:text-primary">
									Contact
								</Link>
								<Link href="/" className="hover:text-primary">
									About us
								</Link>
								<Link href="/" className="hover:text-primary">
									Business
								</Link>
							</nav>
						</div>
					</div>

					{/* Privacy Column */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
								<LockIcon className="w-4 h-4 text-white" />
							</div>
							<h3 className="text-xl font-medium text-gray-900">
								Policies
							</h3>
						</div>
						<div className="border-l-2 border-gray-300 pl-0 ml-4">
							<nav className="flex flex-col gap-2 pl-7 text-xs font-medium">
								<Link href="/" className="hover:text-primary">
									Privacy Policies
								</Link>
								<Link href="/" className="hover:text-primary">
									Terms
								</Link>
								<Link href="/" className="hover:text-primary">
									Refund Policy
								</Link>
							</nav>
						</div>
					</div>
					{/* Social Column */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
								<Twitter className="w-4 h-4 text-white" />
							</div>
							<h3 className="text-xl font-medium text-gray-900">
								Socials
							</h3>
						</div>
						<div className="border-l-2 border-gray-300 pl-0 ml-4">
							<nav className="flex flex-col gap-2 pl-7 text-xs font-medium">
								<Link
									href="/"
									className="flex gap-1 hover:text-primary">
									<Instagram className="w-4 h-4" /> Instagram
								</Link>
								<Link
									href="/"
									className="flex gap-1 hover:text-primary">
									<Facebook className="w-4 h-4" /> Facebook
								</Link>
								<Link
									href="/"
									className="flex gap-1 hover:text-primary">
									<Twitter className="w-4 h-4" /> Twitter
								</Link>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
