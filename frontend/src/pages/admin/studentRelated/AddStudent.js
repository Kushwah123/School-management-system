// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../../../redux/userRelated/userHandle';
// import Popup from '../../../components/Popup';
// import { underControl } from '../../../redux/userRelated/userSlice';
// import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
// import { CircularProgress } from '@mui/material';

// const AddStudent = ({ situation }) => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const params = useParams()
   
//     const userState = useSelector(state => state.user);
//     const { status, currentUser, response, error } = userState;
//     const { sclassesList } = useSelector((state) => state.sclass);
//         console.log(sclassesList)
//     const [name, setName] = useState('');
//     const [rollNum, setRollNum] = useState('');
//     const [password, setPassword] = useState('')
//     const [className, setClassName] = useState('')
//     const [sclassName, setSclassName] = useState('')

//     const adminID = currentUser._id
//     const role = "Student"
//     const attendance = []

//     useEffect(() => {
//         if (situation === "Class") {
//             setSclassName(params.id);
//         }
//     }, [params.id, situation]);

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loader, setLoader] = useState(false)

//     useEffect(() => {
//         dispatch(getAllSclasses(adminID, "Sclass"));
//     }, [adminID, dispatch]);

//     const changeHandler = (event) => {
//         if (event.target.value === 'Select Class') {
//             setClassName('Select Class');
//             setSclassName('');
//         } else {
//             const selectedClass = sclassesList.find(
//                 (classItem) => classItem.sclassName === event.target.value
//             );
//             setClassName(selectedClass.sclassName);
//             setSclassName(selectedClass._id);
//         }
//     }

//     const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

//     const submitHandler = (event) => {
//         event.preventDefault()
//         if (sclassName === "") {
//             setMessage("Please select a classname")
//             setShowPopup(true)
//         }
//         else {
//             setLoader(true)
//             dispatch(registerUser(fields, role))
//         }
//     }

//     useEffect(() => {
//         if (status === 'added') {
//             dispatch(underControl())
//             navigate(-1)
//         }
//         else if (status === 'failed') {
//             setMessage(response)
//             setShowPopup(true)
//             setLoader(false)
//         }
//         else if (status === 'error') {
//             setMessage("Network Error")
//             setShowPopup(true)
//             setLoader(false)
//         }
//     }, [status, navigate, error, response, dispatch]);

//     return (
//         <>
//             <div className="register">
//                 <form className="registerForm" onSubmit={submitHandler}>
//                     <span className="registerTitle">Add Student</span>
//                     <label>Name</label>
//                     <input className="registerInput" type="text" placeholder="Enter student's name..."
//                         value={name}
//                         onChange={(event) => setName(event.target.value)}
//                         autoComplete="name" required />

//                     {
//                         situation === "Student" &&
//                         <>
//                             <label>Class</label>
//                             <select
//                                 className="registerInput"
//                                 value={className}
//                                 onChange={changeHandler} required>
//                                 <option value='Select Class'>Select Class</option>
//                                 {sclassesList.map((classItem, index) => (
//                                     <option key={index} value={classItem.sclassName}>
//                                         {classItem.sclassName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </>
//                     }

//                     <label>Roll Number</label>
//                     <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
//                         value={rollNum}
//                         onChange={(event) => setRollNum(event.target.value)}
//                         required />

//                     <label>Password</label>
//                     <input className="registerInput" type="password" placeholder="Enter student's password..."
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         autoComplete="new-password" required />

//                     <button className="registerButton" type="submit" disabled={loader}>
//                         {loader ? (
//                             <CircularProgress size={24} color="inherit" />
//                         ) : (
//                             'Add'
//                         )}
//                     </button>
//                 </form>
//             </div>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     )
// }

// export default AddStudent



import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';



const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector((state) => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [formData, setFormData] = useState({
        name: '',
        rollNum: '',
        fatherName: '',
        motherName: '',
        adhaarNumber: '',
        dob: '',
        className: '',
        sclassName: '',
        address: '',
        mobileNumber: '',
        pastSchoolName: '',
        // photo: null,
        password: '',
        totalfees: '',
    });
       console.log(formData)

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setFormData((prevState) => ({
                ...prevState,
                sclassName: params.id,
            }));
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setFormData((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleClassChange = (event) => {
        const selectedClass = event.target.value === 'Select Class'
            ? { sclassName: '', className: 'Select Class' }
            : sclassesList.find((classItem) => classItem.sclassName === event.target.value);

        setFormData((prevState) => ({
            ...prevState,
            className: selectedClass.sclassName,
            sclassName: selectedClass._id,
        }));
    };

    const fields = {
        ...formData,
        adminID,
        role,
        attendance,
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
          <div className="register">
    <form className="registerForm" onSubmit={handleSubmit}>
        <Typography variant="h4" className="registerTitle">Student Admission</Typography>
        
        <TextField
            label="Roll Number"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            name="rollNum"
            value={formData.rollNum}
            onChange={handleChange}
            required
        />

        <TextField
            label=" Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formData.nameame}
            onChange={handleChange}
            required
        />

        <TextField
            label="Father's Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
        />

        <TextField
            label="Mother's Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            required
        />

        <TextField
            label="Adhaar Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="adhaarNumber"
            value={formData.adhaarNumber}
            onChange={handleChange}
            required
        />

        <TextField
            label="Date of Birth"
            variant="outlined"
            fullWidth
            margin="normal"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
            required
        />

        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Class</InputLabel>
            <Select
                name="className"
                value={formData.className}
                onChange={handleClassChange}
                label="Class"
                required
            >
                <MenuItem value="Select Class">Select Class</MenuItem>
                {sclassesList.map((classItem, index) => (
                    <MenuItem key={index} value={classItem.sclassName}>
                        {classItem.sclassName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
        />

        <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
        />

        <TextField
            label="Past School Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="pastSchoolName"
            value={formData.pastSchoolName}
            onChange={handleChange}
            required
        />

        {/* <Button
            variant="outlined"
            component="label"
            fullWidth
            margin="normal"
        >
            Upload Photo
            <input
                type="file"
                hidden
                name="photo"
                onChange={handleChange}
                required
            />
        </Button> */}

        <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
        />
         <TextField
            label="totalfees"
            variant="outlined"
            fullWidth
            margin="normal"
            name="totalfees"
            type="totalfees"
            value={formData.totalfees}
            onChange={handleChange}
            required
        />

        <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loader}
            className="registerButton"
        >
            {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
        </Button>
    </form>
</div>
<Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

        </>
    )
}

export default AddStudent;

