import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router';
import JobAdvertisementService from '../../../services/jobAdvertisementService';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardTitle,
    Row
} from "reactstrap";
import { Form, Formik } from 'formik'
import AdvertisementConfirmByEmployeeService from '../../../services/advertisementConfirmByEmployeeService';
import { toast } from 'react-toastify';

export default function JobAdvertisementDetail() {
    let { advertisementId } = useParams();

    const [jobAdvertisement, setJobAdvertisement] = useState({})
    const history = useHistory()

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getById(advertisementId).then(result => setJobAdvertisement(result.data.data))
    })

    return (
        <div style={{ marginTop: "3em" }}>
            <Formik
            onSubmit={(values) => {
                let advertisementConfirmByEmployeeService = new AdvertisementConfirmByEmployeeService();
                advertisementConfirmByEmployeeService.confirmAdvertisement(jobAdvertisement.id, 27).then((result) => {
                    toast.info("İş ilanı onaylandı")
                    history.push("/admin/jobAdvertisements")
                })
            }}
            >
                <Form>
                <Card className="card-stats mb-4 mb-lg-0">
                    <CardBody>
                        <Row>
                            <div className="col-md-9" style={{ paddingLeft: "4em" }}>
                                <Row>
                                    <CardTitle className="text-left mb-0 font-weight-bold" style={{ fontSize: "1.5em" }}>
                                        {jobAdvertisement.position}
                                    </CardTitle>
                                </Row>
                                <Row className="mt-3">
                                    <Badge className="badge-info text-capitalize" pill style={{ marginRight: "1em", fontSize: "0.8em" }}>
                                        Açık Pozisyon : {jobAdvertisement.openPosition}
                                    </Badge>
                                    <Badge className="badge-info text-capitalize" pill style={{ marginRight: "1em", fontSize: "0.8em" }}>
                                        İlan Tarihi : {jobAdvertisement.createdDate}
                                    </Badge>
                                    <Badge className="badge-info text-capitalize" pill style={{ marginRight: "1em", fontSize: "0.8em" }}>
                                        Son Başvuru : {jobAdvertisement.applicationDeadline}
                                    </Badge>
                                </Row>
                            </div>
                            <div className="col-md-3">

                                <Button color="success" type="submit" style={{ margin: "1em 0", marginRight: "1em" }}>
                                    Onayla
                                </Button>


                                <Button color="danger" outline type="button" style={{ margin: "1em 0" }}>
                                    Reddet
                                </Button>
                            </div>
                        </Row>

                        <hr />

                        <Row>
                            <div className="col-md-6" style={{ paddingLeft: "4em" }}>
                                <CardTitle className="text-left mb-1 font-weight-bold">
                                    İş Açıklaması
                                    <Badge color={jobAdvertisement.jobTypeColor} className="text-capitalize" pill style={{ marginRight: "1em", marginLeft: "1em", fontSize: "0.8em" }}>
                                        {jobAdvertisement.jobTypeName}
                                    </Badge>
                                    <Badge color={jobAdvertisement.workTypeColor} className="badge-warning text-capitalize " pill style={{ marginRight: "1em", fontSize: "0.8em" }}>
                                        {jobAdvertisement.workTypeName}
                                    </Badge>
                                </CardTitle>
                                <p className="text-left">{jobAdvertisement.jobDescription}</p>
                            </div>
                            <div className="col-md-6">
                                <Badge color="success" style={{ fontSize: "1em" }} className="text-capitalize mr-2">Min. Maaş : {jobAdvertisement.minSalary}</Badge>
                                <Badge color="success" style={{ fontSize: "1em" }} className="text-capitalize">Max. Maaş : {jobAdvertisement.maxSalary}</Badge>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
                </Form>
            </Formik>
        </div >
    )
}