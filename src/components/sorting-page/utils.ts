import { ElementStates } from '../../types/element-states';

// export function sortingSelectionAscending(arrayToSort: { data: number; type: ElementStates }[]) {
export function sortingSelectionAscending() {
  let result = [];

  let mockArray = [];

  for (let i = 0, j = 3 + Math.floor(Math.random() * 15); i < j; i++) {
    mockArray.push(Math.floor(Math.random() * 101));
  }

  // result.push(arrayToSort);
  result[0] = mockArray.map((elem) => {
    return { data: elem, type: ElementStates.Default };
  });
  console.log('mockArray: ', [...mockArray]);
  console.log('result: ', [...result]);

  let pointerA = 0,
    // wholeAmount = arrayToSort.length;
    wholeAmount = mockArray.length;

  let tempArray = [...mockArray];

  result[1] = tempArray.map((elem, key) => {
    return { data: elem, type: key < 2 ? ElementStates.Changing : ElementStates.Default };
  });

  while (pointerA < wholeAmount - 1) {
    console.log('tempArray: ', [...tempArray]);

    let pointerMin = pointerA;

    for (let i = pointerA + 1; i <= wholeAmount - 1; i++) {
      if (tempArray[i] < tempArray[pointerMin]) {
        pointerMin = i;
      }
      if (i < wholeAmount - 1) {
        result.push(
          tempArray.map((elem, key) => {
            let color;
            if (key < pointerA) {
              color = ElementStates.Modified;
            } else if (key === pointerA || key === i + 1) {
              color = ElementStates.Changing;
            } else {
              color = ElementStates.Default;
            }
            return { data: elem, type: color };
          })
        );
      }

      console.log('result333: ', result);
      // debugger;
    }
    if (pointerMin !== pointerA) {
      [tempArray[pointerMin], tempArray[pointerA]] = [tempArray[pointerA], tempArray[pointerMin]];
    }
    pointerA++;
    pointerA !== wholeAmount - 1
      ? result.push(
          tempArray.map((elem, key) => {
            let color;
            if (key < pointerA) {
              color = ElementStates.Modified;
            } else if (key === pointerA || key === pointerA + 1) {
              color = ElementStates.Changing;
            } else {
              color = ElementStates.Default;
            }
            return { data: elem, type: color };
          })
        )
      : result.push(
          tempArray.map((elem, key) => {
            return { data: elem, type: ElementStates.Modified };
          })
        );
  }
  // debugger;
  console.log(result);
}

export function sortingSelectionDescending() {
  let result = [];

  let mockArray = [];

  for (let i = 0, j = 3 + Math.floor(Math.random() * 15); i < j; i++) {
    mockArray.push(Math.floor(Math.random() * 101));
  }

  // result.push(arrayToSort);
  result[0] = mockArray.map((elem) => {
    return { data: elem, type: ElementStates.Default };
  });
  console.log('mockArray: ', [...mockArray]);
  console.log('result: ', [...result]);

  let pointerA = 0,
    // wholeAmount = arrayToSort.length;
    wholeAmount = mockArray.length;

  let tempArray = [...mockArray];

  result[1] = tempArray.map((elem, key) => {
    return { data: elem, type: key < 2 ? ElementStates.Changing : ElementStates.Default };
  });

  while (pointerA < wholeAmount - 1) {
    console.log('tempArray: ', [...tempArray]);

    let pointerMax = pointerA;

    for (let i = pointerA + 1; i <= wholeAmount - 1; i++) {
      if (tempArray[i] > tempArray[pointerMax]) {
        pointerMax = i;
      }
      if (i < wholeAmount - 1) {
        result.push(
          tempArray.map((elem, key) => {
            let color;
            if (key < pointerA) {
              color = ElementStates.Modified;
            } else if (key === pointerA || key === i + 1) {
              color = ElementStates.Changing;
            } else {
              color = ElementStates.Default;
            }
            return { data: elem, type: color };
          })
        );
      }

      console.log('result333: ', result);
      // debugger;
    }
    if (pointerMax !== pointerA) {
      [tempArray[pointerMax], tempArray[pointerA]] = [tempArray[pointerA], tempArray[pointerMax]];
    }
    pointerA++;
    pointerA !== wholeAmount - 1
      ? result.push(
          tempArray.map((elem, key) => {
            let color;
            if (key < pointerA) {
              color = ElementStates.Modified;
            } else if (key === pointerA || key === pointerA + 1) {
              color = ElementStates.Changing;
            } else {
              color = ElementStates.Default;
            }
            return { data: elem, type: color };
          })
        )
      : result.push(
          tempArray.map((elem, key) => {
            return { data: elem, type: ElementStates.Modified };
          })
        );
  }
  // debugger;
  console.log(result);
}
