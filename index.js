// function to redact a word
const textArea = document.getElementById('text');
const submitBtn =  document.querySelector('.submit');
// const wordToRedact = document.querySelector('#redact-word').value;
const hideToolbarBtn = document.querySelector('.hide-btn')
const addBtn = document.querySelector('.add-button')
const showToolBar = document.querySelector(".bars")
const clipboardContainer = document.querySelector(".copy-to-clipboard");
let textToRedact = [];

submitBtn.addEventListener('click', () => {
   
    const text = new Text(textArea.value)     

    if (textToRedact.length === 0) {
        alert("Please select a letter to redact")
        return
    }
    textArea.value = text.redactText(textToRedact, '*') 
    text.createAnalysis(document.querySelector('.work-space'))
    // replace submitBtn with try again button
    document.querySelector(".tooltip").style.display = 'inherit'
    replaceSubmitBtn()
});


hideToolbarBtn.addEventListener('click', () => {
    const aside = document.querySelector('aside');
    const asideChildren = [...aside.children] 
    const pageCover = document.querySelector('.page-cover');

    pageCover.style.display = 'none'
    
    aside.classList.add("hide-toolbar")
    asideChildren.forEach(child => child.style.display = 'none')  
})

showToolBar.addEventListener('click', () => {
    const aside = document.querySelector('aside');
    const asideChildren = [...aside.children];
    
    const pageCover = document.querySelector('.page-cover');
    pageCover.style.display = 'inherit'
    
    
    if (aside.classList.contains("hide-toolbar")) {
        aside.classList.remove("hide-toolbar")
        asideChildren.forEach(child => child.style.display = '')
    }
})


addBtn.addEventListener('click', () => {
    let letterToRedact = prompt("Add a letter to redact");
    
    if (letterToRedact.length > 1) {
        alert('Only select one letter or character')

        return
    }
    if (!document.getElementById(letterToRedact)) {
        textToRedact.push(letterToRedact)
        addWordToRedactToUi(letterToRedact);
    } else {
        alert("You have already added that letter")
    }
    
})

clipboardContainer.addEventListener("click", () => {
    copyToClipboard()
})

// function to copy text to clip board
function copyToClipboard () {
    const copyText = document.getElementById("text");
    const clipboardIcon = document.querySelector('.fa-clipboard')
    copyText.select();
    copyText.setSelectionRange(0, 999999);

    navigator.clipboard.writeText(copyText.value);

    clipboardIcon.style.color = "green"
    document.querySelector('.tooltiptext').textContent = 'copied'
}

// function to replace submit with try again button
function replaceSubmitBtn() {
    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.textContent = 'Try again'
    tryAgainBtn.addEventListener('click', () => {
        location.reload()
    })
    const submitBtn = document.querySelector('.submit')
    submitBtn.parentElement.replaceChild(tryAgainBtn, submitBtn)
}

// function to make users add word to redact
function addWordToRedactToUi (word) {
    const wordsToRedact = document.querySelector('.words-to-redact');
    const para = document.createElement('div');
    para.classList.add('word-to-redact')
    para.textContent = word;
    para.id = word
    // the trash can Icon button
    let deleteIconContainer = document.createElement('div');
    deleteIconContainer.classList.add('delete-container')
    deleteIconContainer.addEventListener('click', () => {
        const letter = deleteIconContainer.parentElement;
        const parent = document.getElementById(letter.textContent);
        parent.parentElement.removeChild(parent);
        // index
        const indexOfLetter = textToRedact.indexOf(letter.textContent);
        textToRedact.splice(indexOfLetter, 1);
        console.log(textToRedact)
    })
    // delete icon
    const deleteIcon= document.createElement("i");
    deleteIcon.classList.add("fa")
    deleteIcon.classList.add("fa-trash")
    deleteIconContainer.appendChild(deleteIcon)
    
    para.appendChild(deleteIconContainer)
    wordsToRedact.appendChild(para)
    
}


function deleteLetterFromRedactUi(letter) {
    const container = document.getElementById(letter);
    try {
        container.parentElement.removeChild(container)
    } catch (error) {
        console.log(error)
    }
}

class Text {
    constructor (text) {
        this.text = text
        this._numberOfWords = this.text.split(' ').length
        this._numberOfCharacters = this.text.length
    }
    
    getNumberOfCharactersInText () {
        return this._numberOfCharacters
    }

    getNumberOfWordsInText () {
        return this._numberOfWords
    }

    analyzeText(params) {
        
    }

    createAnalysis(parentElement) {
        const wordsScanned = document.getElementById('analysis-a');
        const charactersScanned = document.getElementById('analysis-b');
        const charactersRedacted = document.getElementById('analysis-c');
        const wordsRedacted = document.getElementById('analysis-d');
    
        wordsScanned.textContent += this._numberOfWords;
        charactersScanned.textContent += this._numberOfCharacters;
    }    

    redactText(filter, redacter='*') {
        let redactedText = ''
        
        for (let i = 0; i < this.text.length; i++) {
            if(filter.includes(this.text[i])) {
                redactedText+= redacter
            } else {
                redactedText += this.text[i]
            }
        }
        return redactedText        
    }    
}