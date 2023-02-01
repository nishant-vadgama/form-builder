/* 
    File : Home page layout
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo, Suspense } from 'react'
import { Container } from 'reactstrap'
const HeaderComponent = React.lazy(() => import('./Header.component'));
const FormListComponent = React.lazy(() => import('./FormList.component'));
const FooterComponent = React.lazy(() => import('./Footer.component'));

function Home() {
    return (
        <Container className="">
            <Suspense fallback={<div>Loading...</div>}>
                <HeaderComponent />
                <FormListComponent />
                <FooterComponent />
            </Suspense>
        </Container>
    );
}

export default memo(Home);
