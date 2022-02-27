# Creating an authentication app using JSON Web Tokens

### Why?
<details>
<summary>the Personal</summary>
<br>
In the past, when I was learning web development on my own in 2017/8, I found authentication and authorisation to be a big blocker in my learning, in fact, it was one of the few aspects that I was not able to overcome at the time despite understanding the protocols at a high level and being able to use PassportJS successfully with a third party authentication and authorization platform.
<br>
<br>
During the School of Code Christmas break, I will face authentication and authorisation again but this time at a lower level. So far at SoC we have learned the following things of import to this project:
<br>
<br>
    
- Express API routes, middleware and models
- Postman testing
- Postgres database and queries
    
</details>

<details>
<summary>the Purpose</summary>
<br>
At SoC, we've learned how to create full stack projects but we've yet to cover user login or sessions. That's a pretty vital part of any application and I want to explore this subject to expand the potential applications that I can create. Authentication and authorisation are key tools for customising a user's experience.
</details>

## Overview of Features
Developed and tested using Postman
- users can sign up using the /register route
    - password is hashed by bcrypt when stored to database 
    - JWT is returned when successful
- users can login using the /login route, JWT is returned
    - password is compared to encrypted database password
    - JWT is returned when successful
- a low level form of authorisation for users when they access the /profile route
    - denies access when user provides invalid or no JWT token (users must be logged in to access this route)

#### Dependencies:

node, express, node-postgres, jsonwebtoken, bcryptjs

nodemon, dot env

#### Plan:
```COBOL
Create Express server
    Use node http module to createServer and listen on server instead of app
Setup Heroku postgres db
    Create connection to postgres db with dot env
    Write db scripts to create empty table with
        id (unique), first_name, last_name, email (unique), password, token (string)
Authentication:
install jsonwebtoken, bcryptjs
Create API routes for /register
    req.query for first_name, last_name, email, password
        validate input- check all fields exist
    Check if user already exists using email (which has been set up as a unique column in sql table)
        If false
        Encrypt password with bcrypt.hash()
        Add user details to database
        Create a signed JWT token with jwt.sign()
        Respond with user + token for now
Create API route for /login
    req.query for email, password
        validate input- check all fields exist
    Check if user exists, return if false
    Check input password with database password using bcrypt.compare()
        If login successful, create new JWT token, return it and add it to database
Create authorisation middleware that checks for JWT token when accessing sensitive routes such as /profile
    Create middleware/auth.js folder, create a middleware function(req, res, next)
        Check for req.query token as we will send the token using req.query
        If no token, redirect/return to previous page?
        Otherwise, jwt.verify token with private key
        If token is wrong, redirect/return to previous page?
        Otherwise, token exists and is valid so call next() so the user can move on to access the /profile route
    Export this middleware function
Create the /profile route endpoint
    You can pass in the middleware function as a parameter here after the path, before the callback function that will do a final response
    If successful, send some h1


Store token in localStorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
```
