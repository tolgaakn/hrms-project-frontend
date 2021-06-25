import React, { useState, useEffect } from "react";
import AdvertisementConfirmByEmployeeService from "../../../services/advertisementConfirmByEmployeeService";
import { Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function JobAdvertisementPage() {

  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let advertisementConfirmByEmployeeService = new AdvertisementConfirmByEmployeeService();
    advertisementConfirmByEmployeeService
      .getJobAdvertisementConfirmRequests()
      .then((result) => setJobAdvertisements(result.data.data));
  }, []);

  return (
    <div style={{ marginTop: "2em" }}>
      <div className="row">
        <div className="col-md-3">

        </div>
        <div className="col-md-9">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#ID</Table.HeaderCell>
                <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                <Table.HeaderCell>Eklenme Tarihi</Table.HeaderCell>
                <Table.HeaderCell>Detay</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                jobAdvertisements.map((jobAdvertisement) => (
                  <Table.Row key={jobAdvertisement.id}>
                    <Table.Cell>{jobAdvertisement.id}</Table.Cell>
                    <Table.Cell>{jobAdvertisement.companyName}</Table.Cell>
                    <Table.Cell>{jobAdvertisement.createdDate}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/admin/jobAdvertisements/jobAdvertisementDetail/${jobAdvertisement.id}`}>
                        <Button color="success" size="sm" outline type="button">
                          Detaylar
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              }

            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
}
