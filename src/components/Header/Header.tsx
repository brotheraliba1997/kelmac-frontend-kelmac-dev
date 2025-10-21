"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { IconArrowRight } from "@tabler/icons-react";

import Link from "next/link";
import Button from "@/components/ui/button/Button";
import AboutMegaMenu from "./AboutMegaMenu";
import CoursesMegaMenu from "./CoursesMegaMenu";
import CorporateMegaMenu from "./CorporateMegaMenu";
import ResourcesMegaMenu from "./ResourcesMegaMenu";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "", label: "About Us", mega: "about" },
	{ href: "", label: "Courses", mega: "courses" },
	{ href: "", label: "Corporate", mega: "corporate" },
	{ href: "", label: "Resources", mega: "resources" },
	{ href: "/contact-us", label: "Contact" },
];

export default function Header() {
	const [open, setOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState<string | null>(null);
	const pathname = usePathname();

	return (
		<header className="relative z-50 bg-white">
			<div className="main-container">
				<div className="grid grid-cols-5 items-center py-4">
					<div className="site-logo col-span-3 lg:col-span-1">
						<Link href="/">
							<Image
								src="/images/logo.png"
								alt="Site Logo"
								width={130}
								height={57}
								priority
							/>
						</Link>
					</div>
					<div className="hidden lg:block col-span-3">
						<nav className="flex items-center justify-center gap-7">
							{navLinks.map((link) => {
								const isActive = pathname === link.href;
								return (
									<div
										key={link.label}
										className="relative"
										onMouseEnter={() => link.mega && setOpenMenu(link.mega)}
										onMouseLeave={() => link.mega && setOpenMenu(null)}
									>
										{link.mega ? (
											<span
												className={`text-primary transition-colors duration-200 cursor-pointer ${isActive ? "font-semibold" : "font-light"
													}`}
											>
												{link.label}
											</span>
										) : (
											<Link
												href={link.href}
												className={`text-primary transition-colors duration-200 ${isActive ? "font-semibold" : "font-light"
													}`}
											>
												{link.label}
											</Link>
										)}
										<AnimatePresence>
											{openMenu === link.mega && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -10 }}
													transition={{ duration: 0.2 }}
													className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
												>
													<div className="bg-white rounded-lg shadow-md overflow-hidden relative before:content-[''] before:absolute before:-top-[8px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-b-[8px] before:border-b-blue-100">
														{openMenu === "about" && <AboutMegaMenu />}
														{openMenu === "courses" && <CoursesMegaMenu />}
														{openMenu === "corporate" && <CorporateMegaMenu />}
														{openMenu === "resources" && <ResourcesMegaMenu />}
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								);
							})}
						</nav>
					</div>
					<div className="col-span-2 lg:col-span-1 flex items-center justify-end gap-4">
						<button className="px-3 py-2 bg-gray-50 border border-gray-100 flex gap-2 rounded-lg items-center">
							<Image
								src="/images/flags/us.png"
								className="rounded-full w-6 h-6"
								alt="USA Flag"
								width={24}
								height={24}
								priority
							/>
							<span className="font-medium font-inter text-sm">USA</span>
						</button>

						<Button
							className="hidden lg:inline-flex"
							href="/signin"
							text="Login"
							icon={<IconArrowRight className="stroke-primary w-5 h-5" />}
							color="primary"
						/>

						<button
							className="lg:hidden p-2 cursor-pointer"
							onClick={() => setOpen(!open)}
							aria-label="Toggle menu"
						>
							{open ? <X size={28} /> : <Menu size={28} />}
						</button>
					</div>
				</div>

				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center gap-8 text-white text-2xl z-50"
						>
							<button
								onClick={() => setOpen(false)}
								aria-label="Close menu"
								className="absolute top-6 right-6 p-2"
							>
								<X size={32} />
							</button>

							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setOpen(false)}
								>
									{link.label}
								</Link>
							))}
							<Link href="/login">Login</Link>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
}