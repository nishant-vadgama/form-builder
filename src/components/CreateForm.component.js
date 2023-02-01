/* 
    File : Create from page component
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo, useCallback, useState } from 'react'
import QuestionComponent from './Question.component'
import { Button, Row, Col, Container, Form, FormGroup, Label, Input, Modal, Card, CardBody } from 'reactstrap'
import { makeid } from '../helper/helper.common'
import { useNavigate } from "react-router-dom";


function CreateForm() {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [name, setName] = useState("")
    const [questionsList, setQuestionsList] = useState([])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const addQuestion = (data) => {
        setQuestionsList([
            ...questionsList,
            data
        ])
        toggle()
    }
    const addForm = function () {
        let err = {};
        /* validate for question text */
        if (name.trim() === "") {
            err.name = "Name is required"
        }
        /* check for question list*/
        if (!questionsList.length) {
            err.quesetions = "Atleast one question is required for the form"
        }

        if (!Object.keys(err).length) {
            let id = makeid(5);
            var date = new Date();
            var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            let newForm = {
                id: id,
                name: name,
                fields: questionsList,
                url: 'dynamic-form?id=' + id,
                createdAt: current_date + " " + current_time
            }
            let formData = JSON.parse(localStorage.getItem('formData'))
            if (formData !== null) {
                localStorage.setItem('formData', JSON.stringify([...formData, newForm]))
                navigate("/");
            } else {
                localStorage.setItem('formData', JSON.stringify([newForm]))
                navigate("/");
            }
        } else {
            setErrors(err)
        }
    }
    const removeQuestion = useCallback((index) => {
        if (window.confirm('Delete the question?')) {
            let updatedList = questionsList.filter((_, i) => i !== index)
            setQuestionsList(updatedList)
        }
    }, [questionsList])
    return (
        <Container className="">
            <Row>
                <Col sm={6} className="offset-3 mt-2">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col sm={12} className="fw-bold text-center">
                                    <h2>{'Create A Form'}</h2>
                                </Col>
                                <Col sm={12} className="">
                                    <Form>
                                        <FormGroup>
                                            <Label for="formName" className='fw-bold'>
                                                Name
                                            </Label>
                                            <Input
                                                id="formName"
                                                name="name"
                                                placeholder="Write name of the form"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                autoComplete="off"
                                            />
                                            {errors?.name && <span className='text-danger'>{errors?.name ?? ""}</span>}
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col sm={12} className="">
                                    <Form>
                                        <FormGroup>
                                            <Label for="formName" className='fw-bold'>
                                                Questions
                                            </Label>
                                            {errors?.quesetions && <p><span className='text-danger'>{errors?.quesetions ?? ""}</span></p>}
                                        </FormGroup>
                                    </Form>
                                    {questionsList.length ? questionsList.map((question, index) => {
                                        return (
                                            <Row key={index} className={'border-top ' + (questionsList.length - 1 === index ? 'border-bottom' : '')}>
                                                <Col sm={1}>{index + 1}</Col>
                                                <Col sm={8}>{question.text}</Col>
                                                <Col sm={2}>{question.type}</Col>
                                                <Col sm={1}>
                                                    <Button
                                                        close
                                                        color="danger"
                                                        outline
                                                        size="sm"
                                                        onClick={() => removeQuestion(index)}
                                                    />
                                                </Col>
                                            </Row>
                                        )
                                    }) : <Row className={'border-top border-bottom text-center'}>
                                        <Col sm={12}>{'No questions added yet'}</Col>
                                    </Row>}
                                </Col>
                                <Col sm={12} className="  d-flex justify-content-center mt-5">
                                    <Button color="secondary" size="sm" className='mr-10 col-sm-4' onClick={toggle}>Add Question</Button>
                                    <Button color="primary" size="sm" className='mr-10 col-sm-2' onClick={addForm}>Submit</Button>
                                    <Button color="danger" size="sm" className='col-sm-2' onClick={() => navigate("/")}>Cancel</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal isOpen={modal} toggle={toggle}>
                <QuestionComponent
                    toggle={toggle}
                    addQuestion={addQuestion} />
            </Modal>
        </Container>
    )
}

export default memo(CreateForm)