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
  } = trainingStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (trainingRegistry.size === 0 || groupedTrainings.length == 0)
      loadTrainings().then(() => setLoadingComplete(true));
  }, [trainingRegistry.size, loadTrainings, groupedTrainings.length]);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadTrainings().then(() => {
      setLoadingNext(false);
      setLoadingComplete(true);
    });
  }

  return (
    <GridContainer $isSmallScreen={isSmallScreen}>
      {!isSmallScreen && trainingRegistry.size === 0 && (
        <GridSidebar>
          <TrainingFilters />
        </GridSidebar>
      )}
      <GridMainContent>
        {!isLoadingComplete && loadingNext ? (
          <GridLoadingContainer>
            <Loader $zoom={2} />
          </GridLoadingContainer>
        ) : (
          <>
            {trainingStore.loadingInitial && !loadingNext ? (
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
          </>
        )}
      </GridMainContent>
    </GridContainer>
  );
});

export default TrainingDashboard;
