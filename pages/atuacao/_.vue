<template>
  <main class="main">
    <div class="frame" />

    <section class="section section-module_jumbo">
      <b-container fluid class="section-wrapper">
        <b-row>
          <content-jumbo-title>
            {{ currentPage.title.rendered }}
          </content-jumbo-title>
        </b-row>

        <b-row>
          <figure
            v-if="currentPage._embedded['wp:featuredmedia']"
            class="section-article_image col-lg-16 offset-lg-1 mb-0"
          >
            <img
              :src="
                currentPage._embedded['wp:featuredmedia'][0].media_details.sizes
                  .full.source_url
              "
              class="img-fluid"
            />
          </figure>
        </b-row>
      </b-container>
    </section>

    <section class="section section-module_content">
      <b-container fluid class="section-wrapper">
        <b-row class="d-flex align-items-start">
          <section
            id="affix-relative"
            class="section-resume col-lg-9 offset-lg-1"
          >
            <div class="section-excerpt">
              <header class="section-header">
                <content-header-title class="mb-0">
                  Resumo
                </content-header-title>
              </header>

              <article
                class="section-article"
                v-html="currentPage.content.rendered"
              />

              <article v-if="currentChildrens" class="section-accordion">
                <div
                  v-for="(children, index) in currentChildrens"
                  :key="children.ID"
                  class="section-article_accordion"
                >
                  <div
                    v-b-toggle="`accordion-item_${children.ID}`"
                    class="section-article_toggle d-flex justify-content-between"
                  >
                    <strong>{{ children.post_title }}</strong>

                    <span class="section-article_indicator -opened">_</span>

                    <span class="section-article_indicator -closed">+</span>
                  </div>
                  <b-collapse
                    :id="`accordion-item_${children.ID}`"
                    accordion="my-accordion"
                    role="tabpanel"
                    class="section-article_container"
                    :visible="index === 0 ? true : false"
                  >
                    <div
                      class="section-article_content"
                      v-html="children.post_excerpt"
                    />

                    <custom-button
                      :to="`${$nuxt.$route.path}${children.post_name}/`"
                    >
                      Saiba mais
                    </custom-button>
                  </b-collapse>
                </div>
              </article>
            </div>
          </section>

          <aside class="section-sidebar col-lg-6 offset-lg-1">
            <div id="aside" />

            <affix
              relative-element-selector="#affix-relative"
              :style="`width: ${affixWidth}`"
              :offset="{ bottom: 60, top: 150 }"
              :scroll-affix="true"
            >
              <section v-if="usersRelated" class="section-widget">
                <content-header-title class="mb-0">
                  Advogados especialistas
                </content-header-title>

                <carousel-builder
                  :slices="2"
                  :data="usersRelated"
                  column
                  component="user-card"
                  component-classes="col-9"
                />
              </section>

              <section
                v-if="
                  currentPage.acf.related_areas ||
                    currentPage.acf.related_mercados
                "
                class="section-widget"
              >
                <content-header-title class="mb-0">
                  Atuações relacionadas
                </content-header-title>

                <related-tree
                  v-if="areasTree"
                  class="-widget"
                  type="areas-do-direito"
                  :data="areasTree"
                />

                <related-tree
                  v-if="currentPage.acf.related_mercados"
                  class="-widget"
                  type="mercados"
                  :data="currentPage.acf.related_mercados"
                />
              </section>
            </affix>
          </aside>

          <div class="w-100" />

          <section
            v-if="postsRelated.length > 0"
            ref="posts"
            class="section-posts"
          >
            <div class="section-background col-9 offset-lg-1">
              <content-header-title class="mb-0">
                Notícias relacionadas
              </content-header-title>

              <carousel-builder
                :button="postsMore"
                :data="postsRelated"
                :slices="3"
                background-color="white"
                class="section-posts_carousel"
                component-classes="-list"
                component="post-card"
                view="list"
              />
            </div>
          </section>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import ContentJumboTitle from '@/components/ContentJumboTitle/index.vue'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import CustomButton from '@/components/CustomButton/index.vue'
import CarouselBuilder from '@/components/CarouselBuilder/index.vue'
import RelatedTree from '@/components/RelatedTree/index.vue'
import { find, filter } from 'lodash-es'

