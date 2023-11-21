import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import {
  GridContainer,
  GridMainContent,
  GridSideBarMobile,
  GridSidebar,
} from ".";
import Loader from "../../../components/loader/LoadingComponent";
import { useMediaQuery } from "../../../hooks/hooks";
import { PagingParams } from "../../../models/pagination";
import { useStore } from "../../../stores/store";
import TrainingFilters from "./TrainingFilters";
import TrainingList from "./TrainingList";
import TrainingListItemPlaceholder from "./TrainingListItemPlaceholder";

const TrainingDashboard = observer(() => {
  const { trainingStore } = useStore();
  const {
    loadTrainings,
    trainingRegistry,
    setPagingParams,
    pagination,
    groupedTrainings,
    loadingInitial,
  } = trainingStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const scrollRef = useRef<number>(0);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (trainingRegistry.size === 0 || groupedTrainings.length == 0)
      loadTrainings();
  }, [trainingRegistry.size, loadTrainings, groupedTrainings.length]);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadTrainings().then(() => {
      setLoadingNext(false);
    });
  }

  const handleScroll = () => {
    scrollRef.current = window.pageYOffset;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loadingInitial && !loadingNext) {
      window.scrollTo(0, scrollRef.current);
    }
  }, [loadingInitial, loadingNext]);

  return (
    <GridContainer $isSmallScreen={isSmallScreen}>
      {!isSmallScreen && (
        <GridSidebar>
          <TrainingFilters />
        </GridSidebar>
      )}

      <GridMainContent>
        {loadingInitial && !loadingNext ? (
          <>
            <TrainingListItemPlaceholder />
            <TrainingListItemPlaceholder />
          </>
        ) : (
          <>
            {isSmallScreen && (
              <GridSideBarMobile>
                <TrainingFilters />
              </GridSideBarMobile>
            )}
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination.currentPage < pagination.totalPages
              }
              initialLoad={false}
            >
              <TrainingList />
            </InfiniteScroll>
          </>
        )}
      </GridMainContent>
      <br />
      {loadingNext && <Loader $zoom={3} $bottom />}
    </GridContainer>
  );
});

export default TrainingDashboard;
