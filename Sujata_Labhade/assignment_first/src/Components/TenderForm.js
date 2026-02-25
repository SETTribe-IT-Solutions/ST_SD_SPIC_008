import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TenderForm.css";

function TenderForm() {
  const navigate = useNavigate();

//  FORM STATE 
  const [form, setForm] = useState({
    type: "",
    fullName: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    mobile: "",
    email: "",
    license: "",
    gst: "",
    goodsType: "",
    goodsDemand: "",
    saleRate: "",
    remarks: ""
  });

  const [files, setFiles] = useState({
    photo: "",
    aadhar: "",
    pan: "",
    gstCert: "",
    licenseCert: ""
  });

// EDIT MODE (BACKEND) 
  useEffect(() => {
    const editId = localStorage.getItem("editTenderId");

    if (editId) {
      fetch(`http://localhost:8080/api/tender/${editId}`)
        .then(res => res.json())
        .then(data => {
          if (!data) return;

          setForm({
            type: data.type || "",
            fullName: data.fullName || "",
            address: data.address || "",
            city: data.city || "",
            district: data.district || "",
            state: data.state || "",
            pincode: data.pincode || "",
            mobile: data.mobile || "",
            email: data.email || "",
            license: data.license || "",
            gst: data.gst || "",
            goodsType: data.goodsType || "",
            goodsDemand: data.goodsDemand || "",
            saleRate: data.saleRate || "",
            remarks: data.remarks || ""
          });

          setFiles({
            photo: data.photo || "",
            aadhar: data.aadhar || "",
            pan: data.pan || "",
            gstCert: data.gstCert || "",
            licenseCert: data.licenseCert || ""
          });
        })
        .catch(err => console.error("Edit fetch error:", err));
    }
  }, []);

// INPUT CHANGE 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FILE 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("File size must be under 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFiles(prev => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

 // SUBMIT (ADD / UPDATE) 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    const editId = localStorage.getItem("editTenderId");

    const tenderData = {
      id: editId ? editId : null,
      ...form,
      photo: files.photo,
      aadhar: files.aadhar,
      pan: files.pan,
      gstCert: files.gstCert,
      licenseCert: files.licenseCert
    };

    try {
      const response = await fetch("http://localhost:8080/api/tender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenderData)
      });

      if (!response.ok) throw new Error("Save failed");

      localStorage.removeItem("editTenderId");
      alert("Tender Saved Successfully");
      navigate("/report");

    } catch (err) {
      console.error(err);
      alert("Error while saving tender");
    }
  };

 
  return (
    <div className="tender-container">
      <div className="tender-card">
        <h2>Tender Filling Form</h2>

        <form onSubmit={handleSubmit}>
          <label>Type *</label>
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">Select</option>
            <option>Broker</option>
            <option>Purchaser</option>
            <option>Wholesaler</option>
          </select>

          <label>Full Name *</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required />

          <label>Address *</label>
          <textarea name="address" value={form.address} onChange={handleChange} required />

          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} />

          <label>District</label>
          <input name="district" value={form.district} onChange={handleChange} />

          <label>State</label>
          <input name="state" value={form.state} onChange={handleChange} />

          <label>Pincode</label>
          <input name="pincode" value={form.pincode} onChange={handleChange} />

          <label>Mobile *</label>
          <input name="mobile" maxLength="10" value={form.mobile} onChange={handleChange} required />

          <label>Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>License *</label>
          <div className="radio-group">
            <label><input type="radio" name="license" value="Yes" checked={form.license==="Yes"} onChange={handleChange}/> Yes</label>
            <label><input type="radio" name="license" value="No" checked={form.license==="No"} onChange={handleChange}/> No</label>
          </div>

          <label>GST *</label>
          <div className="radio-group">
            <label><input type="radio" name="gst" value="Yes" checked={form.gst==="Yes"} onChange={handleChange}/> Yes</label>
            <label><input type="radio" name="gst" value="No" checked={form.gst==="No"} onChange={handleChange}/> No</label>
          </div>

          <label>Goods Type *</label>
          <select name="goodsType" value={form.goodsType} onChange={handleChange} required>
            <option value="">Select</option>
            <option>Ash</option>
            <option>Ethanol</option>
            <option>Fusel Oil</option>
            <option>Pressmud</option>
            <option>Sugar</option>
          </select>

          <label>Goods Demand *</label>
          <input name="goodsDemand" value={form.goodsDemand} onChange={handleChange} required />

          <label>Sale Rate *</label>
          <input name="saleRate" value={form.saleRate} onChange={handleChange} required />

          {["photo","aadhar","pan","gstCert","licenseCert"].map(key => (
            <div key={key} className="image-field">
              <label>{key}</label>
              <input type="file" accept="image/*" name={key} onChange={handleFileChange} />
              {files[key] && <img src={files[key]} alt={key} className="preview-image" />}
            </div>
          ))}

          <label>Remarks</label>
          <textarea name="remarks" value={form.remarks} onChange={handleChange} />

          <button type="submit">Submit Tender</button>

          <p className="show-report-link">
            Want to see all tenders?{" "}
            <span onClick={() => navigate("/report")}>Show Report</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default TenderForm;