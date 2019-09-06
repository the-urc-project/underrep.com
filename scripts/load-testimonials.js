const spreadSheetUrl = "https://spreadsheets.google.com/feeds/list/1WrWsy-Awm8o_tZGoaMYtTktSMsoKHVBoE3AIPdNY_-o/od6/public/values?alt=json"
var testimonials = []
var chosenTestimonials = []

getSpreadsheetData()
    .then(function(res) {
        testimonials = res.feed.entry
        genRandomInts(0, testimonials.length - 1).map(i => {
            chosenTestimonials.push({
                quote: testimonials[i]["gsx$quote"]["$t"],
                quotee: testimonials[i]["gsx$quotee"]["$t"]
            })
        })
        pushToPage()
    })

function pushToPage() {
    for (var i = 0; i < 5; i++) {
        const quoteId = "testimonial-quote-" + i
        const quoteeId = "testimonial-quotee-" + i
        document.getElementById(quoteId).innerHTML = chosenTestimonials[i].quote
        document.getElementById(quoteeId).innerHTML = " - URC " + chosenTestimonials[i].quotee
    }

    // When done, hide spinner and show quotes
    document.getElementById("testimonial-quote-wrapper-0").style.display = "block"
    document.getElementById("testimonials-spinner").style.display = "none"
}

function getSpreadsheetData() {
    return new Promise(function(resolve, reject) {
        const Http = new XMLHttpRequest()
        Http.open("GET", spreadSheetUrl)
        Http.send()
        
        Http.onloadend=(e)=> {
            const json = JSON.parse(Http.responseText)
            resolve(json)
        }
    })
}

function genRandomInts(min, max) {
    var ints = []
    for (var i = 0; i < 5; i++) {
        var chosen = Math.round(Math.random() * (max - min) + min)
        while (ints.includes(chosen)) {
            chosen = Math.round(Math.random() * (max - min) + min)
        }
        ints.push(chosen)
    }
    return ints
}