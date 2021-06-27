import React from 'react';
import { Todo } from '@prisma/client';
import { useQuery } from 'react-query';

const TodoList: React.VFC = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>('todos', async () => {
    const res = await fetch('/api/todos');
    return res.json();
  });

  if (isLoading) return <span>loading...</span>;

  if (todos?.length === 0) return <span>no todos</span>;

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>
          <h2>{todo.title}</h2>
          <span>{todo.body}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
