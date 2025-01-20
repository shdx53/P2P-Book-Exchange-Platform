import { z } from "zod";
import { checkFileType } from "../lib/utils";

const stringSchema = z
  .string()
  .min(1, "Required")
  .transform((value) => value?.trim());

const FileSchema = (type) =>
  z.any().superRefine((file, ctx) => {
    const result = checkFileType(type, file);
    if (!result.valid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.errorMessage,
      });
    }
  });

export const NewListingSchema = z.object({
  title: stringSchema,
  author: stringSchema,
  genre: stringSchema,
  image: FileSchema("image"),
  description: stringSchema,
});
