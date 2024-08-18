import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { useNavigate, useParams } from 'react-router-dom';

const Fees = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
     
  

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);
    const { studentsList, loading, } = useSelector((state) => state.student);
        // console.log(sclassesList)
    const adminID = currentUser._id

          // const fees = studentsList.map((fee)=> fee.fees.map((f)=> console.log(f.month, f.payfees, f.date)))
    // {
    //      studentsList.map((student)=>
          
    //       console.log("class-"+student.sclassName.sclassName, "name-"+student.name, "roll no-"+student.
    //      rollNum                  )  
    //     )
    // }
         
         useEffect(() => {
          dispatch(getAllStudents(currentUser._id));
      }, [userState._id, dispatch]);
      //    useEffect(() => {
      //     dispatch(getAllSclasses(adminID, "Sclass"));
      // }, [adminID, dispatch]);
  return (
//     <>
//     <div className="register">
//         <form className="registerForm"
//         //  onSubmit={submitHandler}
//          >
//             <span className="registerTitle">Add Student</span>
//             <label>Name</label>
//             <input className="registerInput" type="text" placeholder="Enter student's name..."
//                 // value={name}
//                 // onChange={(event) => setName(event.target.value)}
//                 autoComplete="name" required />


//             <label>Roll Number</label>
//             <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
//                 // value={rollNum}
//                 // onChange={(event) => setRollNum(event.target.value)}
//                 required />

           

//             <button className="registerButton" type="submit" disabled="">
              
//             </button>
//         </form>
//     </div>
   
// </>

<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>SN</TableCell>
      <TableCell align="right">Name</TableCell>
      <TableCell align="right">Class</TableCell>
      <TableCell align="right">Father's Name</TableCell>
     
    </TableRow>
  </TableHead>
  <TableBody>
    {studentsList.map((student, index) => (
      <TableRow
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {index+1}
        </TableCell>
        <TableCell align="right">{student.name}</TableCell>
        <TableCell align="right">{student.sclassName.sclassName}</TableCell>
        <TableCell align="right">Mr.{student.fatherName}</TableCell>
        {/* {
          student.fees.map((fee)=>{
            return (
              <>
              <TableCell align="right">{fee.payfees}</TableCell>
              <TableCell align="right">{fee.month}</TableCell>
              <TableCell align="right">{fee.date}</TableCell>
              </>
            )
          })
        } */}
    
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/studentfees/" + student._id)}
        >
          View
        </BlueButton>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/feespay/" + student._id)}
        >
          Pay
        </BlueButton>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
  )
}

export default Fees
