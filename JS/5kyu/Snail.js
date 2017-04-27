snail = function(array) {
	var res = [];
	while(array.length) {
		res = res.concat(array.shift())
		array = expand(array);
	}
	return res;
}

function expand(matrix){
	return matrix.reduce(function(res, arr, i){
		arr.forEach(function(n, j){
			if (!res[j]) res[j] = [];
			res[j][i] = n;
		})
		return res;
	}, []).reverse();
}