import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
interface Station {
  time: Date;
  Center: string;
  Station: string;
  Device_Name: string;
  IP: string;
  Lock_Carrier: string;
  C_N: string;
  Link_Margin: string;
  EbNo: string;
  Status: string;
  Station_Thai: string;
}

const times = [
  {
    values: "3",
    label: "3 days",
  },
  {
    values: "5",
    label: "5 days",
  },
  {
    values: "7",
    label: "weeks",
  },
  {
    values: "14",
    label: "2 weeks",
  },
  {
    values: "30",
    label: "Months",
  },
];

interface TimesProps {

  values: string;
  label: string;
}

interface StationListProps {
  onOptionSelected: (value: string) => void;
  onOptionSelectedTimes: (value: string) => void;

}
  



function StationList({
  onOptionSelected,
  onOptionSelectedTimes

}: StationListProps): JSX.Element {
  const [options, setOptions] = useState<Station[]>([]);
  const [selectedValue, setSelectedValue] = useState<Station | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<TimesProps | null>(null);
  const [optionsTimes, setOptionsTimes] = useState<TimesProps[]>([]);

  useEffect(() => {
    fetchDataFromAPI()
      .then((data) => setOptions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get<Station[]>(
        import.meta.env.VITE_IRD_STATION_URL
      );
      return response.data;
    } catch (error) {
      throw new Error("API request failed");
    }
  };

  //fect data from times[]
  useEffect(() => {
    setOptionsTimes(times);
  }, []);



  const handleOptionSelected = (
    _event: React.ChangeEvent<unknown>,
    value: Station | null
  ) => {
    setSelectedValue(value);
    if (value) {
      onOptionSelected(value.Station_Thai);
    }
  };

  const handleOptionSelectedTimes = (
    _event: React.ChangeEvent<unknown>,
    value: TimesProps | null
  ) => {
    setSelectedTimes(value);
    if (value) {
      onOptionSelectedTimes(value.values);
    }
  };



  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

  return (
    <ThemeProvider theme={darkTheme}>
    <ScopedCssBaseline>
    
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.Station_Thai}
        onChange={handleOptionSelected}
        value={selectedValue}
        sx={{ width: 200}}
        renderInput={(params: object) => (
          <TextField {...params} label= "สถานี" />
        )}
      />
      
       <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={ optionsTimes}
      getOptionLabel={(option) => option.label}
      onChange={handleOptionSelectedTimes}
      value={selectedTimes}
      sx={{ width: 200}}
      renderInput={(params) => <TextField {...params} label="Times" />}
    />


    
    </ScopedCssBaseline>
    </ThemeProvider>
   
  );
}

export default StationList;
