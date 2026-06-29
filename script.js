// โหลดไฟล์เสียง
const clickSound = new Audio("press.mp3");
const successSound = new Audio("success.mp3");
const endSound = new Audio("end.wav"); 

// ชุดคำตอบ 4 ข้อสำหรับสุ่มในข้อ 1
const excuses = [
    "กลัวผมเสียทรง แล้วก็ร้อนด้วย",
    "ขับใกล้ๆ ขับในพื้นที่ ไม่เป็นอะไรหรอก",
    "ขี้เกียจพกพา รีบมาทำงาน",
    "ขับช้า ไม่น่าจะเป็นอันตรายหรอก"
];

// ชุดคำตอบ 10 ข้อสำหรับสุ่มในข้อ 2
const statsOptions = [
    "พาตัวเองออกจากสถิติ 86% ของผู้เสียชีวิตที่ไม่ได้ใส่หมวก",
    "เซฟสมองให้ปลอดภัย! ลดความเสี่ยงบาดเจ็บที่ศีรษะถึง 43%",
    "เป็นฮีโร่ให้เด็กๆ ช่วยเพิ่มยอดเด็กใส่หมวกที่ตอนนี้มีแค่ 8%",
    "ช่วยดันยอดคนไทยใส่หมวกกันน็อก ให้ทะลุ 50% ของประเทศ",
    "เริ่มที่ตัวเรา! ช่วยลดสถิติผู้สูญเสีย 18,218 คนต่อปีในไทย",
    "เปลี่ยนตัวเองจาก \"กลุ่มเสี่ยง 86%\" เป็นคนที่กลับบ้านปลอดภัย",
    "ใส่ปุ๊บ อุ่นใจปั๊บ! ปิดประตูความเสี่ยงเจ็บหนัก 43% ได้ทันที",
    "เป็นหนึ่งพลังเล็กๆ ช่วยลดตัวเลขอุบัติเหตุโลก 1.19 ล้านราย",
    "สร้างมาตรฐานใหม่ ลบสถิติไทยในกลุ่มประเทศเสี่ยงสูงถึง 92%",
    "ใส่หมวกทุกวัน ช่วยกดตัวเลขความสูญเสีย 86% ให้ลดลงได้จริง"
];

// ฟังก์ชันสำหรับสุ่มเลือกตัวเลือกตามจำนวนที่กำหนด
function getRandomOptions(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ข้อมูลคำถาม 3 ข้อ
const quizData = [
    {
        video: "vid7.mp4",
        headerTitle: "💥 สมองมีก้อนเดียว อะไหล่ไม่มีเปลี่ยน!",
        headerSubtitle: "หมวกใบหลักร้อย ปกป้องชีวิตหลักล้าน ใส่เถอะครับ!",
        question: "1. เอ๊ะ!ทำไมวันนี้ ไม่สวมหมวกกันน็อคเอ่ย?",
        options: [] 
    },
    {
        video: "vid8.mp4",
        headerTitle: "🛡️ ใส่ทั้งที ต้องดีและเซฟชัวร์!",
        headerSubtitle: "หมวกกันน็อกที่ดีคือยันต์กันตุย เลือกให้เป๊ะ รอดแน่นอน!",
        question: "2. รู้ไหมเอ่ย... น้องหมวกกันน็อก 1 ใบ ช่วยอะไรได้บ้าง",
        options: [] 
    },
    {
        video: "vid5.mp4", 
        headerTitle: "ความปลอดภัยในรั้วมหาวิทยาลัย",
        headerSubtitle: "กฎระเบียบมีไว้เพื่อความปลอดภัยของชาวมหิดลทุกคนครับ",
        question: "3. คุณทราบประกาศมหาวิทยาลัยมหิดล เรื่อง หลักเกณฑ์การสวมหมวกนิรภัยในการใช้รถจักรยานยนต์ มหาวิทยาลัยมหิดล ศาลายา หรือไม่?",
        options: [
            "ทราบ",
            "ไม่ทราบ"
        ]
    }
];

let currentQuestionIndex = 0;
let isOptionSelected = false;
let answerQ1 = "";
let answerQ3 = "";
let isPdfDownloaded = "ไม่ดาวน์โหลด"; // 👈 ตั้งค่าเริ่มต้นไว้ว่ายังไม่โหลด

// ประกาศตัวแปรทั้งหมด
const questionVideo = document.getElementById("question-video");
const videoSource = document.getElementById("video-source");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");

const quizSection = document.getElementById("quiz-section");
const pdfSection = document.getElementById("pdf-section");
const nextToResultBtn = document.getElementById("next-to-result-btn");
// ดึงปุ่มดาวน์โหลดมาใช้งาน
const downloadBtn = document.querySelector(".download-btn");

if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        // ถ้ามีการคลิกปุ่มนี้ ให้เปลี่ยนสถานะเป็นดาวน์โหลดแล้ว
        isPdfDownloaded = "ดาวน์โหลดแล้ว"; 
    });
}
const statsSection = document.getElementById("stats-section");
const nextToFinalBtn = document.getElementById("next-to-final-btn");
const resultSection = document.getElementById("result-section");
const finalOkBtn = document.getElementById("final-ok-btn");

