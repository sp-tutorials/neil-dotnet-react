import React, { useEffect, useState } from 'react';
import { Button, Grid, List } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegsitry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false))
    }

    useEffect(() => {
        if (activityRegsitry.size <= 1) loadActivities();
    }, [activityRegsitry.size, loadActivities]);

    if (activityStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading activities' />;

    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList />
                    <Button
                        floated='right'
                        content='More...'
                        positive
                        onClick={handleGetNext}
                        loading={loadingNext}
                        disabled={pagination?.totalPages === pagination?.currentPage}
                    />
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    );
})