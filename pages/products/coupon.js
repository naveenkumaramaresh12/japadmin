import * as React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// Create new user Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
// End Create new user Modal

function UsersList(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

UsersList.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function User() {
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Create new user modal
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [discount, setDiscount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [maxUse, setMaxUse] = useState("");
  const [currentRow, setCurrentRow] = useState(null);

  /**/
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = (row) => {
    setOpen2(true);
    setCurrentRow(row);
    console.log(row);

  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  /**/
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("description", description);
      formData.append("is_active", isActive ? "1" : "0");
      formData.append("discount", discount);
      formData.append("maximum_dicount_in_price", maxDiscount);
      formData.append("maximum_number_of_use", maxUse);

      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const response = await axios.post(
          "https://jap.digisole.in/api/v1/coupon/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Coupon created:", response.data);

        // Reset the form fields
        setName("");
        setCode("");
        setDescription("");
        setIsActive("1");
        setDiscount("");
        setMaxDiscount("");
        setMaxUse("");

        handleClose();
        fetchCoupons();
      }
    } catch (error) {
      console.error("Error creating coupon:", error.response.data);
    }
  };

  const [coupons, setCoupons] = useState([]);
  const [totalCoupons, setTotalCoupons] = useState(0)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
/*COPY AND PASTE BELOW CODD EVERYWHERE*/
const loginValue = localStorage.getItem('login_');
if (loginValue !== null && loginValue === '1') {
  console.log('ok');
} else {
  window.location.href = '/authentication/sign-in/';
}
/* copy and paste to everywhere*/


    fetchCoupons();
  }, [page, rowsPerPage]);
  const fetchCoupons = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get('https://jap.digisole.in/api/v1/coupon/paginate?page=${page + 1}',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      setCoupons(response.data.data);
      setTotalCoupons(response.data.total);
      setLoading(false); // Set loading to false after fetching data
      console.log('Coupons Fetched for Page', page + 1, response.data.data);

    } catch (error) {
      console.error('Error fetching coupons:', error.response.data);
      // Handle error
    }
  };

  const handleChangePage = (event, newPage) => {
    if (newPage < 0) {
      // Loop to the last page if the user goes to a negative page
      setPage(Math.max(0, Math.ceil(totalCoupons / rowsPerPage) - 1));
    } else if (newPage >= Math.ceil(totalCoupons / rowsPerPage)) {
      // Loop to the first page if the user goes beyond the last page
      setPage(0);
    } else {
      // Fetch the products for the new page
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, coupons.length);

  const handleUpdate = async (event, currentRow) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      formData.append("name", currentRow.name);
      formData.append("code", currentRow.code);
      formData.append("description", currentRow.description);
      formData.append("is_active", currentRow.isActive ? "1" : "0");
      formData.append("discount", currentRow.discount);
      formData.append("maximum_dicount_in_price", currentRow.maxDiscount);
      formData.append("maximum_number_of_use", currentRow.maxUse);

      const accessToken = localStorage.getItem("accessToken");

      if (accessToken && currentRow && currentRow.id) {
        const couponId = currentRow.id;
        const response = await axios.post(
          "https://jap.digisole.in/api/v1/coupon/update/" + couponId,
          formData,
          {
            headers: {  
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setOpen2(false);
        setCurrentRow(null);
        console.log("Coupon updated:", response.data);

        // Reset the form fields
        setName("");
        setCode("");
        setDescription("");
        setIsActive("1");
        setDiscount("");
        setMaxDiscount("");
        setMaxUse("");

        handleClose2();
        fetchCoupons();
      }
    } catch (error) {
      console.error("Error updating coupon:", error.response.data);
    }
  };
  useEffect(() => {
    if (currentRow) {
      setName(currentRow.name);
      setCode(currentRow.code);
      setDescription(currentRow.description);
      setIsActive(currentRow.isActive  ? "1" : "0");
      setDiscount(currentRow.discount);
      setMaxDiscount(currentRow.maxDiscount);
      setMaxUse(currentRow.maxUse);
      // ... set other state variables as needed
    }
  }, [currentRow]);

  const handleDelete = async (couponId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.delete(`https://jap.digisole.in/api/v1/coupon/delete/${couponId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Remove the deleted coupon from the state or perform any necessary actions
      setCoupons((prevProducts) =>
        prevProducts.filter((coupon) => coupon.id !== couponId)
      );
      fetchCoupons();
      console.log(`Coupon with ID ${couponId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting coupon with ID ${couponId}:`, error.response.data);
    }
  };
  // End Add Task Modal

  return (
    <>


      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Coupons List
          </Typography>

          <Button
            onClick={handleClickOpen}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 20px",
              color: "#fff !important",
            }}
          >
            <AddIcon
              sx={{ position: "relative", top: "-1px" }}
              className='mr-5px'
            />{" "}
            Create New Coupon
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 900 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>

              <TableRow>

                <TableCell
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Name
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Code
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Description
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Status
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Discount
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Maximum Discount
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Maximum Use
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Action
                </TableCell>
              </TableRow>

            </TableHead>

            <TableBody>
              {coupons.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox {...label} size="small" />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="ml-10px"
                    >
                      <Box>
                        <Typography
                          as="h4"
                          sx={{
                            fontWeight: "500",
                            fontSize: "13.5px",
                          }}
                          className='ml-10px'
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#A9A9C8",
                          }}
                          className='ml-10px'
                        >
                          {row.userName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.code}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.description}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "12px",
                      padding: "8px 10px",
                    }}
                  >
                    <span className={row.status}>{row.is_active.toString()}</span>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.discount}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.maximum_dicount_in_price}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.maximum_number_of_use}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderBottom: "1px solid #F7FAFF" }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                      }}
                    >
                      <IconButton
                        aria-label="remove"
                        size="small"
                        color="danger"
                        className="danger"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>


                      <Tooltip title="Rename" placement="top">
                        <IconButton
                          aria-label="rename"
                          size="small"
                          color="primary"
                          className="primary"
                          onClick={() => handleClickOpen2(row)}
                        >
                          <DriveFileRenameOutlineIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={5}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
              <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  count={totalCoupons}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={UsersList}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      {/* Create new user modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "20px 20px",
            }}
            className="bg-black"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Create New Coupon
            </Typography>

            <IconButton
              aria-label="remove"
              size="small"
              onClick={handleClose}
            >
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                background: "#fff",
                padding: "20px 20px",
                borderRadius: "8px",
              }}
              className="dark-BG-101010"
            >
              <Grid container alignItems="center" spacing={2}>


                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Name
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid><Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Code
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="code"
                    required
                    fullWidth
                    id="code"
                    label="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid><Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Description
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="description"
                    required
                    fullWidth
                    id="Description"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Is Active
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={isActive ? "1" : "0"}
                      onChange={(e) => setIsActive(e.target.value === "1")}
                      inputProps={{
                        name: "isActive",
                        id: "isActive",
                        style: { borderRadius: 8 },
                      }}
                    >
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="0">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Discount
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="discount"
                    required
                    fullWidth
                    id="discount"
                    label="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Max Discount
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="maximum_dicount_in_price"

                    fullWidth
                    id="maximum_dicount_in_price"
                    label="Max Discount"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Max Use
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="maximum_number_of_use"
                    required
                    fullWidth
                    id="maximum_number_of_use"
                    label="Max Use"
                    value={maxUse}
                    onChange={(e) => setMaxUse(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} textAlign="end">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className='mr-5px'
                    />{" "}
                    Create New Coupon
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "20px 20px",
            }}
            className="bg-black"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Update Coupon
            </Typography>

            <IconButton
              aria-label="remove"
              size="small"
              onClick={handleClose2}
            >
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate onSubmit={handleUpdate}>
            <Box
              sx={{
                background: "#fff",
                padding: "20px 20px",
                borderRadius: "8px",
              }}
              className="dark-BG-101010"
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid><Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Code
                  </Typography>
                  <TextField
                    autoComplete="name"
                    name="code"
                    required
                    fullWidth
                    id="code"
                    label="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid><Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Description
                  </Typography>
                  <TextField
                    autoComplete="name"
                    name="description"
                    required
                    fullWidth
                    id="Description"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Is Active
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={isActive ? "1" : "0"}
                      onChange={(e) => setIsActive(e.target.value === "1")}
                      inputProps={{
                        name: "isActive",
                        id: "isActive",
                        style: { borderRadius: 8 },
                      }}
                    >
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="0">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Discount
                  </Typography>
                  <TextField
                    autoComplete="name"
                    name="discount"
                    required
                    fullWidth
                    id="discount"
                    label="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Max Discount
                  </Typography>
                  <TextField
                    autoComplete="name"
                    name="maximum_dicount_in_price"

                    fullWidth
                    id="maximum_dicount_in_price"
                    label="Max Discount"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid><Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Max Use
                  </Typography>
                  <TextField
                    autoComplete="name"
                    name="maximum_number_of_use"
                    required
                    fullWidth
                    id="maximum_number_of_use"
                    label="Max Use"
                    value={maxUse}
                    onChange={(e) => setMaxUse(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} textAlign="end">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className='mr-5px'
                    />{" "}
                    Create New Coupon
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
    </>
  );
}
