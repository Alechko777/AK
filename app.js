const boardSpaces = [
  {
    title: "התחלה",
    detail: "נקודת יציאה. קבלו בונוס חייכני כל סיבוב!",
  },
  {
    title: "כיכר האמנים",
    detail: "עוצרים לקפה וקונים ציוד יצירתי.",
  },
  {
    title: "רחוב החולמים",
    detail: "השקעה בפרויקט חדשני משלמת בהמשך.",
  },
  {
    title: "תחנת הרכבת",
    detail: "קופצים במהירות לשכונה הבאה.",
  },
  {
    title: "שוק הלילה",
    detail: "מוכרים יצירות ומרוויחים מטבעות.",
  },
  {
    title: "פארק העיר",
    detail: "מנוחה קצרה וזמן לתכנן מהלך.",
  },
  {
    title: "מעבדה טכנולוגית",
    detail: "מציאת רעיון שמכפיל את ההכנסות.",
  },
  {
    title: "תחנת רדיו",
    detail: "מבצע פרסום שמביא חברים חדשים.",
  },
  {
    title: "רחוב החלומות",
    detail: "קונים נכס חדש וצוברים נקודות.",
  },
  {
    title: "כיכר השותפים",
    detail: "עושים שיתופי פעולה וחותמים על חוזה.",
  },
  {
    title: "מרכז החדשנות",
    detail: "הזדמנות לשדרוג גדול.",
  },
  {
    title: "בית הקהילה",
    detail: "תורמים ומשפרים את המוניטין.",
  },
  {
    title: "מוזיאון היצירה",
    detail: "צוברים השראה לקראת המהלך הבא.",
  },
  {
    title: "תחנת העיצוב",
    detail: "מעניקים טאץ' חדש למיזם.",
  },
  {
    title: "הנמל",
    detail: "משלוחים מגיעים בדיוק בזמן.",
  },
  {
    title: "שדרת המנהיגים",
    detail: "קופצים קדימה עם החלטה אמיצה.",
  },
];

const boardGrid = document.getElementById("boardGrid");
const positionLabel = document.getElementById("positionLabel");
const dieOneInput = document.getElementById("dieOne");
const dieTwoInput = document.getElementById("dieTwo");
const totalMoveInput = document.getElementById("totalMove");
const moveButton = document.getElementById("moveButton");
const resetButton = document.getElementById("resetButton");
const useTotalButton = document.getElementById("useTotal");
const moveLog = document.getElementById("moveLog");

let currentPosition = 0;
let moveCount = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const renderBoard = () => {
  boardGrid.innerHTML = "";

  boardSpaces.forEach((space, index) => {
    const tile = document.createElement("div");
    tile.className = "tile";

    if (index === currentPosition) {
      tile.classList.add("active");
    }

    const title = document.createElement("h4");
    title.textContent = `${index}. ${space.title}`;

    const detail = document.createElement("p");
    detail.textContent = space.detail;

    tile.append(title, detail);

    if (index === currentPosition) {
      const token = document.createElement("span");
      token.className = "token";
      token.textContent = "אתם כאן";
      tile.append(token);
    }

    boardGrid.append(tile);
  });

  positionLabel.textContent = currentPosition.toString();
};

const addLog = (message) => {
  const entry = document.createElement("li");
  entry.textContent = message;
  moveLog.prepend(entry);
};

const ensureDiceButtons = () => {
  const diceButtonContainers = document.querySelectorAll(".dice-buttons");
  diceButtonContainers.forEach((container) => {
    if (container.children.length) return;

    for (let i = 1; i <= 6; i += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = i.toString();
      button.addEventListener("click", () => {
        const targetId = container.dataset.target;
        const input = document.getElementById(targetId);
        input.value = i.toString();
      });
      container.append(button);
    }
  });
};

const movePlayer = (steps, sourceLabel) => {
  if (Number.isNaN(steps) || steps <= 0) {
    addLog("אנא הזינו מספר חוקי של צעדים.");
    return;
  }

  const previousPosition = currentPosition;
  currentPosition = (currentPosition + steps) % boardSpaces.length;
  moveCount += 1;

  addLog(
    `מהלך ${moveCount}: ${sourceLabel} => התקדמות של ${steps} צעדים (${previousPosition} → ${currentPosition}).`
  );
  renderBoard();
};

moveButton.addEventListener("click", () => {
  const dieOne = clamp(parseInt(dieOneInput.value, 10) || 0, 1, 6);
  const dieTwo = clamp(parseInt(dieTwoInput.value, 10) || 0, 1, 6);
  const total = dieOne + dieTwo;
  dieOneInput.value = dieOne.toString();
  dieTwoInput.value = dieTwo.toString();
  movePlayer(total, `קוביות ${dieOne} ו-${dieTwo}`);
});

useTotalButton.addEventListener("click", () => {
  const total = clamp(parseInt(totalMoveInput.value, 10) || 0, 2, 12);
  totalMoveInput.value = total ? total.toString() : "";
  movePlayer(total, "סכום ידני");
});

resetButton.addEventListener("click", () => {
  currentPosition = 0;
  moveCount = 0;
  moveLog.innerHTML = "";
  addLog("המשחק אופס לנקודת התחלה.");
  renderBoard();
});

ensureDiceButtons();
renderBoard();
