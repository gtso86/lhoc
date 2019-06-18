<template>
  <div class="post-meta_terms">
    <strong>Atuação: </strong>
    <span v-for="(terms, index) in data" :key="index">
      <span
        v-for="(term, i) in terms"
        :key="i"
        :class="`term-${term.taxonomy}`"
      >
        <nuxt-link :to="`/noticias/?${type(index)}=${term.slug}`">
          {{ term.name }}
        </nuxt-link>
        <span v-if="i < terms.length - 1">, </span>
      </span>
      <span v-if="index > 1 && index < data.length - 1">, </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PostMeta',
  components: {},
  props: {
    data: {
      type: [Object, Array],
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    type(index) {
      return index === 2
        ? 'mercados'
        : '' || index === 3
        ? 'areas-do-direito'
        : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.post-meta_terms {
  font-size: 12px;

  a {
    color: inherit;
  }

  .term-category {
    display: none;
  }
}
</style>
