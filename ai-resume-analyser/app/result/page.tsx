"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import mockResult from "@/type/mock_result";
import InsightCard from "../components/InsightCard";

// boilerplate only (will be updated later)
const ResultPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Resume Analysis Results
        </h1>
        <p className="text-muted-foreground">
          AI-powered feedback tailored to the{" "}
          <span className="font-medium">{mockResult.roleMatch}</span> role.
        </p>
      </div>

      {/* ATS Score */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">ATS Compatibility Score</h2>
            <Badge variant="secondary" className="text-base">
              {mockResult.atsScore}/100
            </Badge>
          </div>

          <Progress value={mockResult.atsScore} />

          <p className="text-sm text-muted-foreground">
            Scores above 75 typically pass most Applicant Tracking Systems.
          </p>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InsightCard
          title="What You Did Well"
          items={mockResult.strengths}
          tone="positive"
        />
        <InsightCard
          title="What Can Be Improved"
          items={mockResult.improvements}
          tone="warning"
        />
      </div>

      {/* Missing Keywords */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-medium">
            Missing Keywords (ATS Optimization)
          </h2>

          <div className="flex flex-wrap gap-2">
            {mockResult.missingKeywords.map((keyword) => (
              <Badge key={keyword} variant="outline" className="rounded-full">
                {keyword}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Adding these naturally can improve ATS ranking.
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Link
          href="/analysis"
          className="px-5 py-2.5 w-full text-center text-white rounded-xl border bg-blue-600 font-semibold transition-all hover:bg-zinc-900 active:scale-95"
        >
          Upload New Resume
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
