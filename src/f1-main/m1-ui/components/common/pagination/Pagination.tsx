import Pagination from "rc-pagination";
import {useDispatch} from "react-redux";
import paginationS from "./pagination.module.css";
import prevPageIcon from "../../../../../f3-assets/images/icons/prevPageIcon.png";
import nextPageIcon from "../../../../../f3-assets/images/icons/nextPageIcon.png";
import React from "react";
import {CustomSelect} from "./customSelect/CustomSelect";

type PropsType = {
    currentPage: any
    totalPacks: any
    pageSize: any
    changePaginationValue: any
}

export const CustomPagination = (props: PropsType) => {
  const dispatch = useDispatch();


  const changePage = (page: number, pageSize: number) => {
    dispatch(props.changePaginationValue(page, pageSize));
  };


  return (
    <div className={paginationS.wrapper}>
      <Pagination
        current={props.currentPage}
        total={props.totalPacks}
        pageSize={props.pageSize}
        onChange={changePage}
        hideOnSinglePage={false}
        prevIcon={PrevIcon}
        nextIcon={NextIcon}
        locale={{
          items_per_page: "/ page",
          jump_to: "Go to",
          jump_to_confirm: "confirm",
          page: "Page",

          prev_page: "Previous Page",
          next_page: "Next Page",
          prev_5: "Previous 5 Pages",
          next_5: "Next 5 Pages",
          prev_3: "Previous 3 Pages",
          next_3: "Next 3 Pages",
        }}
        jumpNextIcon={JumpNextIcon}
        jumpPrevIcon={JumpPrevIcon}
        style={{ display: "flex", gap: "10px", listStyle: "none" }}
        className={paginationS.pagination}
      />
        <CustomSelect
            currentPage={props.currentPage}
            totalPacks={props.totalPacks}
            changePaginationValue={props.changePaginationValue}
            currentPageSize={props.pageSize}
        />
    </div>
  );
};

export const PrevIcon = () => {
  return (
    <div className={paginationS.icon}>
      <img src={prevPageIcon} alt="Prev page" />
    </div>
  );
};
export const NextIcon = () => {
  return (
    <div className={paginationS.icon}>
      <img src={nextPageIcon} alt="Next page" />
    </div>
  );
};
export const JumpNextIcon = () => {
  return (
    <div className={paginationS.icon}>
      <img src={nextPageIcon} alt="Jump to next page" />
    </div>
  );
};
export const JumpPrevIcon = () => {
  return (
    <div className={paginationS.icon}>
      <img src={prevPageIcon} alt="Jump to next page" />
    </div>
  );
};

