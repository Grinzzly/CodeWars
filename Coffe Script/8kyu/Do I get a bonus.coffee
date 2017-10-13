bonusCalc = (x) ->
  if x then 10 else 1;
bonusTime = ( salary,bonus ) ->
  "\u00A3"+salary * (bonusCalc bonus);