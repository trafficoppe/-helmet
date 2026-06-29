// โหลดไฟล์เสียง
const clickSound = new Audio("press.mp3");
const successSound = new Audio("success.mp3");
const endSound = new Audio("end.wav"); // เพิ่มบรรทัดนี้เพื่อโหลดเสียงตอนจบ

// ชุดคำตอบ 10 ข้อสำหรับสุ่มในข้อ 1
const excuses = [
    "รีบไปนิด เผลอลืมหยิบมาด้วยแหะๆ",
    "ไปแค่ปากซอย ขอรับลมเย็นๆ แป๊บนึงน้า",
    "เพิ่งทำผมมา แอบกลัวผมเสียทรงง่ะ",
    "เล่นกับน้องหมาแมวเพลิน ลืมหยิบมาเฉยเลย",
    "แวะซื้อของหลายร้าน ขี้เกียจถอดใส่บ่อยง่า",
    "วุ่นเตรียมของให้เด็กๆ จนลืมของตัวเองเลย",
    "อากาศร๊อนร้อน ขอขับรับลมชิลๆ หน่อยน้า",
    "รีบไปรับพัสดุ กลัวพี่ๆ ขนส่งรอนานค้าบ",
    "หมวกใบโปรดเพิ่งซัก ยังไม่แห้งพร้อมใช้งับ",
    "คว้ากุญแจได้ก็พุ่งเลย ลืมสนิทจริงๆ ค้าบ"
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

// ชุดคำตอบ 10 ข้อสำหรับสุ่มในข้อ 3
const safeHelmetOptions = [
    "ไซส์กระชับพอดีหัว ส่ายหน้าไม่หลุด เซฟชัวร์ครับ",
    "ฟังเสียงคลิกล็อกคางให้แน่น ปลอดภัยไม่หลุดแน่นอนน้า",
    "ฟองน้ำข้างในยังแน่น ซับแรงกระแทกได้เต็มร้อยเลยฮะ",
    "หมวกใบโปรดมี มอก. อุ่นใจพร้อมลุยทุกเส้นทางครับ",
    "เลือกแบบเต็มใบปิดคาง เซฟใบหน้าสวยหล่อได้สุดๆ ไปเลย",
    "ชิลด์หน้าใสปิ๊ง มองทางชัดเจน ขับขี่ปลอดภัยครับ",
    "หมวกอายุไม่เกิน 5 ปี โครงสร้างยังแข็งแรงดูแลเราได้เต็มที่น้า",
    "ถ้าเคยตกกระแทกแรงๆ เปลี่ยนใบใหม่เพื่อความชัวร์ดีกว่าครับ",
    "ใช้หมวกสีสว่างเตะตา ขับกลับตอนกลางคืนก็ปลอดภัยฮะ",
    "ปรับสายรัดคางให้พอดี ไม่อึดอัดแต่เซฟชีวิตได้จริงครับ"
];

// ฟังก์ชันสำหรับสุ่มเลือกตัวเลือกตามจำนวนที่กำหนด
function getRandomOptions(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ข้อมูลคำถาม 4 ข้อ
const quizData = [
    {
        video: "vid7.mp4",
        headerTitle: "💥 สมองมีก้อนเดียว อะไหล่ไม่มีเปลี่ยน!",
        headerSubtitle: "หมวกใบหลักร้อย ปกป้องชีวิตหลักล้าน ใส่เถอะครับ!",
        question: "1. วันนี้หมวกกันน็อกคู่ใจ หายไปไหนเอ่ย?",
        options: [] // ปล่อยว่างไว้ เดี๋ยวเราจะสุ่มใส่ให้ตอนโหลดคำถาม
    },
    {
        video: "vid8.mp4",
        headerTitle: "🛡️ ใส่ทั้งที ต้องดีและเซฟชัวร์!",
        headerSubtitle: "หมวกกันน็อกที่ดีคือยันต์กันตุย เลือกให้เป๊ะ รอดแน่นอน!",
        question: "2. รู้ไหมเอ่ย... น้องหมวกกันน็อก 1 ใบ ช่วยอะไรได้บ้าง",
        options: [] // ปล่อยว่างไว้ เดี๋ยวเราจะสุ่มใส่ให้ตอนโหลดคำถาม
    },
    {
        video: "vid9.mp4", 
        headerTitle: "สวมให้เป๊ะ เซฟชัวร์ 100%",
        headerSubtitle: "ใส่หมวกถูกวิธี ชีวิตปลอดภัยขึ้นอีกเยอะเลยครับ!",
        question: "3. รู้ป่าวเอ่ย... สวมหมวกกันน็อกแบบไหนที่เรียกว่า \"ใส่เป๊ะ เซฟชัวร์ 100%\"?",
        options: [] // ปล่อยว่างไว้ เดี๋ยวเราจะสุ่มใส่ให้ตอนโหลดคำถาม
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
    },
    {
        video: "vid5.mp4", 
        headerTitle: "ความปลอดภัยในรั้วมหาวิทยาลัย",
        headerSubtitle: "กฎระเบียบมีไว้เพื่อความปลอดภัยของชาวมหิดลทุกคนครับ",
        question: "5. คุณทราบประกาศมหาวิทยาลัยมหิดล เรื่อง หลักเกณฑ์การสวมหมวกนิรภัยในการใช้รถจักรยานยนต์ มหาวิทยาลัยมหิดล ศาลายา หรือไม่?",
        options: [
            "ทราบ",
            "ไม่ทราบ"
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
    
    // --- สุ่มคำตอบ 4 ข้อสำหรับคำถามข้อ 1 ---
    if (currentQuestionIndex === 0) {
        quizData[0].options = getRandomOptions(excuses, 4);
    }

    // --- สุ่มคำตอบ 4 ข้อสำหรับคำถามข้อ 2 ---
    if (currentQuestionIndex === 1) {
        quizData[1].options = getRandomOptions(statsOptions, 4);
    }

    // --- สุ่มคำตอบ 4 ข้อสำหรับคำถามข้อ 3 ---
    if (currentQuestionIndex === 2) {
        quizData[2].options = getRandomOptions(safeHelmetOptions, 4);
    }
    
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
    
    // เพิ่มคำสั่งเล่นเสียงตอนจบ
    endSound.currentTime = 0; // เริ่มเล่นใหม่ตั้งแต่ต้น
    endSound.play().catch(error => {
        console.log("ไม่สามารถเล่นเสียงได้: ", error);
    });
}

// ฟังก์ชันเริ่มใหม่
if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        // สั่งหยุดเสียงตอนจบและรีเซ็ตเวลา
        endSound.pause();
        endSound.currentTime = 0;

        currentQuestionIndex = 0;
        if (quizSection) quizSection.classList.remove("hidden");
        if (resultSection) resultSection.classList.add("hidden");
        loadQuestion();
    });
}
// ดึงปุ่ม OK มาใช้งาน (นำไปวางรวมกับกลุ่มประกาศตัวแปรด้านบนของไฟล์)[cite: 2]
const okBtn = document.getElementById("ok-btn");

// ดึงปุ่มใหม่มาใช้งาน (นำไปวางรวมกับกลุ่มประกาศตัวแปรด้านบนของไฟล์)
const finalOkBtn = document.getElementById("final-ok-btn");

// ปรับแก้ฟังก์ชัน showResult() ใหม่ให้เหลือแค่ปุ่มเดียว
function showResult() {
    if (quizSection) quizSection.classList.add("hidden");
    if (resultSection) resultSection.classList.remove("hidden");
    
    // ซ่อนปุ่มไว้ก่อน
    if (finalOkBtn) finalOkBtn.classList.add("hidden");
    
    // สั่งเล่นเสียงตอนจบ
    endSound.currentTime = 0; 
    endSound.play().catch(error => {
        console.log("ไม่สามารถเล่นเสียงได้: ", error);
        // กรณีเบราว์เซอร์บล็อกเสียง ให้แสดงปุ่มเลย ผู้ใช้จะได้กดต่อได้
        if (finalOkBtn) finalOkBtn.classList.remove("hidden");
    });

    // 🟢 ตรวจจับเมื่อไฟล์เสียงเล่นจบ แล้วค่อยแสดงปุ่ม
    endSound.onended = function() {
        if (finalOkBtn) finalOkBtn.classList.remove("hidden");
    };
}

// การทำงานเมื่อผู้ใช้กดปุ่ม "OK! ต่อไปฉันจะสวมหมวกทุกครั้ง"
if (finalOkBtn) {
    finalOkBtn.addEventListener("click", () => {
        
        // 1. หยุดเสียงตอนจบที่อาจจะค้างอยู่
        endSound.pause();
        endSound.currentTime = 0;

        // 2. สั่งเล่นเสียง success ทันทีที่กด
        successSound.currentTime = 0; 
        successSound.play().catch(error => {
            console.log("ไม่สามารถเล่นเสียงได้: ", error);
        });

        // 3. สั่งให้เสียงตัดจบภายใน 1 วินาที (ไม่ให้ดังยาวเกินไป)
        setTimeout(() => {
            successSound.pause();
            successSound.currentTime = 0;
        }, 1000); 

        // 4. หน่วงเวลาสั้นๆ (0.3 วิ) ให้ปุ่มยุบตัวก่อน แล้วเด้ง Popup ว่า "ขอบคุณ"
        setTimeout(() => {
            alert("ขอบคุณครับ!");
            
            // หากต้องการให้พอกด OK ใน Popup แล้วรีเฟรชเริ่มใหม่ ให้เอา // ข้างหน้าบรรทัดล่างออกครับ
            // window.location.reload();
            
        }, 300); 
    });
}

// สั่งให้ระบบทำงานเมื่อหน้าเว็บพร้อม
document.addEventListener("DOMContentLoaded", loadQuestion);