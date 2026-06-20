'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, RotateCcw, User, BookOpen, Star } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-[#0A422D] uppercase tracking-widest mb-3 pb-2 border-b border-[#E5E1DA]">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {children}
    </div>
  </div>
);

const DataRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-[#6B7068]">{label}</span>
    <span className="text-sm font-medium text-[#1A1D1A]">{value || '—'}</span>
  </div>
);

const BoolRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-xs text-[#6B7068]">{label}</span>
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${value ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
      {value ? 'نعم' : 'لا'}
    </span>
  </div>
);

export default function SuccessScreen({ formData, submissionId }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleDownloadPdf = () => {
    if (submissionId) {
      window.open(`${BACKEND_URL}/api/students/${submissionId}/pdf`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6]" dir="rtl">
      {/* Success Header */}
      <div className="bg-[#0A422D] text-white px-6 py-8 text-center no-print">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-16 h-16 bg-[#B89B72] rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle size={32} className="text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold font-cairo mb-2"
        >
          تم إرسال الاستمارة بنجاح!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-green-200 text-sm"
        >
          رقم الطلب: <span className="font-mono text-white">{submissionId?.slice(0, 8).toUpperCase()}</span>
        </motion.p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 py-4 bg-white border-b border-[#E5E1DA] no-print">
        <button
          onClick={handleDownloadPdf}
          data-testid="download-pdf-button"
          className="flex items-center gap-2 px-5 py-2 rounded-md bg-[#0A422D] text-white text-sm font-medium hover:bg-[#0E5C3F] transition-all shadow-sm"
        >
          <Download size={15} />
          تحميل PDF
        </button>
        <button
          onClick={handlePrint}
          data-testid="print-button"
          className="flex items-center gap-2 px-5 py-2 rounded-md border border-[#E5E1DA] text-[#1A1D1A] text-sm font-medium hover:bg-[#EFECE6] transition-all"
        >
          طباعة
        </button>
        <button
          onClick={handleRestart}
          data-testid="restart-button"
          className="flex items-center gap-2 px-5 py-2 rounded-md border border-[#E5E1DA] text-[#6B7068] text-sm hover:bg-[#EFECE6] transition-all"
        >
          <RotateCcw size={14} />
          استمارة جديدة
        </button>
      </div>

      {/* Student Data Preview */}
      <div ref={printRef} className="max-w-3xl mx-auto px-6 py-8 print-container">
        {/* Print Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-cairo text-[#0A422D]">استمارة تعريف طالب متميز</h1>
          <div className="w-16 h-0.5 bg-[#B89B72] mx-auto mt-2" />
          {submissionId && (
            <p className="text-xs text-[#6B7068] mt-2">رقم الطلب: {submissionId.slice(0, 8).toUpperCase()}</p>
          )}
        </div>

        {/* Section A: Personal */}
        <div className="bg-white rounded-xl border border-[#E5E1DA] p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-[#0A422D]" />
            <h2 className="font-bold font-cairo text-[#0A422D]">المعلومات الشخصية والأكاديمية</h2>
          </div>
          <Section title="">
            <DataRow label="الاسم الكامل" value={formData.full_name} />
            <DataRow label="تاريخ الميلاد" value={formData.dob} />
            <DataRow label="رقم الجوال" value={formData.student_mobile} />
            <DataRow label="البريد الإلكتروني" value={formData.student_email} />
            <DataRow label="اسم ولي الأمر" value={formData.guardian_name} />
            <DataRow label="رقم جوال ولي الأمر" value={formData.guardian_mobile} />
            <DataRow label="عدد الأخوة" value={formData.siblings_count} />
            <DataRow label="ترتيب الابن" value={formData.birth_order} />
            <DataRow label="نوع التعليم" value={formData.education_type} />
            <DataRow label="الصف الدراسي" value={formData.academic_year} />
            <DataRow label="المدرسة / الجامعة" value={formData.school_university} />
            {formData.notes && <DataRow label="ملاحظات" value={formData.notes} />}
          </Section>
        </div>

        {/* Section B: Activities */}
        <div className="bg-white rounded-xl border border-[#E5E1DA] p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-[#0A422D]" />
            <h2 className="font-bold font-cairo text-[#0A422D]">الأنشطة والخبرات</h2>
          </div>
          <Section title="القرآن الكريم">
            <DataRow label="مقدار الحفظ" value={formData.quran_memorized} />
            <DataRow label="مستوى التجويد" value={formData.tajweed_level} />
          </Section>
          <div className="space-y-1 mb-4">
            <BoolRow label="خطة لختم القرآن" value={formData.quran_plan} />
            <BoolRow label="الحفظ على يد محفظ" value={formData.quran_teacher} />
          </div>
          {formData.favorite_sport && <DataRow label="الرياضة المفضلة" value={formData.favorite_sport} />}
          {formData.sports_club && <DataRow label="النادي الرياضي" value={formData.sports_club} />}
          <div className="space-y-1 mt-3">
            <BoolRow label="مشاركة في بطولات" value={formData.championships_toggle} />
            {formData.championships_details && (
              <DataRow label="البطولات" value={formData.championships_details} />
            )}
            <BoolRow label="عمل حر" value={formData.freelance_toggle} />
            <BoolRow label="عمل تطوعي" value={formData.volunteer_toggle} />
            {formData.volunteer_details && <DataRow label="الأعمال التطوعية" value={formData.volunteer_details} />}
            <BoolRow label="دورات تدريبية" value={formData.training_toggle} />
            {formData.training_details && <DataRow label="الدورات التدريبية" value={formData.training_details} />}
          </div>
          {formData.career_future_plan && (
            <div className="mt-4">
              <span className="text-xs text-[#6B7068]">المستقبل الوظيفي</span>
              <p className="text-sm text-[#1A1D1A] mt-1 leading-relaxed">{formData.career_future_plan}</p>
            </div>
          )}
        </div>

        {/* Section C: Talents */}
        <div className="bg-white rounded-xl border border-[#E5E1DA] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-[#0A422D]" />
            <h2 className="font-bold font-cairo text-[#0A422D]">المهارات والمواهب</h2>
          </div>
          <Section title="">
            <DataRow label="مستوى اللغة الإنجليزية" value={formData.english_level} />
            <DataRow label="مستوى الأجهزة الذكية" value={formData.smart_device_level} />
          </Section>
          <BoolRow label="شهادة لغة إنجليزية" value={formData.english_certs_toggle} />
          {formData.english_certs_score && <DataRow label="الدرجة / النتيجة" value={formData.english_certs_score} />}
          {formData.core_skills_text && (
            <div className="mt-3">
              <span className="text-xs text-[#6B7068]">المهارات التي تتقنها</span>
              <p className="text-sm text-[#1A1D1A] mt-1">{formData.core_skills_text}</p>
            </div>
          )}
          {formData.talents_selected?.length > 0 && (
            <div className="mt-4">
              <span className="text-xs text-[#6B7068] mb-2 block">المواهب المختارة</span>
              <div className="flex flex-wrap gap-2">
                {formData.talents_selected.map(t => (
                  <span key={t} className="px-3 py-1 bg-[#0A422D] text-white text-xs rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
