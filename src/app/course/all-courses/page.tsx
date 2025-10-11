"use client";

import { useState } from "react";
import Image from "next/image";
import { CourseCard } from "@/components/ui/course/CourseCard";
import Button from "@/components/ui/button/Button";
import { IconArrowRight } from "@tabler/icons-react";
import { courses } from "@/data/courses";
import { Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Heading } from "@/components/ui/common/Heading";
import { bundleItems } from "@/data/bundles";
import BundleSlider from "@/components/ui/course/BundleSlider";
import { CourseCategory } from "@/data/courses";




export default function AllCoursesPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [visibleCount, setVisibleCount] = useState(6);

	const filteredCourses = courses.filter(course => {
		const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.category.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesSearch;
	});

	const visibleCourses = filteredCourses.slice(0, visibleCount);
	const hasMoreCourses = visibleCount < filteredCourses.length;

	const loadMore = () => {
		setVisibleCount(prev => prev + 6);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setVisibleCount(6);
		const coursesSection = document.getElementById('courses-section');
		if (coursesSection) {
			coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const handleSearchClick = () => {
		setVisibleCount(6);
		const coursesSection = document.getElementById('courses-section');
		if (coursesSection) {
			coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<main className="main">
			<section className="relative overflow-hidden rounded-3xl min-h-screen">
				<div className="absolute top-0 left-0 right-0 bottom-0">
					<div
						className="absolute top-0 left-0 right-0 h-full min-h-screen bg-cover bg-top bg-no-repeat"
						style={{ backgroundImage: "url('/images/all-courses.png')" }}
					/>
					<div className="absolute left-0 right-0 bottom-0 h-96 bg-gradient-to-b from-transparent to-primary"></div>
				</div>

				<div className="main-container primary-py relative z-10">
					<div className="text-center text-white mb-16 pt-8">
						<h1 className="text-4xl md:text-6xl font-hedvig leading-snug mb-6">
							All Courses
						</h1>
						<p className="md:text-xl font-inter mb-8 max-w-3xl mx-auto">
							Leading an Industry for Innovation, Trusted by Notified Bodies & Well
							<br className="hidden md:block" />
							Known Brands, Upskilling is just a Click Away.
						</p>

						<div className="max-w-xs mx-auto">
							<form className="relative" onSubmit={handleSearch}>
								<button
									type="submit"
									className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95"
									onClick={handleSearchClick}
								>
									<div className="w-[48px] h-[48px] md:w-[52px] md:h-[52px] bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors">
										<Search className="w-5 h-5 md:w-6 md:h-6 text-white stroke-[2.5]" />
									</div>
								</button>

								<input
									type="text"
									placeholder="Find your course"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full h-[56px] md:h-[64px] pl-[60px] md:pl-[68px] pr-6 md:pr-8 rounded-full text-primary text-base md:text-lg font-normal placeholder:text-gray-500 placeholder:font-light bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
								/>
							</form>
						</div>
					</div>

					<div id="courses-section">
						{searchQuery && (
							<div className="text-center text-white mb-6">
								<p className="text-lg">
									{filteredCourses.length > 0
										? `Found ${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} for "${searchQuery}"`
										: `No courses found for "${searchQuery}"`
									}
								</p>
							</div>
						)}

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
							{visibleCourses.map((course) => (
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
							))}
						</div>

						{filteredCourses.length === 0 && (
							<div className="text-center py-12">
								<p className="text-xl text-white mb-4">No courses found matching your search.</p>
								<button
									onClick={() => setSearchQuery("")}
									className="text-secondary hover:text-white underline"
								>
									Clear search
								</button>
							</div>
						)}

						{hasMoreCourses && (
							<div className="text-center pb-8">
								<button
									onClick={loadMore}
									className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-primary transition-all duration-300 group"
								>
									View more
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="transition-transform group-hover:translate-x-1"
									>
										<path
											d="M3 8H13M13 8L8 3M13 8L8 13"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
						)}
					</div>
				</div>
			</section>

			<section className="rounded-3xl bg-white overflow-hidden pb-12">
				<div className="main-container primary-py">
					<Heading
						subHeading="Category"
						heading="Explore Our Categories"
						headingClassName="text-primary"
					/>
					<Swiper
						modules={[Autoplay, Navigation, Pagination]}
						spaceBetween={5}
						slidesPerView="auto"
						loop={true}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
							bulletClass: "swiper-pagination-bullet !bg-primary",
							bulletActiveClass: "swiper-pagination-bullet-active !bg-secondary",
						}}
						className="!overflow-visible !pb-12"
					>
						{CourseCategory.map((category, i) => (
							<SwiperSlide key={i} className="!w-[320px]">
								<div className="rounded-4xl min-h-[280px] flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer">
									<div
										className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
										style={{ backgroundImage: `url('${category.imageUrl}')` }}
									/>
									<h3 className="text-3xl md:text-4xl text-white font-hedvig relative z-10">
										{category.title}
									</h3>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>
			
			<section>
				<div className="main-container primary-py">
					<Heading
						subHeading="Training Bundles"
						heading="Learn More. Spend Less. Unlock value-packed course bundles today"
						headingClassName="text-primary max-w-3xl mx-auto"
					/>

					<BundleSlider bundles={bundleItems} />
				</div>
			</section>

			<section className="bg-light overflow-hidden">
				<div className="main-container primary-py">
					<div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
						<div className="space-y-10">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-secondary rounded-full" />
								<span className="text-secondary font-medium">Certificate</span>
							</div>

							<h2 className="text-4xl md:text-5xl font-hedvig text-primary">
								View Sample Certificate of Completion
							</h2>

							<p className="text-lg text-body">
								Upon successful completion, each Learner shall receive a digital
								Certificate of Completion that is recognized globally
							</p>

							<Button
								size="lg"
								text="View Certificate"
								icon={<IconArrowRight className="stroke-primary" />}
								color="primary"
								iconclassName="bg-white"
								spanclassName="px-1"
							/>
						</div>

						<div className="relative w-full lg:w-[120%] h-[400px] md:h-[500px] lg:h-[600px]">
							<Image
								src="/images/certificate.png"
								alt="Sample Certificate of Completion"
								fill
								className="object-contain object-left"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

		</main>
	);
}