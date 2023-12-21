
$(document).ready(function() {
    // get all the elements with class "typer"
    var elements = $('.typer');
    // loop through the elements
    for (var i = 0; i < elements.length; i++) {
      // get the word array in the data attribute
      var words = $(elements[i]).data('words');
      // get the speed you want the animation to run
      var timer = $(elements[i]).data('timer');
      // if there are words in the array do the following
      if (words) {
        // create a new instance of a LiveTyping object for every element
        // we pass in the element (<span>), the word array and the timer
        new LiveTyping(elements[i], words, timer);
      }
    }
  });
  
  
  // Create the instance constructor
  LiveTyping = function(elements, words, timer) {
    // we're basically passing
    this.words = words;
    this.element = elements;
    this.loop = 0;
    // if timer is not present, we set it to 1000 ms
    this.timer = timer / 2 || 1000;
    this.txt = '';
    // write is a prototype method, we are going to call it recursevely
    this.write();
    // to know if we're going forward or backwards
    this.isDeleting = false;
  }
  
  // Create the prototype method "write"
  LiveTyping.prototype.write = function() {
    // too keep track of what word we're looking at
    i = this.loop % this.words.length;
    // picking one word in the array
    fullText = this.words[i];
    
    // if we're going backwards (deleting)
    if (this.isDeleting) {
      // we remove the last letter of the word
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      // if we're not deleting, then we add each letter to the variable
      this.txt = fullText.substring(0, this.txt.length + 1);
    }
    
    // append a span with class "wrap" to the element
    this.element.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    
    // to use "this" inside of a setTimeout function
    // becase "this" gets lost inside other functions
    var that = this;
    
    // set time to whatever, I like this speed
    var time = 250;
    
    // if you're deleting, speed it up by half (250 / 2)
    if (this.isDeleting) {
      time /= 2;
    }
    
    // if not deleting and full word is on the screen
    if (!this.isDeleting && this.txt === fullText) {
      time = this.timer;
      // set isDeleting to true to start deleting
      this.isDeleting = true;
      // if isDeleting and txt is empty
    } else if (this.isDeleting && this.txt === '') {
      // you're not deleting anymore
      this.isDeleting = false;
      // increase loop
      this.loop++;
      // set timer again
      time = 250;
    }
    
    // a timeout function to run the method recursively for every word
    setTimeout(function() {
      // call this function again (notice the "that")
      that.write();
    }, time)
  }
