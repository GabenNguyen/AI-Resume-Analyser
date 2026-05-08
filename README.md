# 🧠 ResumeScope – AI-Powered Resume Analyzer

[GitHub Repository](https://github.com/GabenNguyen/IntelliCheck.git)

[Live Demo](https://resume-scope-phi.vercel.app)

**ResumeScope** is a lightweight web application that helps users **analyse and optimise their resumes** for ATS (Applicant Tracking Systems) and recruiters using **AI-powered insights**. Upload your resume PDF and receive instant, structured feedback to improve your chances of landing your target job.

## IMPORTANT NOTE
Since there's no subscription for the AI (i.e. **Free Tier** aka **"I'm broke!"**) so the number of use is limited. 

Use it WISELY! 

Thank you very much for your understanding and wish you have your dreamed job in no time!

---

## ✨ Key Features

- **📄 PDF Resume Upload**  
  Easily upload your resume in PDF format. Supports single or multi-page resumes.

- **🤖 AI-Powered Analysis**  
  Uses **Google Gemini AI** to generate insights including ATS score, missing keywords, and improvement suggestions.

- **🔍 Tailored Feedback for Job Roles**  
  Compare your resume against a job description (optional) for precise keyword and skill matching.

- **🔐 Privacy First**  
  Files are processed securely and **never stored**, ensuring your personal information remains safe.

- **💡 Modern UI & Smooth Animations**  
  Built with **Next.js**, **Tailwind CSS**, and **Framer Motion** for a responsive, intuitive, and visually appealing interface.

## 💻 Tech Stack

### Frontend
- **Next.js (App Router)**
- **Tailwind CSS**
- **TypeScript**
- **Framer Motion**
- **Shadcn/UI**

### Backend
- **Next.js API Routes**
- **Google Gemini AI** for NLP analysis
- **`pdf-parse`** library for text extraction

### Deployment
- **Vercel**

---

## 🎯 Purpose
The IT job market is highly competitive—especially for recent graduates—making a well-structured, ATS-optimized resume essential for securing interviews. **ResumeScope** empowers job seekers with AI-driven, actionable insights to strengthen their resumes and improve their chances of standing out to recruiters.

## 🔎 How It Works

1. Upload a PDF resume and optionally paste a job description.  
2. The AI analyzes the resume for:  
   - ATS compatibility  
   - Missing keywords  
   - Skills alignment  
   - Work experience relevance  
3. Receive a clear report with strengths, improvements, and suggestions.  
4. Analysis results are stored securely and can be revisited anytime.

---

## ⚙️ Environment Variables

Create an `.env` file in the root directory with:

```env
GEMINI_API_KEY = <your GEMINI key>
```

## 🚀 Getting Started
```bash
# Clone the GitHub repository
git clone https://github.com/GabenNguyen/IntelliCheck.git

# Install the dependencies
npm install
or
yarn install

# Start the development server
npm run dev
```

## 📈 Lessons Learned

**Full-Stack Web Development**: Gained practical experience building a full-stack application from frontend to backend.

**AI Integration**: Implemented Google Gemini AI for dynamic content generation and resume analysis.

**PDF Text Extraction**: Understand how to use `pdf-parse` library to extract text from an uploaded PDF and use those extracted text for AI analysis

**Modern UI/UX Design**: Built a responsive, polished interface with Tailwind CSS and Framer Motion.

## ✍🏼 Author
Ba Hoa (Gaben) NGUYEN <br>
**Web developer | AI-Focused Projects | Hard-working | Fast-learner | Team Player** <br>

👨🏻‍💻 **Social Media:** <br>
**[LinkedIn](https://www.linkedin.com/in/bahoanguyen/) / [GitHub](https://github.com/GabenNguyen) / [Facebook](
https://www.facebook.com/hoa.nguyen.430397)** 

📞 **Contact via:** <br>
**Email:** nguyenbahoa04@gmail.com <br>
**Phone:** (+61) 481 991 586

## 📜 Licence 

### MIT
For more information, please visit **[this website](https://opensource.org/license/mit)**.