import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import { ThreeCircles } from "react-loader-spinner";
import { Box, CircularProgress } from "@mui/material";

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
  const { data, isLoading , isError} = useQuery<Models[]>({
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

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching data</div>;
  // }

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

  const chartData = {
    series: [
      {
        name: "Link Margin",
        data:
          data?.map((d) => ({
            x: moment(d.time).format("MM-DD-YYYY HH:mm:ss"),
            y: d.Link_Margin,
          })) || [],
      },
      {
        name: "C/N",
        data:
          data?.map((d) => ({
            x: moment(d.time).format("MM-DD-YYYY HH:mm:ss"),
            y: d.C_N,
          })) || [],
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
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
        selection: "one_year",
      },
    },
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
                },
                xaxis: {
                  type: "datetime",
                  labels: {
                    datetimeUTC: false,
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
