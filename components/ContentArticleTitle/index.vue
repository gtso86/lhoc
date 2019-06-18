<template>
  <h1 class="custom-article">
    <span class="custom-article_title d-inline-block">
      <slot />
    </span>
  </h1>
</template>

<script>
export default {
  name: 'CustomArticleTitle'
}
</script>

<style lang="scss" scoped>
.custom {
  &-article {
    &_title {
      color: $cooper;
      font-family: $spectra;
      font-size: 4vw;
      margin-bottom: $gutter;
    }
  }
}
</style>
