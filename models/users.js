export function validateRegisterInput(data) {
    const { firstName, lastName, email, password } = data;
    return !(firstName || lastName || email || password);
}