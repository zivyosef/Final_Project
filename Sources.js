// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { tavily } = require('@tavily/core');

const app = express();
app.use(express.json());
app.use(cors());

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

app.post('/api/fetch-project-sources', async (req, res) => {
  try {
    const { subject, assignmentType, topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Missing topic for source generation." });
    }

 //Dynamic Query Engineering: Construct an ideal search string for Tavily
    // Example: "The French Revolution bibliography academic sources History essay"
    const optimizedQuery = `"${topic}" reliable academic sources bibliography ${subject || ''} ${assignmentType || ''}`.trim().replace(/\s+/g, ' ');

    console.log(`🔍 Routing Tavily Search Query: ${optimizedQuery}`);

    const response = await tvly.search(optimizedQuery, {
      searchDepth: "advanced", // Advanced finds higher quMources
      includeDomains: [],      // Optional: Add specific educational extensions if preferred
    });

    res.json(response.results);
  } catch (error) {
    console.error(, error);
    res.status(500).json({ error: "Failed to "Tavily Integration Error:"compile background sources." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Secure Tavily proxy active on port ${PORT}`));



================================================================
// ============================================================
//  פונקציה 8: fetchTavilySources
//  נכתב עבור שילוב מקורות חכם מבוסס נושא, סוג מטלה ומקצוע
// ============================================================
async function fetchTavilySources(state) {
  if (!state || !state.topic) {
    console.warn("⚠️ לא ניתן לחפש מקורות: חסר נושא (topic) במצב האפליקציה הנוכחי.");
    return [];
  }

  console.log(`🔵 [logicManager] מפעיל חיפוש מקורות עבור הנושא: ${state.topic}`);

  try {
    // קריאה לשרת הפנימי שמגן על המפתח של Tavily
    // שים לב: שנה את ה-URL במידה והשרת רץ בכתובת אחרת או בפרודקשן
    const response = await fetch('http://localhost:3000/api/fetch-project-sources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: state.subject,
        assignmentType: state.assignmentType,
        topic: state.topic
      })
    });

    if (!response.ok) {
      throw new Error(`תגובת שרת לא תקינה: ${response.status}`);
    }

    const sources = await response.json();
    console.log("✅ מקורות התקבלו מ-Tavily בהצלחה:", sources);
    return sources;

 } catch (error) {
    console.error("Tavily Integration Error:", error);
    res.status(500).json({ error: "Failed to compile background sources." });
  }



========================================================================


// החשפת הפונקציות בגרסה המעודכנת
const logicManager = {
  initProject,
  validatePageCount,
  validateDueDate,
  analyzeActionability,
  handleTaskValidation,
  calculateBackwardTimeline,
  createEditableTimelinePlan,
  updateTimelineMilestone,
  normalizeTimelineDate,
  requestAIAngles,
  analyzeDemandsAndCreateSubtasks,
  syncStateToStorage,
  loadStateFromStorage,
  fetchTavilySources, // <-- הוסף שורה זו
};




=====================================================================

async function handleUserCreationWorkflow(userRawText) {
  // 1. נתח את הטקסט הראשוני של המשתמש בעזרת הלוגיקה של אלון ומאיר
  const projectState = await logicManager.initProject(userRawText);
  
  if (!projectState) return; // עצור במקרה של שגיאת ולידציה

  // 2. שמור את המצב הנוכחי ללוקאל סטורג' כרגיל
  logicManager.syncStateToStorage(projectState);

  // 3. שלוף אוטומטית מקורות מותאמים אישית מ-Tavily
  const recommendedSources = await logicManager.fetchTavilySources(projectState);

  // 4. הצג את המקורות על המסך
  renderSourcesToUI(recommendedSources);
}

function renderSourcesToUI(sources) {
  const container = document.getElementById('sources-view');
  if(!sources || sources.length === 0) {
    container.innerHTML = "<p>לא נמצאו מקורות רלוונטיים בצורה אוטומטית.</p>";
    return;
  }

  container.innerHTML = sources.map(src => `
    <div class="source-item" style="border-right: 4px solid #3b82f6; padding: 10px; margin: 10px 0; background: #f8fafc;">
      <h4><a href="${src.url}" target="_blank" style="color:#1d4ed8; text-decoration:none;">${src.title}</a></h4>
      <p style="font-size:0.9em; color:#475569;">${src.content}</p>
    </div>
  `).join('');
}