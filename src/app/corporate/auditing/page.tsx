"use client";

import { auditingItems, categoryItems } from "@/data/auditing";
import { auditingFaqItems } from "@/data/auditing";
import Button from "@/components/ui/button/Button";
import { IconArrowRight } from "@tabler/icons-react";
import { Heading } from "@/components/ui/common/Heading";
import { Accordion } from "@/components/ui/common/Accordian/Accordian";
import { PersonsIcon, Certification, Screencast, Lifebuoy, Bookmark } from "@/components/icons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function Auditing() {
    return (
        <main className="main">
            <section className="bg-primary bg-[url('/images/auditing.png')] bg-right md:bg-center bg-cover bg-no-repeat lg:min-h-128 flex flex-col items-start justify-center overflow-hidden rounded-3xl">
                <div className="main-container primary-py">
                    <div className="text-white w-full md:w-[85%] lg:w-[50%]">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-hedvig leading-tight md:leading-snug mb-6 md:mb-8">
                            Auditing
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl font-inter leading-relaxed mb-6 md:mb-8">
                            We provide trusted auditing and training services that ensure your organization
                            meets compliance requirements with confidence. Our expert team focuses on
                            delivering actionable insights that drive continuous improvement and sustainable
                            success. Partner with us to strengthen your management systems and build lasting
                            quality assurance.
                        </p>

                        <Button
                            spanclassName="px-4"
                            className="gap-0"
                            text="View Upcoming Courses"
                            href="/course/all-courses"
                            icon={<IconArrowRight className="stroke-primary" />}
                            color="white"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="main-container primary-py">
                    <Heading
                        subHeading="Course"
                        heading="Our Services"
                        headingClassName="text-primary"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {auditingItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[450px] flex items-end transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="relative z-10 p-6 md:p-10 pb-8 md:pb-18 text-white w-full transform transition-transform duration-500 hover:-translate-y-2">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-[550] mb-3 md:mb-4 min-h-[60px] md:min-h-[70px] flex items-end">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-light text-white/80 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
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
                        {categoryItems.map((category, i) => (
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

            <section className="relative bg-primary bg-[url('/images/bg/why-choose-us.png')] bg-left bg-cover bg-no-repeat overflow-hidden rounded-3xl">
                <div className="main-container primary-py">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
                        <div className="hidden lg:block lg:w-1/2"></div>

                        <div className="w-full lg:w-[85%] lg:pl-0">
                            <div className="mb-10">
                                <div className="flex items-center justify-center lg:justify-start mb-4">
                                    <h4 className="sub-heading text-secondary before:bg-secondary">Speciality</h4>
                                </div>
                                <h2 className="main-heading text-white text-center lg:text-left">
                                    Why Choose Us
                                </h2>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4 md:gap-6 text-white">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                        <PersonsIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                                            Industry-Relevant Expertise
                                        </h3>
                                        <p className="text-white/80 text-base md:text-base lg:text-lg">
                                            Our Instructors Are CQI-IRCA Certified Professionals With Years Of Industry Experience.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 md:gap-6 text-white">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                        <Certification />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                                            Proven Certification Success
                                        </h3>
                                        <p className="text-white/80 text-sm md:text-base lg:text-lg">
                                            All Our Lead Auditor Courses Are Approved By CQI-IRCA,
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 md:gap-6 text-white">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                        <Bookmark />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                                            Tailored Solutions
                                        </h3>
                                        <p className="text-white/80 text-sm md:text-base lg:text-lg">
                                            Emphasize Active Participation Through Case Studies,Audit Simulations
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 md:gap-6 text-white">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                        <Screencast />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                                            Confidential & Collaborative
                                        </h3>
                                        <p className="text-white/80 text-sm md:text-base lg:text-lg">
                                            We Offer In-Person, Virtual, And Hybrid Courses
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 md:gap-6 text-white">
                                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                        <Lifebuoy />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                                            Post-Training Support and Resources
                                        </h3>
                                        <p className="text-white/80 text-sm md:text-base lg:text-lg">
                                            Graduates Get Access To Additional Learning Materials, Mentorship Opportunities
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light">
                <div className="main-container primary-py">
                    <Heading
                        subHeading="FAQ"
                        heading="Frequently Asked Questions"
                        headingClassName="text-primary"
                    />
                    <Accordion items={auditingFaqItems} />
                </div>
            </section>

            <section className="bg-primary md:bg-[url('/images/bg/corporate_hero3.png')] md:bg-center md:bg-cover md:bg-no-repeat overflow-hidden rounded-3xl">
                <div className="main-container primary-py">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
                        <div className="w-full lg:w-1/2">
                            <div className="space-y-4 md:space-y-6">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-hedvig text-white leading-tight">
                                    Contact with us
                                </h2>
                                <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed">
                                    We'll assist you in selecting the perfect course tailored to your goals. Your
                                    experience will guide us in making the best choice.
                                </p>
                                <div className="pt-2 md:pt-4">
                                    <Button
                                        spanclassName="px-4"
                                        className="gap-0"
                                        text="Enquire now"
                                        icon={<IconArrowRight className="stroke-primary" />}
                                        color="white"
                                        href="/contact-us"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block lg:w-1/2"></div>
                    </div>
                </div>
            </section>
        </main>
    );
}