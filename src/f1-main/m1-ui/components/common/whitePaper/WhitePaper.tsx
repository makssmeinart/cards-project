import s from "./whitePapter.module.css"

export const WhitePaper = (props: any) => {
    return (
        <div className={s.wrapper}>{props.children}</div>
    )
}