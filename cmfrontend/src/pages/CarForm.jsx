import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { createCar, getCarByIdApi, updateCar } from "../apiService/carService";

const carValidationSchema = Yup.object({
  title: Yup.string().required("Car title is required"),
  description: Yup.string().required("Car description is required"),
  tags: Yup.array().of(Yup.string().required("Tag cannot be empty")),
  // images: Yup.array().min(1, "At least one image is required").nullable(),
});

const CarForm = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { car_id } = useParams();

  const [imagePreviews, setImagePreviews] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    tags: [""],
    images: [],
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (isEditMode && car_id) {
        const response = await getCarByIdApi(car_id);
        if (response) {
          setInitialValues({
            title: response.title,
            description: response.description,
            tags: response.tags || [],
            images: response.images || [""],
          });

          const previews = response.images?.map((image) =>
            URL.createObjectURL(image)
          );
          setImagePreviews(previews || []);
        }
      }
    };

    fetchCarDetails();
  }, [car_id, isEditMode]);

  const handleFileChange = (event, setFieldValue) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setFieldValue("images", fileArray);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.tags.length > 0) {
        // formData.append("tags", JSON.stringify(values.tags));
        values.tags.forEach((tag) => {
          // console.log(tag);
          formData.append("tags", tag);
        });
      }

      if (values.images.length > 0) {
        values.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      if (isEditMode) {
        await updateCar(car_id, formData);
      } else {
        await createCar(formData);
      }

      navigate("/cars");
    } catch (error) {
      alert("Error saving car");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-semibold text-gray-800 text-center">
        {isEditMode ? "Update Car" : "Create New Car"}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={carValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Car Title */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="title"
                className="text-lg font-medium text-gray-700"
              >
                Car Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Car Description */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="description"
                className="text-lg font-medium text-gray-700"
              >
                Car Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="tags"
                className="text-lg font-medium text-gray-700"
              >
                Car Tags
              </label>
              <FieldArray name="tags">
                {({ push, remove }) => (
                  <div>
                    {values.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Field
                          name={`tags[${index}]`}
                          type="text"
                          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder={`Tag #${index + 1}`}
                        />
                        {tag.length !== 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="mt-2 bg-green-500 text-white py-2 px-6 rounded-md shadow-md"
                    >
                      Add Tag
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage
                name="tags"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Images */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="images"
                className="text-lg font-medium text-gray-700"
              >
                Car Images (Upload Files)
              </label>
              <input
                type="file"
                multiple
                name="images"
                onChange={(e) => handleFileChange(e, setFieldValue)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="mt-4 flex flex-wrap">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-32 h-32 object-cover mt-2 mr-2"
                  />
                ))}
              </div>
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-teal-600 text-white py-2 px-6 rounded-md shadow-md transform hover:scale-105 transition-all duration-300"
              >
                {isEditMode ? "Update Car" : "Create Car"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CarForm;
