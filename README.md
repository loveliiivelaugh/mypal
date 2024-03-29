# Open Fitness Trainer 

## CI/CD

[![Netlify Status](https://api.netlify.com/api/v1/badges/17584298-1ea6-4693-88ca-dcc04f60f1be/deploy-status)](https://app.netlify.com/sites/openfitness/deploys)

[OpenFitness development deployment](https://openfitness.netlify.app/)

* Version Control: [GitHub](https://github.com/)
* Continuous Integration: [GitHub Actions](https://github.com/loveliiivelaugh/mypal/actions)
* Continuous Deployment: [Netlify](https://www.netlify.com/)
* Project Management: [GitHub Projects](https://github.com/users/loveliiivelaugh/projects/1/views/1)
* Issue Tracking: [GitHub Issues](https://github.com/loveliiivelaugh/mypal/issues)
* Code Review: [GitHub Pull Requests](https://github.com/loveliiivelaugh/mypal/pulls)

## Description

Open Fitness is an open source fitness and nutrition tracking application. It allows users to create an account, log in, and track their daily nutrition and fitness goals. Users can also create and join groups to share their progress with others.

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [API's](#apis)

* [Bonus API's](#bonus-apis)

* [Documentation](#documentation)

* [License](#license)

* [Contributors](#contributors)

* [Tests](#tests)

* [Questions](#questions)

* [ToDo](#todo)

## Dependencies

```json
"dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@fontsource/roboto": "^5.0.8",
    "@mui/icons-material": "^5.15.2",
    "@mui/material": "^5.15.2",
    "@mui/styled-engine-sc": "^6.0.0-alpha.10",
    "@mui/x-date-pickers": "^6.18.6",
    "@react-hook/media-query": "^1.1.1",
    "@reduxjs/toolkit": "^2.0.1",
    "@supabase/auth-ui-react": "^0.4.6",
    "@supabase/auth-ui-shared": "^0.1.8",
    "@supabase/supabase-js": "^2.39.2",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "dayjs": "^1.11.10",
    "dotenv": "^16.3.1",
    "formik": "^2.4.5",
    "framer-motion": "^10.17.12",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.0.4",
    "react-scripts": "5.0.1",
    "recharts": "^2.10.3",
    "styled-components": "^6.1.3",
    "web-vitals": "^2.1.4"
  }
  ```

## Installation

```code
git clone https://github.com/loveliiivelaugh/mypal.git
cd mypal
npm install
```

Add a `.env` file to the root directory with the following variables:
(An example of this can be found in the `.env.example` file)

```code
cp .env.example .env
```

This project uses Supabase for the database and authentication.
The Supabase URL and Anon Key can be found in the Supabase project settings.
The table definitions can be found in `./src/db/tables.sql`.
Create the tables in your Supabase project using the SQL definitions.
Add your Supabase URL and Anon Key to the `.env` file.
Also add the RapidAPI hosts and keys found in the `.env.example` file.

```code
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```code
npm start
```

## Docker

```code
git clone https://github.com/loveliiivelaugh/mypal.git
cd mypal
docker build -t openfitness .
docker run -it --rm -p 80:80 --env-file .env openfitness
```

## Usage

*App is not secure at the moment. Do not use real email or password.*

For Demo purposes, you can use the following credentials to log in:
  
```code
  email:
  password:
```

## API's

* [Supabase](https://supabase.io/) -- Database and Authentication

* [RapidAPI](https://rapidapi.com/) -- Exercise data

* [Nutritionix](https://www.nutritionix.com/) -- Nutrition data

## Bonus API's

* [Apple Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios) -- Personal data

Apple Shortcuts are used to automate the process of adding personal/private data to the app to include that data within the health tracking efforts.

* [Steps Shortcut](#steps-shortcut)

* [Heart Rate Shortcut](#heart-rate-shortcut)

* [Sleep Shortcut](#sleep-shortcut)

* [Water Shortcut](#water-shortcut)

### Steps Shortcut

This shortcut will add the number of steps you have taken today to the app.

### Heart Rate Shortcut

This shortcut will add the number of steps you have taken today to the app.

### Sleep Shortcut

This shortcut will add the number of steps you have taken today to the app.

### Water Shortcut

This shortcut will add the number of steps you have taken today to the app.

## Documentation

* [React](https://reactjs.org/) -- UI library

* [Redux](https://redux.js.org/) -- State management

* [Material-UI](https://mui.com/) -- UI components/Design system

* [Supabase](https://supabase.io/) -- Database

* [Recharts](https://recharts.org/en-US/) -- Data visualization

* [Dayjs](https://day.js.org/) -- Date formatting

* [Framer Motion](https://www.framer.com/motion/) -- Animation

* [Styled Components](https://styled-components.com/) -- CSS-in-JS

* [Formik](https://formik.org/) -- Form management

* [Yup]() -- Validations

* [React Spring]() -- Animation

* [Pop Motion]() -- Animation

* [React Webcam]() -- Webcam

## ToDo

* [x] Add Food data

* [x] Add Exercise data

* [ ] Add Muscle Group Image during exercise selection

* [x] Convert to PWA

* [ ] Add offline functionality

* [ ] Add push notifications

* [ ] Add user settings

* [ ] Convert to TypeScript

* [ ] Add tests

* [ ] Add more data visualizations

* [ ] Add more animations

* [ ] Add more user settings

* [ ] Secure app

* [ ] Encrypt user data

* [ ] Move app database service from Supabase to Pocketbase
(The goal being to make the app's user data stored on device and self-hosted)

## License

This project is licensed under the MIT license.

## Contributors

* [Me😎]('https://www.github.com/loveliiivelaugh')

## Tests
