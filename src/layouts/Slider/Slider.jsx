import React, { useState } from "react";
import {
  Container,
  Form
} from "semantic-ui-react";

import "./Slider.css"
import CityService from "../../services/cityService";
import { useEffect } from "react";

export default function Slider() {

  const [cities, setCities] = useState([])

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data))
  }, [])
  

  const citiesOptions = cities.map((city, index) =>({
    key:index,
    text:city.cityName,
    value:city.id
  }))

  return (
    <div className="ui vertical center aligned segment bg-slider">
      <Container text>
        <Form className="margin-bottom-6">
          <Form.Group widths='equal'>
            <Form.Input fluid placeholder='Position Name' />
            <Form.Select
              fluid
              placeholder='City'
              options={citiesOptions}
            />
            <Form.Button fluid color="black">Search Job</Form.Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
