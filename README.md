<img width="1320" alt="homePage" src="https://user-images.githubusercontent.com/25041649/204112163-7a33a46b-ca39-4f50-8627-3f8ec5768b3a.png">
<img width="523" alt="signinPage" src="https://user-images.githubusercontent.com/25041649/204112463-39dccfe9-d4df-4b46-b7ad-b4999845b440.png">
<img width="355" alt="mylabPage" src="https://user-images.githubusercontent.com/25041649/204112470-8a09a9af-0ef9-4193-a77f-7a12e791496d.png">
<img width="371" alt="mymedPage" src="https://user-images.githubusercontent.com/25041649/204112474-9bfeae08-dbb2-43bd-a231-cac3263c5927.png">

# Introduction

Personal healthcare record web app that registered user can keep their health records such as lab data and medication use.\
User can log in via gmail accounts or sign up with other email account (using Oauth and bcrypt).\
Loged in user can create, edit and delete their records.\
User can also check information or reference regarding their medication and lab results via MEDLINEPLUS API.

# Features

#### Home page
- current medical news / log in 

#### MyMeds page 
- post new medication use records including dose, direction, prescriber info, side effects, positive effects or physician's comment
- read all the posts users created in the past or edit and delete as needed
- medication info link to U.S. National Library of Medicine
#### MyLabs page 
- post new lab test results including test area, result and laboratoy name
- read all the posts users created in the past or edit and delete as needed
- reference link to U.S. National Library of Medicine

# Technologies

 #### Client:

 - ReactJS
 - Styled-components
 
 #### Server:

- ExpressJS
- MongoDB

# Setup

```
$yarn install
$yarn start
```

# APIs
- Oauth: to authenticate users
- Mediastack API : to fetch health news on the homepage
- MedlinePlus API : to fetch information that is related to user's health record such as medication or lab results



