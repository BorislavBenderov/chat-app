import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Message = ({message, scroll, users}) => {
    const { auth } = useContext(AuthContext);

    let user = null
    let ownerMessage = null;

    if (auth.currentUser) {
        ownerMessage = message.uid === auth.currentUser.uid;
        user = users.find(user => user.uid === message.uid);
    }

    let mystyle = {
        "flexDirection" : "row"
    }

    if (ownerMessage) {
        mystyle = {
            "flexDirection" : "row-reverse"
        }
    };

    return (
        <div className="chat__conversation-board__message-container" style={mystyle} ref={scroll}>
            <div className="chat__conversation-board__message__person">
                <div className="chat__conversation-board__message__person__avatar">
                    <img
                        src={user ? user.imageUrl : ''}
                        alt=""
                    />
                </div>
                <span className="chat__conversation-board__message__person__nickname">
                    {user ? user.displayName : ''}
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