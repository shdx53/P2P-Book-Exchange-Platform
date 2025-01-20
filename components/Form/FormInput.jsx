import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function FormInput({
  form,
  name,
  label,
  type = "text",
  placeholder,
  accept
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} accept={accept} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
