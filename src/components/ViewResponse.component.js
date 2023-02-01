/* 
    File : View from feedback/response component
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo, } from 'react'
import { Row, Col, Container, Table, Card, CardBody } from 'reactstrap'
import { useQuery } from '../helper/helper.common'

function ViewResponse() {
    const id = useQuery().get('id');
    const formData = JSON.parse(localStorage.getItem('formData')) ?? [];
    let selected = formData.length ? formData.filter((_, i) => _.id === id) : []
    const form = selected.length ? selected[0] : {}
    const responseData = JSON.parse(localStorage.getItem(id)) ?? [];
    return (
        <Container className="pt-3">
            <Card>
                <CardBody>
                    <Row>
                        <Col sm={12} className="fw-bold text-center mb-2">
                            <h2>{form?.name}</h2>
                        </Col>
                        {responseData.length ?
                            <Col sm={12}>
                                <Table striped bordered size="sm">
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            {Object.keys(responseData[0]).map((k, i) => {
                                                return (
                                                    <th key={i}>
                                                        {k}
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {responseData.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    {Object.keys(row).map((k, i) => {
                                                        return (
                                                            <td key={i}>
                                                                {row[k]}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                            :
                            <Col sm={12} className="fw-bold text-center">
                                <h2>{'No any form response found'}</h2>
                            </Col>
                        }
                    </Row>
                </CardBody>
            </Card>
        </Container>
    )
}

export default memo(ViewResponse)