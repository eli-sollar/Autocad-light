import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button } from "@mui/material";

import { useState } from "react";
import httpRequest from "../../../utility/httpRequest";

const AddCustomer = (props) => {
  const [clientName, setClientName] = useState();
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [contactName1, setContactName1] = useState();
  const [phoneNumber1, setPhoneNumber1] = useState();
  const [email1, setEmail1] = useState();
  const [contactName2, setContactName2] = useState();
  const [phoneNumber2, setPhoneNumber2] = useState();
  const [email2, setEmail2] = useState();
  const [open, setOpen] = useState(false);
  const httpService = new httpRequest();
  const handleClickOpen = (event) => {

    setOpen(true);
  };
  const closeHandler = (event) => {

    setOpen(false);
  };
  function reset() {
    setClientName();
    setAddress();
    setCountry();
    setContactName1();
    setPhoneNumber1();
    setEmail1();
    setContactName2();
    setPhoneNumber2();
    setEmail2();
  }
  const submitHandler = async () => {
    let queryParameters = { "name": "SetCustomers" };
    let bodyParameters = {
      Name: clientName,
      Address: address,
      Country: country,
      ContactName_1: contactName1,
      PhoneNumber_1: phoneNumber1,
      Email_1: email1,
      ContactName_2: contactName2,
      PhoneNumber_2: phoneNumber2,
      Email_2: email2,
      CreateBy: 'Netser'
    };

    try {
      const response = await httpService.Post("Data/Set", bodyParameters, queryParameters);
      props.OnSubmit(response)
      reset();
    } catch (error) {
      console.log("Can't add new customer.")
    }

    setOpen(false);
  };
  return (<>
    <Button style={{color : "#FF9B05", border : "1px solid #FF9B05"}} variant="outlined" className="p-0 w-25 me-4" onClick={handleClickOpen}>
      הוספת לקוח
    </Button>


    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle className="text-center">  הוספת לקוח 
      </DialogTitle>
      <DialogContent style={{width: 500, height:500}}>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          שם לקוח
          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          כתובת
          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          שם איש קשר 1
          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          טלפון איש קשר 1          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          מייל איש קשר 1          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          שם איש  קשר 2          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          טלפון איש קשר 2          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      <div className="d-flex justify-content-between mt-4 ">
          <span>
          מייל איש קשר 2
          </span>
          {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
          <input style={{ width: 316}} type={"text"}></input>
      </div>
      </DialogContent>
      <DialogActions>
        <Button style={{backgroundColor: "#FF9B05", color :"white"}} onClick={closeHandler}>ביטול</Button>
        <Button style={{backgroundColor: "#1A2E4F", color :"white"}} onClick={submitHandler}>אישור</Button>
      </DialogActions>
    </Dialog>
  </>);
}

export default AddCustomer;