<template>
  <section class="carousel-builder">
    <no-ssr>
      <carousel
        :id="`carousel-${randomHash}`"
        :ref="`carousel`"
        :class="[
          button ? '-button' : '',
          navigationWrapper ? '-wrapper' : '',
          'carousel',
          `carousel-background_${backgroundColor}`
        ]"
        :autoplay="false"
        :center-mode="true"
        :navigation-enabled="true"
        :pagination-enabled="false"
        :per-page="1"
        @page-change="handlePaginationChange"
      >
        <slide v-for="(chunks, index) in globs" :key="`slide-${index}`">
          <template v-if="column">
            <div
              :class="[
                'carousel-slide_row',
                navigationWrapper ? 'd-flex' : 'row',
                slideClasses ? slideClasses : ''
              ]"
            >
              <component
                :is="component"
                v-for="(chunk, i) in chunks"
                :key="`${component}-${i}`"
                :class="!injectClasses ? componentClasses : ''"
                :component-classes="componentClasses"
                :wrapper-classes="wrapperClasses"
                :wrapper="navigationWrapper"
                :featured-image="featuredImage"
                :view="view"
                :data="chunk"
              />
            </div>
          </template>
          <template v-else>
            <component
              :is="component"
              v-for="(chunk, i) in chunks"
              :key="`${component}-${i}`"
              :class="componentClasses"
              :component-classes="componentClasses"
              :view="view"
              :data="chunk"
            />
          </template>
        </slide>
      </carousel>

      <div
        :class="[navigationWrapper ? 'section-wrapper container-fluid' : '']"
      >
        <div :class="[navigationWrapper ? 'row' : '']">
          <nav
            v-if="globs.length > 1 || persistButton"
            class="carousel-navigation d-flex w-100 align-items-center"
            :class="[
              button ? '-button' : '',
              navigationWrapper ? 'col-lg-14 offset-lg-2' : ''
            ]"
          >
            <aside v-if="globs.length > 1" class="carousel-arrows d-flex">
              <div class="carousel-arrow -left">
                <arrow class="carousel-arrow_icon" />
              </div>

              <div class="carousel-arrow -right">
                <arrow class="carousel-arrow_icon" />
              </div>
            </aside>
            <div class="carousel-progress">
              <div
                v-if="globs.length > 1"
                :style="`width: ${progressbar}%`"
                class="carousel-progressbar"
              />
            </div>

            <custom-button
              v-if="button"
              class="carousel-navigation_button"
              :to="button"
            >
              Ver Todas
            </custom-button>
          </nav>
        </div>
      </div>
    </no-ssr>

    <!-- Only for SEO ˜rpose -->
    <carousel-slide
      v-for="(chunks, index) in globs"
      :key="`slide-${index}`"
      class="sr-only"
    >
      <component
        :is="component"
        v-for="(chunk, i) in chunks"
        :key="`${component}-${i}`"
        :data="chunk"
      >
      </component>
    </carousel-slide>
  </section>
</template>

<script>
/* eslint-disable no-console */
import Arrow from '@/assets/images/hoc-icon_arrow.svg'
import CustomButton from '@/components/CustomButton/index.vue'
import CarouselSlide from '@/components/CarouselSlide/index.vue'
import UserCard from '@/components/UserCard/index.vue'
import PostCard from '@/components/PostCard/index.vue'
import ItemCard from '@/components/ItemCard/index.vue'
import { chunk } from 'lodash-es'

export default {
  name: 'CarouselBuilder',
  components: {
    Arrow,
    CustomButton,
    CarouselSlide,
    UserCard,
    PostCard,
    ItemCard
  },
  props: {
    data: {
      type: [Object, Array],
      default: () => {}
    },
    slices: {
      type: Number,
      default: 1
    },
    backgroundColor: {
      type: String,
      default: 'gray'
    },
    button: {
      type: String,
      default: ''
    },
    persistButton: {
      type: Boolean,
      default: false
    },
    column: {
      type: Boolean,
      default: false
    },
    component: {
      type: String,
      default: ''
    },
    componentClasses: {
      type: String,
      default: ''
    },
    wrapperClasses: {
      type: String,
      default: ''
    },
    slideClasses: {
      type: String,
      default: ''
    },
    navigationWrapper: {
      type: Boolean,
      default: false
    },
    injectClasses: {
      type: Boolean,
      default: false
    },
    featuredImage: {
      type: Boolean,
      default: false
    },
    view: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      progressbar: 0
    }
  },
  computed: {
    globs() {
      return chunk(this.data, this.slices)
    },
    randomHash() {
      return Math.random()
        .toString(36)
        .substring(7)
    }
  },
  mounted() {
    // Init progressbar
    this.handlePaginationChange(0)

    setTimeout(() => {
      this.$refs.carousel.goToPage(0)
    }, 500)
  },
  methods: {
    handlePaginationChange(page) {
      const slide = page + 1
      const total = this.globs.length
      const percentage = (slide * 100) / total
      this.progressbar = percentage
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  z-index: 1;

  &-navigation {
    position: relative;
    z-index: 0;

    &_button {
      margin-left: $gutter / 2;
    }
  }

  &-slide {
    &_row {
      height: 100%;
      position: relative;
    }
  }

  &-arrow {
    height: 30px;
    width: 30px;

    &_icon {
      height: 100%;
      width: 100%;
    }

    &.-right {
      margin: 0 $gutter / 2;
      transform: rotate(180deg) !important;
    }
  }

  &-progress {
    background: $gray;
    height: 1px;
    width: 100%;
  }

  &-progressbar {
    background: $cooper;
    height: 1px;
    transition: all 0.5s ease;
    width: 0;
  }
}
</style>

<style scoped>
.VueCarousel >>> .VueCarousel-navigation {
  bottom: -30px;
  position: absolute;
}

.VueCarousel.-button >>> .VueCarousel-navigation {
  bottom: -60px;
}

.VueCarousel.-wrapper >>> .VueCarousel-navigation {
  left: calc(60px + 10.75%);
}

.VueCarousel >>> .VueCarousel-navigation-button {
  background: #f5f5f5;
  color: transparent;
  height: 30px;
  margin: 0 !important;
  opacity: 0;
  padding: 0 !important;
  position: static;
  transition: all 0.5s ease;
  transform: none;
  width: 30px;
}

.VueCarousel.-button >>> .VueCarousel-navigation-button {
  height: 60px;
}

.VueCarousel >>> .VueCarousel-navigation--disabled {
  opacity: 0.5;
}

.VueCarousel >>> .VueCarousel-navigation-next {
  margin-left: 25px !important;
}

.VueCarousel.carousel-background_white >>> .VueCarousel-navigation-button {
  background: #fff;
}
</style>
