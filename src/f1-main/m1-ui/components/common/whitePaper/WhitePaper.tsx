import s from "./whitePapter.module.css"
import {ReactNode} from "react";
//@ts-ignore
import Tilt from 'react-tilt'



export const WhitePaper = (props: WhitePaperPropsType) => {
    return (
        <div className={s.container}>
        <Tilt className="Tilt" options={{max: 10, scale: 1.03}} style={{maxWidth: "400px", width: "100%",backdropFilter: "blur(5px)"}}>
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
        </Tilt>
        </div>
    )
}

type WhitePaperPropsType = {
    children: ReactNode
}