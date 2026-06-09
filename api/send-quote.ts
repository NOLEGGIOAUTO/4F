import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req: any, res: any) {
  // Standard Express-like API response helpers on Vercel
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito. Usa POST." });
  }

  const { nome, email, telefono, veicolo, note } = req.body;

  if (!nome || !email || !telefono) {
    return res.status(400).json({ error: "Nome, Email e Telefono sono campi obbligatori." });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || "noleggioautoinroma@gmail.com";
  const emailSubject = `🚗 Nuovo Preventivo Veloce da ${nome}`;
  
  const textContent = `
    NUOVO PREVENTIVO VELOCE
    ---------------------------------------------
    Nome Cliente: ${nome}
    E-mail: ${email}
    Telefono: ${telefono}
    Veicolo Richiesto: ${veicolo || "Non specificato"}
    Note / Periodo:\n${note || "Nessuna nota aggiuntiva."}
    ---------------------------------------------
  `;

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 25px; color: #1c1c28; background-color: #f4f5f9; border-radius: 16px; max-width: 600px; margin: auto; border: 1px solid #e1e2e6; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 12px; margin-top: 0; font-size: 22px;">Richiesta Preventivo Noleggio</h2>
      <p style="font-size: 15px; line-height: 1.5; color: #4e4f5d;">Hai ricevuto una nuova richiesta di preventivo personalizzato compilata dal sito web <strong>Quattroeffe Autonoleggio</strong>:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
        <tr style="background-color: #fafbfc;">
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; font-weight: bold; width: 180px; color: #6e6f7d; font-size: 13px; text-transform: uppercase;">Nome Cliente:</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; color: #1c1c28; font-size: 15px;">${nome}</td>
        </tr>
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; font-weight: bold; color: #6e6f7d; font-size: 13px; text-transform: uppercase;">E-mail:</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; color: #1c1c28; font-size: 15px;"><a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a></td>
        </tr>
        <tr style="background-color: #fafbfc;">
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; font-weight: bold; color: #6e6f7d; font-size: 13px; text-transform: uppercase;">Telefono:</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; color: #1c1c28; font-size: 15px;"><a href="tel:${telefono}" style="color: #1c1c28; text-decoration: none;">${telefono}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; font-weight: bold; color: #6e6f7d; font-size: 13px; text-transform: uppercase;">Veicolo Richiesto:</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #f0f1f3; color: #d4af37; font-weight: bold; font-size: 15px;">${veicolo || "Non specificato"}</td>
        </tr>
        <tr style="background-color: #fafbfc;">
          <td style="padding: 12px 15px; font-weight: bold; color: #6e6f7d; font-size: 13px; text-transform: uppercase; vertical-align: top;">Note / Periodo:</td>
          <td style="padding: 12px 15px; color: #1c1c28; font-size: 15px; white-space: pre-wrap; line-height: 1.5;">${note || "Nessuna nota aggiuntiva."}</td>
        </tr>
      </table>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #fff9e6; border-left: 4px solid #d4af37; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px; color: #8a6d25; font-weight: bold;">Suggerimento per Risposta Rapida:</p>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #5c4a1b;">Puoi rispondere direttamente a questa email per metterti in contatto con il cliente all'indirizzo <strong>${email}</strong>.</p>
      </div>

      <p style="font-size: 11px; color: #8F90A6; margin-top: 30px; text-align: center; border-top: 1px solid #e1e2e6; padding-top: 15px;">Questo messaggio automatico è stato generato in totale sicurezza dal sito di Quattroeffe Autonoleggio Srl.</p>
    </div>
  `;

  try {
    let transporter;
    let usingDemo = false;

    // Check ifSMTP credentials exist
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      
      const createTransporter = (user: string) => {
        return nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: user,
            pass: smtpPass,
          },
        });
      };

      try {
        transporter = createTransporter(smtpUser);
        const info = await transporter.sendMail({
          from: smtpUser,
          to: receiverEmail,
          replyTo: email,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });
        return res.status(200).json({ 
          success: true, 
          message: "Richiesta ricevuta ed e-mail inviata con successo!",
          messageId: info.messageId,
          usingDemo: false
        });
      } catch (primaryErr: any) {
        console.warn(`[Email Warning] Vercel failed sending with primary user ${smtpUser}:`, primaryErr.message);
        
        // Try fallback with alternative user
        const fallbackUser = smtpUser === "noleggioautoinroma@gmail.com" ? "mybusinessds15@gmail.com" : "noleggioautoinroma@gmail.com";
        
        try {
          transporter = createTransporter(fallbackUser);
          const info = await transporter.sendMail({
            from: fallbackUser,
            to: receiverEmail,
            replyTo: email,
            subject: emailSubject,
            text: textContent,
            html: htmlContent,
          });
          return res.status(200).json({ 
            success: true, 
            message: "Richiesta ricevuta ed e-mail inviata con successo via backup!",
            messageId: info.messageId,
            usingDemo: false
          });
        } catch (fallbackErr: any) {
          console.error("[Email Error] Both Vercel primary and backup authentication failed:", fallbackErr.message);
          throw fallbackErr;
        }
      }
    } else {
      // Ethereal mock account for fallback
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      usingDemo = true;
    }

    const sender = process.env.SMTP_USER || `"Quattroeffe Preventivi" <preventivi@quattroeffe.com>`;

    const info = await transporter.sendMail({
      from: sender,
      to: receiverEmail,
      replyTo: email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    let previewUrl = "";
    if (usingDemo) {
      previewUrl = nodemailer.getTestMessageUrl(info) || "";
    }

    return res.status(200).json({ 
      success: true, 
      message: "Richiesta ricevuta ed e-mail inviata con successo!",
      messageId: info.messageId,
      previewUrl: previewUrl,
      usingDemo: usingDemo
    });
  } catch (error: any) {
    console.error("[Email Error] Failed on Vercel handler:", error);
    return res.status(500).json({ 
      error: "Errore durante l'invio dell'e-mail sul server.", 
      details: error.message 
    });
  }
}
