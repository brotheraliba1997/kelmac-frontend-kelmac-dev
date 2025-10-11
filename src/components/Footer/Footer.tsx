"use client";

import Link from "next/link";
import Image from "next/image";
import {
	IconBrandFacebookFilled,
	IconBrandTwitterFilled,
	IconBrandInstagramFilled,
	IconBrandLinkedinFilled,
	IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import NavLinks from "@/components/ui/common/NavLinks";
import CustomSelect from "@/components/ui/form/CustomSelect";
import { useState } from "react";

export const menuLinks = [
	{ name: "Home", href: "/" },
	{ name: "About us", href: "/about" },
	{ name: "Our History", href: "/history" },
	{ name: "Courses", href: "/courses" },
	{ name: "Corporate", href: "/corporate" },
];

export const resourceLinks = [
	{ name: "Blog", href: "/blog" },
	{ name: "Webinars", href: "/webinars" },
	{ name: "Whitepapers", href: "/whitepapers" },
];

export const footerLinks = [
	{ name: "Governance requirements", href: "/governance" },
	{ name: "Terms and Conditions", href: "/terms" },
	{ name: "Privacy Statement", href: "/privacy" },
	{ name: "Cookie Policy", href: "/cookie" },
];

export default function Footer() {
	const [selected, setSelected] = useState("us");

	return (
		<footer className="font-inter">
			<div className="main-container pt-18 grid grid-cols-1 md:grid-cols-[50%_15%_15%_20%] gap-12 md:gap-0">
				<div className="flex flex-col min-h-full">
					<div className="space-y-6">
						<Link href="/">
							<Image
								src="/images/logo.png"
								alt="Kelmac Group"
								width={130}
								height={57}
								priority
							/>
						</Link>
						<p className="text-lg">We are certified by industry standards.</p>
						<Image
							src="/images/certified.png"
							alt="CQI"
							width={392}
							height={35}
						/>
					</div>
				</div>

				<div>
					<h4 className="font-medium text-lg mb-4">Menu</h4>
					<NavLinks links={menuLinks} />
				</div>

				{/* Resources */}
				<div>
					<h4 className="font-medium text-lg mb-4">Resources</h4>
					<NavLinks links={resourceLinks} />
				</div>

				{/* Contact */}
				<div>
					<h4 className="font-medium text-lg mb-4">Contact us</h4>
					<p className="mb-3">
						<a
							href="mailto:info@kelmacgroup.com"
							className="hover:text-primary"
						>
							info@kelmacgroup.com
						</a>
					</p>
					<CustomSelect
						className="max-w-[170px]"
						options={[
							{ label: "Ireland", value: "ie" },
							{ label: "USA", value: "us" },
							{ label: "UK", value: "uk" },
						]}
						value={selected}
						onChange={(val) => setSelected(val)}
					/>

					<p className="mt-3">
						Kelmac Group® Limited <br />
						Old Windmill Office Suites, Lower Gerald Griffin Street <br />
						Limerick, V94 YRD7, Ireland.
					</p>
					<a href="tel:+353 61 491 224" className="mt-2 font-bold">
						+353 61 491 224
					</a>
				</div>
			</div>

			<div className="main-container pt-8 pb-3 text-sm">
				© 1996 - {new Date().getFullYear()}, Kemac Group | All rights reserved.
			</div>

			<div className="border-t border-[#A8B6E699] pt-4 pb-8">
				<div className="main-container flex flex-col md:flex-row justify-between items-center gap-4">
					{/* Social Icons */}
					<div className="flex gap-4 text-gray-500">
						<a href="#" className="hover:text-primary">
							<IconBrandFacebookFilled className="text-secondary" size={20} />
						</a>
						<a href="#" className="hover:text-primary">
							<IconBrandTwitterFilled className="text-secondary" size={20} />
						</a>
						<a href="#" className="hover:text-primary">
							<IconBrandInstagramFilled className="text-secondary" size={20} />
						</a>
						<a href="#" className="hover:text-primary">
							<IconBrandLinkedinFilled className="text-secondary" size={20} />
						</a>
						<a href="#" className="hover:text-primary">
							<IconBrandYoutubeFilled className="text-secondary" size={20} />
						</a>
					</div>

					{/* Bottom Links */}
					<NavLinks
						orientation="horizontal"
						links={footerLinks}
						withDivider
						linkClassName="text-secondary underline"
					/>
				</div>
			</div>
		</footer>
	);
}
