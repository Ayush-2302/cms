import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ayushkumarakt@gmail.com",
    pass: "mfre mkgs exew uget",
  },
});

// Function to send verification email
export const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:4000/api/user/verify-email?token=${token}`;

  const mailOptions = {
    from: "ayushkumarakt@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking the link below:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  };

  await sendMail(transporter, mailOptions);
};

export const sendResetPasswordEmail = async (email, token) => {
  const resetPasswordLink = `http://localhost:4000/api/user/reset-password?token=${token}`;

  const mailOptions = {
    from: "ayushkumarakt@gmail.com",
    to: email,
    subject: "Reset Your Password",
    html: `<body>
    <h1>Reset Your Password</h1>
    <p>Please enter your new password below:</p>
    <form action=${resetPasswordLink} method="POST">
        <input type="hidden" name="token" value="{token}" />
        <label for="password">New Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <label for="confirmPassword">Confirm New Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required>
        <br>
        <button type="submit">Reset Password</button>
    </form>
</body>`,
  };

  await sendMail(transporter, mailOptions);
};

// Function to send mail
const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
