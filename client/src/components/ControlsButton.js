import { useState } from "react";

function ControlsButton(props) {
    let ButtonOne = props.defaultIcon;
    let ButtonTwo = props.changeIcon;

    const [buttonType, setButton] = useState(false);

    function handleChange() {
        if (props.type === "prev" || props.type === "next") {
            setButton(true);
            props.onClicked(props.type, true);
        }else if (props.type === "play-pause"){
            setButton(!buttonType);
            props.onClicked(props.type, buttonType);
        } else {
            setButton(!buttonType);
            props.onClicked(props.type, !buttonType);
        }
    }

    return (
        <button onClick={handleChange}>
            {!buttonType ? 
                ButtonOne
            :   ButtonTwo 
            }
        </button>
    )
}

export default ControlsButton;