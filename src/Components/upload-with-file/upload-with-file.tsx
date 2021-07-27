import { Box, Button, Typography, withStyles } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import UploadService from "../../Services/upload-files.service";
import "./upload-files.scss";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

export default function UploadWithFile() {
  // const [value, setValue] = React.useState(0);

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  // const [fileInfos, setFileInfos] = useState([]);
  const progressInfosRef = useRef(null);
  // const [alert, setAlert] = useState(false);
  // const classes = useStyles();
  // const history = useHistory();
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set<number>());
  const [res, setRes] = useState([]);

  // const steps = getSteps();

  // useEffect(() => {
  //   UploadService.getFiles().then((response) => {
  //     setFileInfos(response.data);
  //   });
  // }, []);
  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step);
  // };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  const selectFile = (event) => {
    if (event.target.files["length"] > 0) {
      setSelectedFiles(event.target.files);
      setProgressInfos({ val: [] });
    }
  };

  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then((result) => {
        // setMessage((prevMessage) => [
        //   ...prevMessage,
        //   result.data.message,
        // ]);

        setRes(result.data.message.filter(Boolean));
        // history.push('/upload')
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => [
          ...prevMessage,
          "Could not upload the file: " + file.name,
        ]);
      });
  };

  const handleSearch = (event) => {
    return UploadService.getDevice(event.target.value)
      .then((result) => {
        setMessage([result.data.message]);
      })
      .catch(() => {});
  };

  const uploadFiles = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file["name"],
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    files.map((file, i) => upload(i, file)); 

    // Promise.all(uploadPromises)
    //   .then(() => UploadService.getFiles())
    //   .then((files) => {
    //     setFileInfos(files.data);
    //   });

    setMessage([]);
  };

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#EEEEEE",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);

  return (
    <div className="mg20">
      <Box sx={{ width: "100%" }}>
        {/* {alert ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
          </Alert>
        ) : (
          <></>
        )} */}
        {progressInfos &&
          progressInfos.val.length > 0 &&
          progressInfos.val.map((progressInfo, index) => (
            <Box className="mb25" display="flex" alignItems="center">
              <span key={index}>{progressInfo.fileName}</span>
              <Box width="50%" mr={1}>
                <BorderLinearProgress
                  variant="determinate"
                  value={progressInfo.percentage}
                />
              </Box>

              <Box minWidth={35}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${progressInfo.percentage}%`}</Typography>
              </Box>
            </Box>
          ))}

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
        <br />

        <label htmlFor="btn-upload">
          <input
            multiple
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            accept=".csv"
            onChange={selectFile}
          />
          <Button className="btn-choose" variant="outlined" component="span">
            Choose Files
          </Button>
        </label>
        <div className="file-name">
          {selectedFiles && selectedFiles.length > 0
            ? `${selectedFiles.length} file`
            : null}
        </div>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFiles}
          onClick={uploadFiles}
        >
          Upload
        </Button>
       

        <Typography variant="h6" className="list-header">
          List of Files
        </Typography>
        {res.length > 0 && 
          res.map((e) => {
            return (
              <div>
                {" "}
                <Alert variant="outlined" severity="success">
                  { e}
                </Alert>
              </div>
            );
          })}
        {/* <ul className="list-group">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <ListItem
                divider
                key={index}>
                <a href={file.url}>{file.name}</a>
              </ListItem>
            ))}
        </ul> */}
        {/* <TabPanel value={value} index={1}>
        <RepairData/>
        </TabPanel> */}
      </Box>
    </div>
  );
}
