import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
} from "../../utils/constants";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
// import Image from "next/image";
// import Link from "next/link";
import getCommerce from "../../utils/commerce";
import { Store } from "../Store";

const Navbar = ({ commercePublicKey }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  useEffect(() => {
    const fetchCart = async () => {
      const commerce = getCommerce(commercePublicKey);
      dispatch({ type: CART_RETRIEVE_REQUEST });
      const cartData = await commerce.cart.retrieve();
      dispatch({
        type: CART_RETRIEVE_SUCCESS,
        payload: cartData,
        loading: false,
      });
    };
    fetchCart();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ marginTop: "3px" }}
      color="secondary"
      elevation={10}
    >
      <Grid
        container={true}
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Grid item xs={4} md={4}>
          <h2>
            <Link
              href="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HuyBookShop
            </Link>
          </h2>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            textAlign: "center",
            display: "flex",
            position: "relative",
          }}
        >
          <FormControl
            fullWidth
            style={{
              outline: "none",
              borderRadius: "100px",
              background: "white",
            }}
          >
            <Input
              disableUnderline
              fullWidth
              placeholder="Search..."
              style={{
                paddingLeft: "1rem",
                color: "GrayText",
              }}
            >
              Search
            </Input>
          </FormControl>
          <IconButton
            style={{
              position: "absolute",
              top: "60%",
              right: "0%",
              transform: "translate(0,-50%)",
            }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4} md={4} textAlign="right">
          <Link
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
            href="/cart"
            style={{ cursor: "pointer" }}
          >
            {cart.loading ? (
              <CircularProgress />
            ) : cart.data?.total_items > 0 ? (
              <IconButton
                // href="/cart"
                // component={Link}
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={cart.data?.total_items} color="primary">
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </IconButton>
            ) : (
              <ShoppingCartTwoToneIcon />
            )}
          </Link>
          <Link
            sx={{
              textDecoration: "none",
              color: "white",
            }}
            style={{ cursor: "pointer" }}
          >
            <IconButton onClick={() => handleLogout()} color="inherit">
              <Badge color="primary">
                <LogoutIcon />
              </Badge>
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </AppBar>
  );
};
export default Navbar;
