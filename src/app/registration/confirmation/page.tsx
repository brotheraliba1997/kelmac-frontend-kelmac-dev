"use client";
import { IconArrowRight, IconCalender } from "@/components/icons/icons";
import { Heading } from "@/components/ui/common/Heading";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

interface RegistrationCompleteProps {
	userId: string;
	participantName: string;
	courseName: string;
	courseDate: string;
	courseTime: string;
	location: string;
	attendance: string;
	amountPaid?: number;
	transactionDate: string;
	paymentMethod: string;
}

const generateMockData = (): RegistrationCompleteProps => {
	const courseList = [
		"Certified Data Analyst Program",
		"ISO 9001:2015 Auditor Training",
		"Full-Stack Web Development Bootcamp",
		"Project Management Professional (PMP) Prep",
	];

	const participantList = ["Alice Johnson", "John Doe", "Michael Smith", "Sophia Brown"];
	const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer"];
	const randomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length);
	const randomAmount = (min: number, max: number) =>
		parseFloat((Math.random() * (max - min) + min).toFixed(2));

	return {
		userId: `U${Math.floor(10000 + Math.random() * 90000)}`,
		participantName: participantList[randomIndex(participantList)],
		courseName: courseList[randomIndex(courseList)],
		courseDate: `Oct ${10 + Math.floor(Math.random() * 20)}-${15 + Math.floor(Math.random() * 10)}, 2025`,
		courseTime: `${8 + Math.floor(Math.random() * 4)}:00 AM - ${4 + Math.floor(Math.random() * 4)}:00 PM Daily`,
		location: ["Online (Zoom)", "Virtual Training (MS Teams)", "In-person at HQ"][randomIndex([0, 1, 2])],
		attendance: ["Full 5-day course", "Partial 3-day course"][randomIndex([0, 1])],
		amountPaid: randomAmount(500, 2500),
		transactionDate: new Date().toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		}),
		paymentMethod: paymentMethods[randomIndex(paymentMethods)],
	};
};

