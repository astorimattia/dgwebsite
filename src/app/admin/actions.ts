'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const password = formData.get('password')

  // Simple check against env var
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    redirect('/admin')
  } else {
    // In a real app we'd return an error to display, 
    // but for simplicity we rely on re-rendering or client handling.
    // We can redirect back with an error query param if needed.
    redirect('/admin/login?error=Invalid password')
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  redirect('/admin/login')
}
