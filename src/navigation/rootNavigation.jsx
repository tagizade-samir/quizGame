import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { loader as rootLoader, Root, action as rootAction } from "../routes/root"
import { ErrorPage } from "../error-page"
import { loader as todoLoader, Todo } from "../routes/todo"
import { action as editAction, Edit } from "../routes/edit"
import { action as destroyAction } from "../routes/destroy"
import { Index } from "../routes"
import { action as favoriteAction } from "../components/favorite"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {index: true, element: <Index />},
      {
        path: 'todos/:todoid',
        element: <Todo />,
        loader: todoLoader,
        action: favoriteAction,
        errorElement: <div>Could not find a todo with that id</div>
      },
      {
        path: 'todos/:todoid/edit',
        element: <Edit />,
        loader: todoLoader,
        action: editAction,
      },
      {
        path: 'todos/:todoid/destroy',
        action: destroyAction,
      }
    ]
  },
])

export const RootNavigation = () => {
  return <RouterProvider router={router} />
}
