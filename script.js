document.addEventListener("DOMContentLoaded", function () {
  var button1 = document.getElementById("expButton1")
  var button2 = document.getElementById("expButton2")
  var button3 = document.getElementById("expButton3")

  button1.addEventListener("click", function () {
    changeClass(button1, [button2, button3])
    changeText(button1)
    changeContent(button1)
  })

  button2.addEventListener("click", function () {
    changeClass(button2, [button1, button3])
    changeText(button2)
    changeContent(button2)
  })

  button3.addEventListener("click", function () {
    changeClass(button3, [button1, button2])
    changeText(button3)
    changeContent(button3)
  })

  function changeClass(targetButton, otherButtons) {
    targetButton.classList.remove("border-gray-400", "opacity-75")
    targetButton.classList.add("border-green-500", "opacity-100")
    otherButtons.forEach((button) => {
      button.classList.remove("border-green-500", "opacity-100")
      button.classList.add("border-gray-400", "opacity-75")
    })
  }

  function changeText(targetButton) {
    var title = document.getElementById("title")
    if (targetButton.id === "expButton1") {
      title.textContent = "Analysis and Test Execution"
    } else if (targetButton.id === "expButton2") {
      title.textContent = "International Quality Assurance"
    } else {
      title.textContent = "Defect Management and Improvements"
    }
  }

  function changeContent(targetButton) {
    var cont1 = document.getElementById("cont1")
    var cont2 = document.getElementById("cont2")
    var cont3 = document.getElementById("cont3")
    var cont4 = document.getElementById("cont4")

    if (targetButton.id === "expButton1") {
      cont1.textContent =
        "Carrying out systems analysis of mobile applications "
      cont2.textContent = "Execution of exploratory tests "
      cont3.textContent = "Conducting functional tests "
      cont4.textContent = "Executing performance tests "
    } else if (targetButton.id === "expButton2") {
      cont1.textContent =
        "Commitment to meeting international quality standards "
      cont2.textContent = "Adoption of globally recognized best practices "
      cont3.textContent =
        "Comprehensive testing for global usability and compliance "
      cont4.textContent =
        "Continuous refinement to surpass international quality norms and enhance user satisfaction "
    } else {
      cont1.textContent = "Detailed record of identified faults"

      cont2.textContent = "Proactive suggestion for improvements"
      cont3.textContent =
        "Use of the Jira Atlassian tool for efficient management of defects and improvements"
      cont4.textContent =
        "Implementation of best practices to prevent future defects"
    }
  }
})

var loadingBars = [
  { id: "loading-bar1", numberId: "loading-number1", finalWidth: 65 },
  { id: "loading-bar2", numberId: "loading-number2", finalWidth: 70 },
  { id: "loading-bar3", numberId: "loading-number3", finalWidth: 75 },
  { id: "loading-bar4", numberId: "loading-number4", finalWidth: 80 },
]

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.hasLoaded) {
      entry.target.hasLoaded = true
      increaseLoading(
        entry.target.barId,
        entry.target.numberId,
        entry.target.finalWidth
      )
      observer.unobserve(entry.target)
    }
  })
}

var observer = new IntersectionObserver(handleIntersection, { threshold: 0 })

loadingBars.forEach(function (bar) {
  var element = document.getElementById(bar.id)
  element.hasLoaded = false
  element.barId = bar.id
  element.numberId = bar.numberId
  element.finalWidth = bar.finalWidth
  observer.observe(element)
})

function increaseLoading(barId, numberId, finalWidth) {
  var hasLoaded = false

  function animateLoading() {
    if (!hasLoaded) {
      var loadingBar = document.getElementById(barId)
      var loadingNumber = document.getElementById(numberId)

      var width = 10
      var interval = setInterval(function () {
        if (width >= finalWidth) {
          clearInterval(interval)
          hasLoaded = true
        } else {
          width++
          loadingBar.style.width = width + "%"
          loadingNumber.innerText = width + "%"
        }
      }, 20)
    }
  }

  animateLoading()
}
