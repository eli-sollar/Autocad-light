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

    <Header />

    <Container>
      <div className="d-flex justify-content-between mt-4 align-items-center mt-3">
        <span className="fs-1">ניהול עבודה</span>
        <Link to="/create">
          <button className="btn-lg-2">ניהול פרויקטים</button>
        </Link>
      </div>
      <h3>
        הוסף פרויקט
      </h3>
      {/* <Link to='/dashboard'>
        ניהול פרוייקטים</Link> */}
      <form onSubmit={submitHandler} className="d-flex justify-content-center align-items-center planners-form flex-column">
        <div className="w-75">
          <div className="d-flex justify-content-between mt-2">
            <span>
            שם פרויקט
            </span>
            <input style={{width: 576}} type={"text"}></input>
          </div>
          {/* <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">שם פרויקט</label>
            <div>
              <input type="email" class="form-control" id="inputEmail3" />
            </div>
          </div> */}
          <div className=" d-flex justify-content-between mt-4">
            <label>שם מתכנן </label>
            <div className="select-box">
              <SelectCustom onChange={(data, type) => setPlannerId(data)} name="Planner" dataSource="Planners" lKey="Id" value="UserName" label="שם מתכנן"></SelectCustom>
            </div>
          </div>
          <div className=" d-flex justify-content-between mt-4">
            <label>שם מתכנן </label>
            <div className="select-box d-flex">
              <SelectCustom onChange={(data, type) => setPlannerId(data)} name="Planner" dataSource="Planners" lKey="Id" value="UserName" label="שם מתכנן"></SelectCustom>
               <AddCustomer OnSubmit={addCustomersHandler}></AddCustomer>
            </div>
          </div>
          <div className=" d-flex  mt-4 ">
            <label>הוסף קובץ</label>
            <div className="select-box-2">
              <button className="btn btn-secondary"> יש לבחור קבצים </button>
              <span> קובץ 1</span>
              <span>קובץ 1</span>
              <span>קובץ 1</span>
            </div>
          </div>
          <div className="text-center">
          <button className="btn btn-warning w-100   mt-4 ms-auto">הוסף</button>
          </div>
        </div>

      </form>


    </Container>

  </>);
}

export default Planners;
