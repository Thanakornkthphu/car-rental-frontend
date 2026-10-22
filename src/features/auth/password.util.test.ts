import assert from "node:assert/strict";
import { test } from "node:test";
import { getPasswordError, MIN_PASSWORD_LENGTH, PASSWORD_CRITERIA } from "./password.util";

test("rejects an empty or short password, preserving the existing minimum length", () => {
  assert.equal(getPasswordError(""), `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  assert.notEqual(getPasswordError("Ab1!"), null);
  assert.equal(getPasswordError("Abc1!x"), null);
});

test("reports the missing criterion with the same English wording used by the form", () => {
  const cases = ["ABC123!", "abc123!", "Abcdef!", "Abcd123"];
  cases.forEach((password, index) => {
    assert.equal(getPasswordError(password), `Your password must include ${PASSWORD_CRITERIA[index].message}.`);
  });
});

test("accepts every requested special character and checks repeatedly without regex state", () => {
  for (const symbol of '!@#$%^&*(),.?":{}|<>+-/_=') {
    assert.equal(getPasswordError(`Abc12${symbol}`), null, `Expected to accept ${symbol}`);
    assert.equal(getPasswordError(`Abc12${symbol}`), null);
  }
});

test("spaces and unlisted symbols do not satisfy the special-character rule", () => {
  for (const password of ["Abc123 ", "Abc123;", "Abc123[", "Abc123🙂"]) {
    assert.equal(getPasswordError(password), `Your password must include ${PASSWORD_CRITERIA[3].message}.`);
  }
});
