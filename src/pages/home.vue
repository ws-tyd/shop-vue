<template>
  <div>
    <nav-header v-if="!flag"></nav-header>
    <router-view></router-view>
    <nav-footer v-if="!flag"></nav-footer>
  </div>
</template>
<script>
import NavHeader from './../components/NavHeader.vue'
import NavFooter from './../components/NavFooter.vue'
import axios from "axios";

export default {
  name: 'nav-home',
  components: {
    NavHeader,
    NavFooter
  },
  data() {
    return {
      // ua:navigator.userAgent.toLowerCase(),
      flag: null
    }
  },
  mounted() {
    window.addEventListener("resize", this.isMobile);
    // console.log(this.ua);

  },
  methods: {
    isMobile() {
      if (document.body.clientWidth <= 768) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      // console.log(this.flag);
    },
  }
}
</script>
<style scoped>
</style>
