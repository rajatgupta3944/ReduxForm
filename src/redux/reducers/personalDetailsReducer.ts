interface PersonalDetails {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    idType: string;
    idNumber: string;
  }
  
  interface PersonalDetailsState {
    data: PersonalDetails;
  }
  
  const initialState: PersonalDetailsState = {
    data: {
      name: '',
      age: 0,
      sex: '',
      mobile: '',
      idType: '',
      idNumber: '',
    },
  };
  
  // Define action type
  type PersonalDetailsAction = {
    type: 'personalDetails/set';
    payload: PersonalDetails;
  };
  
  export const personalDetailsReducer = (
    state: PersonalDetailsState = initialState,
    action: PersonalDetailsAction
  ): PersonalDetailsState => {
    switch (action.type) {
      case 'personalDetails/set':
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };


  interface AddressDetails {
    address: string;
    state: string;
    city: string;
    country: string;
    pincode: string;
  }
  
  interface AddressDetailsState {
    data: AddressDetails;
  }
  
  const initialState2: AddressDetailsState = {
    data: {
      address: '',
      state: '',
      city: '',
      country: '',
      pincode: '',
    },
  };
  
  // Define action type
  type AddressDetailsAction = {
    type: 'addressDetails/set';
    payload: AddressDetails;
  };
  
  export const addressDetailsReducer = (
    state: AddressDetailsState = initialState2,
    action: AddressDetailsAction
  ): AddressDetailsState => {
    switch (action.type) {
      case 'addressDetails/set':
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };

