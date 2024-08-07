import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../components/Store";
import getCommerce from "../utils/commerce";
import { useStyles } from "../utils/styles";
import { CART_RETRIEVE_SUCCESS, ORDER_SET } from "../utils/constants";
import { useRouter } from "next/router";

const dev = process.env.NODE_ENV === "development";
export default function Checkout(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [checkoutToken, setCheckoutToken] = useState({});
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const router = useRouter();

  useEffect(() => {
    if (!cart.loading) {
      generateCheckoutToken();
    }
  }, [cart.loading]);

  // Tạo mã thông báo thanh toán
  const generateCheckoutToken = async () => {
    if (cart.data.line_items.length) {
      const commerce = getCommerce(props.commercePublicKey);
      const token = await commerce.checkout.generateToken(cart.data.id, {
        type: "cart",
      });
      setCheckoutToken(token);
      fetchShippingCountries(token.id);
    } else {
      router.push("/cart");
    }
  };

  // Customer details
  const [firstName, setFirstName] = useState(dev ? "Quoc" : "");
  const [lastName, setLastName] = useState(dev ? "Huy" : "");
  const [email, setEmail] = useState(dev ? "qhuy05@gmail.com" : "");

  // Shipping details
  const [shippingName, setShippingName] = useState(dev ? "Quoc Huy" : "");
  const [shippingStreet, setShippingStreet] = useState(
    dev ? "123 Be Van Dan" : ""
  );
  // use zip_code tieu bang california
  const [shippingPostalZipCode, setShippingPostalZipCode] = useState(
    dev ? "77494" : ""
  );
  const [shippingCity, setShippingCity] = useState(dev ? "Bac Lieu" : "");
  const [shippingStateProvince, setShippingStateProvince] = useState(
    dev ? "US-CA" : ""
  );
  const [shippingCountry, setShippingCountry] = useState(dev ? "Viet Nam" : "");
  const [shippingOption, setShippingOption] = useState({});

  //Payment details
  const [cardNum, setCardNum] = useState(dev ? "4242 4242 4242 4242" : "");
  const [expMonth, setExpMonth] = useState(dev ? "11" : "");
  const [expYear, setExpYear] = useState(dev ? "2025" : "");
  const [cvv, setCvv] = useState(dev ? "123" : "");
  const [billingPostalZipCode, setBillingPostalZipCode] = useState(
    dev ? "70000" : ""
  );

  //Shipping and fulfillment:thực hiện data
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingSubdivisions, setShippingSubdivisions] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);

  //Stepper
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Customer information",
    "Shipping details",
    "Payment information",
  ];

  const handlerNext = () => {
    setActiveStep((prev) => prev + 1);
    if (activeStep === steps.length - 1) {
      handlerCaptureCheckout();
    }
  };

  //Kiem tra don hang
  const handlerCaptureCheckout = async () => {
    const orderData = {
      line_items: checkoutToken.line_items,
      customer: {
        firstname: firstName,
        lastname: lastName,
        email: email,
      },
      shipping: {
        name: shippingName,
        street: shippingStreet,
        town_city: shippingCity,
        county_state: shippingStateProvince, //texas
        postal_zip_code: shippingPostalZipCode, //77494
        country: shippingCountry, // US
      },
      fulfillment: {
        shipping_method: shippingOption,
      },
      billing: {
        name: shippingName,
        street: shippingStreet,
        town_city: shippingCity,
        county_state: shippingStateProvince,
        postal_zip_code: shippingPostalZipCode,
        country: shippingCountry,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: cardNum,
          expiry_month: expMonth,
          expiry_year: expYear,
          cvc: cvv,
          postal_zip_code: billingPostalZipCode,
        },
      },
    };
    const commerce = getCommerce(props.commercePublicKey);
    try {
      const order = await commerce.checkout.capture(
        checkoutToken.id,
        orderData
      );
      dispatch({ type: ORDER_SET, payload: order });
      localStorage.setItem("order_receipt", JSON.stringify(order));
      // await refreshCart();
      router.push("/confirmation");
    } catch (err) {
      console.log(err);
      const errList = [err.data.error.message];
      const errs = err.data.error.errors;
      for (const index in errs) {
        errList.push(`${index}: ${errs[index]}`);
      }
      setErrors(errList);
    }
  };

  // const refreshCart = async () => {
  //   const commerce = getCommerce(props.commercePublicKey);
  //   const newCart = await commerce.cart.refresh();
  //   dispatch({ type: CART_RETRIEVE_SUCCESS, payload: newCart });
  // };

  const handlerBack = () => {
    setErrors([]);
    setActiveStep((prev) => prev - 1);
  };

  const handlerShippingCountryChange = (e) => {
    const currentValue = e.target.value;
    setShippingCountry(currentValue);
    fetchSubdivisions(currentValue);
  };

  //Tìm và đưa vào Quốc gia vận chuyển từ commercejs
  const fetchShippingCountries = async (checkoutTokenId) => {
    const commerce = getCommerce(props.commercePublicKey);
    const countries = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries.countries);
  };
  //Tìm và đưa vào khu vực từ commercejs
  const fetchSubdivisions = async (countryCode) => {
    const commerce = getCommerce(props.commercePublicKey);
    const subdivisions = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions.subdivisions);
  };

  const handlerSubdivisionChange = (e) => {
    const currentValue = e.target.value;
    setShippingStateProvince(currentValue);
    fetchShippingOptions(checkoutToken.id, shippingCountry, currentValue);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const commerce = getCommerce(props.commercePublicKey);
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country: country,
        region: stateProvince,
      }
    );
    setShippingOptions(options);
    const shippingOption = options[0] ? options[0].id : null;
    setShippingOption(shippingOption);
  };

  const handlerShippingOptionChange = (e) => {
    const currentValue = e.target.value;
    setShippingOption(currentValue);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="FirstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="LastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingName"
              label="ShippingName"
              name="shippingName"
              onChange={(e) => setShippingName(e.target.value)}
              value={shippingName}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingStreet"
              label="ShippingStreet"
              name="shippingStreet"
              onChange={(e) => setShippingStreet(e.target.value)}
              value={shippingStreet}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingCity"
              label="ShippingCity"
              name="shippingCity"
              onChange={(e) => setShippingCity(e.target.value)}
              value={shippingCity}
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shippingPostalZipCode"
              label="Postal/Zip Code"
              name="postalCode"
              onChange={(e) => setShippingPostalZipCode(e.target.value)}
              value={shippingPostalZipCode}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="shippingCountry-label">Country</InputLabel>
              <Select
                labelId="shippingCountry-label"
                id="shippingCountry"
                label="Country"
                fullWidth
                onChange={handlerShippingCountryChange}
                value={shippingCountry}
                className={classes.mt1}
              >
                {Object.keys(shippingCountries).map((idx) => (
                  <MenuItem value={idx} key={idx}>
                    {shippingCountries[idx]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="shippingStateProvince-label">
                State / Province
              </InputLabel>
              <Select
                labelId="shippingStateProvince-label"
                id="shippingStateProvince"
                label="ShippingStateProvince"
                fullWidth
                required
                value={shippingStateProvince}
                onChange={handlerSubdivisionChange}
                className={classes.mt1}
              >
                {Object.keys(shippingSubdivisions).map((idx) => (
                  <MenuItem value={idx} key={idx}>
                    {shippingSubdivisions[idx]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="shippingOption-label">Shipping Option</InputLabel>
              <Select
                labelId="shippingOption-label"
                id="shippingOption"
                label="Shipping Option"
                onChange={handlerShippingOptionChange}
                fullWidth
                value={shippingOption}
                required
                className={classes.mt1}
              >
                {shippingOptions.map((method, idx) => (
                  <MenuItem value={method.id} key={idx}>
                    {`${method.description} - $${method.price.formatted_with_code}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cardNum"
              label="Card Number"
              name="cardNum"
              onChange={(e) => setCardNum(e.target.value)}
              value={cardNum}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expMonth"
              label="Expiry Month"
              name="expMonth"
              onChange={(e) => setExpMonth(e.target.value)}
              value={expMonth}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expYear"
              label="Expiry Year"
              name="expYear"
              onChange={(e) => setExpYear(e.target.value)}
              value={expYear}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cvv"
              label="CVV"
              name="cvv"
              onChange={(e) => setCvv(e.target.value)}
              value={cvv}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="billingPostalZipCode"
              label="ZipCode"
              name="billingPostalZipCode"
              onChange={(e) => setBillingPostalZipCode(e.target.value)}
              value={billingPostalZipCode}
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <Layout title="Checkout" commercePublicKey={props.commercePublicKey}>
      <Typography variant="h4" color="black" component="h1">
        Thanh toán
      </Typography>
      {cart.loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card className={classes.p1}>
              <form>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box>
                  {activeStep === steps.length ? (
                    errors && errors.length > 0 ? (
                      <Box>
                        <List>
                          {errors.map((error) => (
                            <ListItem key={error}>
                              <Alert severity="error">{error}</Alert>
                            </ListItem>
                          ))}
                        </List>
                        <Box className={classes.mt1}>
                          <Button
                            onClick={handlerBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <CircularProgress />
                        <Typography className={classes.instructions}>
                          Confirming Order...
                        </Typography>
                      </Box>
                    )
                  ) : (
                    <Box>
                      {getStepContent(activeStep)}
                      <Box className={classes.mt1}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handlerBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handlerNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1
                            ? "Confirm Order"
                            : "Next"}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </form>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">Order summary</Typography>
                </ListItem>
                {cart.data.line_items.map((lineItem) => (
                  <ListItem key={lineItem.id}>
                    <Grid container>
                      <Grid item xs={6}>
                        {lineItem.name} x {lineItem.quantity}
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          {lineItem.line_total.formatted_with_code}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Subtotal
                    </Grid>
                    <Grid item xs={6} align="right">
                      {cart.data.subtotal.formatted_with_code}
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

//Dynamic là 1 hàm từ next.js và set srr = false thì trang này sẽ chỉ được hiển thị ở client chứ k có ở BE
// export default dynamic(() => Promise.resolve(Checkout), {
//   srr: false,
// });
