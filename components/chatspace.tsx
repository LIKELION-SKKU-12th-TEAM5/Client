import './chat.css'; // CSS 파일을 가져옵니다.
import { useEffect, useRef } from "react";

export default function ChatSpace({ className, chats, category, setMessages, policy, house, career }) {
    const chatEndRef = useRef(null);

    useEffect(() => {
        let msg;
		switch (category){
			case "정책":
				msg = policy;
				break;
			case "주거":
				msg = house;
				break;
			case "진로":
				msg = career;
				break;
			default:
				msg = null;
		}
        setMessages((prevMessages) => [msg, ...prevMessages.slice(1)]);
    }, [category]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    return (
        <div className={className}>
            <ul>
                {chats ?
                    chats.map((chat, index) => {
                        if (chat.side === true) {
                            return (
                                <li key={index} className="bot">
                                    <div className="botChatBox">
                                        {chat.content}
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <li key={index} className="user">
                                    <div className="userChatBox">
                                        {chat.content}
                                    </div>
                                </li>
                            );
                        }
                    })
                    : null
                }
                <div ref={chatEndRef} />
            </ul>
        </div>
    );
};