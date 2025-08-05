<!-- src/components/CartesCadeauxListe.vue -->
<template>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="(card, index) in giftCards" :key="index"
      className="card bg-base-100 shadow-xl p-4 border border-gray-200 rounded-lg">
      <figure>
        <img :src="card.imgButton" alt="E-carte cadeaux" height="219" width="300" />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl mb-2">{{ card.title }}</h2>
        <div className="mb-4 text-gray-700" v-if="isHtml(card.description)" v-html="card.description"></div>
        <div className="mb-4 text-gray-700" v-else>{{ card.description }}</div>
        <p className="text-lg font-semibold mb-2">
          Valeur : {{ card.value }}€
          &ensp;<span v-if="card.originalValue" className="text-gris italic font-light line-through">({{
            card.originalValue }}€)</span>
        </p>

        <button className="btn bg-rouge hover:bg-jaune w-full" @click="$emit('offrir', card)">Offrir</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    giftCards: {
      type: Array,
      required: true,
    },
  },
  methods: {
    offrir(card) {
      //console.log('Carte sélectionnée :', card); // Vérifie que l'objet card est bien passé
      this.$emit('offrir', card);
    },
    // Vérifie si la chaîne contient des balises HTML
    isHtml(content) {
      const pattern = /<\/?[a-z][\s\S]*>/i; // Expression régulière pour détecter des balises HTML
      return pattern.test(content);
    }
  }

};
</script>