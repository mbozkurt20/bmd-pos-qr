const formatDate = (timestamp: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric',year:'numeric'};
    return new Date(timestamp).toLocaleTimeString('tr-TR', options);
};

export default formatDate;
