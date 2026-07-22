import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SYSTEM_PROMPT = `Sos el asistente virtual de TTM Agencia, agencia de desarrollo web y automatizaciones con IA en Buenos Aires, Argentina.

Servicios que ofrece TTM Agencia:
- Landing pages
- Desarrollo web personalizado
- Desarrollo de sitios e-commerce
- Sitios web para inmobiliarias
- Automatizaciones con IA: soporte automatizado, cualificación automatizada, automatizaciones a medida, chatbots integrados, WhatsApp automatizado

Contacto:
- WhatsApp: https://wa.me/5491171410652
- Instagram: https://www.instagram.com/ttmagency.ok/
- Facebook: https://www.facebook.com/

Reglas de respuesta:
- Respondé SIEMPRE en español, corto y directo (2-4 líneas máximo). Nada de párrafos largos.
- Sos vendedor consultivo, no un formulario. Primero entendé el problema o necesidad del cliente charlando (qué busca, para qué tipo de negocio, qué le está costando). Hacé una pregunta genuina por vez, no interrogues.
- Cuando ya entendiste bien la necesidad, resumile en 1-2 líneas la solución/propuesta que armarías para él (simple, sin precios) y ofrecele mandársela a un asesor de TTM para que lo contacte con cotización y detalles. Esperá su confirmación.
- Si el cliente acepta, ahí pedile NOMBRE y NÚMERO DE TELÉFONO con código de país y área (uno por vez). Al pedir el teléfono aclarale con un ejemplo: "con prefijo de país y área, ej: +541134083140".
- Con los datos ya confirmados, NO le des el link de WhatsApp al cliente. En vez de eso confirmale que ya le pasaste todo (nombre, teléfono y propuesta) a un asesor de TTM que lo va a contactar, y agradecele el tiempo. No sigas preguntando nada más.
- Si el usuario pide hablar con una persona en cualquier momento y todavía no tenés sus datos, dale el link de WhatsApp (https://wa.me/5491171410652) de una, sin insistir con más preguntas.
- En el mismo mensaje donde confirmás que le pasaste los datos al asesor, agregá al FINAL, en una línea aparte, exactamente este tag (no lo menciones, es interno):
LEAD_DATA: {"nombre":"...","telefono":"...","propuesta":"..."}
(el campo "propuesta" es el resumen de 1-2 líneas de la solución que le armaste)`;

function extractLead(reply: string): { nombre: string; telefono: string; propuesta: string } | null {
  const match = reply.match(/LEAD_DATA:\s*(\{[\s\S]*\})/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function buildTranscript(messages: { role: string; content: string }[]): string {
  return messages
    .map((m) => `[${m.role === "user" ? "Cliente" : "Bot"}] ${m.content}`)
    .join("\n\n");
}

async function sendLeadEmail(
  lead: { nombre: string; telefono: string; propuesta: string },
  transcript: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: "Propuesta Recibida - TTM Landing",
    text: `Nombre: ${lead.nombre}\nTeléfono: ${lead.telefono}\nResumen de la propuesta: ${lead.propuesta}`,
    attachments: [
      {
        filename: `conversacion-${lead.nombre.replace(/\s+/g, "_")}.txt`,
        content: transcript,
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "messages inválido" }, { status: 400 });
    }

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("DeepSeek API error:", res.status, errText);
      return NextResponse.json({ error: "Error del asistente" }, { status: 502 });
    }

    const data = await res.json();
    const rawReply = data.choices?.[0]?.message?.content ?? "";

    const lead = extractLead(rawReply);
    const reply = rawReply.replace(/\s*LEAD_DATA:\s*\{[\s\S]*\}\s*$/, "").trim();

    if (lead) {
      try {
        const transcript = buildTranscript([...messages, { role: "assistant", content: reply }]);
        await sendLeadEmail(lead, transcript);
      } catch (err) {
        console.error("Lead email error:", err);
      }
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Error del asistente" }, { status: 500 });
  }
}
