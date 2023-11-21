import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeProvider } from "./ui/theme-provider";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "react-circular-progressbar/dist/styles.css";
import GuageForCN from "./Guage/GuageForCN";
import GuageForLM from "./Guage/GuageForLM";
import GuageForEbno from "./Guage/GuageForEbno";

interface Models {
  time: Date;
  Center: string;
  Station: string;
  Device_Name: string;
  IP: string;
  Lock_Carrier: string;
  C_N: number;
  Link_Margin: number;
  EbNo: number;
  Status: string;
}

interface Props {
  timesValue: string | null;
  stationValue: string | null;
}

function CardStat({ stationValue, timesValue }: Props) {
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

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mx-auto">
                {isLoading ? (
                  <Loading WidghtLoadingProps="250" />
                ) : (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          IRD C/N
                        </CardTitle>
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
                        <div className="text-2xl font-bold">
                          {data?.[0]?.C_N} dBc{" "}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {/* +180.1% from last month */}
                        </p>

                        <div className="flex justify-end">
                          <GuageForCN data={data} />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {isLoading ? (
                  <Loading WidghtLoadingProps="250" />
                ) : (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          IRD Link Margin
                        </CardTitle>
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
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {" "}
                          {data?.[0]?.Link_Margin} dB{" "}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {/* +180.1% from last month */}
                        </p>
                        <div className="flex justify-end">
                          <GuageForLM data={data} />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {isLoading ? (
                  <Loading WidghtLoadingProps="250" />
                ) : (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          IRD EbNo
                        </CardTitle>
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
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <path d="M2 10h20" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data?.[0]?.EbNo}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {/* +19% from last month */}
                        </p>
                        <div className="flex justify-end">
                          <GuageForEbno data={data} />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {isLoading ? (
                  <Loading WidghtLoadingProps="250" />
                ) : (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Status
                        </CardTitle>
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
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data?.[0]?.Status}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {/* +201 since last hour */}
                        </p>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CardStat;
