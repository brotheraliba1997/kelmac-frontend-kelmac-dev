"use client";
import { useState } from "react";
import { Clock, X } from "lucide-react";
import { Iconcheckmark } from "@/components/icons/icons";
import { Heading } from "@/components/ui/common/Heading";
import Link from "next/link";
import { Course } from "@/types/course";

interface DateOption {
  date: string;
  time: string;
  type: string;
}

interface DateSelectionPopupProps {
  onClose: () => void;
  course: Course;
  timetable: {
    id: string;
    date: string;
    description: string;
    time: string;
  }[];
}

const dateOptions: DateOption[] = [
  {
    date: "Apr 8-9, 15-16, 2025",
    time: "9:00 AM - 4:30 PM (Eastern Time GMT-5)",
    type: "Full Week",
  },
  {
    date: "Mar 15-19, 2025",
    time: "9:00 AM - 4:30 PM (Eastern Time GMT-5)",
    type: "",
  },
  {
    date: "May 1-5, 2025",
    time: "9:00 AM - 4:30 PM (Eastern Time GMT-5)",
    type: "Weekend",
  },
  {
    date: "May 1-5, 2025",
    time: "5:00 PM - 9:00 PM (Eastern Time GMT-5)",
    type: "Evening",
  },
  {
    date: "May 1-5, 2025",
    time: "6:00 PM - 9:00 PM (Eastern Time GMT-5)",
    type: "Evening",
  },
];

function getBadgeStyles(type: string) {
  if (!type) return "";
  const t = type.toLowerCase();
  if (t.includes("full")) return "bg-emerald-100 text-emerald-700";
  if (t.includes("weekend")) return "bg-amber-50 text-amber-600";
  if (t.includes("even")) return "bg-purple-100 text-purple-600";
  return "bg-purple-100 text-purple-600";
}

export default function DateSelectionPopup({
  onClose,
  timetable,
  course,
}: DateSelectionPopupProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleDateSelect = (date: string, time: string) => {
    const uniqueKey = `${date} ${time}`;
    setSelectedOption(uniqueKey);
  };
  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative border-b border-gray-100 bg-white z-10 rounded-t-2xl h-[80px] flex items-center">
          <Heading
            heading="Please select the class date"
            headingClassName="text-primary text-4xl text-center absolute left-1/2 -translate-x-1/2 w-[70%]"
          />

          <button
            onClick={onClose}
            className="absolute right-6 text-red-500 hover:text-red-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-secondary rounded-b-2xl p-5 space-y-2 w-full">
          {timetable.map((option: any, index: number) => {
            const uniqueKey = `${option.date} ${option.time}`;
            const isSelected = selectedOption === uniqueKey;

            return (
              <div
                key={index}
                onClick={() => handleDateSelect(option.date, option.time)}
                className={`relative rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-gray-900 hover:shadow-md"
                }`}
              >
                <Link
                  href="/registration/basicinfo"
                  onClick={() => {
                    localStorage.setItem(
                      "selectedCourse",
                      JSON.stringify({
                        id: course.id,
                        discountedPrice: course.discountedPrice,
                        price: course.price,
                      })
                    );
                    localStorage.setItem("selectedTimetableId", option.id);
                    onClose();
                  }}
                  className="block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3
                          className={`text-xl font-semibold ${
                            isSelected ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {formattedDate(option.date)}
                        </h3>
                        {option.description && (
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-medium ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : getBadgeStyles(
                                    option.description.split(",")[0]
                                  )
                            }`}
                          >
                            {option.description.split(",")[0]}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock
                          className={`w-4 h-4 ${
                            isSelected ? "text-white/80" : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-white/90" : "text-gray-600"
                          }`}
                        >
                          {option.time}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Iconcheckmark className="w-6 h-6 text-white" />
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
