const scenes = [
  {
    title: "שדה אסטרואידים",
    text: "חיישנים מזהים מסלול צפוף. איך תעברו בבטחה?",
    choices: [
      { label: "להפעיל מגני אנרגיה", energy: 10, log: "המגנים ספגו את הפגיעות." },
      { label: "לעקוף במהירות", energy: -5, log: "עברתם מהר אבל איבדתם מעט אנרגיה." },
      { label: "לבקש סיוע מנווט", energy: 5, log: "הנווט מצא מסלול חכם." },
    ],
  },
  {
    title: "שידור מסתורי",
    text: "התקבל מסר מסתורי מכוכב סמוך. מה עושים?",
    choices: [
      { label: "לענות בנימוס", energy: 8, log: "הקשר יצר ברית חדשה." },
      { label: "להתעלם ולהמשיך", energy: -3, log: "עברתם הלאה אבל התחושה מוזרה." },
      { label: "לשלוח רחפן סיור", energy: 6, log: "הרחפן גילה מקורות אנרגיה." },
    ],
  },
  {
    title: "סערת יונים",
    text: "סערת חלקיקים מתקרבת. יש לקבל החלטה מהירה.",
    choices: [
      { label: "לעבור מעל הסערה", energy: 4, log: "מצאנו זרם רוח חללי." },
      { label: "לצלול מתחת", energy: -6, log: "המערכות התחממו." },
      { label: "לשנות נתיב", energy: 2, log: "סטייה קלה שמרה על יציבות." },
    ],
  },
  {
    title: "תחנת חלל נטושה",
    text: "תחנה ישנה נמצאה. אפשר לעצור לאספקה.",
    choices: [
      { label: "לעגון ולבדוק", energy: 12, log: "מצאנו תאי דלק חדשים." },
      { label: "לסרוק מרחוק", energy: 3, log: "גילינו מידע מעניין על האזור." },
      { label: "להמשיך בלי לעצור", energy: -2, log: "דילגנו על אפשרות טובה." },
    ],
  },
  {
    title: "היעד באופק",
    text: "נראה שהכוכב היעד לפנינו. בחרו את הסיום.",
    choices: [
      { label: "להיכנס לאטמוספרה בזהירות", energy: 8, log: "נחיתה רכה ומוצלחת." },
      { label: "להעביר את ההגה לטייס האוטומטי", energy: 4, log: "המערכת עבדה בצורה חלקה." },
      { label: "לבצע נחיתה מהירה", energy: -4, log: "התרגשנו אבל הכל בשליטה." },
    ],
  },
];

const energyBar = document.getElementById("energyBar");
const progressValue = document.getElementById("progressValue");
const sceneTitle = document.getElementById("sceneTitle");
const sceneText = document.getElementById("sceneText");
const choicesContainer = document.getElementById("choices");
const logList = document.getElementById("logList");
const resetButton = document.getElementById("resetButton");

let currentScene = 0;
let energy = 70;

const clampEnergy = () => {
  energy = Math.min(100, Math.max(0, energy));
  energyBar.style.width = `${energy}%`;
};

const addLog = (message) => {
  const item = document.createElement("li");
  item.textContent = message;
  logList.prepend(item);
};

const updateScene = () => {
  const scene = scenes[currentScene];
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  progressValue.textContent = `${currentScene + 1}/${scenes.length}`;
  choicesContainer.innerHTML = "";

  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = choice.label;
    button.addEventListener("click", () => handleChoice(choice));
    choicesContainer.appendChild(button);
  });
};

const showFinale = () => {
  sceneTitle.textContent = "המסע הסתיים!";
  sceneText.textContent =
    "הגעתם ליעד עם אנרגיה " +
    `${energy}%` +
    ". רוצים לצאת שוב להרפתקה?";
  progressValue.textContent = `${scenes.length}/${scenes.length}`;
  choicesContainer.innerHTML = "";

  const restart = document.createElement("button");
  restart.className = "choice";
  restart.textContent = "להתחיל מסע חדש";
  restart.addEventListener("click", resetGame);
  choicesContainer.appendChild(restart);
};

const handleChoice = (choice) => {
  energy += choice.energy;
  clampEnergy();
  addLog(choice.log);

  if (currentScene < scenes.length - 1) {
    currentScene += 1;
    updateScene();
  } else {
    showFinale();
  }
};

const resetGame = () => {
  currentScene = 0;
  energy = 70;
  logList.innerHTML = "";
  clampEnergy();
  updateScene();
  addLog("המסע התחיל מחדש.");
};

resetButton.addEventListener("click", resetGame);

resetGame();
