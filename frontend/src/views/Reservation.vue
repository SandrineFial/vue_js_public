<template>
    <div className="container mx-auto shadow-xl drop-shadow-xl bg-jaunepale px-10">
        <SocialShare :url=ogUrl :title=titlePartage />
        <div className="text-sm breadcrumbs mb-10 pt-2">
            <ul>
                <li>
                    <RouterLink to="/">Accueil</RouterLink>
                </li>
                <li>
                    <RouterLink to="/particuliers">Particuliers </RouterLink>
                </li>
                <li>Cours particuliers</li>
            </ul>
        </div>
        <h1 className="text-3xl text-rouge uppercase mb-3">
            Cours particuliers de Tir à l'Arc
        </h1>

        <div className="card lg:card-side">
            <figure><img src="/img/tir-a-larc-fialon-sf-var-diplome-d-etat.jpg" height="300" width="400"
                    alt="Cours particuliers de tir à l'arc" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Vous cherchez à découvrir ou perfectionner votre technique au tir à l'arc ?
                </h2>
                <p>Pour débutants, archers confirmés licenciés ou amateurs hors club.</p>
                <p>Je vous propose des cours particuliers adaptés à tous les niveaux et à vos besoins spécifiques, que
                    vous soyez un novice complet, un archer de club souhaitant progresser, ou simplement un amateur
                    curieux de ce sport ancestral.</p>
                <p>On verra ensemble comment peaufiner votre technique de tir, que vous tiriez en arc classique ou arc
                    nu (barebow).</p>
                <p>Que vous soyez débutant ou compétiteur, je vous donnerais également des outils d'entrainements pour
                    améliorer vos performances.</p>

            </div>
        </div>


        <div className="lg:flex">
            <div>
                <h2 className="text-2xl font-bold py-5">Tarifs dégressifs</h2>
                <p>Seul ou à plusieurs, j'adapte ces cours particuliers à vos besoins.</p>
                <div className="">
                    <table
                        className=" table-zebra table w-full mb-4 table-sm mt-5 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <thead>
                            <tr className=" bg-bleu text-secondary-content">
                                <th>Nb. personnes</th>
                                <th>1h</th>
                                <th>1h30</th>
                                <th>2h</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1 pers.</td>
                                <td>22 €</td>
                                <td>30 €</td>
                                <td>40 €</td>
                            </tr>
                            <tr>
                                <td>2 pers. et plus</td>
                                <td>20 € / pers.</td>
                                <td>25 € / pers.</td>
                                <td>30 € / pers.</td>
                            </tr>
                            <tr>
                                <td>Plus de 3 pers.<br />
                                    Tarif groupe</td>
                                <td>60 €</td>
                                <td>90 €</td>
                                <td>120 €</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="stats shadow mt-5 lg:ml-10">
                <div className="stat">
                    <div className="stat-value text-3xl mb-5">Réservez votre séance !

                    </div>
                    <p className="mb-2"><strong>Lieu</strong> : Marseille 11e ou 10e arrondissement en club<br /> ou
                        autres lieux à
                        domicile.</p>
                    <form ref="form" @submit.prevent="envoyerDispo">
                        <label for="dateDispo" className="font-bold">Sélectionnez votre jour de disponibilité
                            :</label><br />
                        <VDatePicker v-model="dateDispo" :min-date="new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)"
                            :disabled-dates="datesInterdites" is-required color="gray" :attributes="[
                                {
                                    key: 'disabled',
                                    dates: datesInterdites,
                                    highlight: true,
                                    highlightColor: 'red',
                                    contentStyle: { color: 'white' },
                                    popover: { label: 'Indisponible' }
                                }
                            ]" className="mb-4" />
                        <label className="block mb-2 font-bold my-3">
                            Jour sélectionné :
                            <span v-if="dateDispo">{{ formatDate(dateDispo) }}</span>
                            <span v-else className="text-red-600">Aucun jour sélectionné</span>
                        </label>
                        <input type="hidden" name="user_sujet" value="Cours particuliers de tir à l'arc" />
                        <input type="hidden" name="message"
                            :value="`Réservation pour ${nom} le ${formatDate(dateDispo)}, ${nbPers} pers, ${duree}.`" />
                        <input type="hidden" name="user_phone" />
                        <label className="block mb-2">Nom :</label>
                        <input v-model="nom" type="text" name="user_name" className="input input-bordered w-full mb-4"
                            required />

                        <label className="block mb-2">E-mail :</label>
                        <input v-model="mail" type="email" name="user_email"
                            className="input input-bordered w-full mb-4" required />

                        <label className="block mb-2">Nombre de personnes :</label>
                        <input v-model="nbPers" type="number" min="1" className="input input-bordered w-full mb-4"
                            required />

                        <label className="block mb-2">Durée :</label>
                        <select v-model="duree" className="input input-bordered w-full mb-4" name="user_phone" required>
                            <option v-for="d in durees" :key="d" :value="d">{{ d }}</option>
                        </select>

                        <label className="block mb-2">Tarif total : {{ tarifTotal }}</label>

                        <button type="submit" className="btn bg-bleu mt-2">
                            <font-awesome-icon icon="fa-solid fa-envelope" className="mr-2" />
                            Envoyer
                        </button>
                    </form>
                    <div v-if="msgRetour" :className="`alert alert-${colorSuccess}${colorError} mt-3 p-2`">{{ msgRetour
                    }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { useHead } from '@vueuse/head';
import { lienSite, APP_TEMPLATE_ID, APP_SERVICE_ID, APP_PUBLIC_KEY } from '@/data/constants.js';
import { DatePicker } from 'v-calendar';
//import datesInterdites from '@/data/datesInterdites.js';
import emailjs from '@emailjs/browser';

export default {
    name: 'CoursParticuliers',
    components: {
        VDatePicker: DatePicker
    },
    data() {
        return {
            startDate: new Date('2011-01-01'), // calcul mes années d'expérience depuis janvier 2011
            yearsPassed: null,
            dateDispo: null,
            colorSuccess: '',
            colorError: '',
            success: '',
            error: '',
            nom: '',
            mail: '',
            nbPers: 1,
            duree: '1h',
            durees: ['1h', '1h30', '2h'],
            msgRetour: null,
            datesInterdites
        }
    },
    methods: {
        calculateYears() {
            const currentDate = new Date(); // Obtenir la date actuelle
            let years = currentDate.getFullYear() - this.startDate.getFullYear();
            // Vérification si l'anniversaire de cette année est passé ou non
            const monthDiff = currentDate.getMonth() - this.startDate.getMonth();
            const dayDiff = currentDate.getDate() - this.startDate.getDate();
            // Si le mois courant est avant septembre, ou si c'est septembre mais avant le 1er, on retire 1 an
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                years--;
            }
            this.yearsPassed = years;
        },
        envoyerDispo() {
            if (
                !this.dateDispo ||
                !this.nom ||
                !this.mail ||
                !this.nbPers ||
                !this.duree
            ) {
                this.msgRetour = "Merci de remplir tous les champs.";
                return;
            }
            if (this.datesInterdites.some(d => this.formatDate(d) === this.formatDate(this.dateDispo))) {
                this.msgRetour = "Cette date n'est pas disponible, merci d'en choisir une autre.";
                return;
            }
            else {
                // verif si email valide => si contient un @ et un .
                let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(this.$refs.form.user_email.value)) {
                    emailjs.sendForm(APP_SERVICE_ID, APP_TEMPLATE_ID, this.$refs.form, APP_PUBLIC_KEY)
                        .then((result) => {
                            this.colorSuccess = "success";
                            this.colorError = "";
                            this.errors = "";
                            this.cacheSuccess = "block";
                            this.cacheErrors = "hidden";
                            this.msgRetour = `Merci. Votre réservation a été envoyée, ${this.nbPers} pers, ${this.duree}, le ${this.formatDate(this.dateDispo)}, je vous contacte rapidement pour valider le créneau.`;
                        }, (error) => {
                            this.msgRetour = "Erreur technique, le message n'a pas pu être envoyé";
                            this.cacheErrors = "block";
                            this.cacheSuccess = "hidden";
                            this.colorSuccess = "";
                            this.colorError = "danger";
                        });
                } else {
                    this.errors = "L'adresse email n'est pas valide";
                    this.cacheErrors = "block";
                    this.cacheSuccess = "hidden";
                    this.colorSuccess = "";
                    this.colorError = "danger";
                }
            }
        },
        formatDate(date) {
            if (!date) return '';
            // Si c'est déjà une string (parfois v-calendar renvoie un string), retourne tel quel
            if (typeof date === 'string') return date;
            // Format français : JJ/MM/AAAA
            return date.toLocaleDateString('fr-FR');
        },
    },
    computed: {
        tarifTotal() {
            if (this.nbPers > 1) {
                // Plusieurs personnes : tarif par personne
                if (this.nbPers > 3) {
                    // Tarif groupe
                    if (this.duree === '1h') return '60 €';
                    if (this.duree === '1h30') return '90 €';
                    if (this.duree === '2h') return '120 €';
                }
                else {
                    if (this.duree === '1h') return 20 * this.nbPers + ' €';
                    if (this.duree === '1h30') return 25 * this.nbPers + ' €';
                    if (this.duree === '2h') return 30 * this.nbPers + ' €';
                }
            } else {
                // 1 personne
                if (this.duree === '1h') return '22 €';
                if (this.duree === '1h30') return '25 €';
                if (this.duree === '2h') return '30 €';
            }
            return '';
        }
    },

    mounted() {
        this.calculateYears(); // Calcul effectué au chargement du composant
        this.envoyerDispo();
    },
}
</script>