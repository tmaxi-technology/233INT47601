import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../components/Store";
import getCommerce from "../utils/commerce";
import { CART_RETRIEVE_SUCCESS } from "../utils/constants";
import { useRouter } from "next/router";
import { ArrowBack, Close } from "@mui/icons-material";

export default function Cart(props) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const router = useRouter();

  const handlerRemoveFromCart = async (lineItem) => {
    dispatch({ type: CART_RETRIEVE_SUCCESS, loading: true });
    const commerce = getCommerce(props.commercePublicKey);
    const cartData = await commerce.cart.remove(lineItem.id);
    dispatch({
      type: CART_RETRIEVE_SUCCESS,
      payload: cartData,
      loading: false,
    });
  };

  const quantityChangeHandler = async (lineItem, quantity) => {
    dispatch({ type: CART_RETRIEVE_SUCCESS, loading: true });
    const commerce = getCommerce(props.commercePublicKey);
    const cartData = await commerce.cart.update(lineItem.id, {
      quantity: quantity,
    });
    dispatch({
      type: CART_RETRIEVE_SUCCESS,
      payload: cartData,
      loading: false,
    });
  };

  const processToCheckoutHandler = () => {
    router.push("/checkout");
  };
  return (
    <Layout title="Cart" commercePublicKey={props.commercePublicKey}>
      <Button href="/" startIcon={<ArrowBack />}>
        Trở về thang chủ
      </Button>
      {cart.data?.line_items.length === 0 ? (
        <Alert icon={false} severity="error">
          Giỏ hàng rỗng. <Link href="/">Tiếp tục mua sắm</Link>
        </Alert>
      ) : (
        <>
          <Typography variant="h1" component="h1">
            Thông tin giỏ hàng
          </Typography>
          <Slide direction="up" in={true}>
            <Grid container spacing={1}>
              <Grid item xs={9} md={12}>
                <TableContainer>
                  <Table aria-label="Orders">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                        <TableCell align="right">Giá</TableCell>
                        <TableCell align="right">Xóa</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.data?.line_items.map((cartItem) => (
                        <TableRow key={cartItem.name}>
                          <TableCell component="th" scope="row">
                            <Link
                              href={`/products/${cartItem.permalink}`}
                              sx={{ textDecoration: "none", color: "inherit" }}
                            >
                              {cartItem.name}
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            <Select
                              label="quanitity-label"
                              id="quanitity"
                              onChange={(e) =>
                                quantityChangeHandler(cartItem, e.target.value)
                              }
                              value={cartItem.quantity}
                            >
                              {[...Array(100).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            {cartItem.price.formatted_with_code}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => handlerRemoveFromCart(cartItem)}
                              variant="contained"
                              color="error"
                              // endIcon={<Close color="inherit" />}
                            >
                              <Close color="inherit" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Typography variant="h6">
                          Tổng cộng: {cart.data?.subtotal.formatted_with_code}
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      {cart.data?.total_items > 0 && (
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={processToCheckoutHandler}
                        >
                          Tiến hành thanh toán
                        </Button>
                      )}
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Slide>
        </>
      )}
    </Layout>
  );
}

// Dynamic là 1 hàm từ next.js và set srr = false thì trang này sẽ chỉ được hiển thị ở client chứ k có ở BE
// export default dynamic(() => Promise.resolve(Cart), {
//   srr: false,
// });