export default {
  name: 'AtuacaoInterna',
  components: {
    ContentJumboTitle,
    ContentHeaderTitle,
    CustomButton,
    CarouselBuilder,
    RelatedTree
  },
  props: {},
  data() {
    return {
      affixWidth: 'auto'
    }
  },
  computed: {
    areasTree() {
      return this.treerize(this.currentPage.acf.related_areas)
    },
    postsMore() {
      let type = this.breadcrumbs[1].slug
      type =
        type & (type === 'mercados' || type === 'markets')
          ? 'mercados'
          : 'areas-do-direito'
      const currentTerm = this.breadcrumbs[this.breadcrumbs.length - 1]

      return `/noticias/arquivo/?${type}=${currentTerm.category.term_id}`
    }
  },
  asyncData({ $axios, params }) {
    let slug = params.pathMatch.split('/')
    slug = slug.filter(v => v !== '')
    slug = slug.pop()

    // Get actual page by slug via route params
    return $axios
      .get(`wp/v2/pages/?slug=${slug}&_embed=true`)
      .then(currentPage => {
        // get breadcrumbs data
        return $axios
          .get(`hoc/v1/pages/${currentPage.data[0].id}/breadcrumbs`)
          .then(breadcrumbs => {
            // Get category ID & type from breadcrumbs data
            const category = breadcrumbs.data[breadcrumbs.data.length - 1]
            const categoryId = category.category.term_id
            let type = breadcrumbs.data[1].slug
            type =
              type & (type === 'mercados' || type === 'markets')
                ? 'market'
                : 'areas'
            // Fetch which users are related with category ID
            return $axios
              .get(`hoc/v1/${type}/${categoryId}/users`)
              .then(categoryRelated => {
                // Current areas ID
                const currentCategoryId =
                  breadcrumbs.data[breadcrumbs.data.length - 1].category.term_id

                return Promise.all([
                  // Fetch related users data
                  $axios.$get(`wp/v2/users/?slug=${categoryRelated.data}`),
                  // Fetch children pages content if exists
                  $axios.$get(
                    `hoc/v1/pages/${currentPage.data[0].id}/children`
                  ),
                  // Related posts
                  $axios.$get(
                    `wp/v2/posts?categories=1&${type}=${currentCategoryId}&per_page=9&_embed=true`
                  )
                ]).then(([usersRelated, currentChildrens, postsRelated]) => {
                  return {
                    currentPage: currentPage.data[0],
                    breadcrumbs: breadcrumbs.data,
                    usersRelated: usersRelated,
                    currentChildrens: currentChildrens,
                    postsRelated: postsRelated
                  }
                })
              })
          })
      })
  },
  mounted() {
    this.$nextTick(() => {
      // Get aside width
      this.affixSizes()
      // Refresh aside width every window resize
      window.addEventListener('resize', this.affixSizes)
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.affixSizes)
  },
  methods: {
    treerize(data) {
      let items = data

      if (items) {
        items.forEach(element => {
          const parentID = element.parent

          // Create children array
          element.children = []

          // Find parent
          const parent = find(items, item => {
            return item.term_id === parentID
          })

          // If parent
          if (parent) {
            // If parent children
            if (parent.children) {
              // Push children content
              parent.children.push(element)
            }
          }
        })

        // Remove children original nodes
        items = filter(items, function(o) {
          return o.parent === 0
        })
      }

      return items
    },
    affixSizes() {
      this.affixWidth = window.getComputedStyle(
        document.querySelector('#aside')
      ).width
    },
    excerpt(content) {
      // Remove html comments
      content = content.replace(/<!--.*?-->/g, '')
      // Split all break lines
      content = content.split('\n')
      // Remove empty keys
      content = content.filter(v => v !== '')
      // Retrun only the first paragraph
      return content[0]
    },
    stripped(content) {
      const regex = /(<([^>]+)>)/gi
      return content.replace(regex, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  &-module {
    &_jumbo {
      margin-bottom: $gutter * 2;
    }

    &_content {
      margin-bottom: $gutter * 2;
    }
  }

  &-resume {
    padding-bottom: $gutter * 4;
  }

  &-article {
    margin-bottom: $gutter * 2;
  }

  &-posts {
    margin-bottom: $gutter / 2;
    margin-top: -197px;
    position: relative;
    z-index: 5;

    &_carousel {
      margin-top: -$gutter / 2;
    }
  }
}
</style>
