import React, { useState } from "react";
import { useFormik, Field } from "formik";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import * as yup from "yup";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import ResultVerificationForm from "../ResultVerificationForm";
import GoogleMap from "../ResultVerificationForm/GoogleMap";
import ReCAPTCHA from "react-google-recaptcha";

const validationSchema = yup.object({
  lastName: yup
    .string()
    .max(40, "Last Name should be of minimum 40 characters length")
    .required("Last Name is required"),
  firstName: yup
    .string()
    .max(40, "First Name should be of minimum 40 characters length")
    .required("First Name is required"),
  userTitle: yup.string().required("Select user title"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .min(10, "Phone no must be 10 digit")
    .max(10, "Phone no must be 10 digit")
    .required("Phone no is required"),
  addressZipCode: yup
    .string()
    .min(5, "Zip Code must be 5 digit")
    .max(5, "Zip Code must be 5 digit"),
  termsAgree: yup.boolean().oneOf([true], "Terms must be required"),
});

export default function DataSurveyForm() {
  const [loading, setLoading] = useState(false);
  const [surveyFormData, setSurveyFormData] = useState({});
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      userTitle: "",
      heightNo: "",
      heightInch: "",
      heightFeet: "",
      height: "",
      phone: "",
      email: "",
      address: "",
      service: {
        phone: false,
        email: false,
        faceBook: false,
      },
      addressZipCode: "",
      monthlyBudget: "",
      termsAgree: false,
      reCaptcha: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log(values);
        localStorage.setItem("SurveyFormData", values);
        // alert(JSON.stringify(values, null, 2));
        setSurveyFormData(values);
      }, 500);
    },
  });

  return (
    <Container>
      {Object.keys(surveyFormData).length > 0
        ? "CSC 642 848 Fall 2021 Individual Assignment Dev Soni"
        : "CSC 642 848 Fall 2021 Individual Assignment Dev Soni"}
      {

      }
      <Row>
        <Col md={6}>
          <Card bg={"Light"} text={"dark"} className="mb-2">
            <form onSubmit={formik.handleSubmit}>
              {!formik.isSubmitting ? (
                <>
                  <Card.Header as="h5">
                    {Object.keys(surveyFormData).length > 0
                      ? "Result Verification"
                      : "Survey Form"}
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6} sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                          fullWidth
                          id="firstName"
                          name="firstName"
                          label="First Name*"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                          }
                          helperText={
                            formik.touched.firstName && formik.errors.firstName
                          }
                        />
                      </Col>
                      <Col md={6} sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                          fullWidth
                          id="lastName"
                          name="lastName"
                          label="Last Name*"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                          }
                          helperText={
                            formik.touched.lastName && formik.errors.lastName
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} sm={4} style={{ marginBottom: "1rem" }}>
                        <TextField
                          select
                          id="userTitle"
                          name="userTitle"
                          label="Title"
                          value={formik.values.userTitle}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.userTitle &&
                            Boolean(formik.errors.userTitle)
                          }
                          helperText={
                            formik.touched.userTitle && formik.errors.userTitle
                          }
                          variant="outlined"
                          fullWidth
                        >
                          <MenuItem value={""}>Select Title</MenuItem>
                          <MenuItem value={"none"}>None</MenuItem>
                          <MenuItem value={"student"}>Student</MenuItem>
                          <MenuItem value={"professor"}>Professor</MenuItem>
                          <MenuItem value={"staff"}>Staff</MenuItem>
                          <MenuItem value={"retired"}>Retired</MenuItem>
                        </TextField>
                      </Col>

                      <Col md={3} sm={4} style={{ marginBottom: "1rem" }}>
                        <TextField
                          fullWidth
                          id="heightFeet"
                          name="heightFeet"
                          label="Height in Feet"
                          value={formik.values.heightFeet}
                          onChange={formik.handleChange}
                        />
                        {/* <TextField
                            select
                            id="height"
                            name="heightFeet"
                            label="Height in Feet"
                            value={formik.values.height}
                            onChange={formik.handleChange}
                            variant="outlined"
                            fullWidth
                          >
                            <MenuItem value={""}>Select Height</MenuItem>
                            <MenuItem value={"feet"}>Feet</MenuItem>
                            <MenuItem value={"inches"}>Inches</MenuItem>
                          </TextField> */}
                      </Col>
                      <Col md={3} sm={4} >
                        <TextField
                          fullWidth
                          id="heightInch"
                          name="heightInch"
                          label="Height in inch"
                          value={formik.values.heightInch}
                          onChange={formik.handleChange}
                        />
                      </Col>
                    </Row>

                    <Col sm={12} style={{ marginBottom: "1rem" }}>
                      <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone No."
                        type="number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Col>

                    <Col sm={12} style={{ marginBottom: "1rem" }}>
                      <TextField
                        multiline
                        rows={2}
                        fullWidth
                        id="address"
                        name="address"
                        label="Address*"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.address &&
                          Boolean(formik.errors.address)
                        }
                        helperText={
                          formik.touched.address && formik.errors.address
                        }
                      />
                    </Col>
                    <Col sm={12} style={{ marginBottom: "1rem" }}>
                      <TextField
                        fullWidth
                        id="addressZipCode"
                        name="addressZipCode"
                        label="Zip Code*"
                        type="number"
                        value={formik.values.addressZipCode}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.addressZipCode &&
                          Boolean(formik.errors.addressZipCode)
                        }
                        helperText={
                          formik.touched.addressZipCode &&
                          formik.errors.addressZipCode
                        }
                      />
                    </Col>
                    <Col sm={12} style={{ marginBottom: "1rem" }}>
                      {/* <TextField
                                fullWidth
                                id="addressZipCode"
                                name="addressZipCode"
                                label="Zip Code*"
                                type="number"
                                value={formik.values.addressZipCode}
                                onChange={formik.handleChange}
                                error={formik.touched.addressZipCode && Boolean(formik.errors.addressZipCode)}
                                helperText={formik.touched.addressZipCode && formik.errors.addressZipCode}
                            /> */}
                      <FormLabel component="legend">Services</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="email"
                            checked={formik.values.service.email}
                            name="service.email"
                            value={formik.values.service.email}
                            onChange={formik.handleChange}
                          />
                        }
                        label="E-mail"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formik.values.service.phone}
                            id="phone"
                            name="service.phone"
                            value={formik.values.service.phone}
                            onChange={formik.handleChange}
                          />
                        }
                        label="Phone"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="faceBook"
                            checked={formik.values.service.faceBook}
                            name="service.faceBook"
                            value={formik.values.service.faceBook}
                            onChange={formik.handleChange}
                          />
                        }
                        label="Facebook"
                      />
                    </Col>
                    <Row>
                      <Col md={6} sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                          select
                          id="monthlyBudget"
                          name="monthlyBudget"
                          label="Monthly Budget"
                          value={formik.values.monthlyBudget}
                          onChange={formik.handleChange}
                          variant="outlined"
                          fullWidth
                        >
                          <MenuItem value={""}>
                            Select your Monthly budget
                          </MenuItem>
                          <MenuItem value={"less than $50"}>
                            less than $50
                          </MenuItem>
                          <MenuItem value={"between $50 and $100"}>
                            between $50 and $100
                          </MenuItem>
                          <MenuItem value={"above $100"}>above $100</MenuItem>
                        </TextField>
                      </Col>
                      <Col md={6} sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formik.values.termsAgree}
                              id="termsAgree"
                              name="termsAgree"
                              value={formik.values.termsAgree}
                              onChange={formik.handleChange}
                              error={Boolean(formik.errors.termsAgree)}
                              helperText={formik.errors.termsAgree}
                            />
                          }
                          label={
                            <a href="javascript:void(0)">I Agree to terms*</a>
                          }
                        />
                        {Boolean(formik.errors.termsAgree) && (
                          <FormHelperText style={{ color: "red" }}>
                            {formik.errors.termsAgree}
                          </FormHelperText>
                        )}
                      </Col>
                      <Col md={8} >
                        <ReCAPTCHA
                          style={{ textAlign: 'right', marginLeft: 'auto' }}
                          name="reCaptcha"
                          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                          onChange={formik.handleChange}
                        />
                      </Col>
                    </Row>

                    <br />
                    <Button variant="primary" type="submit">
                      {loading && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      <span>{loading ? "loading..." : "Verify"}</span>
                    </Button>
                  </Card.Body>
                </>
              ) : (
                formik.isSubmitting &&
                Object.keys(surveyFormData).length > 0 && (
                  <ResultVerificationForm surveyFormObject={surveyFormData} />
                )
              )}
            </form>
          </Card>
        </Col>
        <Col md={6}>
          {Object.keys(surveyFormData).length > 0 && (
            <div style={{ padding: "2rem" }}>
              <p>
                {" "}
                <h5>Address:</h5>
                {surveyFormData?.address} <br />
                {surveyFormData?.addressZipCode}
              </p>
              <GoogleMap
                surveyFormObject={surveyFormData} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
