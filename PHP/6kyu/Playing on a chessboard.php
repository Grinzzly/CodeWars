function convert_decimal_to_fraction($decimal) {
    $bottom = 1;
    while (fmod($decimal, 1) != 0.0) {
        $decimal *= 2;
        $bottom += 1;
    }
    return [
        (int) sprintf('%.0f', $decimal),
        (int) sprintf('%.0f', $bottom),
    ];
}

function game($n) {
    $answer = $n * ($n / 2);
    if (is_float($answer)) {
        return convert_decimal_to_fraction($answer);
    }
    return [$n * ($n / 2)];
}