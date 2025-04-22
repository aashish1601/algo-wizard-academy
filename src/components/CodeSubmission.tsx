
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CodeSubmissionProps {
  problem: {
    title: string;
    description: string;
    example: string;
  };
}

const CodeSubmission: React.FC<CodeSubmissionProps> = ({ problem }) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!code.trim()) {
      toast({
        title: "Empty Submission",
        description: "Please write some code before submitting",
        variant: "destructive",
      });
      return;
    }
    
    // This is a placeholder validation - will be replaced with actual backend validation
    toast({
      title: "Code Submitted",
      description: "Your solution has been received for review",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">{problem.title}</h3>
        <p className="text-gray-600 mb-4">{problem.description}</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="text-sm font-semibold mb-2">Example:</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm">{problem.example}</pre>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2">
              Your Solution:
            </label>
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono min-h-[200px] bg-gray-50"
              placeholder="Write your code here..."
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              className="bg-wizard-accent hover:bg-wizard-accent/90"
            >
              Submit Solution
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSubmission;
