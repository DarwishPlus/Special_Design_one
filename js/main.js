// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log("Local Storage Is Not Empty")
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Active Colors List Item
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (e.dataset.color === mainColors) {
      e.classList.add("active");
    }
  });
}

//-------------------------------------------------------------------------------

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let BackgroundInterval;

// Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  // console.log(backgroundLocalItem) // false or true
  // console.log( typeof (backgroundLocalItem)) // string

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove Active Class From All Spans
  document.querySelectorAll(".random-background span").forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}
//-------------------------------------------------------------------------------

// Click  On Toggle Settings Gear
icons = document.querySelector(".toggle-box i");
settingsBox = document.querySelector(".settings-box");
toggleBox = document.querySelector(".toggle-box");

toggleBox.onclick = function () {
  // Toggle class fa-spin For Rotation On Self
  icons.classList.toggle("fa-spin");

  // Toggle Class Open On Main Setting Box
  settingsBox.classList.toggle("open");
};

//-------------------------------------------------------------------------------

/*
toggleBox.onclick = ()=> {
  if (settingsBox.classList.contains("open")) {
    icons.classList.remove("fa-spin")
    settingsBox.classList.remove("open")
  } else {
    icons.classList.add("fa-spin")
    settingsBox.classList.add("open")
  }
}
*/

//-------------------------------------------------------------------------------

//  switch colors
const colorsList = document.querySelectorAll(".colors-list li");

// Loop On All List Item
colorsList.forEach((li) => {
  // Click On Every List Item
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
/*
    // Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    // Add Active Class On Target Class
    e.target.classList.add("active");
    */
    handleActive(e)

  });
});

//-------------------------------------------------------------------------------

// Switch Random BackGround  Option
const randomBackEl = document.querySelectorAll(".random-background span");

// loop on all Spans
randomBackEl.forEach((span) => {
  // Click on Every Span
  span.addEventListener("click", (e) => {

    /*
    // Remove Active Class From All Spans
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });

    // Add Active Class On Self
    e.target.classList.add("active");
    */
    
    handleActive(e)

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(BackgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

//-------------------------------------------------------------------------------

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Image
function randomizeImg() {
  if (backgroundOption === true) {
    BackgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage =
        'url("imgs/landing_img/' + imgsArray[randomNumber] + '")';
    }, 3000);
  }
}
randomizeImg();

//------------------------------------------------------------------------------------------------------------

// Start Our Skills
// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop; // الارتفاع ما فوق العنصر

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight; // ارتفاع العنصر نفسه

  // Window Height
  let windowHeight = this.innerHeight; // ارتفاع الويندو اللي انت جواها

  // Window Scroll Top
  let windowScrollTop = this.pageYOffset; // الجزء اللي عملتله اسكرول

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // this.console.log("Skills Section Reached");
    let allSkills = document.querySelectorAll(".skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// --------------------------------------End Our Skills-------------------------------------
// Start Our Gallery
// Create Popup With The Image
let allImg = document.querySelectorAll(".gallery .images-box img");
allImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overLay Element
    let imageOverlay = document.createElement("div");
    // Add Class To Overlay
    imageOverlay.className = "img-overlay";
    // Append Overlay To Body
    document.body.appendChild(imageOverlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");
    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create Text Node
      imgHeading.appendChild(document.createTextNode(img.alt));
      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To popup Box
    popupBox.appendChild(popupImage);
    // Add  popup Box To Body
    document.body.appendChild(popupBox);

    // Create Close Span
    let CloseButton = document.createElement("span");
    // Create The Close Button Text
    let CloseButtonText = document.createTextNode("X");
    // Append Text To Close Button
    CloseButton.appendChild(CloseButtonText);
    // Add Class To Close Button
    CloseButton.className = "close-button";
    // Add Close Button To Popup Box
    popupBox.appendChild(CloseButton);
  });
});

// ------------------------------------End Our Gallery-----------------------------------------------
// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".img-overlay").remove();
  }
});

//----------------------------------------- Start Nav Bullets --------------------------
// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets-container .bullet");
// Select All Links
let allLinks = document.querySelectorAll(".links a");
let navBulletsContainer = document.querySelector(".nav-bullets")
let bulletsContainer = document.querySelector(".nav-bullets-container");
/*
allBullets.forEach(bullet => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
    behavior: "smooth"
    });
  });
});
*/

function scrollToSomewhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault
      document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth"
      });
    });
  });
}
scrollToSomewhere(allBullets)
scrollToSomewhere(allLinks)


//------------------------------------------ End Nav Bullets --------------------------

// ------------------------------- Handle Active State ----------------------------
function handleActive(ev) {
      // Remove Active Class From All Children
      ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
        e.classList.remove("active");
      });
      // Add Active Class On Target Class
      ev.target.classList.add("active");
}


// ------------------------------------- Show - Hide Bullets ---------------------------

let bulletsSpan = document.querySelectorAll(".bullets-option span");


let bulletLocalItem = localStorage.getItem("bullets_option")
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === 'block') {
    navBulletsContainer.style.display = 'block'
    document.querySelector(".bullets-option .yes").classList.add("active")
  } else {
    navBulletsContainer.style.display = 'none'
    document.querySelector(".bullets-option .no").classList.add("active")
  }
}

// 3 small bullets when scroll
document.addEventListener("reload", (e) => {
  if (window.pageYOffset > 450){ // يظهر السهم بعد التمرير لأكثر من 100px
    navBulletsContainer.style.display = 'block';
    bulletsContainer.style.display = 'none'
  } else {
    navBulletsContainer.style.display = 'none';
    bulletsContainer.style.display = 'none'
  }
})


bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show') {

        // 3 small bullets when scroll
        document.addEventListener("scroll", (e) => {
        if (window.pageYOffset > 450){ // يظهر السهم بعد التمرير لأكثر من 100px
          navBulletsContainer.style.display = 'block';
          bulletsContainer.style.display = 'none'
        } else {
          navBulletsContainer.style.display = 'none';
          bulletsContainer.style.display = 'none'
        }
      })

      navBulletsContainer.style.display = 'block';
      localStorage.setItem("bullets_option", 'block')
    } else {
      navBulletsContainer.style.display = 'none'
      localStorage.setItem("bullets_option", 'none')
// hide nav bullets when scroll if is not show
      navBulletsContainer.style.display = 'none';
      bulletsContainer.style.display = 'none'
    }
    handleActive(e)
  })
});



// --------------------------- circle bullets ---------------------------------------

document.querySelector(".nav-bullets i").addEventListener("click", () => {
  if (bulletsContainer.style.display === 'block') {
    bulletsContainer.style.display = 'none';
    document.querySelector(".nav-bullets i").style.opacity = "50%"
  } else {
    bulletsContainer.style.display = 'block'
    document.querySelector(".nav-bullets i").style.opacity = "100%"
  }
})

//--------------------------------------- reset-option ---------------------------
document.querySelector(".reset-option").onclick = function () {
  localStorage.clear(); // clear all
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bullets_option");
  window.location.reload() // Reload The window
};

// Toggle Menu
let toggleButton = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")

toggleButton.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation() // ready function to stop click between 3 span toggle menu

  // this.classList.add("menu-active")
  // tLinks.classList.add("open")

  this.classList.toggle("menu-active")
  tLinks.classList.toggle("open")
  // Notes: toggle ==> open and close when click
}
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleButton.classList.toggle("menu-active")
      tLinks.classList.toggle("open")
    }
  }
})
document.addEventListener("scroll", (e) => {
  if (e.target !== toggleButton && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleButton.classList.toggle("menu-active")
      tLinks.classList.toggle("open")
    }
  }
})
// -----------------------  Stop Propagation On Menu  -----------------------------
tLinks.onclick = function (e) {
    e.stopPropagation()
  }
//------------------------------------------------------------------------------------

/* <!--------------------------------- Start Create arrow To Scroll To Page Up-------------------- --> */

let arrow = document.querySelector(".toTop i")

arrow.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
);

document.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 100) { // يظهر السهم بعد التمرير لأكثر من 100px
    arrow.style.display = 'block';
  } else {
    arrow.style.display = 'none';
  }
})
/* <!-- --------------------------End Create arrow To Scroll To Page Up ----------------------------> */


// --------------------------- Start Footer-----------------------

document.getElementById("current-year").textContent = new Date().getFullYear()

// --------------------------- End Footer-----------------------

