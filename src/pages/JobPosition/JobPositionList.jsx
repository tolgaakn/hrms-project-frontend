import React, { useEffect, useState } from 'react'
import { Container, Table } from 'semantic-ui-react';
import JobPositionService from "../../services/jobPositionService"

export default function JobPositionList() {

    const [jobPositions, setJobPositions] = useState([])

    useEffect(() => {
        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
    }, []);

    return (
        <div>
            <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Pozisyon Adı</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobPositions.map((jobPosition) => (
                            <Table.Row key={jobPosition.id}>
                                <Table.Cell>{jobPosition.id}</Table.Cell>
                                <Table.Cell>{jobPosition.position}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Container>
        </div>
    )
}
