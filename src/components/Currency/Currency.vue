<template>
  <div class="currencyList">
     <div>Döviz Kuru: $ {{ formatPrice(usdToTry) }} - € {{ formatPrice(eurToTry)}} - £ {{ formatPrice(poundToTry)}} </div>
  </div>
</template>
<style src="./Currency.scss" lang="scss" scoped />
<script>
import axios from "axios";
export default {
  data() {
    return {
      usdToTry: null,
      eurToTry: null,
      poundToTry: null,
      // Diğer döviz kurları için gerekli değişkenleri ekleyebilirsiniz
    };
  },
  mounted() {
    this.getCurrencyRates();
  },
  methods: {
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    async getCurrencyRates() {
      try {
        const response = await axios.get('https://hasanadiguzel.com.tr/api/kurgetir');
        this.usdToTry = response.data.TCMB_AnlikKurBilgileri[0].ForexSelling;
        this.eurToTry = response.data.TCMB_AnlikKurBilgileri[3].ForexSelling;
        this.poundToTry = response.data.TCMB_AnlikKurBilgileri[4].ForexSelling;
        // Diğer döviz kurları için benzer şekilde değerleri ayarlayın
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    },
  },
};
</script>
