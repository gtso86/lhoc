<template>
  <div>
    <header-nav />
    <nuxt />
    <footer-nav />
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav/index.vue'
import FooterNav from '@/components/FooterNav/index.vue'

export default {
  name: 'Default',
  components: {
    HeaderNav,
    FooterNav
  }
}
</script>

<style lang="scss"></style>
