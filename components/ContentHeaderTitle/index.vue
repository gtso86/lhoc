<template>
  <h1 class="custom-header">
    <span class="custom-header_title d-inline-block">
      <slot />
    </span>
  </h1>
</template>

<script>
export default {
  name: 'CustomHeaderTitle'
}
</script>

<style lang="scss" scoped>
.custom {
  &-header {
    font-size: 1rem;

    &_title {
      border-left: 1px solid $cooper;
      color: $cooper;
      margin-bottom: $gutter;
      padding-bottom: 5px;
      padding-left: 15px;
      padding-top: 5px;
    }
  }
}
</style>
