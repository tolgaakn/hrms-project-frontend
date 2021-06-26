import React from 'react'
import JobAdvertisementList from "../pages/JobAdvertisement/JobAdvertisementList"
import { Route } from 'react-router'
import HomePage from '../pages/HomePage'
import JobAdvertisementDetail from '../pages/JobAdvertisement/JobAdvertisementDetail'
import AddJobAdvertisement from '../pages/JobAdvertisement/AddJobAdvertisement'
import JobPositionList from "../pages/JobPosition/JobPositionList"
import AddJobPosition from '../pages/JobPosition/AddJobPosition'
import AdminJobAdvertisementList from "../pages/Admin/JobAdvertisement/AdminJobAdvertisementList"
import AdminJobAdvertisementDetail from "../pages/Admin/JobAdvertisement/AdminJobAdvertisementDetail"
import { ToastContainer } from "react-toastify";
import CurriculumVitaeList from '../pages/CurriculumVitae/CurriculumVitaeList'
import CurriculumVitaeDetail from '../pages/CurriculumVitae/CurriculumVitaeDetail'
import { Container } from 'reactstrap'
import AddCurriculumVitae from '../pages/CurriculumVitae/AddCurriculumVitae'

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position="bottom-right" />
            <Route exact path="/" component={HomePage} />
            <Container>
                
                <Route exact path="/jobadvertisements" component={JobAdvertisementList} />
                <Route exact path="/jobadvertisements/jobAdvertisementDetail/:advertisementId" component={JobAdvertisementDetail} />
                <Route exact path="/jobAdvertisements/addJobAdvertisement" component={AddJobAdvertisement} />
                <Route exact path="/admin/jobAdvertisements" component={AdminJobAdvertisementList} />
                <Route exact path="/admin/jobAdvertisements/jobAdvertisementDetail/:advertisementId" component={AdminJobAdvertisementDetail} />

                <Route exact path="/jobPositions" component={JobPositionList} />
                <Route exact path="/jobPositions/addJobPosition" component={AddJobPosition} />

                <Route exact path="/curriculumVitaes" component={CurriculumVitaeList} />
                <Route exact path="/curriculumVitaes/curriculumVitaeDetail/:curriculumVitaeId" component={CurriculumVitaeDetail} />
                <Route exact path="/curriculumVitaes/addCurriculumVitae" component={AddCurriculumVitae} />
            </Container>
        </div>
    )
}
