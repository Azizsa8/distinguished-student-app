'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const API = `/api`;

export default function AdminPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/students`)
      .then(res => setStudents(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-6" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-cairo text-[#0A422D]">لوحة الإدارة</h1>
            <p className="text-sm text-[#6B7068] mt-1">جميع الاستمارات المقدمة</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm text-[#0A422D] hover:underline">
              <ArrowRight size={16} />
              العودة للاستمارة
            </Link>
            <button
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                window.location.href = '/admin/login';
              }}
              className="text-sm text-red-600 hover:underline font-medium"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#E5E1DA] p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EFECE6] rounded-full flex items-center justify-center">
              <Users size={18} className="text-[#0A422D]" />
            </div>
            <div>
              <p className="text-2xl font-bold font-cairo text-[#0A422D]">{students.length}</p>
              <p className="text-xs text-[#6B7068]">إجمالي الطلاب</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#6B7068]">جاري التحميل...</div>
        ) : students.length === 0 ? (
          <div className="text-center py-12 text-[#6B7068]">لا توجد استمارات حتى الآن</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-[#E5E1DA] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F9F8F6] border-b border-[#E5E1DA]">
                  <tr>
                    <th className="px-4 py-3 text-right text-xs text-[#6B7068] font-semibold">#</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B7068] font-semibold">الاسم الكامل</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B7068] font-semibold">الصف</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B7068] font-semibold">نوع التعليم</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B7068] font-semibold">تاريخ التقديم</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B7068] font-semibold">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={s.id} className="border-b border-[#E5E1DA] hover:bg-[#F9F8F6] transition-colors">
                      <td className="px-4 py-3 text-[#6B7068]">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-[#1A1D1A]">{s.full_name}</td>
                      <td className="px-4 py-3 text-[#6B7068]">{s.academic_year}</td>
                      <td className="px-4 py-3 text-[#6B7068]">{s.education_type}</td>
                      <td className="px-4 py-3 text-[#6B7068] flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(s.submitted_at).toLocaleDateString('ar-SA')}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`/api/students/${s.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`download-pdf-${s.id}`}
                          className="text-xs text-[#0A422D] hover:underline font-medium"
                        >
                          تحميل
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
