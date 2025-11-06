export const MaterialInputStyle = (hasError: boolean = false) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    border: !hasError ? "2px solid #e8e6e6" : "1px solid #e8e6e6",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
    borderColor: hasError ? "red" : "#e8e6e6",
  },
  "& .MuiInputLabel-root": { backgroundColor: "#fff", padding: "0 4px" },
  "& .MuiInputLabel-shrink": { color: "#4C5861" },
  "& .MuiInputLabel-asterisk": { color: "#DC4C03" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#DC4C03" },
});
