import s from "./whitePapter.module.css"
import {ReactNode} from "react";

export const WhitePaper = (props: WhitePaperPropsType) => {
    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <h1 className={s.title}>
                    It-incubator
                </h1>
                <div className={s.content}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

type WhitePaperPropsType = {
    children: ReactNode
}