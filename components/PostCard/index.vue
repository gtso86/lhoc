<template>
  <div :class="[wrapperClasses, 'post-wrapper']">
    <article
      :class="[componentClasses, 'post-card', view !== 'card' ? 'd-flex' : '']"
    >
      <div
        :class="[
          'post-card_top w-100 d-flex',
          view === 'card' ? 'flex-column' : ''
        ]"
      >
        <header class="post-card_header order-2">
          <h1 class="post-card_title">
            <a
              v-if="isExternal"
              :href="url"
              target="_blank"
              v-html="theTitle"
            />

            <nuxt-link v-else :to="url" v-html="theTitle" />
          </h1>

          <post-authors :data="data.ordered_authors" />
          <post-meta v-if="theTerms[2] || theTerms[3]" :data="theTerms" />
        </header>

        <div v-if="view === 'card'" class="w-100" />

        <time
          :class="[
            'post-card_date order-1',
            view !== 'card' ? 'text-center' : ''
          ]"
          :datetime="data.theDate"
        >
          <template v-if="view === 'card'">
            <a v-if="isExternal" :href="url" target="_blank">
              {{ theDate | moment('DD MMM YYYY') }}
            </a>

            <nuxt-link v-else :to="url">
              {{ theDate | moment('DD MMM YYYY') }}
            </nuxt-link>
          </template>

          <template v-else>
            <a v-if="isExternal" :href="url" target="_blank">
              <strong>{{ theDate | moment('DD') }}</strong>
              {{ theDate | moment('MMMM YYYY') }}
            </a>

            <nuxt-link v-else :to="url">
              <strong>{{ theDate | moment('DD') }}</strong>
              {{ theDate | moment('MMMM YYYY') }}
            </nuxt-link>
          </template>
        </time>
      </div>

      <div
        v-if="view === 'card'"
        class="post-card_excerpt"
        v-html="theExcerpt"
      />
    </article>

    <div
      v-if="featuredImage && data._embedded['wp:featuredmedia']"
      class="section-article_placeholder row d-flex justify-content-end w-100"
    >
      <figure class="section-article_image col-lg-8 text-right p-0 m-0">
        <img
          :src="data._embedded['wp:featuredmedia'][0].source_url"
          class="img-fluid"
        />
      </figure>
    </div>
  </div>
</template>

<script>
import PostAuthors from '@/components/PostAuthors/index.vue'
import PostMeta from '@/components/PostMeta/index.vue'

export default {
  name: 'PostCard',
  components: {
    PostAuthors,
    PostMeta
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    componentClasses: {
      type: String,
      default: null
    },
    wrapperClasses: {
      type: String,
      default: null
    },
    featuredImage: {
      type: Boolean,
      default: false
    },
    view: {
      type: String,
      default: null
    },
    wrapper: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      link: ''
    }
  },
  computed: {
    isExternal() {
      return !!this.data.acf.post_external
    },
    url() {
      if (this.data.acf.post_external) {
        return this.data.acf.post_external
      } else {
        const url = this.data.link.replace(/^[\D]+\//, '')
        return `/noticias/${url}`
      }
    },
    theTitle() {
      if (this.data.title) {
        return this.data.title.rendered
      } else {
        return this.data.post_title
      }
    },
    theDate() {
      return this.data.date || this.data.post_date
    },
    theTerms() {
      if (this.data.terms) {
        return this.data.terms
      } else if (this.data._embedded['wp:term']) {
        return this.data._embedded['wp:term']
      } else {
        return false
      }
    },
    theExcerpt() {
      if (this.data.excerpt) {
        return this.data.excerpt.rendered
      } else {
        let excerpt = ''
        if (this.data.post_excerpt) {
          excerpt = this.data.post_excerpt
        } else {
          excerpt = this.excerpt(this.data.post_content)
        }

        return excerpt
      }
    }
  },
  mounted() {
    this.$moment.locale('pt')
  },
  methods: {
    excerpt(content) {
      // Remove html comments
      content = content.replace(/<!--.*?-->/g, '')
      // Split all break lines
      content = content.split('\n')
      // Remove empty keys
      content = content.filter(v => v !== '')
      // Retrun only the first paragraph
      return content[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.section-article_placeholder {
  bottom: initial;
  opacity: 0.25;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.5s ease;
}

.post {
  &-card {
    padding-top: $gutter / 2;
    padding-bottom: $gutter / 2;
    z-index: 5;

    &:hover {
      & + .section-article_placeholder {
        opacity: 1;
      }
    }

    &.-list {
      position: relative;

      &:before {
        background: $white;
        bottom: $gutter / 2;
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 80%;
        z-index: -1;
      }
    }

    &.-half {
      // padding-bottom: $gutter / 2;

      .post-card_header {
        width: 50%;
      }
    }

    &.-wrapper {
      left: -57px;
    }

    &.-reduced {
      .post-card_excerpt {
        display: none;

        @media only screen and (min-height: 1200px) {
          display: block;
        }
      }
    }

    &.-card {
      .post-card_date {
        font-size: 2.225vw;
        margin: 0 0 $gutter / 2;
        width: auto;
      }
    }

    &_top {
      // flex-grow: 1;
      margin-bottom: $gutter / 2;
    }

    &_title {
      font-family: $spectra;
      font-size: 1.6725vw;

      a {
        color: inherit;
      }
    }

    &_date {
      color: $cooper;
      font-family: $spectra;
      flex-shrink: 0;
      margin-right: $gutter / 2;
      margin-top: -$gutter / 2;
      position: relative;
      white-space: nowrap;
      width: 8vw;

      a {
        color: inherit;
        text-decoration: none;
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
