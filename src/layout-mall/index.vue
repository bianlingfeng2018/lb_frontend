<template>
  <div>
    <Header />
    <router-view />
    <Footer v-if="excludeRoutes.indexOf($route.name) === -1" />
  </div>
</template>

<script>

import Header from "@/layout-mall/components/header/Header"
import Footer from "@/layout-mall/components/footer/Footer"

export default {
  name: 'LayoutMall',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart']
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
 </style>
