'use client';

import React, { useState } from "react";
import HoverImageCard from "../HoverImageCard/HoverImageCard";
import CorporateAuditing from "@/app/modal/auditing/form1";
import CorporateAuditingModal from "@/app/modal/auditing/form2";
import CorporateConsulting from "@/app/modal/consulting/form1";
import CorporateConsultingModal from "@/app/modal/consulting/form2";
import CorporateTraining from "@/app/modal/training/form1";
import CorporateTrainingModal from "@/app/modal/training/form2";
import ScheduleMeeting from "@/app/modal/auditing/ScheduleMeeting";
import { IconX } from "@tabler/icons-react";

interface CorporateModalProps {
  onClose: () => void;
}

export default function CorporateModal({ onClose }: CorporateModalProps) {
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState<boolean>(false);

  const services = [
    { title: "Auditing", image: "/images/auditingform.png" },
    { title: "Consulting", image: "/images/consultingform.png" },
    { title: "Training", image: "/images/trainingform.png" },
  ];

  const handleServiceClick = (service: string) => {
    setCurrentService(service);
    setCurrentStep(1);
    setShowScheduleMeeting(false);
  };

  const handleBackToServices = () => {
    setCurrentService(null);
    setCurrentStep(1);
    setShowScheduleMeeting(false);
  };

  const handleCloseAll = () => {
    setCurrentService(null);
    setCurrentStep(1);
    setShowScheduleMeeting(false);
    onClose();
  };

  return (
    <>
      {!currentService && !showScheduleMeeting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden">
            <div className="bg-gray-100 p-6 flex items-center border-b border-gray-200 relative">
              <h1 className="flex-1 text-center text-3xl text-black font-hedvig">
                Please select one of our services
              </h1>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-colors bg-white"
                onClick={onClose}
              >
                <IconX className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleServiceClick(service.title)}
                  className="cursor-pointer"
                >
                  <HoverImageCard title={service.title} image={service.image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentService === "Auditing" && !showScheduleMeeting && (
        <>
          {currentStep === 1 && (
            <CorporateAuditing
              onNext={() => setCurrentStep(2)}
              onClose={handleBackToServices}
            />
          )}
          {currentStep === 2 && (
            <CorporateAuditingModal
              onBack={() => setCurrentStep(1)}
              onNext={() => setShowScheduleMeeting(true)}
            />
          )}
        </>
      )}

      {currentService === "Consulting" && !showScheduleMeeting && (
        <>
          {currentStep === 1 && (
            <CorporateConsulting
              onNext={() => setCurrentStep(2)}
              onClose={handleBackToServices}
            />
          )}
          {currentStep === 2 && (
            <CorporateConsultingModal
              onBack={() => setCurrentStep(1)}
              onNext={() => setShowScheduleMeeting(true)}
            />
          )}
        </>
      )}

      {currentService === "Training" && !showScheduleMeeting && (
        <>
          {currentStep === 1 && (
            <CorporateTraining
              onNext={() => setCurrentStep(2)}
              onClose={handleBackToServices}
            />
          )}
          {currentStep === 2 && (
            <CorporateTrainingModal
              onBack={() => setCurrentStep(1)}
              onNext={() => setShowScheduleMeeting(true)}
            />
          )}
        </>
      )}

      {showScheduleMeeting && (
        <ScheduleMeeting onClose={handleCloseAll} />
      )}
    </>
  );
}