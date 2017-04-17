function digital_root(n) {
	while (n > 9) {
		n = n.toString().split('').reduce(function(res, c) {
			return res + parseInt(c, 10);
		}, 0);
	}
	return n;
}