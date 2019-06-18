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
          <article class="section-article col-lg-12 offset-lg-2">
            <header>
              <content-header-subtitle>
                {{ currentPage.acf.intro_title }}
              </content-header-subtitle>
              <div v-html="currentPage.acf.intro_content" />
            </header>
          </article>

          <form class="section-search col-lg-14 offset-lg-2">
            <div class="d-flex">
              <input
                type="text"
                class="section-search_input p-0"
                placeholder="Encontre quem você procura"
              />

              <button class="section-search_button">
                <icon-search class="img-fluid" />
              </button>
            </div>
          </form>
        </b-row>
      </b-container>
    </section>

    <section class="section section-module_laywers">
      <content-headline class="section-article_headline">
        {{ currentPage.title.rendered }}
      </content-headline>

      <b-container fluid class="section-wrapper">
        <b-row>
          <div class="col-lg-14 offset-lg-2">
            <b-row>
              <template v-for="n in 10">
                <user-card
                  v-for="(user, index) in usersRelated"
                  :key="`${index}${n}`"
                  :data="user"
                  class="col-auto"
                  style="width: 20%"
                />
              </template>
            </b-row>
          </div>
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
import UserCard from '@/components/UserCard/index.vue'
import IconSearch from '@/assets/images/hoc-icon_search.svg'

export default {
  name: 'Advogados',
  components: {
    ContentSection,
    ContentHeadline,
    ContentHeaderTitle,
    ContentHeaderSubtitle,
    UserCard,
    IconSearch
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  asyncData({ $axios, params }) {
    return $axios.$get('wp/v2/pages/84?_embed=true').then(currentPage => {
      return Promise.all([
        $axios.$get('hoc/v1/pages/84/breadcrumbs'),
        $axios.$get(
          `wp/v2/users/?slug=admin,alexandre-domingues-serafim,amanda-salis-guazzelli`
        )
      ]).then(([breadcrumbs, usersRelated]) => {
        return {
          currentPage: currentPage,
          sliders: [currentPage.acf],
          breadcrumbs: breadcrumbs,
          usersRelated: usersRelated
        }
      })
    })
  },
  mounted() {},
  methods: {
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

    &_laywers {
      .section-article_headline {
        left: 104%;
        top: 360px;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-50%);
      }
    }
  }

  &-search {
    margin-top: $gutter * 1.335;

    &_input {
      background: transparent;
      border: none;
      color: $black;
      font-family: $spectra;
      font-size: 3.5vw;
      outline: none;
      text-transform: capitalize;
      width: 44vw;

      &::-webkit-input-placeholder {
        text-transform: initial;
      }

      &::-moz-placeholder {
        text-transform: initial;
      }
    }

    &_button {
      background: transparent;
      border: none;
      color: $black;
      font-family: $spectra;
      outline: none;
      position: relative;
      width: 3.5vw;
    }
  }
}
</style>
