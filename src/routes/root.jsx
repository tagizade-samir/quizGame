import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from "react-router-dom"
import { createTodo, getTodos } from "../todos"

export const action = async () => {
  const todo = await createTodo();
  return redirect(`/todos/${todo.id}/edit`)
}

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const todos = await getTodos(q);
  return { todos, q };
}

export const Root = () => {
  const { todos, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  return (
    <>
      <div id="sidebar">
        <h1>React Todos</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              className={searching ? 'loading' : ''}
              id="q"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              aria-label="Search todos"
              onChange={(event) => submit(event.target.form)} />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {todos && todos.length
            ? (
              <ul>
                {todos && todos.map(todo => (
                  <li key={todo.id}>
                    <NavLink to={`todos/${todo.id}`} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>
                      {todo.name ?? 'No name'}
                      {todo.favorite && <span>fav</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )
            : <p>Not todos</p>}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  )
}