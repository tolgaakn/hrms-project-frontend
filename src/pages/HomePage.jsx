import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'
import Slider from "../layouts/Slider/Slider";

export default function HomePage() {
  return (
    <div>
      <Slider />
      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "Lorem ipsum dolor"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "Quisquam quo at sequi minus hic accusantium illo impedit.""
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum laboriosam quidem, consectetur ratione voluptatibus fuga.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Blanditiis perspiciatis totam ad nisi enim ipsam, error necessitatibus impedit cum quod omnis soluta neque sed fugit voluptatem sapiente. 
            Inventore, rem esse.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>

          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
          </Divider>

          <Header as="h3" style={{ fontSize: "2em" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Ea laborum dolorem, exercitationem eaque distinctio quae esse excepturi! 
            A molestiae facere voluptatem, pariatur, consequatur optio asperiores doloremque alias non impedit eligendi?
            Quidem consequatur quod, voluptates sit numquam maxime inventore tempora dolorum, dignissimos repudiandae esse, 
            excepturi dolor earum dicta eum nulla repellendus enim ex? 
            Ducimus, maiores mollitia laudantium facere tempore necessitatibus voluptatum.
          </p>
          <Button as="a" size="large">
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment>
    </div>
  );
}
