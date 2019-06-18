<template>
  <article class="item-card">
    <strong>{{ data.repeater_title }}</strong>

    <br />

    <div class="item-card_description" v-html="data.repeater_description" />

    <a
      v-if="data.repeater_link"
      class="item-card_link"
      :href="data.repeater_link"
      >Acesse</a
    >
  </article>
</template>

<script>
export default {
  name: 'ItemCard',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      link: ''
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.item {
  &-card {
    margin-bottom: $gutter;

    &_link {
      color: $cooper;
      text-decoration: underline;
    }
  }
}
</style>

<style scoped>
/* .item-card_description >>> p {
  margin-bottom: 30px;
} */
</style>
