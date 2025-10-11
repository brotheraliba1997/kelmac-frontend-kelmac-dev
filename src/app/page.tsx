"use client";

import NewsletterSection from "@/components/Sections/Newsletter/NewsletterSection";
import Button from "@/components/ui/button/Button";
import { Search } from "lucide-react";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";
import Counter from "@/components/ui/common/Counter";
import { CourseCard } from "@/components/ui/course/CourseCard";
import { BlogCard } from "@/components/ui/blog/BlogCard";
import { Heading } from "@/components/ui/common/Heading";
import { Timeline } from "@/components/ui/common/Timeline";
import { useState, useRef, useEffect } from "react";
import CorporateAuditingModal from "@/components/CorporateModal/CorporateModal";
import { Marquee } from "@/components/ui/common/Marquee";
import QuestionsModal from "@/components/ui/questions/QuestionsModal";
import type { FormData } from "@/data/questionTypes";
import {
	coursesItems,
	timelineItems,
	blogItems,
	locationItems,
} from "@/data/home";
import { Hotspot } from "@/components/ui/common/Hotspot";
import { Tags } from "@/components/ui/common/Tag";
import HeroSlider from "@/app/hero-slider";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchActive, setIsSearchActive] = useState(false);
	const coursesRef = useRef<HTMLDivElement>(null);
	const searchBarRef = useRef<HTMLDivElement>(null); // Add this

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchBarRef.current &&
				!searchBarRef.current.contains(event.target as Node)
			) {
				clearSearch();
			}
		};

		if (isSearchActive) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSearchActive]);

	const handleQuestionSubmit = async (data: FormData) => {
		try {
			console.log("Form submitted:", data);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const filteredCourses = isSearchActive && searchQuery
		? coursesItems.filter(
			(course) =>
				course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				course.category.toLowerCase().includes(searchQuery.toLowerCase())
		)
		: coursesItems;

	const handleSearchClick = () => {
		setIsSearchActive(true);
		coursesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const clearSearch = () => {
		setSearchQuery("");
		setIsSearchActive(false);
	};

	return (
		<main className="main">
			<HeroSlider />

			<section className="primary-py">
				<div className=" primary-py bg-light">
					<div className="main-container flex flex-col md:flex-row gap-12 justify-between">
						<Counter
							number={30}
							icon={<IconPlus className="w-6 h-6" />}
							label="Years Experience"
						/>
						<Counter
							number={45}
							icon={<IconPlus className="w-6 h-6" />}
							label="Countries served"
						/>
						<Counter
							number={40000}
							icon={<IconPlus className="w-6 h-6" />}
							label="Professionals Trained"
						/>
						<Counter
							number={900}
							icon={<IconPlus className="w-6 h-6" />}
							label="Audits & Projects Delivered"
						/>
					</div>
				</div>
			</section>

			<section
				ref={coursesRef}
				className="primary-py bg-primary overflow-hidden rounded-3xl"
			>
				<div className="main-container">
					<Heading
						subHeading="Courses"
						heading="Delivering sustainable, societal impact & process based solutions"
						headingClassName="text-white"
					/>

					<div>
						{isSearchActive && (
							<div
								ref={searchBarRef}
								className="mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500"
							>
								<form
									className="relative"
									onSubmit={(e) => {
										e.preventDefault();
									}}
								>
									<button
										type="button"
										className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
									>
										<div className="w-[48px] h-[48px] md:w-[52px] md:h-[52px] bg-primary hover:bg-secondary rounded-full flex items-center justify-center shadow-lg">
											<Search className="w-5 h-5 md:w-6 md:h-6 text-white stroke-[2.5]" />
										</div>
									</button>

									<input
										type="text"
										placeholder="Search courses by title, category, or description..."
										value={searchQuery}
										onChange={handleSearchChange}
										className="w-full h-[56px] md:h-[64px] pl-[60px] md:pl-[68px] pr-6 md:pr-8 rounded-full text-gray-900 text-base md:text-lg font-normal placeholder:text-gray-500 placeholder:font-light bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
										autoFocus
									/>
								</form>

								{searchQuery && filteredCourses.length > 0 && (
									<div className="text-center text-white mt-4">
										<p className="text-lg">
											Found {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} for "{searchQuery}"
										</p>
									</div>
								)}
							</div>
						)}

						{!isSearchActive && (
							<div className="flex flex-wrap gap-3 md:gap-0 items-center justify-center mb-18">
								<Button size="lg" text="Top Offer Courses" color="white" />
								<Button
									size="lg"
									text="Quality Management"
									color="semitransparent"
								/>
								<Button
									size="lg"
									text="Environment health & safety"
									color="semitransparent"
								/>
								<Button
									size="lg"
									text="Search Courses"
									color="transparent"
									iconPosition="before"
									iconclassName="bg-transparent"
									icon={<Search />}
									onClick={handleSearchClick}
								/>
							</div>
						)}

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-18">
							{filteredCourses.length > 0 ? (
								filteredCourses.map((course) => (
									<CourseCard
										key={course.id}
										category={course.category}
										title={course.title}
										description={course.description}
										hours={course.hours}
										lessons={course.lessons}
										mode={course.mode}
										imageUrl={course.imageUrl}
									/>
								))
							) : (
								<div className="col-span-full text-center py-12">
									<p className="text-xl text-white mb-4">
										No courses found matching your search.
									</p>
									<button
										onClick={clearSearch}
										className="text-secondary hover:text-gray-500 text-lg"
									>
										Clear search and view all courses
									</button>
								</div>
							)}
						</div>

						<div className="text-center">
							<Button
								size="lg"
								text="View all courses"
								href="/course/all-courses/"
								color="transparent"
								iconclassName="bg-transparent"
								icon={<IconArrowRight />}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-secondary bg-[url('/images/bg/Learner.png')] bg-no-repeat bg-cover bg-center rounded-3xl overflow-hidden">
				<div className="main-container primary-py ">
					<div className="md:w-[60%] text-white space-y-8">
						<h6 className="sub-heading before:bg-white text-white">More</h6>
						<h2 className="main-heading">
							You can chose the curriculum & training that fits your needs
						</h2>
						<p className="mb-12">
							Answer a few quick questions, and we'll match you with tailored
							training <br className="hidden md:block" /> recommendations
							designed for your career stage and industry."
						</p>

						<Button
							spanclassName="px-4"
							className="gap-0"
							text="Get Started – Find Your Training"
							icon={<IconArrowRight className="stroke-primary" />}
							color="primary"
							onClick={() => setIsQuestionsModalOpen(true)}
						/>
					</div>
				</div>
			</section>

			<section className="bg-light">
				<div className="main-container primary-py">
					<Heading
						subHeading="Services"
						heading="Solutions we offer"
						headingClassName="text-primary"
					/>
					<Timeline items={timelineItems} />
				</div>
			</section>

			<section>
				<div className="main-container primary-py">
					<Heading
						subHeading="Services"
						heading="Our Clients"
						className="text-primary"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="relative group cursor-pointer min-h-112 md:min-h-188 justify-stretch bg-[url('/images/corporate.png')] bg-cover bg-left rounded-4xl overflow-hidden">
							<h2 className="absolute bottom-0 left-0 transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 pointer-events-auto group-hover:pointer-events-none px-5 md:px-10 py-16 text-white font-hedvig text-4xl md:text-5xl lg:text-[64px] w-full bg-gradient-to-b from-transparent via-transparent/0 via-[0%] to-primary">
								Corporate
							</h2>
							<div className="absolute bottom-0 left-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto px-5 md:px-10 py-8 text-white w-full bg-cover bg-center bg-no-repeat bg-[url('/images/designs/layer-blur.png')]">
								<h1 className="font-hedvig text-4xl md:text-5xl lg:text-[64px] mb-6">
									Corporate
								</h1>
								<p className="mb-4">
									From compliance to capability, we support your organization
									through comprehensive auditing, strategic consulting
								</p>
								<Tags
									className="mb-10"
									items={["Auditing", "Consulting", "Learning"]}
								/>
								<Button
									className="w-full"
									iconclassName="bg-transparent"
									spanclassName="px-4 w-full text-center"
									text="Learn More"
									color="transparent"
									size="sm"
									onClick={openModal}
									icon={<IconArrowRight />}
								/>
							</div>
						</div>

						<div className="relative group cursor-pointer min-h-112 md:min-h-188 justify-stretch bg-[url('/images/professionals.png')] bg-cover bg-left rounded-4xl overflow-hidden">
							<h2 className="absolute bottom-0 left-0 transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 pointer-events-auto group-hover:pointer-events-none px-5 md:px-10 py-16 text-white font-hedvig text-4xl md:text-5xl lg:text-[64px] w-full bg-gradient-to-b from-transparent via-transparent/0 via-[0%] to-primary">
								Professionals
							</h2>
							<div className="absolute bottom-0 left-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto px-5 md:px-10 py-8 text-white w-full bg-cover bg-center bg-no-repeat bg-[url('/images/designs/layer-blur.png')]">
								<h1 className="font-hedvig text-4xl md:text-5xl lg:text-[64px] mb-6">
									Professionals
								</h1>
								<p className="mb-4">
									From compliance to capability, we support your organization
									through comprehensive auditing, strategic consulting
								</p>
								<Tags
									className="mb-10"
									items={["Auditing", "Consulting", "Learning"]}
								/>
								<Button
									className="w-full"
									iconclassName="bg-transparent"
									spanclassName="px-4 w-full text-center"
									href="/courses"
									text="Learn More"
									color="transparent"
									size="sm"
									icon={<IconArrowRight />}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="primary-pb">
				<Marquee
					images={[
						"/images/client/nestle.png",
						"/images/client/ifc.png",
						"/images/client/diageo.png",
						"/images/client/dell.png",
						"/images/client/nsai.png",
					]}
					gap={80}
					speed={25}
				/>
			</section>

			<section className="bg-gradient-to-b from-[#F8F8FA] via-[#F8F8FA] via-[67%] to-[#FFFFFF]">
				<div className="main-container primary-py">
					<Heading
						subHeading="Geographic regions we operate in"
						heading="Thinking Globally, Acting Locally"
						className="text-primary"
					/>
					<div className="w-full">
						<Hotspot
							src="/images/world-map.png"
							alt="Demo"
							items={locationItems}
							hotspotSize={18}
							hotspotColorClass="bg-secondary"
						/>
					</div>
				</div>
			</section>

			<section>
				<div className="primary-py main-container">
					<Heading
						subHeading="Blog"
						heading="Featured Blogs"
						className="text-primary"
					/>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{blogItems.map((blog) => (
							<BlogCard
								key={blog.id}
								id={blog.id}
								imageUrl={blog.imageUrl}
								category={blog.category}
								date={blog.date}
								title={blog.title}
								excerpt={blog.excerpt}
								href={blog.href}
							/>
						))}
					</div>
					<div className="flex justify-center mt-12 md:mt-16">
						<Button
							className="border-primary gap-2"
							spanclassName="px-8"
							href="/resources/latest-blogs"
							text="View all Blogs"
							color="white"
							iconclassName="bg-primary text-white"
							icon={<IconArrowRight />}
						/>
					</div>
				</div>
			</section>
			<NewsletterSection />

			<QuestionsModal
				isOpen={isQuestionsModalOpen}
				onClose={() => setIsQuestionsModalOpen(false)}
				onSubmit={handleQuestionSubmit}
			/>
			{isModalOpen && <CorporateAuditingModal onClose={closeModal} />}
		</main>
	);
}