import { useSelector } from "react-redux"
import { selectAmountOfQuestions, selectAnswers, selectCurrentQuestion } from "../../store/slices/game"
import { Box } from "@chakra-ui/react"

export const Progress = () => {
  const answers = useSelector(selectAnswers)
  const currentQuestion = useSelector(selectCurrentQuestion)
  const amountOfQuestions = useSelector(selectAmountOfQuestions)

  const items = Array.from({length: amountOfQuestions})
  const getColor = (index) => answers[index] ? 'green' : 'red'

  return (
    <Box style={{display: 'flex', flexDirection: 'row', gap: 8, margin: '16px 0'}}>
      {items.map((_, index) => (
        <Box
          key={index}
          style={{
            width: 100,
            height: 16,
            border: '1px solid black',
            borderRadius: 8,
            backgroundColor: index >= currentQuestion ? 'gray' : getColor(index)
          }}
        />
      ))}
    </Box>
  )
}
