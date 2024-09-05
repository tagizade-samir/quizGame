import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Wrapper } from "../../components/wrapper"
import { Button, Stack, Text } from "@chakra-ui/react"

export const Settings = () => {
  const [counter, setCounter] = useState(0)
  const [counter2, setCounter2] = useState(0)

  const myWorker = useRef(null)

  useEffect(() => {
    const worker = new Worker('worker.js')

    worker.onmessage = function (event) {
      console.log('Event from component', event.data)
      setCounter2(event.data)
    }

    myWorker.current = worker

    return () => {
      myWorker.current.terminate()
    }
  }, [])

  const memoizedHandler = useCallback(() => setCounter2(prev => prev + 1), [])

  const handleCounter1 = () => {
    setCounter(prev => prev + 1)
    if (myWorker.current) {
      myWorker.current.postMessage(counter)
    }
  }

  return (
    <Wrapper>
      <Stack>
        <Text>Counter #1 - {counter}</Text>
        <Button onClick={handleCounter1}>Increment #1</Button>
        <MemoizedCounter handler={memoizedHandler} value={counter2} />
      </Stack>
    </Wrapper>
  )
}

const Counter = ({handler, value}) => {
  console.log('Child component render')
  return (
    <Stack>
      <Text>Value: {value}</Text>
      <Button onClick={handler}>Increment #1</Button>
    </Stack>
  )
}

const MemoizedCounter = memo(Counter)
