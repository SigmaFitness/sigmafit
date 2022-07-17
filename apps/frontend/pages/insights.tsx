import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
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
} from 'chart.js'
import { Chart } from "react-chartjs-2";
import { addHours } from 'date-fns'
import 'chartjs-adapter-date-fns';
import { StarIcon } from "@heroicons/react/solid";
import { useQueries, useQuery } from "react-query";
import { Insights_TimeSpent_Response, Insights_Workout_Response, WorkoutListResponse } from "@sigmafit/commons";
import { ErrorResponse, getAllWorkouts, getTimeSpentInsights, getWorkoutInsights } from "../api";
import { toast } from "react-toastify";
import { FormSingleSelectField, FormSingleSelectFormikField } from "../components/FormSingleSelectField";
import { Formik } from "formik";
import { DescriptionText } from "./sessionSchema/[id]/view";
import { MetaHead } from "../components/Head";
import { Navbar } from "../components/Navbar";
import { TimeSpentChart } from "../components/TimeSpentChart";


ChartJS.register(
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
    RadialLinearScale
)


const Insights = () => {

    const { data: workouts, isLoading } = useQuery<WorkoutListResponse, ErrorResponse>('getAllWorkouts', getAllWorkouts, {
        onSettled: (_, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    });

    const [currentLoadedWorkoutId, setCurrentLoadedWorkoutId] = useState('');


    const { data: workout_insights, isLoading: isWorkoutInsightsLoading, isFetching } = useQuery<Insights_Workout_Response, ErrorResponse>(['getWorkoutInsights', currentLoadedWorkoutId], () => getWorkoutInsights({ timeFrame: 'last_month', workout_id: currentLoadedWorkoutId }), {
        enabled: currentLoadedWorkoutId !== '',
        onSettled: (_, error) => {
            if (error) toast(error.message, { type: 'error' })
        }
    });


    const buildLabels = (data: Insights_Workout_Response['dataPoints']) => {
        const len = data.length

        const res: Date[] = []
        for (let i = 0; i < len;) {
            let j = i + 1;
            while (j < len && data[j].date === data[i].date) j++;
            // [i...j-1]
            const groupSize = j - i;
            const approxHours = 24 / groupSize
            // break 24 hrs to group size
            for (let k = i; k < j; k++) {
                const date = new Date(data[k].date)
                res.push(addHours(date, approxHours * (k - i)))
            }
            i = j;
        }
        return res
    }



    return (
        <>
            <MetaHead />
            <Navbar />

            <div className="max-w-2xl mx-auto px-2 prose mt-5">
                <h2 className="mb-5">Training Insights</h2>

                <h3>Session length by day</h3>
                <TimeSpentChart
                
                height={100}/>

                {isLoading || !workouts ? <div>Loading Workouts....</div> :
                    <>

                    <h3>Workout Insights</h3>
                        <FormSingleSelectField
                            fieldId="workout_id"
                            fieldLabel="Workout Name"
                            onChange={(val) => setCurrentLoadedWorkoutId(val.value)}
                            value={currentLoadedWorkoutId}
                            options={[...workouts.myWorkouts, ...workouts.publicWorkouts].map(e => ({ label: e.name, value: e.id }))}
                        />

                        {(isWorkoutInsightsLoading && isFetching) && <div>Loading...</div>}



                        {!isWorkoutInsightsLoading && !isFetching && workout_insights && <>

                            <LegendHelper />

                            <DescriptionText
                                name="Workout Type:"
                                value={workout_insights.workout_type}
                                type='gap-2'
                                size="med"
                            />

                            <DescriptionText
                                name="Number of data points:"
                                value={workout_insights.dataPoints.length}
                                type='gap-2'
                                size="med"
                            />

                            {workout_insights.workout_type === 'WEIGHT_AND_REPS' &&
                                // Print weight
                                <>
                                    <h3>Total Volume (kg)</h3>
                                    <SigmaFitChartComp
                                        labels={buildLabels(workout_insights.dataPoints)}
                                        toolTipLabelText='Weight'
                                        yAxisTitle='Weight (in kgs)'
                                        data={workout_insights.dataPoints.map(e => ('weight' in e.setValue ? e.setValue.weight : 1000000))}
                                        pointStyle={workout_insights.dataPoints.map(e => e.type === 'NORMAL' ? 'circle' : (e.type === 'DROPSET' ? 'triangle' : 'star'))}
                                        getTooltipText={(dataIndex) => `${workout_insights.dataPoints[dataIndex].date}, ${workout_insights.dataPoints[dataIndex].type}`}
                                    />
                                </>

                            }


                            {(workout_insights.workout_type === 'REPS' || workout_insights.workout_type === 'WEIGHT_AND_REPS') &&
                                // Print reps
                                <>
                                    <h3>Reps </h3>
                                    <SigmaFitChartComp
                                        labels={buildLabels(workout_insights.dataPoints)}
                                        toolTipLabelText='Reps'
                                        yAxisTitle='Count'
                                        data={workout_insights.dataPoints.map(e => ('reps' in e.setValue ? e.setValue.reps : 1000000))}
                                        pointStyle={workout_insights.dataPoints.map(e => e.type === 'NORMAL' ? 'circle' : (e.type === 'DROPSET' ? 'triangle' : 'star'))}
                                        getTooltipText={(dataIndex) => `${workout_insights.dataPoints[dataIndex].date}, ${workout_insights.dataPoints[dataIndex].type}`}
                                    />
                                </>
                            }

                            {(workout_insights.workout_type === 'DURATION' || workout_insights.workout_type === 'DISTANCE_AND_DURATION') &&
                                // Print duration 
                                <>
                                    <h3>Duration</h3>
                                    <SigmaFitChartComp
                                        labels={buildLabels(workout_insights.dataPoints)}
                                        toolTipLabelText='Duration'
                                        yAxisTitle='Duration (in minutes)'
                                        data={workout_insights.dataPoints.map(e => ('duration' in e.setValue ? e.setValue.duration : 1000000))}
                                        pointStyle={workout_insights.dataPoints.map(e => e.type === 'NORMAL' ? 'circle' : (e.type === 'DROPSET' ? 'triangle' : 'star'))}
                                        getTooltipText={(dataIndex) => `${workout_insights.dataPoints[dataIndex].date}, ${workout_insights.dataPoints[dataIndex].type}`}
                                    />
                                </>
                            }


                            {workout_insights.workout_type === 'DISTANCE_AND_DURATION' &&
                                // Print distance
                                <>
                                    <h3>Distance (in kms)</h3>
                                    <SigmaFitChartComp
                                        labels={buildLabels(workout_insights.dataPoints)}
                                        toolTipLabelText='Distance'
                                        yAxisTitle='Distance (in kms)'
                                        data={workout_insights.dataPoints.map(e => ('distance' in e.setValue ? e.setValue.distance : 1000000))}
                                        pointStyle={workout_insights.dataPoints.map(e => e.type === 'NORMAL' ? 'circle' : (e.type === 'DROPSET' ? 'triangle' : 'star'))}
                                        getTooltipText={(dataIndex) => `${workout_insights.dataPoints[dataIndex].date}, ${workout_insights.dataPoints[dataIndex].type}`}
                                    />
                                </>
                            }
                        </>}

                    </>}
            </div>

        </>
    )
}

export default Insights


const LegendHelper = () => (
    // TODO: 
    <div>
        {/* <div><StarIcon className="w-6 inline-block" /> <span>Normal</span></div>
                <div><StarIcon className="w-6 inline-block" /> <span>Superset</span></div>
                <div>< className="w-6 inline-block" /> <span>Dropset</span></div> */}
    </div>
)


const SigmaFitChartComp = ({ labels, data, pointStyle, getTooltipText, toolTipLabelText, yAxisTitle }: {
    labels: Date[],
    data: number[],
    pointStyle: ('star' | 'circle' | 'triangle')[],
    getTooltipText: (index: number) => string,
    yAxisTitle: string,
    toolTipLabelText: string
}) => {
    return (
        <Chart
            type="line"
            height={75}
            data={
                {
                    labels,
                    datasets: [
                        {
                            data,
                            label: toolTipLabelText,
                            cubicInterpolationMode: 'monotone',
                            borderColor: '#2563eb',
                            pointStyle,
                            pointBorderColor: 'red',
                            pointBackgroundColor: 'red',
                            pointRadius: 4

                        },
                    ],
                }
            }
            options={{
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: function (this, tooltipItem) {
                                return getTooltipText(tooltipItem[0].dataIndex)
                            },
                        }
                    },
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true
                        },
                        ticks: {
                            autoSkip: true
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                    },
                    y: {
                        stacked: false,
                        display: true,
                        title: {
                            display: true,
                            text: yAxisTitle
                        },
                    },
                },

            }}
        />
    )
}



