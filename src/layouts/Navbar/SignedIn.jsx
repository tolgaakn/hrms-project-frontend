import React from 'react'
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from "reactstrap";
export default function SignedIn({ signOut }) {
    return (
        <>
            <UncontrolledDropdown className="btn-group">
                <DropdownToggle
                    aria-expanded={false}
                    aria-haspopup={true}
                    caret
                    color="secondary"
                    data-toggle="dropdown"
                    type="button"
                >
                    Tolga
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        Bilgilerim
                    </DropdownItem>
                    <DropdownItem onClick={signOut}>
                        Çıkış Yap
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </>
    )
}
