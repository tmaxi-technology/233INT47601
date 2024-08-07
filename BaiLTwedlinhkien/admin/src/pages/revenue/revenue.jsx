import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HOST } from "../../domain/host/host";
import { DatePicker } from "@mui/x-date-pickers";
import { Col, Row } from "react-bootstrap";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Revenue = () => {
  const URL_TOTALREVENUE = `${HOST}/totalRevenue`;
  const URL_TOTALREVENUEBYYEARS = `${HOST}/totalRevenueByYears`;
  const URL_DATACHARTMONTH = `${HOST}/dataChartMonth`;
  const URL_DATACHARTDAY = `${HOST}/dataChartDay`;

  const currentMonthIndex = new Date().getMonth() + 1;
  const currentYearIndex = new Date().getFullYear();

  const [totalRevenue, setTotalRevenue] = useState("");
  const [dataChartMonth, setDataChartMonth] = useState([]);
  const [dataChartDay, setDataChartDay] = useState([]);
  const [totalRevenueByYear, setTotalRevenueByYear] = useState("");
  const [getMonth, setMonth] = useState(currentMonthIndex);
  const [getYear, setYear] = useState(currentYearIndex);

  useEffect(() => {
    axios
      .get(
        `${URL_TOTALREVENUE}?month=${currentMonthIndex}&year=${currentYearIndex}`
      )
      .then((res) => setTotalRevenue(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${URL_DATACHARTMONTH}?year=${currentYearIndex}`)
      .then((res) => setDataChartMonth(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`${URL_DATACHARTDAY}?month=${currentMonthIndex}&year=${currentYearIndex}`)
      .then((res) => setDataChartDay(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (getMonth && getYear) {
      axios
        .get(
          `${URL_TOTALREVENUEBYYEARS}?month=${getMonth ? getMonth : currentMonthIndex
          }&year=${getYear ? getYear : currentYearIndex}`
        )
        .then((res) => setTotalRevenueByYear(res.data))
        .catch((err) => console.log(err));
    }
    setTotalRevenueByYear(0);
  }, [getMonth, getYear]);

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Trang chủ
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Quản lý kinh doanh
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Thống kê doanh thu
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              {/* body  */}
              <div
                className="card-body"
                style={{ height: "100%", position: "relative" }}
              >
                <h4 className="card-title">Thống kê doanh thu</h4>
                <br />
                <Card sx={{ minWidth: 275 }}>
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 28 }} color="text.secondary">
                      Doanh thu tháng {currentMonthIndex}:
                    </Typography>
                    <Typography variant="h4" component="div">
                      <span>
                        {totalRevenue ? totalRevenue.toLocaleString() : "0"}
                      </span>{" "}
                      VNĐ
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              {/* end body */}
            </div>
            <div
              style={{
                display: "block",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              <Card sx={{ minWidth: "60%", minHeight: "30%", margin: "5px" }}>
                <CardContent>
                  <Row sm={5}>
                    <Col sm={4}>
                      <Card>
                        <CardContent>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                              components={["YearCalendar", "MonthCalendar"]}
                            >
                              <DatePicker
                                label={'"month" and "year"'}
                                views={["month", "year"]}
                                onChange={(e) => {
                                  setMonth(e.$M + 1);
                                  setYear(e.$y);
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col sm={8}>
                      <Card>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Doanh thu tháng{" "}
                            {getMonth ? getMonth : currentMonthIndex}/
                            {getYear ? getYear : currentYearIndex}
                          </Typography>
                          <Typography variant="h5" component="div">
                            <span>
                              {totalRevenueByYear
                                ? totalRevenueByYear.toLocaleString()
                                : 0}
                            </span>{" "}
                            VNĐ
                          </Typography>
                        </CardContent>
                      </Card>
                    </Col>
                  </Row>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "60%", minHeight: "65%", margin: "5px" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 17 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    biểu đồ thống kê theo ngày trong tháng {currentMonthIndex}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <LineChart
                      width={1300}
                      height={450}
                      data={dataChartDay}
                      margin={{
                        top: 10,
                        right: 55,
                        left: 55,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        connectNulls
                        type="monotone"
                        dataKey="total_revenue"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </LineChart>
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "60%", minHeight: "65%", margin: "5px" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 17 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    biểu đồ thống kê theo tháng
                  </Typography>
                  <Typography variant="body1" component="div">
                    <LineChart
                      width={1300}
                      height={450}
                      data={dataChartMonth}
                      margin={{
                        top: 10,
                        right: 55,
                        left: 55,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        connectNulls
                        type="monotone"
                        dataKey="total_revenue"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </LineChart>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by admin Designed and Developed by{" "}
        <a href="#">
          B.N SHOP
        </a>
        .
      </footer>
    </div>
  );
};

export default Revenue;
