const cron = require("node-cron");
const mailer = require("nodemailer");

const transporter = mailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: "gmail",
  auth: {
    user: "saud.saleem@invozone.com",
    pass: "sjzmjpsdevstmkun",
  },
});

// function sendEmail(message) {
//   transporter
//     .sendMail({
//       from: '"Saud" <saud.saleem@invozone.com>',
//       to: '"You there" <saudsaleem6@gmail.com>',
//       subject: "Scheduled Email",
//       text: message,
//     })
//     .then((_) => {
//       console.log("Email sent on " + new Date());
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

const scheduleEmail = (req, res) => {
  cron.schedule("*/2 * * * *", () => {
    transporter.sendMail({
      from: '"Saud" <saud.saleem@invozone.com>',
      to: '"You there" <saudsaleem6@gmail.com>',
      subject: "Scheduled Email",
      text: "hello brotheeee",
    });
  });
  res.status(200).send("job started");
};
//send mail to user about registration
const sendEmail = (userData) => {
    transporter.sendMail({
      from: '"Saud" <saud.saleem@invozone.com>',
      to: '"You there" <saudsaleem6@gmail.com>',
      subject: "Testing mail",
      text: "Congrats You enroll in UCP",
    });
};


module.exports = {
  scheduleEmail,
  sendEmail
};
