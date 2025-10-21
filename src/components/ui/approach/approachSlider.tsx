"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { auditingApproach, consultingApproach } from "@/data/corporate";
import LinkButton from "@/components/ui/button/LinkButton";
import { IconArrowRight } from "@/components/icons/icons";

interface SliderItem {
  title: string;
  description: string;
  image: string;
  knowMore?: boolean;
  href?: string;
}

interface ApproachSliderProps {
  activeTab?: "auditing" | "consulting";
  data?: SliderItem[];
  autoplayDelay?: number;
  spaceBetween?: number;
  slideWidthClass?: string;
}

export default function ApproachSlider({
  activeTab,
  data,
  autoplayDelay = 3000,
  spaceBetween = 24,
  slideWidthClass = "!w-[320px]"
}: ApproachSliderProps) {
  const getSliderData = (): SliderItem[] => {
    if (data) return data; 

    if (activeTab === "consulting") return consultingApproach;
    return auditingApproach;
  };

  const items = getSliderData();

  return (
    <Swiper
      observer
      observeParents
      modules={[Autoplay, Navigation]}
      spaceBetween={spaceBetween}
      slidesPerView="auto"
      loop
      autoplay={{
        delay: autoplayDelay,
        disableOnInteraction: false,
      }}
      className="!overflow-visible"
    >
      {items.map((item, i) => (
        <SwiperSlide key={i} className={slideWidthClass}>
          <div className="flex flex-col items-center rounded-3xl overflow-hidden h-full backdrop-blur-sm">
            <div className="w-full">
              <div
                className="h-65 w-full rounded-3xl bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </div>

            <div className="flex flex-col justify-between text-left p-6 w-full h-full space-y-4">
              <div>
                <h3 className="text-2xl text-white leading-snug min-h-[60px] flex items-center">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed min-h-[80px]">
                  {item.description}
                </p>
              </div>

              {item.knowMore && (
                <div>
                  <LinkButton
                    href={item.href || "#"}
                    text="Know more"
                    icon={<IconArrowRight />}
                    className="text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}