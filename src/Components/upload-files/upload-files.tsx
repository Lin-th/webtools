import {
  Box, Typography
} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
// import UploadService from "../../Services/upload-files.service";
import UploadWithApi from "../upload-with-api/upload-with-api";
import UploadWithFile from "../upload-with-file/upload-with-file";
// import "./upload-files.scss";



// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: "100%",
//       "& > * + *": {
//         marginTop: theme.spacing(2),
//       },
//     },
//     button: {
//       marginRight: theme.spacing(1),
//     },
//     instructions: {
//       marginTop: theme.spacing(1),
//       marginBottom: theme.spacing(1),
//     },
//   })
// );

// function getSteps() {
//   return ["Select campaign settings", "Create an ad group", "Create an ad"];
// }

// function getStepContent(step: number) {
//   switch (step) {
//     case 0:
//       return "Select campaign settings...";
//     case 1:
//       return "What is an ad group anyways?";
//     case 2:
//       return "This is the bit I really care about!";
//     default:
//       return "Unknown step";
//   }
// }

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UploadFile() {
  const [value, setValue] = React.useState(0);

  // const [selectedFiles, setSelectedFiles] = useState(undefined);
  // const [progressInfos, setProgressInfos] = useState({ val: [] });
  // const [message, setMessage] = useState([]);
  // const [fileInfos, setFileInfos] = useState([]);
  // const progressInfosRef = useRef(null);
  // const [alert, setAlert] = useState(false);
  // const classes = useStyles();
  // const history = useHistory();
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set<number>());
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const selectFile = (event) => {
  //   if (event.target.files["length"] > 0) {
  //     setSelectedFiles(event.target.files);
  //     // setProgressInfos({ val: [] });
  //   }
  // };

  // const upload = (idx, file) => {
  //   let _progressInfos = [...progressInfosRef.current.val];
  //   return UploadService.upload(file, (event) => {
  //     _progressInfos[idx].percentage = Math.round(
  //       (100 * event.loaded) / event.total
  //     );
  //     setProgressInfos({ val: _progressInfos });
  //   })
  //     .then(() => {
  //       setMessage((prevMessage) => [
  //         ...prevMessage,
  //         "Uploaded the file successfully: " + file.name,
  //       ]);
  //       // history.push('/upload')
  //     })
  //     .catch(() => {
  //       _progressInfos[idx].percentage = 0;
  //       setProgressInfos({ val: _progressInfos });

  //       setMessage((prevMessage) => [
  //         ...prevMessage,
  //         "Could not upload the file: " + file.name,
  //       ]);
  //     });
  // };

  // const handleSearch = (event) => {
  //   return UploadService.getDevice(event.target.value)
  //   .then((result) => {
  //       setMessage([result.data.message]);
  //     })
  //     .catch(() => {
        
  //     });
  // };

  // const uploadFiles = () => {
  //   const files = Array.from(selectedFiles);

  //   let _progressInfos = files.map((file) => ({
  //     percentage: 0,
  //     fileName: file["name"],
  //   }));

  //   progressInfosRef.current = {
  //     val: _progressInfos,
  //   };

    // const uploadPromises = files.map((file, i) => upload(i, file));

    // Promise.all(uploadPromises)
    //   .then(() => UploadService.getFiles())
    //   .then((files) => {
    //     setFileInfos(files.data);
    //   });

    // setMessage([]);
  // };

  // const BorderLinearProgress = withStyles((theme) => ({
  //   root: {
  //     height: 15,
  //     borderRadius: 5,
  //   },
  //   colorPrimary: {
  //     backgroundColor: "#EEEEEE",
  //   },
  //   bar: {
  //     borderRadius: 5,
  //     backgroundColor: "#1a90ff",
  //   },
  // }))(LinearProgress);

  return (
    <div className="mg20">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Repair with CSV" {...a11yProps(0)} />
            <Tab label="Repair with API" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         <UploadWithFile/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <UploadWithApi/>
        </TabPanel>
       
      </Box>
    </div>
  );
}
