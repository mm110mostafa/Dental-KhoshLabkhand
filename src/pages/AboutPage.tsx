import React from "react";
import { PageHeader } from "../components/PageHeader";
import { AboutSection } from "../components/AboutSection";
import { ClinicTechSection } from "../components/ClinicTechSection";
import { FaqSection } from "../components/FaqSection";
import { TestimonialsSection } from "../components/TestimonialsSection";

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <>
      <PageHeader
        title="درباره کلینیک دُرسا"
        subtitle="۱۸ سال تجربه، بیش از ۱۱ هزار لبخند طراحی‌شده و گواهی رسمی آکادمی دندانپزشکی سوئیس"
        breadcrumb="درباره ما"
      />

      <AboutSection onOpenBooking={onOpenBooking} />

      <ClinicTechSection onOpenBooking={onOpenBooking} />

      <FaqSection />

      <TestimonialsSection />
    </>
  );
};
