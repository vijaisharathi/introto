import React, { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Upload, 
  Video, 
  Music, 
  FileText, 
  ClipboardList,
  Plus,
  Trash2,
  Save,
  Shield,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Image as ImageIcon,
  Calendar,
  Tag
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const { user, isAdmin } = useAuth();
  
  // Video upload state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCourse, setVideoCourse] = useState("");
  const [videoModule, setVideoModule] = useState("");
  
  // Audio upload state
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioTitle, setAudioTitle] = useState("");
  const [audioCourse, setAudioCourse] = useState("");
  
  // PDF upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfCourse, setPdfCourse] = useState("");
  
  // Quiz state
  const [quizCourse, setQuizCourse] = useState("");
  const [quizModule, setQuizModule] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState("");

  // Blog state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogTags, setBlogTags] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");

  const [uploadStatus, setUploadStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ""});

  if (!isAdmin || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 bg-red-500/10 border-red-500/30 backdrop-blur-xl">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl text-white text-center mb-2">Access Denied</h2>
          <p className="text-white/70 text-center mb-4">You need administrator privileges to access this page.</p>
          <Button onClick={() => onNavigate("home")} className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  const courses = [
    "Data Science Fundamentals",
    "Digital Marketing Mastery",
    "UX Design Principles",
    "Financial Analytics & Modeling",
    "Artificial Intelligence Essentials",
    "Full-Stack Web Development",
    "Business Leadership",
    "Python for Beginners"
  ];

  const handleVideoUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoFile && videoTitle && videoCourse && videoModule) {
      setUploadStatus({type: 'success', message: `Video "${videoTitle}" uploaded successfully!`});
      // Reset form
      setVideoFile(null);
      setVideoTitle("");
      setVideoCourse("");
      setVideoModule("");
      setTimeout(() => setUploadStatus({type: null, message: ""}), 3000);
    }
  };

  const handleAudioUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (audioFile && audioTitle && audioCourse) {
      setUploadStatus({type: 'success', message: `Audio "${audioTitle}" uploaded successfully!`});
      setAudioFile(null);
      setAudioTitle("");
      setAudioCourse("");
      setTimeout(() => setUploadStatus({type: null, message: ""}), 3000);
    }
  };

  const handlePdfUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (pdfFile && pdfTitle && pdfCourse) {
      setUploadStatus({type: 'success', message: `PDF "${pdfTitle}" uploaded successfully!`});
      setPdfFile(null);
      setPdfTitle("");
      setPdfCourse("");
      setTimeout(() => setUploadStatus({type: null, message: ""}), 3000);
    }
  };

  const addQuestion = () => {
    if (currentQuestion && currentOptions.every(opt => opt.trim() !== "") && quizCourse && quizModule) {
      const newQuestion: QuizQuestion = {
        id: Date.now().toString(),
        question: currentQuestion,
        options: currentOptions,
        correctAnswer: correctAnswer,
        explanation: explanation
      };
      setQuestions([...questions, newQuestion]);
      // Reset form
      setCurrentQuestion("");
      setCurrentOptions(["", "", "", ""]);
      setCorrectAnswer(0);
      setExplanation("");
      setUploadStatus({type: 'success', message: 'Question added successfully!'});
      setTimeout(() => setUploadStatus({type: null, message: ""}), 3000);
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const saveQuiz = () => {
    if (questions.length > 0 && quizCourse && quizModule) {
      setUploadStatus({type: 'success', message: `Quiz with ${questions.length} questions saved successfully!`});
      setQuestions([]);
      setQuizCourse("");
      setQuizModule("");
      setTimeout(() => setUploadStatus({type: null, message: ""}), 3000);
    }
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blogTitle && blogAuthor && blogCategory && blogExcerpt && blogContent) {
      setUploadStatus({type: 'success', message: `Blog post "${blogTitle}" published successfully!`});
      // Reset form
      setBlogTitle("");
      setBlogAuthor("");
      setBlogCategory("");
      setBlogExcerpt("");
      setBlogContent("");
      setBlogImage(null);
      setBlogTags("");
      setBlogDate("");
      setBlogReadTime("");
      setTimeout(() => setUploadStatus({type: null, message: ""}), 3000);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate("home")}
              className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
            >
              ← Back to Home
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-medium">Admin Panel</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">LMS Admin Dashboard</h1>
          <p className="text-white/70 mt-2">Manage course content, upload materials, and create quizzes</p>
        </motion.div>

        {/* Status Alert */}
        {uploadStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              uploadStatus.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            {uploadStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={uploadStatus.type === 'success' ? 'text-green-300' : 'text-red-300'}>
              {uploadStatus.message}
            </span>
          </motion.div>
        )}

        {/* Admin Tabs */}
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white/5 backdrop-blur-sm border border-white/10 h-auto">
            <TabsTrigger value="video" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 py-3">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 py-3">
              <Music className="w-4 h-4 mr-2" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="pdf" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 py-3">
              <FileText className="w-4 h-4 mr-2" />
              PDFs
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 py-3">
              <ClipboardList className="w-4 h-4 mr-2" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 py-3">
              <BookOpen className="w-4 h-4 mr-2" />
              Blog
            </TabsTrigger>
          </TabsList>

          {/* Video Upload Tab */}
          <TabsContent value="video">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Upload Video</h2>
                  <p className="text-white/60 text-sm">Add video lectures to courses</p>
                </div>
              </div>

              <form onSubmit={handleVideoUpload} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Select Course</Label>
                    <Select value={videoCourse} onValueChange={setVideoCourse} required>
                      <SelectTrigger className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-blue-400/50 text-white rounded-xl transition-all shadow-lg hover:shadow-blue-500/20">
                        <SelectValue placeholder="Choose a course..." />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl">
                        {courses.map((course) => (
                          <SelectItem 
                            key={course} 
                            value={course} 
                            className="text-white hover:bg-blue-500/20 hover:text-blue-300 cursor-pointer py-3 px-4 rounded-lg my-1 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                              {course}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Module Number</Label>
                    <Input
                      type="text"
                      value={videoModule}
                      onChange={(e) => setVideoModule(e.target.value)}
                      placeholder="e.g., Module 1"
                      required
                      className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-blue-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block text-sm font-medium">Video Title</Label>
                  <Input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g., Introduction to Python Basics"
                    required
                    className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-blue-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Video File</Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      required
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center justify-center gap-2 p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-amber-400 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                      <Upload className="w-6 h-6 text-white/70" />
                      <span className="text-white/70">
                        {videoFile ? videoFile.name : "Click to upload video file"}
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white border-0"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Audio Upload Tab */}
          <TabsContent value="audio">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Upload Audio</h2>
                  <p className="text-white/60 text-sm">Add audio lectures and podcasts</p>
                </div>
              </div>

              <form onSubmit={handleAudioUpload} className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block text-sm font-medium">Select Course</Label>
                  <Select value={audioCourse} onValueChange={setAudioCourse} required>
                    <SelectTrigger className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-purple-400/50 text-white rounded-xl transition-all shadow-lg hover:shadow-purple-500/20">
                      <SelectValue placeholder="Choose a course..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl">
                      {courses.map((course) => (
                        <SelectItem 
                          key={course} 
                          value={course} 
                          className="text-white hover:bg-purple-500/20 hover:text-purple-300 cursor-pointer py-3 px-4 rounded-lg my-1 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            {course}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-3 block text-sm font-medium">Audio Title</Label>
                  <Input
                    type="text"
                    value={audioTitle}
                    onChange={(e) => setAudioTitle(e.target.value)}
                    placeholder="e.g., Python Fundamentals Podcast"
                    required
                    className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-purple-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Audio File</Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                      required
                      className="hidden"
                      id="audio-upload"
                    />
                    <label
                      htmlFor="audio-upload"
                      className="flex items-center justify-center gap-2 p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-purple-400 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                      <Upload className="w-6 h-6 text-white/70" />
                      <span className="text-white/70">
                        {audioFile ? audioFile.name : "Click to upload audio file"}
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white border-0"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Audio
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* PDF Upload Tab */}
          <TabsContent value="pdf">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Upload PDF</h2>
                  <p className="text-white/60 text-sm">Add course materials and resources</p>
                </div>
              </div>

              <form onSubmit={handlePdfUpload} className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block text-sm font-medium">Select Course</Label>
                  <Select value={pdfCourse} onValueChange={setPdfCourse} required>
                    <SelectTrigger className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-green-400/50 text-white rounded-xl transition-all shadow-lg hover:shadow-green-500/20">
                      <SelectValue placeholder="Choose a course..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl">
                      {courses.map((course) => (
                        <SelectItem 
                          key={course} 
                          value={course} 
                          className="text-white hover:bg-green-500/20 hover:text-green-300 cursor-pointer py-3 px-4 rounded-lg my-1 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            {course}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-3 block text-sm font-medium">PDF Title</Label>
                  <Input
                    type="text"
                    value={pdfTitle}
                    onChange={(e) => setPdfTitle(e.target.value)}
                    placeholder="e.g., Python Syntax Reference Guide"
                    required
                    className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-green-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">PDF File</Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      required
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="flex items-center justify-center gap-2 p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-green-400 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                      <Upload className="w-6 h-6 text-white/70" />
                      <span className="text-white/70">
                        {pdfFile ? pdfFile.name : "Click to upload PDF file"}
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload PDF
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Quiz Management Tab */}
          <TabsContent value="quiz">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Quiz</h2>
                  <p className="text-white/60 text-sm">Add questions and answers for assessments</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quiz Info */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Select Course</Label>
                    <Select value={quizCourse} onValueChange={setQuizCourse}>
                      <SelectTrigger className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-amber-400/50 text-white rounded-xl transition-all shadow-lg hover:shadow-amber-500/20">
                        <SelectValue placeholder="Choose a course..." />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl">
                        {courses.map((course) => (
                          <SelectItem 
                            key={course} 
                            value={course} 
                            className="text-white hover:bg-amber-500/20 hover:text-amber-300 cursor-pointer py-3 px-4 rounded-lg my-1 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                              {course}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Module</Label>
                    <Input
                      type="text"
                      value={quizModule}
                      onChange={(e) => setQuizModule(e.target.value)}
                      placeholder="e.g., Module 1"
                      className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-amber-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                    />
                  </div>
                </div>

                {/* Add Question Form */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-amber-400" />
                    Add New Question
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-white mb-3 block text-sm font-medium">Question</Label>
                      <Textarea
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Enter your question..."
                        rows={3}
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-amber-400/50 text-white placeholder:text-white/50 resize-none rounded-xl transition-all"
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-3 block text-sm font-medium">Answer Options</Label>
                      <div className="space-y-3">
                        {currentOptions.map((option, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="correct-answer"
                              checked={correctAnswer === index}
                              onChange={() => setCorrectAnswer(index)}
                              className="w-5 h-5 text-amber-500 accent-amber-500"
                            />
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...currentOptions];
                                newOptions[index] = e.target.value;
                                setCurrentOptions(newOptions);
                              }}
                              placeholder={`Option ${index + 1}`}
                              className="flex-1 h-11 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-amber-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                            />
                            {correctAnswer === index && (
                              <span className="text-xs text-green-400 font-medium w-20">✓ Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-white/50 mt-2 flex items-center gap-1">
                        <span className="text-amber-400">ℹ</span>
                        Select the correct answer by clicking the radio button
                      </p>
                    </div>

                    <div>
                      <Label className="text-white mb-3 block text-sm font-medium">Explanation (Optional)</Label>
                      <Textarea
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="Explain why this is the correct answer..."
                        rows={2}
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-amber-400/50 text-white placeholder:text-white/50 resize-none rounded-xl transition-all"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={addQuestion}
                      className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question to Quiz
                    </Button>
                  </div>
                </div>

                {/* Questions List */}
                {questions.length > 0 && (
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Questions Added ({questions.length})
                    </h3>
                    <div className="space-y-4">
                      {questions.map((q, idx) => (
                        <div key={q.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-amber-400 font-semibold">Q{idx + 1}:</span>
                                <span className="text-white">{q.question}</span>
                              </div>
                              <div className="space-y-1 ml-6">
                                {q.options.map((opt, optIdx) => (
                                  <div key={optIdx} className={`text-sm ${optIdx === q.correctAnswer ? 'text-green-400 font-medium' : 'text-white/70'}`}>
                                    {optIdx === q.correctAnswer && "✓ "}{opt}
                                  </div>
                                ))}
                              </div>
                              {q.explanation && (
                                <p className="text-xs text-white/50 mt-2 ml-6">Explanation: {q.explanation}</p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeQuestion(q.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={saveQuiz}
                      className="w-full mt-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Quiz ({questions.length} questions)
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Blog Creation Tab */}
          <TabsContent value="blog">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Blog Post</h2>
                  <p className="text-white/60 text-sm">Publish articles and insights</p>
                </div>
              </div>

              <form onSubmit={handleBlogSubmit} className="space-y-6">
                {/* Title & Author */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Blog Title *</Label>
                    <Input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g., 5 Essential Skills Every Professional Needs"
                      required
                      className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                    />
                  </div>

                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Author Name *</Label>
                    <Input
                      type="text"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      placeholder="e.g., Dr. Sarah Johnson"
                      required
                      className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                    />
                  </div>
                </div>

                {/* Category & Tags */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Category *</Label>
                    <Select value={blogCategory} onValueChange={setBlogCategory} required>
                      <SelectTrigger className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white rounded-xl transition-all shadow-lg hover:shadow-rose-500/20">
                        <SelectValue placeholder="Choose a category..." />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl">
                        {["Career Development", "Tech Insights", "Learning Tips", "Industry Trends", "Success Stories", "Professional Growth"].map((category) => (
                          <SelectItem 
                            key={category} 
                            value={category} 
                            className="text-white hover:bg-rose-500/20 hover:text-rose-300 cursor-pointer py-3 px-4 rounded-lg my-1 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                              {category}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags (comma-separated)
                    </Label>
                    <Input
                      type="text"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      placeholder="e.g., leadership, productivity, AI"
                      className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                    />
                  </div>
                </div>

                {/* Date & Read Time */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Publish Date *
                    </Label>
                    <Input
                      type="date"
                      value={blogDate}
                      onChange={(e) => setBlogDate(e.target.value)}
                      required
                      className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                    />
                  </div>

                  <div>
                    <Label className="text-white mb-3 block text-sm font-medium">Reading Time (minutes)</Label>
                    <Input
                      type="number"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      placeholder="e.g., 5"
                      min="1"
                      className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white placeholder:text-white/50 rounded-xl transition-all"
                    />
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <Label className="text-white mb-3 block text-sm font-medium flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Featured Image
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBlogImage(e.target.files?.[0] || null)}
                      className="hidden"
                      id="blog-image-upload"
                    />
                    <label
                      htmlFor="blog-image-upload"
                      className="flex items-center justify-center gap-2 p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-rose-400 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                      <Upload className="w-6 h-6 text-white/70" />
                      <span className="text-white/70">
                        {blogImage ? blogImage.name : "Click to upload featured image (JPG, PNG)"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <Label className="text-white mb-3 block text-sm font-medium">Excerpt / Summary *</Label>
                  <Textarea
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="Brief summary of the blog post (2-3 sentences)..."
                    required
                    rows={3}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white placeholder:text-white/50 resize-none rounded-xl transition-all"
                  />
                  <p className="text-xs text-white/50 mt-2">This will be shown in blog previews and search results</p>
                </div>

                {/* Full Content */}
                <div>
                  <Label className="text-white mb-3 block text-sm font-medium">Full Content *</Label>
                  <Textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Write your full blog content here... You can use markdown formatting.

Example:
## Section Title
Your content here...

### Subsection
- Point 1
- Point 2

**Bold text** and *italic text*"
                    required
                    rows={15}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-rose-400/50 text-white placeholder:text-white/50 resize-none rounded-xl transition-all font-mono text-sm"
                  />
                  <p className="text-xs text-white/50 mt-2">Supports markdown formatting for rich content</p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white border-0 h-12 text-base font-semibold"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Publish Blog Post
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl border-white/20 p-6">
            <Video className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-2xl font-bold text-white mb-1">24</div>
            <div className="text-sm text-white/70">Videos Uploaded</div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-white/20 p-6">
            <Music className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-2xl font-bold text-white mb-1">12</div>
            <div className="text-sm text-white/70">Audio Files</div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-white/20 p-6">
            <FileText className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-2xl font-bold text-white mb-1">36</div>
            <div className="text-sm text-white/70">PDF Documents</div>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-xl border-white/20 p-6">
            <ClipboardList className="w-8 h-8 text-amber-400 mb-3" />
            <div className="text-2xl font-bold text-white mb-1">18</div>
            <div className="text-sm text-white/70">Quizzes Created</div>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-xl border-white/20 p-6">
            <BookOpen className="w-8 h-8 text-rose-400 mb-3" />
            <div className="text-2xl font-bold text-white mb-1">15</div>
            <div className="text-sm text-white/70">Blog Posts</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

