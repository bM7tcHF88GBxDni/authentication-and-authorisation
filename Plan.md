# Creating an authentication app using JSON Web Tokens
##### Dependencies:

node, express, node-postgres, jsonwebtoken, bcryptjs

nodemon, dot env

##### Plan:
```
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

Create authorisation middleware that checks for JWT token
Store token in localStorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
```