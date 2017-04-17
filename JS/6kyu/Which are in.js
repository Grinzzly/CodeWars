function inArray(arr1, arr2) {
	return arr1.filter(function(a) {
		return arr2.some(function(b) {
			return b.indexOf(a) > -1;
		});
	}).sort();
}