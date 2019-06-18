<template>
  <main class="main">
    <div class="frame" />

    <section class="section section-module_intro">
      <div
        class="section-article_placeholder row d-flex justify-content-end w-100"
      >
        <figure
          v-if="currentPage._embedded['wp:featuredmedia']"
          class="section-article_image col-lg-9 p-0 m-0"
        >
          <img
            :src="
              currentPage._embedded['wp:featuredmedia'][0].media_details.sizes
                .full.source_url
            "
            class="img-fluid"
          />
        </figure>
      </div>

      <b-container fluid class="section-wrapper">
        <header class="section-header row">
          <content-header-title class="col-auto offset-lg-2 mb-0">
            {{ currentPage.title.rendered }}
          </content-header-title>
        </header>

        <b-row>
          <article class="section-article offset-lg-2 col-lg-12">
            <header>
              <content-article-title class="section-article_title">
                {{ stripped(currentPage.content.rendered) }}
              </content-article-title>
            </header>
          </article>
        </b-row>
      </b-container>
    </section>

    <section class="section section-module_areas">
      <div class="section-article_placeholder row d-flex w-100">
        <figure
          v-if="areasPage._embedded['wp:featuredmedia']"
          class="section-article_image col-lg-6 p-0 m-0"
        >
          <img
            :src="
              areasPage._embedded['wp:featuredmedia'][0].media_details.sizes
                .full.source_url
            "
            class="img-fluid"
          />
        </figure>
      </div>

      <content-headline class="section-article_headline">
        {{ areasPage.title.rendered }}
      </content-headline>

      <b-container fluid class="section-wrapper">
        <header class="section-header row">
          <content-header-subtitle
            :id="`anchor-${slug(areasPage.title.rendered)}`"
            class="col-auto offset-lg-2"
          >
            {{ areasPage.title.rendered }}
          </content-header-subtitle>
        </header>

        <b-row class="">
          <b-tabs
            content-class="section-tabs_content"
            nav-class="section-tabs_nav justify-content-between"
            nav-wrapper-class="section-tabs_nav-wrapper col-lg-18 offset-lg-0"
            active-nav-item-class=""
            active-tab-class="col col-lg-10 offset-lg-6"
            class="section-tabs w-100"
            tag="section"
          >
            <b-tab
              v-for="(area, index) in areasTree"
              :key="area.ID"
              :title="area.post_title"
              tag="article"
              class="section-article"
              :active="index === 0 ? true : false"
            >
              <header class="section-article_intro">
                <div
                  class="section-article_excerpt"
                  v-html="area.post_excerpt"
                />

                <custom-button
                  :to="
                    `/${currentPage.slug}/${areasPage.slug}/${area.post_name}/`
                  "
                >
                  Saiba mais
                </custom-button>
              </header>

              <div
                v-for="(children, i) in area.children"
                :key="children.ID"
                class="section-article_accordion"
              >
                <div
                  v-b-toggle="`accordion-areas_${children.ID}`"
                  class="section-article_toggle d-flex justify-content-between"
                >
                  <strong>{{ children.post_title }}</strong>

                  <span class="section-article_indicator -opened">_</span>

                  <span class="section-article_indicator -closed">+</span>
                </div>
                <b-collapse
                  :id="`accordion-areas_${children.ID}`"
                  :accordion="`my-accordion_areas-${area.post_name}`"
                  role="tabpanel"
                  class="section-article_container"
                  :visible="i === 0 ? true : false"
                >
                  <div
                    class="section-article_content"
                    v-html="children.post_excerpt"
                  />

                  <custom-button
                    :to="
                      `/${currentPage.slug}/${areasPage.slug}/${
                        area.post_name
                      }/${children.post_name}/`
                    "
                  >
                    Saiba mais
                  </custom-button>
                </b-collapse>
              </div>
            </b-tab>
          </b-tabs>
        </b-row>
      </b-container>
    </section>

    <section class="section section-module_mercados">
      <div
        class="section-article_placeholder row d-flex justify-content-end w-100"
      >
        <figure
          v-if="mercadosPage._embedded['wp:featuredmedia']"
          class="section-article_image col-lg-6 p-0 m-0"
        >
          <img
            :src="
              mercadosPage._embedded['wp:featuredmedia'][0].media_details.sizes
                .full.source_url
            "
            class="img-fluid"
          />
        </figure>
      </div>

      <content-headline class="section-article_headline">
        {{ mercadosPage.title.rendered }}
      </content-headline>

      <b-container fluid class="section-wrapper">
        <header class="section-header row">
          <content-header-subtitle
            :id="`anchor-${slug(mercadosPage.title.rendered)}`"
            class="col-auto offset-lg-2"
          >
            {{ mercadosPage.title.rendered }}
          </content-header-subtitle>
        </header>

        <b-row class="">
          <section class="section-tabs col-lg-10 offset-lg-2">
            <article class="section-article">
              <div
                v-for="(mercado, index) in mercados"
                :key="mercado.ID"
                class="section-article_accordion"
              >
                <div
                  v-b-toggle="`accordion-mercados_${mercado.ID}`"
                  class="section-article_toggle d-flex justify-content-between"
                >
                  <strong>{{ mercado.post_title }}</strong>

                  <span class="section-article_indicator -opened">_</span>

                  <span class="section-article_indicator -closed">+</span>
                </div>
                <b-collapse
                  :id="`accordion-mercados_${mercado.ID}`"
                  accordion="my-accordion_mercados"
                  role="tabpanel"
                  class="section-article_container"
                  :visible="index === 0 ? true : false"
                >
                  <div
                    class="section-article_content"
                    v-html="mercado.post_excerpt"
                  />

                  <custom-button
                    :to="
                      `/${currentPage.slug}/${mercadosPage.slug}/${
                        mercado.post_name
                      }/`
                    "
                  >
                    Saiba mais
                  </custom-button>
                </b-collapse>
              </div>
            </article>
          </section>
        </b-row>
      </b-container>
    </section>

    <content-section
      v-for="(slider, index) in sliders"
      :key="index"
      :class="`section-module_cross slider-${slider.acf_fc_layout}`"
      :data="slider"
    />
  </main>
