import { Box, Button, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import UploadService from "../../Services/upload-files.service";


function createData(type: string, name: string, SN: number) {
  return { type, name, SN };
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ต๋าวงายยยย
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
    // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    //   width: 600,
    //   marginLeft: "auto",
    //   marginRight: "auto",
    // },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  // button: {
  //   marginTop: theme.spacing(3),
  //   marginLeft: theme.spacing(1),
  // },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  table: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function UploadWithApi() {
  const classes = useStyles();
  // const [value, setValue] = React.useState("");
  const [message, setMessage] = useState([]);
  const [res, setRes] = useState([]);
  const [rows, setRows] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  // const [alert, setAlert] = useState(false);
  // const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [site, setSite] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);
  const [inventory, setInventory] = React.useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceSn, setDeviceSn] = useState("");
  const [deviceSTime, setDeviceSTime] = useState("");
  const [deviceETime, setDeviceETime] = useState("");
  const [type, setType] = useState("");
  const date = new Date();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSite(event.target.value as number);
  };

  const handleChangeInventory = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    // console.log(event.target.value);
    getInventory(event.target.value);

    setInventory(event.target.value as string);
  };

  const getInventory = (type) => {
    let str = "";
    setType(type);
    const data = {
      site: site,
      type: type,
    };

    return UploadService.getInventorys(data)
      .then((result) => {
        let rows = [];
        for (const deviceData of result.data) {
          if (type === "meters") {
            if (deviceData.name === "Consumption Meter") {
              rows.push(
                createData(
                  deviceData.type,
                  deviceData.name,
                  deviceData.connectedSolaredgeDeviceSN
                )
              );
            }
          } else if (type === "inverters") {
            rows.push(createData(type, deviceData.name, deviceData.SN));
          } else {
            if (deviceData.connectedSolaredgeDeviceSN !== str) {
              str = deviceData.connectedSolaredgeDeviceSN;
              rows.push(
                createData(
                  type,
                  deviceData.connectedTo,
                  deviceData.connectedSolaredgeDeviceSN
                )
              );
            }
          }
        }
        setRows(rows);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log((event.target as HTMLInputElement).value);
    setDeviceSn((event.target as HTMLInputElement).value);
    // setValue((event.target as HTMLInputElement).value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleFinish = () => {
    let data = {
      siteid: site,
      sn: deviceSn,
      startTime: deviceSTime,
      endTime: deviceETime,
    };
    let tag = "";
    if (type === "meters") {
      tag = "PACTO";
      UploadService.getValueGrid(data)
        .then((result) => {
          UploadService.repairData(result.data, deviceId, tag, data.startTime)
            .then((result) => {
              setRes(result.data.message)
              // setRes(["Success"]);

              // console.log(result.data);
              ;
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (type === "inverters") {
      tag = "IPOAT";
      UploadService.getInverterTechnicalData(data)
        .then((result) => {
          UploadService.repairData(result.data, deviceId, tag, data.startTime)
            .then((result) => {
              setRes(result.data.message)
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      tag = "";
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSubmit = () => {
  //   return;
  // };

  const handleReset = () => {
    setSite(0);
    setInventory("");
    setRows([]);
    setDeviceSn("");
    setDeviceSTime("");
    setDeviceETime("");
    setMessage([]);
    setActiveStep(0);
  };

  const handleGetsite = () => {
    return UploadService.getSiteInfo()
      .then((result) => {
        // console.log(result.data.site);

        setDropdown(result.data.site);
      })
      .catch((err) => {});
  };

  const handleSearch = (event) => {
    setDeviceId(event.target.value);
    return UploadService.getDevice(event.target.value)
      .then((result) => {
        setMessage([result.data.message]);
        setTimeout(function () {
          // setAlert(false);
        }, 5000);
      })
      .catch(() => {});
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <TextField
          id="standard-basic"
          label="DeviceId"
          variant="standard"
          onChange={(event) => handleSearch(event)}
        />
      </Box>
      {message.length > 0 && (
        <Typography variant="subtitle2" className="">
          {message.map((item, i) => {
            let str = item.includes("Not") ? (
              <Alert severity="error">
                <strong>{item}</strong>
              </Alert>
            ) : (
              <Alert severity="success">
                <strong>{item}</strong>
              </Alert>
            );
            return str;
          })}
        </Typography>
      )}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Paper square elevation={0}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </Paper>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* {getStepContent(activeStep)} */}
                {activeStep === 0 ? (
                  <div style={{display:"block",marginLeft:"auto",marginRight:"auto"}}>
                    <FormControl style={{ margin: 1, minWidth: "100vh", }}>
                      <InputLabel id="demo-controlled-open-select-label">
                        Site
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        fullWidth
                        open={open}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        value={site}
                        label="Site"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdown.map((e, index) => {
                          return (
                            <MenuItem key={index} value={e.id}>
                              {e.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={handleGetsite}
                      style={{ marginTop: "1%", marginLeft: "2%" }}
                      variant="contained"
                      size="medium"
                    >
                      Get site
                    </Button>
                  </div>
                ) : activeStep === 1 ? (
                  <div>
                    <Box style={{ minWidth: "100vh" }}>
                      <FormControl style={{ minWidth: "100vh" }}>
                        <InputLabel id="demo-simple-select-label">
                          Inventory
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={inventory}
                          label="Inventory"
                          fullWidth
                          onChange={handleChangeInventory}
                        >
                          <MenuItem value="meters">Grid meter</MenuItem>
                          <MenuItem value="inverters">Inverter</MenuItem>
                          <MenuItem value="sensors">Sensors</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {rows.length > 0 && (
                      <TableContainer component={Paper}>
                        <Table
                          style={{ minWidth: 650 }}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Type</TableCell>
                              <TableCell align="right">name</TableCell>
                              <TableCell align="right">SN</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.name}
                                className={classes.table}
                              >
                                <TableCell component="th" scope="row">
                                  <RadioGroup
                                    aria-label="gender"
                                    name="controlled-radio-buttons-group"
                                    value={deviceSn}
                                    onChange={handleChangeRadio}
                                  >
                                    <FormControlLabel
                                      value={row.SN}
                                      control={<Radio />}
                                      label=""
                                    />
                                  </RadioGroup>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {row.type}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.SN}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3>deviceID : {deviceId} </h3>
                    <h3>siteName : {site} </h3>
                    <h3>deviceSN :{deviceSn}</h3>
                    <form className={classes.container} noValidate>
                      <TextField
                        fullWidth={true}
                        id="datetime-local"
                        label="start-date"
                        type="datetime-local"
                        defaultValue={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setDeviceSTime(e.target.value)}
                      />
                    </form>
                    <br />
                    <form className={classes.container} noValidate>
                      <TextField
                        fullWidth={true}
                        id="datetime-local"
                        label="end-date"
                        type="datetime-local"
                        defaultValue={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setDeviceETime(e.target.value)}
                      />
                    </form>
                  </div>
                )}
                <br />
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFinish}
                      className={classes.button}
                    >
                      Finish
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Continue
                    </Button>
                  )}
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'} 
                </Button> */}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {res.length > 0 &&
        res.map((e) => {
          return (
            <div>
              {" "}
              <Alert variant="outlined" severity="success">
                {e}
              </Alert>
            </div>
          );
        })}
        <Copyright />
      </main>
      
    </React.Fragment>
  );
}
