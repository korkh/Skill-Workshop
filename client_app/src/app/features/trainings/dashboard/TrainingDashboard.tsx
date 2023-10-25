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
  GridMainContent,
  GridLoadingContainer,
} from ".";
import Loader from "../../../components/loader/LoadingComponent";

const TrainingDashboard = observer(() => {
  const { trainingStore } = useStore();
  const { loadTrainings, trainingRegistry, setPagingParams, pagination } =
    trainingStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (trainingRegistry.size === 0)
      loadTrainings().then(() => setLoadingComplete(true));
  }, [trainingRegistry.size, loadTrainings]);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadTrainings().then(() => {
      setLoadingNext(false);
      setLoadingComplete(true);
    });
  }

  return (
    <GridContainer>
      <GridSidebar>
        <TrainingFilters />
      </GridSidebar>
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
            )}
          </>
        )}
      </GridMainContent>
    </GridContainer>
  );
});

export default TrainingDashboard;
