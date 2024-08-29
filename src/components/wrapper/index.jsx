import { Box } from "@chakra-ui/react"

export const Wrapper = ({children}) => {
  return (
    <Box style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </Box>
  )
}
