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
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';

const StudentFees = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
     
  

  const { userDetails, response, loading, error } = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [subjectMarks, setSubjectMarks] = useState('');
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [fees, setFees] = useState([]);
  const [payfees, setPayfees] = useState([]);
  
    const studentID = params.id
    const address = "Student"

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID])


    useEffect(() => {
      if (userDetails) {
          setName(userDetails.name         || '');
          setFatherName(userDetails.fatherName || '');
          setRollNum(userDetails.rollNum || '');
          setSclassName(userDetails.sclassName || '');
          setStudentSchool(userDetails.school || '');
          setSubjectMarks(userDetails.examResult || '');
          setSubjectAttendance(userDetails.attendance || []);
          setFees(userDetails.fees || []);
          setPayfees(userDetails.fees.payfees)
      }
  }, [userDetails]);

  
    

    // useEffect(() => {
    //     if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
    //         dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    //     }
    // }, [dispatch, userDetails]);
   
     
      
      
  return (
    <>

     {/* <ul>
      <li>Student Name :  {name} </li>
      <li>Father's Name : {fatherName} </li>
      <li>Rool Number :  {rollNum} </li>
     </ul> */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name : {name}</TableCell>
            <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Father's Name : {fatherName}</TableCell>
            </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Fees</TableCell>
            <TableCell align="right">Date</TableCell>
            </TableRow>
        </TableHead>-
        <TableBody>
          {fees.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.month}
              </TableCell>
              <TableCell align="right">{row.payfees}Rs</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
{/* 
    <ul>
      <li>Amount   fees     date</li>
    </ul>
    
    {
      fees.map((fee)=> (
   <ol>
    <li>{fee.payfees}: {fee.month} : {fee.date}</li>
    
   </ol>
      ))
    } */}
  
   

   </>
  )
}

export default StudentFees;
