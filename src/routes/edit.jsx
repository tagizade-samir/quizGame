import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { updateTodo } from "../todos";

export const action = async ({params, request}) => {
  const formData = await request.formData();
  const updated = Object.fromEntries(formData);
  await updateTodo(params.todoid, updated)
  return redirect(`/todos/${params.todoid}`)
}

export const Edit = () => {
  const {todo} = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="todo-form">
      <p>
        <span>Name</span>
        <input placeholder="Name" type="text" name="name" defaultValue={todo?.name} />
      </p>
      <label>
        <span>Comment</span>
        <textarea name="comment" defaultValue={todo?.comment} rows={5} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </p>
    </Form>
  )
}