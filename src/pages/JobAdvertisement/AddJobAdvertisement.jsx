import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import JobPositionService from "../../services/jobPositionService";
import CityService from "../../services/cityService";
import JobTypeService from '../../services/jobTypeService';
import WorkTypeService from '../../services/workTypeService';
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { Form, Message } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from "yup";


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
      minSalary: Yup.number(),
      maxSalary: Yup.number(),
      employerId: Yup.number(),
      cityId: Yup.number().required("Şehir boş olamaz"),
      jobPositionId: Yup.string().required("İş pozisyonu boş olamaz"),
      jobTypeId: Yup.number().required("İş türü boş olamaz"),
      workTypeId: Yup.number().required("Çalışma türü boş olamaz")
    }),
    onSubmit: (values) => {
      let jobAdvertisementModel = {
        jobPosition:{
          id: values.jobPositionId
        },
        employer:{
          id: 24
        },
        city:{
          id: values.cityId
        },
        jobType:{
          id: values.jobTypeId
        },
        workType:{
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
      alert("Success")
    }
  });

  const handleChangeSemantic = (field, value) => {
    formik.setFieldValue(field, value);
  }

  const jobPositionOptions = jobPositions.map((jobPosition, index) =>({
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
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths={2}>
          <Form.Dropdown
            clearable 
            required 
            label="İş Pozisyonları" 
            placeholder="İş pozisyonu seç" 
            selection 
            search 
            value={formik.values.jobPositionId} 
            options={jobPositionOptions}
            onChange={(event, data) =>{
              handleChangeSemantic("jobPositionId", data.value)
            }}
            />
            {formik.errors.jobPositionId && formik.touched.jobPositionId ? (
              <Message color="red">{formik.errors.jobPositionId}</Message>
            ) : null}

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
              <Message color="red">{formik.errors.cityId}</Message>
            ) : null
          }
        </Form.Group>

        <Form.Group widths={3}>
          <Form.Input 
            label="Minimum Maaş" 
            name="minSalary" 
            placeholder="Minimum Maaş" 
            value={formik.values.minSalary} 
            onChange={formik.handleChange} 
          />
          {
            formik.errors.minSalary && formik.touched.minsalary ? (
              <Message color="red">{formik.errors.minSalary}</Message>
            ): null
          }

          <Form.Input 
            label="Maksimum Maaş" 
            name="maxSalary" 
            placeholder="Maksimum Maaş" 
            value={formik.values.maxSalary} 
            onChange={formik.handleChange} 
          />
          {
            formik.errors.maxSalary && formik.touched.maxSalary ? (
              <Message color="red">{formik.errors.maxSalary}</Message>
            ): null
          }

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
              <Message color="red">{formik.errors.openPosition}</Message>
            ): null
          }
        </Form.Group>

        <Form.Group>
          <Form.Input 
            required 
            width={6} 
            label="Son Başvuru Tarihi" 
            name="applicationDeadline" 
            placeholder="Son Başvuru Tarihi" 
            value={formik.values.applicationDeadline} 
            onChange={formik.handleChange} />
          {
            formik.errors.applicationDeadline && formik.touched.applicationDeadline ? (
              <Message color="red">{formik.errors.applicationDeadline}</Message>
            ): null
          }
          <Form.Field style={{marginLeft:"30px"}}>
            <Form.Dropdown 
              clearable
              required 
              label="İş Türü" 
              placeholder="İş türü seç" 
              selection 
              search 
              value={formik.values.jobTypeId} 
              options={jobTypeOptions} 
              onChange={(event, data) =>{
                handleChangeSemantic("jobTypeId", data.value)
            }} 
            />
            {
              formik.errors.jobTypeId && formik.touched.jobTypeId ? (
                <Message color="red">{formik.errors.jobTypeId}</Message>
              ): null
            }
          </Form.Field>

          <Form.Field style={{marginLeft:"150px"}}>
            <Form.Dropdown 
              clearable
              required 
              label="Çalışma Türü" 
              placeholder="Çalışma türü seç" 
              selection 
              search 
              value={formik.values.workTypeId} 
              options={workTypeOptions} 
              onChange={(event, data) =>{
                handleChangeSemantic("workTypeId", data.value)
            }} 
            />
            {
              formik.errors.workTypeId && formik.touched.workTypeId ? (
                <Message color="red">{formik.errors.workTypeId}</Message>
              ): null
            }
          </Form.Field>
        </Form.Group>

        <Form.TextArea 
          label="İş tanımı" 
          required 
          name="jobDescription"
          placeholder="İş tanımı" 
          value={formik.values.jobDescription} 
          onChange={formik.handleChange} 
        />
        {
          formik.errors.jobDescription && formik.touched.jobDescription ? (
            <Message color="red">{formik.errors.jobDescription}</Message>
          ): null
        }

        <Form.Button onClick={formik.handleSubmit} type="submit" positive>Kaydet</Form.Button>
      </Form>
    </div>
  )
}
