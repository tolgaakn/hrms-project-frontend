import React, { useState } from "react";
import {
  Image,
  Dropdown
} from "semantic-ui-react";
import {
  Button,
  FormGroup,
  Form,
  Row,
  Col
} from "reactstrap";
import "./Slider.css"
import CityService from "../../services/cityService";
import JobPositionService from "../../services/jobPositionService";
import { useEffect } from "react";

export default function Slider() {

  const [cities, setCities] = useState([])
  const [jobPositions, setJobPositions] = useState([])

  useEffect(() => {
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    cityService.getCities().then((result) => setCities(result.data.data))
    jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data))
  }, [])


  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id
  }))

  const jobPositionOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.position,
    value: jobPosition.id
  }))

  return (
    <div style={{ backgroundColor: "cadetblue", position: "relative" }}>
      <Image
        style={{ opacity: 0.8 }}
        src='/homepage-images/home-page.jpg'
        fluid
      />
      <Form style={{ position: "absolute", left: 0, top: 0, margin: "23em 51em" }}>
        <Row>
          <Col md="4" style={{paddingLeft:0}}>
            <FormGroup>
              <Dropdown
                clearable
                placeholder='İş Pozisyonu'
                search
                selection
                options={jobPositionOptions}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Dropdown
                clearable
                placeholder='Şehir Seç'
                search
                selection
                options={cityOptions}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <Button color="success" type="submit">
              İş Ara
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
