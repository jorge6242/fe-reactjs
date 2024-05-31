import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export interface IThemeForm {
  id: string;
  name: string;
}

interface ThemeFormProps {
  defaultValues: IThemeForm;
  onSubmit: SubmitHandler<IThemeForm>;
}

const ThemeForm: React.FC<ThemeFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IThemeForm>({
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues); 
  }, [reset, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name", { required: "Name is required" })}
        label="Alias"
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

export default ThemeForm;
