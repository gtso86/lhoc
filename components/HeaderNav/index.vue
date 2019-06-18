<template>
  <header class="header">
    <section class="header-wrapper d-flex">
      <div class="header-left">
        <nuxt-link to="/">
          <logo class="header-logo" />
        </nuxt-link>
      </div>

      <div class="header-right">
        <nav class="header-nav_sub">
          <ul class="header-nav_list d-flex justify-content-end m-0 p-0">
            <li class="header-nav_item">
              <nuxt-link class="header_nav_link" to="/escritorio/">
                Escritório
              </nuxt-link>
            </li>
            <li class="header-nav_item">Carreira</li>
            <li class="header-nav_item">Login</li>
            <li class="header-nav_item">EN</li>
          </ul>
        </nav>
        <nav
          class="header-nav_main d-flex align-items-center justify-content-end"
        >
          <ul class="header-nav_list d-flex justify-content-end m-0 p-0">
            <li class="header-nav_item">
              <nuxt-link class="header_nav_link" to="/atuacao/">
                Atuação
              </nuxt-link>
            </li>
            <li class="header-nav_item">
              <nuxt-link class="header_nav_link" to="/advogados/">
                Advogados
              </nuxt-link>
            </li>
            <li class="header-nav_item">
              <nuxt-link class="header_nav_link" to="/noticias/">
                Notícias
              </nuxt-link>
            </li>
            <li class="header-nav_item">Contato</li>
          </ul>
        </nav>
      </div>
    </section>
  </header>
</template>

<script>
import Logo from '@/assets/images/hoc-logo.svg'
export default {
  name: 'Header',
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 100;

  &:after {
    background: $cooper;
    content: '';
    height: 1px;
    left: $gutter / 2;
    position: absolute;
    right: $gutter / 2;
    top: $gutter / 2;
    z-index: 75;
  }

  &-left {
    // background: rgba($light-gray, 0.75);
    // margin-left: ($gutter / 2) + 1;
    padding-left: $gutter;
    padding-top: $gutter;
    position: relative;
    width: 35%;

    &:before {
      background: $cooper;
      content: '';
      height: calc(100% - 30px);
      position: absolute;
      left: $gutter / 2;
      top: $gutter / 2;
      width: 1px;
      z-index: 75;
    }

    &:after {
      background: $light-gray;
      content: '';
      height: $gutter / 2;
      left: $gutter / 2;
      position: absolute;
      top: 0;
      z-index: 50;
      width: 1px;
    }

    // &:after {
    //   background: $light-gray;
    //   content: '';
    //   height: $gutter / 2;
    //   left: $gutter / -2;
    //   position: absolute;
    //   right: 0;
    //   top: 0;
    //   z-index: 50;
    // }
  }

  &-logo {
    width: 176px;
  }

  &-right {
    background: $white;
    width: 65%;

    &:after {
      background: $cooper;
      content: '';
      height: calc(100% - 30px);
      position: absolute;
      right: $gutter / 2;
      top: $gutter / 2;
      width: 1px;
      z-index: 75;
    }
  }

  &-nav {
    &_sub {
      font-size: 12px;
      font-weight: 700;
      line-height: $gutter / 2;
    }

    &_main {
      height: calc(100% - 30px);
      font-size: 24px;
      font-family: $spectra;
      font-weight: bold;
      line-height: $gutter / 2;
    }

    &_list {
      margin-right: $gutter !important;
      overflow: hidden;
      list-style: none;
    }

    &_item {
      margin-left: 1.5em;
    }
  }
}
</style>

<style scoped>
.header_nav_link {
  color: #404040;
}
</style>
