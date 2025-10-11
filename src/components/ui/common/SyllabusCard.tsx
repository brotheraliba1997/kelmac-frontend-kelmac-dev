import React from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { IconArrowCircleUpRight } from "@/components/icons/icons";

export type SyllabusCardProps = {
	startTime?: string;
	title?: string;
	items?: string[];
	breakTime?: string;
	breakLabel?: string;
	className?: string;
	breakClassName?: string;
};

export function SyllabusCard({
	startTime = "",
	title = "",
	items = [],
	breakTime = "",
	breakLabel = "",
	className = "",
	breakClassName = "",
}: SyllabusCardProps) {
	const cardClasses = cn(
		"rounded-xl p-4 md:p-5 bg-white w-full flex flex-col items-stretch justify-stretch",
		className
	);

	const breakClasses = cn(
		"bg-[#FFE000] rounded-lg text-center px-4 py-3 font-medium text-2xl text-gray-800 mt-auto",
		breakClassName
	);

	return (
		<div className={cardClasses}>
			<div>
				<div className="flex items-center text-secondary font-medium text-2xl mb-2 gap-2">
					<Clock size={23} />
					{startTime}
				</div>

				{/* Title */}
				<h3 className="text-2xl md:text-3xl font-medium mb-4">{title}</h3>

				{/* List Items */}
				<ul className="space-y-2 mb-6 text-primary">
					{items.map((item, idx) => (
						<li
							key={idx}
							className="flex items-center gap-2 md:text-lg leading-snug"
						>
							<IconArrowCircleUpRight />
							{item}
						</li>
					))}
				</ul>
			</div>

			{/* Break Section */}
			{breakTime && (
				<div className={breakClasses}>
					<div className="flex items-center justify-center mb-2 gap-2">
						<Clock size={23} />
						{breakTime}
					</div>
					<div>{breakLabel}</div>
				</div>
			)}
		</div>
	);
}

export type SyllabusCardsProps = {
	cards?: SyllabusCardProps[];
	className?: string;
};

export function SyllabusCards({
	cards = [],
	className = "",
}: SyllabusCardsProps) {
	const gridClasses = cn("grid gap-4 grid-cols-1 sm:grid-cols-2", className);

	return (
		<div className={gridClasses}>
			{cards.map((card, idx) => {
				const isLast = idx === cards.length - 1;
				return (
					<SyllabusCard
						key={idx}
						{...card}
						breakClassName={cn(
							card.breakClassName,
							isLast && "bg-[#F51A1A] text-white"
						)}
					/>
				);
			})}
		</div>
	);
}
