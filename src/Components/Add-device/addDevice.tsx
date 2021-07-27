import { AccountInfo } from "@azure/msal-browser";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import uploadFilesService from "../../Services/upload-files.service";
import './addDevicer.scss';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function createData(type: string, name: string, SN: number) {
  return { type, name, SN };
}

const brands = ["huawei", "solaredge"];
const hubs = ["ncnh6-hub", "uaigu-hub", "ihean-hub"];
const types = ["meters" ,"inverters" ,"sensors"];

const addDevice:boolean = false;

export default function AddDevice() {
  const classes = useStyles();
  // const [age, setAge] = useState<string | number>("");
  const [brand, setBrand] = useState<string | number>("");
  const [hub, setHub] = useState<string | number>("");
  // const [open, setOpen] = useState(false);
  const [deviceTXT, setdeviceTXT] = useState("false");
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState<string | number>("");
  const [type, setType] = useState<string | number>("");
  const [sites, setSites] = useState([]);
  const [siteD, setSiteD] = useState(0);
   // current authenticated user
   const [currentUser, setCurrentUser] = useState<AccountInfo>();
   let userAccountInfo : AccountInfo;

  useEffect(() => {
    let mounted = true;
    setCurrentUser(userAccountInfo);
    uploadFilesService.getSiteInfo().then((result) => {
      if (mounted) {
        console.log(result.data.site);

        setSites(result.data.site);
      }
    });
    //  mounted = false;
  }, []);

  

  

  // Render JSON data in readable format
  const PrettyPrintJson = ({ data }: any) => {
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  // Quick link - user revokes app's permission
  const ShowPermissionRevokeLinks = () => {
    return (
      <div>
        {/* <div><a href="https://myapps.microsoft.com" target="_blank" rel="noopener">Revoke AAD permission</a></div>
        <div><a href="https://account.live.com/consent/manage" target="_blank" rel="noopener">Revoke Consumer permission</a></div> */}
      </div>
    );
  };

  const handleChangeBrand = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBrand(event.target.value as string);
  };

  const handleCloseBrand = () => {
    // setOpen(false);
  };

  const handleOpenBrand = () => {
    // setOpen(true);
  };

  const handleChangeSites = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSiteD(event.target.value as number);

  };

  const handleCloseSites = () => {
    // setOpen(false);
  };

  const handleOpenSites = () => {
    // setOpen(true);
  };

  const handleChangeHub = (event: React.ChangeEvent<{ value: unknown }>) => {
    setHub(event.target.value as string);
  };

  const handleCloseHub = () => {
    // setOpen(false);
  };

  const handleOpenHub = () => {
    // setOpen(true);
  };

  const handleChangeDevice = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDevice(event.target.value as string);
  };

  const handleCloseDevice = () => {
    // setOpen(false);
  };

  const handleOpenDevice = () => {
    // setOpen(true);
  };

  const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
    getInventory(event.target.value);
  };

  const getInventory = (type) => {
    let str = "";
    setType(type)
    const data = {
      site: siteD,
      type: type,
    };

    return uploadFilesService.getInventorys(data)
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
        setDevices(rows);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseType = () => {
    // setOpen(false);
  };

  const handleOpenType = () => {
    // setOpen(true);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    
    
    let data ={
      brand,
      hub,
      device,
      deviceTXT,
      siteD,
      type,
    }
    console.log(data);
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Add Device
        </Typography>
        {addDevice && (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <FormControl style={{ margin: 1 }} fullWidth>
              <InputLabel id="demo-controlled-open-select-label">
                Select brand
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                // open={open}
                onClose={handleCloseBrand}
                onOpen={handleOpenBrand}
                value={brand}
                label="Brand"
                onChange={handleChangeBrand}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <FormControl style={{ margin: 1 }} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">
                  Select hub
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  // open={open}
                  onClose={handleCloseHub}
                  onOpen={handleOpenHub}
                  value={hub}
                  label="Hubs"
                  onChange={handleChangeHub}
                >
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {hubs.map((hub, index) => (
                    <MenuItem key={index} value={hub}>
                      {hub}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="deviceTXT"
                label="device"
                type="text"
                id="deviceTXT"
                value={deviceTXT}
                autoComplete="deviceTXT"
                onChange={e=>setdeviceTXT(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ margin: 1 }} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">
                  Select site
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  // open={open}
                  onClose={handleCloseSites}
                  onOpen={handleOpenSites}
                  value={siteD}
                  label="Sites"
                  onChange={handleChangeSites}
                >
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {sites.map((site, index) => (
                    <MenuItem key={index} value={site.id}>
                      {site.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <FormControl style={{ margin: 1 }} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">
                  Select type
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  // open={open}
                  onClose={handleCloseType}
                  onOpen={handleOpenType}
                  value={type}
                  label="Types"
                  onChange={handleChangeType}
                >
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {types.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            <Grid item xs={12}>
              <FormControl style={{ margin: 1 }} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">
                  Select device
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  // open={open}
                  onClose={handleCloseDevice}
                  onOpen={handleOpenDevice}
                  value={device}
                  label="Device"
                  onChange={handleChangeDevice}
                >
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {devices.map((device,index) => (
                    <MenuItem key={index} value={device.name}>
                      {device.SN}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Submit
          </Button>
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>

        )}
        {!addDevice && (
          
          <div>
            <h1>Comming Soon ....</h1>
            {currentUser && (
            <div>
              <PrettyPrintJson data={currentUser} />
              <ShowPermissionRevokeLinks />
            </div>
          )}
          </div>
          
        )}
        
      </div>
      <Box className="footer">
        <Copyright  />
      </Box>
    </Container>
  );
}
