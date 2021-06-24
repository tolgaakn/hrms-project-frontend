import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from "yup";
import { Button } from 'semantic-ui-react';
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput"
import HrmsSelect from "../../utilities/customFormControls/HrmsSelect"
import JobPositionService from "../../services/jobPositionService";
import CityService from "../../services/cityService";
import JobTypeService from '../../services/jobTypeService';
import WorkTypeService from '../../services/workTypeService';
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { useEffect } from 'react';
import { useState } from 'react'
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { toast } from 'react-toastify';

export default function AddJobAdvertisement() {

  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);

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

  const initialValues = {
    jobPositionId: "",
    cityId: "",
    jobTypeId: "",
    workTypeId: "",
    openPosition: "",
    minSalary: "",
    maxSalary: "",
    applicationDeadline: "",
    jobDescription: ""
  }

  const schema = Yup.object({
    jobPositionId: Yup.string().required("İş pozisyonu seçilmelidir"),
    cityId: Yup.string().required("Şehir seçilmelidir"),
    jobTypeId: Yup.string().required("İş türü seçilmelidir"),
    workTypeId: Yup.string().required("Çalışma türü seçilmelidir"),
    openPosition: Yup.number().required("Açık pozisyon sayısı eklenmelidir"),
    minSalary: Yup.number().required("Minimum maaş bilgisi eklenmelidir"),
    maxSalary: Yup.number(),
    applicationDeadline: Yup.date().required("Son başvuru tarihi eklenmelidir"),
    jobDescription: Yup.string().required("İş tanımı bilgisi eklenmelidir")
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values)
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
          }
          let jobAdvertisementService = new JobAdvertisementService();
          jobAdvertisementService.add(jobAdvertisementModel).then((result) => {
            toast.warning("İş ilanı eklendi. Sistem tarafından onaylanacaktır.")
          })
        }}
        handleChange={(change) => console.log(change)}
      >
        <Card style={{marginTop:"3em"}}>
          <CardTitle>İş İlanı Ekle</CardTitle>
          <CardBody>
            <Form className="ui form">
              <Row style={{marginBottom:"2em"}}>
                <Col md="6">
                  <HrmsSelect as="select" name="jobPositionId">
                    <option value="" disabled>
                      İş pozisyonu
                    </option>
                    {jobPositions.map((jobPosition) => (
                      <option key={jobPosition.id} value={jobPosition.id}>
                        {jobPosition.position}
                      </option>
                    ))}
                  </HrmsSelect>

                </Col>
                <Col md="6">
                  <HrmsSelect as="select" name="cityId">
                    <option value="" disabled>
                      Şehir
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </HrmsSelect>
                </Col>
              </Row>
              <Row style={{marginBottom:"2em"}}>
                <Col md="6">
                  <Row>
                    <Col md="6">
                      <HrmsSelect as="select" name="jobTypeId">
                        <option value="" disabled>
                          İş Türü
                        </option>
                        {jobTypes.map((jobType) => (
                          <option key={jobType.id} value={jobType.id}>
                            {jobType.jobTypeName}
                          </option>
                        ))}
                      </HrmsSelect>
                    </Col>
                    <Col md="6">
                      <HrmsSelect as="select" name="workTypeId">
                        <option value="" disabled>
                          Çalışma Türü
                        </option>
                        {workTypes.map((workType) => (
                          <option key={workType.id} value={workType.id}>
                            {workType.workTypeName}
                          </option>
                        ))}
                      </HrmsSelect>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <HrmsTextInput name="openPosition" placeholder="Açık pozisyon" />
                </Col>
              </Row>
              <Row style={{marginBottom:"2em"}}>
                <Col md="6">
                  <Row>
                    <Col md="6">
                      <HrmsTextInput name="minSalary" placeholder="Minimum maaş" />
                    </Col>
                    <Col md="6">
                      <HrmsTextInput name="maxSalary" placeholder="Maksimum maaş" />
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <HrmsTextInput name="applicationDeadline" placeholder="Son başvuru tarihi" />
                </Col>
              </Row>
              <Row style={{marginBottom:"2em"}}>
                <Col>
                  <HrmsTextInput name="jobDescription" placeholder="İş tanımı" />
                </Col>
              </Row>
              <Button color="green" type="submit">Ekle</Button>
            </Form>
          </CardBody>
        </Card>
      </Formik>
    </div>
  )
}
