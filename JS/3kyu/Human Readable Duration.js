const formatDuration = seconds => {
    if (seconds === 0) return 'now';
    const years   = units(seconds, 31536000, "year"),
        days    = units(years.remainder, 86400, "day"),
        hours   = units(days.remainder, 3600, "hour"),
        minutes = units(hours.remainder, 60, "minute"),
        secs    = units(minutes.remainder, 1, "second");

    let arr = [years, days, hours, minutes, secs];
    arr = arr.filter(item => {
        return !!item.value;
    });

    let result = arr[0].str;
    if ( arr.length === 1){return result;}

    for ( let i = 1; i < arr.length - 1; i++ ){
        result = result + ", " + arr[i].str;
    }
    result = result + " and " + arr[arr.length-1].str;
    return result;
};

const units = (numerator, divisor, unit) => {
    let result = {};
    result.value = Math.floor(numerator/divisor);
    result.remainder = numerator - result.value*divisor;
    if (result.value === 0){return result;}

    result.str  = ""+result.value+" "+unit;
    if (result.value > 1) result.str = result.str + "s";
    return result;
};