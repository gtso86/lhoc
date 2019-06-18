<template>
  <h1 class="custom-headline">
    <slot />
  </h1>
</template>

<script>
export default {
  name: 'CustomHeaderTitle'
}
</script>

<style lang="scss" scoped>
.custom {
  &-headline {
    color: $white;
    font-family: $spectra;
    font-size: 240px;
    line-height: 1;
    position: absolute;
    white-space: nowrap;
  }
}
</style>
