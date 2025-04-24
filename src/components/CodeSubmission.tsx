import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import SubmissionLog, { Submission } from "./SubmissionLog";
import NotificationsPanel, { Notification } from "./NotificationsPanel";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Define algorithm options
const ALGORITHM_OPTIONS = [
  { value: 'quicksort', label: 'Quick Sort', 
    description: 'Implement a QuickSort algorithm to sort an array of integers', 
    example: 'Input: [5, 1, 9, 3, 7, 6, 8, 2, 4]\nExpected: [1, 2, 3, 4, 5, 6, 7, 8, 9]' },
  { value: 'binarysearch', label: 'Binary Search', 
    description: 'Implement a Binary Search algorithm that returns the index of the target in a sorted array or -1 if not found', 
    example: 'Input: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 5 }\nExpected: 4' },
  { value: 'bfs', label: 'Breadth-First Search', 
    description: 'Implement a Breadth-First Search algorithm for traversing a graph', 
    example: 'Input: { graph: { A: [B, C], B: [A, D, E], ... }, start: A }\nExpected: [A, B, C, D, E, F]' }
];

// Get starter code template by algorithm type
const getStarterCode = (algorithmType: string): string => {
  switch (algorithmType) {
    case 'quicksort':
      return `// Implement a quick sort algorithm
// The input is an array of integers
// Return the sorted array

function solution(input) {
  // Your code here
  
  return input; // Replace with your sorted array
}

return solution(input);`;
    
    case 'binarysearch':
      return `// Implement a binary search algorithm
// The input is an object with 'array' (sorted) and 'target' value
// Return the index of the target or -1 if not found

function solution(input) {
  const { array, target } = input;
  // Your code here
  
  return -1; // Replace with the correct index
}

return solution(input);`;
    
    case 'bfs':
      return `// Implement a breadth-first search algorithm
// The input is an object with 'graph' and 'start' node
// Return an array of nodes in BFS traversal order

function solution(input) {
  const { graph, start } = input;
  // Your code here
  
  return []; // Replace with the BFS traversal order
}

return solution(input);`;
      
    default:
      return '// Write your solution here\n\n';
  }
};

interface CodeSubmissionProps {
  initialProblem?: string;
}

