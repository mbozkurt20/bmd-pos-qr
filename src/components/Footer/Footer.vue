<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-link d-flex">
              <template v-if="kalangun">
                <a class="footer-link bg-white rounded px-5 text-custom" style="padding: 3px" href="" >
                  <ion-icon name="notifications-outline"></ion-icon>
                  Abonelik bitimine <span class="text-custom" style="font-size: 18px">{{kalangun}}</span> gün kaldı
                </a>
              </template>
              <template v-else>
                <a class="footer-link" href="" >
                  <ion-icon name="headset-outline"></ion-icon>
                  Destek Merkezi
                </a>
              </template>

            </div>
          <template v-if="kalangun">
            <router-link to="/settings" class="btn btn-white footer-button text-white">Ayarlar
              <ion-icon name="settings-outline"></ion-icon>
            </router-link>
          </template>
        </div>
        <div class="container">
            <div class="footer-link d-flex">
              <template v-if="kalangun">
              <span class="footer-license">Version: <u>v2.24 Beta</u> - License: {{ license }}</span>
              </template>
              <template v-else>
                <span class="footer-license">Version: <u>v2.24 Beta</u></span>
              </template>
            </div>
            <div class="currency-tousd">
              <PCurrency></PCurrency>
            </div>
        </div>
    </footer>
</template>

<style src="./Footer.scss" lang="scss" />
<script>
import PCurrency from "../Currency/Currency.vue";
export default {
  components: {
    PCurrency
  },
  data() {
    return {
      userData: null,
      license: null,
      kalangun: null,
    };
  },

  mounted() {
    // localStorage'da user bilgisi varsa, user verisini al
    const userData = localStorage.getItem('userData');
    if (userData) {
      let user = JSON.parse(userData);

      console.log(user.end_date)
      this.license = user['license'];

      const currentDate = new Date();
      const endDate = new Date(user.end_date); // $user->end_date yerine geçecek tarih

      const diffTime = Math.abs(endDate - currentDate);
      const kalanGun = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      console.log(`Kalan Gün: ${kalanGun}`);

      this.kalangun = kalanGun;

      this.userData = user;
    }
  },
};




</script>