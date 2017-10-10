function DNA_strand($dna) {
    for ($i = 0; $i < strlen($dna); $i++) {
        switch ($dna[$i]) {
            case 'A':
                $dna[$i] = 'T';
                break;
            case 'T':
                $dna[$i] = 'A';
                break;
            case 'C':
                $dna[$i] = 'G';
                break;
            case 'G':
                $dna[$i] = 'C';
                break;
        }
    }
    return $dna;
}