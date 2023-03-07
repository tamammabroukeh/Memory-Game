// Select Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To ASk For Name
  let yourName = prompt("What`s your name ?");
  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".info-container .name span").innerHTML = "Unknown";
    // If Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".info-container .name span").innerHTML = yourName;
  }
  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
};
// Effect Duration
let duration = 1000;
// Select Blocks COnatiner
let blocksContainer = document.querySelector(".memeory-game-blocks");
// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
// console.log(blocks);
// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];
//let orderRange = Array.from(Array(blocks.length).keys());
//console.log(orderRange);
shuffle(orderRange);
//console.log(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlocks) =>
    flippedBlocks.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length == 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".info-container .tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}
// Function To Shuffle Array Element
function shuffle(array) {
  // Variable Equal length array
  let arrayLength = array.length,
    temp,
    // Array To Store random indexes
    random;
  while (arrayLength > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * arrayLength);
    // Decrease Length By One
    arrayLength--;
    // [1] Save Current Element in Stach
    temp = array[arrayLength];
    // [2] Current Element  = Random Element
    array[arrayLength] = array[random];
    // [3] Random Element = Get Element Form Stach
    array[random] = temp;
  }
  return array;
}
