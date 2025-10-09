import router from "../router/index.js";

export default function auth({ to, next }) {
    // Her QR kod okutulduğunda veya sayfa değişiminde storage sıfırlanacak
    localStorage.clear();

    // Eğer kullanıcı login sayfasına gidiyorsa izin ver
    if (to.name === 'Login' || to.fullPath === '/') {
        return next();
    }

    // Diğer sayfalara gitmeye çalışırsa login sayfasına yönlendir
    return next({ name: 'Login' });
}
