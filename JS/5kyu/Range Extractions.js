function solution(list) {
	var i, border = 3, range = [], res = [];
	for (i = 0; i < list.length; i++) {
		range.push(list[i]);
		if (range[range.length - 1] + 1 !== list[i + 1]) {
			if (range.length >= border) {
				res.push(range[0] + "-" + range[range.length - 1]);
			} else {
				while (range.length > 0) {
					res.push(range.shift());
				}
			}
			range = [];
		}
	}
	return res.join();
}