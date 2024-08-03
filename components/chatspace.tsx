

export default function ChatSpace({ className, chats }){
    return (
        <div className={className}>
            <ul>
                {chats.map(chat => (
                    <li key={chat}>{chat}</li>
                ))}
            </ul>
        </div>
    );
};