export default function RegistrationComplete() {
	// const [data] = useState<RegistrationCompleteProps>(generateMockData());

	  const [data, setData] = useState<any | null>(null);
	    const [loading, setLoading] = useState(true);



	   useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/class-schedule/690f8bc0d9a9675662aa65e7`);
        const s = res.data;

        // Map _id to id string
        

        setData(s);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedSession, setSelectedSession] = useState(data.courseDate);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const sessions = [
		"Mar 15-19, 2025",
		"Apr 10-14, 2025",
		"May 6-10, 2025",
		"Jun 20-24, 2025",
	];

	const toggleDropdown = () => setIsOpen(!isOpen);
	const handleSelect = (session: string) => {
		setSelectedSession(session);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleAddToCalendar = () => console.log("Add to calendar clicked");
	const handleDownloadReceipt = () => console.log("Download receipt clicked");

	const displayAmountPaid = data.amountPaid || 0;

	return (
		<div className="min-h-screen bg-white relative">
			<section className="bg-primary bg-[url('/images/bg/basicinfo.png')] bg-center bg-cover bg-no-repeat lg:min-h-[250px] flex flex-col items-start justify-center relative rounded-3xl mb-12">
				<div className="main-container primary-py">
					<div className="text-white md:w-[85%] lg:w-[62%]">
						<h1 className="text-4xl md:text-6xl font-hedvig leading-snug">
							Registration Form
						</h1>

						<div className="mt-6 flex items-center">
							<div
								className="bg-white/5 rounded-lg flex items-center py-3 px-6 text-white space-x-4 relative z-20"
								ref={dropdownRef}
							>
								<IconCalender width={22} height={22} className="mr-2" />
								<div className="flex flex-col leading-tight">
									{/* <span className="text-lg font-semibold">{selectedSession}</span> */}
									<span className="text-sm text-white/80">{data.courseName}</span>
								</div>

								<button
									onClick={toggleDropdown}
									className="ml-4 flex items-center bg-white text-black text-sm px-4 py-2 rounded-full hover:bg-white/80 transition"
								>
									Change session
									<span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-blue-100">
										<svg
											className={`w-3 h-3 text-blue-900 transform transition-transform duration-300 ${
												isOpen ? "rotate-180" : ""
											}`}
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</span>
								</button>

								{isOpen && (
									<div className="absolute top-full right-0 bg-white rounded-lg shadow-xl text-black w-64 overflow-hidden animate-fadeIn z-50">
										{/* {sessions.map((session, idx) => (
											<button
												key={idx}
												onClick={() => handleSelect(session)}
												className={`block w-full text-left px-4 py-3 hover:bg-blue-50 transition ${
													selectedSession === session
														? "bg-blue-100 font-medium"
														: ""
												}`}
											>
												{session}
											</button>
										))} */}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="max-w-6xl w-full mx-auto">
					<div className="flex justify-center mb-8">
						<div className="relative w-24 h-24 flex items-center justify-center">
							<div
								className="absolute w-full h-full rounded-full"
								style={{ backgroundColor: "rgba(30, 181, 86, 0.2)" }}
							/>
							<div
								className="absolute w-16 h-16 rounded-full"
								style={{ backgroundColor: "rgba(30, 181, 86, 0.61)" }}
							/>
							<div
								className="absolute w-12 h-12 rounded-full"
								style={{ backgroundColor: "#1EB556" }}
							/>
							<div className="absolute w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
								<svg
									className="w-5 h-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="text-center mb-8">
						<Heading
                        heading="Registration Complete!"
                        headingClassName="text-primary"
                        />
						<p className="text-lg text-primary mb-4 font-semibold">
							User ID # {data.userId}
						</p>
						<p className=" text-black">
							A confirmation email has been sent to your registered email address
						</p>
					</div>

					<div className="bg-gray-100 rounded-2xl p-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-base w-full min-h-[400px]">
						<div className="flex flex-col h-full">
							<h2 className="text-2xl font-semibold text-primary mb-6">
								Summary
							</h2>
							<dl className="flex-1">
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-49">Course:</dt>
									<dd className="text-primary font-semibold">{data.courseName}</dd>
								</div>
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-49">Date:</dt>
									{/* <dd className="text-primary font-semibold">{selectedSession}</dd> */}
								</div>
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-49">Time:</dt>
									<dd className="text-primary font-semibold">{data.courseTime}</dd>
								</div>
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-49">Location:</dt>
									<dd className="text-primary font-semibold">{data.location}</dd>
								</div>
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-49">Participant:</dt>
									<dd className="text-primary font-semibold">{data.participantName}</dd>
								</div>
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-49">Attendance:</dt>
									<dd className="text-primary font-semibold">{data.attendance}</dd>
								</div>
							</dl>
						</div>

						<div className="flex flex-col h-full ml-29">
							<h2 className="text-2xl font-semibold text-primary mb-6">
								Payment Details
							</h2>
							<dl className="flex-1">
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-70">
										Payment Method:
									</dt>
									<dd className="text-primary font-semibold">{data.paymentMethod}</dd>
								</div>
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-70">
										Amount Paid:
									</dt>
									<dd className="text-primary font-semibold">
										$
										{displayAmountPaid.toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</dd>
								</div>
								<div className="flex mb-4">
									<dt className="text-black/80 font-medium w-70">
										Transaction Date:
									</dt>
									<dd className="text-primary font-semibold">{data.transactionDate}</dd>
								</div>
							</dl>

							<div className="mt-8 flex flex-col items-start space-y-4">
								<button
									type="button"
									onClick={handleAddToCalendar}
									className="inline-flex items-center justify-between gap-3 px-17 py-3 rounded-full bg-black text-white text-sm shadow-sm w-[260px] focus:outline-none focus:ring-1 focus:ring-secondary"
								    >
									<span className="flex items-center gap-2">
										<IconCalender className="w-4 h-4 stroke-blue-500" />
										<span>Add to calendar</span>
									</span>
								</button>
                                        
								<button
									type="button"
									onClick={handleDownloadReceipt}
									className="inline-flex items-center justify-between gap-3 px-17 py-3 rounded-full bg-white border border-gray-300 text-sm text-black shadow-sm w-[260px] focus:outline-none focus:ring-1 focus:ring-secondary"
								>
									<span className="flex items-center gap-2">
										<span>Download receipt</span>
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
