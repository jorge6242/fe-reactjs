import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export interface ICategoryForm {
  id: string;
  name: string;
}

interface CategoryFormProps {
  defaultValues: ICategoryForm;
  onSubmit: SubmitHandler<ICategoryForm>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategoryForm>({
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues); 
  }, [reset, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name", { required: "Name is required" })}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
      />
      <Button type="submit" color="primary" variant="contained">
        Save
      </Button>
    </form>
  );
};

export default CategoryForm;
