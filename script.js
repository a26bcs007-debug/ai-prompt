
// Get HTML Elements

const roleInput = document.getElementById("role");
const taskInput = document.getElementById("task");
const contextInput = document.getElementById("context");
const constraintsInput = document.getElementById("constraints");
const formatInput = document.getElementById("format");

const output = document.getElementById("output");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");

const message = document.getElementById("message");


// Function to Generate Prompt

function generatePrompt() {

    // Get input values

    const role = roleInput.value.trim();
    const task = taskInput.value.trim();
    const context = contextInput.value.trim();
    const constraints = constraintsInput.value.trim();
    const format = formatInput.value;

    // Validate input

    if (!role || !task) {

        message.style.color = "#e05252";
        message.textContent =
            "Please enter at least a Role and Task.";

        return;
    }

    // Create structured prompt

    let prompt = `ROLE:
${role}

TASK:
${task}`;

    if (context) {
        prompt += `

CONTEXT:
${context}`;
    }

    if (constraints) {
        prompt += `

CONSTRAINTS:
${constraints}`;
    }

    if (format) {
        prompt += `

OUTPUT FORMAT:
Present the response in ${format}.`;
    }

    prompt += `

INSTRUCTIONS:
Provide an accurate, clear, and helpful response.
Organize the answer logically and explain important
concepts in a student-friendly manner.`;

    // Display generated prompt

    output.textContent = prompt;

    // Success message

    message.style.color = "#16a36a";
    message.textContent = "Your prompt was generated successfully!";

}


// Generate Button Event

generateBtn.addEventListener("click", generatePrompt);


// Copy Prompt Function

copyBtn.addEventListener("click", async function () {

    const prompt = output.innerText.trim();

    if (
        !prompt ||
        prompt.includes("Your prompt will appear here")
    ) {
        message.style.color = "#e05252";
        message.textContent = "Please generate a prompt first.";
        return;
    }

    try {

        await navigator.clipboard.writeText(prompt);

        message.style.color = "#16a36a";
        message.textContent = "Prompt copied successfully!";

    } catch (error) {

        message.style.color = "#e05252";
        message.textContent =
            "Unable to copy. Please copy the text manually.";

    }

});


// Clear All Function

clearBtn.addEventListener("click", function () {

    roleInput.value = "";
    taskInput.value = "";
    contextInput.value = "";
    constraintsInput.value = "";
    formatInput.value = "";

    output.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">✧</div>
            <h3>Your prompt will appear here</h3>
            <p>
                Fill in the fields and click
                Generate Prompt to get started.
            </p>
        </div>
    `;

    message.textContent = "";

});


// Sample Prompt Function

sampleBtn.addEventListener("click", function () {

    roleInput.value =
        "Act as an experienced computer science professor.";

    taskInput.value =
        "Explain Artificial Intelligence and its applications in real life.";

    contextInput.value =
        "I am a college student preparing for my semester examination. I need to understand the basic concepts of Artificial Intelligence.";

    constraintsInput.value =
        "Use simple English, provide practical examples, avoid unnecessary technical jargon, and keep the explanation easy to understand.";

    formatInput.value =
        "Bullet points";

    // Automatically generate the sample prompt

    generatePrompt();

});
