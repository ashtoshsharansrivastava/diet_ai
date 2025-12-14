import React from 'react';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
          <button className="w-full bg-primary text-white py-3 rounded-lg font-bold">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;