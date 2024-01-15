// Packages
import { Grid, Toolbar, Typography } from '@mui/material'
// Components
import { FormContainer } from '../../hooks/useForms'
// Utilities
import { profile_schema } from '../../db/schemas'


const TdeeCalculator = () => {
  return (
    <Grid container p={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Total Daily Energy Expenditure Calculator
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="body1" gutterBottom>
          Total Daily Energy Expenditure (TDEE) is the total number of calories that your body needs in a day to maintain your current weight. It takes into account your Basal Metabolic Rate (BMR) and factors in the calories burned through physical activity.

          Here's a simplified approach to calculate TDEE:

          Calculate Basal Metabolic Rate (BMR):

          For men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)
          For women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)
          Factor in Physical Activity:

          Sedentary (little or no exercise): BMR × 1.2
          Lightly active (light exercise/sports 1-3 days/week): BMR × 1.375
          Moderately active (moderate exercise/sports 3-5 days/week): BMR × 1.55
          Very active (hard exercise/sports 6-7 days a week): BMR × 1.725
          Extremely active (very hard exercise/sports & physical job or 2x training): BMR × 1.9
          Calculate TDEE:

          TDEE = BMR × Activity Level
          For example, if your BMR is 1500 calories and you are moderately active (Activity Level of 1.55), your TDEE would be 1500 × 1.55 = 2325 calories.

          Keep in mind that this is an estimate, and individual variations can occur. Adjustments might be needed based on personal factors like metabolism, body composition, and health conditions. If you're looking to lose or gain weight, you can adjust your calorie intake accordingly. It's always advisable to consult with a healthcare or nutrition professional for personalized advice.
        </Typography>
        <Typography variant="body1" component="body1" gutterBottom>
          This calculator will estimate your daily calorie requirements for losing, maintaining and gaining weight. We use this information to determine the calories required to maintain your current weight. Then we subtract 500 calories per day to create a calorie deficit and help you lose weight. We also add 500 calories per day to create a calorie surplus and help you gain weight. If you want to lose or gain weight, enter your goal weight. We also use your calorie intake to determine your macronutrient ratio (carbohydrate, protein, fat). You can learn more about this calculator and how it works in our blog.
        </Typography>
      </Grid>
      <Toolbar />
      <FormContainer schema={profile_schema} />
    </Grid>
  )
}

TdeeCalculator.propTypes = {}

export default TdeeCalculator