import * as React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
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
import axios from "axios";

function OrdersList(props) {
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

OrdersList.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const OrdersLists = () =>{
  const [orders, setOrders] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://jap.digisole.in/api/v1/order/paginate",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your access token variable
          },
        }
        );
        console.log(response.data)
        const { data } = response.data;
        setOrders(data);
        setCount(data.total);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Select
  const [select, setSelect] = React.useState("");
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Recent Orders
          </Typography>

          
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table 
            sx={{ minWidth: 950 }} 
            aria-label="custom pagination table"
            className="dark-table"
          >
          <TableHead sx={{ background: "#F7FAFF" }}>
  <TableRow>
    <TableCell
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Order ID
    </TableCell>

    <TableCell
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Total Items
    </TableCell>

    <TableCell
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Total Quantity
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Subtotal
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Total Discount
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Total Price (without GST and Delivery Charge)
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      GST Charge
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Delivery Charge
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Total Price (with GST and Delivery Charge)
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Coupon Discount
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Total Price (with Coupon Discount)
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Billing First Name
    </TableCell>

    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Billing Last Name
    </TableCell>
    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Billing Adresss
    </TableCell>
    <TableCell
      align="center"
      sx={{
        borderBottom: "1px solid #F7FAFF",
        fontSize: "13.5px",
        padding: "16px 10px",
      }}
    >
      Billing Number
    </TableCell>
    {/* Add more TableCells for other properties */}
  </TableRow>
</TableHead>


            <TableBody>
                {Array.isArray(orders) ? (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.total_items}</TableCell>
                      <TableCell>{order.total_quantity}</TableCell>
                      <TableCell>{order.sub_total}</TableCell>
                      <TableCell>{order.total_discount}</TableCell>
                      <TableCell>{order.total_price_without_gst_delivery_charge}</TableCell>
                      <TableCell>{order.gst_charge}</TableCell>
                      <TableCell>{order.delivery_charge}</TableCell>
                      <TableCell>{order.total_price_with_gst_delivery_charge}</TableCell>
                      <TableCell>{order.coupon_discount}</TableCell>
                      <TableCell>{order.total_price_with_coupon_dicount}</TableCell>
                      <TableCell>{order.billing_first_name}</TableCell>
                      <TableCell>{order.billing_last_name}</TableCell>
                      <TableCell>{order.billing_address_1}</TableCell>
                      <TableCell>{order.billing_phone}</TableCell>                      

                      {/* Add more cells as needed */}
                    </TableRow>
                  ))
                ) : null}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={8}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
           { Array.isArray(orders) && orders.length > 0 && (
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={OrdersList}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
export default OrdersLists;
