// import nodemailer from 'nodemailer';

// export async function sendResetEmail(email) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password'
//     }
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Password Reset',
//     text: 'Click the link to reset your password: <reset-link>'
//   };

//   await transporter.sendMail(mailOptions);
// }