import s
    from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";

export const CardslistHeader = () => {
    const navigate = useNavigate();

    return (
        <div className={s.nameAndBack}>
            <img
                src={
                    "https://cdn-icons-png.flaticon.com/512/507/507257.png"
                }
                onClick={() => navigate(-1)}
                alt={"back"}
                style={{
                    width: "20px",
                    marginRight: "15px",
                    cursor: "pointer"
                }}
            />
            <h1>Cards List</h1>
        </div>
    )
}