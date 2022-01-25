const Request = require("request");
//ONE DESCRIBE FUNCTION IS ONE SUIT
// MULTPLE 'IT' FUNCTIONS ARE KNOWNS AS SPECS (SPECS CAN BE 1 OR MULTIPLE)
// you can say specs == testcases
function makeApiCall() {
  return new Promise((res, rej) => {
    try {
      let data = {};
      Request.get(
        "http://127.0.0.1:3000/api/user/",
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = response.body;
          res(data);
        }
      );
    } catch (err) {
      rej(err);
    }
  });
}

describe("GET /", function () {
  //   beforeAll(() => {
  //     server = require("../../../index");
  //   });
  //   afterAll(() => {
  //     server.close();
  //   });
  it("Users data", async function () {
    let response = await makeApiCall();
    expect(response.status).toBe(200);
  });
});
