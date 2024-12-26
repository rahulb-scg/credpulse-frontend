"use client"

import DashboardContainer from "@/components/layout/dashboard-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedBarchart, getFakeAnimatedHistogramData } from "@components/echarts/AnimatedBarchart"
import AreaChart, { getFakeAreaChartData } from "@components/echarts/AreaChart"
import Clustering, { getFakeClusteringData } from "@components/echarts/Clustering"
import PieChart, { getFakePieChartData } from "@components/echarts/PieChart"
import PolyChart, { generatePolyChartDataset } from "@components/echarts/PolyChart"
import Regression, { getFakeRegressionData, RegressionPattern } from "@components/echarts/Regression"
import { getFakeThreeAxisBarGraphData, ThreeAxisBarChart } from "@components/echarts/ThreeAxisBarChart"
import React, { useState, useEffect } from "react"

export type GraphData = {
  name: string
  uploadedName: string
}

export default function Visualization() {
  const [chartData, setChartData] = useState({
    animatedHistogramData_one: getFakeAnimatedHistogramData(10),
    animatedHistogramData_two: getFakeAnimatedHistogramData(10),
    areaChartData: getFakeAreaChartData("2021-01-01", 31),
    pieChartData: getFakePieChartData(5),
    threeAxisBarGraphData: getFakeThreeAxisBarGraphData(10),
    clusteringData: getFakeClusteringData(100),
    regressionData: getFakeRegressionData(100, RegressionPattern.POLYNOMIAL),
    polyChartDatasets: generatePolyChartDataset(5, 100, "bar", 0, 100_000)
  })

  return (
    <DashboardContainer
      title="Visualization"
      description="you can watch report visualization"
      breadCrumbs={[
        {
          title: "Visualization",
          link: "/dashboard/visualization"
        }
      ]}
    >
      <Tabs defaultValue="animated-barchart">
        <TabsList>
          <TabsTrigger value="animated-barchart">Animated Bar Chart</TabsTrigger>
          <TabsTrigger value="three-axis-barchart">Three Axis Bar Chart</TabsTrigger>
          <TabsTrigger value="areachart">Area Chart</TabsTrigger>
          <TabsTrigger value="piechart">Pie Chart</TabsTrigger>
          <TabsTrigger value="clustering">Clustering</TabsTrigger>
          <TabsTrigger value="regression">Regression</TabsTrigger>
          <TabsTrigger value={"poly-chart"}>PolyChart</TabsTrigger>
        </TabsList>

        <TabsContent value="animated-barchart">
          <AnimatedBarchart
            title="Animated Histogram"
            datasetNames={["Dataset 1", "Dataset 2"]}
            datasets={[chartData.animatedHistogramData_one.data, chartData.animatedHistogramData_two.data]}
            xAxisData={chartData.animatedHistogramData_one.xAxisData}
            delay={100}
          />
        </TabsContent>
        <TabsContent value="three-axis-barchart">
          <ThreeAxisBarChart
            title={{
              xColumnName: "X",
              yColumnName: "Y",
              labelColumnName: "Label"
            }}
            data={chartData.threeAxisBarGraphData}
            orientation="horizontal"
            startColor="#faa"
            middleColor="#0f0"
            endColor="#00f"
            lowValText="Low"
            highValText="High"
          />
        </TabsContent>
        <TabsContent value="areachart">
          <AreaChart title="Area Chart" label="Data" data={chartData.areaChartData} />
        </TabsContent>
        <TabsContent value="piechart">
          <PieChart title="Pie Chart" data={chartData.pieChartData} />
        </TabsContent>
        <TabsContent value="clustering">
          <Clustering
            title="Clustering"
            data={chartData.clusteringData}
            clusterCount={3}
            colors={["#FF0000", "#00FF00", "#0000FF"]}
          />
        </TabsContent>
        <TabsContent value="linechart"></TabsContent>

        <TabsContent value="regression">
          <Regression title="Regression" data={chartData.regressionData} order={2} />
        </TabsContent>

        <TabsContent value={"poly-chart"}>
          <PolyChart
            title={"Poly Chart"}
            datasets={chartData.polyChartDatasets}
            xLabels={Array.from({ length: chartData.polyChartDatasets[0].data.length }, (_, i) => `Item ${i}`)}
          />
        </TabsContent>
      </Tabs>
    </DashboardContainer>
  )
}
