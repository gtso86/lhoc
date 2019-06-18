<template>
  <footer class="footer">
    <section class="footer-wrapper d-flex">
      <div class="footer-right">
        <nav class="footer-nav_sub">
          <ul class="footer-nav_list d-flex justify-content-end m-0 p-0">
            <li class="footer-nav_item">
              <nuxt-link class="footer_nav_link" to="/escritorio/">
                Escritório
              </nuxt-link>
            </li>
            <li class="footer-nav_item">Carreira</li>
            <li class="footer-nav_item">Login</li>
            <li class="footer-nav_item">EN</li>
          </ul>
        </nav>
        <nav
          class="footer-nav_main d-flex align-items-center justify-content-end"
        >
          <ul class="footer-nav_list d-flex justify-content-end m-0 p-0">
            <li class="footer-nav_item">
              <nuxt-link class="footer_nav_link" to="/atuacao/">
                Atuação
              </nuxt-link>
            </li>
            <li class="footer-nav_item">
              <nuxt-link class="footer_nav_link" to="/advogados/">
                Advogados
              </nuxt-link>
            </li>
            <li class="footer-nav_item">
              <nuxt-link class="footer_nav_link" to="/noticias/">
                Notícias
              </nuxt-link>
            </li>
            <li class="footer-nav_item">Contato</li>
          </ul>
        </nav>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {}
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  width: 100%;
  z-index: 100;

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
.footer_nav_link {
  color: #404040;
}
</style>
