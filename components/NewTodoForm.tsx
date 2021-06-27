import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

const NewTodoForm: React.VFC = () => {
  const queryClient = useQueryClient();

  const [form, update] = React.useState({ title: '', body: '' });

  const { mutate } = useMutation(
    () => {
      return fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(form),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const saveTodo = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    update({ title: '', body: '' });
    mutate();
  };

  return (
    <form
      onSubmit={saveTodo}
      style={{ display: 'flex', flexDirection: 'column' }}>
      <label
        htmlFor="title"
        style={{ display: 'flex', flexDirection: 'column' }}>
        Title
        <input
          style={{ width: '500px' }}
          type="text"
          id="title"
          value={form.title}
          onChange={(ev) => update({ ...form, title: ev.target.value })}
        />
      </label>
      <label
        htmlFor="body"
        style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
        Content
        <textarea
          style={{ width: '500px' }}
          id="body"
          value={form.body}
          onChange={(ev) => update({ ...form, body: ev.target.value })}
        />
      </label>
      <button style={{ width: '100px', marginTop: '16px' }}>Save</button>
    </form>
  );
};

export default NewTodoForm;