function loadQuestion() {
    isOptionSelected = false;
    if (nextBtn) nextBtn.classList.add("hidden");
    if (optionsContainer) optionsContainer.innerHTML = "";
    
    if (currentQuestionIndex === 0) {
        quizData[0].options = getRandomOptions(excuses, 4);
    }
    if (currentQuestionIndex === 1) {
        quizData[1].options = getRandomOptions(statsOptions, 4);
    }
    
    const currentQuiz = quizData[currentQuestionIndex];
    
    if (videoSource && questionVideo) {
        videoSource.src = currentQuiz.video;
        if (currentQuestionIndex === 0) {
            questionVideo.muted = true;  
        } else {
            questionVideo.muted = false; 
        }
        questionVideo.load(); 
        questionVideo.play().catch(error => console.log(error));
    }

    const headerTitle = document.getElementById("header-title");
    const headerSubtitle = document.getElementById("header-subtitle");
    
    if (headerTitle && currentQuiz.headerTitle) {
        headerTitle.textContent = currentQuiz.headerTitle;
    }
    if (headerSubtitle && currentQuiz.headerSubtitle) {
        headerSubtitle.textContent = currentQuiz.headerSubtitle;
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

function selectOption(selectedButton) {
    clickSound.currentTime = 0; 
    clickSound.play().catch(error => console.log(error));
    isOptionSelected = true;

    // --- โค้ดที่เพิ่มเข้ามา: บันทึกคำตอบที่เลือก ---
    if (currentQuestionIndex === 0) {
        answerQ1 = selectedButton.innerText; // เก็บคำตอบข้อ 1
    } else if (currentQuestionIndex === 2) {
        answerQ3 = selectedButton.innerText; // เก็บคำตอบข้อ 3
    }
    // ------------------------------------------
    
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        btn.classList.remove("selected");
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    });

    selectedButton.classList.add("selected");
    
    allButtons.forEach(btn => {
        if (btn !== selectedButton) {
            btn.style.opacity = "0.6";
        }
    });

    if (nextBtn) nextBtn.classList.remove("hidden");
}

// กดปุ่ม Next ในหน้าคำถาม
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        successSound.currentTime = 0; 
        successSound.play().catch(error => console.log(error));

        setTimeout(() => {
            successSound.pause(); 
            successSound.currentTime = 0; 
        }, 1500); 

        if (questionVideo) questionVideo.pause(); 
        
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            // จบ 3 ข้อ ไปหน้า PDF
            if (quizSection) quizSection.classList.add("hidden");
            if (pdfSection) pdfSection.classList.remove("hidden");
        }
    });
}

// กดปุ่ม "ถัดไป ➡" ในหน้า PDF (ไปหน้าสถิติ)
if (nextToResultBtn) {
    nextToResultBtn.addEventListener("click", () => {
        clickSound.currentTime = 0; 
        clickSound.play().catch(error => console.log(error));

        if (pdfSection) pdfSection.classList.add("hidden");
        if (statsSection) statsSection.classList.remove("hidden");
    });
}

// กดปุ่ม "ถัดไป" ในหน้าสถิติ (ไปหน้าสรุปผลตอนจบ)
if (nextToFinalBtn) {
    nextToFinalBtn.addEventListener("click", () => {
        clickSound.currentTime = 0; 
        clickSound.play().catch(error => console.log(error));

        if (statsSection) statsSection.classList.add("hidden");
        showResult();
    });
}

// ฟังก์ชันแสดงหน้าต่างตอนจบ
function showResult() {
    if (resultSection) resultSection.classList.remove("hidden");
    if (finalOkBtn) finalOkBtn.classList.remove("hidden");
    
    endSound.currentTime = 0; 
    endSound.play().catch(error => console.log(error));
}

// สร้างตัวแปรไว้จำว่าผู้ใช้กดส่งข้อมูลไปหรือยัง
let isSubmitted = false; 

// กดปุ่ม OK หน้าสุดท้าย
if (finalOkBtn) {
    finalOkBtn.addEventListener("click", () => {
        
        // 1. ถ้าเคยกดไปแล้ว ให้เด้งเตือนแล้วหยุดการทำงานทันที (กันคนกดเบิ้ล)
        if (isSubmitted) {
            alert("คุณส่งแบบสอบถามแล้ว");
            return; 
        }

        // 2. ล็อกปุ่มทันทีที่กดครั้งแรก
        isSubmitted = true;

        endSound.pause();
        endSound.currentTime = 0;

        successSound.currentTime = 0; 
        successSound.play().catch(error => console.log(error));

        setTimeout(() => {
            successSound.pause();
            successSound.currentTime = 0;
        }, 1000); 

        // 3. ส่งข้อมูลไป Google Sheets
        // ⚠️ อย่าลืมใส่ URL ของ Web App ตรงนี้นะครับ
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzx6u5zicrgkn3rIwXZ1pnmBuGq10klCsFxGhjez6OIZmZkLEQmnCj_8lRNPETg86rHVw/exec'; 
        
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams({
                'q1': answerQ1,
                'q3': answerQ3,
                'downloadStatus': isPdfDownloaded
            })
        })
        .then(response => console.log('ส่งคำสั่งบันทึกแล้ว'))
        .catch(error => console.error('บันทึกไม่สำเร็จ:', error.message));

        // 4. เด้ง Popup ขอบคุณ และปิดแท็บ
        setTimeout(() => {
            alert("ขอบคุณที่ให้ความร่วมมือ");
            
            // สั่งปิดแท็บหน้าต่างเบราว์เซอร์
            window.close();
            
            // กรณีเปิดใน PC บางเบราว์เซอร์อาจจะบล็อกการปิดแท็บ 
            // จึงใส่คำสั่งเด้งกลับไปหน้าแรกรอไว้เป็นแผนสำรองครับ
            setTimeout(() => {
                window.location.reload(); 
            }, 500);
            
        }, 300); 
    });
}

// สั่งให้ระบบทำงานเมื่อหน้าเว็บพร้อม
document.addEventListener("DOMContentLoaded", loadQuestion);