import { useState, useEffect } from "react";
import "./App.css";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const initialValues = { display_name: "", product: "Savings Account", priority: "Low", crn: "", customer_mobile_number: "", email: "", marital_status: "Single", gender: "Male", occupation: "Student", aadhaar_add_ln1: "", aadhaar_add_ln2: "", aadhaar_add_ln3: "", aadhaar_add_pincode: "", aadhaar_add_city: "", aadhaar_add_state: "" };
  let [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleProductChange = (e) => {
    const value=e.target.value;
    setFormValues({...formValues, product: value});
  }

  const handlePriorityChange = (e) => {
    const value=e.target.value;
    setFormValues({...formValues, priority: value});
  }

  const handleMaritalStatusChange = (e) => {
    const value=e.target.value;
    setFormValues({...formValues, marital_status: value});
  }

  const handleGenderChange = (e) => {
    const value=e.target.value;
    setFormValues({...formValues, gender: value});
  }

  const handleOccupationChange = (e) => {
    const value=e.target.value;
    setFormValues({...formValues, occupation: value});
  }

  let err=0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    console.log(err);

    if(err==0) {

      console.log("Data is sent!");

      fetch('http://localhost:5000/vkyc', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        mode:'cors',
        body: JSON.stringify(formValues)
      }).then((response => response.json()) )
      .then((data)=>alert(data.message));
    }
  };

  useEffect(() => {
    console.log(formValues);
    
  }, [formValues]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    err=0;

    if(!values.display_name) {
      errors.display_name = "Name is required!";
      err++;
    }

    if(!values.crn) {
      errors.crn = "Crn number is required!";
      err++;
    } else if(values.crn<10000000 || values.crn>99999999) {
      errors.crn = "Crn number must be of 8 digits!";
      err++;
    }

    if(!values.customer_mobile_number) {
      errors.customer_mobile_number = "Mobile number is required!";
      err++;
    } else if(values.customer_mobile_number<1000000000 || values.customer_mobile_number>9999999999) {
      errors.customer_mobile_number = "Mobile number must be of 10 digits!";
      err++;
    }

    if (!values.email) {
      errors.email = "Email is required!";
      err++;
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      err++;
    }

    if (!values.aadhaar_add_ln1) {
      errors.aadhaar_add_ln1 = "Address is required";
      err++;
    } 

    if (!values.aadhaar_add_pincode) {
      errors.aadhaar_add_pincode = "PIN code is required!";
      err++;
    } else if(values.aadhaar_add_pincode<100000 || values.aadhaar_add_pincode>999999) {
      errors.aadhaar_add_pincode = "PIN code must be of 6 digits";
      err++;
    }

    if(!values.aadhaar_add_city) {
      errors.aadhaar_add_city = "City of residence is required!";
      err++;
    }

    if(!values.aadhaar_add_state) {
      errors.aadhaar_add_state = "State of residence is required!";
      err++;
    }

    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success"></div>
      ) : (
        <pre>
          
        </pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>VKYC Details</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name*</label>
            <input
              type="text"
              name="display_name"
              placeholder="Enter Your Name"
              value={formValues.display_name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.display_name}</p>
          <div className="field">
            <label>Product*</label>
            <select value={formValues.product} onChange={handleProductChange}>
              <option type="text" value="Savings Account" name="product" placeholder="product">Savings Account</option>
              <option type="text" value="Current Account" name="product" placeholder="product">Current Account</option>
              <option type="text" value="Fixed Deposit" name="product" placeholder="product">Fixed Deposit</option>
              <option type="text" value="Recurring Deposit" name="product" placeholder="product">Recurring Deposit</option>
              <option type="text" value="Loan Holder" name="product" placeholder="product">Loan Holder</option>
            </select>
          </div>
          <div className="field">
            <label>Priority*</label>
            <select value={formValues.priority} onChange={handlePriorityChange}>
              <option type="text" name="priority" placeholder="priority">Low</option>
              <option type="text" name="priority" placeholder="priority">Medium</option>
              <option type="text" name="priority" placeholder="priority">High</option>
            </select>
          </div>
          <div className="field">
            <label>CRN Number*</label>
            <input
              type="number"
              name="crn"
              placeholder="Enter Your CRN Number"
              value={formValues.crn}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.crn}</p>
          <div className="field">
            <label>Mobile Number*</label>
            <input
              type="number"
              name="customer_mobile_number"
              placeholder="Enter Your Mobile Number"
              value={formValues.customer_mobile_number}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.customer_mobile_number}</p>
          <div className="field">
            <label>Email ID*</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Your (Valid) Email ID"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Marital Status*</label>
            <select value={formValues.marital_status} onChange={handleMaritalStatusChange}>
              <option type="text" name="marital_status" placeholder="marital_status">Single</option>
              <option type="text" name="marital_status" placeholder="marital_status">Married</option>
              <option type="text" name="marital_status" placeholder="marital_status">Divorced</option>
            </select>
          </div>
          <div className="field">
            <label>Gender*</label>
            <select value={formValues.gender} onChange={handleGenderChange}>
              <option type="text" name="gender" placeholder="gender">Male</option>
              <option type="text" name="gender" placeholder="gender">Female</option>
              <option type="text" name="gender" placeholder="gender">Other</option>
              <option type="text" name="gender" placeholder="gender">Not say</option>
            </select>
          </div>
          <div className="field">
            <label>Occupation*</label>
            <select value={formValues.occupation} onChange={handleOccupationChange}>
              <option type="text" name="occupation" placeholder="occupation">Student</option>
              <option type="text" name="occupation" placeholder="occupation">Private Service</option>
              <option type="text" name="occupation" placeholder="occupation">Government Job</option>
              <option type="text" name="occupation" placeholder="occupation">Bank Employee</option>
              <option type="text" name="occupation" placeholder="occupation">IT</option>
              <option type="text" name="occupation" placeholder="occupation">Business</option>
              <option type="text" name="occupation" placeholder="occupation">Other</option>
              <option type="text" name="occupation" placeholder="occupation">Retired</option>
              <option type="text" name="occupation" placeholder="occupation">Unemployed</option>
            </select>
          </div>
          <div className="field">
            <label>Address Line 1*</label>
            <input
              type="text"
              name="aadhaar_add_ln1"
              placeholder="Room/House/Flat Number"
              value={formValues.aadhaar_add_ln1}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.aadhaar_add_ln1}</p>
          <div className="field">
            <label>Address Line 2</label>
            <input
              type="text"
              name="aadhaar_add_ln2"
              placeholder="Block/Road Number"
              value={formValues.aadhaar_add_ln2}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Address Line 3</label>
            <input
              type="text"
              name="aadhaar_add_ln3"
              placeholder="Street/Locality"
              value={formValues.aadhaar_add_ln3}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>PIN Code*</label>
            <input
              type="number"
              name="aadhaar_add_pincode"
              placeholder="Enter Your (Valid) PIN Code"
              value={formValues.aadhaar_add_pincode}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.aadhaar_add_pincode}</p>
          <div className="field">
            <label>City*</label>
            <input
              type="text"
              name="aadhaar_add_city"
              placeholder="Town/City of Residence"
              value={formValues.aadhaar_add_city}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.aadhaar_add_city}</p>
          <div className="field">
            <label>State*</label>
            <input
              type="text"
              name="aadhaar_add_state"
              placeholder="State of Residence"
              value={formValues.aadhaar_add_state}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.aadhaar_add_state}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
