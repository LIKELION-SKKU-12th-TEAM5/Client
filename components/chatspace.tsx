// components/chatspace.tsx
import { useEffect } from "react";

export default function ChatSpace({ className, chats, category, setMessages}) {
    useEffect(() => {
        const greetMsg = `안녕하세요! ${category} 상담 도우미 입니다! 무엇을 도와드릴까요?`;
        setMessages((prev) => [greetMsg, ...prev.slice(1)]);
    }, [category])

    return (
        <div className={className}>
            <ul>
                {chats ?
                    chats.map((chat, index) => (
                        <li key={index}>{chat}</li>
                    ))
                    : null
                }
            </ul>
        </div>
    );
};