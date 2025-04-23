
import React from "react";

export interface Submission {
  id: number;
  code: string;
  status: "success" | "error";
  executionTime?: number;
  memory?: number;
  time: string;
}

interface SubmissionLogProps {
  submissions: Submission[];
}

const SubmissionLog: React.FC<SubmissionLogProps> = ({ submissions }) => {
  return (
    <div className="bg-white rounded shadow-md p-4 mb-6">
      <span className="font-bold text-sm text-gray-700">DynamoDB Submission Log</span>
      {submissions.length === 0 ? (
        <p className="text-xs text-gray-400 mt-2">No submissions yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {submissions.slice().reverse().map(sub => (
            <li key={sub.id} className="rounded p-2 border text-xs">
              <div>
                <span className={`font-semibold ${sub.status === "success" ? "text-emerald-600" : "text-rose-500"}`}>
                  {sub.status === "success" ? "Success" : "Error"}
                </span>{" "}
                <span className="text-gray-500 ml-2">{sub.time}</span>
              </div>
              <div className="mt-1">
                <code className="block bg-gray-50 rounded p-2 font-mono text-xs overflow-x-auto max-w-full">
                  {sub.code.slice(0, 250)}{sub.code.length > 250 ? "..." : ""}
                </code>
                {sub.status === "success" && sub.executionTime && (
                  <div>Exec Time: <span className="font-medium">{sub.executionTime.toFixed(2)}ms</span> | Mem: <span className="font-medium">{sub.memory?.toFixed(2)}MB</span></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubmissionLog;
