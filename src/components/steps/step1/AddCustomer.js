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
    {/* <Button variant="outlined" onClick={handleClickOpen}>
      הוספת לקוח
    </Button> */}


    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>     הוספת לקוח למערכת
      </DialogTitle>
      <DialogContent>

        <TextField
          autoFocus
          margin="dense"
          id="client-name"
          label="שם לקוח"
          type="text"
          fullWidth
          variant="standard"
          value={clientName}
          onChange={(e) => setClientName(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="כתובת"
          type="text"
          fullWidth
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="country"
          label="מדינה"
          type="text"
          fullWidth
          variant="standard"
          value={country}
          onChange={(e) => setCountry(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="contact-name-1"
          label="שם איש קשר 1"
          type="text"
          fullWidth
          variant="standard"
          value={contactName1}
          onChange={(e) => setContactName1(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="phone-number-1"
          label="טלפון איש קשר 1"
          type="text"
          fullWidth
          variant="standard"
          value={phoneNumber1}
          onChange={(e) => setPhoneNumber1(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email-1"
          label="מייל איש קשר 1"
          type="email"
          fullWidth
          variant="standard"
          value={email1}
          onChange={(e) => setEmail1(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="contact-name-2"
          label="שם איש קשר 2"
          type="text"
          fullWidth
          variant="standard"
          value={contactName2}
          onChange={(e) => setContactName2(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="phone-number-2"
          label="טלפון איש קשר 2"
          type="text"
          fullWidth
          variant="standard"
          value={phoneNumber2}
          onChange={(e) => setPhoneNumber2(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email-2"
          label="מייל איש קשר 2"
          type="email"
          fullWidth
          variant="standard"
          value={email2}
          onChange={(e) => setEmail2(e.currentTarget.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>ביטול</Button>
        <Button onClick={submitHandler}>אישור</Button>
      </DialogActions>
    </Dialog>
  </>);
}

export default AddCustomer;