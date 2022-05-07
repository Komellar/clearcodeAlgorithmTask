export const compare = (prev, next) => {
  const result = {};

  function mainLoop(prevObj, nextObj) {
    for (const [key, value] of Object.entries(prevObj)) {
      if (typeof value !== "object") {
        result[key] = value !== nextObj[key];
      } else if (Array.isArray(value)) {
        arrayLoop(value, key, nextObj[key], result);
      } else {
        objectLoop(value, key, nextObj[key], result);
      }
    }
  }

  function arrayLoop(value, key, nextObj, tempResultObj) {
    tempResultObj[key] = [];
    if (value.every((x) => typeof x !== "object")) {
      if (value.length !== nextObj?.length) {
        tempResultObj[key] = true;
      } else {
        const tempResults = value.map((item, index) => item !== nextObj[index]);
        tempResultObj[key].push(tempResults.includes(true));
      }
    } else {
      objectLoop(value, key, nextObj, tempResultObj);
    }
  }

  function objectLoop(value, key, nextObj, tempResultObj) {
    if (!tempResultObj[key]) tempResultObj[key] = {};

    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      if (typeof nestedValue !== "object") {
        tempResultObj[key][nestedKey] = nestedValue !== nextObj?.[nestedKey];
      } else if (Array.isArray(nestedValue)) {
        arrayLoop(
          nestedValue,
          nestedKey,
          nextObj?.[nestedKey],
          tempResultObj[key]
        );
      } else {
        objectLoop(
          nestedValue,
          nestedKey,
          nextObj?.[nestedKey],
          tempResultObj[key]
        );
      }
    }
  }

  mainLoop(prev, next);
  mainLoop(next, prev);

  return result;
};
