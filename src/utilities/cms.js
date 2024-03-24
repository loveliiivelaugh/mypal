export const cms = {
  navbar: {
    heading: "Open Fitness",
  },
  landing: {
    heading: "Open Fitness",
    subheading: "Your Fitness Journey Starts Here",
    body: [
      "Experience a new way to track your fitness goals and stay healthy.",
      `Open Fitness is a progressive web app (PWA) that can be installed on your device and be used offline. It is built using web technologies and is open source to allow for users to take advantage of it's features while still maintaining control over personal data. `
    ],
    cta: "Get Started",
    cta2: "Learn More",
    cta3: "Continue to App",
    cta4: "Install Now",
    cta5: "Open Fitness on GitHub",
  },
  dashboard: {
    cards: {
      macros: {
        heading: "Macronutrients 101",
        subheading: "The body's daily caloric needs broken down by Macronutrients",
        body: [
          `Macronutrients are essential nutrients that our bodies need in large 
          quantities to provide energy, maintain body structure, and perform various
          functions. They include carbohydrates, proteins, and fats.`,
          `1. **Carbohydrates:** Carbohydrates are the primary source of energy for 
          the human body. They come from foods like grains (rice, pasta, bread), 
          sugars, fruits, vegetables, and legumes. The body breaks down 
          carbohydrates into glucose, which is used as fuel for cells.`,
          `2. **Proteins:** Proteins are essential nutrients that are necessary for 
          the growth, repair, and maintenance of body tissues. They come from foods 
          like meat, fish, eggs, dairy products, beans, and nuts. The body uses 
          proteins to build and repair body tissues, including muscles, bones, skin,
          and hair.`,
          `3. **Fats:** Fats are an important source of energy and help the body 
          absorb certain nutrients. They come from foods like oils, butter, meat, 
          dairy products, nuts, seeds, and avocados. The body uses fats to provide 
          energy when carbohydrates are not available, and they also play a crucial 
          role in maintaining healthy skin, hair, and organs.`,
          `Macronutrients are essential for good health because they provide the 
          necessary energy and nutrients for the body to function optimally. A 
          balanced diet that includes adequate amounts of carbohydrates, proteins, 
          and fats can help maintain a healthy weight, support muscle growth, 
          improve cognitive function, and reduce the risk of chronic diseases like 
          diabetes, heart disease, and certain types of cancer.`,
          `It is important to note that not all foods containing macronutrients are 
          created equal. Processed and high-calorie foods, especially those with 
          added sugars, saturated fats, and refined carbohydrates, can contribute to
          poor health outcomes if consumed in excess. Focusing on whole, 
          nutrient-dense foods from all food groups is key to a healthy diet and 
          optimal health.`,
        ],
        body_source: "AI powered by Mistral 7B",
      }
    }
  },
  tdee_help: {
    title: "Total Daily Energy Expenditure Calculator",
    body: [
      "Total Daily Energy Expenditure (TDEE) is the total number of calories that your body needs in a day to maintain your current weight. It takes into account your Basal Metabolic Rate (BMR) and factors in the calories burned through physical activity.",
      "Here's a simplified approach to calculate TDEE:",
      "Calculate Basal Metabolic Rate (BMR):",
      `For men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)
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

      Keep in mind that this is an estimate, and individual variations can occur. Adjustments might be needed based on personal factors like metabolism, body composition, and health conditions. If you're looking to lose or gain weight, you can adjust your calorie intake accordingly. It's always advisable to consult with a healthcare or nutrition professional for personalized advice.`,
      `This calculator will estimate your daily calorie requirements for losing, maintaining and gaining weight. We use this information to determine the calories required to maintain your current weight. Then we subtract 500 calories per day to create a calorie deficit and help you lose weight. We also add 500 calories per day to create a calorie surplus and help you gain weight. If you want to lose or gain weight, enter your goal weight. We also use your calorie intake to determine your macronutrient ratio (carbohydrate, protein, fat). You can learn more about this calculator and how it works in our blog.`
    ]
  }
}