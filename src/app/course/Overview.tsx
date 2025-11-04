import { Heading } from "@/components/ui/common/Heading";
import { IconList } from "@/components/ui/common/IconList";
import { IconBookFilled, IconCheck } from "@/components/icons/icons";
import Button from "@/components/ui/button/Button";
import { IconArrowDown } from "@tabler/icons-react";

export default function Overview() {

	const keyBenefits = [
		"Globally recognized International Qualification with CQI-IRCA",
		"Digital course material access provided prior to and up to 12 months post-delivery of the class including score including view access to relevant ISO standards",
		"The renowned Kelmac Group Academy learning pathways to master a skill and advance your career, master a skill or achieve a certification",
		"Our course material is instructionally designed, industry focus, based upon best International Auditor practice compared to other competitors low quality",
		"The ultimate Auditor/Lead auditor course where we focus primarily on audit application, on average 30% more compared to other providers to better prepare you for your Auditor/Lead Auditor role",
		"Trusted by Certification Bodies/Registrars, Regulators, Consultants and household industry players",
		"Independent Training Organization that is not afraid to illustrate how the ISO conformity assessment standards are intended to be applied",
		"Delivered by local, leading and practicing Experts who have made a 30+ year career from educating, coaching and mentoring future and exiting Auditor/Lead Auditors",
		"The Kelmac Group Academy renowned customer service from enquiry to gaining your desired International qualification and advance your career"
	];

	return (
		<section className="bg-light mt-12">
			<div className="main-container primary-py">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					{/* Left Content */}
					<div>
						<Heading
							className="text-start"
							wrapperClassName="justify-start"
							subHeading="Overview"
							heading="Course overview"
							headingClassName="text-primary"
						/>
						<p className="md:text-2xl text-gray-700 leading-relaxed">
							This intensive, instructor-led program turns ISO 9001 from theory into
							evidence-driven internal auditing. Across two focused days, you'll
							learn to map processes and risks to audit trails, select meaningful
							samples, and use interview techniques that surface controls, gaps, and
							improvement opportunities. You'll practice grading nonconformities,
							distinguishing symptoms from root causes, and evaluating corrective
							actions for effectiveness, not just closure. Guided by ISO 19011
							principles and realistic case work, you'll produce concise,
							decision-ready reports that support management review and continual
							improvement. The result: credible assurance that your QMS delivers on
							requirements and stakeholder needs—plus practical tools and habits you
							can apply immediately in your own organization.
						</p>
					</div>

					{/* Right Image with Download Button */}
					<div className="relative max-w-xl mx-auto lg:mx-8">
						<div
							className="h-96 lg:h-[650px] rounded-3xl bg-cover bg-center bg-no-repeat relative"
							style={{ backgroundImage: "url('/images/bg/overview.png')" }}
						>
							<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
								<Button
									text="Download course curriculum"
									color="white"
									size="lg"
									icon={<IconArrowDown className="w-4 h-4" />}
									iconclassName="bg-gray-800 text-white"
									spanclassName="px-8 whitespace-nowrap"
									className="rounded-full"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Major Key Benefits Section */}
				<div className="mt-16">
					<Heading
						className="text-start"
						wrapperClassName="justify-start"
						heading="Major key benefits"
						headingClassName="text-primary text-4xl mb-8 ml-2"
					/>

					<div className="space-y-4">
						{keyBenefits.map((benefit, index) => (
							<div key={index} className="bg-white rounded-xl p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.04)]">
								<div className="flex items-center gap-4">
									<div className=" w-8 h-8 flex items-center justify-center">
										<IconCheck className="w-10 h-10 text-white" />
									</div>
									<p className="text-primary text-xl leading-relaxed">
										{benefit}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}