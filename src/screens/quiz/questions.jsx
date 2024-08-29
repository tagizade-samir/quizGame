import { Box, Button, Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { answer, selectCurrentQuestion, selectQuestions } from "../../store/slices/game"
import { decode } from "html-entities"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Routes } from "../../constants/routes"

export const Questions = () => {
  const questions = useSelector(selectQuestions)
  const currentQuestion = useSelector(selectCurrentQuestion)
  const question = questions[currentQuestion]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (questions.length && currentQuestion && currentQuestion === questions.length) {
      navigate(Routes.result)
      // get answers and send them to another slice
    }
  }, [currentQuestion, questions])

  if (!question) {
    return <Text>Something went wrong</Text>
  }

  const answers = [...question.incorrect_answers, question.correct_answer]

  const handleAnswer = (userAnswer) => {
    dispatch(answer(userAnswer === question.correct_answer))
  }

  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading size={'xl'}>Question: {decode(question.question)}</Heading>
          <Heading size={'l'}>Difficulty: {question.difficulty}</Heading>
          <Heading size={'l'}>Category: {question.category}</Heading>
        </CardHeader>
        <CardBody style={{display: 'flex', flexDirection: 'row', gap: 16}}>
          {answers.map(answer => (
            <Box style={{border: '1px solid black', borderRadius: 8, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}} key={answer}>
              <Text size={'m'}>{answer}</Text>
              <Button onClick={() => handleAnswer(answer)}>Select</Button>
            </Box>
          ))}
        </CardBody>
      </Card>

    </Box>
  )
}
