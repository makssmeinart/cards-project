import Pagination from 'rc-pagination';
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentPage, selectPageSize,
    selectTotalPacksCount
} from "../../../../m2-bll/selectors/selectAppStatus";
import {changePaginationValue} from "../../../../m2-bll/reducers/packsReducer/packsReducer";
import paginationS from "./pagination.module.css"
import {CustomSelect} from "./customSelect/CustomSelect";
import prevPageIcon from "../../../../../f3-assets/images/icons/prevPageIcon.png"
import nextPageIcon from "../../../../../f3-assets/images/icons/nextPageIcon.png"

export const CustomPagination = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(selectCurrentPage)
    const totalPacks = useSelector(selectTotalPacksCount)
    const pageSize = useSelector(selectPageSize)

    const changePage = (page: number, pageSize: number) => {
        dispatch(changePaginationValue(page, pageSize))
        console.log(page, pageSize)
    }

    return (
        <div className={paginationS.wrapper}>
            <Pagination
                current={currentPage}
                total={totalPacks}
                pageSize={pageSize}
                onChange={changePage}
                hideOnSinglePage={true}
                style={{display: "flex", gap: "10px", listStyle: "none"}}
                className={paginationS.pagination}
                selectComponentClass={CustomSelect}
                prevIcon={PrevIcon}
                nextIcon={NextIcon}
                jumpNextIcon={JumpNextIcon}
                jumpPrevIcon={JumpPrevIcon}
            />
        </div>
    )
}

export const PrevIcon = () => {
    return (
        <div className={paginationS.icon}>
            <img src={prevPageIcon} alt="Prev page"/>
        </div>
    )
}
export const NextIcon = () => {
    return (
        <div className={paginationS.icon}>
            <img src={nextPageIcon} alt="Next page"/>
        </div>

    )
}
export const JumpNextIcon = () => {
    return (
        <div className={paginationS.icon}>
            <img src={nextPageIcon} alt="Jump to next page"/>
        </div>

    )
}
export const JumpPrevIcon = () => {
    return (
        <div className={paginationS.icon}>
            <img src={prevPageIcon} alt="Jump to next page"/>
        </div>

    )
}