import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminLoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function AdminLogin({ setIsAuthenticated }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (email === 'pateron' && password === 'pateron') {
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
      setIsLoading(false);
    }, 400);
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">아이디</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 text-white rounded-lg px-4 py-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 mt-8"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
