"use client";
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
import { SubH2 } from "../Typography2";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  country: string | null;
  message: string;
};

export default function WriteToUs({document}: {document?: string}) {
  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data, document);
  };

  return (
    <div>
       
        <div className="w-full">
          <div>
            <SubH2>Write to Us</SubH2> 
            {/* <div className="w-full h-[1px] bg-[#F3663399] mt-2" /> */}
          </div>

          <form className="w-full popup" onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex flex-wrap gap-[4%] pt-7 popup_container pr-4">
              {/* Full Name */}
              <TextField
                label="Full Name *"
                variant="outlined"
                sx={MaterialInputStyle(!!errors.fullName)}
                {...register("fullName", { required: "Full Name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                className="w-[48%] min-h-[85px]"
              />

              {/* Email */}
              <TextField
                label="Email ID *"
                variant="outlined"
                className="w-[48%] mb-[10px]"
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

              {/* Phone Number */}
              <Controller
                name="phone"
                 
                control={control}
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Enter a valid phone number",
                  },
                }}
                render={({ field }) => (
                  <div className="w-[48%] min-h-[85px] phone_input">
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
              <FormControl className="w-[48%] min-h-[85px]" sx={MaterialInputStyle(false)}>
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
              <FormControl className="w-full min-h-[85px]" sx={MaterialInputStyle(false)}>
                <InputLabel id="country">Business Category</InputLabel>
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

              
              
              <textarea
                id="message"
                {...register("message")}
                rows={5}
                cols={40}
                placeholder="Write your message here"
                className="border-[#e8e6e6] border-2 p-4 w-full h-[110px] rounded-[10px] outline-none resize-none flex-shrink-0"
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-[14px] w-full md:w-[124px] rounded-[6px] text-[#FFFFFF] mt-6 cursor-pointer"
              style={{
                background:
                  "linear-gradient(201deg, #FA8129 -42.93%, #DC4C03 95.27%)",
              }}
            >
              Submit
            </button>
          </form>
        </div>
       
    </div>
  );
}
