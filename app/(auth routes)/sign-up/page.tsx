'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest} from '../../../lib/api/clientApi';
import css from '../sign-up/SignUpPage.module.css';
import { useAuthStore } from '@/lib/store/authStore';

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser);
    const handleSubmit = async (formData: FormData) => {
        try {
            const formValues = Object.fromEntries(formData) as unknown as RegisterRequest;
            const response = await register(formValues);
            if (response) {
                setUser(response);
                router.push('/profile');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            setError((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'An error occurred during registration.');
        }
    }
    return (<main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handleSubmit}>
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
                    Register
                </button>
            </div>

           { error && <p className={css.error}>{error}</p> }
        </form>
    </main>
    );
}

export default SignUpPage;