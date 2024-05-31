import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MenuItem } from "@mui/material";
import { GetRolesRes } from "../../services/role.service";

export interface IUserForm {
  id: string;
  alias: string;
  email: string;
  role: string;
  roles: string[];
}

interface UserFormProps {
  defaultValues: IUserForm;
  onSubmit: SubmitHandler<IUserForm>;
  roles: GetRolesRes[];
}

const UserForm: React.FC<UserFormProps> = ({
  defaultValues,
  onSubmit,
  roles,
}) => {
  console.log("defaultValues ", defaultValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserForm>({
    defaultValues: {
        ...defaultValues,
        role: defaultValues.roles.length ? defaultValues.roles[0] : ""
    }
  });

  useEffect(() => {
    reset(defaultValues); 
  }, [reset, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("alias", { required: "Alias is required" })}
        label="Alias"
        error={!!errors.alias}
        helperText={errors.alias?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("email", { required: "Email is required" })}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("role")}
        label="Rol"
        select
        fullWidth
        margin="normal"
        defaultValue={defaultValues?.roles.length ? defaultValues.roles[0] : ""}
      >
        <MenuItem value="">Select a type</MenuItem>
        {roles.map((e: GetRolesRes) => (
          <MenuItem value={e.id}>{e.name}</MenuItem>
        ))}
      </TextField>
      <Button type="submit" color="primary" variant="contained">
        Save
      </Button>
    </form>
  );
};

export default UserForm;
