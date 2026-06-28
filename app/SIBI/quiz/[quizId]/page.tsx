"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconX,
  IconRotateClockwise,
  IconVolume,
  IconArrowLeft,
} from "@tabler/icons-react";

type QuestionType = "video" | "image";

type Question = {
  id: number;
  type: QuestionType;
  mediaSrc: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type LevelQuiz = {
  id: number;
  title: string;
  questions: Question[];
};

const quizData: LevelQuiz[] = [
  {
    id: 1,
    title: "Salam & Perkenalan",
    questions: [
      {
        id: 1,
        type: "video",
        mediaSrc: "/videos/quiz/BolaMantul.mp4",
        question: "Apa arti dari gerakan isyarat ini?",
        options: ["Apa kabar?", "Selamat pagi", "Terima kasih", "Maaf"],
        correctAnswer: 1,
        explanation: "Gerakan tangan dari dada ke atas seperti matahari terbit menunjukkan sapaan pagi hari.",
      },
      {
        id: 2,
        type: "image",
        mediaSrc: "/images/quiz/huruf-a.jpg",
        question: "Huruf apa yang ditunjukkan oleh gerakan tangan ini?",
        options: ["Huruf A", "Huruf B", "Huruf C", "Huruf D"],
        correctAnswer: 0,
        explanation: "Tangan mengepal dengan ibu jari di samping membentuk huruf A dalam SIBI.",
      },
      {
        id: 3,
        type: "video",
        mediaSrc: "/videos/quiz/BolaMantul.mp4",
        question: "Apa arti dari gerakan isyarat ini?",
        options: ["Halo", "Terima kasih", "Sampai jumpa", "Maaf"],
        correctAnswer: 1,
        explanation: "Gerakan tangan dari dada ke depan dengan telapak terbuka menunjukkan ungkapan terima kasih.",
      },
      {
        id: 4,
        type: "image",
        mediaSrc: "/images/quiz/huruf-a.jpg",
        question: "Angka berapa yang ditunjukkan oleh gerakan tangan ini?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 0,
        explanation: "Jari telunjuk tegak lurus menunjukkan angka 1 dalam SIBI.",
      },
      {
        id: 5,
        type: "video",
        mediaSrc: "/videos/quiz/BolaMantul.mp4",
        question: "Apa arti dari gerakan isyarat ini?",
        options: ["Terima kasih", "Maaf", "Sampai jumpa", "Selamat pagi"],
        correctAnswer: 1,
        explanation: "Gerakan tangan memutar di depan dada menunjukkan permintaan maaf.",
      },
      {
        id: 6,
        type: "image",
        mediaSrc: "/images/quiz/huruf-a.jpg",
        question: "Huruf apa yang ditunjukkan oleh gerakan tangan ini?",
        options: ["Huruf A", "Huruf B", "Huruf C", "Huruf D"],
        correctAnswer: 1,
        explanation: "Telapak tangan terbuka dengan jari rapat membentuk huruf B dalam SIBI.",
      },
      {
        id: 7,
        type: "video",
        mediaSrc: "/videos/quiz/BolaMantul.mp4",
        question: "Apa arti dari gerakan isyarat ini?",
        options: ["Halo", "Selamat pagi", "Sampai jumpa", "Apa kabar"],
        correctAnswer: 2,
        explanation: "Gerakan melambaikan tangan dengan telapak terbuka menunjukkan perpisahan.",
      },
      {
        id: 8,
        type: "image",
        mediaSrc: "/images/quiz/huruf-a.jpg",
        question: "Angka berapa yang ditunjukkan oleh gerakan tangan ini?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        explanation: "Jari telunjuk dan jari tengah tegak lurus menunjukkan angka 2 dalam SIBI.",
      },
      {
        id: 9,
        type: "video",
        mediaSrc: "/videos/quiz/BolaMantul.mp4",
        question: "Apa arti dari gerakan isyarat ini?",
        options: ["Apa kabar?", "Halo", "Terima kasih", "Selamat pagi"],
        correctAnswer: 0,
        explanation: "Gerakan tangan di samping wajah dengan ekspresi bertanya menunjukkan pertanyaan sapaan.",
      },
      {
        id: 10,
        type: "image",
        mediaSrc: "/images/quiz/huruf-a.jpg",
        question: "Huruf apa yang ditunjukkan oleh gerakan tangan ini?",
        options: ["Huruf A", "Huruf B", "Huruf C", "Huruf D"],
        correctAnswer: 2,
        explanation: "Tangan melengkung seperti bentuk C menunjukkan huruf C dalam SIBI.",
      },
    ],
  },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuizLevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params.quizId);

  const level = quizData.find((lvl) => lvl.id === levelId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // FIX: Dependency array dikosongkan [] agar animasi masuk HANYA jalan saat pertama kali kuis dibuka
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  if (!level) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm">Level tidak ditemukan.</p>
      </div>
    );
  }

  const totalQuestions = level.questions.length;
  const currentQuestion = level.questions[currentIndex];
  const progressPct = ((currentIndex + 1) / totalQuestions) * 100;
  const isCorrect = isAnswered && selectedAnswer === currentQuestion.correctAnswer;
  const isWrong = isAnswered && selectedAnswer !== currentQuestion.correctAnswer;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  // FIX: Hapus setIsMounted(false) agar tidak kedip pas ganti soal
  const goNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleSkip = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 70;
  const salah = totalQuestions - score;

  const ringkasanMateri = [
    { icon: "👨‍👩‍👧", label: "Salam Dasar", desc: "Halo, Apa Kabar, Terima Kasih" },
    { icon: "🤝", label: "Perkenalan", desc: "Nama, Saya, Kamu" },
    { icon: "👋", label: "Penutup", desc: "Sampai Jumpa, Maaf" },
  ];

  const pesanHasil = isPassed ? "Luar Biasa!" : percentage >= 50 ? "Hampir Berhasil!" : "Tetap Semangat!";
  const subPesan = `Kamu telah menyelesaikan Quiz ${level.title}.`;

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      
      {/* 1. HEADER NAVIGASI */}
      <div className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => router.push("/SIBI/quiz")} className="hover:text-blue-700 transition">
            Quiz
          </button>
          <IconChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-900 font-semibold">Isi Quiz</span>
        </div>
        <button
          onClick={() => router.push("/SIBI/quiz")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-700 transition"
        >
          <IconArrowLeft size={16} />
          Kembali
        </button>
      </div>

      {/* 2. AREA KONTEN UTAMA */}
      <div className={`flex flex-col flex-1 transition-all duration-500 ease-out transform ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        
        {showResult ? (
          /* ===== KONDISI TAMPILAN HASIL (SKOR) MUNCUL ===== */
          <div className="flex items-center justify-center flex-1 px-8 py-12">
            <div className="w-full max-w-3xl grid grid-cols-2 gap-6">

              {/* Kiri — Ringkasan Materi */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
                    <IconCheck size={15} className="text-gray-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">Ringkasan Materi</h3>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  {ringkasanMateri.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50">
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-lg shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => router.push("/SIBI/quiz")}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl py-3 transition"
                  >
                    Lanjut ke Level Berikutnya
                  </button>
                  <button
                    onClick={() => {
                      setCurrentIndex(0);
                      setSelectedAnswer(null);
                      setIsAnswered(false);
                      setScore(0);
                      setShowResult(false);
                    }}
                    className="w-full border border-gray-200 text-gray-700 font-semibold text-sm rounded-xl py-3 hover:bg-gray-50 transition"
                  >
                    Ulangi Kuis
                  </button>
                </div>
              </div>

              {/* Kanan — Hasil */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${
                  isPassed ? "bg-blue-600" : "bg-gray-300"
                }`}>
                  <span className="text-3xl">🏆</span>
                </div>

                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{pesanHasil}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">{subPesan}</p>

                <div className="w-full">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">
                    Detail Skor
                  </p>
                  <div className="flex justify-center gap-12">
                    <div className="text-center">
                      <p className="text-4xl font-extrabold text-gray-900">{score}</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wide">Benar</p>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="text-center">
                      <p className="text-4xl font-extrabold text-red-500">{salah}</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wide">Salah</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ===== KONDISI SEBELUM SELESAI (PERTANYAAN AKTIF) MUNCUL ===== */
          <>
            {/* Progress bar info (FIXED: Tombol X kecil sudah dihapus total di sini) */}
            <div className="px-8 pt-6 pb-4">
              <div className="max-w-2xl mx-auto w-full">
                <div className="flex justify-center mb-1.5">
                  <span className="text-xs text-gray-400 font-medium">Soal {currentIndex + 1} dari {totalQuestions}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-700 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            </div>

            {/* Area Soal & Media Player */}
            <div className="flex-1 px-8 pb-6 max-w-2xl mx-auto w-full">
              <h1 className="text-xl font-extrabold text-gray-900 text-center mb-5">{currentQuestion.question}</h1>

              <div className="rounded-2xl overflow-hidden bg-[#d1d1d1] aspect-video mb-6 relative">
                {currentQuestion.type === "video" ? (
                  <>
                    <video ref={videoRef} key={currentQuestion.mediaSrc} src={currentQuestion.mediaSrc} autoPlay className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-3 bg-linear-to-t from-black/60 to-transparent">
                      <button onClick={handleReplay} className="text-white hover:text-blue-300 transition" aria-label="Putar ulang">
                        <IconRotateClockwise size={20} strokeWidth={2} />
                      </button>
                      <div className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-blue-400 rounded-full" />
                      </div>
                      <button className="text-white hover:text-blue-300 transition" aria-label="Volume">
                        <IconVolume size={20} strokeWidth={2} />
                      </button>
                    </div>
                  </>
                ) : (
                  <img key={currentQuestion.mediaSrc} src={currentQuestion.mediaSrc} alt="Ilustrasi isyarat" className="w-full h-full object-contain bg-gray-100" />
                )}
              </div>

              {/* Pilihan Ganda */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isThisCorrect = index === currentQuestion.correctAnswer;
                  const isThisWrong = isAnswered && isSelected && !isThisCorrect;

                  let cls = "relative flex items-center gap-3 px-4 py-4 rounded-2xl border text-sm font-medium text-left transition-all cursor-pointer select-none ";

                  if (!isAnswered) {
                    cls += isSelected ? "border-blue-500 bg-blue-50 text-blue-800" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
                  } else {
                    if (isThisCorrect) cls += "border-blue-500 bg-blue-50 text-blue-800";
                    else if (isThisWrong) cls += "border-red-400 bg-red-50 text-red-700";
                    else cls += "border-gray-100 bg-gray-50 text-gray-400 cursor-default";
                  }

                  return (
                    <button key={index} onClick={() => handleSelectAnswer(index)} disabled={isAnswered} className={cls}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                        !isAnswered && isSelected ? "bg-blue-100 text-blue-700"
                        : isAnswered && isThisCorrect ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                      }`}>
                        {OPTION_LABELS[index]}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isThisCorrect && <IconCheck size={18} className="text-blue-600 shrink-0" strokeWidth={2.5} />}
                      {isAnswered && isThisWrong && <IconX size={18} className="text-red-500 shrink-0" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>

              {/* Penjelasan Pembahasan */}
              {isCorrect && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-4 text-sm text-blue-800">
                  <IconCheck size={18} className="text-blue-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold mb-0.5">Jawaban Tepat! ✅</p>
                    <p className="text-blue-700 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              )}
              {isWrong && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl mb-4 text-sm text-red-800">
                  <IconX size={18} className="text-red-500 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold mb-0.5">Jawaban Kurang Tepat ❌</p>
                    <p className="text-red-700 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Actions Bar */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-4 mt-auto">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-1.5 text-sm font-semibold transition ${currentIndex === 0 ? "text-gray-200 cursor-not-allowed" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <IconChevronLeft size={18} strokeWidth={2.5} />
                  Sebelumnya
                </button>

                <div className="flex items-center gap-3">
                  {!isAnswered && (
                    <button onClick={handleSkip} className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition px-2">
                      Lewati
                    </button>
                  )}
                  {!isAnswered ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedAnswer === null}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition ${selectedAnswer === null ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 text-white"}`}
                    >
                      Periksa Jawaban
                      <IconChevronRight size={16} strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button
                      onClick={goNext}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white transition"
                    >
                      {currentIndex === totalQuestions - 1 ? "Lihat Hasil" : "Soal Berikutnya"}
                      <IconChevronRight size={16} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}