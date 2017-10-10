SELECT
  id,
  name,
  POSITION(',' IN characteristics) as comma
FROM monsters
ORDER BY comma;