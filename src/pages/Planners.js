import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import httpRequest from "../utility/httpRequest";
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";
import SelectCustom from "../ui-components/select";
import AddCustomer from "../components/steps/step1/AddCustomer"
import { useNavigate } from "react-router-dom";

const Planners = (props) => {

  const [plannerId, setPlannerId] = useState();
  const [dataLoaded, setDataLoaded] = useState();
  const [files, setFiles] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [customerId, setCustomers] = useState();
const navigate = useNavigate();


  const [projectName, setProjectName] = useState();


  const httpService = new httpRequest();

  useEffect(() => {
    setDataLoaded(true);
  })
  // function reset() {
  //   setClientName();

  //   setPhoneNumber();
  //   setEmail();

  // }
  const submitHandler = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    for (let i = 0; i != files.length; i++) {

      formData.append("files", files[i]);
    }
    let queryParameters = { "name": "SetProject" };
    let bodyParameters = {
      ProjectName: projectName,
      CustomerId: customerId,
      CreateBy: 'Netser',
      UserId: plannerId,
      StepIndex: 1,
      Status: 0
    };

    try {


      const projectId = await httpService.Post("Data/Set", bodyParameters, queryParameters);
      queryParameters = { "folder": projectId };
      //if (formData.hasOwnProperty("files")) {
        const responseFile = await httpService.PostFile("Repository/Upload", formData, queryParameters);
      //}
      
      alert("Success!");

     
      navigate('/Dashboard', { replace: true })
    } catch (error) {
      console.error(error, "Can't create a new project.")
    }


  };
  const handleFileInput = (e) => {
    let files = [];
    let filesList = [];
    for (let index = 0; index < e.target.files.length; index++) {
      files.push(e.target.files[index]);

      filesList.push(e.target.files[index].name);
    }
    setFilesList(filesList);
    setFiles(files);
  }
  const addCustomersHandler = (id) => {

    //refresh the customer select
    setDataLoaded(false);
    setDataLoaded(true);
    //////////
    setCustomers(id);
  }
  return (<>

    <Header btn={"LOG OUT"} />

    <Container>
      <h1>
        ניהול מתכננים
      </h1>
      <h3>
        הוספת פרוייקט
      </h3>
      <Link to='/dashboard'>
        ניהול פרוייקטים</Link>
      <form onSubmit={submitHandler}>

        <TextField
          autoFocus
          margin="dense"
          id="project-name"
          label="שם פרוייקט"
          type="text"
          fullWidth
          variant="standard"
          value={projectName}
          onChange={(e) => setProjectName(e.currentTarget.value)}
        />



        <SelectCustom onChange={(data, type) => setPlannerId(data)} name="Planner" dataSource="Planners" lKey="Id" value="UserName" label="שם מתכנן"></SelectCustom>
        <span>
          בחר לקוח:
        </span> {dataLoaded && <SelectCustom onChange={(data, type) => setCustomers(data)} defaultData={customerId} name="Customers" dataSource="Customers" lKey="Id" value="Name" label="שם ספק"></SelectCustom>}

        <AddCustomer OnSubmit={addCustomersHandler}></AddCustomer>

        <Form.Group controlId="formFile1" className="mb-3">
          <Form.Label>  קובץ 1</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileInput} />
          <Form.Label>  {filesList} </Form.Label>
        </Form.Group>


        <button>save</button>
      </form>


    </Container>

  </>);
}

export default Planners;
