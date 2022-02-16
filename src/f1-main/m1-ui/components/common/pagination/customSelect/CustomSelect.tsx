import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentPage} from "../../../../../m2-bll/selectors/selectAppStatus";
import {changePaginationValue} from "../../../../../m2-bll/reducers/packsReducer/packsReducer";
import paginationS from "../pagination.module.css";


export const CustomSelect = () => {
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const currentPage = useSelector(selectCurrentPage)
    const dispatch = useDispatch()

    const changePageSize = (value: string) => {
        setCurrentPageSize(Number(value))
    }

    const changePage = (page: number, pageSize: number) => {
        dispatch(changePaginationValue(page, pageSize))
        console.log(page, pageSize)
    }

    useEffect(() => {
        changePage(currentPage, currentPageSize)
    }, [currentPageSize])

    return (
        <select className={paginationS.select}
                onChange={(e) =>
                    changePageSize(e.currentTarget.value)}
        >
            <option className={paginationS.selectOption} value={10}>10</option>
            <option className={paginationS.selectOption} value={20}>20</option>
            <option className={paginationS.selectOption} value={50}>50</option>
            <option className={paginationS.selectOption} value={100}>100
            </option>
        </select>
    )
}