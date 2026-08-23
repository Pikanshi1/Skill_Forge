const resetPasswordTemplate = (name: string, resetLink: string) => {
	return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Password Reset</title>
</head>

<body style="font-family:Arial,sans-serif;background:#f5f7fb;padding:40px;">

<div style="max-width:600px;margin:auto;background:white;padding:40px;border-radius:16px;">

<h1 style="color:#6D28D9;">
AI Course Builder
</h1>

<h2>Hello ${name},</h2>

<p>
We received a request to reset your password.
</p>

<p>
Click the button below to create a new password.
</p>

<div style="margin:35px 0;text-align:center;">

<a
href="${resetLink}"
style="
background:#6D28D9;
padding:14px 28px;
color:white;
text-decoration:none;
border-radius:8px;
display:inline-block;
font-weight:bold;
"
>

Reset Password

</a>

</div>

<p>
This link will expire in
<strong>15 minutes.</strong>
</p>

<p>
If you didn't request this password reset,
you can safely ignore this email.
</p>

<hr style="margin:35px 0;">

<p style="color:#777;font-size:14px;">
AI Course Builder Team
</p>

</div>

</body>

</html>
`;
};

export default resetPasswordTemplate;
