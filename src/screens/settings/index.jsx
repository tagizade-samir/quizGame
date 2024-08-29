import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, selectConfig } from "../../store/slices/settings"
import { Form } from "./form"
import { Wrapper } from "../../components/wrapper"
import { SkeletonLoading } from "../../components/skeleton"

export const Settings = () => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  if (!config.categories.length) {
    return <SkeletonLoading />
  }

  return (
    <Wrapper>
      <Form config={config} />
    </Wrapper>
  )
}
