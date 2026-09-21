import React from "react";
import { PageHeader } from "../components/PageHeader";
import { ServicesSection } from "../components/ServicesSection";
import { SmileCalculator } from "../components/SmileCalculator";
import { ServiceItem } from "../data/dentistryData";

interface ServicesPageProps {
  onOpenBookingWithService: (serviceName: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
  onOpenBookingWithCalculation: (treatmentTitle: string, estimatedCost: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBookingWithService,
  onOpenServiceDetail,
  onOpenBookingWithCalculation
}) => {
  return (
    <>
      <PageHeader
        title="خدمات تخصصی کلینیک دُرسا"
        subtitle="از طراحی لبخند هالیوودی و لمینت سرامیکی تا ایمپلنت دیجیتال بدون جراحی — همه با تجهیزات روز دنیا"
        breadcrumb="خدمات تخصصی"
      />

      <ServicesSection
        onOpenBookingWithService={onOpenBookingWithService}
        onOpenDetailModal={onOpenServiceDetail}
      />

      <SmileCalculator onSelectBooking={onOpenBookingWithCalculation} />
    </>
  );
};
