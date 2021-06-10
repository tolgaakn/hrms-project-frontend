import React from 'react'
import { Grid } from 'semantic-ui-react'
import JobAdvertisementPage from "../pages/JobAdvertisementPage"
import EmployerList from "../pages/Employer/EmployerList"
import JobPositionList from '../pages/JobPosition/JobPositionList'

export default function Dashboard() {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <JobAdvertisementPage />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
