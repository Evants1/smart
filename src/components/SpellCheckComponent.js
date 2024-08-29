import React, { useState, useEffect } from 'react';
import Typo from 'typo-js';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const SpellCheckComponent = () => {
    const [text, setText] = useState('');
    const [errors, setErrors] = useState([]);
    const [dictionary, setDictionary] = useState(null);

    useEffect(() => {
        const loadDictionary = async () => {
            try {
                const responseAff = await fetch('/dictionaries/en_US.aff');
                const affText = await responseAff.text();
                const responseDic = await fetch('/dictionaries/en_US.dic');
                const dicText = await responseDic.text();
                const typo = new Typo('en_US', affText, dicText);
                setDictionary(typo);
            } catch (error) {
                console.error('Error loading dictionary:', error);
            }
        };

        loadDictionary();
    }, []);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;

            if (fileType === "text/plain") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setText(e.target.result);
                };
                reader.readAsText(file);
            } else if (fileType === "application/pdf") {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(e.target.result) }).promise;
                    let extractedText = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        extractedText += content.items.map((item) => item.str).join(" ");
                    }
                    setText(extractedText);
                };
                reader.readAsArrayBuffer(file);
            } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
                    setText(result.value);
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert("Unsupported file type");
            }
        }
    };

    const handleSpellCheck = () => {
        if (!dictionary) return;

        const words = text.trim().split(/\s+/);
        const misspelledWords = words.filter(word => !dictionary.check(word));

        setErrors(misspelledWords);
    };

    return (
        <div>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Free Spell Checker",
                        "description": "Our spell checker finds and fixes spelling mistakes fast. You can copy and paste your text or upload files like TXT, Word, and PDF. It’s easy to make your writing error-free!",
                        "url": "https://seohelpertools.com/text-analysis/spell-checker/",
                        "mainEntity": {
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "How Does Our Spell Checker Work?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Our spell checker allows you to copy and paste text or upload files like TXT, Word, and PDF. It quickly finds and corrects spelling mistakes to make your writing error-free."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Where Can I Use SEO Helper Tools Spell Checker?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "You can use the SEO Helper Tools Spell Checker on both computers and mobile devices. It works directly in your browser without needing any additional software."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How Is SEO Helper Tools Spell Checker Different from My Word Processor’s?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Our spell checker offers a faster and more thorough check than standard word processors, with the ability to upload various file types like TXT, Word, and PDF."
                                    }
                                }
                            ]
                        },
                        "about": {
                            "@type": "Thing",
                            "name": "Spell Checker",
                            "description": "A tool that highlights and corrects spelling errors in text, used on both computers and mobile devices."
                        },
                        "audience": [
                            {
                                "@type": "Audience",
                                "audienceType": "Copywriters",
                                "description": "Ensure that all ad copy and other content are free from spelling mistakes, making your material clear and professional."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Students",
                                "description": "Create great text for lesson plans and presentations, and submit polished assignments."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Journalists",
                                "description": "Speed up the editing process and make sure every article is polished and perfect."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Researchers",
                                "description": "Spot and correct spelling errors in articles, reports, and other documents to enhance readability and professionalism."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Marketers",
                                "description": "Quickly proofread and fix text for blog posts, social media, and ads."
                            },
                            {
                                "@type": "Audience",
                                "audienceType": "Professionals",
                                "description": "Ensure that every email, document, and report is thoroughly checked and free from errors."
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <h1>Free spell checker </h1>
            <p>Our spell checker finds and fixes spelling mistakes fast. You can copy and paste your text or upload files like TXT, Word, and PDF. It’s easy to make your writing error free!</p>
            <textarea
                value={text}
                onChange={handleTextChange}
                rows="10"
                cols="50"
            />
            <br />
            <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                style={{ display: 'block', marginBottom: '20px' }}
            />
            <button onClick={handleSpellCheck} className="btn btn-secondary">Check Spelling</button>
            <div>
                {errors.length > 0 && (
                    <div>
                        <p className="display-4">Number of misspelled words: {errors.length}</p>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

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
                    <Link to="/text-analysis/words-count/" className="btn btn-primary btn-block">Words Count</Link>
                </div>
                <div className="col-md-3">
                    <a href="#" className="btn btn-primary btn-block">Text Summarizer</a>
                </div>
            </div>

            <h2>What's a spell checker?</h2>
            <p>A spell checker highlights misspelled words as you write on a computer or mobile device. It can be a built-in feature or an add-on to your writing software.</p>

            <h2>Who Can Benefit from Spell Checker?</h2>
            <p>Teachers, copywriters, researchers, journalists, and marketers all benefit from a spell checker. It helps ensure their writing is error-free in emails, reports, articles, and marketing materials.</p>

            <div className="row">
                <div className="col-md-6">
                    <div className="box">
                        <div className="purpose"><i className="fas fa-pencil-alt"></i><h3>Copywriters</h3></div>
                        <p>Ensure that all ad copy and other content are free from spelling mistakes, making your material clear and professional.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <div className="purpose"><i className="fas fa-graduation-cap"></i><h3>Students</h3></div>
                        <p>Create great text for lesson plans and presentations, and submit polished assignments.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="box">
                        <div className="purpose"><i className="fas fa-newspaper"></i><h3>Journalists</h3></div>
                        <p>Speed up the editing process and make sure every article is polished and perfect.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <div className="purpose"><i className="fas fa-flask"></i><h3>Researchers</h3></div>
                        <p>Spot and correct spelling errors in articles, reports, and other documents to enhance readability and professionalism.</p>
                    </div>
                </div>
            </div>

            <h2>FAQs</h2>
            <div className="faq-section">
                <div className="faq">
                    <h3>How Does Our Spell Checker Work?</h3>
                    <p>Our spell checker allows you to copy and paste text or upload files like TXT, Word, and PDF. It quickly finds and corrects spelling mistakes to make your writing error-free.</p>
                </div>
                <div className="faq">
                    <h3>Where Can I Use SEO Helper Tools Spell Checker?</h3>
                    <p>You can use the SEO Helper Tools Spell Checker on both computers and mobile devices. It works directly in your browser without needing any additional software.</p>
                </div>
                <div className="faq">
                    <h3>How Is SEO Helper Tools Spell Checker Different from My Word Processor’s?</h3>
                    <p>Our spell checker offers a faster and more thorough check than standard word processors, with the ability to upload various file types like TXT, Word, and PDF.</p>
                </div>
            </div>
        </div>
    );
};

export default SpellCheckComponent;
