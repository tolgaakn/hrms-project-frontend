import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { Link } from "react-router-dom";
import {
    UncontrolledCollapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container
} from "reactstrap";

export default function Navi() {

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    function handleSignOut() {
        setIsAuthenticated(false)
    }

    function handleSignIn() {
        setIsAuthenticated(true)
    }

    return (
        <>
            <Navbar className="bg-success" expand="lg">
                <Container>
                    <NavbarBrand>
                        Navbar
                    </NavbarBrand>
                    <button className="navbar-toggler" id="navbarNav" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbarNav">
                        <Nav navbar>
                            <NavItem>
                                <Link to={"/"}>
                                    <NavLink>
                                        Home
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to={"/jobAdvertisements"}>
                                    <NavLink>
                                        İlanlar
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    Pricing
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                    <div className="float-right">
                        {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}
                    </div>
                </Container>
            </Navbar>
        </>
    );
}
