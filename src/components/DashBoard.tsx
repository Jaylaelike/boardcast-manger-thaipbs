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

const stations = [
  {
    value: "1.chp_m",
    label: "1.CHP_M",
  },
  {
    value: "2.rng_m",
    label: "2.rng_m",
  },
  {
    value: "3.pkk_m",
    label: "3.pkk_m",
  },
  {
    value: "4.hua_a1",
    label: "4.hua_a1",
  },
  {
    value: "1.bkk_m",
    label: "1.bkk_m",
  },
  
];

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

interface Models {
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
  const [openStation, setOpenStation] = useState(false);
  const [open, setOpen] = useState(false);
  const [stationValue, setStationValue] = useState("1.chp_m");
  const [timesValue, setTimeValue] = useState("10");
  // console.log(stationValue);
  // console.log(timesValue);


  const { data, isLoading, isError } = useQuery<Models[]>({
    queryKey: ["orders", stationValue, timesValue ],
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

  return (
    <>
      <div className="p-4">
        {selectStationItems(
          openStation,
          setOpenStation,
          stationValue,
          setStationValue
        )}
        {selectTimeItems(open, setOpen, timesValue, setTimeValue)}
        <div className="col-2 mx-auto flex  items-center justify-center px-2 space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
           Station : {data?.[0]?.Station} , Time: {moment(data?.[0]?.time).format('DD-MM-YYYY HH:mm:ss')}
          </h2>
          
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
              <DataTableDemo />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

function selectStationItems(
  open: boolean,
  setOpenStation: Dispatch<SetStateAction<boolean>>,
  stationValue: string,
  setStationValue: Dispatch<SetStateAction<string>>
) {
  return (
    <Popover open={open} onOpenChange={setOpenStation}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {stationValue
            ? stations.find((framework) => framework.value === stationValue)
                ?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {stations.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setStationValue(
                    currentValue === stationValue ? "" : currentValue
                  );
                  setOpenStation(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    stationValue === framework.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

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
