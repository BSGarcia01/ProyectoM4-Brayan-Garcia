import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface TareaResumen {
  titulo: string;
  completada: boolean;
}

const escapar = (texto: string): string =>
  texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function correoDelToken(token: string): Promise<string | null> {
  const respuesta = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.VITE_FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
    }
  );
  if (!respuesta.ok) return null;

  const datos: unknown = await respuesta.json();
  if (typeof datos !== "object" || datos === null || !("users" in datos) || !Array.isArray(datos.users)) {
    return null;
  }
  const usuario: unknown = datos.users[0];
  if (typeof usuario === "object" && usuario !== null && "email" in usuario && typeof usuario.email === "string") {
    return usuario.email;
  }
  return null;
}

function leerTareas(cuerpo: unknown): TareaResumen[] {
  if (typeof cuerpo !== "object" || cuerpo === null || !("tareas" in cuerpo) || !Array.isArray(cuerpo.tareas)) {
    return [];
  }
  const resultado: TareaResumen[] = [];
  for (const item of cuerpo.tareas.slice(0, 100)) {
    if (typeof item === "object" && item !== null && "titulo" in item && "completada" in item) {
      resultado.push({
        titulo: String(item.titulo).slice(0, 200),
        completada: item.completada === true,
      });
    }
  }
  return resultado;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const destinatario = await correoDelToken(token);
    if (!destinatario) {
      return res.status(401).json({ error: "Sesión inválida" });
    }

    const tareas = leerTareas(req.body);
    const pendientes = tareas.filter((t) => !t.completada);
    const completadas = tareas.filter((t) => t.completada);

    const texto = [
      "Resumen de tus tareas",
      `Pendientes: ${pendientes.length}`,
      ...pendientes.map((t) => `- ${t.titulo}`),
      `Completadas: ${completadas.length}`,
      ...completadas.map((t) => `- ${t.titulo}`),
    ].join("\n");

    const html = `
      <h2>Resumen de tus tareas</h2>
      <h3>Pendientes (${pendientes.length})</h3>
      <ul>${pendientes.map((t) => `<li>${escapar(t.titulo)}</li>`).join("")}</ul>
      <h3>Completadas (${completadas.length})</h3>
      <ul>${completadas.map((t) => `<li>${escapar(t.titulo)}</li>`).join("")}</ul>`;

    const ses = new SESClient({
      region: process.env.SES_REGION,
      credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY ?? "",
      },
    });

    await ses.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [destinatario] },
        Message: {
          Subject: { Data: "Resumen de tus tareas", Charset: "UTF-8" },
          Body: {
            Text: { Data: texto, Charset: "UTF-8" },
            Html: { Data: html, Charset: "UTF-8" },
          },
        },
      })
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error enviando el resumen:", error);
    return res.status(500).json({ error: "No se pudo enviar el correo" });
  }
}