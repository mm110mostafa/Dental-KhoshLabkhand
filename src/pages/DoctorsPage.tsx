import React from "react";
import { PageHeader } from "../components/PageHeader";
import { DoctorsSection } from "../components/DoctorsSection";

interface DoctorsPageProps {
  onOpenBookingWithDoctor: (doctorName: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenBookingWithDoctor }) => {
  return (
    <>
      <PageHeader
        title="تیم پزشکان متخصص دُرسا"
        subtitle="متخصصان مجرب و بورد تخصصی در حوزه زیبایی، جراحی ایمپلنت و ارتودنسی، همراه شما تا لبخند ایده‌آل"
        breadcrumb="پزشکان متخصص"
      />

      <DoctorsSection onOpenBookingWithDoctor={onOpenBookingWithDoctor} />
    </>
  );
};
