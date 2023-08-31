export default function ChangeUserInfo (data) {
    let err = {};

    if (data.username === "") {
        err.username = "Please fill in this field";
    } else {
        err.username = "";
    }

    if (data.avatar === "") {
        err.avatar = "Please fill in this field";
    } else {
        err.avatar = "";
    }

    return err;
}