export default function ChangePlaylistInfo (data) {
    let err = {};

    if (data.name === "") {
        err.name = "Please fill in this field";
    } else {
        err.name = "";
    }

    if (data.image === "") {
        err.image = "Please fill in this field";
    } else {
        err.image = "";
    }

    return err;
}