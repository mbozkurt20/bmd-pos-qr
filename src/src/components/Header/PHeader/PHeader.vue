<template>
    <header class="header">
        <div class="container header-row">
            <div class="header-left d-flex">
                <a href="/" class="header-logo">
                    <img src="../../../assets/image/logo.png">
                </a>
                <PHeaderNav />
            </div>
            <div class="header-right d-flex">
                <PHeaderState profileState="false" />
            <button class="header-exit" v-if="license" @click="logout"><ion-icon name="enter-outline"></ion-icon></button>
            </div>
        </div>
    </header>
</template>

<script>
import router from "../../../router/index.js";
import PHeaderNav from "../PHeaderNav/PHeaderNav.vue"
import PHeaderState from "../PHeaderState/PHeaderState.vue"

export default {
  components: {
    PHeaderState,
    PHeaderNav
  },
  data() {
    return {
      license:null
    };
  },

  mounted() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      let user = JSON.parse(userData);
      this.license = user['license'];
    }
  },

  methods:{
    async logout () {
      // Log out the user.
      localStorage.removeItem('token');
      localStorage.removeItem('domain');
      localStorage.removeItem('userData');
      localStorage.removeItem('user');
      location.reload();
      await router.push({name: 'Login'})
    }
  }
};

</script>

<style src="./PHeader.scss" lang="scss" />