"use client";

import { useState } from "react";

const MODELS = ["llama-70b", "mixtral", "gemini"];

export function ExperimentForm() {
  const [prompt, setPrompt] = useState("");
  const [testCases, setTestCases] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, any>>({});

  const handleTestCaseChange = (index: number, value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResults({});

    const requests = MODELS.map(async (model) => {
      try {
        const response = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, model, testCases }),
        });

        const data = await response.json();
        setResults((prev) => ({
          ...prev,
          [model]: data,
        }));
      } catch (error) {
        console.error(`Error with ${model}:`, error);
        setResults((prev) => ({
          ...prev,
          [model]: { error: "Failed to get response" },
        }));
      }
    });

    await Promise.all(requests);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col w-full max-w-md mx-auto">
      <div className="flex justify-center">
            <label className="label text-lg font-semibold text-primary">Prompt</label>
          </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: how many a's are in banana..."
          className="textarea textarea-bordered min-h-[100px] w-full bg-base-200 text-neutral-content"
        />
        <button className={`btn btn-primary ${isLoading ? "loading" : ""} mt-4 w-full`} onClick={handleSubmit}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </div>

      <div className="flex flex-col w-full mt-4">
        <table className="table w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/6 text-lg font-bold text-primary">Model</th>
              <th className="w-3/6 text-lg font-bold text-primary">Response</th>
              <th className="w-1/6 text-lg font-bold text-primary">Metrics</th>
              <th className="w-1/6 text-lg font-bold text-primary">Tokens</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((model) => (
              <tr key={model} className="border-b-0">
                <td className="p-4">{model}</td>
                <td className="p-4">{results[model]?.response || "N/A"}</td>
                <td className="p-4 space-y-1">
                  <div>Response Time: {results[model]?.responseTime ? `${results[model].responseTime}s` : "N/A"}</div>
                  <div>Accuracy: {results[model]?.accuracy ? `${results[model].accuracy.toFixed(2)}%` : "N/A"}</div>
                  <div>Relevancy: {results[model]?.relevancy ? `${results[model].relevancy.toFixed(2)}%` : "N/A"}</div>
                </td>
                <td className="p-4 space-y-1">
                  <div>Total Tokens: {results[model]?.metrics?.tokenCount || "N/A"}</div>
                  <div>Prompt Tokens: {results[model]?.metrics?.promptTokens || "N/A"}</div>
                  <div>Completion Tokens: {results[model]?.metrics?.completionTokens || "N/A"}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
