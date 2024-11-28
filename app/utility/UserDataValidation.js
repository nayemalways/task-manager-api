import bcrypt from 'bcrypt';
let saltRounds  = 10;

// Checking for data validation
export const UserData = async (reqBody) => {
    const {email, firstName, lastName, mobile, password} = reqBody;
    if(email && firstName &&  lastName && mobile && password) { 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
       
        // Return User Data
        return {
            email,
            firstName,
            lastName,
            mobile,
            password: hashedPassword
        }
    }else{
         return false;
    }
}