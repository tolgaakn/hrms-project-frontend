import React, { useEffect } from 'react'
import { useState } from 'react';
import CurriculumVitaeService from "../../services/curriculumVitaeService";
import { Modal, Table } from 'semantic-ui-react'
import { Button, Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput';

function exampleReducer(state, action) {
    switch (action.type) {
        case 'close':
            return { open: false }
        case 'open':
            return { open: true, size: action.size }
        default:
            throw new Error('Unsupported action...')
    }
}

export default function CurriculumVitaeList() {

    const [curriculumVitaes, setCurriculumVitaes] = useState([]);

    useEffect(() => {
        let curriculumVitaeService = new CurriculumVitaeService();
        curriculumVitaeService
            .getCurriculumVitaes()
            .then((result) => setCurriculumVitaes(result.data.data));
    }, []);


    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state


    const initialValues = { curriculumVitaeName: "" }
    const schema = Yup.object({ curriculumVitaeName: Yup.string().required("Özgeçmiş adı yazın") })
    return (
        <div>
            <Card style={{ marginTop: "3em" }}>
                <CardBody>
                    <Button style={{ float: "right" }} color="success" type="button" onClick={() => dispatch({ type: "open", size: "mini" })}>Yeni Özgeçmiş Ekle</Button>
                </CardBody>
            </Card>
            <Formik initialValues={initialValues} validationSchema={schema}
                onSubmit={(values) => {
                    let curriculumVitaeModel = {
                        candidateId: 25,
                        curriculumVitaeName: values.curriculumVitaeName
                    }

                    let curriculumVitaeService = new CurriculumVitaeService();
                    curriculumVitaeService.add(curriculumVitaeModel).then((result) => {
                        toast.success("Özgeçmiş eklendi. Özgeçmişinizi düzenleyebilirsiniz.")
                    })
                }}
            >
                <Form className="ui form">
                    <Modal
                        size={size}
                        open={open}
                        onClose={() => dispatch({ type: 'close' })}
                    >

                        <Modal.Header>Yeni Özgeçmiş Ekle</Modal.Header>

                        <Modal.Content>

                            <HrmsTextInput className="form-control" name="curriculumVitaeName" placeholder="Özgeçmiş Adı" />

                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => dispatch({ type: 'close' })}>
                                İptal
                            </Button>
                            <Button type="submit">
                                Ekle
                            </Button>
                        </Modal.Actions>

                    </Modal>
                </Form>
            </Formik>
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

        </div >
    )
}