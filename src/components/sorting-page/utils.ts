import { ElementStates } from '../../types/element-states';

// export function sortingSelectionAscending(arrayToSort: { data: number; type: ElementStates }[]) {
export function sortingSelectionAscending(result: Array<{ data: number; type: ElementStates }[]>, mockArray: number[]) {
  let pointerA = 0;
  let wholeAmount = mockArray.length;

  let tempArray = [...mockArray];

  result[1] = tempArray.map((elem, key) => {
    return { data: elem, type: key < 2 ? ElementStates.Changing : ElementStates.Default };
  });
  while (pointerA < wholeAmount - 1) {
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
}

export function sortingSelectionDescending(result: Array<{ data: number; type: ElementStates }[]>, mockArray: number[]) {
  let pointerA = 0;
  // wholeAmount = arrayToSort.length;
  let wholeAmount = mockArray.length;

  let tempArray = [...mockArray];

  result[1] = tempArray.map((elem, key) => {
    return { data: elem, type: key < 2 ? ElementStates.Changing : ElementStates.Default };
  });

  while (pointerA < wholeAmount - 1) {
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
}

export function sortingBubbleAscending(result: Array<{ data: number; type: ElementStates }[]>, mockArray: number[]) {}

export function sortingBubbleDescending(result: Array<{ data: number; type: ElementStates }[]>, mockArray: number[]) {}
