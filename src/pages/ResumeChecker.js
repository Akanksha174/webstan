import React, { useState, useCallback } from "react";

function ResumeChecker() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisType, setAnalysisType] = useState("Quick Scan");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Invalid file type. Please upload a PDF or DOCX file.");
      setSelectedFile(null);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile) {
      setError("Please upload a valid resume file before analyzing.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("job_description", jobDescription);
    formData.append("analysis_option", analysisType);

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to analyze resume. Please try again.");

      const data = await res.json();
      setResponse(data.analysis);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while processing your resume. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedFile, jobDescription, analysisType]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">ResumeATS Pro</h2>

      <input type="file" onChange={handleFileChange} className="mb-3" accept=".pdf,.docx" />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <textarea
        className="w-full p-2 border rounded mb-3"
        placeholder="Enter job description (optional)"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded mb-3"
        value={analysisType}
        onChange={(e) => setAnalysisType(e.target.value)}
      >
        <option>Quick Scan</option>
        <option>Detailed Analysis</option>
        <option>ATS Optimization</option>
      </select>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {response && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">Analysis Results:</h3>
          <div className="mt-4 p-4 border rounded bg-gray-800 text-white">
            {response.split("\n").map((line, index) => {
              // Bold headers (e.g., "*1. Most Suitable Profession:*")
              if (line.startsWith("*") && line.endsWith("*")) {
                return (
                  <h2 key={index} className="font-bold text-lg mt-3">
                    {line.replace(/\*/g, "").trim()}
                  </h2>
                );
              }

              // Regular expression to find and bold only text inside ** **
              const boldPattern = /\*\*(.*?)\*\*/g;
              const parts = [];
              let lastIndex = 0;
              let match;
              
              while ((match = boldPattern.exec(line)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(line.substring(lastIndex, match.index));
                }
                parts.push(<strong key={`${index}-${match.index}`}>{match[1]}</strong>);
                lastIndex = match.index + match[0].length;
              }
              
              if (lastIndex < line.length) {
                parts.push(line.substring(lastIndex));
              }
              
              return (
                <p key={index} className="mt-2">
                  {parts.length > 0 ? parts : line}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeChecker;