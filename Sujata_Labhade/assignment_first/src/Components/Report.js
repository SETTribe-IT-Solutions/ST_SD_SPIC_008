import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Report.css";

function Report() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  /* ===== FETCH FROM BACKEND ===== */
  useEffect(() => {
    fetch("http://localhost:8080/api/tender")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  /* ===== ADD NEW ===== */
  const handleAddNew = () => {
    localStorage.removeItem("editTenderId");
    navigate("/tender");
  };

  /* ===== EDIT ===== */
  const handleEdit = (id) => {
    localStorage.setItem("editTenderId", id);
    navigate("/tender");
  };

  /* ===== DELETE ===== */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    await fetch(`http://localhost:8080/api/tender/${id}`, {
      method: "DELETE",
    });

    setData(data.filter((item) => item.id !== id));
  };

  /* ===== EXPORT CSV ===== */
  const handleExport = () => {
    const headers = [
      "Type","Full Name","Address","City","District","State","Pincode",
      "Mobile","Email","License","GST","Goods Type","Goods Demand",
      "Sale Rate","Remarks"
    ];

    const rows = data.map((item) => [
      item.type,
      item.fullName,
      item.address,
      item.city,
      item.district,
      item.state,
      item.pincode,
      item.mobile,
      item.email,
      item.license,
      item.gst,
      item.goodsType,
      item.goodsDemand,
      item.saleRate,
      item.remarks
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "tender_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderImg = (img) =>
    img ? <img src={img} alt="doc" className="table-img" /> : "—";

  return (
    <div className="tender-container">
      <div className="tender-card report-card">

        {/* ===== HEADER ===== */}
        <div className="report-header">
          <h2>Tender Report</h2>
          <div className="report-actions">
            <button className="export-btn" onClick={handleExport}>
              Export Excel
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* ===== ADD NEW ===== */}
        <button className="add-btn" onClick={handleAddNew}>
          + Add New Tender
        </button>

        {/* ===== TABLE ===== */}
        <div className="table-scroll">
          <table className="report-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>License</th>
                <th>GST</th>
                <th>Goods Type</th>
                <th>Goods Demand</th>
                <th>Sale Rate</th>
                <th>Remarks</th>
                <th>Photo</th>
                <th>Aadhar</th>
                <th>PAN</th>
                <th>GST Cert</th>
                <th>License Cert</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="21" style={{ textAlign: "center" }}>
                    No Records Found
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.type}</td>
                    <td>{item.fullName}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.district}</td>
                    <td>{item.state}</td>
                    <td>{item.pincode}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td>{item.license}</td>
                    <td>{item.gst}</td>
                    <td>{item.goodsType}</td>
                    <td>{item.goodsDemand}</td>
                    <td>{item.saleRate}</td>
                    <td>{item.remarks}</td>
                    <td>{renderImg(item.photo)}</td>
                    <td>{renderImg(item.aadhar)}</td>
                    <td>{renderImg(item.pan)}</td>
                    <td>{renderImg(item.gstCert)}</td>
                    <td>{renderImg(item.licenseCert)}</td>
                    <td className="action-cell">
                      <button className="action-btn edit" onClick={() => handleEdit(item.id)}>
                        Edit
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Report;