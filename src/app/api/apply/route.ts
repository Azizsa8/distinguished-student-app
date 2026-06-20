import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TalentCategory } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Convert string talents to Prisma enums
    const talents = body.talents as TalentCategory[]
    
    const student = await prisma.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        dateOfBirth: new Date(body.dateOfBirth),
        school: body.school,
        gradeLevel: body.gradeLevel,
        talents: talents,
        extracurriculars: {
          create: {
            quranMemorization: body.quranMemorization,
            sports: body.sports,
            volunteering: body.volunteering,
            careerPlans: body.careerPlans
          }
        }
      }
    })

    // Asynchronously send webhook to n8n (fire and forget)
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: "student_application_created",
          studentId: student.id,
          data: body
        })
      }).catch(err => console.error("n8n webhook error:", err))
    }

    return NextResponse.json({ success: true, student })
  } catch (error) {
    console.error("Apply error:", error)
    return NextResponse.json({ success: false, error: "حدث خطأ أثناء معالجة طلبك" }, { status: 500 })
  }
}
