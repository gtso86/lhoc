<template>
  <section
    class="section d-flex align-items-center"
    :class="`section-module_${slug}`"
  >
    <div
      v-if="data.block_image"
      class="section-article_placeholder row d-flex justify-content-end w-100"
    >
      <figure class="section-article_image col-lg-9 p-0 m-0">
        <img :src="data.block_image.sizes.large" class="img-fluid" />
      </figure>
    </div>

    <content-headline class="section-article_headline">
      {{ data.block_section }}
    </content-headline>

    <b-container fluid class="section-wrapper">
      <header class="section-header row">
        <content-header-title class="col-auto offset-lg-2 mb-0">
          {{ data.block_section }}
        </content-header-title>
      </header>

      <b-row class="d-flex align-items-end">
        <article
          v-for="(column, index) in data.block_column"
          :key="index"
          class="section-article offset-lg-2"
          :class="[data.block_column.length > 1 ? 'col-lg-6' : 'col-lg-9']"
        >
          <header>
            <content-article-title class="section-article_title">
              {{ column.column_title }}
            </content-article-title>
          </header>

          <div
            v-if="column.column_content"
            class="section-article_content"
            v-html="column.column_content"
          />

          <footer>
            <custom-button :to="column.column_link">
              {{ column.column_button }}
            </custom-button>
          </footer>
        </article>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import ContentHeadline from '@/components/ContentHeadline/index.vue'
import ContentHeaderTitle from '@/components/ContentHeaderTitle/index.vue'
import ContentArticleTitle from '@/components/ContentArticleTitle/index.vue'
import CustomButton from '@/components/CustomButton/index.vue'

export default {
  name: 'ContentSection',
  components: {
    ContentHeadline,
    ContentHeaderTitle,
    ContentArticleTitle,
    CustomButton
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    slug() {
      let value = this.data.block_section
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
  }
}
</script>

<style lang="scss" scoped>
.section {
  &-module {
    &_o-escritorio {
      .section-wrapper {
        top: 0;
      }

      .section-article_headline {
        bottom: 0;
        left: 25vw;
        transform: translateY(35%);
      }
    }

    &_atuacao {
      .section-article_headline {
        top: 10vh;
        left: -5vw;
      }
    }

    &_advogados {
      .section-article_headline {
        bottom: 0;
        left: 25vw;
        transform: translateY(35%);
      }
    }

    &_cross {
      margin-bottom: 0 !important;
      padding-bottom: $gutter * 2;
    }
  }

  &-article {
    &_title {
      margin-bottom: 0;
    }
  }
}
</style>
