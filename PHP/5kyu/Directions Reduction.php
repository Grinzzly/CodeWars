function dirReduc(array $arr): array {
    $opposite = ["NORTH-SOUTH", "SOUTH-NORTH", "WEST-EAST", "EAST-WEST"];
    $string = implode("-", $arr);
    for($i=0; $i<count($arr)/2; $i++) {
        $string = trim(str_replace($opposite, "", $string), "-");
        $string = str_replace("--", "-", $string);
    }
    if (strlen($string) == 0) return [];
    return explode("-", $string);
}