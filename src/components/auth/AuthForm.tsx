'use client'
import { useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../../lib/supabase'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const customTheme = {
  default: {
    colors: {
      brand: 'rgb(59 130 246)', // blue-500
      brandAccent: 'rgb(37 99 235)', // blue-600
      inputBackground: 'white',
      inputText: 'black',
      inputBorder: 'rgb(229 231 235)', // gray-200
      dividerBackground: 'rgb(229 231 235)',
    },
    space: {
      inputPadding: '0.75rem',
      buttonPadding: '0.75rem',
    },
    borderWidths: {
      buttonBorderWidth: '1px',
      inputBorderWidth: '1px',
    },
    radii: {
      borderRadiusButton: '0.5rem',
      buttonBorderRadius: '0.5rem',
      inputBorderRadius: '0.5rem',
    },
  }
}

export default function AuthForm() {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Lodi</h1>
        <p className="text-gray-600">Your unlimited music library awaits</p>
      </div>
      
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: customTheme }}
        providers={['google']}
      />
    </div>
  )
}
