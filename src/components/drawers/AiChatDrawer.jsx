import { useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useHooks } from '../../hooks';

const AiChatDrawer = () => {
    const inputRef = useRef()
    const hooks = useHooks()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputRef.current.value)
        const data = await hooks.ai.sendChat({ 
            conversation: [
                {
                    role: "user", content: inputRef.current.value
                }
            ]
        })
        console.log(data, hooks.ai.chatResult)
    }
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ minHeight: 200, height: 'auto', maxHeight: 400, overflow: 'auto' }}>
          <Box component="code" sx={{ p: 2 }}>
            {/* <pre>{JSON.stringify({ ...actions, ...drawers }, null, 2)}</pre> */}
          </Box>
          <TextField
            id="ai"
            inputRef={inputRef}
            label="Trainer powered by AI"
            placeholder="Ask me questions about food, exercise, or sleep"
            variant="outlined"
            fullWidth
            multiline
            sx={{ position: "fixed", bottom: 0 }}
          />
          <Button variant="contained" type="submit">Submit</Button>
        </Box>
    )
}

export default AiChatDrawer