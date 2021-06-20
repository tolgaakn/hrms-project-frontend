import React, { useEffect } from 'react'
import { useState } from 'react';
import CurriculumVitaeService from "../../services/curriculumVitaeService";
import { Table } from 'semantic-ui-react'
import { Button } from "reactstrap";
import { Link } from 'react-router-dom';

export default function CurriculumVitaeList() {

    const [curriculumVitaes, setCurriculumVitaes] = useState([]);

    useEffect(() => {
        let curriculumVitaeService = new CurriculumVitaeService();
        curriculumVitaeService
            .getCurriculumVitaes()
            .then((result) => setCurriculumVitaes(result.data.data));
    }, []);

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Özgeçmiş Adı</Table.HeaderCell>
                        <Table.HeaderCell>Oluşturulma Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>İşlemler</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {curriculumVitaes.map((curriculumVitae) => (
                        <Table.Row>
                            <Table.Cell>{curriculumVitae.curriculumVitaeName}</Table.Cell>
                            <Table.Cell>{curriculumVitae.createdDate}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/curriculumVitaes/curriculumVitaeDetail/${curriculumVitae.id}`}>
                                    <Button color="primary" outline type="button">
                                        Detaylar
                                    </Button>
                                </Link>

                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table>
        </div>
    )
}