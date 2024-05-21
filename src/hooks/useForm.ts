import { useState, ChangeEvent } from "react";

export function useForm(initialForm: any = {}) {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  

  return {
    formState,
    onInputChange,
    onResetForm
  };
}