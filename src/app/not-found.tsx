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
    <div className="flex min-h-screen bg-gradient-to-br from-[#00B5E2] via-[#0077BE] to-[#00B5E2]">
      <div className="m-auto text-center p-8">
        <div className="relative mb-8">
          <Disc3 size={120} className="text-[#CCFF00] mx-auto" style={discAnimation} />
          {/* <Music2 size={48} className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> */}
        </div>
        
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-white mb-4">
          404
        </h1>
        <p className="text-2xl text-white mb-8">
          Looks like this track skipped a beat
        </p>
        
        <a href="/" className="inline-flex items-center px-6 py-3 text-lg font-medium text-black bg-[#CCFF00] rounded-full hover:bg-[#E6FF4D] transition-colors">
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