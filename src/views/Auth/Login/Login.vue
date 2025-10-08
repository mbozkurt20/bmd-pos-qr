<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import PFooter from "../../../components/Footer/Footer.vue";
import PHeader from "../../../components/Header/PHeader/PHeader.vue";

import { setLoading } from "../../../store/app";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();

const message = ref("Yükleniyor...");

// QR'dan gelen değerleri route'tan al
const restaurantCode = route.params.restaurantId as string;
const table = route.params.tableId as string;
const version = (route.query.v as string) || null;

onMounted(() => {
  // Her yeni QR geldiğinde eski kayıtları sil
  localStorage.removeItem("table");
  localStorage.removeItem("table_v");

  // Eğer yeni versiyon geldiyse kaydet (cache kırıcı)
  if (version) localStorage.setItem("table_v", version);

  LoginAttack();
});

async function LoginAttack() {
  try {
    setLoading(true);

    const response = await axios.post("v2/restaurant-menu", {
      code: restaurantCode,
    });

    if (response.data.success) {
      const { token, user } = response.data;

      // Eski verileri silip yenilerini yaz
      localStorage.setItem("token", token);
      localStorage.setItem("restaurantCode", restaurantCode);
      localStorage.setItem("table", table);
      localStorage.setItem("domain", user.tenant.domain);
      localStorage.setItem("userData", JSON.stringify(user));

      await fetchUserInformation();

      toast("Hoşgeldiniz...", {
        theme: "dark",
        type: "success",
        pauseOnFocusLoss: false,
      });

      // Doğru masaya yönlendir
      router.push({ path: `/tables/${table}` });
    } else {
      toast(response.data.message || "Bir hata oluştu.", {
        theme: "dark",
        type: "error",
      });
    }
  } catch (err: any) {
    console.error("LoginAttack error:", err);
    toast(err?.response?.data?.message || "Sunucu hatası.", {
      theme: "dark",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
}

async function fetchUserInformation() {
  try {
    const token = localStorage.getItem("token");
    const domain = localStorage.getItem("domain");

    if (!token || !domain) return;

    const res = await axios.post(
        "v2/auth/information",
        { domain },
        { headers: { Authorization: token } }
    );

    if (res.data.success) {
      console.log("Kullanıcı bilgileri:", res.data.users);
    }
  } catch (e) {
    console.warn("Bilgi alınamadı:", e);
  }
}
</script>

<template>
  <div>
    <PHeader />
    <main class="container text-center py-6">
      <h3>{{ message }}</h3>
    </main>
    <PFooter />
  </div>
</template>
