import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import JobPositionService from "../../services/jobPositionService";
import CityService from "../../services/cityService";
import JobTypeService from '../../services/jobTypeService';
import WorkTypeService from '../../services/workTypeService';
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Form } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import {
  Alert,
  Button,
  Card,
  FormGroup,
  Row,
  Col,
  CardBody
} from "reactstrap";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function AddJobAdvertisement() {
  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);

  const history = useHistory()

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    let cityService = new CityService();
    let jobTypeService = new JobTypeService();
    let workTypeService = new WorkTypeService();

    jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    jobTypeService.getJobTypes().then((result) => setJobTypes(result.data.data));
    workTypeService.getWorkTypes().then((result) => setWorkTypes(result.data.data));
  }, [])

  const formik = useFormik({
    initialValues: {
      jobDescription: "",
      openPosition: "",
      applicationDeadline: "",
      minSalary: "",
      maxSalary: "",
      employerId: "",
      cityId: "",
      jobPositionId: "",
      jobTypeId: "",
      workTypeId: ""
    },
    validationSchema: Yup.object({
      jobDescription: Yup.string().required("İş tanımı boş olamaz"),
      openPosition: Yup.number().required("Açık pozisyon sayısı boş olamaz"),
      applicationDeadline: Yup.date().required("Son başvuru tarihi boş olamaz"),
      minSalary: Yup.number().required("Minimum maaş boş olamaz"),
      maxSalary: Yup.number(),
      employerId: Yup.number(),
      cityId: Yup.number().required("Şehir boş olamaz"),
      jobPositionId: Yup.string().required("İş pozisyonu boş olamaz"),
      jobTypeId: Yup.number().required("İş türü boş olamaz"),
      workTypeId: Yup.number().required("Çalışma türü boş olamaz")
    }),
    onSubmit: (values) => {
      let jobAdvertisementModel = {
        jobPosition: {
          id: values.jobPositionId
        },
        employer: {
          id: 24
        },
        city: {
          id: values.cityId
        },
        jobType: {
          id: values.jobTypeId
        },
        workType: {
          id: values.workTypeId
        },
        jobDescription: values.jobDescription,
        openPosition: values.openPosition,
        applicationDeadline: values.applicationDeadline,
        minSalary: values.minSalary,
        maxSalary: values.maxSalary
      };

      let jobAdvertisementService = new JobAdvertisementService();
      jobAdvertisementService.add(jobAdvertisementModel).then((result) => console.log(result));
      toast.success("İş ilanı eklendi. Sistem tarafından onaylanacaktır.")
      history.push("/")
    }
  });

  const handleChangeSemantic = (field, value) => {
    formik.setFieldValue(field, value);
  }

  const jobPositionOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.position,
    value: jobPosition.id
  }))

  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id
  }))

  const jobTypeOptions = jobTypes.map((jobType, index) => ({
    key: index,
    text: jobType.jobTypeName,
    value: jobType.id
  }))

  const workTypeOptions = workTypes.map((workType, index) => ({
    key: index,
    text: workType.workTypeName,
    value: workType.id
  }))

  return (
    <div>
      <Card style={{ marginTop: "3em" }}>
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Form.Dropdown
                    clearable
                    required
                    label="İş Pozisyonları"
                    placeholder="İş pozisyonu seç"
                    selection
                    search
                    value={formik.values.jobPositionId}
                    options={jobPositionOptions}
                    onChange={(event, data) => {
                      handleChangeSemantic("jobPositionId", data.value)
                    }}
                  />
                  {formik.errors.jobPositionId && formik.touched.jobPositionId ? (
                    <Alert color="danger">
                      <strong>{formik.errors.jobPositionId}</strong>
                    </Alert>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Form.Dropdown
                    clearable
                    required
                    label="Şehirler"
                    placeholder="Şehir Seç"
                    selection
                    search
                    value={formik.values.cityId}
                    options={cityOptions}
                    onChange={(event, data) => {
                      handleChangeSemantic("cityId", data.value)
                    }}
                  />
                  {
                    formik.errors.cityId && formik.touched.cityId ? (
                      <Alert color="danger">
                        <strong>{formik.errors.cityId}</strong>
                      </Alert>
                    ) : null
                  }
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <Form.Dropdown
                      clearable
                      required
                      label="İş Türü"
                      placeholder="İş türü seç"
                      selection
                      search
                      value={formik.values.jobTypeId}
                      options={jobTypeOptions}
                      onChange={(event, data) => {
                        handleChangeSemantic("jobTypeId", data.value)
                      }}
                    />
                    {
                      formik.errors.jobTypeId && formik.touched.jobTypeId ? (
                        <Alert color="danger">
                          <strong>{formik.errors.jobTypeId}</strong>
                        </Alert>
                      ) : null
                    }
                  </Col>
                  <Col md="6">
                    <Form.Dropdown
                      clearable
                      required
                      label="Çalışma Türü"
                      placeholder="Çalışma türü seç"
                      selection
                      search
                      value={formik.values.workTypeId}
                      options={workTypeOptions}
                      onChange={(event, data) => {
                        handleChangeSemantic("workTypeId", data.value)
                      }}
                    />
                    {
                      formik.errors.workTypeId && formik.touched.workTypeId ? (
                        <Alert color="danger">
                          <strong>{formik.errors.workTypeId}</strong>
                        </Alert>
                      ) : null
                    }
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Form.Input
                    required
                    label="Açık Pozisyon"
                    name="openPosition"
                    placeholder="Açık pozisyon"
                    value={formik.values.openPosition}
                    onChange={formik.handleChange}
                  />
                  {
                    formik.errors.openPosition && formik.touched.openPosition ? (
                      <Alert color="danger">
                        <strong>{formik.errors.openPosition}</strong>
                      </Alert>
                    ) : null
                  }
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Form.Input
                        required
                        label="Minimum Maaş"
                        name="minSalary"
                        placeholder="Minimum Maaş"
                        value={formik.values.minSalary}
                        onChange={formik.handleChange}
                      />
                      {
                        formik.errors.minSalary && formik.touched.minsalary ? (
                          <Alert color="danger">
                            <strong>{formik.errors.minSalary}</strong>
                          </Alert>
                        ) : null
                      }
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Form.Input
                        label="Maksimum Maaş"
                        name="maxSalary"
                        placeholder="Maksimum Maaş"
                        value={formik.values.maxSalary}
                        onChange={formik.handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Form.Input
                    required
                    label="Son Başvuru Tarihi"
                    name="applicationDeadline"
                    placeholder="Son Başvuru Tarihi"
                    value={formik.values.applicationDeadline}
                    onChange={formik.handleChange} />
                  {
                    formik.errors.applicationDeadline && formik.touched.applicationDeadline ? (
                      <Alert color="danger">
                        <strong>{formik.errors.applicationDeadline}</strong>
                      </Alert>
                    ) : null
                  }
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <Form.TextArea
                  label="İş tanımı"
                  required
                  name="jobDescription"
                  placeholder="İş tanımı"
                  value={formik.values.jobDescription}
                  onChange={formik.handleChange}
                /> */}
                <CKEditor
                  name="jobDescription"
                  label="İş tanımı"
                  required
                  editor={ClassicEditor}
                  value={formik.values.jobDescription}
                  onChange={(event, editor) => {
                    handleChangeSemantic("jobDescription", editor.getData())
                  }}
                />
                {
                  formik.errors.jobDescription && formik.touched.jobDescription ? (
                    <Alert color="danger">
                      <strong>{formik.errors.jobDescription}</strong>
                    </Alert>
                  ) : null
                }
              </Col>
            </Row>
            <Row>
              <Col md="4"></Col>
              <Col md="4">
                <Button className="mt-3" onClick={formik.handleSubmit} color="success" block type="submit">Kaydet</Button>
              </Col>
              <Col md="4"></Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
