import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const COOKIE = 'admin_session';

function safeEquals(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function validateAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL || '';
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!safeEquals(email, adminEmail)) return false;

  if (hash) return bcrypt.compare(password, hash);

  const plain = process.env.ADMIN_PASSWORD || '';
  return safeEquals(password, plain);
}

function signValue(value: string) {
  const secret = process.env.ADMIN_EMAIL || 'secret';
  return Buffer.from(`${value}.${secret}`).toString('base64url');
}

function unsignValue(value: string) {
  try {
    const decoded = Buffer.from(value, 'base64url').toString('utf8');
    const [email, secret] = decoded.split('.');
    if (!safeEquals(secret || '', process.env.ADMIN_EMAIL || 'secret')) return null;
    return email;
  } catch {
    return null;
  }
}

export async function createAdminSession(email: string) {
  cookies().set(COOKIE, signValue(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12
  });
}

export async function clearAdminSession() {
  cookies().set(COOKIE, '', { path: '/', maxAge: 0 });
}

export function isAdminAuthenticated() {
  const value = cookies().get(COOKIE)?.value;
  if (!value) return false;
  const email = unsignValue(value);
  return !!email && email === (process.env.ADMIN_EMAIL || '');
}
