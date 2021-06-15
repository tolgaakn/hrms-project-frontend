import React, { useState, useEffect } from "react";
import Filter from "../../layouts/Filter"
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row
} from "reactstrap";

export default function JobAdvertisementPage() {

  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobAdvertisements()
      .then((result) => setJobAdvertisements(result.data.data));
  }, []);

  return (
    <div style={{ marginTop: "2em" }}>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9 text-left">
          <h2>İş İlanları</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Filter />
        </div>
        <div className="col-md-9">
          <>
            {jobAdvertisements.map((jobAdvertisement) =>(
              <Card className="card-stats mb-4 mb-lg-0 mt-4 job-advert-list" key={jobAdvertisement.id}>
                <CardBody>
                  <Row>
                    <div className="col-md-7" style={{ paddingLeft: "2.5em" }}>
                      <Row>
                        <CardTitle className="mb-0 font-size-header">
                          {jobAdvertisement.position}
                        </CardTitle>
                      </Row>
                      <Row style={{ marginTop: "1em" }}>
                        <CardTitle className="text-muted mb-0">
                          {jobAdvertisement.companyName}
                        </CardTitle>
                      </Row>
                      <Row style={{ marginTop: "2.5em" }}>
                        <Badge className="badge-default text-capitalize" pill style={{ marginRight: "1em", fontSize:"0.8em" }}>
                          
                          {jobAdvertisement.cityName}
                        </Badge>
                        <Badge className="badge-default text-capitalize" pill style={{ marginRight: "1em", fontSize:"0.8em" }}>
                          İlan Tarihi : {jobAdvertisement.createdDate}
                        </Badge>
                        <Badge className="badge-default text-capitalize" pill style={{ marginRight: "1em", fontSize:"0.8em" }}>
                          Son Başvuru : {jobAdvertisement.applicationDeadline}
                        </Badge>
                      </Row>
                    </div>
                    <div className="col-md-2" style={{ margin: "3em 0em" }}>
                      <Row style={{ marginBottom: "1em" }}>
                        <Badge color={jobAdvertisement.jobTypeColor} pill>
                          {jobAdvertisement.jobTypeName}
                        </Badge>
                      </Row>
                      <Row>
                        <Badge color={jobAdvertisement.workTypeColor} pill>
                          {jobAdvertisement.workTypeName}
                        </Badge>
                      </Row>

                    </div>
                    <div className="col-md-3" style={{ margin: "3em 0" }}>
                      <Link to={`/jobAdvertisements/jobAdvertisementDetail/${jobAdvertisement.id}`}>
                        <Button color="success" outline type="button">
                          Detaylar
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            ))
            }
          </>
        </div>
      </div>
    </div>
  )
}
