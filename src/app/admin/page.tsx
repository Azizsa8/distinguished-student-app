import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  let stats = { total: 0, highPotential: 0, pending: 0 }
  let students: any[] = []

  try {
    const allStudents = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' }
    })
    students = allStudents
    stats.total = allStudents.length
    stats.highPotential = allStudents.filter(s => s.applicationStatus === 'HIGH_POTENTIAL').length
    stats.pending = allStudents.filter(s => s.applicationStatus === 'PENDING').length
  } catch (error) {
    console.error("Prisma error, likely schema not pushed yet:", error)
  }

  async function acceptStudent(formData: FormData) {
    "use server"
    const studentId = formData.get("studentId")?.toString()
    if (!studentId) return

    await prisma.student.update({
      where: { id: studentId },
      data: { applicationStatus: "ACCEPTED" }
    })

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl + "-accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "student_accepted", studentId })
      }).catch(console.error)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.10)] border border-[#DCDCDC]">
          <h3 className="text-[#5A6068] text-[16px] font-bold mb-2">إجمالي الطلبات</h3>
          <p className="text-[36px] font-bold text-[#111418] leading-[1.15]">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.10)] border border-[#DCDCDC]">
          <h3 className="text-[#5A6068] text-[16px] font-bold mb-2">طلبات واعدة</h3>
          <p className="text-[36px] font-bold text-[#0058A3] leading-[1.15]">{stats.highPotential}</p>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.10)] border border-[#DCDCDC]">
          <h3 className="text-[#5A6068] text-[16px] font-bold mb-2">قيد المراجعة</h3>
          <p className="text-[36px] font-bold text-[#B27300] leading-[1.15]">{stats.pending}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.10)] border border-[#DCDCDC] overflow-hidden">
        <div className="p-6 border-b border-[#DCDCDC]">
          <h2 className="text-[22px] font-bold text-[#111418]">قائمة الطلاب</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-[16px]">
            <thead className="bg-[#F5F5F5] text-[#111418] border-b border-[#DCDCDC]">
              <tr>
                <th className="p-4 font-bold">الاسم</th>
                <th className="p-4 font-bold">المدرسة</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold">تاريخ التقديم</th>
                <th className="p-4 font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#5A6068] font-bold">لا يوجد طلاب حتى الآن</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b border-[#EBEBEB] hover:bg-[#F5F5F5] transition-colors">
                    <td className="p-4 font-bold text-[#111418]">{student.firstName} {student.lastName}</td>
                    <td className="p-4 text-[#5A6068]">{student.school}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-sm text-sm font-bold ${
                        student.applicationStatus === 'PENDING' ? 'bg-[#FFDB00] text-[#111418]' :
                        student.applicationStatus === 'HIGH_POTENTIAL' ? 'bg-[#E5EEF6] text-[#0058A3]' :
                        student.applicationStatus === 'ACCEPTED' ? 'bg-[#0A8A3D] text-white' :
                        'bg-[#EBEBEB] text-[#111418]'
                      }`}>
                        {student.applicationStatus}
                      </span>
                    </td>
                    <td className="p-4 text-[#5A6068]">{new Date(student.createdAt).toLocaleDateString('ar-EG')}</td>
                    <td className="p-4 flex gap-3 items-center">
                      <form action={acceptStudent}>
                        <input type="hidden" name="studentId" value={student.id} />
                        <Button type="submit" size="sm" variant="default" className="h-10 text-[14px]">
                          قبول وإشعار
                        </Button>
                      </form>
                      {student.pdfUrl && (
                        <a href={student.pdfUrl} target="_blank" rel="noreferrer" className="text-[#0058A3] hover:text-[#004C8F] font-bold underline transition-colors">
                          عرض الملف
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
