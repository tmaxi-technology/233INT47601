import React, { useContext } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Layout from "../components/Layout";
import { Store } from "../components/Store";

export default function Confirmation(props) {
  const { state } = useContext(Store);
  const { order } = state;
  return (
    <Layout title="Order" commercePublicKey={props.commercePublicKey}>
      <Typography variant="h1">Thông tin hóa đơn</Typography>
      {!order ? (
        <Alert icon={false} severity="error">
          Không có hóa đơn nào.
        </Alert>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/* Thông tin khách hàng */}
            <Card sx={{ padding: "12px" }}>
              <Typography variant="h1">Thông tin khách hàng</Typography>
              <Typography>
                {order.customer.firstname}
                {order.customer.lastname}
              </Typography>
              <Typography>{order.customer.email}</Typography>
            </Card>
            {/* Thông tin vận chuyển */}
            <Card
              sx={{
                padding: "12px",
                marginTop: "12px",
              }}
            >
              <Typography variant="h1">Chi tiết giao hàng</Typography>
              <Typography>{order.shipping.name}</Typography>
              <Typography>{order.shipping.street}</Typography>
              <Typography>
                {order.shipping.town_city},{order.shipping.country_state}
              </Typography>
              <Typography>{order.shipping.country}</Typography>
            </Card>
            <Card
              sx={{
                padding: "12px",
                marginTop: "12px",
              }}
            >
              <Typography variant="h1">Chi tiết thanh toán</Typography>
              {order.transactions && order.transactions[0] ? (
                <>
                  <Typography>{order.transactions[0].gateway_name}</Typography>
                  <Typography>
                    Cart ending in {order.transactions[0].gateway_reference}
                  </Typography>
                  <Typography>
                    Transaction ID:
                    {order.transactions[0].gateway_transaction_id}
                  </Typography>
                </>
              ) : (
                <Alert>No payment found.</Alert>
              )}
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                padding: "12px",
              }}
            >
              <Typography variant="h1">Sản phẩm mua</Typography>
              <TableContainer>
                <Table aria-label="Orders">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Giá</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.order.line_items.map((cartItem, key) => (
                      <TableRow key={key + 1}>
                        <TableCell>{cartItem.product_name}</TableCell>
                        <TableCell align="right">{cartItem.quantity}</TableCell>
                        <TableCell align="right">
                          {cartItem.price.formatted_with_code}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ padding: "12px" }}>
              <Typography variant="h1">Tổng thanh toán</Typography>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {order.order.subtotal.formatted_with_code}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {order.tax.amount.formatted_with_code}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {order.order.total_with_tax.formatted_with_code}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Total paid</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {order.order.total_paid.formatted_with_code}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
