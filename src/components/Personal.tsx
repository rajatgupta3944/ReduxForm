import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalDetails } from '../redux/actions/personalDetailsActions';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormValues from '../FormValues';
import { RootState } from '../redux/store';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressDetails from './Address';

const theme = createTheme();

const nameSchema = yup.string().required('Name is required').min(3, 'Name should be at least 3 characters');
const ageSchema = yup.number().required('Age is required').positive('Age should be a positive number').integer('Age should be an integer');
const sexSchema = yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex');
const mobileSchema = yup.string().matches(/^[6789]\d{9}$/, 'Invalid mobile number');
const aadharSchema = yup.string().matches(/^[2-9]\d{11}$/, 'For Aadhar, it should have 12 numeric digits and should not start with 0 and 1');
const panSchema = yup.string().length(10, 'For PAN, it should be a ten-character long alpha-numeric string');

export const schema = {
  name: nameSchema,
  age: ageSchema,
  sex: sexSchema,
  mobile: mobileSchema,
  idType: yup.string().required('Govt Issued ID Type is required').oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
  idNumber: yup.lazy((value: string) => {
    if (value === 'Aadhar') {
      return aadharSchema;
    } else if (value === 'PAN') {
      return panSchema;
    }
    return yup.string();
  }),
};

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const person = useSelector((state: RootState) => state.personalDetails?.data);
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      age: 0,
      sex: '',
      mobile: '',
      idType: '',
      idNumber: '',
    },
    resolver: yupResolver(yup.object(schema)) as any,
  });

  const [flagOn, setFlagOn] = useState(false);
  const [flagSave, setFlagSave] = useState(false);
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const tableRef = useRef(null);

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted', data);
    dispatch(setPersonalDetails(data));
    console.log(setPersonalDetails(data), "setPersonal");
    setFlagSave(true);
  };

  useEffect(() => {
    console.log(person?.age, "test age");
  });

  return (
    <div>
      {!flagOn ? 
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Personal Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField id="name" {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
            
           
              <InputLabel htmlFor="age">Age</InputLabel>
              <TextField id="age" {...register('age')} type="number" error={!!errors.age} helperText={errors.age?.message} />
            
          
              <InputLabel htmlFor="sex">Sex</InputLabel>
              <Select id="sex" {...register('sex')} error={!!errors.sex} style={{width:"100%"}}>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            
            
              <InputLabel htmlFor="mobile">Mobile</InputLabel>
              <TextField id="mobile" {...register('mobile')} error={!!errors.mobile} helperText={errors.mobile?.message} />
         
            
              <InputLabel htmlFor="idType">Govt Issued ID Type</InputLabel>
              <Select id="idType" {...register('idType')} error={!!errors.idType} style={{width:"100%"}}>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Aadhar">Aadhar</MenuItem>
                <MenuItem value="PAN">PAN</MenuItem>
              </Select>
           
            
              <InputLabel htmlFor="idNumber">Govt Issued ID Number</InputLabel>
              <TextField id="idNumber" {...register('idNumber')} error={!!errors.idNumber} helperText={errors.idNumber?.message} />
            <div style={{display:"flex", justifyContent: "space-between", marginTop: "10px"}}>
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button onClick={()=>setFlagOn(true)} variant="contained">
              Next
            </Button>
            </div>
          </form>
        </Paper>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>ID Type</TableCell>
                <TableCell>ID Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{person?.name}</TableCell>
                <TableCell>{person?.age}</TableCell>
                <TableCell>{person?.sex}</TableCell>
                <TableCell>{person?.mobile}</TableCell>
                <TableCell>{person?.idType}</TableCell>
                <TableCell>{person?.idNumber}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DevTool control={control} />
      </Container>
    </ThemeProvider> :
    <AddressDetails />}
    </div>
  );
};

export default PersonalDetails;
