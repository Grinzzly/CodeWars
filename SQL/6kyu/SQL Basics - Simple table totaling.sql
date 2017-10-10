SELECT
  RANK() OVER (ORDER BY SUM(points) DESC) AS rank,
  COALESCE(NULLIF(clan,''), '[no clan specified]') AS clan,
  SUM(points) AS total_points,
  COUNT(name) AS total_people
FROM people
GROUP BY clan;