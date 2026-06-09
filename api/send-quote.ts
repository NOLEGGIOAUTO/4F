import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, email, telefono, veicolo, note } = req.body;

  if (!nome || !email || !telefono) {
    return res.status(400).json({ error: 'Nome, Email e Telefono sono campi obbligatori.' });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || 'noleggioautoinroma@gmail.com';
  const emailSubject = `🚗 Nuovo Preventivo Veloce da ${nome}`;

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 25px; color: #1c1c28; background-color: #f4f5f9; border-radius: 16px; max-width: 600px; margin: auto;">
      <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 12px;">Richiesta Preventivo Noleggio</h2>
      <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden;">
        <tr><td style="padding: 12px 15px; font-weight: bold; color: #6e6f7d; font-size: 13px;">NOME:</td><td style="padding: 12px 15px;">${nome}</td></tr>
        <tr><td style="padding: 12px 15px; font-weight: bold; color: #6e6f7d; font-size: 13px;">EMAIL:</td><td style="padding: 12px 15px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 12px 15px; font-weight: bold; color: #6e6f7d; font-size: 13px;">TELEFONO:</td><td style="padding: 12px 15px;">${telefono}</td></tr>
        <tr><td style="padding: 12px 15px; font-weight: bold; color: #6e6f7d; font-size: 13px;">VEICOLO:</td><td style="padding: 12px 15px; color: #d4af37; font-weight: bold;">${veicolo || 'Non specificato'}</td></tr>
        <tr><td style="padding: 12px 15px; font-weight: bold; color: #6e6f7d; font-size: 13px; vertical-align:top;">NOTE:</td><td style="padding: 12px 15px; white-space: pre-wrap;">${note || 'Nessuna nota.'}</td></tr>
      </table>
    </div>
  `;

  try {
    let transporter;
    let previewUrl = '';

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', port: 587, secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER || '"Quattroeffe" <preventivi@quattroeffe.com>',
      to: receiverEmail,
      replyTo: email,
      subject: emailSubject,
      html: htmlContent,
    });

    previewUrl = nodemailer.getTestMessageUrl(info) || '';

    return res.status(200).json({ success: true, previewUrl });
  } catch (error: any) {
    return res.status(500).json({ error: 'Errore invio email.', details: error.message });
  }
}
