import { useState } from 'react';

export default function useForm(initial = {}) {
  //Create a state object for our inputs
  const [inputs, setIntputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type == 'number') {
      value = parseInt(value);
    }
    if (type == 'file') {
      //the first item in the array
      [value] = e.target.files;
    }
    setIntputs({
      //copy the existing state
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  function resetForm() {
    setIntputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setIntputs(blankState);
  }
  //return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
