interface AnalysisResult {
    atsScore: number;
    roleMatch: string;
    strengths: string[];
    improvements: string[];
    missingKeywords: string[];
}

export default AnalysisResult