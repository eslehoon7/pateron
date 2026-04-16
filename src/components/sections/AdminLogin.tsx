import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';

interface AdminLoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function AdminLogin({ setIsAuthenticated }: AdminLoginProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'eslehoon7@gmail.com') {
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        setError('관리자 권한이 없는 계정입니다.');
        await auth.signOut();
      }
    } catch (err: any) {
      console.error(err);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
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
        
        <div className="space-y-5">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gray-900 text-white rounded-lg px-4 py-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isLoading ? '로그인 중...' : 'Google 계정으로 관리자 로그인'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
