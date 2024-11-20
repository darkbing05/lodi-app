import React from 'react';
import { Home, Music2, Disc3 } from 'lucide-react';

const NotFoundPage = () => {
  const discAnimation = {
    animationName: 'spin',
    animationDuration: '4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="m-auto text-center p-8">
        <div className="relative mb-8">
          {/* <Disc3 size={120} className="text-white mx-auto" style={discAnimation} /> */}
          <Music2 size={48} className="text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          404
        </h1>
        <p className="text-2xl text-blue-100 mb-8">
          Looks like this track skipped a beat
        </p>
        
        <a href="/" className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
          <Home className="mr-2" />
          Back to the main stage
        </a>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;