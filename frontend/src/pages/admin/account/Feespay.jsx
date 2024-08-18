import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import {  PayFees} from '../../../redux/studentRelated/studentHandle';
import { CircularProgress } from '@mui/material';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';

const Feespay = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
   
    
    const { currentUser } = useSelector((state) => state.user);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { userDetails, response, loading, error } = useSelector((state) => state.user);
          console.log(currentUser._id)
          const accountant = currentUser._id
    const [formData, setFormData] = useState({
        // firstname: '',
        // fathername: '',
        // class: '',
        month: '',
        date: '',
        payfees: '',
        accountant,
    });
    console.log(formData)
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const classes = [
        '1', '2', '3', '4', '5', '6', 
        '7', '8', '9', '10', '11', '12'
    ];

   

    const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)
       
      
      const studentID = params.id
      const address = "Student"
  
      useEffect(() => {
          dispatch(getUserDetails(studentID, address));
      }, [dispatch, studentID])

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const num = userDetails.mobileNumber
    // const url =  "https://wa.me/919045657301?text=" + " hello i m Kushwah "+"%0a";
    //   window.open(url, 'blank')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(PayFees(studentID, formData));
        setFormData("");
    };
 
  
console.log(response)
  return (
    <>
       <ul>
        <li>Student Name :{userDetails.name}</li>
        <li>Father's Name :{userDetails.fatherName}</li>
       </ul>
    <Box component="form" onSubmit={handleSubmit} 
    sx={{ display: 'flex', flexDirection: 'column',
     gap: 2, maxWidth: 400, margin: 'auto', padding: 3 }}>
    
    <FormControl fullWidth>
        {/* <InputLabel id="classes-label">Select classes</InputLabel>
        <Select
            labelId="classes-label"
            name="classes"
            value={formData.classes}
            onChange={handleChange}
            label="Select classes"
        >
            {classes.map((classes, index) => (
                <MenuItem key={index} value={classes}>{classes}</MenuItem>
            ))}
        </Select> */}
    </FormControl>
    <FormControl fullWidth>
        <InputLabel id="month-label">Select Month</InputLabel>
        <Select
            labelId="month-label"
            name="month"
            value={formData.month}
            onChange={handleChange}
            label="Select Month"
        >
            {months.map((month, index) => (
                <MenuItem key={index} value={month}>{month}</MenuItem>
            ))}
        </Select>
    </FormControl>
    <TextField 
        label="date" 
        variant="outlined" 
        type='date'
        name="date" 
        value={formData.date} 
        onChange={handleChange} 
        fullWidth 
    />
    <TextField 
        label="Fees Pay" 
        variant="outlined" 
        name="payfees" 
        value={formData.payfees} 
        onChange={handleChange} 
        fullWidth 
    />
    <Button variant="contained" color="primary" type="submit" >Submit</Button>
</Box>
</>
  )
}

export default Feespay;





