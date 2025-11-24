import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Countries } from "../../../../utils/Countries";
import { MaterialInputStyle } from "../../../../utils/MaterialInputStyle";
import Button from "../Button";
import { H2 } from "../Typography2";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  country: string | null;
  message: string;
  businessCategory: string;
};

type MSDSFormProps = {
  setshowMSDSPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  document?: string;
  onPageForm?: boolean;
};

export default function MSDSForm({
  setshowMSDSPopup,
  document,
  onPageForm = false,
}: MSDSFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "+91",
      country: "",
      message: "",
    },
  });

  const businessCategories = [
    "Chemical",
    "Sustainability",
    "Investor Relations",
    "Purchase",
    "New/Strategic Business Development",
    "Corporate communications",
  ];

  const onSubmit = async (data: FormValues) => {
    const formattedData = {
      full_name: data.fullName,
      email: data.email,
      mobile: data.phone,
      country: data.country,
      message: data.message,
    };

    try {
      const response = await fetch("/api/submitPopupData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "/msds-form/submit",
          data: formattedData,
        }),
      });

      if (response.ok) {
        // const result = await response.json();
        // console.log("Success:", result);
        setshowMSDSPopup?.(false);
        reset();
        if (document) {
          const link = window.document.createElement("a");
          link.href = document;
          link.download = "document.pdf";
          link.target = "_blank";
          window.document.body.appendChild(link);
          link.click();
          window.document.body.removeChild(link);
        }
      } else {
        const error = await response.json();
        setshowMSDSPopup?.(false);
        console.error("Error:", error);
      }
    } catch (error) {
      setshowMSDSPopup?.(false);
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="w-full">
      {!onPageForm ? (
        <div>
          <p className="text-xl text-[#002F50]">Recipient Information</p>
          <div className="w-full h-[1px] bg-[#F3663399] mt-2" />
        </div>
      ) : (
        <div>
          <H2>Write to Us</H2>
        </div>
      )}
      <form className="w-full popup" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`flex flex-col gap-4 ${
            !onPageForm ? "max-h-[72vh]" : "h-auto"
          } overflow-y-auto pt-5 lg:pt-6 popup_container lg:pr-4`}
        >
          <div className="grid lg:flex gap-[14px]">
            {/* Full Name */}
            <TextField
              label="Full Name *"
              variant="outlined"
              className="w-full"
              sx={MaterialInputStyle(!!errors.fullName)}
              {...register("fullName", { required: "Full Name is required" })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            {/* Email */}
            <TextField
              label="Email ID *"
              variant="outlined"
              className="w-full"
              sx={MaterialInputStyle(!!errors.email)}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>
          <div className="grid lg:flex gap-[14px]">
            {/* Phone Number */}
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 12,
                  message: "Enter a valid phone number",
                },
              }}
              render={({ field }) => (
                <div className="w-full phone_input">
                  <PhoneInput
                    {...field}
                    country={"us"}
                    inputStyle={{
                      width: "100%",
                      padding: "30px 20px 30px 80px",
                      borderRadius: "10px",
                      border: errors.phone
                        ? "1px solid red"
                        : "2px solid #e8e6e6",
                      outline: "none",
                    }}
                    dropdownClass="w-full"
                    containerStyle={{ width: "100%" }}
                    enableSearch
                    searchPlaceholder="Search Country"
                    disableSearchIcon
                    buttonClass={`w-[60px] border-2 ${
                      errors.phone && "!border-[#d32f2f]"
                    }`}
                    placeholder="Phone no *"
                    onChange={(value) => field.onChange(value)}
                  />
                  {errors.phone && (
                    <p className="text-[#d32f2f] text-[13px] mt-1 pl-4">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              )}
            />
            {/* Country (no validation) */}
            <FormControl fullWidth sx={MaterialInputStyle(false)}>
              <InputLabel id="country">Country</InputLabel>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ""}
                    labelId="country"
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {Countries.map((country) => (
                      <MenuItem key={country.code} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>

          {onPageForm && (
            <FormControl fullWidth sx={MaterialInputStyle(false)}>
              <InputLabel id="businessCategory">Business Category</InputLabel>
              <Controller
                name="businessCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ""}
                    labelId="businessCategory"
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {businessCategories.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          )}

          {/* Message */}
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            cols={40}
            placeholder="Write your message here"
            className="border-[#e8e6e6] border-2 p-4 rounded-[10px] outline-none resize-none flex-shrink-0"
          ></textarea>
        </div>
        <Button title={"Submit"} className="mt-6" />
      </form>
    </div>
  );
}
