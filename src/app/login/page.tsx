import { redirect } from 'next/navigation'

export default function LoginPage() {
  // Redirect to download page since we removed signup functionality
  redirect('/download')
}
