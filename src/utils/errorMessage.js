exports.getErrorMessage = (error) => {
    console.log(error);
    const errorsArr = Object.keys(error.errors);

    if(errorsArr.length > 0){
        return error.errors[errorsArr[0]];
    }else{
        return error.message;
    }
}