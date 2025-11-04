"use client";

import { Heading } from "@/components/ui/common/Heading";
import { AccordionTwo } from "@/components/ui/common/Accordian/AccordianTwo";
import { SyllabusCards } from "@/components/ui/common/SyllabusCard";
import { IconArrowCircleUpRightblur, IconFilter } from "@/components/icons/icons";

export default function Syllabus() {
	const syllabusItems = [
		{
			id: "1",
			title: "Day 01",
			subtitle: "5 Lessons",
			content: (
				<SyllabusCards
					cards={[
						{
							title: "Course Introduction",
							hideTimeIcon: true,
							items: [
								{
									text: "Course Logistics and Rules",
									icon: <IconArrowCircleUpRightblur />,
								},
								{
									text: "Attendance and Continuous Assessment",
									icon: <IconArrowCircleUpRightblur />,
								},
								{
									text: "Course Aims and Objectives",
									icon: <IconArrowCircleUpRightblur />,
								},
								{
									text: "Ice Breaker Exercise",
									icon: <IconFilter className=" text-secondary size-10" />,
									className: "text-secondary font-semibold",
								},
								{
									text: "Ice Breaker Exercise",
									icon: <IconArrowCircleUpRightblur />,
								},
								{
									text: "Audit Terminology Exercise",
									icon: <IconArrowCircleUpRightblur />,
								},
							],
						},
						{
							title: "Session 1",
							hideTimeIcon: true,
							items: [
								{
									text: "Introduction and Objectives",
								},
								{
									text: "Quality Management System and Its Be...",
								},
								{
									text: "Introduction to ISO 9001:201...",
								},
								{
									text: "Process Based Approach ...",
								},
								{
									text: "PDCA ...",
								},
								{
									text: "Session 1 - Learner Evaluation",
								},
							],
						},
						{
							startTime: "10:30",
							title: "Session 2",
							items: [
								{
									text: "Introduction and Objectives",
								},
								{
									text: "Audit Terminology",
								},
								{
									text: "Management System Audit Types",
								},
								{
									text: "SO 9001:2015 Internal Auditing and Internal Audit Program",
								},
								{
									text: "Process based internal auditing/Tools",
								},
								{
									text: "Principles of auditing",
								},
								{
									text: "Audit Lifecycle Exercise",
								},
							],
						},
						{
							startTime: "13:15",
							title: "Session 2-Continued",
							items: [
								{
									text: "Desired Auditor Behaviours",
								},
								{
									text: "Audit Team/Auditee Roles throughout the Audit Lifecycle",
								},
								{
									text: "Session 2 - Learner Evaluation",
								},
								{
									text: "SO 9001:2015 Internal Auditing and Internal Audit Program",
								},
							],
						},
						{
							startTime: "14:15",
							title: "Session 3",
							items: [
								{
									text: "Introduction and Objectives",
								},
								{
									text: "Internal QMS Audit Planning workflow",
								},
								{
									text: "Initiating the Audit/Audit Objectives, Scope, Criteria",
								},
								{
									text: "Initial contact with Process owner",
								},
								{
									text: "Audit Feasibility",
								},
								{
									text: "Audit Working Documents",
								},
							],
						},
						{
							startTime: "15:30",
							title: "Session 3-Continued",
							items: [
								{
									text: "Case Study - Audit Plan",
								},
								{
									text: "Case Study - Audit Checklist",
								},
								{
									text: "Initiating the Audit/Audit Objectives, Scope, Criteria",
								},
								{
									text: "Session 3 - Learner Evaluation",
								},
							],
						},
					]}
				/>
			),
		},
		{
			id: "2",
			title: "Day 02",
			subtitle: "5 Lessons",
			content: (
				<SyllabusCards
					cards={[
						{
							startTime: "08:00",
							title: "Session 4",
							items: [
								{
									text: "Introduction and Objectives",
								},
								{
									text: "Internal Audit Opening Meeting",
								},
								{
									text: "Session 4 - Learner Evaluation",
								},
								{
									text: "Ice Breaker Exercise",
								},
								{
									text: "Audit Terminology Exercise",
								},
							],
							breakTime: "09:30",
							breakLabel: "Tea/Coffee",
						},
						{
							startTime: "09:45",
							title: "Session 5",
							items: [
								{
									text: "Communication during the Audit",
								},
								{
									text: "Collecting and Verifying Information",
								},
								{
									text: "Techniques to Obtain Objective Evidence",
								},
								{
									text: "Case Study – Document Review",
								},
								{
									text: "Session 5 - Learners Evaluation",
								},
							],
							breakTime: "12:15",
							breakLabel: "Lunch",
						},
						{
							startTime: "10:30",
							title: "Session 6",
							items: [
								{
									text: "Generating Audit Findings and Reporting Non-Conformity",
								},
								{
									text: "Final Audit Team Meeting",
								},
								{
									text: "Audit Findings Exercise",
								},
								{
									text: "Audit Report",
								},
								{
									text: "Audit Conclusion Exercise",
								},
							],
							breakTime: "15:00",
							breakLabel: "Tea/Coffee",
						},
						{
							startTime: "13:15",
							title: "Session 6-Continued",
							items: [
								{
									text: "Closing/Exit Meeting",
								},
								{
									text: "Audit Follow up",
								},
								{
									text: "Session 2 - Learner Evaluation",
								},
								{
									text: "Correction/Corrective Actions",
								},
								{
									text: "Closing/Exit Meeting and C/CA Exercise",
								},
								{
									text: "Session 6 - Learner Evaluation",
								},
								{
									text: "16:30 Course review and Questions",
								},
							],
							breakTime: "16:30",
							breakLabel: "End of second day",
						},
					]}
				/>
			),
		},
	];

	return (
		<section className="bg-primary rounded-4xl mt-12 overflow-hidden">
			<div className="main-container primary-py">
				<Heading
					headingClassName="text-white"
					subHeading="Overview"
					heading="Syllabus breakdown"
				/>
				<p className="text-white text-center max-w-2xl mx-auto md:text-xl text-lg mb-12">
					This course is ideal for quality professionals, auditors, consultants,
					and anyone responsible for maintaining or evaluating QMS performance.
					Upon successful completion, participants will receive a CQI-IRCA
					Certified Lead Auditor{" "}
				</p>
				<AccordionTwo items={syllabusItems} />
			</div>
		</section>
	);
}