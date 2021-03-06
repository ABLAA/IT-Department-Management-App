import React, { Component } from "react";
import { Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import {
  ValidationForm,
  TextInput,
  BaseFormControl,
  FileInput
} from "react-bootstrap4-form-validation";
import MaskedInput from "react-text-mask";
import Aux from "../../hoc/_Aux";
import axios from "axios";
import DatePicker from "react-datepicker";
import {API_BASE_URL} from "../../conf/index"
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import validator from "validator";

class MaskWithValidation extends BaseFormControl {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  getInputRef() {
    return this.inputRef.current.inputElement;
  }

  handleChange = e => {
    this.checkError();
    if (this.props.onChange) this.props.onChange(e);
  };

  render() {
    return (
      <React.Fragment>
        <MaskedInput
          ref={this.inputRef}
          {...this.filterProps()}
          onChange={this.handleChange}
        />
        {this.displayErrorMessage()}
        {this.displaySuccessMessage()}
      </React.Fragment>
    );
  }
}
class AdministrativeManagers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVertically: false,
      isVertically1: false,
      isVertically3: false,
      isVertically4: false,
      studentsClasses:[],
      sections: [],
      years: [],
      abscentStudents:[],
      students:[],
      department: "",
      name: "",
      birthDate: "",
      status: "",
      class: "",
      classCode: "",
      sectionName:"",
      studentName:"",
      date:"",
      studentLastName:"",
      universitairyYear:"",
      chkBasic: false,
      chkCustom: false,
      checkMeSwitch: false,
      showModal: false
    };
  }

  handleCheckboxChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    });
  };
  componentDidMount() {
    this.getSections();
    this.getYears();
    this.getStudentsClasses();
    this.getabscentStudents();
    this.getStudents();

  }
  getStudents = () => {
    axios
      .get(API_BASE_URL + "/Students")
      .then(response => {
        this.setState({ students: response.data });
        console.log(response.data);
        console.log("ok");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  getStudents = () => {
    axios
      .get(API_BASE_URL + "/Students")
      .then(response => {
        this.setState({ students: response.data });
        console.log(response.data);
        console.log("ok");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  getabscentStudents=()=> {
    axios
    .get(API_BASE_URL + "/Absences")
    .then(response => {
      this.setState({ abscentStudents: response.data });
      console.log(response.data);
      console.log("ok");
    })
    .catch(function(error) {
      console.log(error);
    });

  }
  getStudentsClasses = () => {
    axios.get(API_BASE_URL + "/StudentClasss").then(response => {
      this.setState({ studentsClasses: response.data });
      console.log(this.state.studentsClasses);
      console.log("ok");
    });
  };
    getSections=()=> {
      axios
      .get(API_BASE_URL + "/Sections")
      .then(response => {
        this.setState({ sections: response.data });
        console.log(response.data);
        console.log("ok");
      })
      .catch(function(error) {
        console.log(error);
      });

    }
    getYears=()=> {
      axios
      .get(API_BASE_URL + "/UniversitairyYears")
      .then(response => {
        this.setState({ years: response.data });
        console.log(response.data);
        console.log("ok");
      })
      .catch(function(error) {
        console.log(error);
      });

    }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeStatus(e) {
    console.log(e.target.value);
    this.setState({ status: e.target.value });
  }

  handleSubmit = (e, formData, inputs) => {
    e.preventDefault();
    //alert(JSON.stringify(formData, null, 2));
    this.setState({ showModal: true });
  };

  handleErrorSubmit = (e, formData, errorInputs) => {
    //console.log(errorInputs);
  };

  deletesection = code => {
    let sections = this.state.sections.filter(section => section.code !== code);
    this.setState({ sections });
    axios
      .delete(API_BASE_URL + `/Section/${code}`)
      .then(response => {
        // this.setState({ sections: response.data });
        console.log(response.data);
        console.log("ok");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  addAbsence =()=>   {
  let student =[]
  student = this.state.students.filter(stud => stud.firstName === this.state.studentName && stud.lastName === this.state.studentLastName );
  let abscentStudents = this.state.abscentStudents;
  console.log(student);
  let absence = {
    date: this.state.date,
    studentCode: student[0] === undefined ? "null" : student[0].code
  };
  console.log(absence);
  axios
    .post(API_BASE_URL + "/Absence", absence)
    .then(function(response) {
      console.log(response.data);
      abscentStudents.push(response.data);
      this.setState({ abscentStudents });
    })
    .catch(function(error) {
      console.log(error);
    });
};
  addStudentClass = () => {
    let section =[]
    section = this.state.sections.filter(sec => sec.name === this.state.sectionName  );
    console.log(section);
    let studentsClasses = this.state.studentsClasses;
    let studentClass = {
      sectionCode: section[0] === undefined ? "null" : section[0].code ,
      universitairyYear: this.state.universitairyYear
    }
    console.log(studentClass);
    axios
      .post(API_BASE_URL + "/StudentClass", studentClass)
      .then(function(response) {
        console.log(response.data);
        studentsClasses.push(response.data);
        this.setState({ studentsClasses });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  addSection = () => {
    let sections = this.state.sections;
    let section = {
      department: this.state.department,
      name: this.state.name
    };
    console.log(section);
    axios
      .post(API_BASE_URL + "/Section", section)
      .then(function(response) {
        console.log(response.data);
        sections.push(response.data);
        this.setState({ sections });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  addYear = () => {
    let years = this.state.years;
    let year = {
      universitairyYear: this.state.year
    };
    console.log(year);
    axios
      .post(API_BASE_URL + "/UniversitairyYear", year)
      .then(function(response) {
        console.log(response.data);
        years.push(response.data);
        this.setState({ years });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  editsection = code => {
    let sections = this.state.sections.map(section =>
      section.code == code
        ? {
            code: Math.random(),
            department: this.state.department.length
              ? this.state.department
              : section.department,
            name: this.state.name.length
              ? this.state.name
              : section.name,
            birthDate: this.state.birthDate.length
              ? this.state.birthDate
              : section.birthDate,
            status: this.state.status.length
              ? this.state.status
              : section.status
          }
        : section
    );
    // sections = sections.map(section => {
    //   if (section.code === code) {
    //     return {
    //       code: Math.random(),
    //       department: this.state.department,
    //       name: this.state.name,
    //       birthDate: this.state.birthDate,
    //       status: this.state.status
    //     };
    //   }
    // });
    console.log(sections, this.state.department);
    this.setState({ sections });
  };
  getPickerValue = value => {
    console.log(value);
  };

  render() {
    return (
      <Aux>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <Row>
                    <Col md={11}>
                      <h5>List of Sections</h5>
                    </Col>
                    <Col md={1}>
                      <Button
                        className="btn-icon btn"
                        variant="secondary"
                        onClick={() => this.setState({ isVertically1: true })}
                      >
                        <i className="feather icon-plus-square" />
                      </Button>
                      <Modal
                        centered
                        show={this.state.isVertically1}
                        onHide={() => this.setState({ isVertically1: false })}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Add section</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ValidationForm
                            onSubmit={this.handleSubmit}
                            onErrorSubmit={this.handleErrorSubmit}
                          >
                            <Form.Row>
                              <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="department">
                                department name
                                </Form.Label>
                                <TextInput
                                  name="department"
                                  id="department"
                                  placeholder="department Name"
                                  required
                                  value={this.state.department}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                />
                              </Form.Group>
                              <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="name">
                                section name
                                </Form.Label>
                                <TextInput
                                  name="name"
                                  id="name"
                                  placeholder="section Name"
                                  value={this.state.name}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                />
                              </Form.Group>

                               <Form.Group as={Col} sm={12} className="mt-3">
                                <Button
                                  onClick={() => {
                                    this.addSection();
                                  }}
                                  type="submit"
                                >
                                  add section
                                </Button>
                              </Form.Group>
                            
                          
                            </Form.Row>
                          </ValidationForm>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              this.setState({ isVertically1: false })
                            }
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>

                      <th>departement</th>
                      <th>delete</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.sections.map(section => (
                      <tr key={section.code}>
                        <th scope="row">1</th>
                        <td>{section.name}</td>
                        <td>{section.department.title}</td>

                        

                        <td>
                          <Button
                            className="btn-icon btn"
                            variant="danger"
                            onClick={() => this.deletesection(section.code)}
                          >
                            <i className="feather icon-trash" />
                          </Button>
                        </td>
                        
                        
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <Row>
                    <Col md={11}>
                      <h5>List of years</h5>
                    </Col>
                    <Col md={1}>
                      <Button
                        className="btn-icon btn"
                        variant="secondary"
                        onClick={() => this.setState({ isVertically2: true })}
                      >
                        <i className="feather icon-plus-square" />
                      </Button>
                      <Modal
                        centered
                        show={this.state.isVertically2}
                        onHide={() => this.setState({ isVertically2: false })}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Add year</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ValidationForm
                            onSubmit={this.handleSubmit}
                            onErrorSubmit={this.handleErrorSubmit}
                          >
                            <Form.Row>
                            <Form.Group as={Col} md="6">

                                <Form.Label htmlFor="year">
                                year
                                </Form.Label>
                                <TextInput
                                  name="year"
                                  id="year"
                                  placeholder="year "
                                  value={this.state.year}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                />
                              </Form.Group>

                               <Form.Group as={Col} sm={12} className="mt-3">
                                <Button
                                  onClick={() => {
                                    this.addYear();
                                  }}
                                  type="submit"
                                >
                                  add year
                                </Button>
                              </Form.Group>
                            
                          
                            </Form.Row>
                          </ValidationForm>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              this.setState({ isVertically2: false })
                            }
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>

                      <th>delete</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.years.map(year => (
                      <tr key={year.year}>
                        <th scope="row">1</th>
                        <td>{year.year}</td>
                       

                        <td>
                          <Button
                            disabled={true}
                            className="btn-icon btn"
                            variant="danger"
                            onClick={() => this.deletesection(year.code)}
                          >
                            <i className="feather icon-trash" />
                          </Button>
                        </td>
                        
                        
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <Row>
                    <Col md={11}>
                      <h5>List of classes</h5>
                    </Col>
                    <Col md={1}>
                      <Button
                        className="btn-icon btn"
                        variant="secondary"
                        onClick={() => this.setState({ isVertically3: true })}
                      >
                        <i className="feather icon-plus-square" />
                      </Button>
                      <Modal
                        centered
                        show={this.state.isVertically3}
                        onHide={() => this.setState({ isVertically3: false })}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Add year</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ValidationForm
                            onSubmit={this.handleSubmit}
                            onErrorSubmit={this.handleErrorSubmit}
                          >
                            <Form.Row>
                            <Form.Group as={Col} md="6">

                                <Form.Label htmlFor="universitairyYear">
                                universitairy Year
                                </Form.Label>
                                <TextInput
                                  name="universitairyYear"
                                  id="universitairyYear"
                                  placeholder="universitairyYear "
                                  value={this.state.universitairyYear}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                />
                              </Form.Group>
                              <Form.Group as={Col} md="6">
                              <Form.Label htmlFor="sectionName">
                                section Name
                                </Form.Label>
                                <TextInput
                                  name="sectionName"
                                  id="sectionName"
                                  placeholder="sectionName "
                                  value={this.state.sectionName}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                />
                              </Form.Group>

                               <Form.Group as={Col} sm={12} className="mt-3">
                                <Button
                                  onClick={() => {
                                    this.addStudentClass();
                                  }}
                                  type="submit"
                                >
                                  add classes
                                </Button>
                              </Form.Group>
                            
                          
                            </Form.Row>
                          </ValidationForm>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              this.setState({ isVertically3: false })
                            }
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>section</th>
                      <th>year</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.studentsClasses.map(item => (
                      <tr key={item.code}>
                        <th scope="row">1</th>
                        <td>{item.section.name}</td>
                        <td>{item.year.year}</td>
                       

                        <td>
                          <Button
                            disabled={true}
                            className="btn-icon btn"
                            variant="danger"
                            onClick={() => this.deletesection(item.code)}
                          >
                            <i className="feather icon-trash" />
                          </Button>
                        </td>
                        
                        
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Col md={12}>
            <Card>
              <Card.Header>
                <Card.Title>
                  <Row>
                    <Col md={11}>
                      <h5>List of Absences </h5>
                    </Col>
                    <Col md={1}>
                      <Button
                        className="btn-icon btn"
                        variant="secondary"
                        onClick={() => this.setState({ isVertically4: true })}
                      >
                        <i className="feather icon-plus-square" />
                      </Button>
                      <Modal
                        centered
                        show={this.state.isVertically4}
                        onHide={() => this.setState({ isVertically4: false })}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Add year</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ValidationForm
                            onSubmit={this.handleSubmit}
                            onErrorSubmit={this.handleErrorSubmit}
                          >
                            <Form.Row>
                            <Form.Group as={Col} md="6">

                                <Form.Label htmlFor="universitairyYear">
                                date of Absence
                                </Form.Label>
                                <TextInput
                                  name="date"
                                  id="date"
                                  placeholder="date "
                                  value={this.state.date}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                  pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
                                  errorMessage={{
                                    pattern:
                                      "Please enter a valid date : yyyy-mm-dd"
                                  }}
                                />
                              </Form.Group>
                              <Form.Group as={Col} md="6">
                              <Form.Label htmlFor="sectionName">
                                Student First Name
                                </Form.Label>
                                <TextInput
                                  name="studentName"
                                  id="studentName"
                                  placeholder="studentName "
                                  value={this.state.studentName}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                />
                              </Form.Group>
                              <Form.Group as={Col} md="6">
                              <Form.Label htmlFor="studentLastName">
                                Student Last Name
                                </Form.Label>
                                <TextInput
                                  name="studentLastName"
                                  id="studentLastName"
                                  placeholder="studentLastName "
                                  value={this.state.studentLastName}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                />
                              </Form.Group>

                               <Form.Group as={Col} sm={12} className="mt-3">
                                <Button
                                  onClick={() => {
                                    this.addAbsence();
                                  }}
                                  type="submit"
                                >
                                  add classes
                                </Button>
                              </Form.Group>
                            
                          
                            </Form.Row>
                          </ValidationForm>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              this.setState({ isVertically4: false })
                            }
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                                <Table responsive hover>
                                <thead>
                                <tr>
                                <th>date</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                    {this.state.abscentStudents.map(stud => (
                        
                         <tr key={stud.code}>
                            <td>{moment(stud.date).format("YYYY/MM/DD")}</td>
                            <td>{stud.student.firstName}</td>
                            <td>{stud.student.lastName}</td>
                            <td>{stud.student.status}</td>
    
                         </tr>
                   
                        ))}

                                    </tbody>
                                </Table>
              </Card.Body>
            </Card>
          </Col>
      </Aux>
    );
  }
}

export default AdministrativeManagers;
