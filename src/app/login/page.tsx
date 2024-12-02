import AuthForm from '@/components/auth/AuthForm'
import FirstLoginRedirect from '@/components/FirstLoginRedirect'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <FirstLoginRedirect />
      <AuthForm />
    </div>
  )
}
