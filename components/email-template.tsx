import * as React from "react";

interface EmailTemplateProps {
  otp: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  otp,
}) => (
  <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
    <div style={{ color: "#000000", textAlign: "left" }}>
      <h1 style={{ margin: "1rem 0" }}>Verification code</h1>
      <p style={{ paddingBottom: "16px" }}>
        Please use the verification code below to sign in.
      </p>
      <p style={{ paddingBottom: "16px" }}>
        <strong style={{ fontSize: "130%" }}>{otp}</strong>
      </p>
      <p style={{ paddingBottom: "16px" }}>
        OTP is valid for 5 minutes. If you didn’t request this, you can ignore
        this email.
      </p>
    </div>
  </div>
);
