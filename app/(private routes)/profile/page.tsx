import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();
  return {
    title: `Profile Page - ${user?.username}`,
    description: `Profile page for ${user?.username}`,
  };
}

export default async function ProfilePage() {
  const user = await getMe();
  console.log('user', user);
  console.log('avatar', user?.avatar);
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {user?.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
              unoptimized
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
