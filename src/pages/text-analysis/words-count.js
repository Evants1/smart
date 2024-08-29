import React, { useState } from 'react';
import ContentWithWordCount from '../../components/ContentWithWordCount';
import Layout from '../../components/Layout';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { Link } from "gatsby";
import Seo from "../../components/seo";
import { Helmet } from 'react-helmet';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const WordsCount = () => {
    const [content, setContent] = useState("");
    const [showWordCount, setShowWordCount] = useState(false);

    const handleChange = (event) => {
        setContent(event.target.value);
        setShowWordCount(false);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;

            if (fileType === "text/plain") {
                // Handle text files
                const reader = new FileReader();
                reader.onload = (e) => {
                    setContent(e.target.result);
                    setShowWordCount(false);
                };
                reader.readAsText(file);
            } else if (fileType === "application/pdf") {
                // Handle PDF files
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(e.target.result) }).promise;
                    let text = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map((item) => item.str).join(" ");
                    }
                    setContent(text);
                    setShowWordCount(false);
                };
                reader.readAsArrayBuffer(file);
            } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                // Handle .docx files
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
                    setContent(result.value);
                    setShowWordCount(false);
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert("Unsupported file type");
            }
        }
    };

    const handleShowWordCount = () => {
        setShowWordCount(true);
    };

    return (
        <Layout>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <script type="application/ld+json">
                    {JSON.stringify({

                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Free Online Word Count Tool",
                        "description": "Keep track of your word count effortlessly! You can copy content and paste it directly, or even upload Word documents, PDFs, or text files. Stay on top of your writing goals with ease!",
                        "url": "https://seohelpertools.com/text-analysis/word-count-tool/",
                        "mainEntity": {
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "What Does a Word Counter Do?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "When you use SEO Helper Tools Word Counter, it quickly counts your words, helping you meet your project’s word limit. It handles everything from manual counting to dealing with compound words or hyphens."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Who Can Benefit from a Word Counter?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "A word counter is beneficial for writers, students, job applicants, and researchers to ensure they meet specific word counts for their projects, essays, applications, or research work."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How Word Counter Works",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "The Word Counter tool uses a language model trained on extensive text data to accurately count words in your input, helping you stay within word limits."
                                    }
                                }
                            ]
                        },
                        "about": {
                            "@type": "Thing",
                            "name": "Word Counter",
                            "description": "A tool that quickly counts words in text, helping users meet specific word counts for various projects."
                        },
                        "audience": [
                            {
                                "@type": "Audience",
                                "audienceType": "Writers",
                                "description": "Helps writers set and meet daily writing goals by tracking word count targets."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Students",
                                "description": "Assists students in meeting word limits for essays, responses, and applications."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Job Applicants",
                                "description": "Ensures job applicants meet word counts for cover letters, case studies, and reports."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Researchers",
                                "description": "Helps researchers stay within word limits for abstracts, grants, and scholarships."
                            }
                        ]
                    })}
                </script>

            </Helmet>
            <h1>Free Online Word Count Tool</h1>
            <p>Keep track of your word count effortlessly! You can copy content and paste it directly, or even upload Word documents, PDFs, or text files. Stay on top of your writing goals with ease!</p>
            <main>
                <textarea
                    value={content}
                    onChange={handleChange}
                    rows="10"
                    cols="50"
                    style={{ width: '100%', marginBottom: '20px' }}
                />
                <input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    onChange={handleFileUpload}
                    style={{ display: 'block', marginBottom: '20px' }}
                />
                <a href="#" onClick={handleShowWordCount} className="count">
                    Get Word Count
                </a>
                {showWordCount && <ContentWithWordCount content={content} />}
            </main>

            <h2>Related Tools</h2>

            <p>Check out our other tools to boost your productivity! These resources can help with your writing and editing needs.</p>
            <div className="row">
                <div className="col-md-3">
                    <a href="#" className="btn btn-primary btn-block">Grammar Checker</a>
                </div>
                <div className="col-md-3">
                    <a href="#" className="btn btn-primary btn-block">Plagiarism Checker</a>
                </div>
                <div className="col-md-3">
                    <a href="#" className="btn btn-primary btn-block">Readability Analyzer</a>
                </div>
                <div className="col-md-3">
                    <Link to="/text-analysis/spell-check/" className="btn btn-primary btn-block">Spell Checker</Link>
                </div>
            </div>

            <h2>What Does a Word Counter Do?</h2>
            <p>When you use <Link to="/">SEO Helper Tools</Link> Word Counter, it quickly counts your words for you, so you can see if you're meeting your project’s word limit. Forget about manual counting and confusion over compound words or hyphens—SEO Helper Tools handles it all. Save time and avoid eye strain by letting our tool do the work!</p>

            <h2>Who Can Benefit from a Word Counter?</h2>
            <p>A word counter helps ensure you meet specific word counts. Here are some common uses:</p>

            <div className="row">
                <div className="col-md-6">
                    <div className="box">
                        <div className="purpose"><i className="fas fa-pencil-alt"></i><h3>Writers</h3></div>
                        <p>Daily writing goals are key for any writer. Setting a word count target, like <a href="https://en.wikipedia.org/wiki/Neil_Gaiman" target="_blank" rel="nofollow">Neil Gaiman’s</a> 50 words a day, helps turn writing into a habit and improve skills over time.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <i className="fas fa-user-graduate"></i> <h3>Students</h3>
                        <p>Essays and responses for school can range from 250 to thousands of words. College and grad school applications also have word limits, such as a 1,000-word personal statement with a maximum of 2,000 words.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="box">
                        <i className="fas fa-briefcase"></i><h3>Job Applicants</h3>
                        <p>When writing cover letters or case studies for job applications, you might need to meet a word count. For instance, you could be asked to write a 1,500-word report to demonstrate your market knowledge.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <i className="fas fa-search"></i> <h3>Researchers</h3>
                        <p>Strict word limits can be tough, like the 300 words needed for research abstracts. Grants and scholarships also have tight word counts, making it hard to fit everything in. Using a word count tool while writing helps keep your work within limits and makes editing easier.</p>
                    </div>
                </div>
            </div>

            <h2>How Word Counter Works</h2>
            <p>The Word Counter tool uses a language model trained on lots of text. It learns patterns and vocabulary to create text based on your input.</p>
        </Layout>
    );
};

export const Head = () => (
    <Seo
        title="WordCounter - Track Words & Improve Writing"
        description="Track your word count easily! Copy and paste content or upload Word docs, PDFs, and text files. Stay on top of your writing goals effortlessly!"
        keywords="Word Counter"
    />
);

export default WordsCount;
