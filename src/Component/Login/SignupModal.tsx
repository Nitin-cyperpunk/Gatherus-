'use client'
import React, { useState } from 'react';
import { supabase } from '@/app/lib/supabase';

interface SignInProps {
  onClose: () => void;
}
const SignIn = ({ onClose }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) setMessage(error.message);
    else setMessage('Check your email for the confirmation link!');
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signed in successfully! ✅');

      setTimeout(() => {
        onClose(); // ✅ Close modal
      }, 500);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold text-center">Sign In / Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />

      <div className="flex justify-between">
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          Sign In
        </button>

        <button
          onClick={handleSignUp}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          disabled={loading}
        >
          Sign Up
        </button>
      </div>

      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};


export default SignIn;
