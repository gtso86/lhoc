<template>
  <h1 class="custom-jumbo_title">
    <slot />
  </h1>
</template>

<script>
export default {
  name: 'CustomJumboTitle'
}
</script>

<style lang="scss" scoped>
.custom {
  &-jumbo {
    &_title {
      color: $cooper;
      font-family: $spectra;
      font-size: 5.5vw;
      line-height: 1;
      margin-bottom: $gutter;
      margin-left: auto;
      margin-top: 0;
      margin-right: auto;
      max-width: 60%;
      text-align: center;
    }
  }
}
</style>