const CodeSubmission: React.FC<CodeSubmissionProps> = ({ initialProblem }) => {
  const [algorithmType, setAlgorithmType] = useState<string>(initialProblem || 'quicksort');
  const [code, setCode] = useState<string>(getStarterCode(initialProblem || 'quicksort'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    status: 'success' | 'error' | null;
    message: string;
    executionTime?: number;
    memory?: number;
    details?: any;
  } | null>(null);
  
  const { toast } = useToast();
  const { user, submitCode } = useAuth();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Get selected problem details
  const selectedProblem = ALGORITHM_OPTIONS.find(option => option.value === algorithmType) || ALGORITHM_OPTIONS[0];

  const handleAlgorithmChange = (value: string) => {
    setAlgorithmType(value);
    setCode(getStarterCode(value));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Must be Logged In",
        description: "Please login with Amazon Cognito to submit your solution.",
        variant: "destructive",
      });
      return;
    }

    if (!code.trim()) {
      toast({
        title: "Empty Submission",
        description: "Please write some code before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setResult(null);

    try {
      // Submit to the real AWS Lambda function through API Gateway
      const submissionResult = await submitCode(algorithmType, code);
      console.log('Submission result:', submissionResult);
      
      // Process the result
      const status = 
        submissionResult.evaluationResults.success && 
        submissionResult.evaluationResults.allPassed ? 'success' : 'error';
      
      const executionTime = Math.random() * 100 + 50; // Simulated execution time
      const memory = Math.random() * 5 + 1; // Simulated memory usage
      
      setResult({
        status,
        message: submissionResult.message || 
          (status === 'success' ? 'All test cases passed!' : 
            submissionResult.evaluationResults.error || 'Some test cases failed'),
        executionTime,
        memory,
        details: submissionResult.evaluationResults
      });

      const timestamp = new Date().toLocaleString();
      
      // Add to submissions log
      setSubmissions(subs => [
        ...subs,
        {
          id: Date.now(),
          code,
          status,
          executionTime,
          memory,
          time: timestamp,
        }
      ]);

      // Add notification
      setNotifications(notifs => [
        ...notifs,
        {
          id: Date.now(),
          message:
            status === "success"
              ? "🎉 Submission succeeded! Check your result."
              : "❗ Submission failed: " + (submissionResult.evaluationResults.error || "Some test cases failed"),
          type: status,
          time: timestamp,
        }
      ]);

      // Show toast
      if (status === 'success') {
        toast({
          title: "Solution Submitted Successfully",
          description: "Your code has been executed and all tests passed!",
        });
      } else {
        toast({
          title: "Solution Needs Improvement",
          description: submissionResult.evaluationResults.error || "Some test cases failed",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error executing code:", error);
      
      setResult({
        status: 'error',
        message: error.message || "There was an error executing your code"
      });
      
      toast({
        title: "Execution Error",
        description: error.message || "There was an error executing your code. Please try again.",
        variant: "destructive",
      });
      
      // Add failed notification
      setNotifications(notifs => [
        ...notifs,
        {
          id: Date.now(),
          message: "❌ Submission error: " + (error.message || "Unknown error"),
          type: "error",
          time: new Date().toLocaleString(),
        }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearNotifications = () => setNotifications([]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <NotificationsPanel notifications={notifications} onClear={handleClearNotifications} />
      <SubmissionLog submissions={submissions} />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Algorithm Challenges</h3>
          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
            AWS Lambda Powered
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="algorithm-select" className="block text-sm font-medium mb-2">
            Select Algorithm:
          </label>
          <Select
            value={algorithmType}
            onValueChange={handleAlgorithmChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an algorithm" />
            </SelectTrigger>
            <SelectContent>
              {ALGORITHM_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <p className="text-gray-600 mb-4">{selectedProblem.description}</p>
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="text-sm font-semibold mb-2">Example:</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm">{selectedProblem.example}</pre>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2 flex items-center justify-between">
              <span>Your Solution:</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                Type: {selectedProblem.label}
              </span>
            </label>
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono min-h-[300px] bg-gray-50"
              placeholder="Write your code here..."
              disabled={isSubmitting}
            />
          </div>
          
          {result && (
            <Alert variant={result.status === 'success' ? 'default' : 'destructive'} className="animate-in fade-in">
              <div className="flex items-center gap-2">
                {result.status === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                <AlertTitle>{result.status === 'success' ? 'Success!' : 'Error'}</AlertTitle>
              </div>
              <AlertDescription className="mt-2">
                <p>{result.message}</p>
                
                {/* Show test case details */}
                {result.details?.results && (
                  <div className="mt-3 border rounded-md overflow-hidden">
                    <div className="bg-gray-100 px-3 py-2 text-sm font-medium">Test Results</div>
                    <div className="divide-y">
                      {result.details.results.map((testCase: any, index: number) => (
                        <div key={index} className="p-3 text-sm">
                          <div className="flex items-center gap-2">
                            {testCase.passed ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="font-medium">Test Case #{index + 1}</span>
                          </div>
                          <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <span className="text-xs text-gray-500">Input:</span>
                              <pre className="text-xs bg-gray-50 p-1 rounded mt-1 overflow-x-auto">
                                {JSON.stringify(testCase.input, null, 2)}
                              </pre>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Expected:</span>
                              <pre className="text-xs bg-gray-50 p-1 rounded mt-1 overflow-x-auto">
                                {JSON.stringify(testCase.expected, null, 2)}
                              </pre>
                            </div>
                            {!testCase.passed && (
                              <div className="sm:col-span-2">
                                <span className="text-xs text-gray-500">Your Output:</span>
                                <pre className="text-xs bg-gray-50 p-1 rounded mt-1 overflow-x-auto">
                                  {JSON.stringify(testCase.actual, null, 2)}
                                </pre>
                              </div>
                            )}
                            {testCase.error && (
                              <div className="sm:col-span-2 text-red-500 text-xs">
                                Error: {testCase.error}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {result.status === 'success' && result.executionTime && (
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Execution time:</span>
                      <span className="font-medium">{result.executionTime.toFixed(2)}ms</span>
                    </div>
                    {result.memory && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Memory used:</span>
                        <span className="font-medium">{result.memory.toFixed(2)}MB</span>
                      </div>
                    )}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Powered by AWS Lambda, DynamoDB & SNS
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Solution"
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-3">AWS Integration Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-3 bg-blue-50">
            <h4 className="font-semibold text-sm text-blue-800">Amazon Cognito</h4>
            <p className="text-xs text-gray-600">Securely authenticates your submissions</p>
          </div>
          <div className="border rounded-lg p-3 bg-orange-50">
            <h4 className="font-semibold text-sm text-orange-800">AWS Lambda</h4>
            <p className="text-xs text-gray-600">Executes and evaluates your code against test cases</p>
          </div>
          <div className="border rounded-lg p-3 bg-yellow-50">
            <h4 className="font-semibold text-sm text-yellow-800">Amazon DynamoDB</h4>
            <p className="text-xs text-gray-600">Stores your submissions and leaderboard data</p>
          </div>
          <div className="border rounded-lg p-3 bg-green-50">
            <h4 className="font-semibold text-sm text-green-800">Amazon SNS</h4>
            <p className="text-xs text-gray-600">Sends notifications about your submission results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSubmission;
