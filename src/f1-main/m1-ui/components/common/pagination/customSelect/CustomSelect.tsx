import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import paginationS from "../pagination.module.css";

type PropsType = {
    currentPage: any
    totalPacks: any
    changePaginationValue: any
}
export const CustomSelect = (props: PropsType) => {
    const [currentPageSize, setCurrentPageSize] = useState(12)
    // const currentPage = useSelector(selectCurrentPage)
    // const totalPacks = useSelector(selectTotalPacksCount)
    const dispatch = useDispatch()

    const changePageSize = (value: string) => {
        setCurrentPageSize(Number(value))
    }

    const changePage = (page: number, pageSize: number) => {
        dispatch(props.changePaginationValue(page, pageSize))
    }

    useEffect(() => {
        changePage(props.currentPage, currentPageSize)
    }, [currentPageSize])

    if(props.totalPacks <= currentPageSize) {
        return null
    }

    return (
        <div className={paginationS.selectWrapper}>
            <div>
                Show
            </div>
            <select className={paginationS.select}
                    onChange={(e) =>
                        changePageSize(e.currentTarget.value)}
            >
                <option className={paginationS.selectOption} value={10}>10
                </option>
                <option className={paginationS.selectOption} value={20}>20
                </option>
                <option className={paginationS.selectOption} value={50}>50
                </option>
                <option className={paginationS.selectOption} value={100}>100
                </option>
            </select>
            <div>
                Cards per Page
            </div>
        </div>
    )
}