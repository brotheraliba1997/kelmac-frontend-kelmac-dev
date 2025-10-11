"use client";

import { Heading } from "@/components/ui/common/Heading";
import BundleSlider from "@/components/ui/course/BundleSlider";
import { teamMembers } from "@/data/our-team";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

type TeamMember = {
    id: string;
    imageUrl: string;
    name: string;
    role: string;
};


export default function TeamSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <main className="main">
            <section className="bg-primary md:bg-[url('/images/bg/our-team.png')] bg-cover lg:bg-top md:bg-[70%_top] bg-no-repeat lg:min-h-150 flex flex-col items-start justify-center overflow-hidden rounded-3xl">
                <div className="main-container primary-py">
                    <div className="text-white md:w-[85%] lg:w-[68%]">
                        <h1 className="text-4xl md:text-6xl font-hedvig leading-snug">
                            Team members
                        </h1>
                        <h6 className="text-3xl mt-2">Founder &CEO</h6>
                        <p className="md:text-xl font-inter text-capitalize mt-8">
                            What began as a small training initiative has grown into a trusted name in professional development and certification.
                            Founded by industry experts who believed in practical, high-impact learning, we started with one goal: make quality training accessible and globally recognized.

                            Over the years, we’ve trained thousands of professionals, partnered with global organizations, and earned international accreditation — but our core purpose remains unchanged: empowering people through knowledge that works.
                        </p>
                    </div>
                </div>
            </section>
            <div className="flex justify-center text-center w-full mt-16">
                <Heading
                    subHeading="Message"
                    heading="Message from founder"
                    subHeadingClassName="text-primary text-center"
                    headingClassName="text-primary text-center"
                />
            </div>

            <section className="bg-primary md:bg-[url('/images/bg/message-from-founder.png')] bg-cover lg:bg-top md:bg-[70%_top] bg-no-repeat lg:min-h-150 flex flex-col items-start justify-center overflow-hidden rounded-3xl">
                <div className="main-container flex justify-center">
                    <div className="text-white md:w-[85%] lg:w-[75%] text-center mx-auto">
                        <p className="md:text-4xl mt-10 mb-2 font-inter-tight italic leading-relaxed tracking-normal">
                            When I founded Kelmac Group® in 1994, I had a simple conviction: international
                            standards should do more than secure a certificate—they should unlock better
                            businesses and better outcomes for people. If we teach them well, apply them wisely,
                            and audit them with integrity, standards become a catalyst for excellence, not a hurdle
                            to clear.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-light">
                <div className="container mx-auto px-4">
                    <Heading
                        subHeading="Team"
                        heading="Let's Meet With Our Team"
                        headingClassName="text-primary"
                    />
                    <div className="relative pb-20">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={32}
                            slidesPerView={2}
                            navigation={{
                                prevEl: ".team-prev",
                                nextEl: ".team-next",
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 2.2,
                                },
                            }}
                            onSlideChange={handleSlideChange}
                            className="!overflow-visible"
                        >
                            {teamMembers.map((member, index) => {
                                const isVisible = index === activeIndex || index === activeIndex + 1;
                                return (
                                    <SwiperSlide key={member.id}>
                                        <div className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-50'}`}>
                                            <div className="relative rounded-lg overflow-hidden">
                                                <img src={member.imageUrl} alt={member.name} className="w-full h-200" />
                                                <div className="absolute bottom-10 left-5 w-full p-4 text-white">
                                                    <h3 className="text-3xl font-semibold">{member.name}</h3>
                                                    <p className="text-2xl">{member.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
                            <button
                                className={`team-prev w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${activeIndex === 0
                                    ? 'bg-black opacity-50 cursor-not-allowed'
                                    : 'border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-primary'
                                    }`}
                                aria-label="Previous slide"
                                disabled={activeIndex === 0}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 md:w-6 md:h-6"
                                >
                                    <path
                                        d="M13 8H3M3 8L8 13M3 8L8 3"
                                        stroke={activeIndex === 0 ? 'white' : '#4B5563'}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                className={`team-next w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${activeIndex >= teamMembers.length - 2
                                    ? 'bg-black opacity-50 cursor-not-allowed'
                                    : 'bg-black hover:bg-secondary'
                                    }`}
                                aria-label="Next slide"
                                disabled={activeIndex >= teamMembers.length - 2}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 md:w-6 md:h-6"
                                >
                                    <path
                                        d="M3 8H13M13 8L8 3M13 8L8 13"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}