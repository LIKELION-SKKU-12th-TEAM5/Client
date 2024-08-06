import {useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import "./conv.css";

export default function Conv({ cuid, title, edit, reloadConv, removeConv}) {
    const handleClick = () => {
        reloadConv(cuid);
    };

    const [confirmDelete, setConfirmDelete] = useState(false);


    const deleteConvReq = async (cuid) => {
        try{
            const res = await fetch('/api/deleteConv', {
                method: 'DELETE',
                headers: {'Content-Type': 'apllication/json'},
                body: JSON.stringify({cuid})
            });

            return res;
        } catch (err) {
            console.error("Error deleting conversation", err)
        }
    };

    const handleDeleteClick = () => {
        setConfirmDelete(true);
    };

    const handleConfirmDelete = async () => {
        // 여기에서 실제 삭제 로직을 추가합니다.
        const res = await deleteConvReq(cuid);
        if (res.ok){
            removeConv(cuid);
        } else{
            console.error('Failed to delete conversation');
        }
        console.log(`Conversation ${cuid} deleted`);
        setConfirmDelete(false); // 삭제 후 다시 원래 상태로 돌림
    };    
    
    return (
        <li className={"conv-container"}>
            <div className={"conv-title"} onClick={handleClick}>
                {title}
            </div>
            {edit?
                <div className={"delete"} onClick={confirmDelete ? handleConfirmDelete : handleDeleteClick}>
                    <FontAwesomeIcon icon={confirmDelete ? faCheck : faTrash} />
                </div>
                : null
            }
        </li>
    );
};