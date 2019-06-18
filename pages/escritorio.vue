<template>
  <main class="main">
    <div class="frame" />

    <section class="section section-module_article">
      <content-headline class="section-article_headline">
        {{ currentPage.title.rendered }}
      </content-headline>

      <b-container fluid class="section-wrapper">
        <b-row>
          <content-header-title class="col-auto offset-lg-2">
            {{ currentPage.title.rendered }}
          </content-header-title>
        </b-row>

        <b-row>
          <section class="section section-article">
            <div
              class="section-article_post"
              v-html="currentPage.content.rendered"
            />
          </section>
        </b-row>
      </b-container>
    </section>

    <section class="section section-module_data">
      <b-container fluid>
        <b-row>
          <div
            class="col-lg-14 offset-lg-2 d-flex align-items-center justify-content-around"
          >
            <div class="section-data">
              <strong>{{ currentPage.acf.office_years }}</strong>
              <span>
                +de <br />
                anos
              </span>
            </div>

            <div class="section-data">
              <strong>{{ currentPage.acf.office_laywers }}</strong>
              <span>
                +de <br />
                advogados
              </span>
            </div>
          </div>
        </b-row>
      </b-container>
    </section>

    <content-prizes
      v-for="(slider, index) in sliders"
      :key="index"
      :class="`section-module_cross slider-${slider.acf_fc_layout}`"
      :data="slider"
    />
  </main>
</template>

<script>
// import ContentSection from '@/components/ContentSection/index.vue'
import ContentPrizes from '@/components/ContentPrizes/index.vue'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import ContentHeadline from '@/components/ContentHeadline/index.vue'

export default {
  name: 'Escritorio',
  components: {
    ContentPrizes,
    ContentHeaderTitle,
    ContentHeadline
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  asyncData({ $axios }) {
    return $axios
      .get(
        `http://lhoc.inwip.com.br/painel/web/wp-json/wp/v2/pages/444?_embed=true`
      )
      .then(currentPage => {
        return {
          currentPage: currentPage.data,
          sliders: [currentPage.data.acf]
        }
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
  &-module {
    &_article {
      margin-bottom: 0;

      .section-article_headline {
        left: 103%;
        top: 100vh;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-75%);
      }
    }

    &_cross {
      min-height: 100vh;
      margin-bottom: 0;
    }

    &_data {
      margin-bottom: 0;
    }
  }

  &-data {
    color: $cooper;
    font-family: $spectra;
    position: relative;

    strong {
      font-size: 15vw;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 1px $cooper;
    }

    span {
      bottom: 20%;
      font-size: 3vw;
      line-height: 1;
      position: absolute;
    }
  }
}
</style>

<style scoped>
.section-article_post >>> .wp-block-image.alignwide {
  margin-bottom: 90px;
  margin-top: 90px;
}
</style>
