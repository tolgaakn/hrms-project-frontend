import React, { useState } from "react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { Link } from "react-router-dom";
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
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
                        SonundaBuldum.net
                    </NavbarBrand>
                    <button className="navbar-toggler" id="navbarNav" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbarNav">
                        <Nav navbar>
                            <NavItem className="mr-3">
                                <Link className="font-color-white font-weight-bold" to={"/"}>
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem className="mr-3">
                                <Link className="font-color-white font-weight-bold" to={"/jobAdvertisements"}>
                                    İlanlar
                                </Link>
                            </NavItem>
                            <NavItem className="mr-3">
                                Pricing
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
