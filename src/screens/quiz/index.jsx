import { useDispatch, useSelector } from "react-redux"
import { Wrapper } from "../../components/wrapper"
import { selectSelectedConfig } from "../../store/slices/settings"
import { useEffect } from "react"
import { fetchQuestions, selectIsQuestionsLoading } from "../../store/slices/game"
import { SkeletonLoading } from "../../components/skeleton"
import { Questions } from "./questions"
import { Progress } from "./Progress"
import { Box } from "@chakra-ui/react"

export const Quiz = () => {
  const config = useSelector(selectSelectedConfig)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsQuestionsLoading)

  useEffect(() => {
    dispatch(fetchQuestions(config))
  }, [])

  if (isLoading) {
    return <SkeletonLoading />
  }

  return (
    <Box>
      <Progress />
      <Wrapper>
        <Questions />
      </Wrapper>
    </Box>
  )
}