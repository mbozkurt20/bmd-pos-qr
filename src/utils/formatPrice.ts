const formatPrice = (payload) => {
    const formatted = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
    }).format(payload);

    // Sembolü sona taşı
    if (formatted.startsWith('₺')) {
        return formatted.slice(1) + ' ₺';
    }
    return formatted;
}

export default formatPrice;