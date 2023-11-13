import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  data: Models[] | null;
}

function GuageForCN({ data }: Props) {
  return (
    <div style={{ width: 100, height: 100 }}>
      {data?.[0]?.C_N >= 18 ? (
        <CircularProgressbar
          value={data?.[0]?.C_N}
          maxValue={22}
          text={`${data?.[0]?.C_N}`}
          styles={buildStyles({
            pathColor: "blue",
            trailColor: "#CCD1D1 ",
          })}
        />
      ) : data?.[0]?.C_N && data?.[0]?.C_N >= 10 && data?.[0]?.C_N <= 18 ? (
        <CircularProgressbar
          value={data?.[0]?.C_N}
          maxValue={22}
          text={`${data?.[0]?.C_N}`}
          styles={buildStyles({
            pathColor: "#58D68D",
            trailColor: "#CCD1D1 ",
          })}
        />
      ) : data?.[0]?.C_N && data?.[0]?.C_N >= 5 && data?.[0]?.C_N <= 10 ? (
        <CircularProgressbar
          value={data?.[0]?.C_N}
          maxValue={22}
          text={`${data?.[0]?.C_N}`}
          styles={buildStyles({
            pathColor: "gold",
            trailColor: "#CCD1D1 ",
          })}
        />
      ) : (
        <CircularProgressbar
          value={data?.[0]?.C_N}
          maxValue={22}
          text={`${data?.[0]?.C_N}`}
          styles={buildStyles({
            pathColor: "red",
            trailColor: "#CCD1D1 ",
          })}
        />
      )}
    </div>
  );
}

export default GuageForCN;
