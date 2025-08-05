<template>
    <div className="container mx-auto shadow-xl drop-shadow-xl bg-white px-10 pb-10">
        <SocialShare :url=ogUrl :title=titlePartage />
        <div className="text-sm breadcrumbs mb-10 pt-2">
            <ul>
                <li>
                    <RouterLink to="/">Accueil</RouterLink>
                </li>
                <li>
                    <RouterLink to="/boutique">Boutique</RouterLink>
                </li>
                <li>Cartes cadeaux</li>
            </ul>
        </div>

        <h1 className="text-3xl text-rouge uppercase mb-5">Cartes cadeaux - cours de tir à l'arc</h1>

        <p>
            Découvrez mes cartes cadeaux pour des cours de tir à l'arc, une idée originale à offrir à vos proches.
        </p>

        <p className="mt-3">
            La carte cadeau est envoyée sous 48h et est valable 1 an après la date d'achat.
        </p>
        <div className="alert alert-success block mt-5" v-if="merciMessage">
            <font-awesome-icon icon=" fa-solid fa-check" /> <span> Merci pour votre achat. La carte vous sera envoyée
                par mail entre 2h et 48h.</span>
        </div>
        <section className="my-10">
            <h2 className="text-2xl mb-3">Cartes Anniversaire</h2>
            <p className="mb-3">Pour un groupe de personne. A partir de 6 ans.</p>
            <CartesCadeauxListe v-if="!selectedCardAnniversaire" :giftCards="cartesAnniversaire"
                @offrir="handleOffrirAnniversaire" />
            <CartesAchats v-else :card="selectedCardAnniversaire" @cancel="handleCancelAnniversaire"
                @achatFini="handleAchatFiniAnniversaire" />
        </section>

        <section className="my-10">
            <h2 className="text-2xl mb-5">Cartes Cours particuliers (non licenciés)</h2>
            <p className="mb-3">Pour une personne, des cartes cadeaux pour découvrir la pratique du tir à l'arc, pour un
                débutant ou un
                non licencié en club.</p>
            <CartesCadeauxListe v-if="!selectedCardCoursNonLic" :giftCards="cartesCoursNonLic"
                @offrir="handleOffrirCoursNonLic" />
            <CartesAchats v-else :card="selectedCardCoursNonLic" @cancel="handleCancelCoursNonLic"
                @achatFini="handleAchatFiniCoursNonLic" />
        </section>

        <section className="my-10">
            <h2 className="text-2xl mb-5">Cartes Cours particuliers (licenciés dans un club)</h2>
            <p className="mb-3">Pour une personne, des cartes cadeaux pour offrir des cours de perfectionnment au tir à
                l'arc, avec une
                professionnelle.</p>
            <CartesCadeauxListe v-if="!selectedCardCoursLic" :giftCards="cartesCoursLic"
                @offrir="handleOffrirCoursLic" />
            <CartesAchats v-else :card="selectedCardCoursLic" @cancel="handleCancelCoursLic"
                @achatFini="handleAchatFiniCoursLic" />
        </section>


    </div>
</template>

<script>
import CartesCadeauxListe from '../components/CartesCadeauxListe.vue';
import CartesAchats from '../components/CartesAchats.vue';
import { cartesData } from '@/data/cartesData.js';

export default {
    name: "CartesCadeaux",
    components: { CartesCadeauxListe, CartesAchats },
    data() {
        return {
            // Pour chaque section de cartes, on utilise une variable pour la carte sélectionnée
            selectedCardAnniversaire: null,
            selectedCardCoursNonLic: null,
            selectedCardCoursLic: null,
            cartesAnniversaire: cartesData.anniversaire,
            cartesCoursNonLic: cartesData.particuliersNonLicencies,
            cartesCoursLic: cartesData.particuliersLicencies,
            merciMessage: false
        };
    },
    created() {
        // Récupérer le paramètre 'merci' dans l'URL
        //console.log(this.$route.query); // Voir les paramètres de requête
        const queryParams = this.$route.query;
        if (queryParams.merci) {
            this.merciMessage = true;
        }
    },
    methods: {
        // Méthodes pour gérer la section Anniversaire
        handleOffrirAnniversaire(card) {
            this.selectedCardAnniversaire = card;
        },
        handleCancelAnniversaire() {
            this.selectedCardAnniversaire = null;
        },
        handleAchatFiniAnniversaire() {
            this.selectedCardAnniversaire = null;
        },

        // Méthodes pour gérer la section Cours non licenciés
        handleOffrirCoursNonLic(card) {
            this.selectedCardCoursNonLic = card;
        },
        handleCancelCoursNonLic() {
            this.selectedCardCoursNonLic = null;
        },
        handleAchatFiniCoursNonLic() {
            this.selectedCardCoursNonLic = null;
        },

        // Méthodes pour gérer la section Cours licenciés
        handleOffrirCoursLic(card) {
            this.selectedCardCoursLic = card;
        },
        handleCancelCoursLic() {
            this.selectedCardCoursLic = null;
        },
        handleAchatFiniCoursLic() {
            this.selectedCardCoursLic = null;
        }
    }
};
</script>