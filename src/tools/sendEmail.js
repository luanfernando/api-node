import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import "dotenv/config";

async function enviarEmailTeste() {
  // Credenciais fornecidas pelo painel do Mailtrap
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAPHOST,
    port: process.env.MAILTRAPPORT,
    auth: {
      user: process.env.MAILTRAPUSER,
      pass: process.env.MAILTRAPPASS,
    },
  });

  const mailOptions = {
    from: '"Testador Node" <teste@suaapi.com>',
    to: "cliente-real-ou-ficticio@QualquerEmail.com",
    subject: "Testando no ambiente controlado",
    html: `
      <div style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">Olá!</h2>
        <p>Este é um e-mail de teste estruturado em <strong>HTML</strong>.</p>
        <hr />
        <small>Enviado automaticamente pelo meu servidor Node.js</small>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail capturado pelo Mailtrap! ID:", info.messageId);
  } catch (error) {
    console.error("Erro:", error);
  }
}

enviarEmailTeste();
