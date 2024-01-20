import { useEffect } from 'react'
// Packages
import { Grid, Toolbar, Typography } from '@mui/material'
// Components
import { FormContainer } from '../../hooks/useForms'
// Hooks
import { useHooks } from '../../hooks'
// Utilities
import { profile_schema } from '../../db/schemas'
import { cms } from '../../utilities/cms'


const TdeeCalculator = () => {
  const { actions, profile } = useHooks();
  // When opening this form, set the selected to the current profile if there is one.
  useEffect(() => {
    console.log("Current profile: ", profile.current_profile)
    actions.handleSelected(profile.current_profile)
  }, [actions, profile.current_profile])
  return (
    <Grid container p={4}>
      <Grid item xs={12}>
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
      <Toolbar />
      <FormContainer schema={profile_schema} />
    </Grid>
  )
}

TdeeCalculator.propTypes = {}

export default TdeeCalculator