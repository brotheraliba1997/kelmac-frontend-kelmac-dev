"use client";

import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import LinkButton from "@/components/ui/button/LinkButton";
import { cn } from "@/lib/utils";

export type BlogCardProps = {
	id: number;
	imageUrl: string;
	category: string;
	date: string;
	title: string;
	excerpt: string;
	href: string;
	className?: string;
};

export function BlogCard({
	imageUrl,
	category,
	date,
	title,
	excerpt,
	href,
	className,
}: BlogCardProps) {
	return (
		<div className={cn("bg-white rounded-xl overflow-hidden flex flex-col", className)}>
			<div className="relative w-full h-52">
				<Image
					src={imageUrl}
					alt={title}
					fill
					className="object-cover rounded-lg"
				/>
				<span className="absolute top-3 left-3 bg-white/93 text-primary text-sm font-normal px-3 py-1 rounded-sm ">
					{category}
				</span>
			</div>

			<div className="pt-4 flex flex-col flex-1">
				<p className="mb-2">{date}</p>
				<h3 className="text-2xl font-medium text-primary leading-normal mb-2 line-clamp-2">
					{title}
				</h3>
				<p className="text-primary leading-relaxed mb-6 line-clamp-3">
					{excerpt}
				</p>

				<LinkButton
					href={href}
					text="Read more"
					icon={<IconArrowRight size={16} />}
					className="text-secondary font-semibold hover:text-primary"
				/>
			</div>
		</div>
	);
}