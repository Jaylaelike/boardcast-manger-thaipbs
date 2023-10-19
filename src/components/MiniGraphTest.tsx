import ReactApexChart from "react-apexcharts";

const series = [
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70],
  },
];

function LineChart() {
  return (
    <ReactApexChart
      options={{
        chart: {
          id: "area",
          type: "area",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          labels: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#00a152", "#00e676", "#33eb91"],
      }}
      series={series}
      type="area"
      height={120}
      width={90}
    />
  );
}

function MiniGraphTest() {
  return (
    <div>
      <LineChart />
    </div>
  );
}

export default MiniGraphTest;
