export function validateEmail(email: string): {value: string, isValid: boolean, message: string} {
  if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)){
    return {value: email, isValid: true, message: ""};
  }
    return {value: email, isValid: false, message: "Inform a valid email."};
}

export function validatePassword(password: string): {value: string, isValid: boolean, message: string} {
    if(password.length < 8){
        return {value: password, isValid: false, message: "Password must have at least 8 characters."};
    }
    return {value: password, isValid: true, message: ""};
}

export function validateUsername(username: string): {value: string, isValid: boolean, message: string} {
    if(username.length < 3){
        return {value: username, isValid: false, message: "Username must have at least 3 characters."};
    }else if(username.length > 20){
        return {value: username, isValid: false, message: "Username must have at most 20 characters."};
    }else if((/[^a-zA-Z0-9]/).test(username)){
        return {value: username, isValid: false, message: "Username must have only letters and numbers."};
    }
    return {value: username, isValid: true, message: ""};
}