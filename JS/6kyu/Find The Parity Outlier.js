function findOutlier(integers){
    const length = integers.length;
    let even = [];
    let odd = [];
    for (let i=0; i<length; i++) {
        if (integers[i] % 2 === 0) {
            even.push(integers[i]);
        } else if (Math.abs(integers[i] % 2) === 1) {
            odd.push(integers[i]);
        }
    }
    return (even.length > odd.length) ? odd[0] : even[0];
}