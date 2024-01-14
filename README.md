# miPal

## CI/CD

[![Netlify Status](https://api.netlify.com/api/v1/badges/17584298-1ea6-4693-88ca-dcc04f60f1be/deploy-status)](https://app.netlify.com/sites/gleeful-kitten-d6d5f6/deploys)

[miPal development deployment](https://main--gleeful-kitten-d6d5f6.netlify.app/)

* version control: [GitHub]()
* continuous integration: [GitHub Actions]()
* continuous deployment: [Netlify]()
* project management: [GitHub Projects]()
* issue tracking: [GitHub Issues]()
* code review: [GitHub Pull Requests]()

## Description

miPal is an open source fitness and nutrition tracking application. It allows users to create an account, log in, and track their daily nutrition and fitness goals. Users can also create and join groups to share their progress with others.

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributors](#contributors)

* [Tests](#tests)

* [Questions](#questions)

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

Add a .env file to the root directory with the following variables:
(An example of this can be found in the .env.example file)

```code
cp .env.example .env
```

Add your Supabase URL and Anon Key to the .env file.
Also add the RapidAPI hosts and keys found in the .env.example file.

```code
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```code
npm start
```

## Usage

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

## License

This project is licensed under the MIT license.

## Contributors

* [Me😎]('https://www.github.com/loveliiivelaugh')

## Tests



