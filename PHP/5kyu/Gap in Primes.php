function isPrime($num) {
    if ($num == 1) {
        return false;
    }
    if ($num == 2) {
        return true;
    }
    if ($num % 2 == 0) {
        return false;
    }
    for ($i = 3; $i <= ceil(sqrt($num)); $i = $i + 2) {
        if ($num % $i == 0) {
            return false;
        }
    }
    return true;
}

function gap($gap, $start, $stop) {
    $lastPrime = 2;
    foreach (range($start, $stop + 1) as $i) {
        if (isPrime($i)) {
            if ($i - $lastPrime == $gap) {
                return [$lastPrime, $i];
            } else {
                $lastPrime = $i;
            }
        }
    }
}