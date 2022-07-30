import { Insights_TimeSpent_Response } from "@sigmafit/commons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  BarElement,
  TimeSeriesScale,
  ArcElement,
  RadialLinearScale,
  LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import { useQuery } from "react-query";
import { ErrorResponse, getTimeSpentInsights } from "../api";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LineController
);

// Only for duration
export const TimeSpentChart = ({ height }: { height: number }) => {
  const { data: timeSpentData, isLoading } = useQuery<
    Insights_TimeSpent_Response,
    ErrorResponse
  >("getTimeSpentInsights", getTimeSpentInsights);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      {isLoading || !timeSpentData ? (
        <div className="alert">Loading...</div>
      ) : (
        <div>
          <Chart
            type="line"
            height={height}
            data={{
              labels: timeSpentData.dataPoints.map((e) => {
                const date = new Date(e.startTime);
                // return `${date.getDay()+1}/${month[date.getMonth()]}`
                return date;
              }),
              datasets: [
                {
                  data: timeSpentData.dataPoints.map((e) => e.duration), // in minutes
                  // backgroundColor: ['red', 'blue'],
                  cubicInterpolationMode: "monotone",
                  borderColor: "#2563eb",
                  // pointStyle,
                  // pointBorderColor: 'red',
                  // pointBackgroundColor: 'red',
                  // pointRadius: 4
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    title: function (this, tooltipItem) {
                      return `Session Name: ${
                        timeSpentData.dataPoints[tooltipItem[0].dataIndex]
                          .session_name
                      }`;
                    },
                    label(this, tooltipItem) {
                      return `Session Length: ${
                        timeSpentData.dataPoints[tooltipItem.dataIndex].duration
                      } minutes`;
                    },
                  },
                },
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                  },
                  title: {
                    display: true,
                    text: "Day",
                  },
                },
                y: {
                  stacked: false,
                  display: true,
                  title: {
                    display: true,
                    text: "Session Length (in minutes)",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};
