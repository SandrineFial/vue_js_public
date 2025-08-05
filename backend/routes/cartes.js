var express = require('express');
var router = express.Router();
const Cartes = require('../models/cartes.js');
const { checkBody } = require('../modules/checkBody.js');

/* POST achète une carte */
router.post('/add', async function (req, res) {
    try {

        if (!checkBody(req.body, ['recipient', 'age', 'sender', 'email'])) {
            res.json({ result: false, msg: 'Champs vides ou manquants !' });
            return;
        }
        // Créer une nouvelle instance de Cartes avec les données du formulaire
        const nouvelleCarte = new Cartes({
            recipient: req.body.recipient,
            age: req.body.age,
            sender: req.body.sender,
            email: req.body.email,
            club: req.body.club,
            currentDate: req.body.currentDate,
            expiryDate: req.body.expiryDate,
            card_title: req.body.card_title,
            price: req.body.price,
            paye: 0,
        });

        // Sauvegarder la carte dans la base de données MongoDB
        await nouvelleCarte.save();

        // Répondre avec un succès
        res.status(201).json({ result: true, message: 'Carte cadeau enregistrée avec succès !' });
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(500).json({ result: false, error: "Erreur lors de l'enregistrement de la carte" });
    }

})

module.exports = router;