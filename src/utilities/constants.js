import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HotelIcon from '@mui/icons-material/Hotel';


// Constants `/pages/Dashboard.jsx`
export const drawerAction = {
  active: null,
  anchor: "right",
  open: true,
};

export const discoverItems = [
  {
    heading: "Sleep",
    icon: <HotelIcon />,
    description: "Learn more about your sleep",
  },
  {
    heading: "Recipes",
    icon: <FastfoodIcon />,
    description: "Learn new recipes",
  },
  {
    heading: "Workouts",
    icon: <FitnessCenterIcon />,
    description: "Find training that fits",
  },
  // Social Features will be added later
  // {
  //   heading: "Sync Up",
  //   icon: <FitnessCenterIcon />,
  //   description: "Learn more about your weight"
  // },
  // {
  //   heading: "Friends",
  //   icon: <FavoriteIcon />,
  //   description: "Learn more about your heart rate"
  // },
  // {
  //   heading: "Community",
  //   icon: <FavoriteIcon />,
  //   description: "Learn more about your blood pressure"
  // }
];

export const legendOptions = {
  direction: 'row',
  position: { vertical: 'bottom', horizontal: 'left' },
  padding: 0,
};

// Constants
const muscles = [
  "Abductors",
  "Abs",
  "Adductors",
  "Biceps",
  "Calves",
  "Chest",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Hip Flexors",
  "IT Band",
  "Lats",
  "Lower Back",
  "Middle Back",
  "Neck",
  "Obliques",
  "Palmar Fascia",
  "Plantar Fascia",
  "Quads",
  "Shoulders",
  "Traps",
  "Triceps",
  "Upper Back"
];

const tabs = [
  "History",
  "My Exercises",
  "All Exercises",
];



// dummy data
const exerciseHistory = {
  data: [
    {
      date: "2021-10-01",
      exercise: "Incline Bench Press",
      sets: [
        {
          set: 1,
          reps: 10,
          weight: 135,
        },
        {
          set: 2,
          reps: 10,
          weight: 135,
        },
        {
          set: 3,
          reps: 10,
          weight: 135,
        },
      ],
    },
    {
      date: "2021-10-02",
      exercise: "Decline Bench Press",
      sets: [
        {
          set: 1,
          reps: 10,
          weight: 135,
        },
        {
          set: 2,
          reps: 10,
          weight: 135,
        },
        {
          set: 3,
          reps: 10,
          weight: 135,
        },
      ],
    },
  ],
  formatSetsArrayToString: (exercise) => {
    const [sets, reps, weight] = exercise;
    return `${sets} sets, ${reps} reps, ${weight} lbs`;
  },
};

const foodHistory = {
  data: [],
  formatFoodObjectToString: food => {
    return `0 cal(calories), 5.2 gram(amount), (full name)`
  }
};

const mock_exercises = [
  {
      "name": "Front Squats With Two Kettlebells",
      "type": "strength",
      "muscle": "quadriceps",
      "equipment": "kettlebells",
      "difficulty": "beginner",
      "instructions": "Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebells towards your shoulders. Rotate your wrists as you do so. Looking straight ahead at all times, squat as low as you can and pause at the bottom. As you squat down, push your knees out. You should squat between your legs, keeping an upright torso, with your head and chest up. Rise back up by driving through your heels and repeat."
  },
  {
      "name": "Narrow Stance Hack Squats",
      "type": "strength",
      "muscle": "quadriceps",
      "equipment": "machine",
      "difficulty": "beginner",
      "instructions": "Place the back of your torso against the back pad of the machine and hook your shoulders under the shoulder pads provided. Position your legs in the platform using a less than shoulder width narrow stance with the toes slightly pointed out. Your feet should be around 3 inches or less apart. Tip: Keep your head up at all times and also maintain the back on the pad at all times. Place your arms on the side handles of the machine and disengage the safety bars (which on most designs is done by moving the side handles from a facing front position to a diagonal position). Now straighten your legs without locking the knees. This will be your starting position. Begin to slowly lower the unit by bending the knees as you maintain a straight posture with the head up (back on the pad at all times). Continue down until the angle between the upper leg and the calves becomes slightly less than 90-degrees (which is the point in which the upper legs are below parallel to the floor). Inhale as you perform this portion of the movement. Begin to raise the unit as you exhale by pushing the floor with mainly with the heels of your feet as you straighten the legs again and go back to the starting position. Repeat for the recommended amount of repetitions."
  },
  {
      "name": "Jefferson Squats",
      "type": "strength",
      "muscle": "quadriceps",
      "equipment": "barbell",
      "difficulty": "beginner",
      "instructions": "Place a barbell on the floor. Stand in the middle of the bar length wise. Bend down by bending at the knees and keeping your back straight and grasp the front of the bar with your right hand. Your palm should be in (neutral grip) facing the left side. Grasp the rear of the bar with your left hand. The palm of your hand should be in neutral grip alignment (palms facing the right side). Tip: Ensure that your grip is even on the bar. Your torso should be positioned right in the middle of the bar and the distance between your torso and your right hand (which should be at the front) should be the same as the distance between your torso and your left hand (which should be to your back). Now stand straight up with the weight. Tip: Your feet should be shoulder width apart and your toes slightly pointed out. Squat down by bending at the knees and keeping your back straight until your upper thighs are parallel with the floor. Tip: Keep your back as vertical as possible with the floor and your head up. Also remember to not let your knees go past your toes. Inhale during this portion of the movement. Now drive yourself back up to the starting position by pushing with the feet . Tip: Keep the bar hanging at arm's length and your elbows locked with a slight bend. The arms only serve as hooks. Avoid doing any lifting with them. Do the lifting with your thighs; not your arms.  Variations: You can also perform the exercise using wrist wraps. In addition, you can use many of the other squat variations. Finally, you can also perform the exercise with a wide stance or a closer stance."
  },
  {
      "name": "Sit Squats",
      "type": "stretching",
      "muscle": "quadriceps",
      "equipment": "none",
      "difficulty": "beginner",
      "instructions": "Stand with your feet shoulder width apart. This will be your starting position. Begin the movement by flexing your knees and hips, sitting back with your hips. Continue until you have squatted a portion of the way down, but are above parallel, and quickly reverse the motion until you return to the starting position. Repeat for 5-10 repetitions."
  },
  {
      "name": "Squats - With Bands",
      "type": "strength",
      "muscle": "quadriceps",
      "equipment": "bands",
      "difficulty": "beginner",
      "instructions": "To start out, make sure that the exercise band is at an even split between both the left and right side of the body. To do this, use your hands to grab both sides of the band and place both feet in the middle of the band. Your feet should be shoulder width apart from each other. When holding the bands, they should be the same height on each side. You should be using a pronated grip (palms facing forward) and have the handles of the bands next to your face for this exercise. This is the starting position. Slowly start to bend the knees and lower the legs so that your thighs are parallel to the floor while exhaling. Use the heel of your feet to push your body up to the starting position as you exhale. Repeat for the recommended amount of repetitions."
  },
  {
      "name": "Lateral Squats",
      "type": "strength",
      "muscle": "quadriceps",
      "equipment": "body_only",
      "difficulty": "intermediate",
      "instructions": "Lateral Squats"
  }
]

const mock_recentFoods = [

]

export {
  exerciseHistory,
  foodHistory,
  mock_exercises,
  mock_recentFoods,
  muscles, 
  tabs, 
}