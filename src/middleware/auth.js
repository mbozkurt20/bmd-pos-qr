import router from "../router/index.js";

export default function auth({ to, next }) {
    const token = localStorage.getItem('token') ?? null;
    const table = localStorage.getItem('table') ?? null;
    const restaurantCode = localStorage.getItem('restaurantCode') ?? null;

    if (!token) {
        // Kullanıcı giriş yapmamışsa sadece giriş sayfasına gitmesine izin ver
        if (to.name === 'Login' || to.fullPath === '/') {
            return next();
        } else {
            localStorage.clear()
            return next({ path: `/restaurant/${restaurantCode}/table/${table}` });
        }
    } else {
        // Kullanıcı giriş yapmışsa ve /login sayfasına gitmeye çalışıyorsa, onu /index'e yönlendir
        if (to.name === 'Login' || to.fullPath === '/') {
            localStorage.clear()
            return next({ path: `/restaurant/${restaurantCode}/table/${table}` });
        }
        // Kullanıcı giriş yapmışsa, istediği sayfaya gidebilsin
        return next();
    }
}
