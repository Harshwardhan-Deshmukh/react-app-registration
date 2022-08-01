# PS Travel Aggregator

<!-- ## Link to the App:
Access my site at <<To be added in future>> -->

## Table of Content:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Commands](#commands)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App

PS Travel Aggregator is the one stop destination for all your travel needs. Using this app you can plan the entire vacation at one go.
We provide mainly three modes of travel-

- Airways
- Roadways
- Railways

We have partnered with various hotels across the country to provide our customers with great accomodation.

<!-- ## Screenshots

`![Writing](https://unsplash.com/photos/VBPzRgd7gfc)` -->

## Technologies

We used `ReactJS` for building the UI with following dependencies:
- "@material-ui/core": "^4.12.4",
- "@react-keycloak/web": "^3.4.0",
- "@testing-library/jest-dom": "^5.11.4",
- "@testing-library/react": "^11.1.0",
- "@testing-library/user-event": "^12.1.10",
- "@wojtekmaj/enzyme-adapter-react-17": "^0.6.7",
- "axios": "^0.27.2",
- "bootstrap": "^5.2.0",
- "enzyme": "^3.11.0",
- "jest-dom": "^4.0.0",
- "keycloak-js": "^18.0.1",
- "loglevel": "^1.8.0",
- "react": "^17.0.2",
- "react-dom": "^17.0.2",
- "react-hook-form": "^7.33.1",
- "react-router-dom": "^6.3.0",
- "react-scripts": "5.0.1",
- "web-vitals": "^2.1.4"

### Dev Dependencies
- "eslint": "^8.20.0",
- "eslint-config-prettier": "^8.5.0",
- "eslint-config-standard": "^17.0.0",
- "eslint-plugin-import": "^2.26.0",
- "eslint-plugin-n": "^15.2.4",
- "eslint-plugin-prettier": "^4.2.1",
- "eslint-plugin-promise": "^6.0.0",
- "eslint-plugin-react": "^7.30.1",
- "husky": "^8.0.1",
- "lint-staged": "^13.0.3",
- "prettier": "^2.7.1",
- "pretty-quick": "^3.1.3"


## Setup

- Download or clone the repository
- run `npm install`
- run `npm test`
- run `npm start`

## Commands
#### Eslint
- run `npx husky install` install the husky library for git hooks and pre-commit
- run `npm run lint`  identifying the errors 
- run `npx run lint-fix` fixes the error 

#### Prettier
- run `npm run format` to format the code for consistent style 

#### Code Coverage
- run `npm test -- --evn=jsdom --coverage` code coverage 

#### Docker 
- run `docker-compose up --build`  to start the container, `--build` to start from fresh
- run `docker-compose down` to stop the container


## Status

[PS Travel Aggregator] is still in progress. `Version 2` will be out soon.

## Credits

List of contriubutors:

- Harshitha Vasudevan
- Debananda Das
- Balakrishnan P
- Saurabh Kemekar
- Gosangi Gunadeep
- Agney Praseed

## License

Publicis Sapient @ [visit us](publicissapient.com)
