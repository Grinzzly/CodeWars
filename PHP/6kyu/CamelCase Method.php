function camel_case(string $s): string {
  return str_replace(' ', '', ucwords($s));
}