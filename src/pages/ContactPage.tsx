import React from "react";
import { PageHeader } from "../components/PageHeader";
import { ContactSection } from "../components/ContactSection";

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  return (
    <>
      <PageHeader
        title="تماس با کلینیک دُرسا"
        subtitle="سوالات خود را با ما در میان بگذارید؛ کارشناسان ما در کوتاه‌ترین زمان پاسخگو هستند"
        breadcrumb="تماس با ما"
      />

      <ContactSection onOpenBooking={onOpenBooking} />
    </>
  );
};
