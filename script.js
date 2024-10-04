//adding dom(document) declaration with javascript///
const startGameContainer = document.querySelector(".StartGame"),
 startGameCards = document.querySelectorAll(".StartGame .card"),
 startGame = document.querySelector(".StartGame button"),
 playground = document.querySelector(".playground"),
 farepeat = document.querySelector(".fa-repeat");
 moves = document.getElementById("moves-count");
 timeValue = document.getElementById("time");

 let levels=2,
 columns=2,
 rows=2,
 matched=0,
 cardOne,
 CardTwo,
 IsPreventClick= true;
//implemented click event to select and start game///
 startGameCards.forEach((element) => {
    element.addEventListener("click",(e) => {
        startGameCards.forEach((el) => {
            el.classList.remove("active");
        });
        e.target.parentElement.classList.add("active");
        levels = e.target.parentElement.getAttribute("level");
        columns = e.target.parentElement.getAttribute("column");
        rows = e.target.parentElement.getAttribute("row");

        
        
    });
 });

 startGame.addEventListener("click", (e) => {
    startGameContainer.style.display = "none";
    playground.style.display = "grid";
    playground.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
    playground.style.gridTemplateRows = `repeat(${rows}, 100px)`; 
    createCards();
 });
//adding new create card function to create dynamic cards///
 function createCards() {
    const cardArr = [
        "house",
        "cat",
        "jet-fighter-up",
        "umbrella",
        "gift",
        "car",
        "bicycle",
        "egg",
        
    ];
    shuffleArray(cardArr);
    shuffleCards([...cardArr.slice(0, levels), ...cardArr.slice(0, levels)]);
 }
 const shuffleArray = (array) => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
     
   }
 };
 function shuffleCards(cards) {
    playground.innerHTML = "";
    shuffleArray(cards);

    for (let i = 0; i < cards.length; i++) {
        playground.innerHTML+=`
        <div class="card" onclick='flipCard(this)'>
            <div class="front"><i class="fa-solid fa-question"></i></div>
            <div class="back"><i class="fa-solid fa-${cards[i]}"></i></div>
        </div>
        `
        ;
            
    }
    farepeat.style.display = "block";
 }
//function of flip card as the it is clicked///
 function flipCard(card){
   if (cardOne != card  && IsPreventClick){

  
    card.classList.add('flip');
    if (!cardOne){
      cardOne=card;
      return;
    }
    cardTwo = card;
    IsPreventClick = false;



    let cardOneValue = cardOne.querySelector(".back").innerHTML,
      cardTwoValue = cardTwo.querySelector(".back").innerHTML;

    matchCards(cardOneValue, cardTwoValue);
   }
 }
 //function of winning message////
 function matchCards(cardOneValue, cardTwoValue) {
   if (cardOneValue == cardTwoValue) {
       
      matched++;
      if(matched == levels) { 
         setTimeout(() => {
            alert("Yahoo!! You Won.....");
               }, 500);
      }


      
      
    //to check if cards are matched///  
         cardOne.classList.add("match");
         cardTwo.classList.add("match");

         cardOne.removeAttribute("onclick");
         cardTwo.removeAttribute("onclick");

      
       (cardOne = ""), (cardTwo = "");
       IsPreventClick = true;
      return;
   }
///wrong card to shake////
   setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
         }, 500);

///setting time out for the wrong card selected and flip again///
   setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      (cardOne = ""), (cardTwo = "");
      IsPreventClick = true;
         }, 1200);
 }

//creating event for reset the cards and display options////
 farepeat.addEventListener("click", () => {
    startGameContainer.style.display = "grid";
    playground.style.display = "none";
    farepeat.style.display = "none";



    (matched = 0),
    (cardOne = ""),
    (CardTwo = ""),
    (IsPreventClick = true);
 });



 