<template>
  <article class="user-card d-flex flex-column">
    <header class="user-card_header">
      <figure v-if="data.acf.laywers_avatar" class="user-card_placeholder m-0">
        <nuxt-link :to="`/advogados/${data.slug}/`">
          <img
            :src="data.acf.laywers_avatar.sizes.medium_large"
            class="user-card_image img-fluid"
          />
        </nuxt-link>
      </figure>

      <h1 class="user-card_title">
        <nuxt-link :to="`/advogados/${data.slug}/`">
          {{ data.name }}
        </nuxt-link>
      </h1>
    </header>

    <aside class="user-card_details">
      <a
        v-if="data.acf.laywers_telephone1"
        class="user-card_link d-block"
        :href="`tel:${data.acf.laywers_telephone1}`"
      >
        {{ data.acf.laywers_telephone1 }}
      </a>

      <a v-if="email" class="user-card_link d-block" :href="`mailto:${email}`">
        E-mail
      </a>

      <a
        v-if="vcard"
        class="user-card_link d-block"
        :href="data.acf.laywers_vcard.url"
      >
        <strong>VCARD</strong>
      </a>
    </aside>
  </article>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      email: '',
      vcard: ''
    }
  },
  mounted() {
    this.email = this.data.contact
    this.vcard = this.data.acf.laywers_vcard.url
  }
}
</script>

<style lang="scss" scoped>
.user {
  &-card {
    margin-bottom: $gutter;
    position: relative;

    &:hover {
      .user-card_image {
        filter: grayscale(0);
      }
    }

    &_placeholder {
      background: $light-gray;
      overflow: hidden;
      padding-top: 100%;
      position: relative;
      mix-blend-mode: color;
    }

    &_image {
      filter: grayscale(100%);
      height: 100%;
      left: 0;
      mix-blend-mode: multiply;
      object-fit: cover;
      position: absolute;
      top: 0;
      transition: all 0.5s ease;
      width: 100%;
    }

    &_header {
      flex: 1 1 auto;
    }

    &_title {
      color: $black;
      font-family: $spectra;
      font-size: 1.6725vw;
      margin-bottom: $gutter / 2;
      margin-top: $gutter / 2;

      a {
        color: inherit;
      }
    }

    &_link {
      color: $black;
    }
  }
}
</style>
