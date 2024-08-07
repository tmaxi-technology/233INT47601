import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import CardActionArea from "@mui/material/CardActionArea";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

import Layout from "../components/Layout";
import getCommerce from "../utils/commerce";
import Link from "next/link";
import { AddShoppingCart } from "@mui/icons-material";
import { useContext } from "react";
import { Store } from "../components/Store";
import ImageProject from "../components/image_project";
import { CART_RETRIEVE_SUCCESS } from "../utils/constants";
import Form from "../components/Form/Form";

export default function Home(props) {
  const { products, commercePublicKey } = props;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [checkLogin, setCheckLogin] = useState(false);
  const [login, setLogin] = useState("");

  const addToCartHandler = async (idProduct) => {
    dispatch({
      type: CART_RETRIEVE_SUCCESS,
      loading: true,
    });
    const commerce = await getCommerce(commercePublicKey);
    const lineItem = await cart.data?.line_items.find((x) => {
      x.product_id === idProduct;
    });
    if (lineItem) {
      const cartData = await commerce.cart.update(idProduct, {
        Quantity: 1,
      });
      dispatch({
        type: CART_RETRIEVE_SUCCESS,
        payload: cartData,
        loading: false,
      });
    } else {
      const cartData = await commerce.cart.add(idProduct, 1);
      dispatch({
        type: CART_RETRIEVE_SUCCESS,
        payload: cartData,
        loading: false,
      });
    }
  };
  useEffect(() => {
    setLogin(sessionStorage.getItem("login"));
  }, []);

  const handleCheckLogin = () => {
    sessionStorage.setItem("login", "đã đăng nhập");
    setCheckLogin(!checkLogin);
  };

  return (
    <>
      {!checkLogin && !login ? (
        <Form handleCheckLogin={handleCheckLogin} />
      ) : (
        <Layout title="Home" commercePublicKey={props.commercePublicKey}>
          <Grid container spacing={1}>
            {props.lenght === 0 && (
              <Alert severity="error">Không có sản phẩm nào!</Alert>
            )}
            {products.map((pro) => (
              <Grid key={pro.id} item md={4} xs={12} px={2} py={6}>
                <Slide direction="up" in={true}>
                  <Card variant="elevation">
                    <Link href={`/products/${pro.permalink}`}>
                      <CardActionArea>
                        <ImageProject src={pro.image.url} name={pro.name} />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="green"
                            component="p"
                          >
                            {pro.name}
                          </Typography>
                          <Box>
                            <Typography variant="h2" color="Red" component="p">
                              {pro.price.formatted_with_code}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <ListItem>
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={pro.inventory.available > 0 ? false : true}
                        onClick={() => addToCartHandler(pro.id)}
                        endIcon={<AddShoppingCart />}
                      >
                        Thêm giỏ hàng
                      </Button>
                    </ListItem>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  return { props: { products } };
}
