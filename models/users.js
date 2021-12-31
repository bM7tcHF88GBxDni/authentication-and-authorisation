import bcrypt from "bcryptjs";
import { query } from "../database/index.js";

export function validateRegisterInput(data) {
    const { firstName, lastName, email, password } = data;
    return !(firstName && lastName && email && password);
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

    //add user to database with query
    const sql = 
    `INSERT INTO users (first_name, last_name, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
    const values = [firstName, lastName, email, encryptedPassword, ""];
    values.forEach(e => console.log(e))

    const response = await query(sql, values);
    
    return response.rows;
}