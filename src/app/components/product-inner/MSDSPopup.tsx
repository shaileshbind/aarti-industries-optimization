"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Popup from "../Popup";
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

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  country: string | null;
  message: string;
};

type MSDSPopupProps = {
  setshowMSDSPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  document?: string;
};

export default function MSDSPopup({
  setshowMSDSPopup,
  isOpen,
  document,
}: MSDSPopupProps) {
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
      <Popup onOverlayClick={() => setshowMSDSPopup(false)} isOpen={isOpen}>
        <div className="w-full">
          <div>
            <p className="text-xl text-[#002F50]">Recipient Information</p>
            <div className="w-full h-[1px] bg-[#F3663399] mt-2" />
          </div>

          <form className="w-full popup" onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-4 h-[72vh] overflow-y-auto pt-7 popup_container pr-4">
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
      </Popup>
    </div>
  );
}
