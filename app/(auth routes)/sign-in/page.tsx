'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '../../../lib/api/clientApi';
import css from '../sign-in/SignInPage.module.css';
import { useAuthStore } from '@/lib/store/authStore';

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as unknown as LoginRequest;
      const response = await login(formValues);
      console.log('Login response:', response); // Log the response for debugging
      if (response) {
        setUser(response);
        router.push('/profile');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      setError(
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'An error occurred during login.'
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
