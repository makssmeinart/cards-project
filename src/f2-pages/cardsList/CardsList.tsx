import { Navigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePaginationValueCard,
  fetchCardsTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {
  appStatusSelector,
  isLoggedInSelector,
  searchByCardsQuestionSelector,
  sortCardsValueSelector,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import s from "../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import { CardslistHeader } from "./components/header/CardslistHeader";
import { CardslistSearch } from "./components/search/CardslistSearch";
import { CardslistTable } from "./components/table/CardslistTable";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import {
  CustomPagination,
  Header,
  Loading,
} from "../../f1-main/m1-ui/components/common";

export const CardsList = () => {
  const status = useSelector(appStatusSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();
  const { packId } = useParams();
  const sortCardsValue = useSelector(sortCardsValueSelector);
  const searchByCardsQuestion = useSelector(searchByCardsQuestionSelector);

  const pageSize = useSelector<RootAppStateType>(
    (state) => state.cards.pageCount
  );
  const currentPage = useSelector<RootAppStateType>(
    (state) => state.cards.page
  );
  const totalCards = useSelector<RootAppStateType>(
    (state) => state.cards.cardsTotalCount
  );

  useEffect(() => {
    packId && dispatch(fetchCardsTC(packId));
  }, [packId, sortCardsValue, searchByCardsQuestion, currentPage, pageSize]);

  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <section>
          <Header />
          <main className={s.content}>
            <div className={s.wrapper}>
              <CardslistHeader />
              <CardslistSearch />
              <CardslistTable />
            </div>
            <CustomPagination
              pageSize={pageSize}
              currentPage={currentPage}
              totalPacks={totalCards}
              changePaginationValue={changePaginationValueCard}
            />
          </main>
        </section>
      )}
    </>
  );
};