</template>

<script>
import ContentSection from '@/components/ContentSection/index.vue'
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import ContentHeaderSubtitle from '@/components/ContentHeaderSubtitle/index.vue'
import ContentArticleTitle from '@/components/ContentArticleTitle/index.vue'
import CustomButton from '@/components/CustomButton/index.vue'
import { find, filter } from 'lodash-es'
const VueScrollTo = require('vue-scrollto')

export default {
  name: 'Atuacao',
  components: {
    ContentSection,
    ContentHeadline,
    ContentHeaderTitle,
    ContentHeaderSubtitle,
    ContentArticleTitle,
    CustomButton
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    areasTree() {
      let areas = this.areas

      areas.forEach(element => {
        const parentID = element.post_parent
        // Find parent
        const parent = find(areas, item => {
          return item.ID === parentID
        })

        // If parent
        if (parent) {
          // If parent children
          if (parent.children) {
            // Push children content
            parent.children.push(element)
          }
        } else {
          // Create children array
          element.children = []
        }
      })

      // Remove children original nodes
      areas = filter(areas, function(o) {
        return o.children
      })

      return areas
    }
  },
  asyncData({ $axios, params }) {
    return $axios.$get('wp/v2/pages/86?_embed=true').then(currentPage => {
      return Promise.all([
        $axios.$get('hoc/v1/pages/86/breadcrumbs'),
        $axios.$get('wp/v2/pages/88?_embed=true'),
        $axios.$get('hoc/v1/pages/88/children'),
        $axios.$get('wp/v2/pages/90?_embed=true'),
        $axios.$get('hoc/v1/pages/90/children')
      ]).then(
        ([
          breadcrumbs,
          areasPage,
          areasChildren,
          mercadosPage,
          mercadosChildren
        ]) => {
          return {
            currentPage: currentPage,
            sliders: [currentPage.acf],
            breadcrumbs: breadcrumbs,
            areasPage: areasPage,
            areas: areasChildren,
            mercadosPage: mercadosPage,
            mercados: mercadosChildren
          }
        }
      )
    })
  },
  mounted() {
    let hash = window.location.hash
    hash = hash.replace('#', '')
    if (hash) {
      setTimeout(
        () => VueScrollTo.scrollTo(`#anchor-${hash}`, 1000, { offset: -180 }),
        500
      )
    }
  },
  methods: {
    slug(value) {
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
    &_intro {
      margin-bottom: $gutter;

      .section-article_placeholder {
        bottom: inherit;
        margin-top: (128px + 60px) / 2;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &_areas {
      min-height: 1125px;

      .section-article_headline {
        left: 104%;
        top: 120px;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-75%);
        white-space: inherit;
        width: 70vw;
      }

      .section-article_placeholder {
        bottom: inherit;
        top: 340px;
      }
    }

    &_mercados {
      .section-article_headline {
        left: 104%;
        top: 360px;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-75%);
      }

      .section-article_placeholder {
        bottom: inherit;
        top: 120px;
      }
    }

    &_cross {
    }
  }

  &-article {
    &_intro {
      margin-bottom: $gutter * 2;

      .button {
        margin-top: 74px;
      }
    }
  }
}
</style>
