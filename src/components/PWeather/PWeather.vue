<template>
  <div class="weather">
    <div v-if="weather === true">
      <div v-if="icon" class="row">
        <div class="col-lg-6 weatherIcon text-custom">
          <img class="weatherIcon " :src="icon" />
        </div>
        <div class="col-lg-6" style="margin: 0; padding: 10px 20px">
          <div class="weatherDegree text-custom">{{ degree }} <span>°</span></div>
        </div>
        <div class="weatherDesc text-custom">{{ description }}</div>
      </div>
    </div>
    <div class="text-white" v-else>Hava Durumu Alınamadı.</div>
  </div>
</template>
<style scoped>
.weather {
  text-align: center;
  color: white;
}

/* İkon */
.weatherIcon {
  padding: 0;
  margin: 0;
  text-align: right;
}

.weatherIcon img {
  width: 4.2vw;
  max-width: 80px;
  min-width: 40px;
}

/* Derece */
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

/* Açıklama */
.weatherDesc {
  font-size: 16px;
  text-transform: capitalize;
  padding: 0;
  margin: 0;
  font-weight: 700;
  text-align: center;
}

/* Tablet için */
@media (max-width: 992px) {
  .weatherIcon img {
    width: 60px;
  }

  .weatherDegree {
    font-size: 28px;
  }

  .weatherDegree span {
    font-size: 18px;
  }

  .weatherDesc {
    font-size: 14px;
  }
}

/* Mobil için */
@media (max-width: 576px) {
  .row {
    flex-direction: column;
    align-items: center;
  }

  .weatherIcon {
    text-align: center;
    margin-bottom: 10px;
  }

  .weatherIcon img {
    width: 50px;
  }

  .weatherDegree {
    font-size: 24px;
  }

  .weatherDegree span {
    font-size: 16px;
  }

  .weatherDesc {
    font-size: 12px;
  }
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
