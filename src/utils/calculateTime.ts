const calculateTime = (date: string) => {
    const date1 = new Date();
    const date2 = new Date(date);
    const decentralisation = date1 - date2;
    var saat = Math.floor(decentralisation / (1000 * 60 * 60));
    const dakika = Math.floor((decentralisation % (1000 * 60 * 60)) / (1000 * 60));
    const zero = "0";
    if(saat == -1 || dakika == -1 || dakika == 0){
        return `00:01`;    
    }
  
    return `${saat < 10 ? zero : ''}${saat}:${dakika < 10 ? '0' : ''}${dakika}`;
}

export default calculateTime;