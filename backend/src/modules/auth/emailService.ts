import sendEmail from "../../utils/sendEmail.js";

export const sendResetPasswordEmail = async (
	email: string,
	resetLink: string,
) => {
	await sendEmail({
		to: email,
		subject: "Reset your AI Course Builder password",
		html: `
        <div style="font-family: Arial">

          <h2>
            Password Reset Request
          </h2>

          <p>
            You requested to reset your password.
          </p>

          <p>
            Click the button below:
          </p>


          <a
            href="${resetLink}"
            style="
              background:#4f46e5;
              color:white;
              padding:12px 20px;
              border-radius:8px;
              text-decoration:none;
            "
          >
            Reset Password
          </a>


          <p>
            This link expires soon.
          </p>

        </div>
      `,
	});
};
