import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CardActionArea from "@mui/material/CardActionArea";
import Layout from "../../components/Layout";
import getCommerce from "../../utils/commerce";

import { Store } from "../../components/Store";
import { CART_RETRIEVE_SUCCESS } from "../../utils/constants";
import { AddShoppingCart, ArrowBack } from "@mui/icons-material";
import ImageProject from "../../components/image_project";

export default function Product(props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    dispatch({
      type: CART_RETRIEVE_SUCCESS,
      loading: true,
    });
    const commerce = await getCommerce(props.commercePublicKey);
    const lineItem = await cart.data?.line_items.find((x) => {
      x.product_id === product.id;
    });
    if (lineItem) {
      const cartData = await commerce.cart.update(product.id, {
        Quantity: quantity,
      });
      dispatch({
        type: CART_RETRIEVE_SUCCESS,
        payload: cartData,
        loading: false,
      });
    } else {
      const cartData = await commerce.cart.add(product.id, quantity);
      dispatch({
        type: CART_RETRIEVE_SUCCESS,
        payload: cartData,
        loading: false,
      });
    }
  };

  return (
    <Layout title={product.name} commercePublicKey={props.commercePublicKey}>
      <Slide direction="down" in={true}>
        <Grid container spacing={1}>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardActionArea sx={{ width: "100%", height: "100%" }}>
              <ImageProject src={product.image.url} name={product.name} />
            </CardActionArea>
          </Grid>
          <Grid item md={6} xs={12}>
            <List>
              <ListItem>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="inherit"
                  component="h1"
                >
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Box
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Slide>
      <Slide direction="up" in={true}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Price
                    </Grid>
                    <Grid item xs={6}>
                      {product.price.formatted_with_code}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      Status
                    </Grid>
                    <Grid item xs={6}>
                      {product.inventory.available > 0 ? (
                        <Alert icon={false} severity="success">
                          Còn hàng
                        </Alert>
                      ) : (
                        <Alert icon={false} severity="error">
                          Hết hàng
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={6}>
                      Quantity
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        labelId="quanitity-label"
                        id="quanitity"
                        fullWidth
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      >
                        {[...Array(product.inventory.available).keys()].map(
                          (x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={addToCartHandler}
                    endIcon={<AddShoppingCart />}
                    disabled={product.inventory.available > 0 ? false : true}
                  >
                    Add To Cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Button href="/" startIcon={<ArrowBack />}>
              Back Home Page
            </Button>
          </Grid>
        </Grid>
      </Slide>
    </Layout>
  );
}
// bởi vì dùng id trong url nên dùng getServerSideProps
export async function getServerSideProps({ params }) {
  const { id } = params;
  const commerce = getCommerce();
  const product = await commerce.products.retrieve(id, {
    type: "permalink",
  });
  return {
    props: {
      product,
    },
  };
}
