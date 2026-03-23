interface AnalysisResult {
    atsScore: number;
    roleMatch: string;
    strengths: string[];
    improvements: string[];
    missingKeywords: string[];
    suggestions: string[]; // for actionable suggestions
}

export default AnalysisResult