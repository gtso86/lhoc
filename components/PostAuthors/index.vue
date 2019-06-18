<template>
  <div class="post-meta_authors">
    <strong>Por: </strong>
    <span v-for="(author, index) in data" :key="index">
      <nuxt-link :to="`/advogados/${author.slug}`">{{ author.name }}</nuxt-link>
      <span v-if="index < data.length - 1"
        >{{ index == data.length - 2 ? 'e' : ',' }}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PostAuthors',
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.post-meta_authors {
  font-size: 12px;

  a {
    color: inherit;
  }
}
</style>
