export function timeLogic() {
  let properTimeDisplay = [];

  for (let time = 7; time <= 16; time += 2) {
    properTimeDisplay.push({
      from: time.toString() + ":00",
      to: (time + 2).toString() + ":00",
    });
  }

  return properTimeDisplay;
}
