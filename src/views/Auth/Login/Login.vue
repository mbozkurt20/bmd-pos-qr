<template>
  <div>
    <PHeader />
    <main class="container text-center py-6">
      <h3>{{ message }}</h3>
    </main>
    <PFooter />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import PFooter from "../../../components/Footer/Footer.vue";
import PHeader from "../../../components/Header/PHeader/PHeader.vue";

import { setLoading } from "../../../store/app";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();

const message = ref("Yükleniyor...");

// Son işlenen parametreleri tut (aynı parametre ile tekrar çalışmayı önlemek için)
let lastProcessed = {
  restaurantId: null as string | null,
  tableId: null as string | null,
  v: null as string | null,
};

// Güvenli localStorage setter
function safeSetItem(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch (e) {
    console.warn("localStorage error", e);
  }
}

/**
 * Asıl işlem fonksiyonu.
 * restaurantId ve tableId zorunlu; version (v) opsiyonel.
 */
async function handleLoginAttack(restaurantId: string, tableId: string, version: string | null) {
  // Aynı parametreler ile daha önce çalıştıysak atla
  if (
      lastProcessed.restaurantId === restaurantId &&
      lastProcessed.tableId === tableId &&
      lastProcessed.v === version
  ) {
    return;
  }

  // güncelle
  lastProcessed = { restaurantId, tableId, v: version };

  try {
    setLoading(true);
    message.value = "Giriş yapılıyor...";

    // Her yeni QR geldiğinde eski table ile ilgili anahtarları temizle
    safeSetItem("table", null);
    safeSetItem("table_v", null);

    // Eğer QR içinde version varsa bunu kaydet (gerektiğinde backend'e gönderebilirsin)
    if (version) safeSetItem("table_v", version);

    // Sunucuya restoran kodunu gönder ve token/user al
    const postData = { code: restaurantId };

    const response = await axios.post("v2/restaurant-menu", postData);

    if (response?.data?.success) {
      const resData = response.data;

      // Token ve kullanıcı bilgileri
      const token = resData.token ?? null;
      const user = resData.user ?? null;

      // Güvenli şekilde kaydet
      safeSetItem("token", token);
      safeSetItem("restaurantCode", restaurantId);
      safeSetItem("table", tableId);
      if (user?.tenant?.domain) safeSetItem("domain", user.tenant.domain);
      if (user) safeSetItem("userData", JSON.stringify(user));

      // Ek bilgi çağrısı (bilgi endpointi)
      await fetchUserInformation(token);

      toast("Hoşgeldiniz...", {
        theme: "dark",
        type: "success",
        pauseOnFocusLoss: false,
      });

      message.value = "Yönlendiriliyorsunuz...";

      // Yönlendir: /tables/:tableId
      // küçük bir bekleme ver (opsiyonel)
      setTimeout(() => {
        router.push({ path: `/tables/${tableId}` }).catch(() => {});
      }, 150);
    } else {
      const errMsg = response?.data?.message ?? "Giriş başarısız.";
      message.value = errMsg;
      toast(errMsg, { theme: "dark", type: "error" });
    }
  } catch (err: any) {
    console.error("LoginAttack error:", err);
    const errMsg = err?.response?.data?.message ?? "Sunucu hatası veya bağlantı hatası.";
    message.value = errMsg;
    toast(errMsg, { theme: "dark", type: "error" });
  } finally {
    setLoading(false);
  }
}

/**
 * Kullanıcı bilgilerini alır (token kullanılarak)
 */
async function fetchUserInformation(tokenArg?: string | null) {
  try {
    const token = tokenArg ?? localStorage.getItem("token");
    const domain = localStorage.getItem("domain");

    if (!token || !domain) return;

    const res = await axios.post(
        "v2/auth/information",
        { domain },
        { headers: { Authorization: token } }
    );

    if (res?.data?.success) {
      // İstersen store'a dispatch edebilirsin
      console.log("Kullanıcı bilgileri:", res.data.users);
    }
  } catch (e) {
    console.warn("fetchUserInformation error", e);
  }
}

/**
 * route.params / route.query değişikliklerini dinle.
 * - onMounted içinde de bir kez çağırıyoruz (ilk QR).
 */
onMounted(() => {
  const rId = (route.params.restaurantId as string) || "";
  const tId = (route.params.tableId as string) || "";
  const v = (route.query.v as string) || null;

  if (!rId || !tId) {
    message.value = "Geçersiz QR URL'i.";
    toast("Geçersiz QR URL'i.", { theme: "dark", type: "error" });
    return;
  }

  handleLoginAttack(rId, tId, v);
});

/**
 * Eğer kullanıcı aynı component açıkken başka bir QR okutursa (route param değişir),
 * bunları yakalayıp handleLoginAttack'i yeniden çağır.
 */
watch(
    () => [route.params.restaurantId, route.params.tableId, route.query.v],
    (newVals, oldVals) => {
      const [newR, newT, newV] = newVals as [string, string, string?];
      const [oldR, oldT, oldV] = oldVals as [string, string, string?];

      // Eğer herhangi bir param değiştiyse ve yeni paramlar geçerli ise tekrar çalıştır
      if ((newR && newT) && (newR !== oldR || newT !== oldT || newV !== oldV)) {
        handleLoginAttack(newR, newT, newV ?? null);
      }
    }
);
</script>

<style scoped>
/* İstersen buraya stil ekle */
</style>
