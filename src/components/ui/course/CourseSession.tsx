import React, { useState } from "react";
import { cn } from "@/lib/utils";
import LinkButton from "@/components/ui/button/LinkButton";
import { IconArrowRight } from "@tabler/icons-react";
import { IconClock } from "@/components/icons/icons";
import { Tag } from "@/components/ui/common/Tag";
import { Course } from "@/types/course";
import { authAPI } from "@/store/api/authApi";
import { useSelector } from "react-redux";
import Button from "../button/Button";
import { useRouter } from "next/navigation";

export type CourseSessionProps = {
  label?: string;
  date?: string;
  time?: string;
  href?: string;
  className?: string;
  sessionBadge?: string;
  sessionBadgeType?: "purple" | "green" | "yellow" | "red";
  seatsLeft?: number;
  description?: string;
  course?: Course;
  timetable?: {
    id: string;
    date: string;
    description: string;
    time: string;
  };
};

export function CourseSession({
  timetable,
  course,
  // label = "CourseSession",
  // date = "Mar 15-19, 2025",
  // time = "9:00 AM - 4:30 PM (Eastern Time (GMT-5))",
  // description = "Full Week",
  // sessionBadge = "Split Week",
  // sessionBadgeType = "purple",
  // href = "/registration/basicinfo",
  className = "",
  seatsLeft,
}: CourseSessionProps) {
  const CourseSessionClasses = cn(
    "bg-white rounded-xl p-4 md:p-7 grid grid-cols-1 md:grid-cols-4 items-center justify-center shadow-[0_15px_30px_0_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_0_rgba(0,0,0,0.08)] transition-shadow duration-300",
    className
  );
  // const colorMap = {
  //   purple: "text-[#9747FF] bg-[#9747FF]/15",
  //   green: "bg-[#DCFCE7] text-[#15803D]",
  //   yellow: "bg-[#FFFBEB] text-[#C69311]",
  //   red: "bg-[#E6647A1F]/12 text-[#E6647A1F]",
  // };
  // const sessionBadgeTypeClasses = cn(
  //   "px-3 py-1 text-[12px] font-medium flex items-center justify-center rounded-lg",
  //   colorMap[sessionBadgeType]
  // );

  // Early return if timetable is not provided
  if (!timetable) {
    return null;
  }

  const { date, description, time } = timetable;
  // const [selectedOption, setSelectedOption] = useState<string>("");

  // const handleDateSelect = (date: string, time: string) => {
  //   const uniqueKey = `${date} ${time}`;
  //   setSelectedOption(uniqueKey);
  // };
  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  function getBadgeStyles(type: string) {
    if (!type) return "";
    const t = type.toLowerCase();
    if (t.includes("full")) return "bg-emerald-100 text-emerald-700";
    if (t.includes("weekend")) return "bg-amber-50 text-amber-600";
    if (t.includes("even")) return "bg-purple-100 text-purple-600";
    return "bg-purple-100 text-purple-600";
  }
  const auth = useSelector((state: any) => state?.auth);
  const router = useRouter();
  const handleClick = () => {
    if (!course || !timetable) return;

    localStorage.setItem(
      "selectedCourse",
      JSON.stringify({
        id: course.id,
        discountedPrice: course.discountedPrice,
        price: course.price,
      })
    );
    localStorage.setItem("selectedTimetableId", timetable.id);
    if (auth?.user?.id) {
      router.push("/registration/payment");
    } else {
      router.push("/registration/basicinfo");
    }
  };
  return (
    <div className={CourseSessionClasses + " relative"}>
      {seatsLeft && (
        <div className="absolute top-0 right-0 bg-[#EF4A6A] text-white px-3 py-1 rounded-bl-xl rounded-tr-xl text-lg">
          {seatsLeft < 10 ? `0${seatsLeft}` : seatsLeft} seats left
        </div>
      )}
      <div className="col-span-3 space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <h3 className="font-semibold text-2xl text-black">
            {formattedDate(date)}
          </h3>
          <div
            className={` px-3 py-1 rounded-md text-xs font-medium ${getBadgeStyles(
              description.split(",")[0]
            )}`}
          >
            {/* {getBadgeStyles()} */}
            {description.split(",")[0]}

            {/* {getBadgeStyles(description.split(",")[0])} */}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <IconClock />
          <span className="md:text-lg font-medium text-primary/75">{time}</span>
        </div>
      </div>
      <div className="text-end">
        {/* <button
          onClick={() => {}}
          className="text-primary flex items-center gap-2 font-medium ml-auto hover:underline cursor-pointer"
        >
          Book Now
          <IconArrowRight size={16} />
        </button> */}
        <Button
          className="text-primary"
          onClick={handleClick}
          text="Book Now"
          icon={<IconArrowRight size={16} />}
        />
        {/* <LinkButton
          className="text-primary"
          on
          text="Book Now"
          icon={<IconArrowRight size={16} />}
        /> */}
      </div>
    </div>
  );
}
