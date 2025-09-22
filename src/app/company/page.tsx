import { redirect } from 'next/navigation';

export default function CompanyPage() {
  // This will be the main company landing page
  redirect('/company/dashboard');
}
