function findOutlier(integers){
	var length = integers.length;
	var even = [];
	var odd = [];
	for (i=0; i<length; i++) {
		if (integers[i] % 2 == 0) {
			even.push(integers[i]);
		} else if (Math.abs(integers[i] % 2) == 1) {
			odd.push(integers[i]);
		}
	}
	if (even.length > odd.length){
		return odd[0];
	} else {
		return even[0];
	}
}
