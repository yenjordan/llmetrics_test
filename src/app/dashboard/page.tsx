"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AccuracyChart from "@/components/charts/AccuracyChart";
import RelevancyChart from "@/components/charts/RelevancyChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [analyticsData, setAnalyticsData] = useState({
    models: [],
    totalExperiments: 0,
    timeRange: { start: null, end: null },
  });

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => setAnalyticsData(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <img alt="LLMetrics Logo" src="/LLMetrics_logo.png" className="w-8 mr-2" />
          Performance Comparison
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Model Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AccuracyChart data={analyticsData.models} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Model Relevance</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RelevancyChart data={analyticsData.models} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Response Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] bg-base-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.models} style={{ backgroundColor: '#1e1e2f' }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="modelName" stroke="#fff" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="averageResponseTime"
                    stroke="#686ce4"
                    name="Response Time (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Cost Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] bg-base-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.models} style={{ backgroundColor: '#1e1e2f' }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="modelName" stroke="#fff" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => {
                      if (typeof value === "number") {
                        return [`$${value.toFixed(6)}`, "Cost"];
                      }
                      return [value, "Cost"];
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalCost"
                    stroke="#686ce4"
                    name="Total Cost ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
