import { compare } from "./index";
import { expect } from "chai";

/* Do not edit this file */

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
        uuid: "1a5f0a9b",
        name: "CPC",
        code: "CPC"
      }
    }
  ]
};

describe("Test compare function", () => {
  it("should match the output when some fields content changes", () => {
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
        }
      ]
    };

    const result = {
      uuid: false,
      name: true,
      total_budget_amount: true,
      start_date: false,
      end_date: false,
      active: true,
      agency: { uuid: false, name: false, tags: true, accounts: false },
      line_items: [
        {
          uuid: false,
          name: false,
          type: true,
          whitelist: true,
          active: false,
          budget_amount: false,
          payment_model: {
            uuid: false,
            name: false,
            code: false
          }
        }
      ]
    };

    expect(compare(prev, next)).to.deep.equal(result);
  });

  it("should match the output when new fields are present inside next object", () => {
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

    const result = {
      uuid: false,
      name: true,
      total_budget_amount: true,
      start_date: false,
      end_date: false,
      active: true,
      agency: { uuid: false, name: false, tags: true, accounts: false },
      line_items: [
        {
          uuid: false,
          name: false,
          type: true,
          whitelist: true,
          active: false,
          budget_amount: false,
          payment_model: {
            uuid: false,
            name: false,
            code: false
          }
        },
        {
          uuid: true,
          name: true,
          type: true,
          whitelist: true,
          active: true,
          budget_amount: true,
          payment_model: {
            uuid: true,
            name: true,
            code: true
          }
        }
      ]
    };

    expect(compare(prev, next)).to.deep.equal(result);
  });

  it("should match the output when some fields are removed from next content", () => {
    const next = {
      uuid: "1013251d",
      name: "Campaign 2",
      total_budget_amount: 2423,
      end_date: "2022-03-31T12:37:37Z",
      active: false,
      agency: {
        uuid: "b6ca2ee1",
        name: "Agency 1",
        accounts: 2
      }
    };

    const result = {
      uuid: false,
      name: true,
      total_budget_amount: true,
      start_date: true,
      end_date: false,
      active: true,
      agency: { uuid: false, name: false, tags: true, accounts: false },
      line_items: [
        {
          uuid: true,
          name: true,
          type: true,
          whitelist: true,
          active: true,
          budget_amount: true,
          payment_model: {
            uuid: true,
            name: true,
            code: true
          }
        }
      ]
    };

    expect(compare(prev, next)).to.deep.equal(result);
  });
});
