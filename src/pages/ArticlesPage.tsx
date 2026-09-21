import React from "react";
import { PageHeader } from "../components/PageHeader";
import { ArticlesSection } from "../components/ArticlesSection";

export const ArticlesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="مقالات تخصصی و راهنمای درمان"
        subtitle="جدیدترین مطالب آموزشی درباره زیبایی لبخند، لمینت، ایمپلنت و مراقبت‌های دندانپزشکی"
        breadcrumb="مقالات تخصصی"
      />

      <ArticlesSection />
    </>
  );
};
