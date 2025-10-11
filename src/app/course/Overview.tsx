import { Heading } from "@/components/ui/common/Heading";
import { IconList } from "@/components/ui/common/IconList";
import { IconBookFilled } from "@/components/icons/icons";

export default function Overview() {
	const learningPoints = [
		{
			icon: <IconBookFilled />,
			text: "Key concepts of ISO 9001:2015 — risk-based thinking, the process approach, and alignment with business strategy, translated into internal audit criteria and trails.",
		},
		{
			icon: <IconBookFilled />,
			text: "Purpose and benefits of a QMS — why organizations adopt ISO 9001 and how internal audits add assurance, compliance, and performance value.",
		},
		{
			icon: <IconBookFilled />,
			text: "Quality Management Principles — customer focus, leadership, people engagement, process approach, improvement, evidence-based decisions, and relationship management—applied in audit planning and evaluation.",
		},
		{
			icon: <IconBookFilled />,
			text: "Context and leadership — analysing context and interested parties; assessing leadership roles, policy, objectives, and risk/opportunity treatment during audits.",
		},
		{
			icon: <IconBookFilled />,
			text: "Support, operations, and improvement — auditing resources, competence, communication, documented information, operational control, internal audits, nonconformity/corrective action, and continual improvement.",
		},
	];

	return (
		<section className="bg-light mt-12">
			<div className="main-container primary-py">
				<Heading
					className="text-start"
					wrapperClassName="justify-start"
					subHeading="Overview"
					heading="Course Overview"
					headingClassName="text-primary"
				/>
				<p className="md:text-xl">
					This intensive, instructor-led program turns ISO 9001 from theory into
					evidence-driven internal auditing. Across two focused days, you’ll
					learn to map processes and risks to audit trails, select meaningful
					samples, and use interview techniques that surface controls, gaps, and
					improvement opportunities. You’ll practice grading nonconformities,
					distinguishing symptoms from root causes, and evaluating corrective
					actions for effectiveness, not just closure. Guided by ISO 19011
					principles and realistic case work, you’ll produce concise,
					decision-ready reports that support management review and continual
					improvement. The result: credible assurance that your QMS delivers on
					requirements and stakeholder needs—plus practical tools and habits you
					can apply immediately in your own organization.
				</p>

				<h5 className="text-2xl md:text-3xl font-semibold text-black mt-6 mb-4">
					What You’ll Learn
				</h5>
				<IconList
					className="text-lg md:text-xl text-black"
					items={learningPoints}
				/>
				<p className="mt-6 font-bold md:text-xl text-lg text-black">
					Upon successful completion, participants will receive a{" "}
					<span className="text-secondary">
						CQI-IRCA Certified Fundamentals Certificate
					</span>{" "}
					(Course ID: 18113).
				</p>
			</div>
		</section>
	);
}
