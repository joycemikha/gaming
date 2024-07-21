document.addEventListener('DOMContentLoaded', function() {
    // Hide elements initially
    $(`#test`).hide();
    $(`#test2`).hide();
    $(`#test3`).hide();
    $(`#test4`).hide();
    $(`#test5`).hide();
    $(`#test6`).hide();
  
    // Common function to attach click events
    function attachClickEvent(games, listSelector, detailSelector) {
      $(listSelector).find('.card').click(function() {
        const gameId = $(this).closest('.game').data('id');
        const game = games.find(g => g.id == gameId);
        if (game) {
          $(listSelector).hide();
          $(detailSelector).show();
          $(detailSelector).html(`
            <section class="details text-white" data-bs-theme="dark">
              <p><a href="index.html" class="link-body-emphasis text-decoration-none fs-2 p-2 ">x</a></p>
              <div class="container">
                <header class="justify-content-between">
                  <h1 class="text-center h3 py-4">Details Game</h1> 
                  <div class="row g-4" id="detailsContent">
                    <div class="col-md-4">
                      <img src="${game.thumbnail}" class="w-100" alt="image details">
                    </div>
                    <div class="col-md-8">
                      <h3>Title: ${game.title}</h3>
                      <p>Category: <span class="badge text-bg-info">mmorpg</span></p>
                      <p>Platform: <span class="badge text-bg-info">${game.platform}</span></p>
                      <p>Status: <span class="badge text-bg-info">Live</span></p>
                      <p class="small">${game.short_description}</p>
                      <a class="btn btn-outline-warning" target="_blank" href="${game.game_url}">Show Game</a>
                    </div>
                  </div>
                </div>
              </section>
          `);
        }
      });
    }
  
    // Fetch and display games for a given category
    async function fetchGames(category, listSelector, detailSelector) {
      const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'baa4325176msh19f814ab861137fp1642b3jsn065e30322e44',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      });
      const games = await response.json();
      displayGames(games, listSelector, detailSelector);
    }
  
    // Display games for a given category
    function displayGames(games, listSelector, detailSelector) {
      const gamesList = document.querySelector(listSelector);
      gamesList.innerHTML = games.map(game => `
        <div class="container d-flex game" data-id="${game.id}">
          <div class="shadow m-2 col">
            <div class="card h-100 bg-transparent" role="button">
              <div class="card-body">
                <figure class="position-relative">
                  <img class="card-img-top object-fit-cover h-100" src="${game.thumbnail}">
                </figure>
                <div class="hstack justify-content-between">
                  <h3 class="h6 small text-white">${game.title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>
                <p class="card-text text-white p-2 small text-center opacity-50">
                  ${game.short_description}
                </p>
              </div>
              <footer class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">MMORPG</span>
                <span class="badge badge-color">${game.platform}</span>
              </footer>
            </div>
          </div>
        </div>
      `).join('');
      attachClickEvent(games, listSelector, detailSelector);
    }
  
    // Fetch and display games for all categories
    fetchGames('mmorpg', '#games-list', '#test');
    fetchGames('shooter', '#games-list-shooter', '#test2');
    fetchGames('sailing', '#games-list-SAILING', '#test3');
    fetchGames('permadeath', '#games-list-PERMADEATH', '#test4');
    fetchGames('superhero', '#games-list-SUPERHERO', '#test5');
    fetchGames('pixel', '#games-list-PIXEL', '#test6');
  });
  