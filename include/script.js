let currentMessage = "what are you looking for?";
let words = [];

let _questions = [
    'who you are?',
    'whats your name?',
    'are you egyptian?',
    'why are you here?',
    'what are you looking for?',
    'Is that you radwan?',
    'where are you from?',
    'till me a joke',
];
let answers = [
    ['hi hello', 'Hi, how you are?'],
    ['login', "no you can't."],
    ['no', 'I knew it.'],
    ['haha', 'no, a funny one.'],
    ['yes', 'no, you a liar.'],
    ["no", 'realy !!'],
    ["thanks", "that's good to hear."],
    ["i'm", "say wallahi wallahi."],
    ["for", "ok, look carefully."],
    ["radwan", "is that mean radwan in the house!"],
    ["search searching finding looking", "for what?!"],
    ["call contact reach sms", "mmmm, ok give me a minute."],
    ["fuck shit pussy gay sex ass hell", "please don't use bad words."],
    ["fuck shit pussy gay sex ass hell", "🖕 plug your hole."],
    ["egypt", "I love Sisi."],
    ["sure", "بالله!"],
    ["feel", "feel=elephant"],
    ["sleep", "zzzzzzz"],
    ["song", "wigo wigo wigo"],
];

let replies = [
    [[' '], ['you need to sleep', 'امر يسطا', 'type any thing first', "Your entry key is stuck"]]
    [['who you are?'], ['how is that!']],
    [['whats your name?'], ['عاشت الاسامي يا #input#']],
    [['are you egyptian?', 'where are you from?'], ['اجدع ناس', 'where form #input#?']],
    [['till me a joke'], ['hhh, anther joke', 'hhh, anther joke', 'hhh not funny', 'try to forgot it.', "don't say it again", 'you were in terrible in your childhood.']],
    [['Is that you radwan?'], ['I know it.', 'so, where are you?', 'no, you lying', 'ok, prove it with password']],
    [['what are you looking for?'], ['ok, look carefully.', "I think I had saw it, but can't remember where", 'no it does not here', 'here it is']],
    [['why are you here?'], ['wrong place go out.', "mmmm, don't trick me.", 'Do you know Luffy with Straw Hat?', 'no, way.']],
];
let radwan_answers = [
    ['hi', 'hi radwan'],
    ['can i login', 'you already logged in'],
    ['open my dashboard', 'ok, fly', '/dashboard.html'],
    ["do you know who i'm?", 'yes, you are radwan'],
    ["for", 'ok, I will search with you.']
];

let domainQuestions = [
    {
        domain: 'onedoor-construction.com',
        questions: [
            'are you engineering?',
        ]
    }
]
let incomeDomain = null;
let isRadwan = false;

window.addEventListener('load', function (wEvent) {
    incomeDomain = (new URLSearchParams(window.location.search)).get('client');
    var questions_form = document.getElementById('questions-form');
    var input_answer = document.getElementById('input-answer');

    questions_form.addEventListener('submit', function (formEvent) {
        formEvent.preventDefault();
        pushAnswer(input_answer.value);
        getJoke()
        input_answer.value = '';
    })

    function pushAnswer($question) {
        if ($question == '') {
            pushMessage('bla bla bla.', "light");
            return;
        }

        if (!words.includes($question)) {
            setTimeout(() => { words.push($question); }, 2000);
        }

        if (isRadwan) {
            pushMessage("what else .. !", "warning");

            var answer = getAnswer(radwan_answers, $question);
            if (answer == '')
                answer = getNewQuestion();
            pushMessage(answer, "light");
            currentMessage = getNewQuestion();
            return;
        }

        if (words.includes("yes i'm") && $question == "i'm radwan") {
            pushMessage("Welcome back radwan.", "success");
            isRadwan = true;
            currentMessage = "Say something";
            return;
        }
        else if ($question.includes('yes')) {
            pushMessage("Prove it!", "success");
            return;
        }

        if (words.includes($question)) {
            pushMessage("don't type '" + $question + "' again", "danger");
        }
        else {

            var answer = getAnswer(answers, $question);
            if (answer != '') {
                pushMessage(answer, "light");
            }
            console.log('answer:' + answer)
            if (answer == null || answer == '') {
                var replay = getReplay(currentMessage);
                console.log('replay:' + replay)
                if (replay != null && replay != '') {
                    if (replay.includes('#input#'))
                        replay = replay.replace('#input#', $question);
                    pushMessage(replay, "danger");
                }
            }
        }


        currentMessage = getNewQuestion();
    }

    input_answer.addEventListener('keydown', function (inputEvent) {
        if (input_answer.value != '') {
            if (inputEvent.keyCode == 8 || inputEvent.keyCode == 46) {
                if (!isRadwan) {
                    pushMessage("deleting.." + this.value, "danger")
                } else {
                    pushMessage("why deleting, radwan!", "danger")
                }
            } else {
                var sub = input_answer.value.split(" ");
                for (var y = 0; y < sub.length; y++) {
                    var match = words.filter(str => str.startsWith(sub[y]));
                    if (match.length) {
                        pushMessage(match[0] + " again !!", "danger");
                    }

                }
            }
        }
    });
    var div_message = document.getElementById('message');

    function pushMessage($txt, $class) {
        if (isRadwan)
            div_message.classList.add('text-success');
        div_message.innerHTML = $txt;
        setTimeout(() => { div_message.innerHTML = currentMessage; }, 5000);
    }

    function getAnswer(array, stirng) {
        var subString = stirng.split(" ");
        for (var x = 0; x < subString.length; x++) {
            // for (var i = 0; (array != null && i < subString[x].length); i++) {
            // This if statement depends on the format of your array
            var ans = array.filter(el => el[0].includes(subString[x]));
            console.log('ans:' + ans)
            if (ans != null && ans[1] != '') {
                if (ans.length > 2) {
                    setTimeout(() => { window.location.href = ans[2]; }, 1500);
                }
                var re = getOne(ans);
                console.log('re:' + re)
                return (Array.isArray(re) ? re[1] : re);
            }

            // if (ans != null && ans.length > 0)
            //     return ans(ans[1]);
            // }
        }
        return "";
    }

    function getOne($array) {
        if (Array.isArray($array))
            return $array[Math.floor(Math.random() * $array.length)];
        return $array;
    }

    function getReplay(stirng) {
        // var subString = stirng.split(" ");
        for (var i = 0; (i < replies.length); i++) {
            var ans = replies.filter(el => (el != null && el[0] != null) && el[0].includes(stirng));
            // This if statement depends on the format of your array
            console.log('ans:' + ans)
            if (ans != undefined && ans.length > 0) {
                var re = getOne(ans[0][1]);
                console.log('re:' + re)
                return getOne(re);
            }
        }
        return "";
    }
    function getNewQuestion() {
        if (incomeDomain != null && domainQuestions.filter(element => element.domain == incomeDomain).length > 0) {
            _questions = domainQuestions.filter(element => element.domain == incomeDomain).questions
        }
        return getOne(_questions);
    }

})

function getJoke() {
    // fetch('/jokes.json')
    // .then((response) => response.json())
    // .then(json => {
    //     var joke = json[Math.floor(Math.random() * json.length)]

    //     console.log(joke);
    //   })
    //   .catch(rejected => {
    //       console.log(rejected);
    //   });
}