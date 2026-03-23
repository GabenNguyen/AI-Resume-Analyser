"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import InsightCard from "../components/InsightCard";
import { useSearchParams } from "next/navigation";
import { useAnalysis } from "../context/analysisStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// boilerplate only (will be updated later)
const ResultPage = () => {
  // Get analysis from context
  const { analysis } = useAnalysis();

  // useSearchParams to read the role URL
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const router = useRouter();

  // Prevent direct access to result page if no analysis is present
  useEffect(() => {
    if (!analysis) {
      router.push("/analysis");
    }
  }, [analysis, router]);

  if (!analysis) {
    return null;
  }

  const getATSScoreVerdict = (score: number) => {
    if (score >= 85) return "Excellent - You are job-ready!";
    if (score >= 75) return "Good - Minor improvements needed";
    if (score >= 50) return "Fair - Consider revising your resume";
    return "Poor - likely ATS rejection!";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Resume Analysis Results
        </h1>
        <p className="text-muted-foreground">
          AI-powered feedback tailored to the{" "}
          <span className="font-bold">{role?.toUpperCase()}</span> role.
          <p className="font-semibold dark:text-yellow-400 text-red-600 mt-3">
            (<span className="font-bold">IMPORTANT NOTE:</span> The result is
            for <span className="font-bold">REFERENCE ONLY</span> and may not be
            100% accurate. Always double-check it with your mentor before
            applying to jobs!)
          </p>
        </p>
      </div>

      {/* ATS Score */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">ATS Compatibility Score</h2>
            <Badge variant="secondary" className="text-base">
              {analysis.atsScore}/100
            </Badge>
          </div>

          <Progress value={analysis.atsScore} />

          {/* Verdict */}
          <p
            className={`font-medium text-sm ${
              analysis.atsScore >= 85
                ? "text-emerald-600"
                : analysis.atsScore >= 75
                  ? "text-green-400"
                  : analysis.atsScore >= 50
                    ? "text-yellow-600"
                    : "text-red-600"
            }`}
          >
            {getATSScoreVerdict(analysis.atsScore)}
          </p>

          <p className="text-sm text-muted-foreground">
            Scores above 75 typically pass most Applicant Tracking Systems.
          </p>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InsightCard
          title="What You Did Well"
          items={analysis.strengths}
          tone="positive"
        />
        <InsightCard
          title="What Can Be Improved"
          items={analysis.improvements}
          tone="warning"
        />
      </div>

      {/* Missing Keywords */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">
            Missing Keywords (ATS Optimization)
          </h2>

          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((keyword: string) => (
              <Badge
                key={keyword}
                variant="outline"
                className="rounded-full text-md"
              >
                {keyword}
              </Badge>
            ))}
          </div>

          <p className="text-md text-muted-foreground">
            Adding these naturally can improve ATS ranking.
          </p>
        </CardContent>
      </Card>

      {/* Actionable suggestions */}
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">
            Actionable Suggestions (to boost your resume further)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-md">
            {analysis.suggestions.map((suggestion: string, index: number) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

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
