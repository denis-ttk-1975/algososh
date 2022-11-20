export function sleep(milliseconds: number, variable?: any) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
    console.log(variable);
  } while (currentDate - date < milliseconds);
}
