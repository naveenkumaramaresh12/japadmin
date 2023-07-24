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
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import axios from 'axios';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import MenuItem from "@mui/material/MenuItem";

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

function createData(name, email, role, phone, pass) {
  return {
    name, email, role, phone, pass
  };
}

const rows = [
  createData(
    "User name",
    "email",
    "role",
    "phone",
    "password",

  ),
].sort((a, b) => (a.name < b.name ? -1 : 1));

export default function User() {
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
 
  // Create new user modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  /**/
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = (row) => {
    setOpen2(true);
    setUser(row);
    console.log(row);

  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  /**/
const [user, setUser] = useState(null);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [role, setRole] = useState("");
const [password, setPassword] = useState('');
const [confirmpassword, setConfirmPassword] = useState('');
const [phone, setPhone] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

  // Validate form fields
  if (!name || !email || !role || !phone || !password || !confirmpassword || !role) {
    // Display an error message or perform other validation logic
    console.error('Please fill in all required fields');
    return;
  }

  try {
    const formData = {
      name:name,
      email:email,
      phone:phone,
      password:password,
      confirm_password: confirmpassword,
      role:role,
    };
    console.log(formData)

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const response = await axios.post(
        'https://jap.digisole.in/api/v1/user/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",

          },
        }
      );
      console.log('User created:', response.data);

      // Reset the form fields
      setName('');
      setEmail('');
      setRole('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');

      handleClose();
      fetchData();

      // Display a success message or perform other actions
    }
  } catch (error) {
    console.error('Error creating user:', error.response.data);
    // Display an error message or perform other error handling
  }
};

  const handleDeleteUser = async (userId) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(`https://jap.digisole.in/api/v1/user/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      console.log('User deleted:', response.data);
      fetchData();
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error.response.data);
      // Handle error case
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        name:user.name,
        email:user.email,
        phone:user.phone,
        password:password,
        confirm_password: confirmpassword,
        role:user.role,
      };

      const accessToken = localStorage.getItem('accessToken');


      if (accessToken && user && user.id) {
        const userId = user.id;
        const response = await axios.post(
          `https://jap.digisole.in/api/v1/user/update/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        console.log('User created:', response.data);
        handleClose2();
        fetchData();
        // Reset the form fields
        event.target.reset();
      }
    } catch (error) {
      console.error('Error creating user:', error.response.data);
    }
  };
  useEffect(() => {
/*COPY AND PASTE BELOW CODD EVERYWHERE*/
const loginValue = localStorage.getItem('login_');
if (loginValue !== null && loginValue === '1') {
  console.log('ok');
} else {
  window.location.href = '/authentication/sign-in/';
}
/* copy and paste to everywhere*/

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setRole(user.role);      
      // ... set other state variables as needed
    }
  }, [user]);

  // End Add Task Modal

  const [users, setUsers] = useState([]); // Array to store the fetched users
  const [loading, setLoading] = useState(true); // State to track loading status
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `https://jap.digisole.in/api/v1/user/paginate?page=${page + 1}&per_page=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(response.data.data);
      setTotalUsers(response.data.total);
      setLoading(false);
      console.log('Products Fetched for Page', page + 1, response.data.data);

    } catch (error) {
      console.error('Error fetching users:', error.response.data);
      setLoading(false);
      // TODO: Add error handling
    }
  };

  const handleChangePage = (event, newPage) => {
    if (newPage < 0) {
      // Loop to the last page if the user goes to a negative page
      setPage(Math.max(0, Math.ceil(totalUsers / rowsPerPage) - 1));
    } else if (newPage >= Math.ceil(totalUsers / rowsPerPage)) {
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

const [roles, setRoles] = useState([]);
const emptyRows =
page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;


  // Function to get role names from roles array
  const getRoleNames = (roles) => {
    return roles.map((role) => role.name).join(', ');
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.get("https://jap.digisole.in/api/v1/roles/paginate",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
      );
      console.log("res",response.data.data)
      const fetchedRoles = response.data.data;
      setRoles(fetchedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error.response.data);
    }
  };

  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Users</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Users</li>
        </ul>
      </div>

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
            Users List
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
            Create New User
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
                  Email
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Role
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Phone
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Password
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              ) : (
                users.map((row) => (
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
                      {row.email}
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
                      {getRoleNames(row.roles)}
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
                      <span >{row.phone}</span>
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
                      {row.pass}
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
                        <Tooltip title="Remove" placement="top">
                          <IconButton
                            aria-label="remove"
                            size="small"
                            color="danger"
                            className="danger"
                            onClick={() => handleDeleteUser(row.id)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>

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
                ))
              )}

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
        component="div"
        count={totalUsers}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
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
              Create New User
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
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Email
            </Typography>
            <TextField
              autoComplete="email"
              name="email"
              required
              fullWidth
              id="email"
              label="example@info.com"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        Role
      </Typography>
      <TextField
        autoComplete="role"
        name="role"
        required
        fullWidth
        id="role"
        label="Role"
        autoFocus
        value={role}
        onChange={(e) => setRole(e.target.value)}
        InputProps={{
          style: { borderRadius: 8 },
        }}
        select
      >
        {Array.isArray(roles)
          ? roles.map((role) => (
          <MenuItem key={role.id} value={role.name} onClick={() => console.log(role.name)}>
            {role.name}
          </MenuItem>
         ))
         : null}
      </TextField>
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
              Phone
            </Typography>
            <TextField
              autoComplete="phone"
              name="phone"
              required
              fullWidth
              id="phone"
              label="Phone"
              autoFocus
              value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
              Password
            </Typography>
            <TextField
              autoComplete="password"
              name="password"
              required
              fullWidth
              id="password"
              label="Password"
              autoFocus
              value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              Confirm Password
            </Typography>
            <TextField
              autoComplete="confirmpassword"
              name="confirmpassword"
              required
              fullWidth
              id="confirmpassword"
              label="Confirm Password"
              autoFocus
              value={confirmpassword}
              onChange={(e) => setConfirmPassword (e.target.value)}
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
                color: "#fff !important",
              }}
            >
              <AddIcon
                sx={{
                  position: "relative",
                  top: "-2px",
                }}
                className="mr-5px"
              />{" "}
              Create New User
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
        </Box>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose2}
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
              Update User
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
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    value={name}
  onChange={(event) => setName(event.target.value)}
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
                    Email
                  </Typography>

                  <TextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="example@info.com"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    value={email}
  onChange={(event) => setEmail(event.target.value)}
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
        Role
      </Typography>
      <TextField
        autoComplete="role"
        name="role"
        required
        fullWidth
        id="role"
        label="Role"
        autoFocus
        value={role}
        onChange={(e) => setRole(e.target.value)}
        InputProps={{
          style: { borderRadius: 8 },
        }}
        select
      >
        {Array.isArray(roles)
          ? roles.map((role) => (
          <MenuItem key={role.id} value={role.name}>
            {role.name}
          </MenuItem>
         ))
         : null}
      </TextField>
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
                    Phone
                  </Typography>

                  <TextField
                    autoComplete="phone"
                    name="phone"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    value={phone}
  onChange={(event) => setPhone(event.target.value)}
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
                    Password
                  </Typography>

                  <TextField
                    autoComplete="password"
                    name="password"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    value={password}
  onChange={(event) => setPassword(event.target.value)}
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
                    Confirm Password
                  </Typography>

                  <TextField
                    autoComplete="confirmpassword"
                    name="confnirmpassword"
                    required
                    fullWidth
                    id="confirmpassword"
                    label="Confirmpassword"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    value={confirmpassword}
  onChange={(event) => setConfirmPassword(event.target.value)}
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
                    Create New User
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
