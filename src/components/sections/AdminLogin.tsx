import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminLoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function AdminLogin({ setIsAuthenticated }: AdminLoginProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'pateron' && password === 'pateron') {
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        <h1 
          onClick={() => navigate('/')}
          className="text-3xl font-bold tracking-[0.3em] uppercase text-center mb-12 text-gray-900 cursor-pointer hover:opacity-80 transition-opacity"
        >
          PATERON
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] text-gray-400 mb-1.5 font-light uppercase tracking-wider">
              ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full bg-[#EBEBEB] border border-[#E0E0E0] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-[11px] text-gray-400 mb-1.5 font-light uppercase tracking-wider">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#EBEBEB] border border-[#E0E0E0] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all text-sm"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center mt-2">{error}</p>
          )}

          {/* 숨겨진 제출 버튼 (엔터키로 로그인 가능하도록) */}
          <button type="submit" className="hidden">Login</button>
        </form>
      </div>
    </div>
  );
}
