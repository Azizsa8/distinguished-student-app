import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import DynamicComment, { getDynamicComment, getCareerComment } from '@/components/DynamicComment';

const QURAN_OPTIONS = [
  'لم أحفظ بعد', 'جزء عم (الجزء 30)', '3 أجزاء', '5 أجزاء', '10 أجزاء',
  '15 جزءاً', '20 جزءاً', '25 جزءاً', '28 جزءاً', '29 جزءاً', 'القرآن الكريم كاملاً (30 جزءاً)',
];
const TAJWEED_LEVELS = ['مبتدئ', 'متوسط', 'جيد', 'ممتاز'];

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
    <label className="text-sm font-medium text-[#1A1D1A] cursor-pointer">{label}</label>
    <Switch checked={value} onCheckedChange={(v) => onChange(field, v)} data-testid={testId} />
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-1 h-5 bg-[#B89B72] rounded-full" />
    <h3 className="font-semibold font-cairo text-[#0A422D] text-base">{title}</h3>
  </div>
);

export default function Step2Activities({ data, onChange, errors }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold font-cairo text-[#0A422D] mb-0.5">الأنشطة والخبرات</h2>
        <p className="text-xs text-[#6B7068]">معلومات عن الحفظ والرياضة والأنشطة المختلفة</p>
      </div>

      {/* القرآن الكريم */}
      <div className="bg-[#F9F8F6] rounded-xl p-4 border border-[#E5E1DA]">
        <SectionTitle title="القرآن الكريم" />
        <div className="space-y-4">
          <FieldGroup label="كم تحفظ من القرآن الكريم" required error={errors.quran_memorized}
            comment={getDynamicComment('quran_memorized', data.quran_memorized)}>
            <Select value={data.quran_memorized} onValueChange={(v) => onChange('quran_memorized', v)}>
              <SelectTrigger className={inputCls} data-testid="select-quran-memorized" dir="rtl">
                <SelectValue placeholder="اختر مقدار الحفظ" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {QURAN_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>

          <FieldGroup label="درجة إجادة أحكام التلاوة والتجويد" required error={errors.tajweed_level}
            comment={getDynamicComment('tajweed_level', data.tajweed_level)}>
            <Select value={data.tajweed_level} onValueChange={(v) => onChange('tajweed_level', v)}>
              <SelectTrigger className={inputCls} data-testid="select-tajweed-level" dir="rtl">
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {TAJWEED_LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>

          <ToggleRow label="هل لديك خطة لختم القرآن الكريم؟" field="quran_plan"
            value={data.quran_plan} onChange={onChange} testId="switch-quran-plan" />
          <ToggleRow label="هل تحفظ على يد محفظ متخصص؟" field="quran_teacher"
            value={data.quran_teacher} onChange={onChange} testId="switch-quran-teacher" />
        </div>
      </div>

      {/* الرياضة */}
      <div className="bg-[#F9F8F6] rounded-xl p-4 border border-[#E5E1DA]">
        <SectionTitle title="النشاط الرياضي" />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="الرياضة المفضلة" error={errors.favorite_sport}>
              <Input value={data.favorite_sport} onChange={(e) => onChange('favorite_sport', e.target.value)}
                placeholder="مثال: كرة القدم" className={inputCls} data-testid="input-favorite-sport" />
            </FieldGroup>
            <FieldGroup label="النادي الرياضي" error={errors.sports_club}>
              <Input value={data.sports_club} onChange={(e) => onChange('sports_club', e.target.value)}
                placeholder="اسم النادي" className={inputCls} data-testid="input-sports-club" />
            </FieldGroup>
          </div>
          <ToggleRow label="هل شاركت في بطولات رياضية سابقة؟" field="championships_toggle"
            value={data.championships_toggle} onChange={onChange} testId="switch-championships" />
          {data.championships_toggle && (
            <FieldGroup label="أذكر البطولات التي شاركت فيها" error={errors.championships_details}>
              <Textarea value={data.championships_details} onChange={(e) => onChange('championships_details', e.target.value)}
                placeholder="اذكر تفاصيل البطولات والإنجازات..." rows={3}
                className={inputCls} data-testid="input-championships-details" />
            </FieldGroup>
          )}
        </div>
      </div>

      {/* الخبرات */}
      <div className="bg-[#F9F8F6] rounded-xl p-4 border border-[#E5E1DA]">
        <SectionTitle title="الخبرات والأنشطة" />
        <div className="space-y-4">
          <ToggleRow label="هل سبق لك العمل الحر (كسب دخل مستقل)؟" field="freelance_toggle"
            value={data.freelance_toggle} onChange={onChange} testId="switch-freelance" />
          <ToggleRow label="هل شاركت في أعمال تطوعية؟" field="volunteer_toggle"
            value={data.volunteer_toggle} onChange={onChange} testId="switch-volunteer" />
          {data.volunteer_toggle && (
            <FieldGroup label="أذكر الأعمال التطوعية" error={errors.volunteer_details}>
              <Textarea value={data.volunteer_details} onChange={(e) => onChange('volunteer_details', e.target.value)}
                placeholder="اذكر الأعمال التطوعية ومكانها وتاريخها..." rows={3}
                className={inputCls} data-testid="input-volunteer-details" />
            </FieldGroup>
          )}
          <ToggleRow label="هل شاركت في دورات تدريبية؟" field="training_toggle"
            value={data.training_toggle} onChange={onChange} testId="switch-training" />
          {data.training_toggle && (
            <FieldGroup label="أذكر الدورات التدريبية" error={errors.training_details}>
              <Textarea value={data.training_details} onChange={(e) => onChange('training_details', e.target.value)}
                placeholder="اذكر اسم الدورة والجهة المانحة والتاريخ..." rows={3}
                className={inputCls} data-testid="input-training-details" />
            </FieldGroup>
          )}
        </div>
      </div>

      <FieldGroup label="المستقبل الوظيفي وخطتك له" required error={errors.career_future_plan}
        comment={getCareerComment(data.career_future_plan)}>
        <Textarea value={data.career_future_plan} onChange={(e) => onChange('career_future_plan', e.target.value)}
          placeholder="صف طموحك المهني وخطتك للوصول إليه..." rows={4}
          className={inputCls} data-testid="input-career-future-plan" />
      </FieldGroup>
    </div>
  );
}
