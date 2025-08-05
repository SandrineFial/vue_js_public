<template>
    <div className="gift-card-form max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Offrir une carte {{ card.title }} - {{ card.value }} €</h2>
    
      <form @submit.prevent="submitForm" className="space-y-4" v-if="showCommandeCarte">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pour :</span>
          </label>
          <input 
            type="text" v-model="form.recipient" 
            className="input input-bordered w-full" 
            required placeholder="Nom du destinataire" 
          />
        </div>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text">Âge :</span>
          </label>
          <input 
            type="number"v-model="form.age" 
            className="input input-bordered w-full" 
            required placeholder="Âge du destinataire"
            @blur="validateAge" />
          <!-- Message d'erreur si l'âge est inférieur à 6 ans -->
          <p v-if="errors.age" className="text-red-500 text-sm">{{ errors.age }}</p>
        </div>
        <div className="form-control" v-if="card.type==='carte3'">
          <label className="label">
            <span className="label-text">Son club :</span>
          </label>
          <input 
            type="text" v-model="form.club" 
            className="input input-bordered w-full" placeholder="Son club" 
          />
        </div>

        <input v-else type="hidden" v-model="form.club" />
  
        <div className="form-control">
          <label className="label">
            <span className="label-text">De la part de :</span>
          </label>
          <input 
            type="text" v-model="form.sender" 
            className="input input-bordered w-full" require placeholder="Votre nom" 
          />
        </div>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text">Votre email :</span>
          </label>
          <input 
            type="email" v-model="form.email" 
            className="input input-bordered w-full" 
            required placeholder="Votre adresse email" 
          />
        </div>
  
        <!-- Champs cachés -->
        <input type="hidden" v-model="form.currentDate" name="currentDate" />
        <input type="hidden" v-model="form.expiryDate" name="expiryDate" />
        <input type="hidden" v-model="form.courseType" name="course_type"/>
        <input type="hidden" v-model="card.value" name="price" />

        <input type="hidden" :value="form.recipient" name="user_name" />
        <input type="hidden" value="Achat carte cadeau" name="user_sujet" />
        <input type="hidden" value="" name="user_phone" />
        <input type="hidden" value="noreply@gmail.com" name="user_email" />
        <input type="hidden" :value="card.title" name="message" />
  
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full" :disabled="!isValid">Commander</button>
        </div>
        <div className="form-control mt-2">
            <button type="button" @click="$emit('cancel')" className="btn w-full">Annuler</button>
        </div>
      </form>
      
      <div id="paypal-button-container" v-if="showPaypalButton">
        <p>Afin de finaliser votre commande, veuiller cliquer sur le bouton ci-dessous pour régler la carte.</p>
        <p>
          <a className="btn bg-bleu hover:bg-jaune w-full mt-5" :href="card.linkPaypal">
            Payer
          </a>
        </p>
        <p className="italic mt-5">Site de paiement sécurisé Paypal.</p>
      </div>

      <div className="alert alert-success block" v-if="showSuccess">
          <font-awesome-icon icon=" fa-solid fa-check" /> <span> {{ msgSuccess }}</span>
      </div>
      <div className="alert alert-error block" v-if="showErrors">
          <font-awesome-icon icon="fa-solid fa-xmark" /> <span> {{ msgErrors }}</span>
      </div>

    </div>
  </template>
  
  <script>
import emailjs from '@emailjs/browser';
import { APP_TEMPLATE_ID, APP_SERVICE_ID, APP_PUBLIC_KEY, backEnd } from '@/data/constants.js';
  
  export default {
    props: {
        card: Object, // La carte cadeau sélectionnée
    },
    data() {
      return {
        form: {
            recipient: '',
            age: '',
            sender: '',
            email: '',
            club:'',
            currentDate: this.formatDate(new Date()),
            expiryDate: this.calculateExpiryDate(1),
            card_title: this.card.title,
            price: this.card.value,
        },
        errors: {
          age: '', // Stocke les messages d'erreur pour l'âge
        },
        showCommandeCarte: true,
        showPaypalButton: false,
        showSuccess: false,
        showErrors: false,
        msgSuccess: "",
        msgErrors: "",
      };
    },
    computed: {
      isValid() {
        // Le formulaire est valide si aucune erreur d'âge n'est présente
        return !this.errors.age;
      },
    },
    methods: {
      formatDate(date) {
        return date.toISOString().split('T')[0];
      },
      calculateExpiryDate(years) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + years); // Ajoute un an à la date actuelle
        return date.toISOString().split('T')[0]; // Retourne la date au format AAAA-MM-JJ
      },
      validateAge() {
        // Vérifier si l'âge est inférieur à 6 ans
        if (this.form.age < 6) {
          this.errors.age = "L'âge minimum autorisé est de 6 ans.";
        } else {
          this.errors.age = ''; // Aucune erreur si l'âge est correct
        }
      },
      async submitForm() {
          try {

            const response = await fetch(backEnd + 'cartes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.form)
            });
            const data = await response.json();
            if (data.result) {
              // affiche le bouton de paiement
              //alert('Carte enregistrée avec succès !');
              this.showCommandeCarte = false;
              this.showPaypalButton = true;
              this.loadPaypalButton();
            } else {

            }
          } catch (error) {
            console.error("Erreur lors de l'enregistrement", error);
          }
      },
      loadPaypalButton() {
        // Charger le bouton PayPal
        paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.form.price,
                },
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              try { // envoi par mail à moi
                emailjs.sendForm(APP_SERVICE_ID, APP_TEMPLATE_ID, this.form.value, APP_PUBLIC_KEY);
                this.msgSuccess = "Merci, votre carte a été commandée. Vous la recevrez par mail d'ici 2h à 48h.";
                this.showSuccess = true;
              } catch (error) {
                this.msgErrors="Erreur lors de la commande de la carte :"+ error;
                this.showErrors = true;
              } 
            });
          },
          onError: (err) => {
            console.error('Erreur PayPal:', err);
          },
        }).render('#paypal-button-container'); // Rendre le bouton PayPal dans le conteneur
      },
    },
  };
  </script>
  <style>.pp-GPAHT7E2K55AC{text-align:center;border:none;border-radius:1.5rem;min-width:11.625rem;padding:0 2rem;height:2.625rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer;}</style>