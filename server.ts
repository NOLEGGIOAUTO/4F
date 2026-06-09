import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// API endpoint to receive and send the quote
app.post("/api/send-quote", async (req, res) => {
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

    // Check if the user specified their own custom SMTP config
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
        console.log(`[Email] Attempting to send using primary user: ${smtpUser}`);
        transporter = createTransporter(smtpUser);
        const info = await transporter.sendMail({
          from: smtpUser,
          to: receiverEmail,
          replyTo: email,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });
        console.log(`[Email] Message sent successfully via ${smtpUser}! MessageID: ${info.messageId}`);
        return res.status(200).json({ 
          success: true, 
          message: "Richiesta ricevuta ed e-mail inviata con successo!",
          messageId: info.messageId,
          usingDemo: false
        });
      } catch (primaryErr: any) {
        console.warn(`[Email Warning] Failed sending with primary user ${smtpUser}:`, primaryErr.message);
        
        // If primary failed, try fallback with alternative user
        const fallbackUser = smtpUser === "noleggioautoinroma@gmail.com" ? "mybusinessds15@gmail.com" : "noleggioautoinroma@gmail.com";
        console.log(`[Email] Attempting fallback with alternative user: ${fallbackUser}`);
        
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
          console.log(`[Email] Backup message sent successfully via ${fallbackUser}! MessageID: ${info.messageId}`);
          return res.status(200).json({ 
            success: true, 
            message: "Richiesta ricevuta ed e-mail inviata con successo!",
            messageId: info.messageId,
            usingDemo: false
          });
        } catch (fallbackErr: any) {
          console.error("[Email Error] Both primary and fallback authentication failed:", fallbackErr.message);
          throw fallbackErr; // Let the outer catch handle it
        }
      }
    } else {
      // Create a test account on-the-fly for demo context when developer credentials aren't provided
      console.log("[Email] No custom SMTP details found in environment variables. Creating test Ethereal transporter...");
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

    // Send the email to the direct destination
    const recipients = receiverEmail;
    
    // Sender configuration
    const sender = process.env.SMTP_USER || `"Quattroeffe Preventivi" <preventivi@quattroeffe.com>`;

    const info = await transporter.sendMail({
      from: sender,
      to: recipients,
      replyTo: email, // Extremely useful so the admin can click "reply" directly in Gmail!
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email] Message sent! MessageID: ${info.messageId}`);
    
    let previewUrl = "";
    if (usingDemo) {
      previewUrl = nodemailer.getTestMessageUrl(info) || "";
      console.log(`[Email Mock-Preview] Real SMTP can be configured in Secrets. View simulated test inbox: ${previewUrl}`);
    }

    return res.status(200).json({ 
      success: true, 
      message: "Richiesta ricevuta ed e-mail inviata con successo!",
      messageId: info.messageId,
      previewUrl: previewUrl,
      usingDemo: usingDemo
    });
  } catch (error: any) {
    console.error("[Email Error] Failed to send email:", error);
    return res.status(500).json({ 
      error: "Errore durante l'invio dell'e-mail sul server.", 
      details: error.message 
    });
  }
});

// Start server
async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  // Force Vite middleware if we are running in dev mode, or if the production build dist folder doesn't exist
  const isDev = process.env.NODE_ENV !== "production" || 
                process.env.npm_lifecycle_event === "dev" || 
                !fs.existsSync(distPath) || 
                !fs.existsSync(path.join(distPath, "index.html"));

  // Vite integration
  if (isDev) {
    console.log("[Server] Starting in Development mode with Vite live middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(`[Server] Starting in Production mode. Serving static assets from ${distPath}`);
    
    // Serve static assets from the compiled production dist directory
    app.use(express.static(distPath));
    
    // Fallback: Also serve raw public folder assets directly in case the build/compile copy was partial or stale
    const publicPath = path.join(process.cwd(), "public");
    console.log(`[Server] Registering fallback public static folder: ${publicPath}`);
    app.use(express.static(publicPath));
    
    app.get("*", (req, res) => {
      // Prevent asset requests from falling back to serving index.html
      const ext = path.extname(req.path).toLowerCase();
      const assetExtensions = [
        '.png', '.webp', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.css', '.js',
        '.json', '.xml', '.txt', '.woff', '.woff2', '.ttf', '.eot'
      ];
      if (assetExtensions.includes(ext) || req.path.startsWith('/images/')) {
        console.warn(`[Server 404] Static asset not found: ${req.path}`);
        return res.status(404).send(`Asset not found: ${req.path}`);
      }
      
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully running on http://localhost:${PORT}`);
  });
}

startServer();
