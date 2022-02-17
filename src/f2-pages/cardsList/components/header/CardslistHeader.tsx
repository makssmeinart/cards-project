import s
    from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {packSelector} from "../../../../f1-main/m2-bll/selectors/selectAppStatus";

export const CardslistHeader = () => {
    const navigate = useNavigate();
    const pack = useSelector(packSelector);
    const {packId} = useParams();

    const currentPackName = pack.find((p) => p._id === packId);


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
            <h1>{currentPackName && currentPackName.name}</h1>
        </div>
    )
}