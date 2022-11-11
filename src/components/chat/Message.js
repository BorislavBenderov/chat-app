import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Message = ({message, scroll}) => {
    const { auth } = useContext(AuthContext);

    if (!message.uid) {
        message.uid = '';
    }

    const ownerMessage = message.uid === auth.currentUser.uid;

    let mystyle = {
        "flexDirection" : "row-reverse"
    }

    if (ownerMessage) {
        mystyle = {
            "flexDirection" : "row"
        }
    };

    return (
        <div className="chat__conversation-board__message-container" style={mystyle} ref={scroll}>
            <div className="chat__conversation-board__message__person">
                <div className="chat__conversation-board__message__person__avatar">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Monika Figi"
                    />
                </div>
                <span className="chat__conversation-board__message__person__nickname">
                    Monika Figi
                </span>
            </div>
            <div className="chat__conversation-board__message__context">
                <div className="chat__conversation-board__message__bubble">
                    {" "}
                    <span>
                        {message.text}
                    </span>
                </div>
            </div>
        </div>
    );
}