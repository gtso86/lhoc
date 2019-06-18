<template>
  <main class="main">
    <div class="frame" />

    <section class="section section-module_jumbo">
      <b-container fluid class="section-wrapper">
        <b-row>
          <content-jumbo-title>
            {{ currentPage.name }}
          </content-jumbo-title>
        </b-row>

        <b-row class="d-flex justify-content-center">
          <custom-button @click.native="scrollTalk">
            Fale com o advogado
          </custom-button>
        </b-row>

        <b-row>
          <figure
            v-if="currentPage.acf.laywers_avatar"
            class="section-article_image col-lg-16 offset-lg-1 mb-0"
          >
            <img :src="currentPage.acf.laywers_avatar.url" class="img-fluid" />
          </figure>
        </b-row>
      </b-container>
    </section>

    <section class="section section-module_content">
      <content-headline class="section-article_headline">
        Advogados
      </content-headline>

      <b-container fluid class="section-wrapper">
        <b-row class="d-flex align-items-start">
          <section
            id="affix-relative_advogado"
            class="section-resume col-lg-9 offset-lg-1"
          >
            <div v-if="currentPage.acf.laywers_summary" class="section-summary">
              <header class="section-header">
                <content-header-title class="mb-0">
                  Resumo
                </content-header-title>
              </header>

              <article
                class="section-article"
                v-html="currentPage.acf.laywers_summary"
              />
            </div>

            <div class="section-contact">
              <header class="section-header">
                <content-header-title class="mb-0">
                  Contato
                </content-header-title>
              </header>

              <article class="section-article user-card">
                <a
                  v-if="currentPage.acf.laywers_telephone1"
                  class="user-item user-card_link d-inline-block w-50"
                  :href="`tel:${currentPage.acf.laywers_telephone1}`"
                >
                  {{ currentPage.acf.laywers_telephone1 }}
                </a>

                <a
                  v-if="email"
                  class="user-item user-card_link d-inline-block w-50"
                  :href="`mailto:${email}`"
                >
                  {{ email }}
                </a>

                <a
                  v-if="currentPage.acf.laywers_telephone2"
                  class="user-item user-card_link d-inline-block w-50"
                  :href="`tel:${currentPage.acf.laywers_telephone2}`"
                >
                  {{ currentPage.acf.laywers_telephone2 }}
                </a>

                <a
                  v-if="currentPage.acf.laywers_link"
                  class="user-item user-card_link d-inline-block w-50"
                  :href="currentPage.acf.laywers_link"
                  target="_blank"
                >
                  LinkedIn
                </a>

                <div class="w-100" />

                <custom-button
                  v-if="vcard"
                  :href="currentPage.acf.laywers_vcard.url"
                >
                  VCARD
                </custom-button>
              </article>
            </div>

            <div
              v-if="currentPage.acf.laywers_languages"
              class="section-languages"
            >
              <header class="section-header">
                <content-header-title class="mb-0">
                  Idiomas
                </content-header-title>
              </header>

              <article class="user-card">
                <span
                  v-for="(language, index) in currentPage.acf.laywers_languages"
                  :key="index"
                >
                  {{ language.languages_language }}
                  <span
                    v-if="index < currentPage.acf.laywers_languages.length - 1"
                  >
                    {{
                      index == currentPage.acf.laywers_languages.length - 2
                        ? 'e'
                        : ','
                    }}
                  </span>
                </span>
              </article>
            </div>

            <div v-if="currentPage.acf.laywers_about" class="section-about">
              <header class="section-header">
                <content-header-title class="mb-0">
                  Sobre
                </content-header-title>
              </header>

              <article
                class="section-article"
                v-html="currentPage.acf.laywers_about"
              />
            </div>

            <div
              v-if="currentPage.acf.laywers_formation"
              class="section-education"
            >
              <header class="section-header">
                <content-header-title class="mb-0">
                  Formação
                </content-header-title>
              </header>

              <article class="user-card row">
                <div
                  v-for="(item, index) in currentPage.acf.laywers_formation"
                  :key="index"
                  class="user-item user-card_link col-9"
                >
                  <strong v-if="item.formation_year">
                    {{ item.formation_year }}
                  </strong>

                  <br v-if="item.formation_year" />

                  <span v-if="item.formation_label">
                    {{ item.formation_label }}
                  </span>
                </div>
              </article>
            </div>

            <div
              v-if="currentPage.acf.laywers_admissions"
              class="section-education"
            >
              <header class="section-header">
                <content-header-title class="mb-0">
                  Admissão em órgãos e associações
                </content-header-title>
              </header>

              <article class="user-card row">
                <div
                  v-for="(item, index) in currentPage.acf.laywers_admissions"
                  :key="index"
                  class="user-item user-card_link col-9"
                >
                  {{ item.admissions_title }}
                </div>
              </article>
            </div>
          </section>

          <aside class="section-sidebar col-lg-6 offset-lg-1">
            <div id="aside" />

            <affix
              ref="affix"
              relative-element-selector="#affix-relative_advogado"
              :style="`width: ${affixWidth}`"
              :offset="{ bottom: 0, top: 150 }"
              :scroll-affix="true"
            >
              <section
                v-if="currentPage.acf.laywers_areas"
                class="section-widget"
              >
                <content-header-title class="mb-0">
                  Áreas do direito
                </content-header-title>

                <related-tree
                  v-if="areasTree"
                  class="-widget"
                  type="areas-do-direito"
                  :data="areasTree"
                />
              </section>

              <section
                v-if="currentPage.acf.laywers_markets"
                class="section-widget"
              >
                <content-header-title class="mb-0">
                  Mercados
                </content-header-title>

                <related-tree
                  v-if="currentPage.acf.laywers_markets"
                  class="-widget"
                  type="mercados"
                  :data="currentPage.acf.laywers_markets"
                />
              </section>

              <section v-if="fetchPrizes" class="section-widget">
                <content-header-title class="mb-0">
                  Reconhecimento
                </content-header-title>

                <prizes-group
                  :list="fetchPrizes"
                  class="row flex-column"
                  stamp-class="col align-items-center -list"
                />
              </section>
            </affix>
          </aside>
        </b-row>
      </b-container>
    </section>

    <section
      v-if="currentPage.acf.laywers_books"
      class="section section-module_books"
    >
      <b-container fluid class="section-wrapper">
        <b-row class="d-flex align-items-start">
          <section class="section-box col-lg-16 offset-lg-1">
            <header class="section-header">
              <content-header-title class="mb-0">
                Livros
              </content-header-title>
            </header>

            <article>
              <carousel-builder
                :slices="6"
                :data="currentPage.acf.laywers_books"
                column
                component="item-card"
                component-classes="col-6"
              />
            </article>
          </section>
        </b-row>
      </b-container>
    </section>

    <section
      v-if="currentPage.acf.laywers_articles"
      class="section section-module_articles"
    >
      <b-container fluid class="section-wrapper">
        <b-row class="d-flex align-items-start">
          <section class="section-box col-lg-16 offset-lg-1">
            <header class="section-header">
              <content-header-title class="mb-0">
                Artigos
              </content-header-title>
            </header>

            <article>
              <carousel-builder
                :slices="6"
                :data="currentPage.acf.laywers_articles"
                column
                component="item-card"
                component-classes="col-6"
              />
            </article>
          </section>
        </b-row>
      </b-container>
    </section>

    <section
      v-if="postsRelated || publicationsRelated || eventsRelated"
      class="section section-module_related"
    >
      <b-container fluid class="section-wrapper">
        <b-row class="d-flex align-items-start">
          <section class="section-box section-related col-lg-16 offset-lg-1">
            <div class="section-background">
              <header class="section-header">
                <content-header-title class="mb-0">
                  Notícias e outras publicações
                </content-header-title>
              </header>

              <b-tabs
                active-nav-item-class=""
                active-tab-class=""
                class="section-tabs w-100"
                content-class="section-tabs_content"
                nav-class="section-tabs_nav"
                nav-wrapper-class="section-tabs_nav-wrapper"
                tag="section"
                @input="changeTab"
              >
                <b-tab
                  v-if="postsRelated"
                  :active="true"
                  class="section-article"
                  tag="article"
                  title="Notícias"
                >
                  <carousel-builder
                    key="postsRelated"
                    :button="postsMore"
                    :data="postsRelated"
                    :slices="2"
                    background-color="white"
                    class="section-posts_carousel"
                    column
                    component-classes="d-flex flex-column -card"
                    wrapper-classes="col-lg-9"
                    component="post-card"
                    inject-classes
                    view="card"
                  />
                </b-tab>

                <b-tab
                  v-if="publicationsRelated"
                  class="section-article"
                  tag="article"
                  title="Publicações"
                >
                  <carousel-builder
                    key="publicationsRelated"
                    :button="publicationsMore"
                    :data="publicationsRelated"
                    :slices="2"
                    background-color="white"
                    class="section-posts_carousel"
                    column
                    component-classes="d-flex flex-column -card"
                    wrapper-classes="col-lg-9"
                    component="post-card"
                    inject-classes
                    view="card"
                  />
                </b-tab>

                <b-tab
                  v-if="eventsRelated"
                  title="Eventos"
                  tag="article"
                  class="section-article"
                >
                  <carousel-builder
                    key="eventsRelated"
                    :button="eventsMore"
                    :data="eventsRelated"
                    :slices="2"
                    background-color="white"
                    class="section-posts_carousel"
                    column
                    component-classes="d-flex flex-column -card"
                    wrapper-classes="col-lg-9"
                    component="post-card"
                    inject-classes
                    view="card"
                  />
                </b-tab>
              </b-tabs>
            </div>
          </section>
        </b-row>
      </b-container>
    </section>

    <section id="anchor-talk" class="section section-module_form">
      <b-container fluid class="section-wrapper">
        <b-row>
          <section class="section-box col-lg-8 offset-lg-5">
            <header class="section-header text-center">
              <content-article-title>
                Fale com {{ currentPage.name }}
              </content-article-title>
            </header>

            <form>
              <fieldset>
                <b-row>
                  <div class="custom-input_wrapper col-lg-18">
                    <input
                      v-model="form.nome"
                      v-validate="'required'"
                      type="text"
                      name="nome"
                      required
                      class="custom-input_field"
                      @keyup="checkFill"
                    />

                    <strong class="custom-input_label">Nome</strong>

                    <span class="custom-input_error">
                      {{ errors.first('nome') }}
                    </span>
                  </div>
                </b-row>

                <b-row>
                  <div class="custom-input_wrapper col-lg-10">
                    <input
                      v-model="form.email"
                      v-validate="'required|email'"
                      type="email"
                      name="email"
                      required
                      class="custom-input_field"
                      @keyup="checkFill"
                    />

                    <strong class="custom-input_label">E-mail</strong>

                    <span class="custom-input_error">
                      {{ errors.first('email') }}
                    </span>
                  </div>

                  <div class="custom-input_wrapper col-lg-8">
                    <input
                      v-model="form.telefone"
                      v-validate="'required'"
                      v-mask="['(##) ####-####', '(##) #####-####']"
                      type="tel"
                      name="telefone"
                      required
                      class="custom-input_field"
                      @keyup="checkFill"
                    />

                    <strong class="custom-input_label">Telefone</strong>

                    <span class="custom-input_error">
                      {{ errors.first('telefone') }}
                    </span>
                  </div>
                </b-row>

                <b-row>
                  <div class="custom-input_wrapper col-lg-18">
                    <input
                      v-model="form.empresa"
                      v-validate="'required'"
                      type="text"
                      name="empresa"
                      required
                      class="custom-input_field"
                      @keyup="checkFill"
                    />

                    <strong class="custom-input_label">Empresa</strong>

                    <span class="custom-input_error">
                      {{ errors.first('empresa') }}
                    </span>
                  </div>
                </b-row>

                <b-row>
                  <div class="custom-input_wrapper col-lg-18">
                    <textarea-autosize
                      v-model="form.mensagem"
                      v-validate="'required'"
                      name="mensagem"
                      class="custom-input_field"
                      :class="[errorMensagem ? 'invalid' : '']"
                      :min-height="27"
                    />

                    <strong class="custom-input_label">Mensagem</strong>

                    <span class="custom-input_error">
                      {{ errors.first('mensagem') }}
                    </span>
                  </div>
                </b-row>
              </fieldset>

              <div class="text-right">
                <custom-button @submit="submitForm">Enviar</custom-button>
              </div>
            </form>
          </section>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import ContentJumboTitle from '@/components/ContentJumboTitle/index.vue'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import ContentArticleTitle from '@/components/ContentArticleTitle/index.vue'
