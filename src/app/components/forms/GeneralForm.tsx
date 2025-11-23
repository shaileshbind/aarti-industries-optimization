"use client";
import React, { useEffect, useState } from "react";
import { MaterialInputStyle } from "../../../../utils/MaterialInputStyle";
import PhoneInput from "react-phone-input-2";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "react-phone-input-2/lib/style.css";
import { Countries } from "../../../../utils/Countries";
import Button from "../Button";
import clsx from "clsx";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  jobRole: string;
  country: string | null;
  message: string;
  hearAboutAil: string;
  category: string;
  subCategory: string;
  productName: string;
};

type CategorySubcategoryItem = {
  category: string;
  subCategories: string[];
};

type GeneralFormProps = {
  setshowGeneralPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  document?: string;
  prefillCategory?: string;
  prefillSubCategory?: string;
  prefillProduct?: string;
};

type productsDataType = {
  id?: number;
  productName?: string;
  slug?: string;
};

type formSubCategories = {
  id?: number;
  name?: string;
};
type productsDataCatSubcatType = {
  id?: number;
  form_sub_categories?: formSubCategories[];
  name?: string;
};

export default function GeneralForm({
  setshowGeneralPopup,
  document,
  prefillCategory,
  prefillSubCategory,
  prefillProduct,
}: GeneralFormProps) {
  const [categorySubcategoryData, setCategorySubcategoryData] = useState<
    CategorySubcategoryItem[]
  >([]);
  const [productsData, setProductsData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "+91",
      jobRole: "",
      country: "",
      message: "",
      hearAboutAil: "",
      category: "",
      subCategory: "",
      productName: "",
    },
  });

  // 🔹 Call API and transform data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/formCategoriesData");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();

        const resProducts = await fetch("/api/formProductsData");
        if (!resProducts.ok) throw new Error("Failed to fetch products");
        const dataProducts = await resProducts.json();

        const transformedProducts = dataProducts?.data?.map(
          (item: productsDataType) => item?.productName
        );
        setProductsData(transformedProducts);
        const transformedData: CategorySubcategoryItem[] =
          data?.data?.map((item: productsDataCatSubcatType) => ({
            category: item?.name,
            subCategories:
              item?.form_sub_categories?.map((sub: formSubCategories) => sub?.name) || [],
          })) || [];

        setCategorySubcategoryData(transformedData);

        // Prefill values if they exist in API data
        if (prefillCategory) {
          const categoryExists = transformedData.some(
            (item) => item.category === prefillCategory
          );
          if (categoryExists) setValue("category", prefillCategory);
        }
        if (prefillSubCategory && prefillCategory) {
          const subCategoryExists = transformedData
            .find((item) => item.category === prefillCategory)
            ?.subCategories.includes(prefillSubCategory);
          if (subCategoryExists) setValue("subCategory", prefillSubCategory);
        }

        if (prefillProduct && transformedProducts.includes(prefillProduct)) {
          setValue("productName", prefillProduct);
        }
      } catch (err) {
        console.error("Error fetching form categories:", err);
      }
    };

    fetchCategories();
  }, [prefillCategory, prefillSubCategory, prefillProduct, setValue]);

  // 🔹 Watch the category field
  const selectedCategory = watch("category");
  const selectedSubcategory = watch("subCategory");

  // 🔹 Get subcategories based on selected category
  const availableSubcategories =
    categorySubcategoryData?.find((item) => item.category === selectedCategory)
      ?.subCategories || [];

  // 🔹 Auto-select subcategory if only one exists, reset if multiple or none
  useEffect(() => {
    if (availableSubcategories.length === 1) {
      setValue("subCategory", availableSubcategories[0]);
    } else {
      setValue("subCategory", "");
    }
   }, [selectedCategory, setValue]);

  const onSubmit = async (data: FormValues) => {
    // Determine if Salesforce lead applies
    const hasSalesforceLead =
      data.subCategory === "Chemicals Products" &&
      data.productName !== "" &&
      data.productName !== null &&
      data.productName !== undefined;
    // Clear productName if hasSalesforceLead is false
    const cleanedData = {
      ...data,
      productName: hasSalesforceLead ? data.productName : "",
    };

    const formattedData = {
      full_name: cleanedData.fullName,
      email: cleanedData.email,
      mobile: cleanedData.phone,
      job_role: cleanedData.jobRole,
      country: cleanedData.country,
      message: cleanedData.message,
      enquiry_source: cleanedData.hearAboutAil,
      category: cleanedData.category,
      sub_category: cleanedData.subCategory,
      product_name: cleanedData.productName,
      hasSalesforceLead,
    };

    try {
      const response = await fetch("/api/submitPopupData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "/msds-form/submit", data: formattedData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setshowGeneralPopup?.(false);
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
        setshowGeneralPopup?.(false);
        console.error("Error:", error);
      }
    } catch (error) {
      setshowGeneralPopup?.(false);
      console.error("Request failed:", error);
    }
  };
  return (
    <div className="w-full">
      <div>
        <p className="text-xl text-[#002F50]">Recipient Information</p>
        <div className="w-full h-[1px] bg-[#F3663399] mt-2" />
      </div>

      <form className="w-full popup" onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-4 max-h-[68vh] overflow-y-scroll pt-7 pr-4 popup_container">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Role */}
            <TextField
              label="Job Role"
              variant="outlined"
              className="w-full"
              sx={MaterialInputStyle(!!errors.jobRole)}
              {...register("jobRole")}
              error={!!errors.jobRole}
              helperText={errors.jobRole?.message}
            />

            {/* Country */}
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

          {/* Message */}
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            cols={40}
            placeholder="Write your message here"
            className="border-[#e8e6e6] border-2 p-4 rounded-[10px] outline-none resize-none flex-shrink-0"
          ></textarea>

          <FormControl fullWidth sx={MaterialInputStyle(false)}>
            <InputLabel id="hearAboutAil">
              How did you hear about AIL?
            </InputLabel>
            <Controller
              name="hearAboutAil"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || ""}
                  labelId="hearAboutAil"
                  IconComponent={KeyboardArrowDownIcon}
                >
                  {[
                    "Articles",
                    "Events",
                    "Search Engine",
                    "Weblinks",
                    "LinkedIn",
                    "Recommendation",
                    "Advertisement",
                    "Industry Reports",
                    "Employees",
                    "Other",
                  ].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <FormControl fullWidth sx={MaterialInputStyle(false)}>
              <InputLabel id="category">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ""}
                    labelId="category"
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {categorySubcategoryData?.map((item, index) => (
                      <MenuItem key={index} value={item?.category}>
                        {item?.category}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {/* Subcategory */}
            <FormControl
              fullWidth
              sx={MaterialInputStyle(false)}
              className={clsx(
                availableSubcategories?.length > 0
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-60 pointer-events-none"
              )}
            >
              <InputLabel id="subCategory">Sub category</InputLabel>
              <Controller
                name="subCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ""}
                    labelId="subCategory"
                    IconComponent={KeyboardArrowDownIcon}
                    disabled={
                      availableSubcategories.length !== 1 &&
                      availableSubcategories.length === 0
                    }
                  >
                    {availableSubcategories?.length > 0 &&
                      availableSubcategories?.map((subCat, index) => (
                        <MenuItem key={index} value={subCat}>
                          {subCat}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>

          {/* Products */}
          {selectedSubcategory === "Chemicals Products" && (
            <FormControl fullWidth sx={MaterialInputStyle(false)}>
              <InputLabel id="productName">Product Name</InputLabel>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ""}
                    labelId="productName"
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {productsData?.map((product, index) => (
                      <MenuItem key={index} value={product}>
                        {product}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          )}
        </div>

        <Button title={"Submit"} className="mt-6" />
      </form>
    </div>
  );
}