const formatTime = (timestamp: Date): string => {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    return new Date(timestamp).toLocaleTimeString('tr-TR', options);
};

export default formatTime;