import CustomButton from '@/components/CustomButton/index.vue'
import PrizesGroup from '@/components/PrizesGroup/index.vue'
import CarouselBuilder from '@/components/CarouselBuilder/index.vue'
import RelatedTree from '@/components/RelatedTree/index.vue'
import { Validator } from 'vee-validate'
import { find, filter } from 'lodash-es'
const VueScrollTo = require('vue-scrollto')

export default {
  name: 'AdvogadosInterna',
  components: {
    ContentJumboTitle,
    ContentHeaderTitle,
    ContentHeadline,
    ContentArticleTitle,
    CustomButton,
    PrizesGroup,
    CarouselBuilder,
    RelatedTree
  },
  props: {},
  data() {
    return {
      form: {
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        mensagem: ''
      },
      email: '',
      vcard: '',
      affixWidth: 'auto'
    }
  },
  computed: {
    areasTree() {
      return this.treerize(this.currentPage.acf.laywers_areas)
    },
    postsMore() {
      return `/noticias/arquivo/?advogado=${this.currentPage.slug}`
    },
    publicationsMore() {
      return `/noticias/publicacoes/?advogado=${this.currentPage.slug}`
    },
    eventsMore() {
      return `/noticias/eventos/?advogado=${this.currentPage.slug}`
    },
    errorMensagem() {
      return !!this.errors.first('mensagem')
    }
  },
  asyncData({ $axios, params }) {
    // Get actual page by slug via route params
    return $axios
      .get(`wp/v2/users/?slug=${params.advogado}`)
      .then(currentPage => {
        const autoNews = currentPage.data[0].acf.laywers_news.news_auto
        let fetchNews = ''
        if (autoNews) {
          fetchNews = `hoc/v1/posts/?author=${
            currentPage.data[0].slug
          }&category=1`
        } else {
          fetchNews = `/wp/v2/posts/?include=${
            currentPage.data[0].acf.laywers_news.news_list
          }&orderby=include&_embed`
        }

        const autoPublications =
          currentPage.data[0].acf.laywers_publications.publications_auto
        let fetchPublications = ''
        if (autoPublications) {
          fetchPublications = `hoc/v1/posts/?author=${
            currentPage.data[0].slug
          }&category=111`
        } else {
          fetchPublications = `/wp/v2/posts/?include=${
            currentPage.data[0].acf.laywers_publications.publications_list
          }&orderby=include&_embed`
        }

        const autoEvents = currentPage.data[0].acf.laywers_events.events_auto
        let fetchEvents = ''
        if (autoEvents) {
          fetchEvents = `hoc/v1/posts/?author=${
            currentPage.data[0].slug
          }&category=112`
        } else {
          fetchEvents = `/wp/v2/posts/?include=${
            currentPage.data[0].acf.laywers_events.events_list
          }&orderby=include&_embed`
        }

        return Promise.all([
          // Fetch posts
          $axios.$get(fetchNews),
          // Fetch children pages content if exists
          $axios.$get(fetchPublications),
          // Related posts
          $axios.$get(fetchEvents),
          // Prizes
          $axios.get(
            `wp/v2/prizes/?include=${
              currentPage.data[0].acf.laywers_prizes
            }&orderby=include&_embed`
          )
        ]).then(
          ([postsRelated, publicationsRelated, eventsRelated, fetchPrizes]) => {
            postsRelated = autoNews ? postsRelated.posts : postsRelated
            publicationsRelated = autoPublications
              ? publicationsRelated.posts
              : publicationsRelated
            eventsRelated = autoEvents ? eventsRelated.posts : eventsRelated

            return {
              currentPage: currentPage.data[0],
              postsRelated: postsRelated,
              publicationsRelated: publicationsRelated,
              eventsRelated: eventsRelated,
              fetchPrizes: fetchPrizes.data
            }
          }
        )
      })
  },
  mounted() {
    this.email = this.currentPage.contact
    this.vcard = this.currentPage.acf.laywers_vcard.url

    this.$nextTick(() => {
      // Get aside width
      this.affixSizes()
      // Refresh aside width every window resize
      window.addEventListener('resize', this.affixSizes)
    })
  },
  created() {
    const dictionary = {
      pt: {
        messages: {
          required: 'Campo requerido',
          email: 'E-mail inválido'
        }
      }
    }

    Validator.localize('pt', dictionary.pt)

    // const dict = {
    //   custom: {
    //     telefone: {
    //       required: 'Campo'
    //     }
    //   }
    // }

    // Validator.localize('pt', dict)
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
    changeTab(tabIndex) {
      window.dispatchEvent(new Event('resize'))
    },
    scrollTalk() {
      VueScrollTo.scrollTo('#anchor-talk', 1000, { offset: -180 })
    },
    checkFill(e) {
      const val = e.target.value
      e.target.classList.add('-filled')
      if (!val) {
        e.target.classList.remove('-filled')
      }
    },
    submitForm() {
      alert('to do: enviar')
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  &[class*='module'] {
    margin-bottom: $gutter * 2;
  }

  &-module {
    &_jumbo {
      margin-bottom: $gutter * 2;
    }

    &_content {
      margin-bottom: $gutter * 1.5 !important;

      .section-article_headline {
        left: 104%;
        top: 360px;
        transform-origin: left center;
        transform: rotate(-90deg) translateY(-50%) translateX(-75%);
      }

      .section-education:last-child {
        margin-bottom: 0;

        .user-card {
          margin-bottom: $gutter / 2;
        }
      }
    }
  }

  &-article {
    margin-bottom: $gutter * 2;

    &_image {
      margin-top: $gutter * 1.5;
    }
  }

  &-related {
    .section-background:before {
      left: $gutter / -2;
    }

    &_carousel {
      // margin-top: -$gutter / 2;
    }
  }
}

.user {
  &-item {
    float: left;
    margin-bottom: $gutter / 2;
  }

  &-card {
    margin-bottom: $gutter * 2;

    &_link {
      color: inherit;
    }
  }
}
</style>

<style scoped>
.section-tabs >>> .nav-link {
  margin-right: 60px;
}
</style>
