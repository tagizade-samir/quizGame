import { Form, useLoaderData } from "react-router-dom"
import { Favorite } from "../components/favorite"
import { getTodo } from "../todos"

export const loader = async ({params}) => {
  const todo = await getTodo(params.todoid)
  return {todo};
}

export const Todo = () => {
  const {todo} = useLoaderData();

  return (
    <div id="todo">
      <div>
        <h1>
          {todo.name ?? <i>No name</i>}
          <Favorite todo={todo} />
        </h1>

        {todo.comment && <p>{todo.comment}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form method="post" action="destroy" onSubmit={(event) => {
            if (!confirm('Are you sure you want to delete that?')) {
              event.preventDefault()
            }
          }}>
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}