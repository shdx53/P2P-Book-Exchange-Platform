export function checkFileType(input, file) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();

    if (
      input === "image" &&
      (fileType === "png" || fileType === "jpg" || fileType === "jpeg")
    )
      return { valid: true };
    else
      return {
        valid: false,
        errorMessage:
          input === "image" &&
          "Only .png, .jpg, and .jpeg formats are supported",
      };
  } else {
    return { valid: false, errorMessage: "Required" };
  }
}
