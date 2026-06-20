'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function generateFinalNote(formData) {
  const name = formData.full_name?.split(' ')[0] || 'الطالب';
  const talents = formData.talents_selected || [];
  const points = [];

  const quran = formData.quran_memorized || '';
  if (quran.includes('كاملاً')) {
    points.push('حفظك لكتاب الله كاملاً يضعك في مصاف القلة المتميزين');
  } else if (['25', '28', '29'].some(n => quran.includes(n))) {
    points.push('مسيرتك في حفظ القرآن الكريم تدل على إرادة وعزم نادرَين');
  }

  if (talents.length >= 6) {
    points.push(`امتلاكك لـ ${talents.length} موهبة متنوعة يجعلك إنساناً متكامل الأبعاد ومتعدد القدرات`);
  } else if (talents.length >= 3) {
    points.push(`مواهبك في ${talents.slice(0, 3).join(' و')} هبات تستحق الرعاية والتطوير`);
  } else if (talents.length > 0) {
    points.push(`موهبتك في ${talents[0]} ميزة تستحق الاهتمام والاستثمار`);
  }

  if (formData.english_level === 'ممتاز') {
    points.push('إجادتك للغة الإنجليزية بمستوى ممتاز يفتح أمامك أبواباً واسعة');
  }

  if (formData.volunteer_toggle && formData.training_toggle) {
    points.push('جمعك بين التطوع والتدريب يعكس شخصية متوازنة تعطي وتتعلم في آنٍ معاً');
  } else if (formData.volunteer_toggle) {
    points.push('مشاركتك في الأعمال التطوعية دليل على روح المسؤولية والعطاء');
  } else if (formData.training_toggle) {
    points.push('سعيك للتدريب والتطوير يدل على شخصية نامية لا تتوقف عن التعلم');
  }

  if (formData.career_future_plan && formData.career_future_plan.length > 80) {
    points.push('وضوح رؤيتك المستقبلية وتفصيلها يضعك خطوات أمام أقرانك');
  }

  if (points.length === 0) {
    return {
      student: `يا ${name}، كل خطوة تخطوها نحو تطوير نفسك هي استثمار في مستقبل مشرق. نحن نؤمن بقدراتك ونتطلع لمتابعة رحلة نموك المميزة.`,
      parent: 'أيها الوالد الكريم، تقديمكم لهذه الاستمارة خطوة واعية نحو بناء مستقبل متميز لابنكم. نحن هنا لدعم هذه الرحلة.',
    };
  }

  return {
    student: `يا ${name}، ${points.join('، و')}. مستقبل متميز ينتظرك — واصل الطموح والعطاء، فأنت تستحق الأفضل.`,
    parent: `أيها الوالد الكريم، ابنكم ${name} يمتلك مؤهلات ومواهب حقيقية تستحق الرعاية. هذه الاستمارة خطوة نحو إبراز قدراته وتنميتها بصورة منهجية. نحن معكم في هذه الرحلة.`,
  };
}

export default function FinalNote({ formData }) {
  const note = generateFinalNote(formData);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 rounded-xl overflow-hidden border border-[#B89B72]/40"
    >
      {/* Header */}
      <div className="bg-[#0A422D] px-5 py-3 flex items-center gap-2">
        <div className="w-1.5 h-5 bg-[#B89B72] rounded-full" />
        <h3 className="text-white font-semibold font-cairo text-sm">رسالة ختامية</h3>
      </div>

      {/* Student note */}
      <div className="bg-[#F9F8F6] px-5 py-4 border-b border-[#E5E1DA]">
        <p className="text-xs text-[#6B7068] font-medium mb-2 uppercase tracking-wider">للطالب</p>
        <p className="text-sm text-[#1A1D1A] leading-relaxed">{note.student}</p>
      </div>

      {/* Parent note */}
      <div className="bg-white px-5 py-4">
        <p className="text-xs text-[#6B7068] font-medium mb-2 uppercase tracking-wider">لولي الأمر</p>
        <p className="text-sm text-[#1A1D1A] leading-relaxed">{note.parent}</p>
      </div>
    </motion.div>
  );
}
