const calculateTime = (date: string) => {
    const now = new Date();
    const givenDate = new Date(date);
    const diff = now.getTime() - givenDate.getTime(); // milisaniye farkı

    if (diff <= 0) {
        return '00:01'; // Gelecekteki tarihler veya aynı anda olursa
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
};

export default calculateTime;
