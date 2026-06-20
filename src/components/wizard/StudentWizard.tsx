'use client';
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"

const schema = z.object({
  firstName: z.string().min(2, "الاسم الأول مطلوب"),
  lastName: z.string().min(2, "الاسم الأخير مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف مطلوب"),
  dateOfBirth: z.string().min(1, "تاريخ الميلاد مطلوب"),
  school: z.string().min(2, "اسم المدرسة مطلوب"),
  gradeLevel: z.string().min(1, "المرحلة الدراسية مطلوبة"),
  talents: z.array(z.string()).min(1, "اختر موهبة واحدة على الأقل"),
  quranMemorization: z.string().optional(),
  sports: z.string().optional(),
  volunteering: z.string().optional(),
  careerPlans: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const talentsList = [
  "PROGRAMMING", "PUBLIC_SPEAKING", "MENTAL_MATH", 
  "WRITING", "ART_AND_DESIGN", "ROBOTICS", "OTHER"
]

const talentsAr: Record<string, string> = {
  "PROGRAMMING": "برمجة",
  "PUBLIC_SPEAKING": "إلقاء",
  "MENTAL_MATH": "حساب ذهني",
  "WRITING": "كتابة",
  "ART_AND_DESIGN": "فنون وتصميم",
  "ROBOTICS": "روبوتات",
  "OTHER": "أخرى"
}

export function StudentWizard() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      talents: []
    }
  })

  const watchTalents = watch("talents") || []

  const toggleTalent = (talent: string) => {
    if (watchTalents.includes(talent)) {
      setValue("talents", watchTalents.filter(t => t !== talent))
    } else {
      setValue("talents", [...watchTalents, talent])
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (res.ok) setSubmitted(true)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(s => Math.min(s + 1, 4))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-12 bg-white border border-[#DCDCDC] rounded-sm max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-[#0A8A3D] mb-4">تم استلام طلبك بنجاح!</h2>
        <p className="text-[#5A6068]">شكراً لتقديمك في نظام الطلاب المتميزين. سنقوم بمراجعة ملفك قريباً.</p>
        <Button className="mt-8" variant="default" onClick={() => window.location.reload()}>تقديم طلب جديد</Button>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-[#DCDCDC] rounded-sm min-h-[500px] flex flex-col shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
      <div className="bg-white p-6 border-b border-[#DCDCDC] flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#111418]">نموذج التقديم</h2>
          <p className="text-[#5A6068] text-sm mt-1 font-medium">الخطوة {step} من 4</p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-2 w-8 rounded-pill transition-colors duration-200 ${i <= step ? 'bg-[#0058A3]' : 'bg-[#EBEBEB]'}`} />
          ))}
        </div>
      </div>

      <div className="p-8 flex-1 relative overflow-hidden bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
                <h3 className="text-2xl font-bold text-[#111418]">المعلومات الشخصية</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[16px] mb-2 font-bold text-[#111418]">الاسم الأول</label>
                    <input {...register("firstName")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" />
                    {errors.firstName && <p className="text-[#C8102E] text-sm mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[16px] mb-2 font-bold text-[#111418]">الاسم الأخير</label>
                    <input {...register("lastName")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" />
                    {errors.lastName && <p className="text-[#C8102E] text-sm mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[16px] mb-2 font-bold text-[#111418]">البريد الإلكتروني</label>
                  <input type="email" {...register("email")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none text-left transition-colors" dir="ltr" />
                  {errors.email && <p className="text-[#C8102E] text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[16px] mb-2 font-bold text-[#111418]">رقم الهاتف</label>
                    <input {...register("phone")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none text-left transition-colors" dir="ltr" />
                    {errors.phone && <p className="text-[#C8102E] text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[16px] mb-2 font-bold text-[#111418]">تاريخ الميلاد</label>
                    <input type="date" {...register("dateOfBirth")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" />
                    {errors.dateOfBirth && <p className="text-[#C8102E] text-sm mt-1">{errors.dateOfBirth.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
                <h3 className="text-2xl font-bold text-[#111418]">الدراسة والمواهب</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[16px] mb-2 font-bold text-[#111418]">المدرسة</label>
                    <input {...register("school")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[16px] mb-2 font-bold text-[#111418]">المرحلة الدراسية</label>
                    <input {...register("gradeLevel")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <label className="block text-[16px] mb-3 font-bold text-[#111418]">اختر مواهبك (يمكنك اختيار أكثر من واحدة)</label>
                  <div className="flex flex-wrap gap-3">
                    {talentsList.map(t => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => toggleTalent(t)}
                        className={`px-5 py-3 rounded-sm text-base font-bold transition-colors border-2 ${
                          watchTalents.includes(t) ? 'bg-[#E5EEF6] text-[#0058A3] border-[#0058A3]' : 'bg-[#F5F5F5] text-[#111418] border-transparent hover:border-[#DCDCDC]'
                        }`}
                      >
                        {talentsAr[t]}
                      </button>
                    ))}
                  </div>
                  {errors.talents && <p className="text-[#C8102E] text-sm mt-2">{errors.talents.message}</p>}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
                <h3 className="text-2xl font-bold text-[#111418]">الأنشطة اللامنهجية</h3>
                <div>
                  <label className="block text-[16px] mb-2 font-bold text-[#111418]">حفظ القرآن الكريم</label>
                  <input {...register("quranMemorization")} placeholder="مثال: كامل، 15 جزء، إلخ" className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[16px] mb-2 font-bold text-[#111418]">الأنشطة الرياضية</label>
                  <textarea {...register("sports")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" rows={3} />
                </div>
                <div>
                  <label className="block text-[16px] mb-2 font-bold text-[#111418]">الأعمال التطوعية</label>
                  <textarea {...register("volunteering")} className="w-full border border-[#DCDCDC] rounded-sm p-3 bg-[#F5F5F5] focus:bg-white focus:border-[#0058A3] focus:ring-1 focus:ring-[#0058A3] outline-none transition-colors" rows={3} />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
                <h3 className="text-2xl font-bold text-[#111418]">المراجعة والإرسال</h3>
                <div className="bg-[#F5F5F5] p-6 rounded-sm space-y-4 border border-[#DCDCDC]">
                  <p className="text-[16px]"><strong className="text-[#111418]">الاسم:</strong> <span className="text-[#5A6068]">{watch("firstName")} {watch("lastName")}</span></p>
                  <p className="text-[16px]"><strong className="text-[#111418]">البريد:</strong> <span className="text-[#5A6068]">{watch("email")}</span></p>
                  <p className="text-[16px]"><strong className="text-[#111418]">المدرسة:</strong> <span className="text-[#5A6068]">{watch("school")} ({watch("gradeLevel")})</span></p>
                  <p className="text-[16px]"><strong className="text-[#111418]">المواهب:</strong> <span className="text-[#5A6068]">{watchTalents.map(t => talentsAr[t]).join("، ")}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      <div className="bg-white border-t border-[#DCDCDC] p-6 flex justify-between mt-auto items-center">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>رجوع</Button>
        ) : <div />}
        
        {step < 4 ? (
          <Button type="button" variant="default" onClick={nextStep}>التالي</Button>
        ) : (
          <Button type="button" variant="accent" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? 'جاري الإرسال...' : 'تأكيد وإرسال'}
          </Button>
        )}
      </div>
    </div>
  )
}
