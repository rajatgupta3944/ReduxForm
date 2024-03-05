export const setPersonalDetails = (details: {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    idType: string;
    idNumber: string;
}) => {
    return{
        type: 'personalDetails/set',
        payload: details
    }
}
