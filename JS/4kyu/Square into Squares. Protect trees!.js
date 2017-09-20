function decompose(n) {
    let result = decomposer(n, n * n);
    return result == null ? null : result.slice(0, result.length - 1);
}

function decomposer(n, remain){
    if(remain == 0) {
        return [n];
    }

    for(let i = n - 1; i > 0; i--){
        if((remain - i * i) >= 0){
            let r = decomposer(i, (remain - i * i));

            if(r != null){
                r.push(n);
                return r;
            }
        }
    }
    return null;
}