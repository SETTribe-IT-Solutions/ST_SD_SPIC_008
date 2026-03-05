import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const steps = [
  "Personal Details",
  "Business & Tender Details",
  "Documents & Remarks"
];

const stateDistrictData = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  UttarPradesh: ["Lucknow", "Kanpur", "Varanasi"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai"]
};

export default function TenderForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = {
    id: null,
    type: "",
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    license: "",
    gst: "",
    goodsType: "",
    demand: "",
    rate: "",
    remarks: "",
    photo: "",
    aadhar: "",
    pan: "",
    gstFile: "",
    licenseFile: ""
  };

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (location.state) setFormData(location.state);
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pincode" && !/^\d*$/.test(value)) return;

    if (name === "state") {
      setFormData({ ...formData, state: value, district: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [name]: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const getUnit = (goodsType) => {
    if (["Sugar", "Ash", "Pressmud"].includes(goodsType)) return "Ton";
    if (["Ethanol", "Fusel Oil"].includes(goodsType)) return "Liter";
    return "";
  };

  const total =
    formData.demand && formData.rate
      ? Number(formData.demand) * Number(formData.rate)
      : 0;

  const handleNext = () => {
    // STEP 0: Personal Details
    if (activeStep === 0) {
      if (
        !formData.type ||
        !formData.fullName ||
        !/^[0-9]{10}$/.test(formData.mobile) ||
        !/\S+@\S+\.\S+/.test(formData.email) ||
        !formData.address ||
        !formData.state ||
        !formData.district ||
        !/^[0-9]{6}$/.test(formData.pincode)
      ) {
        Swal.fire("Error", "Fill Personal Details Correctly", "error");
        return;
      }
    }

    // STEP 1: Business & Tender Details
    if (activeStep === 1) {
      if (!formData.license || !formData.gst || !formData.goodsType || formData.demand <= 0 || formData.rate <= 0) {
        Swal.fire("Error", "Complete Business & Tender Details Properly", "error");
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

 const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8081/api/tender/save",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    Swal.fire("Success", "Tender Saved Successfully", "success");
    navigate("/report");

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Unauthorized or Server Error", "error");
  }
};

// ✅ Logout
  const handleLogout = () => {
  localStorage.removeItem("token");  // ✅ remove token

  Swal.fire({
    icon: "success",
    title: "Logged Out Successfully",
    timer: 2000,
    showConfirmButton: false
  });

  setTimeout(() => {
    navigate("/login");
  }, 2000);
};

  return (
    <Box sx={{ width: "60%", margin: "auto", mt: 5 }}>
      <Card elevation={6}>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4">Tender Application Form</Typography>
            <Button color="error" variant="contained" onClick={handleLogout}>Logout</Button>
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4 }}>
            {/* STEP 0: Personal Details */}
            {activeStep === 0 && (
              <>
               <TextField select fullWidth label="Type *" name="type" value={formData.type} onChange={handleChange} margin="normal">
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Broker">Broker</MenuItem>
              <MenuItem value="Purchaser">Purchaser</MenuItem>
              <MenuItem value="Wholesaler">Wholesaler</MenuItem>
            </TextField>
                <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" />
                <TextField select fullWidth label="State" name="state" value={formData.state} onChange={handleChange} margin="normal">
                <MenuItem value="">Select State</MenuItem>
                {Object.keys(stateDistrictData).map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </TextField>
                <TextField select fullWidth label="District" name="district" value={formData.district} onChange={handleChange} margin="normal" disabled={!formData.state}>
                <MenuItem value="">Select District</MenuItem>
                {formData.state && stateDistrictData[formData.state]?.map((dist) => (
                  <MenuItem key={dist} value={dist}>{dist}</MenuItem>
                ))}
              </TextField>
                <TextField fullWidth label="Pincode *" name="pincode" value={formData.pincode} onChange={handleChange} inputProps={{ maxLength: 6 }} margin="normal" />
              </>
            )}

            {/* STEP 1: Business & Tender Details */}
            {activeStep === 1 && (
              <>
                <Typography sx={{ mt: 2, fontWeight: "bold" }}>License Number *</Typography>
                <RadioGroup row name="license" value={formData.license} onChange={handleChange}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>

                <Typography sx={{ mt: 3, fontWeight: "bold" }}>GST Number *</Typography>
                <RadioGroup row name="gst" value={formData.gst} onChange={handleChange}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>

                <TextField select fullWidth label="Goods Type" name="goodsType" value={formData.goodsType} onChange={handleChange} margin="normal">
                <MenuItem value="">Select Goods</MenuItem>
                <MenuItem value="Sugar">Sugar</MenuItem>
                <MenuItem value="Ethanol">Ethanol</MenuItem>
                <MenuItem value="Fusel Oil">Fusel Oil</MenuItem>
                <MenuItem value="Pressmud">Pressmud</MenuItem>
                <MenuItem value="Ash">Ash</MenuItem>
              </TextField>

                <TextField fullWidth type="number" label={`Demand (${getUnit(formData.goodsType)})`} name="demand" value={formData.demand} onChange={handleChange} margin="normal" />
                <TextField fullWidth type="number" label={`Rate Per ${getUnit(formData.goodsType)}`} name="rate" value={formData.rate} onChange={handleChange} margin="normal" />

                {total > 0 && <Typography variant="h6" sx={{ mt: 2, color: "green" }}>Total Amount: ₹ {total.toLocaleString()}</Typography>}
              </>
            )}

            {/* STEP 2: Documents & Remarks */}
            {activeStep === 2 && (
              <>
                {["photo", "aadhar", "pan", "gstFile", "licenseFile"].map((doc) => (
                  <Box key={doc} sx={{ mb: 2 }}>
                    <Typography>{doc.toUpperCase()}</Typography>
                    <Button variant="outlined" component="label" fullWidth>
                      Upload
                      <input hidden type="file" name={doc} onChange={handleFileChange} />
                    </Button>
                    {formData[doc] && <Typography color="green">Uploaded Successfully</Typography>}
                  </Box>
                ))}

                <TextField fullWidth label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} margin="normal" multiline rows={3} />
              </>
            )}
          </Box>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" sx={{ backgroundColor: "#4caf50", color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#43a047" } }}>
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#4caf50", color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#43a047" } }}>
                Submit
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: "#4caf50", color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#43a047" } }}>
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}