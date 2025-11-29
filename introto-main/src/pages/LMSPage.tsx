import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Textarea } from "../components/ui/textarea";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  PlayCircle,
  FileText,
  Headphones,
  Award,
  Download,
  ChevronRight,
  ChevronDown,
  Lock
} from "lucide-react";
import { coursesData } from "../data/coursesData";

interface LMSPageProps {
  courseId: number;
  onNavigate: (page: string) => void;
}

interface ModuleProgress {
  completed: boolean;
  quizSubmitted: boolean;
  quizAnswers: number[];
  quizScore: number;
}

export function LMSPage({ courseId, onNavigate }: LMSPageProps) {
  const course = coursesData.find(c => c.id === courseId);
  const [currentModuleId, setCurrentModuleId] = useState(1);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [moduleProgress, setModuleProgress] = useState<Record<number, ModuleProgress>>({});
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4 font-bold">Course Not Found</h1>
          <Button onClick={() => onNavigate("courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const currentModule = course.modules.find(m => m.id === currentModuleId);
  const currentProgress = moduleProgress[currentModuleId] || {
    completed: false,
    quizSubmitted: false,
    quizAnswers: [],
    quizScore: 0
  };

  const completedModules = Object.values(moduleProgress).filter(p => p.completed).length;
  const totalModules = course.modules.length;
  const courseProgress = (completedModules / totalModules) * 100;
  const courseCompleted = completedModules === totalModules && feedbackSubmitted;

  const toggleModule = (moduleId: number) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const canAccessModule = (moduleId: number) => {
    if (moduleId === 1) return true;
    const previousModule = course.modules.find(m => m.id === moduleId - 1);
    return previousModule && moduleProgress[previousModule.id]?.completed;
  };

  const handleQuizSubmit = () => {
    if (!currentModule) return;

    let correctAnswers = 0;
    quizAnswers.forEach((answer, idx) => {
      if (answer === currentModule.quiz.questions[idx].correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / currentModule.quiz.questions.length) * 100);

    setModuleProgress({
      ...moduleProgress,
      [currentModuleId]: {
        completed: true,
        quizSubmitted: true,
        quizAnswers: quizAnswers,
        quizScore: score
      }
    });
  };

  const handleNextModule = () => {
    const nextModule = course.modules.find(m => m.id === currentModuleId + 1);
    if (nextModule) {
      setCurrentModuleId(nextModule.id);
      setQuizAnswers([]);
      setExpandedModules([...expandedModules, nextModule.id]);
    } else {
      setShowFeedback(true);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const downloadCertificate = () => {
    // In a real app, this would generate a PDF certificate
    alert(`Certificate for ${course.title} will be downloaded!`);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => onNavigate("courses")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Courses
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-4 font-bold">{course.title}</h1>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-white/70">
              <span>Course Progress: {completedModules} / {totalModules} modules completed</span>
              <span>{Math.round(courseProgress)}%</span>
            </div>
            <Progress value={courseProgress} className="h-3 bg-white/10" />
          </div>
        </div>

        {courseCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="p-8 border-green-500/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              <div className="text-center">
                <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl text-white mb-2 font-bold">Congratulations!</h2>
                <p className="text-white/80 mb-6 italic">You've successfully completed the course</p>
                <Button
                  onClick={downloadCertificate}
                  size="lg"
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Module Tree */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm sticky top-24">
              <h3 className="text-xl text-white mb-4 font-bold">Course Content</h3>
              <div className="space-y-2">
                {course.modules.map((module, idx) => {
                  const progress = moduleProgress[module.id];
                  const isExpanded = expandedModules.includes(module.id);
                  const isLocked = !canAccessModule(module.id);
                  const isCurrent = module.id === currentModuleId;

                  return (
                    <div key={module.id}>
                      <button
                        onClick={() => !isLocked && toggleModule(module.id)}
                        disabled={isLocked}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          isCurrent 
                            ? 'bg-amber-500/20 border border-amber-500/50' 
                            : isLocked
                            ? 'bg-white/5 opacity-50 cursor-not-allowed'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              progress?.completed 
                                ? 'bg-green-500' 
                                : isCurrent
                                ? 'bg-amber-500'
                                : 'bg-white/10'
                            }`}>
                              {progress?.completed ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : isLocked ? (
                                <Lock className="w-4 h-4 text-white/50" />
                              ) : (
                                <span className="text-white text-sm">{idx + 1}</span>
                              )}
                            </div>
                            <span className="text-white text-sm">{module.title}</span>
                          </div>
                          {!isLocked && (
                            isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-white/50" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-white/50" />
                            )
                          )}
                        </div>
                      </button>

                      {isExpanded && !isLocked && (
                        <div className="ml-11 mt-2 space-y-1">
                          <button
                            onClick={() => setCurrentModuleId(module.id)}
                            className="w-full p-2 rounded text-left text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                          >
                            {module.content.type === 'video' && <PlayCircle className="w-4 h-4" />}
                            {module.content.type === 'audio' && <Headphones className="w-4 h-4" />}
                            {module.content.type === 'pdf' && <FileText className="w-4 h-4" />}
                            Content
                          </button>
                          <button
                            onClick={() => setCurrentModuleId(module.id)}
                            className="w-full p-2 rounded text-left text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            Quiz ({module.quiz.questions.length} questions)
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Feedback Module */}
                {completedModules === totalModules && (
                  <button
                    onClick={() => setShowFeedback(true)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      showFeedback
                        ? 'bg-amber-500/20 border border-amber-500/50'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        feedbackSubmitted ? 'bg-green-500' : 'bg-purple-500'
                      }`}>
                        {feedbackSubmitted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white text-sm">★</span>
                        )}
                      </div>
                      <span className="text-white text-sm">Course Feedback</span>
                    </div>
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {showFeedback ? (
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                <h2 className="text-3xl text-white mb-6 font-bold">Course Feedback</h2>
                
                {feedbackSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl text-white mb-2 font-bold">Thank You!</h3>
                    <p className="text-white/80 italic">Your feedback has been submitted successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                    <p className="text-white/80 italic">
                      We'd love to hear about your experience with this course. Your feedback helps us improve and helps other learners make informed decisions.
                    </p>

                    <div>
                      <label className="block text-white mb-2">Your Feedback</label>
                      <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        rows={6}
                        placeholder="Share your thoughts about the course, what you learned, and how it helped you..."
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white border-0"
                    >
                      Submit Feedback
                    </Button>
                  </form>
                )}
              </Card>
            ) : currentModule ? (
              <div className="space-y-6">
                {/* Content Section */}
                <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                  <h2 className="text-3xl text-white mb-4 font-bold">{currentModule.title}</h2>
                  <p className="text-white/80 mb-6 italic">{currentModule.description}</p>

                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-white/10 mb-6">
                    {currentModule.content.type === 'video' && (
                      <div className="text-center">
                        <PlayCircle className="w-20 h-20 text-white/70 mx-auto mb-4" />
                        <p className="text-white/70">Video Player</p>
                        <p className="text-white/50 text-sm">{currentModule.content.duration}</p>
                      </div>
                    )}
                    {currentModule.content.type === 'audio' && (
                      <div className="text-center">
                        <Headphones className="w-20 h-20 text-white/70 mx-auto mb-4" />
                        <p className="text-white/70">Audio Player</p>
                        <p className="text-white/50 text-sm">{currentModule.content.duration}</p>
                      </div>
                    )}
                    {currentModule.content.type === 'pdf' && (
                      <div className="text-center">
                        <FileText className="w-20 h-20 text-white/70 mx-auto mb-4" />
                        <p className="text-white/70">PDF Document</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Quiz Section */}
                <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-2xl text-white mb-6 font-bold">Module Quiz</h3>

                  {currentProgress.quizSubmitted ? (
                    <div>
                      <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                        <div className="text-center">
                          <div className="text-5xl text-white mb-2">{currentProgress.quizScore}%</div>
                          <p className="text-white/80">Your Score</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {currentModule.quiz.questions.map((question, idx) => {
                          const userAnswer = currentProgress.quizAnswers[idx];
                          const isCorrect = userAnswer === question.correctAnswer;

                          return (
                            <div key={question.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                              <p className="text-white mb-3">{idx + 1}. {question.question}</p>
                              <div className="space-y-2">
                                {question.options.map((option, optIdx) => {
                                  const isUserAnswer = optIdx === userAnswer;
                                  const isCorrectAnswer = optIdx === question.correctAnswer;

                                  return (
                                    <div
                                      key={optIdx}
                                      className={`p-3 rounded-lg flex items-center gap-3 ${
                                        isCorrectAnswer
                                          ? 'bg-green-500/20 border border-green-500/50'
                                          : isUserAnswer
                                          ? 'bg-red-500/20 border border-red-500/50'
                                          : 'bg-white/5'
                                      }`}
                                    >
                                      {isCorrectAnswer && <CheckCircle className="w-5 h-5 text-green-400" />}
                                      {isUserAnswer && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-400" />}
                                      <span className={`${
                                        isCorrectAnswer ? 'text-green-200' : isUserAnswer ? 'text-red-200' : 'text-white/70'
                                      }`}>
                                        {option}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <Button
                        onClick={handleNextModule}
                        size="lg"
                        className="w-full mt-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0"
                      >
                        {currentModuleId < totalModules ? 'Next Module' : 'Complete Course'}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {currentModule.quiz.questions.map((question, idx) => (
                        <div key={question.id} className="space-y-3">
                          <p className="text-white">{idx + 1}. {question.question}</p>
                          <div className="space-y-2">
                            {question.options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  const newAnswers = [...quizAnswers];
                                  newAnswers[idx] = optIdx;
                                  setQuizAnswers(newAnswers);
                                }}
                                className={`w-full p-3 rounded-lg text-left transition-all ${
                                  quizAnswers[idx] === optIdx
                                    ? 'bg-amber-500/20 border border-amber-500/50 text-white'
                                    : 'bg-white/5 hover:bg-white/10 text-white/80'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <Button
                        onClick={handleQuizSubmit}
                        disabled={quizAnswers.length !== currentModule.quiz.questions.length}
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white border-0 disabled:opacity-50"
                      >
                        Submit Quiz
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
