import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import axios from "axios";

export default function Report() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  

  const API_URL = "http://localhost:8081/api/tender";

  // ✅ Create Axios Instance with Token
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/api",
  });

  // ✅ Attach Token Automatically
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      Swal.fire("Session Expired", "Please login again", "warning");
      navigate("/login");
    }

    return config;
  });

  // ✅ Load Data from Backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/tender");
      console.log("API Response:", res.data);
      setData(res.data);
    } catch (error) {
      console.error("Fetch Error:", error.response);

      if (error.response?.status === 401) {
        Swal.fire("Unauthorized", "Please login again", "error");
        navigate("/login");
      } else {
        Swal.fire("Error", "Failed to load data", "error");
      }
    }
  };

  // ✅ Delete Record from Backend
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Only this selected record will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#d63830",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/tender/${id}`);
          fetchData();

          Swal.fire({
            icon: "success",
            title: "Deleted Successfully",
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire("Error", "Delete failed", "error");
        }
      }
    });
  };
  

  // ✅ Edit (Send data to Tender Form)
  const handleEdit = (item) => {
    navigate("/tender", { state: item });
  };

  // ✅ Add New
  const handleAddNew = () => {
  navigate("/tender", { state: null });
};

  // ✅ Export to Excel
  const exportToExcel = () => {
    if (data.length === 0) {
      Swal.fire("No Data", "No records to export!", "info");
      return;
    }

    const exportData = data.map((item) => ({
      ID: item.id,
      Type: item.type,
      FullName: item.fullName,
      Mobile: item.mobile,
      Email: item.email,
      Address: item.address,
      State: item.state,
      District: item.district,
      Pincode: item.pincode,
      License: item.license,
      GST: item.gst,
      GoodsType: item.goodsType,
      Demand: item.demand,
      Rate: item.rate,
      Total: item.total,
      Remarks: item.remarks,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tender Report");

    XLSX.writeFile(workbook, "Tender_Report.xlsx");
  };

  return (
    
    <Box sx={{ width: "95%", margin: "auto", mt: 5 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button variant="contained" onClick={handleAddNew}>
          Add New Tender
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={exportToExcel}
        >
          Export Excel
        </Button>
      </Box>
 <Box
  sx={{
    display: "flex",
    justifyContent: "center", // center the title in the available space
    alignItems: "center",
    mb: 3,
    position: "relative"
  }}
>
  {/* Centered Title */}
  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
    Tender Report
  </Typography>

  {/* Logout Button on the right */}
  <Box sx={{ position: "absolute", right: 0 }}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#f44336",
        "&:hover": { backgroundColor: "#d32f2f" },
        fontWeight: "bold"
      }}
      onClick={() => navigate("/login")}
    >
      Logout
    </Button>
  </Box>
</Box>


      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#a9a9a9" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>License</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Goods</TableCell>
              <TableCell>Demand</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Aadhar</TableCell>
              <TableCell>Pan</TableCell>
              <TableCell>GSTFile</TableCell>
              <TableCell>LicenseFile</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.license}</TableCell>
                  <TableCell>{item.gst}</TableCell>
                  <TableCell>{item.goodsType}</TableCell>
                  <TableCell>{item.demand}</TableCell>
                  <TableCell>{item.rate}</TableCell>
                  <TableCell>
                    ₹ {Number(item.total).toLocaleString()}
                  </TableCell>
                  <TableCell>{item.photo && (
                  <img src={item.photo} alt="Photo" width="60" />
                  )}</TableCell>
                  <TableCell>{item.aadhar && (
                  <img src={item.aadhar} alt="Aadhar" width="60" />
                  )}</TableCell>
                  <TableCell>{item.pan && (
                  <img src={item.pan} alt="Pan" width="60" />
                  )}</TableCell>
                  <TableCell>{item.gstFile && (
                  <img src={item.gstFile} alt="gstFile" width="60" />
                  )}</TableCell>
                  <TableCell>{item.licenseFile && (
                  <img src={item.licenseFile} alt="licenseFile" width="60" />
                  )}</TableCell>
                  <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    {/* Edit Button with custom color (e.g., green) */}
                    <IconButton
                      sx={{ color: "#040404" }} // green color
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete Button (red) */}
                    <IconButton
                      sx={{ color: "#f44336" }} // red color
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    
  );
}


