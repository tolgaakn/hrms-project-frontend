import React, { useEffect, useState } from 'react'
import { Container, Table } from 'semantic-ui-react';
import CandidateService from "../../services/candidateService";

export default function CandidateList() {
    
    const [candidates, setCandidates] = useState([])
    
    useEffect(() => {
        let candidateService = new CandidateService();
        candidateService.getCandidates().then((result) => setCandidates(result.data.data));
    }, []);

    return (
        <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Ad Soyad</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Doğum Tarihi</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        candidates.map((candidate) => (
                            <Table.Row key={candidate.id}>
                                <Table.Cell>{candidate.id}</Table.Cell>
                                <Table.Cell>{candidate.firstName} {candidate.lastName}</Table.Cell>
                                <Table.Cell>{candidate.email}</Table.Cell>
                                <Table.Cell>{candidate.birthDate}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Container>
    )
}
