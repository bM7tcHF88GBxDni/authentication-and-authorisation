import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../database/index.js";
import { auth } from "../config.js";

export async function getAllUsers() {
    const sql = `SELECT * FROM users;`

    const response = await query(sql);
    return response.rows;
}

export function validateRegisterInput(data) {
    const { firstName, lastName, email, password } = data;
    return firstName && lastName && email && password;
}

export async function createUser(user) {
    //check if user exists - postgres will not add a record to our 'users' table if the email address is not unique, this means the user already exists and we can just respond with this postgres duplicate error message

    // http://localhost:3000/register?firstname=Bob&lastname=One&email=bob1@test.com&password=password
    let { email, password } = user;
    let firstName = user.firstname;
    let lastName = user.lastname;

    console.log("user: ", user);

    //sanitise input
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    email = email.toLowerCase();

    //encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create jwt token
    const token = jwt.sign({ email }, auth.privateKey, { expiresIn: "2h" });

    //add user to database with query
    const sql = 
    `INSERT INTO users (first_name, last_name, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
    const values = [firstName, lastName, email, encryptedPassword, token];
    values.forEach(e => console.log(e))  

    try {
        const response = await query(sql, values);
        return response.rows;
    } catch (error) {
        return {
            error: "Postgres SQL Error",
            code: error.code,
            detail: error.detail,
            table: error.table,
            constraint: error.constraint,
        };
    }
}

export function validateLoginInput(data) {
    const { email, password } = data;
    return email && password;
}

async function checkUserExists(user) {
    //sanitise input
    const email = user.email.toLowerCase();

    const sql = `SELECT * FROM users WHERE LOWER(email) = $1;`;
    const values = [email];
    
    const response = await query(sql, values);
    if (response.rowCount === 0) { //if user doesn't exist, return false
        return false;
    }

    return response.rows[0]; //if user exists, return user
}

export async function login(userInput) {
    // http://localhost:3000/login?email=test1@test.com&password=test1
    const { password, email } = userInput;

    const dbUser = await checkUserExists(userInput);
    if (!dbUser) {
        return "User does not exist.";
    }
    
    const dbPassword = dbUser.password;

    const login = await bcrypt.compare(password, dbPassword);

    if (!login) { //if passwords don't match
        return "Login failed. Credentials did not match.";
    }

    //generate JWT token and return to user
    const token = jwt.sign({ email }, auth.privateKey, { expiresIn: "2h" });

    //add JWT to database
    const sql = `UPDATE users SET token = $1 WHERE email = $2 RETURNING *;`
    const values = [token, email];

    try {
        const response = await query(sql, values);
    } catch (error) {
        return {
            error: "Postgres SQL Error",
            code: error.code,
            detail: error.detail,
            table: error.table,
            constraint: error.constraint,
        };
    }

    //login successful, return the token as payload
    return token;
}