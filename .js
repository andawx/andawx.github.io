async function searchFruit() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  
    if (searchInput === "") {
      alert("Please enter a fruit to search.");
      return;
    }
  
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=${searchInput}`);
      const data = await response.json();
      const pages = data.query.pages;
      const pageIds = Object.keys(pages);
      const firstPageId = pageIds[0];
      const extract = pages[firstPageId].extract;
  
      if (!extract || extract === "") {
        document.getElementById("fruitInfo").innerText = "No information found.";
        document.getElementById("fruitImage").src = "";
      } else {
        document.getElementById("fruitInfo").innerText = extract;
  
        const imageURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchInput}`;
        const imageResponse = await fetch(imageURL);
        const imageData = await imageResponse.json();
        const thumbnail = imageData.thumbnail;
        
        if (thumbnail && thumbnail.source) {
          document.getElementById("fruitImage").src = thumbnail.source;
        } else {
          document.getElementById("fruitImage").src = "https://via.placeholder.com/300";
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data. Please try again later.");
    }
  }
  
  // Function to commit and push changes to GitHub repository
  async function commitAndPush() {
    try {
      // Run Git commands using a shell script
      const response = await fetch('https://api.github.com/repos/<username>/<repository>/contents', {
        method: 'PUT',
        headers: {
          'Authorization': 'token <your-github-token>',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Commit changes from website',
          content: btoa('Add your file contents here'), // Encode file contents as base64
          branch: 'main' // Or specify your branch name
        })
      });
  
      if (response.ok) {
        alert('Changes committed and pushed successfully!');
      } else {
        alert('Error committing and pushing changes. Please try again.');
      }
    } catch (error) {
      console.error('Error committing and pushing changes:', error);
      alert('An error occurred. Please try again later.');
    }
  }
  