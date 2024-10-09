var loadingBars = [
  { id: "loading-bar1", numberId: "loading-number1", finalWidth: 65 },
  { id: "loading-bar2", numberId: "loading-number2", finalWidth: 70 },
  { id: "loading-bar3", numberId: "loading-number3", finalWidth: 75 },
  { id: "loading-bar4", numberId: "loading-number4", finalWidth: 80 },
  { id: "loading-bar5", numberId: "loading-number5", finalWidth: 50 },
  { id: "loading-bar6", numberId: "loading-number6", finalWidth: 60 },
  { id: "loading-bar7", numberId: "loading-number7", finalWidth: 70 },
  { id: "loading-bar8", numberId: "loading-number8", finalWidth: 80 },
  { id: "loading-bar9", numberId: "loading-number9", finalWidth: 80 },
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

document
  .getElementById("professional-btn")
  .addEventListener("click", function () {
    document.getElementById("professional-section").scrollIntoView({
      behavior: "smooth", // Rolagem suave
    })
  })
document
  .getElementById("experience-btn")
  .addEventListener("click", function () {
    document.getElementById("experience-section").scrollIntoView({
      behavior: "smooth", // Rolagem suave
    })
  })
document.getElementById("contact-btn").addEventListener("click", function () {
  document.getElementById("contact-section").scrollIntoView({
    behavior: "smooth", // Rolagem suave
  })
})

//API TESTE//???????????????????????????????????????????????????????????????????????????????????????

let accessToken = ""

document.getElementById("searchButton").addEventListener("click", getArtistInfo)

function getToken() {
  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "8943114079a24d9585a6ce716ac54f26",
    client_secret: "0dd611f4cb8f4df981eabd64015bd598",
  })

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status)
      }
      return response.json()
    })
    .then((data) => {
      accessToken = data.access_token
      return accessToken
    })
}

function getArtistId(artistName) {
  return getToken().then(() => {
    return fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status)
        }
        return response.json()
      })
      .then((data) => {
        const artists = data.artists.items
        if (artists.length > 0) {
          return artists[0].id
        } else {
          throw new Error("Nenhum artista encontrado.")
        }
      })
  })
}

function getArtistInfo() {
  const artistName = document.getElementById("search").value
  getArtistId(artistName)
    .then((artistId) => {
      fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status)
          }
          return response.json()
        })
        .then((data) => {
          document.getElementById("artistName").textContent = data.name
          document.getElementById("popularityNumber").textContent =
            data.popularity

          document.getElementById("artistImage").src = data.images[0]?.url || ""
        })
        .catch((error) => {
          console.error("Erro:", error)
        })
    })
    .catch((error) => {
      console.error("Erro ao obter o ID do artista:", error)
    })
  getArtistTopTrack()
}

function getArtistTopTrack() {
  const artistName = document.getElementById("search").value

  getArtistId(artistName)
    .then((artistId) => {
      return fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status)
      }
      return response.json()
    })
    .then((data) => {
      document.getElementById("topTrack01").textContent = data.tracks[0].name
      document.getElementById("albumTrack01").src =
        data.tracks[0].album.images[0]?.url || ""

      document.getElementById("topTrack02").textContent = data.tracks[1].name
      document.getElementById("albumTrack02").src =
        data.tracks[1].album.images[0]?.url || ""

      document.getElementById("topTrack03").textContent = data.tracks[2].name
      document.getElementById("albumTrack03").src =
        data.tracks[2].album.images[0]?.url || ""

      document.getElementById("topTrack04").textContent = data.tracks[3].name
      document.getElementById("albumTrack04").src =
        data.tracks[3].album.images[0]?.url || ""

      document.getElementById("topTrack05").textContent = data.tracks[4].name
      document.getElementById("albumTrack05").src =
        data.tracks[4].album.images[0]?.url || ""
    })
    .catch((error) => {
      console.error("Erro:", error)
    })

}

