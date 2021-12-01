import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  Table,
} from "react-bootstrap";
import GoogleMap from "./GoogleMap";

export default function ResultVerificationForm(props) {
  const { surveyFormObject } = props;

  return (
    <Card>
      <Card.Header as="h5">Result Verification</Card.Header>
      <Card.Body>
        <Row>
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#Input</th>
                  <th>#Your Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>{surveyFormObject?.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{surveyFormObject?.lastName}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{surveyFormObject?.userTitle}</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>{surveyFormObject?.heightFeet && surveyFormObject?.heightFeet + " Feet "} {surveyFormObject?.heightInch && surveyFormObject?.heightInch + " Inch"}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{surveyFormObject?.phone}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{surveyFormObject?.email}</td>
                </tr>
                <tr>
                  <td>Service</td>
                  <td>
                  {surveyFormObject?.service?.phone && "Phone,"}
                  {surveyFormObject?.service?.email && "Email, "}
                  {surveyFormObject?.service?.faceBook && "Facebook "}
                  </td>
                </tr>
                <tr>
                  <td>Monthly budget</td>
                  <td>{surveyFormObject?.monthlyBudget}</td>
                </tr>
                <tr>
                  <td>Terms & Conditions</td>
                  <td>
                    {surveyFormObject?.termsAgree ? "Agree" : "Not Agree"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
