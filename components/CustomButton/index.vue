<template>
  <span>
    <nuxt-link v-if="to" class="button d-inline-block" :to="to">
      <strong><slot /></strong>
    </nuxt-link>

    <a v-else-if="href" :href="href" class="button d-inline-block" :to="to">
      <strong><slot /></strong>
    </a>

    <div v-else class="button d-inline-block">
      <strong><slot /></strong>
    </div>
  </span>
</template>

<script>
export default {
  name: 'CustomButtom',
  props: {
    to: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.button {
  border: 1px solid $cooper;
  color: $black;
  cursor: pointer;
  line-height: $gutter;
  padding: 0 30px;
  text-decoration: none;
  white-space: nowrap;
}
</style>
