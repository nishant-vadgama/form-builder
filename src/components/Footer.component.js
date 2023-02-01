/* 
    File : Site footer component
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo } from 'react'
import { Row, Col } from 'reactstrap'

function Footer() {
    const year = new Date().getFullYear();
    return (
        <Row className='app-footer'>
            <Col sm={12}>{`Form Builder @ ${year} Developed by Nishant Vadgama.`}</Col>
        </Row>
    )
}

export default memo(Footer)