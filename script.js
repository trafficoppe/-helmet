// โหลดไฟล์เสียง press.mp3 ที่คุณมี
const clickSound = new Audio("press.mp3");
const successSound = new Audio("success.mp3");

// ข้อมูลคำถาม 4 ข้อ
const quizData = [
    {
        video: "vid1.mp4",
        headerTitle: "💥 สมองมีก้อนเดียว อะไหล่ไม่มีเปลี่ยน!",
        headerSubtitle: "หมวกใบหลักร้อย ปกป้องชีวิตหลักล้าน ใส่เถอะครับ!",
        question: "1. ทำไมเราถึงต้องสวมหมวกกันน็อกทุกครั้งที่ขับขี่หรือซ้อนท้าย?",
        options: [
            "เพื่อป้องกันสมองของเราจากแรงกระแทกหากเกิดเหตุไม่คาดฝัน",
            "เพื่อลดความรุนแรงของการบาดเจ็บที่ศีรษะ",
            "เพื่อความปลอดภัยของตัวเราเองและคนที่เรารัก",
            "เพื่อปฏิบัติตามกฎจราจรอย่างเคร่งครัด"
        ]
    },
    {
        video: "vid2.mp4",
        headerTitle: "🛡️ ใส่ทั้งที ต้องดีและเซฟชัวร์!",
        headerSubtitle: "หมวกกันน็อกที่ดีคือยันต์กันตาย เลือกให้เป๊ะ รอดแน่นอน!",
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
        headerTitle: "🏠 คนข้างหลัง... รอคุณกลับบ้าน",
        headerSubtitle: "อุบัติเหตุเกิดได้ทุกวินาที อย่าให้ความมักง่ายทำร้ายคนที่รักคุณ",
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

function loadQuestion() {
    isOptionSelected = false;
    if (nextBtn) nextBtn.classList.add("hidden");
    if (optionsContainer) optionsContainer.innerHTML = "";
    
    const currentQuiz = quizData[currentQuestionIndex];
    
    // 1. โหลดและเล่นวิดีโอ
    if (videoSource && questionVideo) {
        videoSource.src = currentQuiz.video;
        
        // เช็คเงื่อนไข: ข้อแรกปิดเสียงเพื่อให้เล่นอัตโนมัติได้ ข้อต่อไปเปิดเสียง
        if (currentQuestionIndex === 0) {
            questionVideo.muted = true;  
        } else {
            questionVideo.muted = false; 
        }
        
        questionVideo.load(); 
        questionVideo.play().catch(error => {
            console.log("การเล่นวิดีโอถูกบล็อก: ", error);
        });
    }

    // 2. เปลี่ยนข้อความ Header ด้านบนตามข้อนั้นๆ
    const headerTitle = document.getElementById("header-title");
    const headerSubtitle = document.getElementById("header-subtitle");
    
    // ตรวจสอบว่าใน quizData มีกำหนด headerTitle ไว้หรือไม่ แล้วค่อยเปลี่ยน
    if (headerTitle && currentQuiz.headerTitle) {
        headerTitle.textContent = currentQuiz.headerTitle;
    }
    if (headerSubtitle && currentQuiz.headerSubtitle) {
        headerSubtitle.textContent = currentQuiz.headerSubtitle;
    }

    // 3. โหลดข้อความคำถาม
    if (questionText) {
        questionText.innerText = currentQuiz.question;
    }

    // 4. สร้างปุ่มตัวเลือก
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
    
    // --- สั่งเล่นเสียง press.mp3 ทันทีที่กด ---
    clickSound.currentTime = 0; // รีเซ็ตเสียงกลับไปเริ่มใหม่เผื่อกดรัวๆ
    clickSound.play().catch(error => {
        console.log("ไม่สามารถเล่นเสียงได้: ", error);
    });
    // ------------------------------------

    // กำหนดสถานะว่ามีการเลือกแล้ว เพื่อให้ปุ่ม Next ทำงานได้
    isOptionSelected = true;
    
    const allButtons = document.querySelectorAll(".option-btn");
    
    // 1. รีเซ็ตสถานะของปุ่มทั้งหมดให้กลับมาเป็นปกติก่อน
    allButtons.forEach(btn => {
        btn.classList.remove("selected");
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    });

    // 2. ไฮไลท์ปุ่มที่ถูกเลือก
    selectedButton.classList.add("selected");
    
    // 3. ทำให้ปุ่มที่ไม่ได้เลือกจางลงเล็กน้อย
    allButtons.forEach(btn => {
        if (btn !== selectedButton) {
            btn.style.opacity = "0.6";
        }
    });

    // 4. แสดงปุ่ม Next
    if (nextBtn) nextBtn.classList.remove("hidden");
}

// ฟังก์ชันเมื่อกดปุ่ม Next
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        
        // สั่งเล่นเสียงตอนกดปุ่ม
        successSound.currentTime = 0; 
        successSound.play().catch(error => {
            console.log("ไม่สามารถเล่นเสียงได้: ", error);
        });

        // --- ส่วนที่เพิ่มเข้ามา: สั่งให้เสียงหยุดเมื่อเวลาผ่านไป 1.5 วินาที ---
        setTimeout(() => {
            successSound.pause(); // สั่งหยุดเสียง
            successSound.currentTime = 0; // รีเซ็ตกลับไปวินาทีที่ 0
        }, 1500); // 1500 มิลลิวินาที = 1.5 วินาที (คุณสามารถปรับตัวเลขนี้ให้สั้นหรือยาวขึ้นได้ครับ)
        // ------------------------------------------------------

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