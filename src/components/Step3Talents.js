'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import DynamicComment, { getDynamicComment } from '@/components/DynamicComment';

const LEVELS = ['مبتدئ', 'متوسط', 'جيد', 'ممتاز'];
const TALENTS = [
  'الرسم والتلوين', 'الخط العربي والزخرفة', 'الإنشاد', 'تلاوة القرآن',
  'الإلقاء والتقديم', 'الفك والتركيب', 'مساعدة الآخرين', 'الاختراعات',
  'التمثيل', 'التصوير', 'البرمجة', 'الشعر والحفظ',
  'الأشغال اليدوية', 'الحساب الذهني', 'الفضول', 'أخرى',
];

const inputCls = "border-[#E5E1DA] bg-white focus:ring-1 focus:ring-[#0A422D] focus:border-[#0A422D] text-right placeholder:text-[#A0A49A]";

const FieldGroup = ({ label, required, error, children, comment }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-[#1A1D1A] flex items-center gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs">{error}</p>}
    {comment && <DynamicComment message={comment} />}
  </div>
);

const ToggleRow = ({ label, field, value, onChange, testId }) => (
  <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-[#E5E1DA] hover:border-[#B89B72] transition-colors">
    <label className="text-sm font-medium text-[#1A1D1A]">{label}</label>
    <Switch checked={value} onCheckedChange={(v) => onChange(field, v)} data-testid={testId} />
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-1 h-5 bg-[#B89B72] rounded-full" />
    <h3 className="font-semibold font-cairo text-[#0A422D] text-base">{title}</h3>
  </div>
);

export default function Step3Talents({ data, onChange, errors }) {
  const toggleTalent = (talent) => {
    const current = data.talents_selected || [];
    const updated = current.includes(talent) ? current.filter(t => t !== talent) : [...current, talent];
    onChange('talents_selected', updated);
  };

  const talentComment = data.talents_selected?.length >= 5
    ? `اختيارك لـ ${data.talents_selected.length} مواهب متنوعة يدل على شخصية غنية ومتعددة القدرات.`
    : data.talents_selected?.length >= 3
    ? `مواهبك المتعددة تمنحك تنوعاً استثنائياً — هذا التميز يستحق التطوير.`
    : null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold font-cairo text-[#0A422D] mb-0.5">المهارات والمواهب</h2>
        <p className="text-xs text-[#6B7068]">أخبرنا عن مهاراتك اللغوية والتقنية ومواهبك الخاصة</p>
      </div>

      {/* اللغة الإنجليزية */}
      <div className="bg-[#F9F8F6] rounded-xl p-4 border border-[#E5E1DA]">
        <SectionTitle title="اللغة الإنجليزية" />
        <div className="space-y-4">
          <FieldGroup label="درجة إجادة اللغة الإنجليزية" required error={errors.english_level}
            comment={getDynamicComment('english_level', data.english_level)}>
            <Select value={data.english_level} onValueChange={(v) => onChange('english_level', v)}>
              <SelectTrigger className={inputCls} data-testid="select-english-level" dir="rtl">
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>
          <ToggleRow label="هل لديك شهادة لغة إنجليزية؟ (IELTS / TOEFL / STEP)"
            field="english_certs_toggle" value={data.english_certs_toggle}
            onChange={onChange} testId="switch-english-certs" />
          {data.english_certs_toggle && (
            <FieldGroup label="النتيجة / الدرجة" error={errors.english_certs_score}>
              <Input value={data.english_certs_score} onChange={(e) => onChange('english_certs_score', e.target.value)}
                placeholder="مثال: IELTS 7.0" className={inputCls} data-testid="input-english-certs-score" />
            </FieldGroup>
          )}
        </div>
      </div>

      {/* المهارات التقنية */}
      <div className="bg-[#F9F8F6] rounded-xl p-4 border border-[#E5E1DA]">
        <SectionTitle title="المهارات التقنية" />
        <div className="space-y-4">
          <FieldGroup label="مهارات التعامل مع الأجهزة الذكية والتقنية" required error={errors.smart_device_level}
            comment={getDynamicComment('smart_device_level', data.smart_device_level)}>
            <Select value={data.smart_device_level} onValueChange={(v) => onChange('smart_device_level', v)}>
              <SelectTrigger className={inputCls} data-testid="select-smart-device-level" dir="rtl">
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="المهارات التي تتقنها" required error={errors.core_skills_text}>
            <Textarea value={data.core_skills_text} onChange={(e) => onChange('core_skills_text', e.target.value)}
              placeholder="مثال: العمل الجماعي، القيادة، حل المشكلات، التفكير النقدي..."
              rows={3} className={inputCls} data-testid="input-core-skills" />
          </FieldGroup>
        </div>
      </div>

      {/* المواهب */}
      <div className="bg-[#F9F8F6] rounded-xl p-4 border border-[#E5E1DA]">
        <SectionTitle title="اختر مواهبك" />
        <p className="text-xs text-[#6B7068] mb-4">يمكنك اختيار أكثر من موهبة</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" data-testid="talents-grid">
          {TALENTS.map((talent) => {
            const selected = (data.talents_selected || []).includes(talent);
            return (
              <button key={talent} type="button" onClick={() => toggleTalent(talent)}
                data-testid={`talent-${talent}`}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium text-center transition-all duration-200 border
                  ${selected ? 'bg-[#0A422D] text-white border-[#0A422D] shadow-sm' : 'bg-white text-[#1A1D1A] border-[#E5E1DA] hover:border-[#B89B72] hover:bg-[#EFECE6]'}`}>
                {talent}
              </button>
            );
          })}
        </div>
        {talentComment && <DynamicComment message={talentComment} />}
      </div>
    </div>
  );
}
