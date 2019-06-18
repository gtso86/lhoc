<template>
  <section
    class="section d-flex align-items-center"
    :class="`section-module_${slug}`"
  >
    <content-headline class="section-article_headline">
      {{ data.news_section }}
    </content-headline>

    <div class="w-100">
      <b-container fluid class="section-wrapper">
        <header class="section-header row">
          <content-header-title class="col-auto offset-lg-2 mb-0">
            {{ data.news_section }}
          </content-header-title>
        </header>
      </b-container>

      <carousel-builder
        :data="fetch"
        :button="postsMore"
        :slices="2"
        class="section-posts_carousel"
        column
        component-classes="d-flex flex-column -card -wrapper -reduced"
        component="post-card"
        navigation-wrapper
        wrapper-classes="col-lg-9"
        slide-classes="row col-lg-14 offset-lg-2"
        inject-classes
        view="card"
      />
    </div>
  </section>
</template>

<script>
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import CarouselBuilder from '@/components/CarouselBuilder/index.vue'

export default {
  name: 'ContentNews',
  components: {
    ContentHeadline,
    ContentHeaderTitle,
    CarouselBuilder
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    fetch: {
      type: [Object, Array],
      default: () => {}
    }
  },
  computed: {
    postsMore() {
      return `/noticias/`
    },
    slug() {
      let value = this.data.news_section
      value = value.replace(/^\s+|\s+$/g, '') // trim
      value = value.toLowerCase()

      // remove accents, swap ñ for n, etc
      const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
      const to = 'aaaaaeeeeeiiiiooooouuuunc------'
      for (let i = 0, l = from.length; i < l; i++) {
        value = value.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }

      value = value
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes

      return value
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  &-module {
    &_noticias {
      .section-article_headline {
        bottom: 0;
        right: -2.5vw;
        transform: translateY(35%);
      }
    }
  }
}
</style>
