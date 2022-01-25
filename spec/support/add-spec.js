//ONE DESCRIBE FUNCTION IS ONE SUIT
// MULTPLE 'IT' FUNCTIONS ARE KNOWNS AS SPECS (SPECS CAN BE 1 OR MULTIPLE)
// you can say specs == testcases
var app = require("../../test");
describe("Addition", function () {
  it("The function should add 2 numbers", function () {
    var value = app.AddNumber(5, 15);
    expect(value).toBeGreaterThan(10);
  });
  it("The function should add 2 lumbers", function () {
    var value = app.AddNumber(15, 5);
    expect(value).toBe(20);
  });
});
