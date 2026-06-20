import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Archetype logic simplified based on python logic
    // Smartz python logic uses QURAN, TALENTS, etc.
    let score = 0;
    
    if (data.quran_memorized && data.quran_memorized !== 'لا أحفظ') score += 10;
    if (data.tajweed_level && data.tajweed_level !== 'لا أجيد التجويد') score += 5;
    if (data.championships_toggle) score += 5;
    if (data.volunteer_toggle) score += 5;
    if (data.training_toggle) score += 5;
    if (data.english_certs_toggle) score += 5;
    if (data.talents_selected && data.talents_selected.length > 0) score += data.talents_selected.length * 2;
    
    let archetype = "طالب مميز";
    let archetypeColor = "#B89B72";
    if (score > 30) { archetype = "قائد مبدع"; archetypeColor = "#0A422D"; }
    else if (score > 20) { archetype = "مبادر طموح"; archetypeColor = "#B89B72"; }

    const student = await prisma.student.create({
      data: {
        full_name: data.full_name,
        dob: data.dob || "",
        student_mobile: data.student_mobile,
        student_email: data.student_email,
        guardian_name: data.guardian_name,
        guardian_mobile: data.guardian_mobile,
        siblings_count: data.siblings_count || 0,
        birth_order: data.birth_order || 1,
        education_type: data.education_type,
        academic_year: data.academic_year,
        school_university: data.school_university,
        notes: data.notes,
        quran_memorized: data.quran_memorized || "",
        quran_plan: data.quran_plan || false,
        quran_teacher: data.quran_teacher || false,
        tajweed_level: data.tajweed_level || "",
        favorite_sport: data.favorite_sport,
        sports_club: data.sports_club,
        championships_toggle: data.championships_toggle || false,
        championships_details: data.championships_details,
        freelance_toggle: data.freelance_toggle || false,
        volunteer_toggle: data.volunteer_toggle || false,
        volunteer_details: data.volunteer_details,
        training_toggle: data.training_toggle || false,
        training_details: data.training_details,
        career_future_plan: data.career_future_plan || "",
        english_level: data.english_level || "",
        english_certs_toggle: data.english_certs_toggle || false,
        english_certs_score: data.english_certs_score,
        smart_device_level: data.smart_device_level || "",
        core_skills_text: data.core_skills_text || "",
        talents_selected: data.talents_selected || [],
        archetype: archetype,
        archetype_color: archetypeColor,
        archetype_score: score,
        archetype_description: "نمط الطالب المحسوب بناءً على المعطيات",
      }
    });

    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const students = await prisma.student.findMany({
      orderBy: { submitted_at: 'desc' }
    });
    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
