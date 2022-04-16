export const compare = (prev, next) => {
  const result = {};

  function mainLoop(prevObj, nextObj) {
    for (const [key, value] of Object.entries(prevObj)) {
      if (typeof value !== "object") {
        result[key] = value !== next[key];
      } else if (Array.isArray(value)) {
        arrayLoop(value, key, nextObj[key], result);
      } else {
        objectLoop(value, key, nextObj[key], result);
      }
    }
  }

  function arrayLoop(value, key, nextObj, tempResultObj) {
    console.log("-------ARRAY LOOP-------");
    console.log("key", key);
    console.log("tempResult", tempResultObj);

    if (value.every((x) => typeof x !== "object")) {
      console.log("NOT AN OBJECT");

      if (value.length !== nextObj.length) {
        console.log("here1");
        tempResultObj[key] = true;
      } else {
        console.log("here2");
        const tempResults = value.map((item, index) => item !== nextObj[index]);
        tempResultObj[key] = tempResults.includes(true) ? true : false;
      }
    } else {
      console.log("IT HAS OBJECT");
      objectLoop(value, key, nextObj, tempResultObj);
    }
  }

  function objectLoop(value, key, nextObj, tempResultObj = {}) {
    tempResultObj[key] = {};
    console.log("------OBJECT LOOP-------");
    console.log("tempResultObj", tempResultObj);

    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      if (typeof nestedValue !== "object") {
        console.log("nestedKey: ", nestedKey);
        console.log("key:", key);

        tempResultObj[key][nestedKey] = nestedValue !== nextObj[nestedKey];
      } else if (Array.isArray(nestedValue)) {
        arrayLoop(
          nestedValue,
          nestedKey,
          nextObj[nestedKey],
          tempResultObj[key]
        );
      } else {
        objectLoop(
          nestedValue,
          nestedKey,
          nextObj[nestedKey],
          tempResultObj[key]
        );
      }
    }
  }

  mainLoop(prev, next);

  return result;
};

const prev1 = {
  uuid: "1013251d",
  agency: {
    uuid: "b6ca2ee1",
    name: "Agency 2",
    tags: ["one", "two"],
    accounts: 2
  }
};

const next1 = {
  uuid: "1013251d",
  agency: {
    uuid: "b6ca2ee1",
    name: "Agency 1",
    tags: ["one", "two", "three"],
    accounts: 2
  }
};

const prev = {
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
  },
  line_items: [
    {
      uuid: "1ab24a77",
      name: "Line Item #1",
      type: "DISPLAY",
      whitelist: ["https://google.com", "https://yahoo.com"],
      active: false,
      budget_amount: 12345600,
      payment_model: {
        uuid: "1a5f0a9b-b3a8-43e0-b0d7-419e70ab929c",
        name: "CPC",
        code: "CPC"
      }
    }
  ]
};

const next = {
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
  },
  line_items: [
    {
      uuid: "1ab24a77",
      name: "Line Item #1",
      type: "VIDEO",
      whitelist: ["https://yahoo.com"],
      active: false,
      budget_amount: 12345600,
      payment_model: {
        uuid: "1a5f0a9b",
        name: "CPC",
        code: "CPC"
      }
    },
    {
      uuid: "2bb02s125",
      name: "Line Item #2",
      type: "VIDEO",
      whitelist: ["https://yahoo.com"],
      active: true,
      budget_amount: 58890,
      payment_model: {
        uuid: "1a5f0a9b",
        name: "CPV",
        code: "CPV"
      }
    }
  ]
};

// const comparisonResult = compare(prev1, next1);
const comparisonResult = compare(prev, next);
console.log(comparisonResult);
