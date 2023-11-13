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

function GuageForEbno({ data }: Props) {
  return (
    <div style={{ width: 100, height: 100 }}>
      {data?.[0]?.EbNo >= 14 ? (
        <CircularProgressbar
          value={data?.[0]?.EbNo}
          maxValue={22}
          text={`${data?.[0]?.EbNo}`}
          styles={buildStyles({
            pathColor: "blue",
            trailColor: "#CCD1D1",
          })}
        />
      ) : data?.[0]?.EbNo && data?.[0]?.EbNo >= 8 && data?.[0]?.EbNo <= 14 ? (
        <CircularProgressbar
          value={data?.[0]?.EbNo}
          maxValue={22}
          text={`${data?.[0]?.EbNo}`}
          styles={buildStyles({
            pathColor: "#58D68D",
            trailColor: "#CCD1D1",
          })}
        />
      ) : data?.[0]?.EbNo && data?.[0]?.EbNo >= 5 && data?.[0]?.EbNo <= 8 ? (
        <CircularProgressbar
          value={data?.[0]?.EbNo}
          maxValue={22}
          text={`${data?.[0]?.EbNo}`}
          styles={buildStyles({
            pathColor: "gold",
            trailColor: "#CCD1D1",
          })}
        />
      ) : (
        <CircularProgressbar
          value={data?.[0]?.EbNo}
          maxValue={22}
          text={`${data?.[0]?.EbNo}`}
          styles={buildStyles({
            pathColor: "red",
            trailColor: "#CCD1D1",
          })}
        />
      )}
    </div>
  );
}

export default GuageForEbno;
