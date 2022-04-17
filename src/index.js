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
    if (value.every((x) => typeof x !== "object")) {
      if (value.length !== nextObj?.length) {
        tempResultObj[key] = true;
      } else {
        const tempResults = value.map((item, index) => item !== nextObj[index]);
        tempResultObj[key] = tempResults.includes(true) ? true : false;
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

//
// You can test it like below. Just uncomment and pass your objects
//

// const prev = {
//   uuid: "1013251d",
//   name: "Campaign 1",
//   total_budget_amount: 123456700,
//   start_date: "2022-03-11T13:37:37Z",
//   end_date: "2022-03-31T12:37:37Z",
//   active: true,
//   agency: {
//     uuid: "b6ca2ee1",
//     name: "Agency 1",
//     tags: ["one", "two"],
//     accounts: 2
//   },
//   line_items: [
//     {
//       uuid: "1ab24a77",
//       name: "Line Item #1",
//       type: "DISPLAY",
//       whitelist: ["https://google.com", "https://yahoo.com"],
//       active: false,
//       budget_amount: 12345600,
//       payment_model: {
//         uuid: "1a5f0a9b",
//         name: "CPC",
//         code: "CPC"
//       }
//     }
//   ]
// };

// const next = {
//   uuid: "1013251d",
//   name: "Campaign 2",
//   total_budget_amount: 2423,
//   end_date: "2022-03-31T12:37:37Z",
//   active: false,
//   agency: {
//     uuid: "b6ca2ee1",
//     name: "Agency 1",
//     accounts: 2
//   }
// };

// console.log(compare(prev, next));
