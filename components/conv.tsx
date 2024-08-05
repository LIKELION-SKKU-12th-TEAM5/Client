export default function Conv({ cuid, title, reloadConv }) {
    const handleClick = () => {
        reloadConv(cuid);
    };

    return (
        <li>
            <button onClick={handleClick}>
                {title}
            </button>
        </li>
    );
};