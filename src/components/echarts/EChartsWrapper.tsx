"use client";

import * as echarts from "echarts";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

export interface EChartsWrapperProps {
  option: echarts.EChartsOption;
  className?: string;
  isLoading?: boolean;
}

const EChartsWrapper: React.FC<EChartsWrapperProps> = ({
  option,
  className,
  isLoading = false,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chart, setChart] = useState<echarts.ECharts>();
  const { resolvedTheme } = useTheme();

  const mountChart = () => {
    if (!chartRef.current) return;

    const newChart = echarts.init(chartRef.current, resolvedTheme ?? "light");
    newChart.setOption(option);
    setChart(newChart);
  };

  const unmountChart = () => {
    chart?.dispose();
    setChart(undefined);
  };

  const handleResize = () => {
    if (!chart) return;

    chart?.resize();
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    mountChart();

    if (isLoading) {
      chart?.showLoading();
    } else {
      chart?.hideLoading();
    }

    return () => {
      unmountChart();
    };
  }, [option, resolvedTheme]);

  return (
    <div
      ref={chartRef}
      className={className}
      style={{
        width: "100%",
        height: "50vh",
      }}
    />
  );
};

export default EChartsWrapper;
