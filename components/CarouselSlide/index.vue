<template>
  <div class="carousel-slide d-flex flex-column">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CarouselSlide'
}
</script>

<style lang="scss" scoped>
.carousel {
  &-slide {
  }
}
</style>
