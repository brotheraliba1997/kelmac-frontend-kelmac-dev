"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Download,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  User,
  BookOpen,
  Eye,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Table from "@/components/table/index";
import { Course } from "@/types/course";

interface StudentInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ResultData {
  id: string;
  studentId: StudentInfo;
  courseId: Course;
  sessionId: string;
  status: "PASS" | "FAIL" | "PENDING";
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  attendancePercentage: number;
  isApproved: boolean;
  approvedBy: string | null;
  approvedAt: string;
  certificateIssued: boolean;
  certificateUrl: string | null;
  notes: string;
  determinedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ResultsResponse {
  data: ResultData[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedResult, setSelectedResult] = useState<ResultData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const auth = useSelector((state: any) => state?.auth);

  useEffect(() => {
    if (auth?.user?.id) {
      fetchResults();
    }
  }, [auth?.user?.id, page, pageSize]);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<ResultsResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/get-results-by-student/${auth.user.id}`,
        {
          params: { page, limit: pageSize },
          headers: {
            Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
          },
        }
      );

      setResults(response?.data?.data);
    } catch (error: any) {
      console.error("Failed to fetch results:", error);
      toast.error(error.response?.data?.message || "Failed to load results");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResult = (result: ResultData) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
  };

  const handleDownloadCertificate = async (certificateUrl: string) => {
    try {
      // Fetch the PDF file from the public folder
      const response = await fetch("/certificate.pdf");
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to download the PDF
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate_${selectedResult?.studentId.firstName}_${selectedResult?.studentId.lastName}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Certificate downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download certificate");
    }
  };

  //   const generatePdfCertificate = async () => {
  //     if (!selectedResult) return;

  //     setIsGeneratingPdf(true);
  //     try {
  //       // Format dates
  //       const startDate = new Date(selectedResult.createdAt).toLocaleDateString(
  //         "en-US",
  //         {
  //           day: "numeric",
  //           month: "short",
  //           year: "numeric",
  //         }
  //       );
  //       const completionDate = new Date(
  //         selectedResult.determinedAt
  //       ).toLocaleDateString("en-US", {
  //         day: "numeric",
  //         month: "short",
  //         year: "numeric",
  //       });

  //       // Create a temporary certificate element with simplified design
  //       const tempDiv = document.createElement("div");
  //       tempDiv.style.position = "fixed";
  //       tempDiv.style.left = "-9999px";
  //       tempDiv.style.top = "-9999px";
  //       tempDiv.style.width = "1123px";
  //       tempDiv.style.height = "794px";
  //       tempDiv.style.backgroundColor = "white";

  //       const studentName = `${selectedResult.studentId.firstName} ${selectedResult.studentId.lastName}`;
  //       const courseTitle = selectedResult.courseId.title || "Course";
  //       const courseModuleNo = selectedResult.courseId.id || "1981";
  //       const certificateNo = selectedResult.id.substring(0, 13).toUpperCase();

  //       tempDiv.innerHTML = `
  //         <div style="width: 100%; height: 100%; background: white; position: relative; font-family: Arial, sans-serif;">
  //           <!-- Left Section -->
  //           <div style="position: absolute; left: 0; top: 0; width: 70%; height: 100%; padding: 50px; background: white;">

  //             <!-- Logo -->
  //             <div style="margin-bottom: 40px;">
  //               <div style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 5px;">
  //                 KELMAC GROUP<sup style="font-size: 12px;">®</sup> <span style="color: #e91e63;">ACADEMY</span>
  //               </div>
  //               <div style="font-size: 9px; color: #999;">
  //                 BUILDING <span style="color: #4caf50; font-weight: 600;">SUSTAINABLE</span> COMPETITIVENESS
  //               </div>
  //             </div>

  //             <!-- Content -->
  //             <div style="margin-top: 60px;">
  //               <p style="font-size: 12px; color: #666; margin: 0;">
  //                 Kelmac Group<sup>®</sup> hereby certifies the
  //               </p>

  //               <div style="font-size: 18px; font-style: italic; color: #333; margin: 20px 0; line-height: 1.4;">
  //                 ${courseTitle}
  //               </div>

  //               <p style="font-size: 12px; color: #666; margin: 15px 0;">
  //                 has been attended & the required assessment was<br/>successfully completed by
  //               </p>
  //             </div>

  //             <!-- Student Name -->
  //             <div style="font-size: 40px; font-style: italic; color: #333; margin: 30px 0;">
  //               ${studentName}
  //             </div>

  //             <!-- Details -->
  //             <div style="margin-top: 35px; font-size: 11px; color: #666;">
  //               <div style="margin-bottom: 8px;">
  //                 <span style="color: #333; font-weight: 600;">Course/Module No.</span> ${courseModuleNo}
  //               </div>
  //               <div style="margin-bottom: 8px;">
  //                 <span style="color: #333; font-weight: 600;">Certified by</span> CQI and IRCA
  //               </div>
  //             </div>

  //             <!-- Table -->
  //             <div style="margin-top: 30px; font-size: 11px;">
  //               <div style="display: flex; padding: 6px 0;">
  //                 <div style="width: 200px; color: #666;">Held at</div>
  //                 <div style="color: #333; font-weight: 500;">Virtual, United States</div>
  //               </div>
  //               <div style="display: flex; padding: 6px 0;">
  //                 <div style="width: 200px; color: #666;">Course Start Date</div>
  //                 <div style="color: #333; font-weight: 500;">${startDate}</div>
  //               </div>
  //               <div style="display: flex; padding: 6px 0;">
  //                 <div style="width: 200px; color: #666;">Course Completion Date</div>
  //                 <div style="color: #333; font-weight: 500;">${completionDate}</div>
  //               </div>
  //               <div style="display: flex; padding: 6px 0;">
  //                 <div style="width: 200px; color: #666;">Total Training Hours</div>
  //                 <div style="color: #333; font-weight: 500;">40</div>
  //               </div>
  //               <div style="display: flex; padding: 6px 0;">
  //                 <div style="width: 200px; color: #666;">Certificate No.</div>
  //                 <div style="color: #333; font-weight: 500;">${certificateNo}</div>
  //               </div>
  //               <div style="display: flex; padding: 6px 0;">
  //                 <div style="width: 200px; color: #666;">CQI Unique Delegate Number</div>
  //                 <div style="color: #333; font-weight: 500;">639950</div>
  //               </div>
  //               <div style="display: flex; padding: 6px 0;">
  //                 <div style="width: 200px; color: #666;">CEU Point</div>
  //                 <div style="color: #333; font-weight: 500;">10</div>
  //               </div>
  //             </div>

  //             <!-- Signature -->
  //             <div style="margin-top: 45px;">
  //               <div style="font-family: cursive; font-size: 30px; color: #333;">Gerard Kelly</div>
  //               <div style="font-size: 9px; color: #999; margin-left: 100px; margin-top: 5px;">Director</div>
  //             </div>

  //             <!-- Logos -->
  //             <div style="position: absolute; bottom: 80px; left: 50px; display: flex; gap: 20px;">
  //               <div style="font-size: 12px; font-weight: 600; color: #333;">CQI</div>
  //               <div style="font-size: 12px; font-weight: 600; color: #333;">IRCA</div>
  //               <div style="font-size: 12px; font-weight: 600; color: #333;">FSSC 22000</div>
  //             </div>

  //             <!-- Footer -->
  //             <div style="position: absolute; bottom: 30px; left: 50px; right: 30%; font-size: 8px; color: #e91e63; line-height: 1.6;">
  //               <div>• For Auditor Registration purposes this certificate is valid for five years from the course completion date</div>
  //               <div>• To check the validity of this training certificate go to https://www.kelmacsinternational.com/check-my-certificate</div>
  //             </div>
  //           </div>

  //           <!-- Right Section (Red) -->
  //           <div style="position: absolute; right: 0; top: 0; width: 30%; height: 100%; background: linear-gradient(135deg, #e91e63 0%, #f44336 100%);">
  //             <div style="position: absolute; top: 60px; right: 70px; text-align: right; color: white;">
  //               <div style="font-size: 34px; font-weight: bold; letter-spacing: 1px; margin-bottom: 5px;">CERTIFICATE</div>
  //               <div style="font-size: 11px; letter-spacing: 2px;">OF ACHIEVEMENT</div>
  //             </div>
  //           </div>
  //         </div>
  //       `;

  //       document.body.appendChild(tempDiv);

  //       // Wait a bit for rendering
  //       await new Promise((resolve) => setTimeout(resolve, 100));

  //       const canvas = await html2canvas(tempDiv, {
  //         scale: 2,
  //         useCORS: true,
  //         logging: false,
  //         backgroundColor: "#ffffff",
  //       });

  //       const pdf = new jsPDF({
  //         orientation: "landscape",
  //         unit: "mm",
  //         format: "a4",
  //       });

  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();

  //       const imgData = canvas.toDataURL("image/png");
  //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //       const fileName = studentName.replace(/\s+/g, "_");
  //       pdf.save(`Certificate_${fileName}.pdf`);

  //       document.body.removeChild(tempDiv);
  //       toast.success("Certificate PDF downloaded successfully!");
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //       toast.error("Failed to generate certificate PDF");
  //     } finally {
  //       setIsGeneratingPdf(false);
  //     }
  //   };

  const getStatusBadge = (status: string) => {
    const styles = {
      PASS: "bg-green-100 text-green-700 border-green-200",
      FAIL: "bg-red-100 text-red-700 border-red-200",
      PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    return styles[status as keyof typeof styles] || styles.PENDING;
  };

  const getStatusIcon = (status: string) => {
    if (status === "PASS")
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === "FAIL") return <XCircle className="w-5 h-5 text-red-600" />;
    return <FileText className="w-5 h-5 text-yellow-600" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      displayName: "Course title",
      displayField: (e: ResultData) => (
        <div className="font-medium text-gray-900">{e.courseId.title}</div>
      ),
      searchable: true,
    },
    {
      displayName: "Student",
      displayField: (e: ResultData) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">
            {e.studentId.firstName} {e.studentId.lastName}
          </span>
        </div>
      ),
      searchable: true,
    },
    {
      displayName: "Status",
      displayField: (e: ResultData) => {
        const statusStyles = {
          PASS: "bg-green-100 text-green-700 border-green-200",
          FAIL: "bg-red-100 text-red-700 border-red-200",
          PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };
        return (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
              statusStyles[e.status as keyof typeof statusStyles] ||
              statusStyles.PENDING
            }`}
          >
            {e.status}
          </span>
        );
      },
      searchable: true,
    },
    {
      displayName: "Attendance",
      displayField: (e: ResultData) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
            <div
              className={`h-2 rounded-full ${
                e.attendancePercentage >= 75
                  ? "bg-green-500"
                  : e.attendancePercentage >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${e.attendancePercentage}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {e.attendancePercentage}%
          </span>
        </div>
      ),
      searchable: false,
    },
    {
      displayName: "Present/Total",
      displayField: (e: ResultData) => (
        <span className="text-sm text-gray-700">
          {e.presentCount}/{e.totalClasses}
        </span>
      ),
      searchable: false,
    },
    {
      displayName: "Certificate",
      displayField: (e: ResultData) => (
        <div>
          {e.certificateIssued ? (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
              <CheckCircle className="w-3 h-3" />
              Issued
            </span>
          ) : (
            <span className="text-xs text-gray-400">Not Issued</span>
          )}
        </div>
      ),
      searchable: false,
    },
    {
      displayName: "Actions",
      displayField: (e: ResultData) => (
        <button
          onClick={() => handleViewResult(e)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      ),
      searchable: false,
    },
  ];

  const totalPages = Math.ceil(results.length / pageSize);
  const totalEntries = results.length;

  return (
    <>
      <div className="min-h-[730px] p-4 bg-gray-100 w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-4">
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-md shadow-md">
              <h4 className="text-lg font-semibold">My Results</h4>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" />
                <span>{results.length} Results</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-md overflow-hidden">
            <Table
              title="Course Results"
              columns={columns}
              dataSource={results.length > 0 ? results : []}
              isLoading={isLoading}
              totalPages={totalPages}
              totalEntries={totalEntries}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      </div>

      {/* Result Detail Modal */}
      {isModalOpen && selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                {getStatusIcon(selectedResult.status)}
                <h2 className="text-2xl font-bold text-gray-900">
                  Result Details
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Course Title: {selectedResult.courseId.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>
                      {selectedResult.studentId.firstName}{" "}
                      {selectedResult.studentId.lastName}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(
                      selectedResult.status
                    )}`}
                  >
                    {selectedResult.status}
                  </span>
                  {selectedResult.isApproved && (
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Approved
                    </span>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1 font-medium">
                    Total Classes
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {selectedResult.totalClasses}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-green-700 mb-1 font-medium">
                    Present
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {selectedResult.presentCount}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <p className="text-xs text-red-700 mb-1 font-medium">
                    Absent
                  </p>
                  <p className="text-3xl font-bold text-red-700">
                    {selectedResult.absentCount}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-700 mb-1 font-medium">
                    Attendance
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {selectedResult.attendancePercentage}%
                  </p>
                </div>
              </div>

              {/* Timeline Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
                {selectedResult.determinedAt && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Result Determined:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedResult.determinedAt)}
                    </span>
                  </div>
                )}
                {selectedResult.approvedAt && (
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Approved On:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selectedResult.approvedAt)}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(selectedResult.createdAt)}
                  </span>
                </div>
              </div>

              {/* Notes Section */}
              {selectedResult.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Notes
                  </h4>
                  <p className="text-sm text-blue-900">
                    {selectedResult.notes}
                  </p>
                </div>
              )}

              {/* Certificate Section */}
              {selectedResult.certificateIssued &&
                selectedResult.certificateUrl && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-full">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-900">
                            Certificate Available
                          </h4>
                          <p className="text-sm text-green-700">
                            Your certificate is ready to download
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleDownloadCertificate(
                            selectedResult.certificateUrl!
                          )
                        }
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between rounded-b-2xl">
              {/* <button
                onClick={generatePdfCertificate}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPdf ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Generate Certificate PDF
                  </>
                )}
              </button> */}
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
