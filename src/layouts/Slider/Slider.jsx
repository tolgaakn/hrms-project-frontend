import React from "react";
import {
  Input,
  Select,
  Container,
  Header,
  Icon,
  Button,
  Form
} from "semantic-ui-react";

import "./Slider.css"

export default function Slider() {
  return (
    <div className="ui vertical center aligned segment bg-slider">
      <Container text>
        <Header
          className="margin-top-2"
          as="h1"
          content="Imagine-a-Company"
          inverted
          style={{
            fontSize: "4em",
            fontWeight: "normal",
            marginBottom: 0,

          }}
        />
        <Header
          as="h2"
          content="Do whatever you want when you want to."
          inverted
          style={{
            fontSize: "1.7em",
            fontWeight: "normal",
            marginTop: "1.5em",
          }}
        />
        <Form className="margin-bottom-6">
          <Form.Group widths='equal'>
            <Form.Input fluid placeholder='Position Name' />
            <Form.Select
              fluid
              placeholder='City'
            />
            <Form.Button fluid color="black">Search Job</Form.Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
