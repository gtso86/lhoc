<template>
  <main class="main">
    <div class="frame" />

    <section class="section section-module_article">
      <content-headline class="section-article_headline">
        {{ currentPage.date | moment('DD MMMM YYYY') }}
      </content-headline>

      <b-container fluid class="section-wrapper">
        <b-row>
          <content-jumbo-title>
            {{ currentPage.title.rendered }}
          </content-jumbo-title>
        </b-row>

        <b-row
          class="section-meta d-flex justify-content-center flex-column text-center"
        >
          <post-authors :data="currentPage.ordered_authors" />
          <post-meta :data="currentPage._embedded['wp:term']" />
        </b-row>

        <b-row
          class="section-header align-items-center"
          :class="[currentPage._embedded['wp:featuredmedia'] ? '-image' : '']"
        >
          <time
            :datetime="currentPage.date"
            class="section-article_date col-lg-2 offset-lg-2 text-center"
          >
            <strong>{{ currentPage.date | moment('DD') }}</strong>
            {{ currentPage.date | moment('MMMM YYYY') }}
          </time>

          <figure
            v-if="currentPage._embedded['wp:featuredmedia']"
            class="section-article_image col-lg-12 mb-0"
          >
            <img
              :src="currentPage._embedded['wp:featuredmedia'][0].source_url"
              class="img-fluid"
            />
          </figure>
        </b-row>

        <b-row>
          <section class="section section-article col-lg-10 offset-lg-4">
            <div
              class="section-article_post"
              v-html="currentPage.content.rendered"
            />
          </section>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import ContentJumboTitle from '@/components/ContentJumboTitle/index.vue'
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import PostAuthors from '@/components/PostAuthors/index.vue'
import PostMeta from '@/components/PostMeta/index.vue'

export default {
  name: 'NoticiasInterna',
  components: {
    ContentJumboTitle,
    ContentHeadline,
    PostAuthors,
    PostMeta
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  asyncData({ $axios, params, route }) {
    return $axios
      .get(
        `http://lhoc.inwip.com.br/painel/web/wp-json/wp/v2/posts?slug=${
          params.slug
        }&_embed`
      )
      .then(currentPage => {
        return {
          currentPage: currentPage.data[0]
        }
      })
  },
  mounted() {},
  created() {
    this.$moment.locale('pt')
  },
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.section {
  &-module {
    &_article {
      .section-article_headline {
        left: 103%;
        top: 100vh;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-75%);
      }
    }
  }

  &-meta {
    margin-top: $gutter / -2;
  }

  &-header {
    margin-top: $gutter;
    position: relative;

    &.-image {
      margin-bottom: $gutter;
    }
  }

  &-article {
    &_date {
      color: $cooper;
      font-family: $spectra;
      flex-shrink: 0;
      margin-right: $gutter / 2;
      margin-top: -$gutter / 2;
      position: relative;
      white-space: nowrap;
      width: 8vw;

      &:last-child {
        min-width: 160px;
        position: absolute;
        top: 5px;
      }

      strong {
        display: block;
        font-size: 7vw;
        line-height: 1;
      }
    }
  }
}
</style>
