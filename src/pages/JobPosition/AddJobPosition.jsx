import { useFormik } from 'formik';
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import React from 'react'
import {
    Button,
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Form,
    Input,
    UncontrolledAlert
} from "reactstrap";
import JobPositionService from '../../services/jobPositionService';

export default function AddJobPosition() {

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            position: ""
        },
        validationSchema: Yup.object({
            position: Yup.string().required("İş pozisyonu adı boş olamaz")
        }),
        onSubmit: (values) => {
            let jobPositionModel = {
                position: values.position
            }

            let jobPositionService = new JobPositionService();
            jobPositionService.add(jobPositionModel).then((result) => console.log(result));
            alert("Success")
            history.push("/jobPositions")
        }
    });

    return (
        <div>
            <Card className="card-stats mb-4 mb-lg-0 mt-4">
                <CardBody>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input
                                        label="Pozisyon Adı"
                                        name="position"
                                        placeholder="İş Pozisyonu"
                                        value={formik.values.position}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.position && formik.touched.position ? (
                                            <UncontrolledAlert color="danger" fade={false}>
                                                <span className="alert-inner--icon">
                                                    <i className="ni ni-like-2" />
                                                </span>{" "}
                                                <span className="alert-inner--text">
                                                    <strong>{formik.errors.position}</strong>
                                                </span>
                                            </UncontrolledAlert>
                                        ) : null
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" className="m-auto">
                                <Button onClick={formik.handleSubmit} color="success" block outline type="submit">
                                    Ekle
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
