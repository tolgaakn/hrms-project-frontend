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
                            <NavItem>
                                <Link to={"/"}>
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to={"/jobAdvertisements"}>
                                    İlanlar
                                </Link>
                            </NavItem>
                            <NavItem>
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
