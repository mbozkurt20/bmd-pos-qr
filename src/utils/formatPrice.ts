const formatPrice = (payload) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency', currency: 'TRY',
        minimumFractionDigits: 0,
    }).format(
        payload,
    );
}

export default formatPrice;