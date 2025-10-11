'use client';

import { Heading } from "@/components/ui/common/Heading";
import { Timeline } from "@/components/ui/common/Timeline";
import { corporateTimelineItems } from "@/data/corporate";
import { PersonsIcon, Certification, Screencast, Lifebuoy, Bookmark } from "@/components/icons/icons";
import { IconArrowRight } from "@tabler/icons-react";
import Button from "@/components/ui/button/Button";


export default function Corporate() {


  return (
    <main className="main">
      <section className="relative bg-primary bg-[url('/images/bg/corporate_hero.png')] bg-right bg-cover bg-no-repeat lg:min-h-128 flex flex-col items-start justify-center overflow-hidden rounded-3xl">
        <div className="main-container primary-py relative z-10">
          <div className="text-white md:w-[85%] lg:w-[60%]">
            <h1 className="text-4xl md:text-6xl font-hedvig leading-snug mb-8">
              Elevate Your Skills with<br /> Globally Recognized Training
            </h1>
            <p className="md:text-xl font-inter leading-relaxed mb-8">
              We provide trusted auditing and training services that ensure your organization
              meets compliance requirements with confidence. Our expert team focuses on
              delivering actionable insights that drive continuous improvement and sustainable
              success. Partner with us to strengthen your management systems and build lasting
              quality assurance.
            </p>

            <Button
              spanclassName="px-4"
              className="gap-0"
              text="Enquire now"
              href="#"
              icon={<IconArrowRight className="stroke-primary" />}
              color="white"
            />
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="main-container primary-py">
          <Heading
            subHeading="Speciality"
            heading="What we offer"
            headingClassName="text-primary"
          />

          <Timeline items={corporateTimelineItems} />
        </div>
      </section>

      <section className="relative bg-primary bg-[url('/images/bg/corporate_hero2.png')] bg-left bg-cover bg-no-repeat overflow-hidden rounded-3xl">
        <div className="main-container primary-py">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <div className="hidden lg:block lg:w-1/2"></div>
            <div className="w-full lg:w-[85%] lg:pl-0">
              <div className="mb-10">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <h4 className="sub-heading text-secondary before:bg-secondary">Speciality</h4>
                </div>
                <h2 className="main-heading text-white text-center lg:text-left">
                  Why Train with Us?
                </h2>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4 md:gap-6 text-white">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                    <PersonsIcon />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                      Certified and Experienced Trainers
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
                      Globally Recognized Certifications
                    </h3>
                    <p className="text-white/80 text-sm md:text-base lg:text-lg">
                      All Our Lead Auditor Courses Are Approved By CQI-IRCA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-6 text-white">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                    <Bookmark />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                      Hands-On Learning Approach
                    </h3>
                    <p className="text-white/80 text-sm md:text-base lg:text-lg">
                      Emphasize Active Participation Through Case Studies, Audit Simulations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-6 text-white">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                    <Screencast />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3">
                      Flexible Delivery Formats
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

      <section className="relative bg-secondary bg-[url('/images/bg/corporate_hero3.png')] bg-right bg-cover bg-no-repeat overflow-hidden rounded-3xl mt-18">
        <div className="main-container primary-py">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="space-y-6 md:space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-hedvig text-white leading-tight">
                  Contact with us
                </h2>
                <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed">
                  We'll assist you in selecting the perfect course tailored to your goals. Your
                  experience will guide us in making the best choice.
                </p>
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
            <div className="hidden lg:block lg:w-1/2"></div>
          </div>
        </div>
      </section>

    </main>
  );
}