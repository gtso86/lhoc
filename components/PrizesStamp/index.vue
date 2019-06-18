<template>
  <article class="stamp d-flex">
    <figure
      v-if="stamp._embedded['wp:featuredmedia']"
      class="stamp-placeholder"
    >
      <img
        :src="
          stamp._embedded['wp:featuredmedia'][0].media_details.sizes.full
            .source_url
        "
        class="stamp-image img-fluid"
      />
    </figure>

    <header class="stamp-header">
      <h1 class="stamp-title">{{ stamp.title.rendered }}</h1>
    </header>

    <a
      v-if="stamp.acf.prizes_link"
      class="stamp-link"
      :href="stamp.acf.prizes_link"
      target="_blank"
    />
  </article>
</template>

<script>
export default {
  name: 'PrizesStamp',
  props: {
    stamp: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.stamp {
  position: relative;

  &:hover {
    .stamp-image {
      filter: grayscale(0);
    }
  }

  &.-list {
    margin-bottom: $gutter;

    .stamp-placeholder {
      flex-shrink: 0;
      margin: 0 $gutter / 2 0 0;
    }

    .stamp-image {
      max-height: inherit;
      width: 100px;
    }
  }

  &-link {
    height: 100%;
    position: absolute;
    width: 100%;
  }

  &-title {
    color: $black;
    font-family: $spectra;
    font-size: 16px;
  }

  &-placeholder {
    background: $light-gray;
    mix-blend-mode: color;
  }

  &-image {
    filter: grayscale(100%);
    max-height: 100px;
    mix-blend-mode: multiply;
    transition: all 0.5s ease;
  }
}
</style>
