import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import CardStat from "./CardStat";
import Chart from "./Chart";
import { DataTableDemo } from "./payments/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import StationList from "./StationList";


const times = [
  {
    value: "10",
    label: "10 days",
  },
  {
    value: "15",
    label: "15 days",
  },
  {
    value: "20",
    label: "20 days",
  },
];

export interface Models {
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

function DashBoard() {
  // const [openStation, setOpenStation] = useState(false);
  const [open, setOpen] = useState(false);
  const [stationValue, setStationValue] = useState("1.chp_m");
  const [timesValue, setTimeValue] = useState("10");

  // console.log(stationValue);
  // console.log(timesValue);

  const { data, isLoading, isError } = useQuery<Models[]>({
    queryKey: ["orders", stationValue, timesValue],
    queryFn: fetchData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 5000,
    onSuccess: () => console.log("data fetched with no problem"),
    onError: () => console.log("error fetching data"),
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Fetch data based on the query
  async function fetchData() {
    const res = await axios.get(
      "http://192.168.1.198:4000/api/ird_range/" +
        `${stationValue}` +
        "/" +
        `${timesValue}`
    );

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error("Network response was not ok");
    }
  }

  const handleOptionSelected = (value: SetStateAction<string>) => {
    setStationValue(value);
    console.log(setStationValue);
  };

  return (
    <>
      <div className="grid justify-items-end p-3">
        <StationList onOptionSelected={handleOptionSelected} />
        {selectTimeItems(open, setOpen, timesValue, setTimeValue)}
      </div>
      <div className="p-2">
        <div className="grid justify-items-stretch">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Station</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.[0]?.Station}</div>
                <p className="text-xs text-muted-foreground">
                  Time: {moment(data?.[0]?.time).format("DD-MM-YYYY HH:mm:ss")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CardStat stationValue={stationValue} timesValue={timesValue} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Chart stationValue={stationValue} timesValue={timesValue} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Data</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTableDemo data={data || []} />

            

          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default DashBoard;

// function selectStationItems(
//   open: boolean,
//   setOpenStation: Dispatch<SetStateAction<boolean>>,
//   stationValue: string,
//   setStationValue: Dispatch<SetStateAction<string>>
// ) {
//   return (
//     <Popover open={open} onOpenChange={setOpenStation}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           {stationValue
//             ? stations.find((framework) => framework.value === stationValue)
//                 ?.label
//             : "Select framework..."}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search framework..." />
//           <CommandEmpty>No framework found.</CommandEmpty>
//           <CommandGroup>
//             {stations.map((framework) => (
//               <CommandItem
//                 key={framework.value}
//                 onSelect={(currentValue) => {
//                   setStationValue(
//                     currentValue === stationValue ? "" : currentValue
//                   );
//                   setOpenStation(false);
//                 }}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     stationValue === framework.value
//                       ? "opacity-100"
//                       : "opacity-0"
//                   )}
//                 />
//                 {framework.label}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

function selectTimeItems(
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  timesValue: string,
  setTimeValue: Dispatch<SetStateAction<string>>
) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {timesValue
            ? times.find((framework) => framework.value === timesValue)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {times.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setTimeValue(currentValue === timesValue ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    timesValue === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
