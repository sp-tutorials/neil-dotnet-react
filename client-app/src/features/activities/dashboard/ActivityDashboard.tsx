import React, { useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegsitry } = activityStore;

    useEffect(() => {
        if (activityRegsitry.size <= 1) loadActivities();
    }, [activityRegsitry.size, loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities' />;

    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList />
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    );
})