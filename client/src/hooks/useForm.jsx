import { useState } from "react";

export const useForm = (initalState = {}) => {
  const [formValues, setFromValues] = useState(initalState);

  const handleInputChange =({target})=>{
    setFromValues({
        ...formValues,
        [target.name] : target.value
    })
  }
  const reset =()=>{
    setFromValues(initalState)
  }
  return {
    formValues,
    setFromValues,
    handleInputChange,
    reset
  };
};
