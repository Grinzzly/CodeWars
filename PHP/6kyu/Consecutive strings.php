function longestConsec($strarr, $k) {
    $n = "";
    if($k > count($strarr) || $k <= 0) {
        return $n;
    }
    for($i = 0; $i < count($strarr); $i++) {
        $current = "";
        $max = $i + ($k - 1);
        $scope = range($i, $max);
        if($max >= count($strarr)) {
            $scope = range($i, count($strarr) - 1);
        }
        for($j = 0; $j < count($scope); $j++) {
            $current .= $strarr[$scope[$j]];
        }
        if(strlen($current) > strlen($n)) {
            $n = $current;
        }
    }
    return $n;
}