import { useQuery } from "react-query";
import axios from "axios";
import dayjs from "dayjs";
import ReactApexChart from "react-apexcharts";
import { ThreeCircles } from "react-loader-spinner";
import { Box, CircularProgress } from "@mui/material";
import utc from 'dayjs/plugin/utc';

// Use the UTC plugin
dayjs.extend(utc);

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

interface Props {
  timesValue: string | null;
  stationValue: string | null;
}

function Chart({ stationValue, timesValue }: Props) {
  // Create a query using react-query
  const { data, isLoading, isError } = useQuery<Models[]>({
    queryKey: ["orders", stationValue, timesValue],
    queryFn: fetchData,
    refetchOnMount: true,
    cacheTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 60000, // for 1 minute interval
    onSuccess: () => console.log("data fetched with no problem"),
    onError: () => console.log("error fetching data"),
  });

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
      import.meta.env.VITE_IRD_RANGE_URL +
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

  const chartData = {
    series: [
      {
        name: "Link Margin",
        data:
          data?.map((d) => ({
            x: d.time,
            y: d.Link_Margin,
          })) || [],
      },
      {
        name: "C/N",
        data:
          data?.map((d) => ({
            x: d.time,
            y: d.C_N,
          })) || [],
      },
    ],

  };

  return (
    <>
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
        <ReactApexChart
          options={{
            chart: {
              id: "area-datetime",
              type: "area", // Change this to "area"
              height: 350,
              width: 350,
              zoom: {
                autoScaleYaxis: true,
              },
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,

                  customIcons: [],
                },
                export: {
                  csv: {
                    filename:
                      "ird_event_data - " +
                      stationValue +
                      " - " +
                      timesValue +
                      "day",
                    columnDelimiter: ",",
                    headerCategory: "timestamp",
                    headerValue: "data",
                    dateFormatter(timestamp) {
                      return  dayjs(timestamp).utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
                       ;
                    },
                  },
                  svg: {
                    filename:
                      "ird_event_data - " +
                      stationValue +
                      " - " +
                      timesValue +
                      "day",
                  },
                  png: {
                    filename:
                      "ird_event_data - " +
                      stationValue +
                      " - " +
                      timesValue +
                      "day",
                  },
                },
                autoSelected: "zoom",
              },
            },
            xaxis: {
              type: "datetime",
              labels: {
                datetimeUTC: true,
                datetimeFormatter: {
                  year: 'yyyy',
                  month: 'MMM \'yy',
                  day: 'dd MMM',
                  hour: 'HH:mm'
                }
              },
            },
            yaxis: {
              title: {
                text: "Link Margin (dB)",
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
              },
            },
          }}
          series={chartData.series}
          type="area"
          height={300}
        />
      )}
    </>
  );
}

export default Chart;
