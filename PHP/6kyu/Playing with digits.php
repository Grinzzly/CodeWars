function digPow($n, $p) {
    $arr = str_split(strval($n));
    $newArr = [];
    for($i = $p, $j = 0; $j < count($arr); $j++, $i++) {
        array_push($newArr, intval($arr[$j]) ** $i);
    }
    $answer = array_sum($newArr) / $n;
    if(is_float($answer)) {
        return -1;
    }
    return $answer;
}