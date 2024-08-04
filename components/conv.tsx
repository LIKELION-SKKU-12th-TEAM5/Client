export default function Conv({ cuid, reloadConv }) {
    const handleClick = () => {
        reloadConv(cuid);
    };

    return (
        <li>
            <button onClick={handleClick}>
                {cuid}
            </button>
        </li>
    );
};