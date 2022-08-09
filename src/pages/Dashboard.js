import React, { useState, useEffect } from "react";
import { Col, Container, Form,  Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import "../styles/Dashboard.css";

import SelectCustom from "../ui-components/select"
import DatePickerCustom, { formatDate, parseDate } from "../ui-components/datePicker";
import httpRequest from "../utility/httpRequest";
import TableCustom from "../ui-components/tableCustom";
import { Dialog, TextField } from "@mui/material";

const Dashboard = (props) => {
  const httpService = new httpRequest();
  const [projects, setProjects] = useState([]);
  const [newProjects, setNewProjects] = useState([]);
  const [filesList, setFilesList] = useState([]);

  const [roofType, setRoofType] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [plannerId, setPlanner] = useState(0);
  const [date, setDate] = useState();
  const [projectName, setProjectName] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const locationData = useLocation();

  useEffect(() => {
   
    loadStepData();
    async function loadStepData() {
      let event = null;
      let plannerId =locationData?.state?.plannerId;
      setPlanner(plannerId);
      search(event,"",plannerId);
      search(event, "new",plannerId);
    }

  }, []);
  const downloadFile = async (id) => {
    let queryParameters = { "name": id };

    var response = await httpService.Get("Repository/Download", queryParameters);
    if (response) {
      setFilesList(response);
    } else {
      setFilesList([]);
    } setOpenDialog(true);
  }
  const search = async (event, status,_plannerId) => {
    if (event) { event.preventDefault(); }

    let filterParameters = { 'CustomerId': customerId, 'PlannerId':_plannerId!=undefined?_plannerId: plannerId, 'RoofType': roofType, ProjectName: projectName };
    if (date) {
      filterParameters['CreateAtFrom'] = date.from;
      filterParameters['CreateAtTo'] = date.to;
    }
    if (status == "new") {
      filterParameters['Status'] = 0;//new
    }else{
      filterParameters['Status'] ="1,2"//in progress  and done
    }

    const filterParametersStr = JSON.stringify(filterParameters);
    const parameters = { "name": "Projects", parameters: filterParametersStr }
    const result = await httpService.Get("Data/DataSource", parameters);
    var projects = manageData(result);
    if (status == "new") { setNewProjects(projects);  console.log(projects)}
    else {
      // console.log(projects, "This is the projexts")
      setProjects(projects);
    }
  }

  const manageData = (result) => {
    let projectsArr = [];
    if (result.Table) {

      let tempArray = [];
      for (let i = 0; i < result.Table.length ; i++) {
        tempArray.push({
          Id: result.Table[i].Id,
          ProjectName:  "חוות דן חרמון",
          Date: formatDate(parseDate(result.Table[i].CreateAt, 'MM/dd/yyyy')),
          RoofTypeName: result.Table[i].RoofTypeName,
          CustomerName: result.Table[i].CustomerName,
          UserName: result.Table[i].UserName,
          // CustomerEmail: result.Table[i].CustomerEmail,

          // CustomerPhoneNumber: result.Table[i].CustomerPhoneNumber,

          // StatusName: result.Table[i].StatusName,
          // Status: result.Table[i].Status
        })
        tempArray.push({
          Id: result.Table[i].Id,
          ProjectName:  "חוות דן חרמון",
          Date: formatDate(parseDate(result.Table[i].CreateAt, 'MM/dd/yyyy')),
          RoofTypeName: result.Table[i].RoofTypeName,
          CustomerName: result.Table[i].CustomerName,
          UserName: result.Table[i].UserName,
          // CustomerEmail: result.Table[i].CustomerEmail,

          // CustomerPhoneNumber: result.Table[i].CustomerPhoneNumber,

          // StatusName: result.Table[i].StatusName,
          // Status: result.Table[i].Status
        })
      }
      projectsArr = tempArray;
    }
    return projectsArr;
  };

  const headCells = [{
    id: "Id", numeric: false, disablePadding: true, label: "מספר מזהה"
  }, {
    id: "ProjectName", numeric: true, disablePadding: false, label: "שם פרויקט"
  }, {
    id: "Date", numeric: true, disablePadding: false, label: "תאריך ",
  },
  {
    id: "RoofTypeName", numeric: true, disablePadding: false, label: "לקוח"
  },
  {
    id: "CustomerName", numeric: true, disablePadding: false, label: "מתכנן"
  }
    , {
    id: "UserName", numeric: true, disablePadding: false, label: "נתונים"
  }];


  const handleClose = () => {
    setOpenDialog(false);
  }
 
  const remove = async (id) => {
    let queryParameters = { "name": "SetProject" };
    let bodyParameters = {
      UserId: plannerId,
      ProjectId: id,
      Status: 3//delete
    };

    try {
      const projectId = await httpService.Post("Data/Set", bodyParameters, queryParameters);
      let event = null;
      let status="new";
      search(event, status);

    } catch (error) {
      console.error(error, "Can't delete the project.")
    }
  }
  return (
    <div>
      <Header  />
      <Container>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn-lg-2"> ניהול עבודות</button>
        <Link to="/Planners">
        <button className="bg-orange btn-large"><span>פרויקט חדש  </span> <i class="fa-solid fa-cart-plus"></i> </button>
        </Link>
      </div>
        <Dialog onClose={handleClose} open={openDialog}>
          <div>
            {filesList.map(function (value, index) {
              return <div><a target={"_blank"} download href={value}>File {index}</a></div>
            })
            }

          </div>

        </Dialog>
        <h2 >פרויקטים חדשים</h2>

        <TableCustom remove={remove} downloadFile={downloadFile} rows={newProjects} columns={headCells}></TableCustom>

        <h2 >פרויקטים שהסתיימו \ בתהליך</h2>
        <Form className="mb-4">
          <Row>
            <Col md={1} className="text-center">
                <h3>סינון</h3>           
            </Col>
            <Col md={2}>
              <SelectCustom onChange={(data, type) => setRoofType(data)} pWidth={30} pHeight={30} dataSource="RoofTypes" lKey="Key" value="Value" ></SelectCustom>
            </Col>
            <Col md={2}>
              <SelectCustom onChange={(data, type) => setPlanner(data)} defaultData={plannerId}  dataSource="Planners" lKey="Id" value="UserName" ></SelectCustom>
            </Col>
            <Col md={2}><SelectCustom onChange={(data, type) => setCustomerId(data)} dataSource="Customers" lKey="Id" value="Name"></SelectCustom></Col>
            <Col md={2}><SelectCustom onChange={(data, type) => setCustomerId(data)} dataSource="Customers" lKey="Id" value="Name"></SelectCustom></Col>

            <Col md={2} className="text-center">
              <button onClick={search} className="bg-purple w-50 px-3 py-1 rounded-pill mt-2 ">
                  חפש 
              </button>
            </Col>
          </Row>
        </Form>
      
        <TableCustom remove={remove} rows={projects} columns={headCells} table2={true}></TableCustom>


      </Container>
    </div>
  );
};

export default Dashboard;

