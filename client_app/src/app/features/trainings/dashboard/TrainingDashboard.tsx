import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { PagingParams } from "../../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import TrainingList from "./TrainingList";
import TrainingFilters from "./TrainingFilters";
import TrainingListItemPlaceholder from "./TrainingListItemPlaceholder";
import {
  GridContainer,
  GridSidebar,
  GridSideBarMobile,
  GridMainContent,
  GridLoadingContainer,
} from ".";
import Loader from "../../../components/loader/LoadingComponent";
import { useMediaQuery } from "../../../hooks/hooks";

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

  return (
    <GridContainer $isSmallScreen={isSmallScreen}>
      <GridMainContent>
        {loadingInitial && !loadingNext ? (
          <>
            <TrainingListItemPlaceholder />
            <TrainingListItemPlaceholder />
          </>
        ) : (
          <>
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
              {isSmallScreen ? (
                <GridSideBarMobile>
                  <TrainingFilters />
                </GridSideBarMobile>
              ) : (
                <GridSidebar>
                  <TrainingFilters />
                </GridSidebar>
              )}
              <TrainingList />
            </InfiniteScroll>
          </>
        )}
        {loadingNext && (
          <GridLoadingContainer>
            <Loader $zoom={2} />
          </GridLoadingContainer>
        )}
      </GridMainContent>
    </GridContainer>
  );
});

export default TrainingDashboard;
