export default (platform: string) => {
    switch (platform) {
        case "trendyol":
            return "/trendyol.png";
        case "yemeksepeti":
            return "/yemeksepeti.png";
        case "getir":
            return "/getir.png";
        case "migros":
            return "/migros.png";
    }
}