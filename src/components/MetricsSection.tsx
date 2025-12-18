/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { ExternalLink, CalendarIcon } from "./Icons"
import { useGetOverviewQuery } from "../redux/Features/overview/overviewApi"
import { useAppSelector } from "../redux/hooks"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  tooltip: string
  url: string
}

function MetricCard({ title, value, icon, tooltip, url }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-black">{title}</div>
          <div className="text-3xl font-bold text-black">{value}</div>
        </div>
        <div className="relative group">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700 transition"
          >
            {icon}
          </a>
          <div className="absolute -top-8 right-0 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
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
const auth = useAppSelector((state: any) => state.auth);;

console.log(data,"data")
  // if (isLoading) return <div className="text-black">Loading...</div>;
  // if (isError) return <div className="text-black">Error loading metrics</div>;

  const name =  auth?.data?.data?.name || "User";
  const username =   auth?.data?.data?.username || "username";
  const email =   auth?.data?.data?.email || "user@example.com";
  const date = new Date().toLocaleDateString();

  const metrics = [
    { title: "Mobile Device", value: data?.total_mobile_clicks ?? 0, color: "blue", tooltip: "Link List", url: "http://total-hits.example.com" },
    { title: "Desktop Data", value: data?.total_desktop_clicks ?? 0, color: "green", tooltip: "Link Plan", url: "http://today-data.example.com" },
    { title: "Today Click", value: data?.Today_Click ?? 0, color: "red", tooltip: "Link List", url: "http://total-hits.example.com" },
    { title: "Today Data", value: data?.Today_Data ?? 0, color: "red", tooltip: "Free Link", url: "http://total-data.example.com" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedIcon((prev) => (prev + 1) % metrics.length);
    }, 600);
    return () => clearInterval(interval);
  }, [metrics.length]);

  return (
    <div className="bg-white p-6 rounded-md">
      {/* Top info */}
      <div className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between rounded-md mb-6">
        <div className="text-black font-medium">
          Hello, <span className="font-semibold">{name} ({username})</span>
        </div>

        <div className="flex items-center space-x-6 text-black text-sm">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-medium">{email}</span>
            <span className="text-xs">@{username}</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={<ExternalLink className={`h-10 w-10 ${index === animatedIcon ? "animate-bounce" : ""} text-black`} />}
              color={metric.color}
              tooltip={metric.tooltip}
              url={metric.url}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
