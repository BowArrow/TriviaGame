$.fn.trivia = function() {
    var t = this;
    t.userPick= null;
    t.answers= {
        correct: 0,
        incorrect: 0
    }
    t.count = 30;
    t.current = 0;
    t.gameTrivia = [{
        question: "What mythological beast has the head of a man, the body of a lion, and the tail and feet of a dragon?",
        answers: ["Chimera", "Ammit", "Manticore", "Faun"],
        correct: 2
    }, {
        question: "In Greek mythology, who was the goddess of the rainbow?",
        answers: ["Athena", "Iris", "Aphrodite", "Hera"],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }, {
        question: "",
        answers: [],
        correct: 1
    }];
    t.ask = function () {
        if(t.gameTrivia[t.current]){
            $(".timer").html("Time Left: 00:" + t.count + "s");
            $("#question-here").html(t.gameTrivia[t.current].question);
            var choices = t.gameTrivia[t.current].answers;
            var formCheck = [];
            for(var i = 0; i < choices.length; i++) {
                var div = $("<div>");
                var input = $("<input>");
                var label = $("<label>");
                input.addClass("form-check-input").attr({
                    type: "radio",
                    name: "answer",
                    id: choices[i],
                    value: i,
                    checked: null
                });
                label.addClass("form-check-label").attr("for", choices[i]).text(choices[i]);
                div.append(input, label).addClass("form-check my-2");
                $(".choices-here").append(div);
            }
            window.triviaCounter = setInterval(t.timer, 1000);
            $("#submit").show();
        } else {
            $(".score").append($("<div> /", {
                text: "Unanswered: " + (t.gameTrivia.length - (t.answers.correct + t.answers.incorrect)),
                class: "result"
            }));
            $("#start_button").text("Restart").appendTo("#triviaForm").show();
        }
    };
    t.timer = function() {
        t.count--;
        if (t.count <= 0){
            setTimeout(function() {
                t.nextQuestion();
            });
        } else {
            $(".timer").html("Time Left: 00:" + t.count + "s");
        }
    };
    t.nextQuestion = function(){
        t.current++;
        clearInterval(window.triviaCounter);
        t.count = 30;
        $(".timer").html("");
        setTimeout(function() {
            t.cleanUp();
            t.ask();
        }, 1000)
    };
    t.cleanUp = function() {
        $(".choices-here").html("");
        $(".correct").html("Correct: " + t.answers.correct);
        $(".incorrect").html("Incorrect: " + t.answers.correct);
    };
    t.answer = function(correct) {
        var string = correct ? "correct" : "incorrect";
        t.answers[string]++;
        $("." + string).html(string + " answers: " + t.answers[string]);
    };

    return t;
};
var Trivia;

$("#submit").hide();

$("#start_button").click(function(event) {
    event.preventDefault();
    $(this).hide();
    $(".result").remove();
    $(".choices-here").html("");
    Trivia = new $(window).trivia();
    Trivia.ask();
});


$("button #submit").on("click", function(event){
    event.preventDefault();
    alert($("#triviaForm input[name='answer']:checked").val())
    var userPick = $("#triviaForm input[name='answer']:checked").val(),
    t = Trivia || $(window).trivia(),
    index = t.gameTrivia[t.current].correct,
    correct = t.gameTrivia[t.current].choices[index];

    if (userPick !== index) {
        $(".choices-here").text("Wrong Answer! Correct Answer: " + correct);
        t.answer(false);
    } else {
        $(".choices-here").text("Correct!!!");
        t.answer(true);
    }
    t.nextQuestion();
});