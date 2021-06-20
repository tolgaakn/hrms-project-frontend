import React, { useState } from "react";
import {
  Image,
  Dropdown
} from "semantic-ui-react";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import "./Slider.css"
import CityService from "../../services/cityService";
import { useEffect } from "react";

export default function Slider() {

  const [cities, setCities] = useState([])

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data))
  }, [])


  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id
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
          <Col md="4">
            <FormGroup>
              <Input
                className="form-control-alternative"
                id="exampleFormControlInput1"
                placeholder="Pozisyon Adı"
                type="text"
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
