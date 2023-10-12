import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useEffect, useState } from "react";
import { PagingParams } from "../../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, GridColumn, Loader } from "semantic-ui-react";
import TrainingList from "./TrainingList";
import TrainingFilters from "./TrainingFilters";
import TrainingListItemPlaceholder from "./TrainingListItemPlaceholder";

const TrainingDashboard = () => {
  const { trainingStore } = useStore();
  const { loadTrainings, trainingRegistry, setPagingParams, pagination } =
    trainingStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadTrainings().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (trainingRegistry.size === 0) loadTrainings();
  }, [trainingRegistry.size, loadTrainings]);
  return (
    <Grid>
      <Grid.Column width="3">
        <TrainingFilters />
      </Grid.Column>
      <Grid.Column width="13">
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
      </Grid.Column>
      
      <GridColumn width={10}>
        <Loader active={loadingNext} />
      </GridColumn>
    </Grid>
  );
};

export default observer(TrainingDashboard);
