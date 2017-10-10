SELECT
  id,
  name,
  TRIM(',' FROM SPLIT_PART(characteristics, ' ', 1)) as characteristic
FROM monsters
ORDER BY id;