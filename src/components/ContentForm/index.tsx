import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, MenuItem } from "@mui/material";
import { GetThemeRes } from '../../services/theme.sevice';
import { GetCategoryRes } from '../../services/category.service';
import { GetContentRes } from '../../services/content.service';

export interface IContentFormData {
    name: string;
    themeId: string;
    categoryId: string;
}

interface ContentFormProps {
  defaultValues: GetContentRes;
  themes: GetThemeRes[];
  categories: GetCategoryRes[];
  onSubmit: SubmitHandler<IContentFormData>;
}

const ContentForm: React.FC<ContentFormProps> = ({
  defaultValues,
  themes,
  categories,
  onSubmit,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IContentFormData>({
    defaultValues,
  });
  console.log('defaultValues ', defaultValues);
  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Theme"
        select
        {...register("themeId", { required: "Theme is required" })}
        fullWidth
        margin="normal"
        defaultValue={defaultValues?.themeId || ""}
      >
        {themes.map((theme) => (
          <MenuItem key={theme.id} value={theme.id}>
            {theme.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Category"
        select
        {...register("categoryId", { required: "Category is required" })}
        fullWidth
        margin="normal"
        defaultValue={defaultValues?.categoryId || ""}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" color="primary" variant="contained">
        Save
      </Button>
    </form>
  );
};

export default ContentForm;
