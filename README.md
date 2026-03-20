# 🧠 ResumeScope – AI-Powered Resume Analyzer

[GitHub Repository](https://github.com/GabenNguyen/IntelliCheck.git)

**ResumeScope** is a lightweigth web application that helps users **analyse and optimise their resumes** for ATS (Applicant Tracking Systems) and recruiters using **AI-powered insights**. Upload your resume PDF and receive instant, structured feedback to improve your chances of landing your target job.

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

- **⚡ Fast & Scalable**  
  Powered by **Next.js App Router**, **TypeScript**, and **Prisma ORM** with **Neon (PostgreSQL)** for reliability and performance.

---

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

---

## 🎯 Purpose
The IT job market is highly competitive, especially for fresh graduates. A well-structured, ATS-optimized resume is crucial for landing interviews. **ResumeScope** helps job seekers enhance their resumes with actionable, AI-powered insights, improving their chances of success.


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