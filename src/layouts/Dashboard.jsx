import React from 'react'
import { Grid } from 'semantic-ui-react'
import JobAdvertisementList from "../pages/JobAdvertisement/JobAdvertisementList"
import { Route } from 'react-router'
import HomePage from '../pages/HomePage'
import JobAdvertisementDetail from '../pages/JobAdvertisement/JobAdvertisementDetail'

export default function Dashboard() {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/jobadvertisements" component={JobAdvertisementList} />
                        <Route path="/jobadvertisements/:advertisementId" component={JobAdvertisementDetail} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
