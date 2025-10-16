<script setup lang="ts">

import Header from '@/templates/header/Header.vue'
import Footer from '@/templates/footer/Footer.vue'
</script>

<template>
  <div class="app-content">
    <Header class="header" />
    <div class="views">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <Component :is="Component" />
      </template>
    </router-view>
    </div>
    <Footer class="footer" />
  </div>
</template>

<style scoped lang="scss">
.app-content {
  display: grid;
  grid-template-areas: 'header' 'views' 'footer';
  grid-template-rows: 48px auto 48px;
  height: 100vh;
}

.header {
  grid-area: header;
}

.views {
  grid-area: views;
}

.footer {
  grid-area: footer;
}
</style>
