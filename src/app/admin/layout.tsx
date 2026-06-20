import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#F5F5F5] text-[#111418]" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-[#DCDCDC] flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.10)] z-10">
        <div className="p-6 text-[22px] font-bold border-b border-[#DCDCDC] text-[#111418]">
          لوحة الإدارة
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/admin" className="block p-3 bg-[#E5EEF6] text-[#0058A3] font-bold rounded-sm border-r-4 border-[#0058A3]">الرئيسية</a>
          <a href="/admin/students" className="block p-3 text-[#111418] hover:bg-[#F5F5F5] font-bold rounded-sm transition-colors">الطلاب</a>
          <a href="/admin/settings" className="block p-3 text-[#111418] hover:bg-[#F5F5F5] font-bold rounded-sm transition-colors">الإعدادات</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.10)] p-4 flex justify-between items-center z-0">
          <h1 className="text-[22px] font-bold text-[#111418]">نظام الطلاب المتميزين</h1>
          <div className="flex items-center gap-4">
            <span className="text-[16px] font-bold text-[#111418]">المدير</span>
            <div className="w-10 h-10 bg-[#FFDB00] text-[#111418] font-bold flex items-center justify-center rounded-pill">
              م
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-[#F5F5F5]">
          {children}
        </main>
      </div>
    </div>
  )
}
