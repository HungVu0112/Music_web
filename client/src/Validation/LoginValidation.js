export default function validation(data) {
    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(data.name === "") { 
        error.name = "Name should not be empty";
    } else { 
        error.name = "";
    }
    
    if(data.email === "") {
        error.email = "Email should not be empty";
    } else if( !email_pattern.test( data.email ) ) {
        error.email = "Email didn't match";
    } else { 
        error.email = "";
    }
    
    if(data.password === "") {
        error.password = "Password should not be empty";
    } else {
        error.password = "";
    }    
    
    return error;
}