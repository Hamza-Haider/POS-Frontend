import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateItemForm = ({ item, handleUpdate }) => {
  return (
    <Formik
      initialValues={{
        itemNumber: item.itemNumber,
        Name: item.Name,
        Quantity: item.Quantity,
        Price: item.Price,
      }}
      validationSchema={Yup.object({
        itemNumber: Yup.number().required("Barcode number is required"),
        Name: Yup.string().required("Name is required"),
        Quantity: Yup.number().required("Quantity is required"),
        Price: Yup.number().required("Price is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await handleUpdate(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Field
                type="text"
                placeholder="Barcode value"
                className="form-control"
                name="itemNumber"
              />
              <ErrorMessage
                name="itemNumber"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="col-md-6 mb-3">
              <Field
                type="text"
                placeholder="Name"
                className="form-control"
                name="Name"
              />
              <ErrorMessage
                name="Name"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="col-md-6 mb-3">
              <Field
                type="text"
                placeholder="Quantity"
                className="form-control"
                name="Quantity"
              />
              <ErrorMessage
                name="Quantity"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="col-md-6 mb-3">
              <Field
                type="text"
                placeholder="Price"
                className="form-control"
                name="Price"
              />
              <ErrorMessage
                name="Price"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="col-md-12 mb-3">
              <button
                className="btn btn-success mr-2"
                type="submit"
                disabled={isSubmitting}
              >
                Update Item
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateItemForm;
