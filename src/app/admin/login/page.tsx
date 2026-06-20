'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.detail || 'بيانات الدخول غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#0A422D] rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={28} className="text-[#B89B72]" />
          </div>
          <h1 className="text-xl font-bold font-cairo text-[#0A422D]">لوحة الإدارة</h1>
          <p className="text-sm text-[#6B7068] mt-1">استمارة تعريف طالب متميز</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E1DA] p-6 shadow-sm">
          <h2 className="text-base font-semibold text-[#1A1D1A] mb-5">تسجيل الدخول</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1A1D1A]">اسم المستخدم</label>
              <input
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="admin"
                className="w-full border border-[#E5E1DA] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A422D] focus:border-[#0A422D] text-right"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1A1D1A]">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full border border-[#E5E1DA] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A422D] focus:border-[#0A422D] text-right pl-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7068]">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-[#0A422D] text-white rounded-md font-semibold text-sm hover:bg-[#0E5C3F] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />جاري الدخول...</> : 'دخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
