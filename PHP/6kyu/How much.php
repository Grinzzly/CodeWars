function howmuch($m, $n){
    $answers = [];
    $i;
    $max;
    if ($n < $m) {
        $i   = $n;
        $max = $m;
    } else {
        $i   = $m;
        $max = $n;
    }
    for (; $i <= $max; ++$i) {
        $b = $i % 7;
        $c = $i % 9;
        if ($c == 1 && $b == 2) {
            array_push($answers, [
                'M: ' . $i,
                'B: ' . floor($i / 7),
                'C: ' . floor($i / 9),
            ]);
        }
    }
    return $answers;
}