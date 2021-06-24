import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Sined in as email: {session?.user?.email}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
