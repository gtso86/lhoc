<template>
  <ul class="related-tree m-0 p-0">
    <li v-for="(item, index) in data" :key="index" class="related-item">
      <nuxt-link
        :to="url(item)"
        @click.native="checkActive"
        v-html="item.name"
      />

      <related-tree
        v-for="(child, i) in item.children"
        :key="i"
        class="related-tree_child"
        :query="query"
        :type="type"
        :parent-slug="url(item)"
        :data="[child]"
      />
    </li>
  </ul>
</template>

<script>
/* eslint-disable no-console */
import RelatedTree from '@/components/RelatedTree/index.vue'

export default {
  name: 'RelatedTree',
  components: {
    RelatedTree
  },
  props: {
    data: {
      type: [Object, Array],
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    query: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    checkActive(e) {
      const link = e.target
      if (link.classList.contains('nuxt-link-exact-active')) {
        this.$router.push({ query: {} })
      }
    },
    url(item) {
      if (this.parentSlug && !this.query) {
        return `${this.parentSlug}${item.slug}/`
      } else if (this.query) {
        return `?${this.type}=${item.slug}`
      } else {
        const base = '/atuacao'
        const middle = `/${this.type}`
        const current = `/${item.slug}`

        return `${base}${middle}${current}/`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.related {
  &-tree {
    color: $black;
    list-style: none;
    line-height: 2;

    &.-widget {
      font-family: $spectra;
      font-size: 1.25vw;
    }

    &.-filter {
      column-count: 3;
      column-gap: $gutter;
      orphans: 1;
      widows: 1;

      &:hover {
        .related-item {
          color: $black;
        }
      }

      .related-item {
        color: $off-gray;
        transition: all 0.5s ease;

        &:hover {
          color: $white;

          .related-item {
            color: $off-white;
            // opacity: 0.5;
          }
        }
      }

      & > .related-item {
        // color: $white;
      }

      & > .related-item > a {
        font-weight: bold;
      }

      & > .related-item .nuxt-link-exact-active {
        color: $white !important;
      }
    }

    &_child {
      font-size: 1.1125vw;
      padding-left: $gutter / 4 !important;
    }

    a {
      color: inherit;
    }
  }

  &-item {
  }
}
</style>
