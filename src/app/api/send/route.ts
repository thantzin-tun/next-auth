import { Resend } from "resend";
import { NextResponse, NextRequest } from "next/server";
import { EmailTemplate } from "@/components/email/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { email, token } = await request.json();
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verified Email!",
            react: EmailTemplate(email, token),
            text: "good",
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
