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

	// Validate e-mail
export	const useValidateEmail = (values, setInputs, inputs) => {
    let isError = false;
    const errors = {};
    if (!/.+@.+..+/.test(values.email)) {
        isError = true;
        errors.emailError = "Not a correct e-mail";
    }
    if (isError) {
        setInputs({
            ...inputs,
            ...errors
        });
    }
    if (/.+@.+..+/.test(values.email)) {
        errors.emailError = "";
        setInputs({
            ...inputs,
            ...errors
        });
    }
};
	//Validate password to make sure it has 1 letter 1 name and minimum 8 characters
export const useValidatePassword = (values, setInputs, inputs) => {
	let isError = false;
	const errors = {};
	if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
		isError = true;
		errors.passwordError =
			"Needs 1 letter and 1 number, minimum 8 characters";
	}
	if (isError) {
		setInputs({
			...inputs,
			...errors
		});
	}
	if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
		errors.passwordError = "";
		setInputs({
			...inputs,
			...errors
		});
	}
};