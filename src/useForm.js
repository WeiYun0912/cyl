import {useState} from "react";

export const useForm = (initVal) => {
    const [values,setValues] = useState(initVal);
    console.log("useForm: ",values);
    return [
        values,
        e => {
            setValues(
                {
                    ...values,
                    [e.target.name] : e.target.value
                }
            )
        }
    ]
}