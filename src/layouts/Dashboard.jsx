import React from 'react'
import { Grid } from 'semantic-ui-react'
import JobAdvertisementList from "../pages/JobAdvertisement/JobAdvertisementList"
import { Route } from 'react-router'
import HomePage from '../pages/HomePage'
import JobAdvertisementDetail from '../pages/JobAdvertisement/JobAdvertisementDetail'
import AddJobAdvertisement from '../pages/JobAdvertisement/AddJobAdvertisement'

export default function Dashboard() {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/jobadvertisements" component={JobAdvertisementList} />
                        <Route exact path="/jobadvertisements/jobAdvertisementDetail/:advertisementId" component={JobAdvertisementDetail} />
                        <Route exact path="/jobAdvertisements/addJobAdvertisement" component={AddJobAdvertisement} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
