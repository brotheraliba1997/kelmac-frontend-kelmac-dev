import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { IconArrowRight, IconBook } from "@tabler/icons-react";

export default function CoursesMegaMenu() {
  const coursesData = {
    isoCourses: [
      {
        href: "/course/",
        title: "ISO 9001 Foundation",
        hours: "19+ Hours",
        lessons: "10 Lessons",
        description: "Learn the fundamentals of ISO 9001 standards for quality management.",
      },
      {
        href: "/course",
        title: "ISO 9001 Lead Auditor",
        hours: "25+ Hours",
        lessons: "12 Lessons",
        description: "Become a certified lead auditor for ISO 9001 quality systems.",
      },
      {
        href: "/course",
        title: "ISO 14001 Foundation",
        hours: "15+ Hours",
        lessons: "8 Lessons",
        description: "Understand ISO 14001 standards for environmental management.",
      },
      {
        href: "/course",
        title: "ISO 45001 Foundation",
        hours: "18+ Hours",
        lessons: "9 Lessons",
        description: "Learn the basics of occupational health & safety management.",
      },
    ],
    qualityCourses: [
      {
        href: "/course",
        title: "Quality Basics",
        hours: "10+ Hours",
        lessons: "6 Lessons",
        description: "Introduction to quality management principles and tools.",
      },
      {
        href: "/course",
        title: "TQM Essentials",
        hours: "12+ Hours",
        lessons: "7 Lessons",
        description: "Master the fundamentals of Total Quality Management.",
      },
      {
        href: "/course",
        title: "Six Sigma Yellow Belt",
        hours: "20+ Hours",
        lessons: "11 Lessons",
        description: "Learn the basics of Six Sigma methodology and process improvement.",
      },
      {
        href: "/courses/six-sigma-green-belt",
        title: "Six Sigma Green Belt",
        hours: "30+ Hours",
        lessons: "15 Lessons",
        description: "Gain deeper knowledge to lead Six Sigma projects efficiently.",
      },
    ],
    safetyCourses: [
      {
        href: "/courses/hse-foundation",
        title: "HSE Foundation",
        hours: "14+ Hours",
        lessons: "7 Lessons",
        description: "Learn Health, Safety & Environment fundamentals.",
      },
      {
        href: "/courses/workplace-safety",
        title: "Workplace Safety",
        hours: "16+ Hours",
        lessons: "8 Lessons",
        description: "Understand safety standards and risk prevention at work.",
      },
      {
        href: "/courses/fire-safety-basics",
        title: "Fire Safety Basics",
        hours: "10+ Hours",
        lessons: "5 Lessons",
        description: "Essential fire safety practices and emergency procedures.",
      },
      {
        href: "/courses/risk-assessment",
        title: "Risk Assessment",
        hours: "12+ Hours",
        lessons: "6 Lessons",
        description: "Learn how to identify and manage workplace risks effectively.",
      },
    ],
  };

  const cardClass =
    "group flex items-start gap-3 bg-white p-2 rounded-lg transition-all duration-1000 ease-in-out " +
    "hover:scale-105 hover:translate-x-1 hover:translate-y-1 hover:bg-white";

  const renderCourseList = (courses: typeof coursesData.isoCourses) => {
    return courses.map((course, index) => (
      <li key={index}>
        <div className={cardClass}>
          {/* Icon/Image Section */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <IconBook className="w-7 h-7 text-primary mt-2.5 absolute transition-opacity duration-1000 opacity-100 group-hover:opacity-0" />
            <Image
              src="/images/bg/course-mega.png"
              alt="Course Icon"
              width={40}
              height={40}
              className="object-cover absolute top-0 left-0 transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <Link href={course.href} className="relative block font-semibold text-gray-800 transition-colors duration-1000">
              <span className="block transition-opacity duration-1000 opacity-100 group-hover:opacity-0">
                {course.title}
              </span>
              <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 text-black flex flex-col">
                <span className="font-normal">{course.title}</span>
                <span className="text-sm text-black">{course.hours} {course.lessons}</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 mt-0.5 transition-opacity duration-1000 opacity-100 group-hover:opacity-0 line-clamp-1">
              {course.description}
            </p>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="p-6 w-[800px]">
      <div className="grid grid-cols-3 gap-6">
        {/* ISO Courses */}
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-4 uppercase">ISO Courses</h3>
          <ul className="space-y-4 list-none">{renderCourseList(coursesData.isoCourses)}</ul>
        </div>

        {/* Quality Management Courses */}
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-4 uppercase">Quality Management Courses</h3>
          <ul className="space-y-4 list-none">{renderCourseList(coursesData.qualityCourses)}</ul>
        </div>

        {/* Health & Safety Courses */}
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-4 uppercase">Health & Safety Courses</h3>
          <ul className="space-y-4 list-none">{renderCourseList(coursesData.safetyCourses)}</ul>
        </div>
      </div>

      {/* View All Courses Button */}
      <div className="flex justify-center mt-6">
        <Button
          href="/course/all-courses"
          text="View all Courses"
          icon={<IconArrowRight className="stroke-primary w-5 h-5" />}
          color="primary"
        />
      </div>
    </div>
  );
}