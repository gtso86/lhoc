<template>
  <main class="main">
    <div class="frame" />

    <section
      v-if="featuredRelated.length > 0"
      class="section section-module_featured"
    >
      <content-headline class="section-article_headline">
        {{ currentPage.title.rendered }}
      </content-headline>

      <b-container fluid class="section-wrapper">
        <header class="section-header row">
          <content-header-title class="col-auto offset-lg-2 mb-0">
            Destaques
          </content-header-title>
        </header>
      </b-container>

      <section class="">
        <carousel-builder
          :data="featuredRelated"
          :slices="1"
          class="section-posts_carousel"
          column
          component-classes="col-lg-7 offset-lg-3 d-flex flex-column -card -wrapper"
          component="post-card"
          navigation-wrapper
          inject-classes
          featured-image
          view="card"
        />
      </section>
    </section>

    <section class="section-filter">
      <b-container fluid class="section-wrapper">
        <b-row>
          <content-header-subtitle class="col-auto offset-lg-2">
            Informe-se sobre nosso setor
          </content-header-subtitle>

          <post-filter />
        </b-row>
      </b-container>
    </section>

    <section v-if="postsRelated" class="section section-module_posts">
      <b-container fluid class="section-wrapper">
        <b-row>
          <section class="section-box section-related col-lg-14 offset-lg-2">
            <carousel-builder
              :button="postsMore"
              persist-button
              :data="postsRelated"
              :slices="3"
              class="section-posts_carousel"
              component-classes="-list -half"
              component="post-card"
              view="list"
            />
          </section>
        </b-row>
      </b-container>
    </section>

    <section
      v-if="publicationsRelated"
      class="section section-module_publications"
    >
      <b-container fluid class="section-wrapper">
        <b-row>
          <section class="section-box section-related col-lg-14 offset-lg-2">
            <div class="section-background">
              <header class="section-header">
                <content-header-title class="mb-0">
                  Publicações
                </content-header-title>
              </header>

              <carousel-builder
                :button="publicationsMore"
                persist-button
                :data="publicationsRelated"
                :slices="4"
                background-color="white"
                class="section-posts_carousel"
                column
                component-classes="d-flex flex-column -card"
                wrapper-classes="col-lg-9"
                component="post-card"
                inject-classes
                view="card"
              />
            </div>
          </section>
        </b-row>
      </b-container>
    </section>

    <section v-if="eventsRelated" class="section section-module_posts">
      <b-container fluid class="section-wrapper">
        <b-row>
          <section class="section-box section-related col-lg-14 offset-lg-2">
            <header class="section-header">
              <content-header-title class="mb-0">
                Eventos
              </content-header-title>
            </header>

            <carousel-builder
              :button="eventsMore"
              persist-button
              :data="eventsRelated"
              :slices="3"
              class="section-posts_carousel"
              component-classes="-list -half"
              component="post-card"
              view="list"
            />
          </section>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import ContentHeaderSubtitle from '@/components/ContentHeaderSubtitle/index.vue'
import CarouselBuilder from '@/components/CarouselBuilder/index.vue'
import PostFilter from '@/components/PostFilter/index.vue'

export default {
  name: 'Noticias',
  watchQuery: true,
  scrollToTop: false,
  components: {
    ContentHeaderTitle,
    ContentHeadline,
    ContentHeaderSubtitle,
    CarouselBuilder,
    PostFilter
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    postsMore() {
      return `/noticias/arquivo/`
    },
    publicationsMore() {
      return `/noticias/publicacoes/`
    },
    eventsMore() {
      return `/noticias/eventos/`
    }
  },
  asyncData({ $axios, params }) {
    // Fetch current page data
    return $axios.get('wp/v2/pages/401').then(currentPage => {
      let featuredIds = 0
      if (currentPage.data.acf.featured_list) {
        featuredIds = currentPage.data.acf.featured_list
      }
      return Promise.all([
        // Fetch featured posts
        $axios.$get(
          `wp/v2/posts/?include=${featuredIds}&orderby=include&_embed`
        ),
        // Fetch posts
        $axios.$get('hoc/v1/posts/?category=1&per_page=9'),
        // Fetch publications
        $axios.$get('hoc/v1/posts/?category=111&per_page=12'),
        // Fetch events
        $axios.$get('hoc/v1/posts/?category=112&per_page=9')
      ]).then(
        ([
          featuredRelated,
          postsRelated,
          publicationsRelated,
          eventsRelated
        ]) => {
          return {
            currentPage: currentPage.data,
            featuredRelated: featuredRelated,
            postsRelated: postsRelated.posts,
            publicationsRelated: publicationsRelated.posts,
            eventsRelated: eventsRelated.posts
          }
        }
      )
    })
  },
  mounted() {},
  created() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.section {
  position: relative;

  &-module {
    &_featured {
      .section-article_headline {
        left: 104%;
        top: 125%;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-75%);
        z-index: -1;
      }
    }

    &_publications {
      .section-background:before {
        left: $gutter / -2;
      }
    }
  }
}
</style>
