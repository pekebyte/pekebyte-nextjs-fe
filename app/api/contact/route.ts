import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const TRANSLATIONS = {
  es: {
    from: 'Contacto Web <onboarding@resend.dev>',
    subject: (subject: string) => `Nuevo mensaje de contacto de Pekebyte Web: ${subject}`,
    missingFields: 'Todos los campos son requeridos',
    sendError: 'Error al enviar el correo',
    ok: 'Correo enviado exitosamente',
    headings: {
      title: 'Nuevo mensaje de contacto desde Pekebyte Web',
      name: 'Nombre',
      email: 'Email',
      subjectLabel: 'Asunto',
      message: 'Mensaje',
    },
    footer: 'Este mensaje fue enviado desde el formulario de contacto de tu sitio web.',
  },
  en: {
    from: 'Web Contact <onboarding@resend.dev>',
    subject: (subject: string) => `New contact message from Pekebyte Web: ${subject}`,
    missingFields: 'All fields are required',
    sendError: 'Error sending the email',
    ok: 'Email sent successfully',
    headings: {
      title: 'New contact message from Pekebyte Web',
      name: 'Name',
      email: 'Email',
      subjectLabel: 'Subject',
      message: 'Message',
    },
    footer: 'This message was sent from the contact form on your website.',
  },
} as const;

type Locale = 'en' | 'es';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, locale } = body;
    const t = TRANSLATIONS[locale === 'es' ? 'es' : 'en'];

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: t.missingFields },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: t.from,
      to: ['pedrom@pekebyte.com'],
      subject: t.subject(subject),
      replyTo: email,
      html: String.raw`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">${t.headings.title}</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>${t.headings.name}:</strong> ${name}</p>
            <p><strong>${t.headings.email}:</strong> ${email}</p>
            <p><strong>${t.headings.subjectLabel}:</strong> ${subject}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <p><strong>${t.headings.message}:</strong></p>
            <p style="line-height: 1.6;">${String(message).replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            ${t.footer}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: t.sendError },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: t.ok, id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: TRANSLATIONS.es.sendError },
      { status: 500 }
    );
  }
}