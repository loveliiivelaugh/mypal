// Packages
import { IconButton, Grid, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// Utilities
import { cms } from '../../utilities/cms'
import { useHooks } from '../../hooks'


const TdeeHelp = () => {
  const hooks = useHooks();
  return (
    <Grid container p={4}>
      <Grid item xs={12} mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          {cms.tdee_help.heading}
        </Typography>
        <IconButton variant="text" onClick={() => hooks.actions.closeDrawers()} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          {cms.tdee_help.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {cms.tdee_help.body
          .map((paragraph, index) => (
            <Typography key={index} variant="body1" component="p" gutterBottom>
              {paragraph}
            </Typography>
        ))}
      </Grid>
    </Grid>
  )
}

TdeeHelp.propTypes = {}

export default TdeeHelp