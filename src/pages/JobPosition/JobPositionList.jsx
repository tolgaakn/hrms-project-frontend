import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import JobPositionService from "../../services/jobPositionService"
import {
    Button,
    Table,
    Row
} from "reactstrap";
export default function JobPositionList() {

    const [jobPositions, setJobPositions] = useState([])

    useEffect(() => {
        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
    }, []);

    return (
        <div>
            <Container>
                <Row className="mt-4">
                    <div className="col-md-12">
                        <Link to={"/jobPositions/addJobPosition"}>
                            <Button color="default" outline type="button" className="float-right">
                                <span className="btn-inner--icon">
                                    <i className="ni ni-fat-add" />
                                </span>
                                İş Pozisyonu Ekle
                            </Button>
                        </Link>
                    </div>
                </Row>
                <Row className="mt-4">
                    <div className="col-md-12">
                        <Table
                            className="align-items-center table-dark"
                            responsive
                        >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#Id</th>
                                    <th scope="col">İş Pozisyonu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobPositions.map((jobPosition) => (
                                    <tr key={jobPosition.id}>
                                        <th>{jobPosition.id}</th>
                                        <td>{jobPosition.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>
            </Container>
        </div>
    )
}
