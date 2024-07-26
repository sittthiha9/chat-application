import { useState } from 'react';
import { sendResetEmail } from '@/utils/sendResetEmail';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await sendResetEmail(email);
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Email</button>
      </form>
    </div>
  );
}