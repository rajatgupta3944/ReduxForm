import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressDetails } from '../redux/actions/addressDetailsActions';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import FormValuesAddress from '../FormValuesAddress';
import { RootState2 } from '../redux/store';
import {
  Button,
  TextField,
  // Select,
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

const theme = createTheme();

const countrySchema = yup.string().required('Country is required');

const pincodeSchema = yup.string().matches(/^[0-9]+$/, 'Pincode should be numeric').optional();

export const schema = {
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: countrySchema,
  pincode: pincodeSchema,
};

const AddressDetails = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState2) => state.addressDetails?.data);
  console.log(address, 'addresssss');
  console.log('Redux State:', useSelector((state: RootState2) => state));
  const [countryOptions, setCountryOptions] = useState([]);
  const form = useForm<FormValuesAddress>({
    defaultValues: {
      address: '',
      state: '',
      city: '',
      country: '',
      pincode: '',
    },
    resolver: yupResolver(yup.object(schema)) as any,
  });

  const { register, control, handleSubmit, setValue, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    const fetchCountryOptions = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const options = data.map((country: any) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountryOptions(options);
      } catch (error) {
        console.error('Error fetching country options:', error);
      }
    };

    fetchCountryOptions();
  }, []);

  const handleCountryChange = (selectedOption: any) => {
    setValue('country', selectedOption?.value || '');
  };

  const onSubmit = (data: FormValuesAddress) => {
    dispatch(setAddressDetails(data));
    console.log('Form Submitted', data);
    console.log(setAddressDetails(data), 'setAddress');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Address Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            
              <InputLabel htmlFor="address">Address</InputLabel>
              <TextField id="address" {...register('address')} error={!!errors.address} helperText={errors.address?.message} />
              <p className="error">{errors.address?.message}</p>
            
              <InputLabel htmlFor="state">State</InputLabel>
              <TextField id="state" {...register('state')} error={!!errors.state} helperText={errors.state?.message} />
              <p className="error">{errors.state?.message}</p>

              <InputLabel htmlFor="city">City</InputLabel>
              <TextField id="city" {...register('city')} error={!!errors.city} helperText={errors.city?.message} />
              <p className="error">{errors.city?.message}</p>

              <InputLabel htmlFor="country">Country</InputLabel>
              <div style={{width:'86%',marginLeft:"36px"}}>
              <Select id="country" {...register('country')} options={countryOptions} onChange={handleCountryChange}></Select>
              </div>
              <p className="error">{errors.country?.message}</p>

      
              <InputLabel htmlFor="pincode">Pincode</InputLabel>
              <TextField id="pincode" {...register('pincode')} error={!!errors.pincode} helperText={errors.pincode?.message} />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
          <DevTool control={control} />
        </Paper>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>State</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Pincode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{address?.address}</TableCell>
                <TableCell>{address?.state}</TableCell>
                <TableCell>{address?.city}</TableCell>
                <TableCell>{address?.country}</TableCell>
                <TableCell>{address?.pincode}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default AddressDetails;
