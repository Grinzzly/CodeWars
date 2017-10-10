function johnAnn($n) {
    $johnList = array(0);
    $annList = array(1);
    if ($n == 0) {
        return 0;
    }
    $i = 1;

    while ($i < $n) {
        $j = $johnList[$i - 1];
        $a1 = $annList[$j];
        array_push($johnList, $i - $a1);
        $a = $annList[$i - 1];
        $j1 = $johnList[$a];
        array_push($annList, $i - $j1);
        $i++;
    }

    return array($annList, $johnList);
}

function john($n) {
    return johnAnn($n)[1];
}

function ann($n) {
    return johnAnn($n)[0];
}

function sumJohn($n) {
    return array_sum(johnAnn($n)[1]);
}

function sumAnn($n) {
    return array_sum(johnAnn($n)[0]);
}