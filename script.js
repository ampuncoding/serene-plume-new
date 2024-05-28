const questions = [
    {
        question: "Ketika Anda merasa dihargai oleh orang yang Anda sayangi, apa yang membuat Anda merasa paling dicintai?",
        answers: [
            { text: "A. Anda merasa bahagia ketika mereka memberikan pujian dan kata-kata positif.", loveLanguage: 'A' },
            { text: "B. Anda merasa senang ketika mereka membantu Anda melakukan pekerjaan rumah atau mengurus segala sesuatunya untuk Anda.", loveLanguage: 'B' },
            { text: "C. Anda merasa dicintai ketika mereka memberi Anda hadiah, bahkan hadiah kecil sekalipun.", loveLanguage: 'C' },
            { text: "D. Kamu merasa bahagia ketika mereka menyediakan waktu khusus untukmu dan fokus pada dirimu sepenuhnya.", loveLanguage: 'D' },
            { text: "E. Anda merasa dicintai ketika mereka memeluk, atau menggenggam tangan Anda.", loveLanguage: 'E' }
        ]
    },
    {
        question: "Apa yang paling sering Anda minta dari orang yang Anda sayangi?",
        answers: [
            { text: "A. Pujian dan ungkapan cinta.", loveLanguage: 'A' },
            { text: "B. Bantuan dalam menyelesaikan tugas atau pekerjaan.", loveLanguage: 'B' },
            { text: "C. Hadiah, bahkan yang kecil dan sederhana.", loveLanguage: 'C' },
            { text: "D. Waktu berkualitas yang dihabiskan bersama tanpa gangguan.", loveLanguage: 'D' },
            { text: "E. Sentuhan fisik seperti pelukan atau berpegangan tangan.", loveLanguage: 'E' }
        ]
    },
    {
        question: "Ketika Anda merasa kesal dengan orang yang Anda sayangi, apa yang sering Anda lakukan?",
        answers: [
            { text: "A. Mengkritik atau mengeluhkan perkataannya.", loveLanguage: 'A' },
            { text: "B. Menarik diri dan menghindari komunikasi.", loveLanguage: 'B' },
            { text: "C. Merasa kecewa karena mereka tidak memberi Anda hadiah.", loveLanguage: 'C' },
            { text: "D. Merasa kesal karena mereka tidak meluangkan waktu untuk Anda.", loveLanguage: 'D' },
            { text: "E. Hindari sentuhan fisik.", loveLanguage: 'E' }
        ]
    },
    {
        question: "Menurut Anda, apa cara terbaik untuk menunjukkan cinta kepada orang lain?",
        answers: [
            { text: "A. Memberikan pujian dan kata-kata positif.", loveLanguage: 'A' },
            { text: "B. Mengambil tindakan untuk membantu seseorang.", loveLanguage: 'B' },
            { text: "C. Memberikan hadiah yang menunjukkan bahwa Anda memikirkan mereka.", loveLanguage: 'C' },
            { text: "D. Menghabiskan waktu berkualitas dengan seseorang.", loveLanguage: 'D' },
            { text: "E. Memberikan sentuhan fisik seperti pelukan atau berpegangan tangan.", loveLanguage: 'E' }
        ]
    },
    {
        question: "Apa yang Anda anggap paling penting dalam sebuah hubungan?",
        answers: [
            { text: "A. Komunikasi yang terbuka dan jujur.", loveLanguage: 'A' },
            { text: "B. Saling mendukung dan membantu.", loveLanguage: 'B' },
            { text: "C. Komitmen dan loyalitas.", loveLanguage: 'C' },
            { text: "D. Kedekatan.", loveLanguage: 'D' },
            { text: "E. Kepercayaan dan keamanan.", loveLanguage: 'E' }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let loveLanguageCounts = { A: 0, B: 0, C: 0, D: 0, E: 0 };

function startQuiz() {
    currentQuestionIndex = 0;
    loveLanguageCounts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    nextButton.innerHTML = "Next";
    showQuestion();
    document.getElementById("home-button").style.display = "none";
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        button.dataset.loveLanguage = answer.loveLanguage;
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const selectedLoveLanguage = selectedBtn.dataset.loveLanguage;
    
    loveLanguageCounts[selectedLoveLanguage]++;
    
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    
    handleNextButton(); // Automatically move to the next question
}

function showScore() {
    resetState();
    const highestCount = Math.max(...Object.values(loveLanguageCounts));
    const primaryLoveLanguage = Object.keys(loveLanguageCounts).find(key => loveLanguageCounts[key] === highestCount);
    
    let resultText;
    switch (primaryLoveLanguage) {
        case 'A':
            resultText = "Words of Affirmation: Kamu menghargai kata-kata pujian, ungkapan kasih sayang, dan penegasan cinta dari orang yang Anda sayangi.";
            break;
        case 'B':
            resultText = "Acts of Service: Kamu merasa dicintai ketika orang yang Anda sayangi membantumu dengan tugas, menyelesaikan pekerjaan, atau melakukan sesuatu yang membuat hidupmu lebih mudah.";
            break;
        case 'C':
            resultText = "Receiving Gifts: Kamu merasa dihargai dan dicintai ketika orang yang Anda sayangi memberikanmu hadiah, meskipun itu kecil dan sederhana.";
            break;
        case 'D':
            resultText = "Quality Time: Kamu merasa dicintai ketika orang yang Anda sayangi meluangkan waktu khusus untukmu, fokus padamu, dan terlibat dalam percakapan yang mendalam.";
            break;
        case 'E':
            resultText = "Physical Touch: Kamu merasa dicintai dan dihargai melalui sentuhan fisik seperti pelukan, ciuman, genggaman tangan, dan keintiman fisik lainnya.";
            break;
        default:
            resultText = "Tidak dapat menentukan bahasa cinta utama.";
            break;
    }
    
    questionElement.innerHTML = `Love language Anda adalah ${primaryLoveLanguage}.\n\n${resultText}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
    const homeButton = document.getElementById("home-button");
    homeButton.style.display = "block";
    homeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

startQuiz();
