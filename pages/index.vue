<template>
  <div>
    <main class="main">
      <div class="frame -fixed" />

      <component
        :is="slider.acf_fc_layout"
        v-for="(slider, index) in sliders"
        :key="index"
        :class="`slider-${slider.acf_fc_layout}`"
        :fetch="slider.acf_fc_layout === 'module_news' ? postsRelated : ''"
        :data="slider"
      />
    </main>
  </div>
</template>

<script>
import ContentSection from '@/components/ContentSection/index.vue'
import ContentNews from '@/components/ContentNews/index.vue'
import ContentPrizes from '@/components/ContentPrizes/index.vue'
import { find } from 'lodash-es'

export default {
  name: 'Home',
  components: {
    module_block: ContentSection,
    module_news: ContentNews,
    module_prizes: ContentPrizes
  },
  asyncData({ $axios }) {
    // Fetch current page data
    return $axios.get('wp/v2/pages/2').then(currentPage => {
      let newsIds = 0
      let newsFetch = 'wp/v2/posts/?_embed'

      // Find parent
      const newsObj = find(currentPage.data.acf.home_module, obj => {
        return obj.acf_fc_layout === 'module_news'
      })
      const newsAuto = newsObj.news_auto

      if (!newsAuto) {
        newsIds = newsObj.news_list
        newsFetch = `wp/v2/posts/?include=${newsIds}&orderby=include&_embed`
      }

      return Promise.all([
        // Fetch featured posts
        $axios.$get(newsFetch)
      ]).then(([postsRelated]) => {
        return {
          currentPage: currentPage.data,
          sliders: currentPage.data.acf.home_module,
          postsRelated: postsRelated
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  section[class*='module'] {
    height: 100vh;
    margin-bottom: 25vh;
    padding-top: $gutter * 2;
    padding-bottom: $gutter / 2;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
