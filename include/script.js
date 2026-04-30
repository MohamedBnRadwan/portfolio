const knowledgeBase = [
  { keys: ["name", "who are you"], answer: "I'm Mohamed Radwan, a Full-Stack .NET Developer." },
  { keys: ["skills", "tech", "stack"], answer: "Main skills: ASP.NET Core, C#, SQL Server, REST APIs, JavaScript, Bootstrap, and workflow automation." },
  { keys: ["experience", "work", "company"], answer: "I've delivered business solutions with teams such as AQTRACO, IWGT, and Idea World Web." },
  { keys: ["project", "repo", "github"], answer: "You can find public repositories on GitHub and private projects summarized in the portfolio page." },
  { keys: ["certificate", "certification", "course"], answer: "My profile highlights certificates in ASP.NET Core patterns, SQL Server tuning, and Cloud/DevOps foundations." },
  { keys: ["contact", "email", "hire"], answer: "Best contact: mohamedbnradwan@gmail.com or LinkedIn at /in/mohamedbnradwan/." },
  { keys: ["resume", "cv"], answer: "Use the Resume (PDF) button on the portfolio page to download my latest CV." },
  { keys: ["hello", "hi", "hey"], answer: "Hi! Ask me about skills, projects, certificates, or how to contact Mohamed." }
];

const fallbackAnswers = [
  "Great question. Try asking about skills, experience, projects, or contact info.",
  "I can help with portfolio details. Ask me about certificates, repos, or resume.",
  "Let's do this 👨‍💻 — ask about tech stack, companies, or private project summaries."
];

window.addEventListener("load", () => {
  const form = document.getElementById("questions-form");
  const input = document.getElementById("input-answer");
  const message = document.getElementById("message");

  if (!form || !input || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim().toLowerCase();
    if (!text) {
      updateMessage("Type a question first 😊", "warning", message);
      return;
    }

    const answer = getAnswer(text);
    updateMessage(answer, "success", message);
    input.value = "";
  });
});

function getAnswer(text) {
  for (const item of knowledgeBase) {
    if (item.keys.some((k) => text.includes(k))) {
      return item.answer;
    }
  }
  return fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)];
}

function updateMessage(text, type, el) {
  el.textContent = text;
  el.className = type === "success" ? "text-success" : "text-warning";
}
