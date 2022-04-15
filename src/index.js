export const compare = (prev, next) => {
  const result = {};

  function mainLoop(prevObj, nextObj) {
    for (const [key, value] of Object.entries(prevObj)) {
      if (typeof value !== "object") {
        result[key] = value !== next[key];
      } else if (Array.isArray(value)) {
        arrayLoop(value, key, nextObj[key]);
      } else {
        objectLoop(value, key, nextObj[key]);
      }
    }
  }

  function arrayLoop(value, key, nextObj, tempResultObj) {
    console.log("-------ARRAY LOOP-------");
    // console.log("value", value);
    // console.log("nextObj", nextObj);
    console.log("key", key);
    console.log("tempResult", tempResultObj);

    if (value.every((x) => typeof x !== "object")) {
      console.log("NOT AN OBJECT");

      if (value.length !== nextObj.length) {
        console.log("here1");
        tempResultObj[key] = true;
        // result[key] = true;
      } else {
        console.log("here2");
        const tempResults = value.map((item, index) => item !== nextObj[index]);
        // result[key] = tempResults.includes(true) ? true : false;
        tempResultObj[key] = tempResults.includes(true) ? true : false;
      }
    } else {
      console.log("IT HAS OBJECT");
      objectLoop(value, key, nextObj);
    }
  }

  function objectLoop(value, key, nextObj) {
    const tempResultObj = {};
    result[key] = {};
    console.log("------OBJECT LOOP-------");
    // console.log("value: ", value);
    // console.log("nextObj", nextObj);

    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      if (typeof nestedValue !== "object") {
        // console.log("nestedValue:", nestedValue);
        console.log("nestedKey: ", nestedKey);
        console.log("key:", key);

        tempResultObj[nestedKey] = nestedValue !== nextObj[nestedKey];
        // console.log(tempResultObj);

        // result[key][nestedKey] = nestedValue !== nextObj[nestedKey];
      } else if (Array.isArray(nestedValue)) {
        arrayLoop(nestedValue, nestedKey, nextObj[nestedKey], tempResultObj);
      }
      // else {
      // objectLoop(nestedValue, nestedKey, nextObj[nestedKey]);
      // }
    }
    result[key] = tempResultObj;
    console.log(tempResultObj);
  }

  mainLoop(prev, next);

  return result;
};

const prev1 = {
  uuid: "1013251d",
  name: "Campaign 1",
  total_budget_amount: 123456700,
  start_date: "2022-03-11T13:37:37Z",
  end_date: "2022-03-31T12:37:37Z",
  active: true,
  agency: {
    uuid: "b6ca2ee1",
    name: "Agency 1",
    tags: ["one", "two"],
    accounts: 2
  }
};

const next1 = {
  uuid: "1013251d",
  name: "Campaign 2",
  total_budget_amount: 2423,
  start_date: "2022-03-11T13:37:37Z",
  end_date: "2022-03-31T12:37:37Z",
  active: false,
  agency: {
    uuid: "b6ca2ee1",
    name: "Agency 1",
    tags: ["one", "two", "three"],
    accounts: 2
  }
};

const comparisonResult = compare(prev1, next1);
console.log(comparisonResult);
