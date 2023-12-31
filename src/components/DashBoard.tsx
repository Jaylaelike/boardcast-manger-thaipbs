import { SetStateAction } from "react";
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
import dayjs from "dayjs";
import StationList from "./StationList";
import Loading from "./Loading";
import { Box, CircularProgress } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import utc from 'dayjs/plugin/utc';

// Use the UTC plugin
dayjs.extend(utc);

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
  Station_Thai: string;
}



function DashBoard() {
  // const [openStation, setOpenStation] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [stationValue, setStationValue] = useState("1.chp_m");

  const [stationValue, setStationValue] = useSearchParams({
    q: "ชุมพร",
    t: "3",
  });
  const q: string | null = stationValue.get("q");
  const t: string | null = stationValue.get("t");

  // console.log(stationValue);
  // console.log(timesValue);

  const { data, isLoading, isError } = useQuery<Models[]>({
    queryKey: ["orders", q, t],
    queryFn: fetchData,
    cacheTime: 5000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 60000, // for 1 minute interval
    onSuccess: () => console.log("data fetched with no problem"),
    onError: () => console.log("error fetching data"),
  });


  // const queryClient = useQueryClient();
  // const { data, isError, isLoading } = useMutation<Models[]>({
  //   mutationFn: fetchData,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['orders' ,q ,t] });
  //     console.log("data fetched with no problem");
  //   },
  //   onError: () => {
  //     console.log("error fetching data");
  //   },
  // });

  console.log(data);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching data</div>;
  // }

  // Fetch data based on the query
  async function fetchData() {
    const res = await axios.get(
      import.meta.env.VITE_IRD_RANGE_URL + `${q}` + "/" + `${t}`
    );

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error("Network response was not ok");
    }
  }

  //Setect Station
  const handleOptionSelected = (value: SetStateAction<string>) => {
    setStationValue((prev) => {
      prev.set("q", value as string);
      return prev;
    });
    console.log(setStationValue);
  };

  //Setect Times
  const handleOptionSelectedTimes = (value: SetStateAction<string>) => {
    setStationValue((prev) => {
      prev.set("t", value as string);
      return prev;
    });
    console.log(setStationValue);
  };

  return (
    <>
      {isError ? (
        <>
          <div className="mx-auto flex flex-col items-center justify-center space-y-2 pb-2 w-screen">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 text-red-500">
              Error Fetching data...
            </h2>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      ) : (
        <>
          <div className="grid justify-items-end p-3">
            <StationList
              onOptionSelected={handleOptionSelected}
              onOptionSelectedTimes={handleOptionSelectedTimes}
            />
            {/* {selectTimeItems(open, setOpen,  t!, q!)} */}
          </div>
          <div className="p-2">
            <div className="grid justify-items-stretch">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {isLoading ? (
                  <Loading WidghtLoadingProps="250" />
                ) : (
                  <>
                    <Card className="col-span-4 flex">
                      <CardHeader className="flex flex-row items-top justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-medium">
                          Station 
                        </CardTitle>
                 
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold pb-2">
                          {data?.[0]?.Station_Thai}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Time:{" "}
                          {
                            dayjs(data?.[0]?.time).utcOffset(0).format("DD-MM-YYYY HH:mm:ss")
                          }


                        </p>
                      </CardContent>
                      <div className="col-span-4 flex-col p-3">
                        <img
                          src="https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png"
                          alt="IRD Image"
                        />
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <CardStat stationValue={q} timesValue={t} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Chart stationValue={q} timesValue={t} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Data</CardTitle>
            <CardDescription>IRD data event for time serires.</CardDescription>
          </CardHeader>

          {isLoading ? (
            <div className="flex justify-center items-center p-1">
              <ThreeCircles
                height="100"
                width="100"
                color="#E11D48"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center p-2">
              <>
                <div className="mx-auto flex flex-col items-center justify-center space-y-2 pb-2 w-screen">
                  <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 text-red-500">
                    Error Fetching data...
                  </h2>
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              </>
            </div>
          ) : (
            <CardContent>
              <DataTableDemo data={data || []} />
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}

export default DashBoard;


// function selectTimeItems(
//   open: boolean,
//   setOpen: Dispatch<SetStateAction<boolean>>,
//   t: string | null,
//   setStationValue: Dispatch<SetStateAction<string>>
// ) {
//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           {t
//             ? times.find((framework) => framework.value === t)?.label
//             : "Select framework..."}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search framework..." />
//           <CommandEmpty>No framework found.</CommandEmpty>
//           <CommandGroup>
//             {times.map((framework) => (
//               <CommandItem
//                 key={framework.value}
//                 onSelect={(currentValue) => {
//                   setStationValue(currentValue === t ? "" : currentValue);
//                   setOpen(false);
//                 }}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     t === framework.value ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//                 {framework.value}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
