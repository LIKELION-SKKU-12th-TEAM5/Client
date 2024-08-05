// // components/chatspace.tsx
// import { useEffect } from "react";
// import "./chat.css";

// export default function ChatSpace({ className, chats, category, setMessages }) {
//     useEffect(() => {
//         const greetMsg = {
//             content: `안녕하세요! ${category} 상담 도우미 입니다! 무엇을 도와드릴까요?`,
//             side: true
//         }
//         setMessages((prev) => [greetMsg, ...prev.slice(1)]);
//     }, [category])

//     return (
//         <div className={className}>
//             <ul>
//                 {chats ?
//                     chats.map((chat, index) => {
//                         if (chat.side == true) {
//                             return (
//                                 <li key={index} className={"bot"}>
//                                     <div className={"botChatBox"}>
//                                         {chat.content}
//                                     </div>
//                                 </li>
//                             )
//                         } else {
//                             return (
//                                 <li key={index} className={"user"}>
//                                     <div className={"userChatBox"}>
//                                         {chat.content}
//                                     </div>
//                                 </li>
//                             )
//                         }
//                     }
//                     )
//                     : null
//                 }
//             </ul>
//         </div>
//     );
// };

import './chat.css'; // CSS 파일을 가져옵니다.
import { useEffect, useRef } from "react";

export default function ChatSpace({ className, chats, category, setMessages }) {
    const chatEndRef = useRef(null);

    useEffect(() => {
        const greetMsg = `안녕하세요! ${category} 상담 도우미 입니다! 무엇을 도와드릴까요?`;
        setMessages((prevMessages) => [greetMsg, ...prevMessages.slice(1)]);
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