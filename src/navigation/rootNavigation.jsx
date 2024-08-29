import { Provider } from "react-redux"
import { ChakraProvider } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Settings } from "../screens/settings"
import { store } from "../store"
import { Quiz } from "../screens/quiz"
import { Routes } from "../constants/routes"
import { Result } from "../screens/result"

const router = createBrowserRouter([
  {
    path: Routes.main,
    element: <Settings />
  },
  {
    path: Routes.quiz,
    element: <Quiz />,
  },
  {
    path: Routes.result,
    element: <Result />
  }
])

export const RootNavigation = () => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  )
}
