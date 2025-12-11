"use client";
import React, { useEffect, useState, useMemo } from "react";
import { MaterialInputStyle } from "../../../../utils/MaterialInputStyle"; // Assuming path is correct
import PhoneInput from "react-phone-input-2";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Autocomplete,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "react-phone-input-2/lib/style.css";
import { Countries } from "../../../../utils/Countries";
import Button from "../Button";
import clsx from "clsx";
import clsxN from "../../../../utils/clsxN";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  jobRole: string;
  country: string | null;
  message: string;
  otherEnquiry: string;
  hearAboutAil: string;
  category: string;
  subCategory: string;
  productName: string;
  recievedEmail?:string;
};

type CategorySubcategoryItem = {
  category: string;
  subCategories: string[];
  subCatEmails: (string | undefined)[];
};

type GeneralFormProps = {
  setshowGeneralPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  document?: string;
  prefillCategory?: string;
  prefillSubCategory?: string;
  prefillProduct?: string;
  className?: string;
  showTitle?: boolean;
};

type productsDataType = {
  id?: number;
  productName?: string;
  slug?: string;
};

type formSubCategories = {
  id?: number;
  name?: string;
  reciverEmail?:string;
};
type productsDataCatSubcatType = {
  id?: number;
  form_sub_categories?: formSubCategories[];
  name?: string;
};

