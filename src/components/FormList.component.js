/* 
    File : Display list of created forms
    Date : 01-02-23
    Comment : Nishant Vadgama - Developer
*/
import React, { memo } from 'react'
import { Table } from 'reactstrap'
import { Link } from "react-router-dom";

function FormList() {
    let formData = JSON.parse(localStorage.getItem('formData'))
    let tableData = formData ?? []
    return (
        <>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Form Name
                        </th>
                        <th>
                            URL
                        </th>
                        <th>
                            Created At
                        </th>
                        <th>
                            Total Response
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.length ? tableData.map((form, index) => {
                        let totalReponse = JSON.parse(localStorage.getItem(form.id))?.length ?? 0
                        return (
                            <tr key={index}>
                                <th scope="row">
                                    {form.id}
                                </th>
                                <td>
                                    {form.name}
                                </td>
                                <td>
                                    <Link to={form.url} target="_blank" rel="noopener noreferrer">
                                        {form.url}
                                    </Link>
                                </td>
                                <td>
                                    {form.createdAt}
                                </td>
                                <td>
                                    {totalReponse > 0 ?
                                        <Link to={'view-response?id=' + form.id} target="_blank" rel="noopener noreferrer">
                                            {totalReponse}
                                        </Link>
                                        :
                                        totalReponse
                                    }
                                </td>
                            </tr>
                        )
                    }) : <tr>
                        <td colSpan="5" className="text-center">
                            No any form created yet.
                        </td>
                    </tr>}
                </tbody>
            </Table>
        </>
    )
}

export default memo(FormList)