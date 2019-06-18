<template>
  <section
    class="section d-flex align-items-center"
    :class="`section-module_${slug}`"
  >
    <content-headline class="section-article_headline">
      {{ data.block_section || data.prizes_section }}
    </content-headline>

    <b-container fluid class="section-wrapper">
      <header class="section-header row">
        <content-header-title class="col-auto offset-lg-2 mb-0">
          {{ data.block_section || data.prizes_section }}
        </content-header-title>
      </header>

      <b-row>
        <article class="section-article col-lg-14 offset-lg-2">
          <header v-if="data.prizes_title">
            <content-article-title class="section-article_title p-0">
              {{ data.prizes_title }}
            </content-article-title>
          </header>

          <prizes-group
            :list="fetchPrizes"
            class="row"
            stamp-class="col flex-column text-center"
          />
        </article>
      </b-row>
    </b-container>
  </section>
</template>

<script>
/* eslint-disable no-console */
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import ContentArticleTitle from '@/components/ContentArticleTitle/index.vue'
import PrizesGroup from '@/components/PrizesGroup/index.vue'

export default {
  name: 'ContentPrizes',
  components: {
    ContentHeadline,
    ContentHeaderTitle,
    ContentArticleTitle,
    PrizesGroup
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fetchPrizes: {}
    }
  },
  computed: {
    slug() {
      let value = this.data.prizes_section || this.data.block_section
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
  },
  async mounted() {
    const { data } = await this.$axios.get(
      `wp/v2/prizes/?include=${this.data.prizes_list}&orderby=include&_embed`
    )
    this.fetchPrizes = data
  }
}
</script>

<style lang="scss" scoped>
.section {
  &-module {
    &_reconhecimento {
      .section-article_headline {
        bottom: 0;
        left: 25vw;
        transform: translateY(35%);
      }
    }
  }
}
</style>
