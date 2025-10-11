"use client";
import { IconArrowRight } from "@tabler/icons-react";
import Button from "@/components/ui/button/Button";
import NewsletterSection from "@/components/Sections/Newsletter/NewsletterSection";
import { Heading } from "@/components/ui/common/Heading";

export default function Contact() {
  return (
    <main className="main bg-gray-100">
      <section className="bg-[#0B1C40] bg-[url('/images/bg/contact.png')] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-center overflow-hidden rounded-3xl">
        <div className="main-container primary-py">
          <div className="text-white md:w-[85%] lg:w-[62%]">
            <h1 className="text-4xl md:text-6xl font-hedvig leading-relaxed">
              Contact with us
            </h1>
            <p className="md:text-xl font-normal text-white/90 mt-8">
              Please take the time to complete the following form and provide us with
              as much information as you are able to ensure we can deal with your
              request as promptly and accurately as we can. We look forward to
              hearing from you! Thank you for contacting Us!
            </p>
          </div>
        </div>
      </section>

      <section className="main-container py-16 bg-gray-100">
        <div className="flex flex-col lg:flex-row gap-30">
          <div className="lg:w-1/2">

            <div className="mb-10">
              <div className="flex items-start mb-4">
                <h4 className="sub-heading before:bg-secondary">Contact us</h4>
              </div>
              <h2 className="main-heading text-primary">Send Us Message!</h2>
            </div>
            <form className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-1/2 px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent placeholder:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-1/2 px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent placeholder:text-gray-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent placeholder:text-gray-500"
              />
              <div className="flex gap-4">
                <select className="w-1/3 px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent text-gray-500 appearance-none">
                  <option>Country code</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-2/3 px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent placeholder:text-gray-500"
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-1/2 px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent placeholder:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Your Designation"
                  className="w-1/2 px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent placeholder:text-gray-500"
                />
              </div>
              <textarea
                placeholder="How Can We Help?"
                className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-[#182E4B] focus:border-transparent resize-none placeholder:text-gray-500"
              ></textarea>
              <Button
                text="Submit your Form"
                icon={<IconArrowRight className="stroke-primary" />}
                spanclassName="px-4 w-full text-center"
                iconPosition="after"
                size="lg"
                color="primary"
                onClick={() => console.log("Form submitted!")}
                className="w-full"
              />
            </form>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-[#182E4B] text-white p-10 rounded-[24px] w-[500px]">
              <div className="mb-8 text-RIGHT">
                <h2 className="text-4xl font-hedvig mb-4">
                  Contact Us
                </h2>
                <div className="w-80 h-[0.070px] bg-secondary mx-left"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/PhoneCall.png"
                    alt="Phone Icon"
                    width={24}
                    height={24}
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <div className="text-base text-[#94A3B8]">Phone No:</div>
                    <div>+353 61 491224</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/images/EnvelopeSimpleOpen.png"
                    alt="Email Icon"
                    width={24}
                    height={24}
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <div className="text-base text-[#94A3B8]">Email ID:</div>
                    <div>info@kelmacgroup.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <img
                    src="/images/MapPinLine.png"
                    alt="Location Icon"
                    width={24}
                    height={24}
                    className="w-8 h-8 object-contain mt-1"
                  />
                  <div>
                    <div className="text-base text-[#94A3B8]">Registered Office Address</div>
                    <div>Business Edge Limited T/A Kelmac Group®, Old Windmill, Office Suites, Lower Gerald, Griffin Street Limerick, V94 YRD7, Dublin, Ireland</div>
                  </div>
                </div>
              </div>

              <div
                className="mt-8 rounded-2xl overflow-hidden relative group"
                style={{ marginLeft: "-2vw", marginRight: "-2vw", marginBottom: "-28px" }}
              >
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.8754436967313!2d-8.630720323968403!3d52.66030597983404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b5c7c20f20a27%3A0x3b05c9374c8d661e!2sKelmac%20Group%20Limited!5e0!3m2!1sen!2sie!4v1695481234567!5m2!1sen!2sie"
                    width="100%"
                    height="240"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl w-full"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      text="View on larger map"
                      icon={<IconArrowRight className="stroke-black" />}
                      iconPosition="after"
                      size="md"
                      color="white"
                      href="https://www.google.com/maps/place/Kelmac+Group+Limited/@52.6603085,-8.6329889,17z/data=!3m1!4b1!4m6!3m5!1s0x485b5c7c20f20a27:0x3b05c9374c8d661e!8m2!3d52.6603085!4d-8.630714!16s%2Fg%2F11bw3y8qmg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}