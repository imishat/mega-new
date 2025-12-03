/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"

import { useEffect, useState } from "react"
import { ExternalLink } from "./Icons"
import { useGetOverviewQuery } from "../redux/Features/overview/overviewApi"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  tooltip: string
  url: string
  textColor?: string
}

function MetricCard({ title, value, icon, color, tooltip, url,textColor }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-gray-600 dark:text-gray-400">{title}</div>
          <div
  className={`text-3xl font-bold ${textColor ? `text-${textColor}-500` : ''}`}
>
  {value}
</div>

        </div>
        <div className="relative group">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-${color}-500 hover:text-${color}-700 transition`}
          >
            {icon}
          </a>
          <div className="absolute -top-8 right-0 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {tooltip}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MetricsSection() {
 const [animatedIcon, setAnimatedIcon] = useState(0);

  const { data }: any = useGetOverviewQuery(undefined)

// Toggle direction every X seconds (optional animation loop)


  const metrics = [

    {
      title: "Today Hits",
      value: data?.Today_Click,
      color: "blue",
      tooltip: "Link List",
      url: "http://total-hits.example.com",
    },
    {
      title: "Today Data",
      value: data?.Today_Data,
      color: "green",
      tooltip: "Link Plan",
      url: "http://today-data.example.com",
    },
    // {
    //   title: "Yesterday Data",
    //   value: data?.yesterday_Data,
    //   color: "yellow",
    //   tooltip: "Custom Link",
    //   url: "http://yesterday-data.example.com",
    // },
    {
      title: "Total Hits",
      value: data?.total_click,
      color: "red",
      tooltip: "Link List",
      url: "http://total-hits.example.com",
    },
    {
      title: "Total Data",
      value: data?.total_Data,
      color: "red",
      tooltip: "Free Link",
      url: "http://total-data.example.com",
    },
 
  ]
useEffect(() => {
  const interval = setInterval(() => {
    setAnimatedIcon((prev) => (prev + 1) % metrics.length);
  }, 600); // bounce every 600ms
  return () => clearInterval(interval);
}, [metrics.length]);

  return (
    <section>
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {metrics.map((metric, index) => (
    <MetricCard
      key={index}
      title={metric.title}
      value={metric.value}
      icon={
        <ExternalLink
          className={`h-10 w-10 ${index === animatedIcon ? "animate-bounce" : ""}`}
        />
      }
      color={metric.color}
      tooltip={metric.tooltip}
      url={metric.url}
    />
  ))}
</div>



    </section>
  )
}

