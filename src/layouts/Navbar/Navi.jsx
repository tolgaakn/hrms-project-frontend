import React from "react";
import { Container, Menu, Dropdown } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function Navi() {
    return (
        <div>
            <Menu size="large" className="margin-bottom-md">
                <Container>
                    <Menu.Item header>Our Company</Menu.Item>
                    <Menu.Item name="aboutUs" />
                    <Menu.Item name="İş Ara" />
                    <Menu.Item>
                        <Dropdown text="Profil">
                            <Dropdown.Menu>
                                <Dropdown.Item>Özgeçmiş</Dropdown.Item>
                                <Dropdown.Item>Başvurular</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item position="right">
                        <SignedIn />
                        <SignedOut />
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    );
}
