import { useState } from "react";

export default function useForm(initial = {}) {
	const [inputs, setInputs] = useState(initial);
	
	const handleChange = async (e) =>{
		let { value, name, type } = e.target;

		if (type === "number") {
			value = parseInt(value);
		}

		if (type === "file") {
			value = e.target.files[0];
			previewFile(value, name)
			return
		}

		setInputs({
			...inputs,
			[name]: value
		});
	}

	const resetForms= () =>{
		setInputs(initial);
	}

	const clearForm = () =>{
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, value]) => [key, ""])
		);
		setInputs(blankState);
	}

	const previewFile = (file, name) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setInputs({
				...inputs,
				[name]: reader.result
			});
		};
	};

	return {
		previewFile,
		inputs,
		setInputs,
		handleChange,
		resetForms,
		clearForm,
	};
}
