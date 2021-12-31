https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

JSON Web Tokens

Node, Express, node-postgres, dot env, jsonwebtoken, bcryptjs
nodemon

Create Express server
    Use node http module to createServer and listen on server instead of app
Setup Heroku postgres db
    Create connection to postgres db with dot env
    Write db scripts to create empty table with
        id (unique), first_name, last_name, email (unique), password, token (string)
Create API routes for /register
    /register logic:
    Get user input. Validate user input. Validate if the user already exists. Encrypt the user password. Create a user in our database. And finally, create a signed JWT token.