// --- Component Start ---
export default function GeneralForm({
  setshowGeneralPopup,
  document,
  prefillCategory,
  prefillSubCategory,
  prefillProduct,
  className,
  showTitle = true,
}: GeneralFormProps) {
  const [categorySubcategoryData, setCategorySubcategoryData] = useState<
    CategorySubcategoryItem[]
  >([]);
  const [productsData, setProductsData] = useState<string[]>([]);

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
      otherEnquiry: "",
      hearAboutAil: "",
      category: "",
      subCategory: "",
      productName: "",
      recievedEmail:"",
    },
  });

  // 🔹 Call API and transform data & Handle Prefilling
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // 1. FETCH DATA
        const res = await fetch("/api/formCategoriesData");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();

        const resProducts = await fetch("/api/formProductsData");
        if (!resProducts.ok) throw new Error("Failed to fetch products");
        const dataProducts = await resProducts.json();

        // 2. TRANSFORM & SET STATE
        const transformedProducts: string[] =
          dataProducts?.data?.map(
            (item: productsDataType) => item?.productName
          ) || [];
        setProductsData(transformedProducts);
        const transformedData: CategorySubcategoryItem[] =
          data?.data?.map((item: productsDataCatSubcatType) => ({
            category: item?.name,
            subCategories:
              item?.form_sub_categories?.map(
                (sub: formSubCategories) => sub?.name
              ) || [],
            subCatEmails:
              item?.form_sub_categories?.map(
                (item: formSubCategories) => item?.reciverEmail
              ) || [],       
          })) || [];
        setCategorySubcategoryData(transformedData);

        // 3. APPLY PREFILL USING reset()
        const updatedDefaults: Partial<FormValues> = {};
        if (prefillCategory) {
          const categoryExists = transformedData.some(
            (item) => item.category === prefillCategory
          );
          if (categoryExists) {
            updatedDefaults.category = prefillCategory;

            if (prefillSubCategory) {
              const subCategoryExists = transformedData
                .find((item) => item.category === prefillCategory)
                ?.subCategories.includes(prefillSubCategory);
              if (subCategoryExists) {
                updatedDefaults.subCategory = prefillSubCategory;
              }
            }
          }
        }
        if (prefillProduct && (transformedProducts.includes(prefillProduct) || prefillProduct === "Others")) {
          updatedDefaults.productName = prefillProduct;
        }
        // Use reset to apply the prefilled values reliably
        if (Object.keys(updatedDefaults).length > 0) {
          reset((prevDefaults) => ({
            ...prevDefaults,
            ...updatedDefaults,
          }));
        }
      } catch (err) {
        console.error("Error fetching form categories:", err);
      }
    };

    fetchCategories();
  }, [prefillCategory, prefillSubCategory, prefillProduct, reset]); // DEPENDENCY CHANGE: use 'reset' instead of 'setValue'

  // 🔹 Watch the category field for dynamic subcategory loading
  const selectedCategory = watch("category");
  const selectedSubcategory = watch("subCategory");

  // 🔹 Get subcategories based on selected category
  const availableSubcategories = useMemo(
    () =>
      categorySubcategoryData?.find(
        (item) => item.category === selectedCategory
      )?.subCategories || [],
    [categorySubcategoryData, selectedCategory]
  );

  // 🔹 Add "Others" as static last option to products list
  const productsWithOthers = useMemo(
    () => [...(productsData || []), "Others"],
    [productsData]
  );

  // 🔹 Update receiver email when subcategory changes
  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      const categoryData = categorySubcategoryData.find(
        (item) => item.category === selectedCategory
      );
      if (categoryData) {
        const subCategoryIndex =
          categoryData.subCategories.indexOf(selectedSubcategory);
        if (subCategoryIndex !== -1) {
          const receiverEmail = categoryData.subCatEmails[subCategoryIndex];
          setValue("recievedEmail", receiverEmail || "");
        }
      }
    }
  }, [selectedCategory, selectedSubcategory, categorySubcategoryData, setValue]);

  // 🔹 Auto-select subcategory if only one exists, reset if multiple or none
  useEffect(() => {
    // Only auto-select if a category is already chosen and there are subcategories
    if (selectedCategory && availableSubcategories.length === 1) {
      // Ensure we don't override an existing valid prefill, although reset() should handle most of this
      if (watch("subCategory") !== availableSubcategories[0]) {
        setValue("subCategory", availableSubcategories[0]);
      }
    } else if (availableSubcategories.length > 1) {
      // If category is selected and multiple subcategories exist, ensure subCategory is reset
      // if it's not one of the available ones (unless it was prefilled)
      if (!prefillSubCategory) {
        // Only clear if it wasn't a prop-based prefill
        setValue("subCategory", "");
      }
    }
  }, [
    selectedCategory,
    availableSubcategories,
    setValue,
    watch,
    prefillSubCategory,
  ]);

  const onSubmit = async (data: FormValues) => {
    // Determine if Salesforce lead applies
    const sendEmail = true
    const hasSalesforceLead =
      data.subCategory === "Chemicals Products" &&
      data.productName !== "" &&
      data.productName !== null &&
      data.productName !== undefined;
    // Clear productName if hasSalesforceLead is false
    const cleanedData = {
      ...data,
      productName: hasSalesforceLead ? data.productName : "",
      sendEmail: true,
    };

    const formattedData = {
      full_name: cleanedData.fullName,
      email: cleanedData.email,
      mobile: cleanedData.phone,
      job_role: cleanedData.jobRole,
      country: cleanedData.country,
      message: cleanedData.message,
      otherEnquiry: cleanedData.otherEnquiry,
      enquiry_source: cleanedData.hearAboutAil,
      category: cleanedData.category,
      sub_category: cleanedData.subCategory,
      product_name: cleanedData.productName,
      reciverEmail: cleanedData.recievedEmail,
      hasSalesforceLead,
      sendEmail,
    };

    try {
      const response = await fetch("/api/submitPopupData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: "/standard-form/submit",
          data: formattedData,
        }),
      });

      if (response.ok) {
      //  const result = await response.json();
      // console.log("Success:", result);
        setshowGeneralPopup?.(false);
        reset(); // Reset form fields to default after successful submission
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

  // --- Form JSX ---
  return (
    <div className="w-full">
      {showTitle && (
        <div>
          <p className="text-xl text-[#002F50]">Recipient Information</p>
          <div className="w-full h-[1px] bg-[#F3663399] mt-2" />
        </div>
      )}
      <form className="w-full popup" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={clsxN(
            `flex flex-col gap-4 max-h-[68vh] overflow-y-scroll pt-7 pr-4 popup_container`,
            className
          )}
        >
          {/* Full Name */}
          <TextField
            label="Full Name *"
            variant="outlined"
            className="w-full"
            sx={MaterialInputStyle(!!errors.fullName)}
            {...register("fullName", { required: "Full Name is required" })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            onKeyDown={(e) => {
              // Prevent numbers and special characters, allow only letters and space
              if (!/^[a-zA-Z\s]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
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
              {...register("jobRole", {
                required: "Job Role is required",
              })}
              error={!!errors.jobRole}
              helperText={errors.jobRole?.message}
              onKeyDown={(e) => {
                // Prevent numbers and special characters, allow only letters and space
                if (!/^[a-zA-Z\s]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
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
          <div className="flex flex-col">
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
              })}
              rows={5}
              cols={40}
              placeholder="Write your message here *"
              className={clsx(
                "border-1 p-4 rounded-[10px] outline-none resize-none flex-shrink-0",
                errors.message ? "border-[#ff0000]" : "border-[#e8e6e6]"
              )}
            ></textarea>
            {errors.message && (
              <p className="text-[#ff0000] text-[13px] mt-1 pl-4">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Hear About AIL - MANDATORY */}
          <FormControl
            fullWidth
            sx={MaterialInputStyle(!!errors.hearAboutAil)}
            error={!!errors.hearAboutAil}
          >
            <InputLabel id="hearAboutAil">
              How did you hear about AIL? *
            </InputLabel>
            <Controller
              name="hearAboutAil"
              control={control}
              rules={{ required: "Selection is required" }}
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
            {errors.hearAboutAil && (
              <p className="text-[#ff0000] text-[13px] mt-1 pl-4">
                {errors.hearAboutAil.message}
              </p>
            )}
          </FormControl>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <FormControl
              fullWidth
              sx={MaterialInputStyle(!!errors.category)}
              error={!!errors.category}
            >
              <InputLabel id="category">Category *</InputLabel>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
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
              {errors.category && (
                <p className="text-[#ff0000] text-[13px] mt-1 pl-4">
                  {errors.category.message}
                </p>
              )}
            </FormControl>

            {/* Subcategory */}
            {/* Subcategory - MANDATORY */}
            <FormControl
              fullWidth
              sx={MaterialInputStyle(!!errors.subCategory)}
              error={!!errors.subCategory}
              className={clsx(
                availableSubcategories?.length > 0
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-60 pointer-events-none"
              )}
            >
              <InputLabel id="subCategory">Sub category *</InputLabel>
              <Controller
                name="subCategory"
                control={control}
                rules={{ required: "Sub category is required" }}
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
              {errors.subCategory && (
                <p className="text-[#ff0000] text-[13px] mt-1 pl-4">
                  {errors.subCategory.message}
                </p>
              )}
            </FormControl>
          </div>

          {/* Products - CONDITIONAL MANDATORY */}
          {selectedSubcategory === "Chemicals Products" && (
            <FormControl
              fullWidth
              sx={MaterialInputStyle(!!errors.productName)}
              error={!!errors.productName}
            >
              <Controller
                name="productName"
                control={control}
                rules={{ required: "Product Name is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={productsWithOthers}
                    getOptionLabel={(option) => option}
                    onChange={(_, value) => field.onChange(value)}
                    value={field.value || null}
                    PaperComponent={(props) => (
                      <Paper
                        {...props}
                        sx={{
                          bgcolor: "#fffdf8",
                        }}
                      />
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product Name *"
                        error={!!errors.productName}
                      />
                    )}
                  />
                )}
              />
              {errors.productName && (
                <p className="text-[#d32f2f] text-[13px] mt-1 pl-4">
                  {errors.productName.message}
                </p>
              )}
            </FormControl>
          )}

          {/* Other - Msg Box */}
          {selectedSubcategory === "Other" && (
            <div className="flex flex-col">
              <textarea
                id="otherEnquiry"
                {...register("otherEnquiry", {
                  required: "Message is required",
                })}
                rows={5}
                cols={40}
                placeholder="Other Enquiries *"
                className={clsx(
                  "border-1 p-4 rounded-[10px] outline-none resize-none flex-shrink-0",
                  errors.otherEnquiry ? "border-[#ff0000]" : "border-[#e8e6e6]"
                )}
              ></textarea>
              {errors.otherEnquiry && (
                <p className="text-[#ff0000] text-[13px] mt-1 pl-4">
                  {errors.otherEnquiry.message}
                </p>
              )}
            </div>
          )}
        </div>

        <Button title={"Submit"} className="mt-6" />
      </form>
    </div>
  );
}
