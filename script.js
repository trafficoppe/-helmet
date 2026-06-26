// ข้อมูลคำถาม 4 ข้อ
const quizData = [
    {
        video: "vid1.mp4", // เรียกใช้ไฟล์วิดีโอในโฟลเดอร์ของคุณ
        question: "1. ทำไมเราถึงต้องสวมหมวกกันน็อกทุกครั้งที่ขับขี่หรือซ้อนท้าย?",
        options: [
            "เพื่อป้องกันสมองของเราจากแรงกระแทกหากเกิดเหตุไม่คาดฝัน",
            "เพื่อลดความรุนแรงของการบาดเจ็บที่ศีรษะ",
            "เพื่อความปลอดภัยของตัวเราเองและคนที่เรารัก",
            "เพื่อปฏิบัติตามกฎจราจรอย่างเคร่งครัด"
        ]
    },
    {
        video: "vid2.mp4", // หากคุณมีไฟล์ vid2.mp4, vid3.mp4 สามารถเปลี่ยนชื่อตรงนี้ได้เลยครับ
        question: "2. หมวกกันน็อกที่ดีเพื่อความปลอดภัย ควรมีลักษณะแบบไหน?",
        options: [
            "มีเครื่องหมาย มอก. รับรองมาตรฐาน",
            "ขนาดพอดีกับศีรษะ ไม่หลวมหรือคับจนเกินไป",
            "มีสายรัดคางที่แข็งแรงและล็อคได้แน่นหนา",
            "มีสีสันสว่างสดใส เพื่อให้รถคันอื่นมองเห็นได้ง่าย"
        ]
    },
    {
        video: "vid3.mp4", 
        question: "3. นอกจากลดความรุนแรงตอนอุบัติเหตุแล้ว หมวกกันน็อกยังช่วยอะไรอีกบ้าง?",
        options: [
            "ช่วยป้องกันลมพัดเข้าตาขณะขับขี่",
            "ป้องกันฝุ่นละอองและแมลงบินเข้าตา",
            "ช่วยบังแสงแดดจ้า ป้องกันสายตาเสีย",
            "ป้องกันสะเก็ดหินเล็กๆ กระเด็นโดนใบหน้า"
        ]
    },
    {
        video: "vid1.mp4", 
        question: "4. เราควรเปลี่ยนหมวกกันน็อกใบใหม่เมื่อไหร่ดีนะ?",
        options: [
            "เมื่อหมวกกันน็อกเคยหล่นกระแทกพื้นแรงๆ ไปแล้ว",
            "เมื่อเคยเกิดอุบัติเหตุมาแล้ว แม้ภายนอกจะดูไม่แตกหัก",
            "เมื่อใช้งานมานานเกิน 3-5 ปี ฟองน้ำด้านในเริ่มเสื่อม",
            "เมื่อสายรัดคางชำรุด หรือตัวล็อคทำงานไม่ปกติ"
        ]
    }
];

let currentQuestionIndex = 0;
let isOptionSelected = false;

const questionVideo = document.getElementById("question-video");
const videoSource = document.getElementById("video-source");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const restartBtn = document.getElementById("restart-btn");

// ฟังก์ชันโหลดคำถาม
function loadQuestion() {
    isOptionSelected = false;
    if (nextBtn) nextBtn.classList.add("hidden");
    if (optionsContainer) optionsContainer.innerHTML = "";
    
    const currentQuiz = quizData[currentQuestionIndex];
    
    // โหลดและเล่นวิดีโอ
    if (videoSource && questionVideo) {
        videoSource.src = currentQuiz.video;
        questionVideo.load(); 
        questionVideo.play().catch(error => {
            console.log("เบราว์เซอร์บล็อกการเล่นอัตโนมัติชั่วคราว: ", error);
        });
    }

    if (questionText) {
        questionText.innerText = currentQuiz.question;
    }

    if (optionsContainer) {
        currentQuiz.options.forEach((option) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.addEventListener("click", () => selectOption(button));
            optionsContainer.appendChild(button);
        });
    }
}

// ฟังก์ชันเมื่อผู้ใช้เลือกคำตอบ
function selectOption(selectedButton) {
    // กำหนดสถานะว่ามีการเลือกแล้ว เพื่อให้ปุ่ม Next ทำงานได้
    isOptionSelected = true;
    
    const allButtons = document.querySelectorAll(".option-btn");
    
    // 1. รีเซ็ตสถานะของปุ่มทั้งหมดให้กลับมาเป็นปกติก่อน
    allButtons.forEach(btn => {
        btn.classList.remove("selected");
        btn.style.opacity = "1";
        btn.style.cursor = "pointer"; // เปลี่ยนให้เมาส์กลับมาเป็นรูปมือเพื่อชี้ว่ากดเปลี่ยนได้
    });

    // 2. ไฮไลท์ปุ่มที่ถูกเลือก
    selectedButton.classList.add("selected");
    
    // 3. ทำให้ปุ่มที่ไม่ได้เลือกจางลงเล็กน้อย (เพื่อให้จุดโฟกัสอยู่ที่คำตอบที่เลือก)
    allButtons.forEach(btn => {
        if (btn !== selectedButton) {
            btn.style.opacity = "0.6";
            // สังเกตว่าเราไม่ได้ใส่ cursor = "not-allowed" แล้ว เพื่อให้ผู้ใช้รู้ว่ามันยังกดเปลี่ยนได้
        }
    });

    // 4. แสดงปุ่ม Next
    if (nextBtn) nextBtn.classList.remove("hidden");
}

// ฟังก์ชันเมื่อกดปุ่ม Next
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (questionVideo) questionVideo.pause(); 
        
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });
}

// ฟังก์ชันแสดงหน้าต่างตอนจบ
function showResult() {
    if (quizSection) quizSection.classList.add("hidden");
    if (resultSection) resultSection.classList.remove("hidden");
}

// ฟังก์ชันเริ่มใหม่
if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        if (quizSection) quizSection.classList.remove("hidden");
        if (resultSection) resultSection.classList.add("hidden");
        loadQuestion();
    });
}

// สั่งให้ระบบทำงานเมื่อหน้าเว็บพร้อม
document.addEventListener("DOMContentLoaded", loadQuestion);