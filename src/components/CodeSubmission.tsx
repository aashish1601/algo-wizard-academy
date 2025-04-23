
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface CodeSubmissionProps {
  problem: {
    title: string;
    description: string;
    example: string;
    expectedOutput?: string;
    timeLimit?: number;
  };
}

const CodeSubmission: React.FC<CodeSubmissionProps> = ({ problem }) => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    status: 'success' | 'error' | null;
    message: string;
    executionTime?: number;
    memory?: number;
  } | null>(null);
  const { toast } = useToast();

  const simulateAWSLambdaExecution = (code: string) => {
    // This simulates what would happen in AWS Lambda
    return new Promise<{
      status: 'success' | 'error';
      message: string;
      executionTime?: number;
      memory?: number;
    }>((resolve) => {
      setTimeout(() => {
        // Simple test for bubble sort implementation
        if (code.includes('function bubbleSort') && 
            code.includes('for') && 
            code.includes('if') && 
            code.includes('return')) {
          resolve({
            status: 'success',
            message: 'All test cases passed!',
            executionTime: Math.random() * 100 + 50, // Simulating execution time (ms)
            memory: Math.random() * 5 + 1, // Simulating memory usage (MB)
          });
        } else {
          resolve({
            status: 'error',
            message: 'Your solution failed to pass some test cases. Make sure you implement a proper bubbleSort function.',
          });
        }
      }, 2000); // Simulate network delay
    });
  };

  const handleSubmit = async () => {
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
      // In a real implementation, this would call AWS Lambda via API Gateway
      const executionResult = await simulateAWSLambdaExecution(code);
      
      setResult(executionResult);
      
      // Simulate storing results in DynamoDB and sending SNS notification
      if (executionResult.status === 'success') {
        toast({
          title: "Solution Submitted Successfully",
          description: "Your code has been executed and results are available!",
        });
        
        console.log("Would store in DynamoDB:", {
          userId: "user123", // This would come from Amazon Cognito in real implementation
          problemId: problem.title,
          code: code,
          result: executionResult,
          timestamp: new Date().toISOString()
        });
        
        console.log("Would send SNS notification about successful submission");
      } else {
        toast({
          title: "Solution Needs Improvement",
          description: executionResult.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error executing code:", error);
      toast({
        title: "Execution Error",
        description: "There was an error executing your code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{problem.title}</h3>
          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
            AWS Lambda Powered
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{problem.description}</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="text-sm font-semibold mb-2">Example:</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm">{problem.example}</pre>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2 flex items-center justify-between">
              <span>Your Solution:</span>
              {problem.timeLimit && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Time limit: {problem.timeLimit}ms
                </span>
              )}
            </label>
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono min-h-[200px] bg-gray-50"
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
                {result.status === 'success' && result.executionTime && (
                  <div className="mt-2 text-sm">
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
              Powered by AWS Lambda & DynamoDB
            </div>
            <Button 
              onClick={handleSubmit}
              className="bg-wizard-accent hover:bg-wizard-accent/90"
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
            <p className="text-xs text-gray-600">Login to save your progress and submissions</p>
          </div>
          <div className="border rounded-lg p-3 bg-orange-50">
            <h4 className="font-semibold text-sm text-orange-800">AWS Lambda</h4>
            <p className="text-xs text-gray-600">Executes and grades your code submissions</p>
          </div>
          <div className="border rounded-lg p-3 bg-yellow-50">
            <h4 className="font-semibold text-sm text-yellow-800">Amazon DynamoDB</h4>
            <p className="text-xs text-gray-600">Stores your submissions and performance</p>
          </div>
          <div className="border rounded-lg p-3 bg-green-50">
            <h4 className="font-semibold text-sm text-green-800">Amazon SNS</h4>
            <p className="text-xs text-gray-600">Notifies you when results are ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSubmission;
