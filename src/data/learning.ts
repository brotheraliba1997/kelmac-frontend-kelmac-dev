// data/learning.ts
import { TimelineItem } from "@/components/ui/common/Timeline";
import { CourseCardProps } from "@/components/ui/course/CourseCard";


export const learningTimelineItems: TimelineItem[] = [
    {
        id: 1,
        title: "Certified Training Courses",
        description:
            "End-to-end support for ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Health & Safety), and other standards. From documentation to training, we guide you through every step.",
        imageUrl: "/images/timeline/learning/learning-1.png",
        link: "/corporate/consulting",
    },
    {
        id: 2,
        title: "Flexible Delivery Options",
        description:
            "Streamline multiple standards into one efficient system — reducing duplication and improving overall effectiveness..",
        imageUrl: "/images/timeline/learning/learning-2.png",
        link: "/course",
    },
    {
        id: 3,
        title: "Course Bundles & Learning Paths",
        description:
            "We evaluate your current systems against standard requirements and provide a clear roadmap to compliance and certification.",
        imageUrl: "/images/timeline/learning/learning-3.png",
        link: "/course/all-courses",
    },
        {
        id: 4,
        title: "Exams, Certificates & Beyond",
        description:
            "Identify inefficiencies, reduce waste, and build stronger control over risks with proven methodologies like PDCA, FMEA, and root cause analysis.",
        imageUrl: "/images/timeline/learning/learning-4.png",
        link: "/course",
    },
];

export const courses: CourseCardProps[] = [
    {
        id: 1,
        category: "Quality Management System",
        title: "QMS ISO 9001:2015",
        description:
            "Quality Management Systems to enhance customer satisfaction and operational efficiency.",
        hours: "08",
        lessons: 10,
        mode: "Online",
        imageUrl: "/images/course.png",
    },
    {
        id: 2,
        category: "Quality Management System",
        title: "QMS ISO 9001:2015",
        description:
            "Quality Management Systems to enhance customer satisfaction and operational efficiency.",
        hours: "19+",
        lessons: 10,
        mode: "Online",
        imageUrl: "/images/course.png",
    },
    {
        id: 3,
        category: "ISO fundamentals",
        title: "QMS ISO 9001:2015",
        description:
            "Quality Management Systems to enhance customer satisfaction and operational efficiency.",
        hours: "19+",
        lessons: 10,
        mode: "Online",
        imageUrl: "/images/course.png",
    },
];