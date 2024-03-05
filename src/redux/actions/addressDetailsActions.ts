export const setAddressDetails = (details: {
    address: string;
    state: string;
    city: string;
    country: string;
    pincode: string;
}) => {
    return{
        type: 'addressDetails/set',
        payload: details
    }
}
