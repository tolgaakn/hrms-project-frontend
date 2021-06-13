import React from 'react'
import { Menu } from 'semantic-ui-react'
import {Button} from 'reactstrap';
export default function SignedOut({signIn}) {
    return (
        <>
            <Button color="secondary" onClick={signIn}>Giriş Yap</Button>
            <Button color="secondary">Kayıt Ol</Button>
            </>
        // <div>
            
        //     <Menu.Item>
        //         <Button primary onClick={signIn}>Giriş Yap</Button>
        //         <Button primary style={{marginLeft:"0.5em"}}>Kayıt Ol</Button>
        //     </Menu.Item>
        // </div>
    )
}
