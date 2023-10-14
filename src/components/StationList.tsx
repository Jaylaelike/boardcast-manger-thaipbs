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
}

interface StationListProps {
  onOptionSelected: (value: string) => void;

}
  



function StationList({
  onOptionSelected,

}: StationListProps): JSX.Element {
  const [options, setOptions] = useState<Station[]>([]);
  const [selectedValue, setSelectedValue] = useState<Station | null>(null);

  useEffect(() => {
    fetchDataFromAPI()
      .then((data) => setOptions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get<Station[]>(
        "http://192.168.1.198:4000/api/station/Station"
      );
      return response.data;
    } catch (error) {
      throw new Error("API request failed");
    }
  };

  const handleOptionSelected = (
    _event: React.ChangeEvent<unknown>,
    value: Station | null
  ) => {
    setSelectedValue(value);
    if (value) {
      onOptionSelected(value.Station);
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
        getOptionLabel={(option) => option.Station}
        onChange={handleOptionSelected}
        value={selectedValue}
        sx={{ width: 300 }}
        renderInput={(params: object) => (
          <TextField {...params} label= "สถานี" />
        )}
      />
    
    
    </ScopedCssBaseline>
    </ThemeProvider>
   
  );
}

export default StationList;
