import React from 'react';

import { signIn, signOut, useSession } from 'next-auth/client';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/NewTodoForm';

const Home: React.VFC = () => {
  const [session] = useSession();

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
          <NewTodoForm />
          <TodoList />
        </>
      )}
    </>
  );
};

export default Home;
