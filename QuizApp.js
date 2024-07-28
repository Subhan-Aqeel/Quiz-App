const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer:[
            {text:"Blue Whale",correct:true},
            {text:"Shark",correct:false},
            {text:"Giraffe",correct:false},
            {text: "Loin",correct:false}
        ]
    },
    { question: "Which is the smallest continent in the world?",
        answer:[
            {text:"Asia",correct:false},
            {text:"Nigeria",correct:false},
            {text:"anctrica", correct:false},
            {text:"Australia",correct:true},
        ]},
        { question:`Who wrote the play "Romeo and Juliet"?`,
            answer:[
                {text:"William Shakespeare",correct:true},
                {text:"Charles Dickens",correct:false},
                {text:"Mark Twain",correct:false},
                {text:"Jane Austen", correct:false},
            ]},
];
const questionElement = document.getElementById("Question");
const ansButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'next';
    showQuestion();
};

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionsNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionsNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click",selectAnswer);
    
    });
};
function resetState(){
    nextButton.style.display = "none";
    while (ansButton.firstChild){
      ansButton.removeChild(ansButton.firstChild);
    }
 };

 function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(ansButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
 };
 function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
 };
 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
 };

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

showQuestion();

