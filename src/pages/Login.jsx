import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login logic here");
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Enter your details to access your diet plans.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="you@example.com" 
              icon={<Mail size={18}/>}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={<Lock size={18}/>}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end">
              <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Forgot Password?</a>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/generate" className="font-bold text-emerald-600 hover:text-emerald-700">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;