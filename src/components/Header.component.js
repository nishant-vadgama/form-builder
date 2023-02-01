/* 
    File : Site header component
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo } from 'react'
import { Button, Col, Row } from 'reactstrap'
import logo from '../logo.svg';
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className='header'>
            <Row>
                <Col sm={2}>
                    <img src={logo} className="App-logo" alt="logo" />
                </Col>
                <Col sm={8}></Col>
                <Col sm={2} className="create-form-btn">
                    <Link to="/create-page">
                        <Button color="info" size="" block>
                            Create Form
                        </Button>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default memo(Header)