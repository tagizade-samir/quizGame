import { Box, Button, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { setConfig } from "../../store/slices/settings";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";

const getInitialState = (configEntries) => {
  const result = {}

  configEntries.forEach(([key, value]) => {
    result[key] = value[0]?.value ?? value[0]?.id
  })

  return result
}

export const Form = ({config}) => {
  const values = Object.entries(config)
  const [formState, setFormState] = useState(getInitialState(values))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleStartQuiz = () => {
    dispatch(setConfig(formState))
    navigate(Routes.quiz)
  }

  return (
    <div>
      Form
      {values.map(([key, value]) => {
        return (
          <Box key={key}>
            <Text>{key.toUpperCase()}</Text>
            <Select value={formState[key]} onChange={(event) => handleInputChange(key, event.currentTarget.value)}>
              {value.map(item => (
                <option key={item.id} value={item.value ?? item.id}>{item.name}</option>
              ))}
            </Select>
          </Box>
        )
      })}
      <Button onClick={handleStartQuiz}>
        Start quiz
      </Button>
    </div>
  )
}