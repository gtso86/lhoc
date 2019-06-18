<template>
  <section class="filter-tree w-100" :class="[tabIndex > 0 ? '-active' : '']">
    <b-tabs
      v-model="tabIndex"
      no-nav-style
      class="filter-tabs"
      nav-class="filter-navigation"
      nav-wrapper-class="offset-lg-2"
    >
      <b-tab active title="Start"><div class="sr-only">tab</div></b-tab>

      <b-tab @click="toggleTab">
        <template slot="title">
          Áreas do direito <arrow class="filter-tab_icon" />
        </template>

        <div class="col-lg-14 offset-lg-2">
          <related-tree
            v-if="areasTree.length > 0"
            class="-filter"
            type="areas-do-direito"
            query
            :data="areasTree"
          />

          <div v-else class="d-flex items-align-center justify-content-center">
            <b-spinner label="Spinning" />
          </div>
        </div>
      </b-tab>

      <b-tab @click="toggleTab">
        <template slot="title">
          Mercados <arrow class="filter-tab_icon" />
        </template>

        <div class="col-lg-14 offset-lg-2">
          <related-tree
            v-if="fetchMarket.length > 0"
            class="-filter"
            type="mercados"
            query
            :data="fetchMarket"
          />

          <div v-else class="d-flex items-align-center justify-content-center">
            <b-spinner label="Spinning" />
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
/* eslint-disable no-console */
import Arrow from '@/assets/images/hoc-icon_arrow.svg'
import RelatedTree from '@/components/RelatedTree/index.vue'
import { findIndex, filter } from 'lodash-es'

export default {
  name: 'PostFilter',
  components: { Arrow, RelatedTree },
  props: {},
  data() {
    return {
      tabIndex: -1,
      fetchAreas: {},
      fetchMarket: {},
      areasTree: {}
    }
  },
  computed: {},
  async mounted() {
    const areas = await this.$axios.get(
      `http://lhoc.inwip.com.br/painel/web/wp-json/wp/v2/areas?per_page=100&orderby=description`
    )
    this.fetchAreas = areas.data
    this.areasTree = this.treerize(this.fetchAreas)

    const market = await this.$axios.get(
      `http://lhoc.inwip.com.br/painel/web/wp-json/wp/v2/market?per_page=100&orderby=description`
    )
    this.fetchMarket = market.data
  },
  methods: {
    toggleTab(e) {
      const index = e.target.getAttribute('aria-posinset') - 1

      if (this.tabIndex === index) {
        this.tabIndex = 0
      }
    },
    treerize(data) {
      let items = data

      if (items) {
        items.forEach(element => {
          // Discover parentID
          const parentID = element.parent

          // Find parent obj arr index
          const index = findIndex(items, function(item) {
            return item.id === parentID
          })

          // if parent obj exists
          if (index >= 0) {
            // add children arr
            if (!items[index].children) {
              items[index].children = []
            }

            items[index].children.push(element)
          }
        })

        // Remove children original nodes
        items = filter(items, function(o) {
          return o.parent === 0
        })
      }

      return items
    }
  }
}
</script>

<style lang="scss" scoped>
// style inside /assets/styles/components/_tabs.scss
</style>
