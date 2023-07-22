import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Typography, TextField, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {

/*COPY AND PASTE BELOW CODD EVERYWHERE*/
const loginValue = localStorage.getItem('login_');
if (loginValue !== null && loginValue === '1') {
  console.log('ok');
} else {
  window.location.href = '/authentication/sign-in/';
}
/* copy and paste to everywhere*/

    const accessToken = localStorage.getItem("accessToken");

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://jap.digisole.in/api/v1/product/paginate",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Replace with your access token variable
            },
          }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All") {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return (
        product.status === selectedCategory &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });
  const getYesNoValue = (value) => {
    return value ? "Yes" : "No";
  };

  return (
    <>
      <h1>All Products</h1>

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="dark-table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Slug</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Discount</TableCell>
                <TableCell align="left">Discounted Price</TableCell>
                <TableCell align="left">Inventory</TableCell>
                <TableCell align="left">In Stock</TableCell>
                <TableCell align="left">Featured Image Link</TableCell>
                <TableCell align="left">Image Title</TableCell>
                <TableCell align="left">Is Active</TableCell>
                <TableCell align="left">Is New Arrival</TableCell>
                <TableCell align="left">Is Featured</TableCell>
                <TableCell align="left">Is Best Sale</TableCell>
                <TableCell align="left">Other Images</TableCell>
                <TableCell align="left">Categories</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">
                    <img style={{ width: "50px" }} src={product.featured_image_link} alt="Product" />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.slug}</TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">{product.discount}</TableCell>
                  <TableCell align="left">{product.discounted_price}</TableCell>
                  <TableCell align="left">{product.inventory}</TableCell>
                  <TableCell align="left">{getYesNoValue(product.in_stock)}</TableCell>
                  <TableCell align="left">{product.featured_image_link}</TableCell>
                  <TableCell align="left">{product.image_title}</TableCell>
                  <TableCell align="left">{getYesNoValue(product.is_active)}</TableCell>
                  <TableCell align="left">{getYesNoValue(product.is_new_arrival)}</TableCell>
                  <TableCell align="left">{getYesNoValue(product.is_featured)}</TableCell>
                  <TableCell align="left">{getYesNoValue(product.is_best_sale)}</TableCell>
                  <TableCell align="left">{product.other_images.join(", ")}</TableCell>
                  <TableCell align="left">{product.categories.map((category) => category.slug).join(", ")}</TableCell>
                  <TableCell align="left">{product.created_at}</TableCell>
                  <TableCell align="left">{product.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
