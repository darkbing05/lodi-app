import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
