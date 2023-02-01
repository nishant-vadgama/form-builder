/* 
    File : Render dynamic form using form json
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo, useCallback, useState } from 'react'
import { Button, Row, Col, Container, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import { useQuery } from '../helper/helper.common'


function Dynamicform() {
    let navigate = useNavigate();
    const [formDetails, setFormDetails] = useState({})
    const id = useQuery().get('id');
    const formData = JSON.parse(localStorage.getItem('formData')) ?? [];
    let selected = formData.length ? formData.filter((_, i) => _.id === id) : []
    const form = selected.length ? selected[0] : {}
    /* checkbox change event handler */
    const checkboxHandler = useCallback((e, name) => {
        let result = formDetails[name]
        if (result === undefined) {
            setFormDetails({ ...formDetails, [name]: [e.target.value] })
        } else {
            if (e.target.checked) {//true
                setFormDetails({ ...formDetails, [name]: [...formDetails[name], e.target.value] })
            } else {//false
                setFormDetails({ ...formDetails, [name]: formDetails[name].filter((op, i) => op !== e.target.value) })
            }
        }
    }, [formDetails])
    /* save form data  */
    const saveData = function () {
        let feedbackData = JSON.parse(localStorage.getItem(id))
        if (feedbackData !== null) {
            localStorage.setItem(id, JSON.stringify([...feedbackData, formDetails]))
            navigate("/");
        } else {
            localStorage.setItem(id, JSON.stringify([formDetails]))
            navigate("/");
        }
    }
    if (Object.keys(form).length) {
        return (
            <Container className="">
                <Row>
                    <Col sm={6} className="offset-3 mt-2">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm={12} className="fw-bold text-center">
                                        <h2>{form?.name}</h2>
                                    </Col>
                                    {form.fields.map((field, index) => {
                                        return (
                                            <Col key={index} sm={12} className="">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="formName" className='fw-bold'>
                                                            {field?.text}
                                                        </Label>
                                                        {/* text input type */}
                                                        {field.type === "text" && <Input
                                                            id="formName"
                                                            name={field?.text ?? ""}
                                                            placeholder="Write name of the form"
                                                            type="text"
                                                            value={formDetails[field?.text] ?? ""}
                                                            onChange={(e) => setFormDetails({ ...formDetails, [field?.text]: e.target.value })}
                                                            autoComplete="off"
                                                        />}
                                                        {/* checkbox input */}
                                                        {field.type === "checkbox" && field.options.map((op, indOp) => {
                                                            return (
                                                                <FormGroup check key={indOp}>
                                                                    <Input type="checkbox" value={op} onChange={(e) => checkboxHandler(e, field?.text)} />
                                                                    {' '}
                                                                    <Label check>
                                                                        {op}
                                                                    </Label>
                                                                </FormGroup>
                                                            )
                                                        })}
                                                        {/* radio input */}
                                                        {field.type === "radio" && field.options.map((op, indOp) => {
                                                            return (
                                                                <FormGroup check key={indOp}>
                                                                    <Input type="radio" name={field?.text} value={op} onChange={(e) => setFormDetails({ ...formDetails, [field?.text]: e.target.value })} />
                                                                    {' '}
                                                                    <Label check>
                                                                        {op}
                                                                    </Label>
                                                                </FormGroup>
                                                            )
                                                        })}
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        )
                                    })}
                                    <Col sm={12} className="d-flex justify-content-center mt-5">
                                        <Button color="primary" size="sm" className='mr-10 col-sm-2' onClick={() => saveData()}>Submit</Button>
                                        <Button color="danger" size="sm" className='col-sm-2' onClick={() => navigate("/")}>Cancel</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container className="">
                <Row>
                    <Col sm={6} className="offset-3 fw-bold text-center">
                        <h2>{'No form data found'}</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default memo(Dynamicform)