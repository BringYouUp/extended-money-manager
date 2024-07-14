import { Timestamp } from "firebase/firestore";
import { describe, expect, test } from "vitest";

import { toSerializeActualFirestoreFormatDate } from "./index";

type TestType = {
  updatedAt: Timestamp | string;
};

describe("toSerializeActualFirestoreFormatDate", () => {
  const now = new Date();
  const testTimestamp = new Timestamp(now.valueOf() / 1000, 0);
  const mock = { updatedAt: testTimestamp };

  test("general", () => {
    toSerializeActualFirestoreFormatDate<TestType>(mock);
    expect(mock).toEqual({
      updatedAt: now.toISOString(),
    });
  });
});
