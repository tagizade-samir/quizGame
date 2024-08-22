import { redirect } from "react-router-dom"
import { deleteTodo } from "../todos"

export const action = async ({params}) => {
  await deleteTodo(params.todoid)
  return redirect('/')
}