export const UserData = (reqBody) => {
    if(reqBody.email && 
        reqBody.firstName && // Checking for data validation
        reqBody.lastName && 
        reqBody.mobile && 
        reqBody.password){
            return true;
    }else{
         return false;
    }
}