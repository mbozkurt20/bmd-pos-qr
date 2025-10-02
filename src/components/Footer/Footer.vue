<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-link d-flex">
        <template v-if="kalangun">
          <!-- a yerine button ve @click ile modal aç -->
          <button
              class="footer-link bg-white rounded px-5 text-custom"
              style="padding: 3px"
              @click="openModal"
          >
            <ion-icon name="notifications-outline"></ion-icon>
            Abonelik bitimine
            <span class="text-custom" style="font-size: 18px">{{ kalangun }}</span>
            gün kaldı
          </button>
        </template>
        <template v-else>
          <a class="footer-link" href="">
            <ion-icon name="headset-outline"></ion-icon>
            Destek Merkezi
          </a>
        </template>
      </div>

      <template v-if="kalangun">
        <router-link
            to="/settings"
            class="btn btn-white footer-button text-white"
        >
          Ayarlar
          <ion-icon name="settings-outline"></ion-icon>
        </router-link>
      </template>
    </div>

    <div class="container">
      <div class="footer-link d-flex">
        <template v-if="kalangun">
          <span class="footer-license">
            Version: <u>v2.24 Beta</u> - License: {{ license }}
          </span>
        </template>
        <template v-else>
          <span class="footer-license">Version: <u>v2.24 Beta</u></span>
        </template>
      </div>
      <div class="currency-tousd">
        <PCurrency></PCurrency>
      </div>
    </div>

    <!-- Basit Modal -->
    <div
        v-if="showModal"
        class="modal fade show d-block"
        tabindex="-1"
        role="dialog"
        style="background: rgba(0,0,0,0.5);"
        @click="closeModal"
    >
      <!-- Modal Dialog -->
      <div
          class="modal-dialog modal-dialog-centered"
          role="document"
          @click.stop
      >
        <div class="modal-content shadow">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">
              <ion-icon name="information-circle-outline" class="me-1"></ion-icon>
              Abonelik Bilgisi
            </h5>
            <button
                type="button"
                class="btn-close btn-close-white"
                aria-label="Close"
                @click="closeModal"
            ></button>
          </div>

          <div class="modal-body">
            <p class="mb-3 text-dark">
              Aboneliğinizin bitimine
              <span class="fw-bold text-primary">{{ kalangun }}</span> gün kaldı.
            </p>

            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between">
                <span class="fw-semibold">Başlangıç Tarihi</span>
                <span class="text-success">{{ userData.start_date }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span class="fw-semibold">Bitiş Tarihi</span>
                <span class="text-danger">{{ userData.end_date }}</span>
              </li>
            </ul>

            <p class="text-center text-indigo">
              Paketlerimizi
              <a
                  :href="`https://at.gpskurye.com/subscriptions?domain=${userData.tenant.domain}`"
                  class="text-decoration-underline text-indigo"
                  target="_blank"
              >
                buradan
              </a>
              inceleyebilirsiniz.
            </p>
          </div>

          <div class="modal-footer">
            <button
                type="button"
                class="btn btn-success px-4"
                @click="closeModal"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style src="./Footer.scss" lang="scss" />

<script>
import PCurrency from "../Currency/Currency.vue";

export default {
  components: {
    PCurrency,
  },
  data() {
    return {
      userData: null,
      license: null,
      kalangun: null,
      showModal: false, // Modal kontrolü
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      let user = JSON.parse(userData);
      this.license = user["license"];

      const currentDate = new Date();
      const endDate = new Date(user.end_date);
      const diffTime = Math.abs(endDate - currentDate);
      const kalanGun = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.kalangun = kalanGun;
      this.userData = user;
    }
  },
};
</script>

<style scoped>
/* Basit modal stilleri */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 50vw;
  width: 90%;
}
</style>
