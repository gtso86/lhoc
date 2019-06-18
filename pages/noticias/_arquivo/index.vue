<template>
  <main class="main">
    <div class="frame" />

    <section class="section section-module_list">
      <content-headline class="section-article_headline">
        Notícias
      </content-headline>

      <b-container fluid class="section-wrapper">
        <b-row>
          <section class="section section-related col-lg-14 offset-lg-2">
            <header class="section-header">
              <content-header-title class="mb-0">
                {{ allContent }}
              </content-header-title>
            </header>
          </section>
        </b-row>

        <b-row>
          <post-filter />
        </b-row>

        <b-row>
          <section
            v-if="paginatedData.length > 0"
            class="section section-list col-lg-14 offset-lg-2"
          >
            <post-card
              v-for="(item, index) in paginatedData"
              :key="index"
              view="list"
              :data="item"
              class="-list -half"
              component-classes="-list -half"
            />
          </section>

          <section
            v-else
            class="section section-notfound col-lg-14 offset-lg-2"
          >
            <content-article-title class="text-center">
              Nenhum conteúdo encontrado
            </content-article-title>
          </section>
        </b-row>

        <b-row>
          <nav
            class="archive-navigation col-lg-14 offset-lg-2 d-flex w-100 justify-content-between align-items-center"
          >
            <div class="archive-selector">
              <div class="archive-selector_wrapper">
                {{ pageNumber + 1 }}

                <arrow class="archive-selector_arrow" />
              </div>

              <select class="archive-selector_select" @change="changePage">
                <option v-for="(count, index) in pageCount" :key="index">
                  {{ index + 1 }}
                </option>
              </select>
            </div>

            <div class="archive-navigation_indicator">
              Página {{ pageNumber + 1 }} de {{ pageCount }}
            </div>

            <aside class="archive-arrows d-flex">
              <div
                class="archive-arrow -left"
                :class="[pageNumber === 0 ? '-disabled' : '']"
                @click="prevPage"
              >
                <arrow class="archive-arrow_icon" />
              </div>

              <div
                class="archive-arrow -right"
                :class="[pageNumber >= pageCount - 1 ? '-disabled' : '']"
                @click="nextPage"
              >
                <arrow class="archive-arrow_icon" />
              </div>
            </aside>
          </nav>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
/* eslint-disable no-console */
import Arrow from '@/assets/images/hoc-icon_arrow.svg'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import ContentArticleTitle from '@/components/ContentArticleTitle/index.vue'
import PostCard from '@/components/PostCard/index.vue'
import PostFilter from '@/components/PostFilter/index.vue'

export default {
  name: 'NoticiasArquivo',
  watchQuery: true,
  scrollToTop: false,
  components: {
    Arrow,
    ContentHeaderTitle,
    ContentHeadline,
    ContentArticleTitle,
    PostCard,
    PostFilter
  },
  props: {},
  data() {
    return {
      pageNumber: 0,
      perPage: 1,
      teste: this.$nuxt.$route
    }
  },
  computed: {
    pageCount() {
      if (this.archiveList) {
        const l = this.archiveList.length
        const s = this.perPage

        return Math.ceil(l / s)
      } else {
        return 1
      }
    },
    paginatedData() {
      const start = this.pageNumber * this.perPage
      const end = start + this.perPage

      if (this.archiveList) {
        return this.archiveList.slice(start, end)
      } else {
        return []
      }
    },
    allContent() {
      let titleString = ''

      if (this.$nuxt.$route.params.arquivo === 'arquivo') {
        titleString = 'Todas as notícias'
      }

      if (this.$nuxt.$route.params.arquivo === 'publicacoes') {
        titleString = 'Todas as publicações'
      }

      if (this.$nuxt.$route.params.arquivo === 'eventos') {
        titleString = 'Todos os eventos'
      }

      return titleString
    }
  },
  asyncData({ $axios, params, route }) {
    // Fetch list content
    let source = ''
    let query = ''

    if (params.arquivo === 'arquivo') {
      source = 'category=1'
    }

    if (params.arquivo === 'publicacoes') {
      source = 'category=111'
    }

    if (params.arquivo === 'eventos') {
      source = 'category=112'
    }

    if (route.query.advogado) {
      query += `&author=${route.query.advogado}`
    }

    if (route.query['areas-do-direito']) {
      query += `&areas-do-direito=${route.query['areas-do-direito']}`
    }

    if (route.query.mercados) {
      query += `&mercados=${route.query.mercados}`
    }

    if (route.query.posts_per_page) {
      query += `&posts_per_page=${route.query.posts_per_page}`
    }

    return $axios.get(`hoc/v1/posts/?${source}${query}`).then(archiveList => {
      return {
        archiveInfo: {
          request: archiveList.data.request,
          query_vars: archiveList.data.query_vars,
          query: archiveList.data.query,
          found_posts: archiveList.data.found_posts,
          post_count: archiveList.data.post_count
        },
        archiveList: archiveList.data.posts
      }
    })
  },
  mounted() {},
  created() {},
  destroyed() {},
  methods: {
    changePage(event) {
      this.pageNumber = event.target.value - 1
    },
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      this.pageNumber--
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  &-module {
    &_list {
      min-height: calc(100vh - 180px);

      .section-article_headline {
        left: 104%;
        top: 125%;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-75%);
      }
    }
  }

  &-notfound {
    margin-top: $gutter;
  }
}

.archive {
  &-navigation {
    margin-top: $gutter * 2;

    &_indicator {
      font-family: $spectra;
      font-size: 1.6725vw;
    }
  }

  &-selector {
    border: 1px solid $cooper;
    color: $black;
    cursor: pointer;
    font-family: $spectra;
    font-size: 24px;
    line-height: $gutter;
    padding: 0 30px;
    position: relative;
    text-decoration: none;
    white-space: nowrap;

    // &:hover {
    //   .archive-select_arrow {
    //     transform: rotate(270deg) translateX(-5px);
    //   }
    // }

    &_select {
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    &_arrow {
      height: 20px;
      margin-left: $gutter / 2;
      transform: rotate(270deg);
      transition: all 0.5s ease;
    }
  }

  &-arrow {
    cursor: pointer;
    height: 30px;
    transition: all 0.5s ease;
    width: 30px;

    &.-disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &_icon {
      height: 100%;
      width: 100%;
    }

    &.-left {
      margin: 0 $gutter / 2;
    }

    &.-right {
      transform: rotate(180deg) !important;
    }
  }
}
</style>
