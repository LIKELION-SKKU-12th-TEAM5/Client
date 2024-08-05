// components/chatspace.tsx
import { useEffect } from "react";

export default function ChatSpace({ className, chats, category, setMessages}) {
    useEffect(() => {
        const greetMsg = {
            content: `안녕하세요! ${category} 상담 도우미 입니다! 무엇을 도와드릴까요?`,
            side: true
        }
        setMessages((prev) => [greetMsg, ...prev.slice(1)]);
    }, [category])

    return (
        <div className={className}>
            <ul>
                {chats ?
                    chats.map((chat, index) => {
                        if (chat.side == true){
                            return <li key={index}>{`${chat.content} 챗봇의 메세지`}</li>
                        } else{
                            return <li key={index}>{`${chat.content} 유저의 메세지`}</li>
                        }
                    }
                    )
                    : null
                }
            </ul>
        </div>
    );
};