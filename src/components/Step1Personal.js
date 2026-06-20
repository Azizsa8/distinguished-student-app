import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EDUCATION_TYPES = ['حكومي', 'خاص', 'منهج مصري', 'إنترناشونال'];
const ACADEMIC_YEARS = [
  'الصف الأول الابتدائي', 'الصف الثاني الابتدائي', 'الصف الثالث الابتدائي',
  'الصف الرابع الابتدائي', 'الصف الخامس الابتدائي', 'الصف السادس الابتدائي',
  'الصف الأول المتوسط', 'الصف الثاني المتوسط', 'الصف الثالث المتوسط',
  'الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي',
  'السنة الأولى جامعية', 'السنة الثانية جامعية', 'السنة الثالثة جامعية', 'السنة الرابعة جامعية',
];

const FieldGroup = ({ label, required, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-[#1A1D1A] flex items-center gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputCls = "border-[#E5E1DA] bg-white focus:ring-1 focus:ring-[#0A422D] focus:border-[#0A422D] text-right placeholder:text-[#A0A49A]";

export default function Step1Personal({ data, onChange, errors }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold font-cairo text-[#0A422D] mb-0.5">المعلومات الشخصية والأكاديمية</h2>
        <p className="text-xs text-[#6B7068]">يرجى تعبئة جميع البيانات الشخصية بدقة</p>
      </div>

      {/* الاسم الكامل */}
      <FieldGroup label="الاسم الكامل" required error={errors.full_name}>
        <Input
          value={data.full_name}
          onChange={(e) => onChange('full_name', e.target.value)}
          placeholder="أدخل الاسم الرباعي كاملاً"
          className={inputCls}
          data-testid="input-full-name"
        />
      </FieldGroup>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* تاريخ الميلاد */}
        <FieldGroup label="تاريخ الميلاد" error={errors.dob}>
          <Input
            type="date"
            value={data.dob}
            onChange={(e) => onChange('dob', e.target.value)}
            className={`${inputCls} text-left`}
            data-testid="input-dob"
          />
        </FieldGroup>

        {/* رقم الجوال */}
        <FieldGroup label="رقم الجوال" required error={errors.student_mobile}>
          <Input
            type="tel"
            value={data.student_mobile}
            onChange={(e) => onChange('student_mobile', e.target.value)}
            placeholder="+9665XXXXXXXX"
            className={inputCls}
            data-testid="input-student-mobile"
            dir="ltr"
          />
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* الإيميل */}
        <FieldGroup label="البريد الإلكتروني" required error={errors.student_email}>
          <Input
            type="email"
            value={data.student_email}
            onChange={(e) => onChange('student_email', e.target.value)}
            placeholder="example@email.com"
            className={inputCls}
            dir="ltr"
            data-testid="input-student-email"
          />
        </FieldGroup>

        {/* اسم ولي الأمر */}
        <FieldGroup label="اسم ولي الأمر" required error={errors.guardian_name}>
          <Input
            value={data.guardian_name}
            onChange={(e) => onChange('guardian_name', e.target.value)}
            placeholder="اسم ولي الأمر كاملاً"
            className={inputCls}
            data-testid="input-guardian-name"
          />
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* رقم جوال ولي الأمر */}
        <FieldGroup label="رقم جوال ولي الأمر" required error={errors.guardian_mobile}>
          <Input
            type="tel"
            value={data.guardian_mobile}
            onChange={(e) => onChange('guardian_mobile', e.target.value)}
            placeholder="+9665XXXXXXXX"
            className={inputCls}
            dir="ltr"
            data-testid="input-guardian-mobile"
          />
        </FieldGroup>

        {/* عدد الأخوة */}
        <FieldGroup label="عدد الأخوة" error={errors.siblings_count}>
          <Input
            type="number"
            min="0"
            value={data.siblings_count}
            onChange={(e) => onChange('siblings_count', e.target.value)}
            placeholder="0"
            className={inputCls}
            data-testid="input-siblings-count"
          />
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ترتيب الابن */}
        <FieldGroup label="ترتيب الابن بالنسبة للأبناء" error={errors.birth_order}>
          <Input
            type="number"
            min="1"
            value={data.birth_order}
            onChange={(e) => onChange('birth_order', e.target.value)}
            placeholder="1"
            className={inputCls}
            data-testid="input-birth-order"
          />
        </FieldGroup>

        {/* نوع التعليم */}
        <FieldGroup label="نوع التعليم" required error={errors.education_type}>
          <Select value={data.education_type} onValueChange={(v) => onChange('education_type', v)}>
            <SelectTrigger className={inputCls} data-testid="select-education-type" dir="rtl">
              <SelectValue placeholder="اختر نوع التعليم" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              {EDUCATION_TYPES.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* الصف */}
        <FieldGroup label="الصف الدراسي" required error={errors.academic_year}>
          <Select value={data.academic_year} onValueChange={(v) => onChange('academic_year', v)}>
            <SelectTrigger className={inputCls} data-testid="select-academic-year" dir="rtl">
              <SelectValue placeholder="اختر الصف" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              {ACADEMIC_YEARS.map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>

        {/* المدرسة */}
        <FieldGroup label="المدرسة / الجامعة" required error={errors.school_university}>
          <Input
            value={data.school_university}
            onChange={(e) => onChange('school_university', e.target.value)}
            placeholder="اسم المدرسة أو الجامعة"
            className={inputCls}
            data-testid="input-school-university"
          />
        </FieldGroup>
      </div>

      {/* ملاحظات */}
      <FieldGroup label="ملاحظات إضافية" error={errors.notes}>
        <Textarea
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="أي ملاحظات أو معلومات إضافية تريد إضافتها..."
          rows={3}
          className={inputCls}
          data-testid="input-notes"
        />
      </FieldGroup>
    </div>
  );
}
