import { useFetcher } from "react-router-dom"
import { updateTodo } from "../../todos";

export const action = async ({params, request}) => {
  const formData = await request.formData();
  return updateTodo(params.todoid, {
    favorite: formData.get('favorite') === 'true'
  })
}

export const Favorite = ({todo}) => {
  const isFavorite = todo.favorite
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <button name="favorite" value={isFavorite ? 'false' : 'true'} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
        {isFavorite ? 'Remove' : 'Add'}
      </button>
    </fetcher.Form>
  )
}