export default function ChangePasswordValidation(data, currPassword) {
    let err = {};

    if (data.oldpassword !== currPassword) {
        err.oldpassword = "Password Incorrect";
    } else {
        err.oldpassword = "";
    }

    if (data.newpassword === '') {
        err.newpassword = "Password should not be empty";
    } else {
        err.newpassword = "";
    }

    return err;
}