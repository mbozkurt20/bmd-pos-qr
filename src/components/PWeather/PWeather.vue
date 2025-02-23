<template>
  <div class="weather">
    <div v-if="weather === true">
      <div v-if="icon" class="row">
        <div class="col-lg-6 weatherIcon">
          <img class="weatherIcon" :src="icon" />
        </div>
        <div class="col-lg-6" style="margin: 0; padding: 10px 20px">
          <div class="weatherDegree ">{{ degree }} <span>°</span></div>
        </div>
        <div class="weatherDesc ">{{ description }}</div>
      </div>
    </div>
    <div class="text-white" v-else>Hava Durumu Alınamadı.</div>
  </div>
</template>
<style scoped>
.weatherIcon {
  padding: 0;
  margin: 0;
  text-align: right;
}

.weatherIcon img {
  width: 4.27083vw;
}

.weatherDegree {
  padding: 0;
  margin: 0;
  font-size: 36px;
  position: relative;
}

.weatherDegree span {
  font-size: 22px;
  position: absolute;
}

.weatherDesc {
  font-size: 16px;
  text-transform: capitalize;
  padding: 0;
  margin: 0;
  font-weight: 700;
  text-align: center;
}
</style>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "../../router/index.js";
import { setLoading } from "../../store/app";
export default {
  data() {
    return {
      weather: false,
      degree: null,
      description: null,
      icon: null,
    };
  },
  mounted() {
    this.getWaiter();
  },
  methods: {
    getWaiter() {
      axios({
        method: "GET",
        url: "v2/weather",
      })
        .then(async (response) => {
          this.weather = true;
          this.description = response.data.weather.weather[0].description;
          this.degree = Math.ceil(response.data.weather.main.temp);
          this.icon =
            "/weather/weather_" +
            response.data.weather.weather[0].icon +
            ".png";
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
  },
};
</script>
