export const useValidateLogin = (response, inputs, setInputs) => {
    let isError = false;
    const errors = {};
    if (!response) {
        errors[`usernameError`] = "Username or Password is invalid";
        errors[`passwordError`] = "Username or Password is invalid";
        setInputs({
            ...inputs,
            ...errors
        });
    }
    return isError;
};

export const useValidateLength = (event, setInputs, inputs) => {
    const { name, value } = event.target;
    let isError = false;
    const errors = {};
    if (value.length < 1) {
        isError = true;
        errors[`${name}Error`] = `${name} cannot be empty`;
    }
    if (isError) {
        setInputs({
            ...inputs,
            ...errors
        });
    }
    if (value.length >= 1) {
        errors[`${name}Error`] = "";
        setInputs({
            ...inputs,
            ...errors
        });
    }
    return isError;
};