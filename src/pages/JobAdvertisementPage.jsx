import React, { useState, useEffect } from "react";
import Filter from "../layouts/Filter"
import { Container, Button, Card, Image, Grid, Label, Icon, Header } from "semantic-ui-react";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function JobAdvertisementPage() {

  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobAdvertisements()
      .then((result) => setJobAdvertisements(result.data.data));
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={12}><Header className="text-left" as='h2'>İş İlanları</Header></Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Column width={4}>

          <Filter />

        </Grid.Column>
        <Grid.Column width={12}>
          <Container>
            <Card.Group>
              {
                jobAdvertisements.map((jobAdvertisement) => (
                  <Card fluid>
                    <Grid>
                      <Grid.Column width={4}>
                        <Image className="padding-md advert-img-radius" src='https://upload.wikimedia.org/wikipedia/commons/6/6e/%C3%96rnek.jpg' />
                      </Grid.Column>
                      <Grid.Column width={5} className="text-left advert-margin">
                        <Card.Header className="font-size-header margin-top">{jobAdvertisement.position}</Card.Header>
                        <Card.Meta className="font-size-meta margin-top">{jobAdvertisement.companyName}</Card.Meta>
                        <Card.Meta className="margin-top font-color-black"><Icon name="location arrow" />{jobAdvertisement.cityName}</Card.Meta>
                      </Grid.Column>
                      <Grid.Column width={2}>
                        <Label className="margin-label" color={jobAdvertisement.jobTypeColor}>{jobAdvertisement.jobTypeName}</Label>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Button className="apply-button margin-apply-button" content='Apply' />
                        <Button icon="heart outline" />
                      </Grid.Column>
                    </Grid>
                  </Card>
                ))
              }
            </Card.Group>
          </Container>
        </Grid.Column>
      </Grid>
    </div>
  )
}
