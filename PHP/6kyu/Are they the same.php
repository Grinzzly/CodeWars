function sorter($arr) {
    asort($arr);
    return $arr;
}

function comp($a1, $a2) {
    if(is_array($a1) && is_array($a2)) {
        if(empty($a1) && empty($a2)) {
            return true;
        }
        $unsquared = array_map("sqrt", $a2);
        $sortedFirst = sorter($a1);
        $sortedSecond = sorter($unsquared);
        if(array_sum($sortedFirst) == array_sum($sortedSecond)) {
            return true;
        }
    }
    return false;
}