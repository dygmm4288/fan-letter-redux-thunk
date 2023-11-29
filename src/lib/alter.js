export function alter(conditionFunction) {
  return (a, b) => (conditionFunction() ? a : b);
}

export function tab(x) {
  console.log(x);
  return x;
}
