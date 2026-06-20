'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Step1Personal from '@/components/Step1Personal';
import Step2Activities from '@/components/Step2Activities';
import Step3Talents from '@/components/Step3Talents';
import SuccessScreen from '@/components/SuccessScreen';
import FinalNote from '@/components/FinalNote';
import { CheckCircle, BookOpen, Activity, Star } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const SIDE_IMAGE = 'https://images.unsplash.com/photo-1622470190232-81df3782484b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200';

const STEPS = [
  { id: 1, title: 'المعلومات الشخصية', icon: BookOpen },
  { id: 2, title: 'الأنشطة والخبرات', icon: Activity },
  { id: 3, title: 'المهارات والمواهب', icon: Star },
];

const INITIAL_DATA = {
  full_name: '', dob: '', student_mobile: '', student_email: '',
  guardian_name: '', guardian_mobile: '', siblings_count: '', birth_order: '',
  education_type: '', academic_year: '', school_university: '', notes: '',
  quran_memorized: '', quran_plan: false, quran_teacher: false, tajweed_level: '',
  favorite_sport: '', sports_club: '', championships_toggle: false, championships_details: '',
  freelance_toggle: false, volunteer_toggle: false, volunteer_details: '',
  training_toggle: false, training_details: '', career_future_plan: '',
  english_level: '', english_certs_toggle: false, english_certs_score: '',
  smart_device_level: '', core_skills_text: '', talents_selected: [],
};

const stepVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

export default function FormPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('.form-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validate = (stepNum) => {
    const e = {};
    if (stepNum === 1) {
      if (!formData.full_name?.trim()) e.full_name = 'الاسم الكامل مطلوب';
      if (!formData.student_mobile?.trim()) e.student_mobile = 'رقم الجوال مطلوب';
      if (!formData.student_email?.trim()) e.student_email = 'البريد الإلكتروني مطلوب';
      if (!formData.guardian_name?.trim()) e.guardian_name = 'اسم ولي الأمر مطلوب';
      if (!formData.guardian_mobile?.trim()) e.guardian_mobile = 'رقم جوال ولي الأمر مطلوب';
      if (!formData.education_type) e.education_type = 'نوع التعليم مطلوب';
      if (!formData.academic_year) e.academic_year = 'الصف مطلوب';
      if (!formData.school_university?.trim()) e.school_university = 'اسم المدرسة / الجامعة مطلوب';
    }
    if (stepNum === 2) {
      if (!formData.quran_memorized) e.quran_memorized = 'يرجى تحديد مقدار الحفظ';
      if (!formData.tajweed_level) e.tajweed_level = 'يرجى تحديد مستوى التجويد';
      if (!formData.career_future_plan?.trim()) e.career_future_plan = 'هذا الحقل مطلوب';
    }
    if (stepNum === 3) {
      if (!formData.english_level) e.english_level = 'مستوى اللغة الإنجليزية مطلوب';
      if (!formData.smart_device_level) e.smart_device_level = 'هذا الحقل مطلوب';
      if (!formData.core_skills_text?.trim()) e.core_skills_text = 'هذا الحقل مطلوب';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validate(step)) {
      setStep(s => s + 1);
      scrollToTop();
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep(s => s - 1);
    scrollToTop();
  };

  const handleSubmit = async () => {
    if (!validate(3)) return;
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        siblings_count: parseInt(formData.siblings_count) || 0,
        birth_order: parseInt(formData.birth_order) || 1,
      };
      const res = await axios.post(`${API}/students`, payload);
      setSubmissionId(res.data.id);
      setSubmitted(true);
      scrollToTop();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen formData={formData} submissionId={submissionId} />;
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row" dir="rtl">
      {/* Form Side */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A422D] text-white px-6 py-4 no-print shrink-0">
          <div className="max-w-xl mx-auto">
            <h1 className="text-xl font-bold font-cairo tracking-tight">استمارة تعريف طالب متميز</h1>
            <p className="text-green-200 text-xs mt-0.5">يرجى ملء جميع الحقول المطلوبة بدقة</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white border-b border-[#E5E1DA] px-6 py-3 no-print shrink-0">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-0">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isComplete = step > s.id;
                const isActive = step === s.id;
                return (
                  <React.Fragment key={s.id}>
                    <div className="flex items-center gap-1.5" data-testid={`step-indicator-${s.id}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                        ${isComplete ? 'bg-[#0A422D] text-white' : isActive ? 'bg-[#B89B72] text-white' : 'bg-[#EFECE6] text-[#6B7068]'}`}>
                        {isComplete ? <CheckCircle size={15} /> : <Icon size={13} />}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block transition-colors
                        ${isActive ? 'text-[#0A422D] font-semibold' : isComplete ? 'text-[#0A422D]' : 'text-[#6B7068]'}`}>
                        {s.title}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${step > s.id ? 'bg-[#0A422D]' : 'bg-[#E5E1DA]'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="mt-2 h-0.5 bg-[#EFECE6] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#B89B72] rounded-full"
                animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto form-scroll-area">
          <div className="max-w-[720px] mx-auto px-5 py-3">
            <AnimatePresence mode="wait">
              <motion.div key={step} variants={stepVariants} initial="initial" animate="animate" exit="exit">
                {step === 1 && <Step1Personal data={formData} onChange={handleChange} errors={errors} />}
                {step === 2 && <Step2Activities data={formData} onChange={handleChange} errors={errors} />}
                {step === 3 && (
                  <>
                    <Step3Talents data={formData} onChange={handleChange} errors={errors} />
                    <FinalNote formData={formData} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E1DA] no-print">
              <button
                onClick={prevStep}
                disabled={step === 1}
                data-testid="prev-step-button"
                className="px-5 py-2 rounded-md border border-[#E5E1DA] text-[#6B7068] font-medium text-sm
                  hover:bg-[#EFECE6] hover:text-[#1A1D1A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                السابق
              </button>
              <span className="text-xs text-[#6B7068]">الخطوة {step} من {STEPS.length}</span>
              {step < 3 ? (
                <button onClick={nextStep} data-testid="next-step-button"
                  className="px-5 py-2 rounded-md bg-[#0A422D] text-white font-medium text-sm hover:bg-[#0E5C3F] transition-all shadow-sm">
                  التالي
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={submitting} data-testid="submit-form-button"
                  className="px-6 py-2 rounded-md bg-[#B89B72] text-white font-semibold text-sm hover:bg-[#a08560] transition-all shadow-sm disabled:opacity-60 flex items-center gap-2">
                  {submitting ? <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />جاري الإرسال...</> : 'إرسال الاستمارة'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block w-[380px] xl:w-[420px] shrink-0 relative side-panel no-print">
        <img src={SIDE_IMAGE} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A422D]/90 via-[#0A422D]/20 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-8 text-white">
          <div className="w-8 h-0.5 bg-[#B89B72] mb-4" />
          <h2 className="text-2xl font-bold font-cairo leading-snug mb-2">نحو مستقبل<br />أكاديمي متميز</h2>
          <p className="text-green-100 text-sm leading-relaxed">استمارة شاملة لرصد القدرات والمواهب<br />وبناء الملف الشخصي للطالب المتميز</p>
        </div>
      </div>
    </div>
  );
}
