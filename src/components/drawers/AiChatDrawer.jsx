import { useRef, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useHooks } from '../../hooks';

const AiChatDrawer = () => {
    const inputRef = useRef()
    const hooks = useHooks()
    const [convo, setConvo] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputRef.current.value)
        const {data} = await hooks.ai.sendChat(inputRef.current.value)
        console.log(data, hooks.ai.chatResult)
        setConvo([...convo, data?.response?.trim()])
    }
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ minHeight: 200, height: 'auto', maxHeight: 400, overflow: 'auto' }}>
            <Grid container sx={{ p: 2 }}>
                <Grid item xs={12} mb={10} mt={4}>
                    <Grid container>
                        {convo.map((paragraph, i) => (
                            <Grid item xs={12} key={i}>
                                <Typography>{paragraph}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ position: "fixed", bottom: 0 }}>
                    <TextField
                        id="ai"
                        inputRef={inputRef}
                        label="Trainer powered by AI"
                        placeholder="Ask me questions about food, exercise, or sleep"
                        variant="outlined"
                        fullWidth
                        multiline
                        
                        InputProps={{
                            endAdornment: (
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                            )
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default AiChatDrawer