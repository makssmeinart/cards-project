import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { routes } from "f1-main/m2-bll/routes/routes";
import React, { useEffect } from "react";
import {
  changePaginationValue,
  fetchPacksTC,
} from "f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {
  appStatusSelector,
  isLoggedInSelector,
  maxSelector,
  minSelector,
  packNameSelector,
  selectCurrentPage,
  selectPageSize,
  selectTotalPacksCount,
  sortByPacksSortValueSelector,
  sortedPackValueSelector,
} from "f1-main/m2-bll/selectors/selectAppStatus";
import packsS from "f1-main/m1-ui/components/common/table/packsListTable.module.css";
import s from "f1-main/m1-ui/components/common/table/cardsListTable.module.css";

import { PacksSearch } from "./components/search/PacksSearch";
import { PacksTable } from "./components/table/PacksTable";
import {
  CustomPagination,
  Header,
  Loading,
  Sidebar,
} from "f1-main/m1-ui/components/common";

export const PackList = React.memo(() => {
  const dispatch = useDispatch();

  const packName = useSelector(packNameSelector);
  const status = useSelector(appStatusSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const page = useSelector(selectCurrentPage);

  const max = useSelector(maxSelector);
  const min = useSelector(minSelector);

  const sortValue = useSelector(sortByPacksSortValueSelector);
  const sortedPackValue = useSelector(sortedPackValueSelector);

  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  const totalPacks = useSelector(selectTotalPacksCount);

  useEffect(() => {
    dispatch(fetchPacksTC());
  }, [packName, sortedPackValue, min, max, sortValue, page, pageSize]);

  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <section style={{ height: "100vh" }}>
          <Header />
          <main className={packsS.main}>
            <div className={packsS.wrapper}>
              <Sidebar />
              <div className={packsS.contentWrapper}>
                <div className={packsS.content}>
                  <div className={s.nameAndBack}>
                    <h1>Pack Lists</h1>
                  </div>
                  <PacksSearch />
                  <PacksTable />
                  <CustomPagination
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalPacks={totalPacks}
                    changePaginationValue={changePaginationValue}
                  />
                </div>
              </div>
            </div>
          </main>
        </section>
      )}
    </>
  );
});
