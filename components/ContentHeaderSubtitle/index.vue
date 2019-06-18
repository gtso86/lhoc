<template>
  <h2 class="custom-header_subtitle">
    <slot />
  </h2>
</template>

<script>
export default {
  name: 'CustomHeaderSubtitle'
}
</script>

<style lang="scss" scoped>
.custom {
  &-header {
    &_subtitle {
      color: $black;
      font-family: $spectra;
      font-size: 3.5vw;
      margin-bottom: $gutter;
    }
  }
}
</style>
