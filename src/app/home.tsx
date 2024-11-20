'use client'

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Music2, Download, BrainCircuit, Building2, Disc3, MessageSquare, Sparkles, Globe2 } from 'lucide-react';

interface FeatureCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col backdrop-blur-lg bg-white/5 rounded-2xl p-8 hover:bg-cyan-400/5 transition-all border border-cyan-400/20">
    <dt className="flex items-center gap-x-3 text-xl font-semibold text-white mb-4">
      <Icon className="h-8 w-8 text-cyan-400" />
      {title}
    </dt>
    <dd className="text-gray-300">{description}</dd>
  </div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('creators');
  const supabase = createClientComponentClient();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#00B5E2] via-[#0077BE] to-[#00B5E2]">
      {/* Hero Section */}
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative mb-8 mx-auto w-24 h-24">
            <Disc3 className="w-24 h-24 text-[#CCFF00] animate-spin-slow absolute" />
            {/* <Music2 className="w-12 h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> */}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#CCFF00] to-white">
            LODI Platform
          </h1>
          
          {/* Audience Selector */}
          <div className="inline-flex rounded-full bg-white/10 p-1 mb-8">
            <button
              onClick={() => setActiveTab('creators')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'creators' ? 'bg-[#CCFF00] text-black' : 'text-gray-300'
              }`}
            >
              For Creators
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'business' ? 'bg-[#CCFF00] text-black' : 'text-gray-300'
              }`}
            >
              For Business
            </button>
          </div>

          {/* Dynamic Hero Content */}
          {activeTab === 'creators' ? (
            <div className="space-y-6">
              <p className="text-lg text-white">
                Access premium music, SFX, and creative tools to elevate your content
              </p>
              <div className="flex justify-center gap-4">
                <a href="/library" className="rounded-full bg-[#CCFF00] px-8 py-3 text-black font-semibold hover:bg-[#E6FF4D] transition-all flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Browse Library
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-lg text-white">
                Custom music solutions for your brand, campaign, or organization
              </p>
              <div className="flex justify-center gap-4">
                <a href="/contact" className="rounded-full bg-[#CCFF00] px-8 py-3 text-black font-semibold hover:bg-[#E6FF4D] transition-all flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Custom Quote
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-[#CCFF00]">
              {activeTab === 'creators' ? 'Creation Suite' : 'Negosyo Music Packages'}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {activeTab === 'creators' ? (
              <>
                <FeatureCard
                  icon={Download}
                  title="Unlimited Downloads"
                  description="Access thousands of premium tracks and sound effects"
                />
                <FeatureCard
                  icon={BrainCircuit}
                  title="AI Tools"
                  description="Coming soon: AI-powered music creation and editing tools"
                />
                <FeatureCard
                  icon={Globe2}
                  title="Global License"
                  description="Use our content worldwide across all platforms"
                />
              </>
            ) : (
              <>
                <FeatureCard
                  icon={Building2}
                  title="Basic Package"
                  description="Perfect for small businesses. 1-2 minute custom music with basic revisions."
                />
                <FeatureCard
                  icon={Sparkles}
                  title="Pro Package"
                  description="Ideal for growing brands. Up to 4 minutes with lyric customization."
                />
                <FeatureCard
                  icon={MessageSquare}
                  title="Pro+ Package"
                  description="Full-scale production with express delivery and multiple versions."
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-24">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 backdrop-blur-lg bg-white/5 rounded-3xl text-center border border-cyan-400/20">
          <h2 className="text-3xl font-bold text-[#CCFF00] sm:text-4xl mb-6">
            {activeTab === 'creators' ? 
              'Ready to create?' : 
              'Transform your brand with music'}
          </h2>
          <a 
            href={activeTab === 'creators' ? "/signup" : "/contact"} 
            className="inline-flex rounded-full bg-[#CCFF00] px-8 py-3 text-black font-semibold hover:bg-[#E6FF4D] transition-all"
          >
            {activeTab === 'creators' ? 'Start Creating' : 'Get in Touch'}
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}