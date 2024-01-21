import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function CourseBuilder() {

  // Destructuring properties from the useForm hook
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      // Setting default values for form fields
      firstName: 'John',
      lastName: 'Doe',
      email: '',
    },
  });

  // useEffect to demonstrate setting default values after form initialization
  useEffect(() => {
    setValue('email', 'john.doe@example.com');
  }, [setValue]);

  // Form submission logic
  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input fields with registration */}
      <label>
        First Name:
        <input {...register('firstName', { required: 'First name is required' })} />
      </label>
      {/* Display error message if there's an error */}
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label>
        Last Name:
        <input {...register('lastName', { required: 'Last name is required' })} />
      </label>
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label>
        Email:
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
        />
      </label>
      {errors.email && <p>{errors.email.message}</p>}

      {/* Displaying form state information */}
      <p>Form State:</p>
      <ul>
        <li>Is Dirty: {isDirty ? 'Yes' : 'No'}</li>
        <li>Is Valid: {isValid ? 'Yes' : 'No'}</li>
        <li>Is Submitting: {isSubmitting ? 'Yes' : 'No'}</li>
      </ul>

      {/* Buttons to trigger setValue and getValues */}
      <button type="button" onClick={() => setValue('firstName', 'New John')}>
        Set First Name
      </button>
      <button type="button" onClick={() => console.log('Current form values:', getValues())}>
        Log Form Values
      </button>

      {/* Submit button */}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}

// e CourseBuilder;
