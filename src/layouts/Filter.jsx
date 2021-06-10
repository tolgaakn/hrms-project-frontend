import React, { useEffect, useState } from "react";
import { Dropdown, Input, Menu } from "semantic-ui-react";
import CityService from "../services/cityService";

export default function Filter() {

  const [cities, setCities] = useState([])

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  });

  const cityOptions = [cities.map((city)=>{
    return{
      key: city.id,
      value: city.id,
      text: city.cityName
    }
  })]

  return (
    <div>
      <Menu vertical>
        <Menu.Item>
          <Input placeholder="Search..." />
        </Menu.Item>

        <Menu.Item className="text-left">
          Home
          <Menu.Menu>
            <Menu.Item name="search">Search</Menu.Item>
            <Menu.Item name="add">Add</Menu.Item>
            <Menu.Item name="about">Remove</Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item name="browse" className="text-left">
        <Dropdown
          placeholder='City'
          fluid
          multiple
          search
          selection
          options={cityOptions}
        />
        </Menu.Item>
        <Menu.Item name="messages" className="text-left">Messages</Menu.Item>

        <Dropdown item text="More" className="text-left">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
}
