/* 
    File : Add question to form component
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function Question({ toggle, addQuestion }) {
    const [errors, setErrors] = useState({})
    const [question, setQuestion] = useState({
        text: "",
        type: "text",//text, multichoice checkbox, single radio
        options: ""
    })
    const validateQuestion = function () {
        let err = {};
        /* validate for question text */
        if (text.trim() === "") {
            err.text = "Question is required"
        }
        /* check for options if not text input*/
        if (type !== 'text') {
            if (options.trim() === "") {
                err.options = "Options is required"
            }
        }
        if (!Object.keys(err).length) {
            let data = Object.assign({}, question);
            data.options = data.options.split('\n')
            addQuestion(data)
        } else {
            setErrors(err)
        }
    }
    const { text, type, options } = question;
    return (
        <>
            <ModalHeader toggle={toggle}>Add Question</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="queestionText" className='fw-bold'>
                            Question
                        </Label>
                        <Input
                            id="queestionText"
                            name="text"
                            placeholder="Write your question"
                            type="text"
                            value={text}
                            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
                            autoComplete="off"
                        />
                        {errors?.text && <span className='text-danger'>{errors?.text ?? ""}</span>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="queestionType" className='fw-bold'>
                            Type
                        </Label>
                        <Input
                            id="queestionType"
                            name="type"
                            type="select"
                            value={type}
                            onChange={(e) => setQuestion({ ...question, type: e.target.value })}
                        >
                            <option value="text">Text</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio</option>
                        </Input>
                    </FormGroup>
                    {type !== "text" && <FormGroup>
                        <Label for="queestionType" className='fw-bold'>
                            Options
                        </Label>
                        <Input
                            id="queestionType"
                            name="type"
                            type="textarea"
                            value={options}
                            onChange={(e) => setQuestion({ ...question, options: e.target.value })}
                        />
                        {errors?.options && <span className='text-danger'>{errors?.options ?? ""}</span>}
                    </FormGroup>}
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => validateQuestion()}>
                    Add
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </>
    )
}

export default memo(Question)