// Music suggestion form -> send to API
(function () {
  const API_BASE_URL = 'https://wedding-website-gjdq.onrender.com/api/songs';

  const form = document.getElementById('musicSuggestForm');
  const suggestionsContainer = document.getElementById('suggestionsContainer');
  const loadingSongs = document.getElementById('loadingSongs');
  const refreshBtn = document.getElementById('refreshSongs');

  if (!form) return;

  // Show message helper
  function showMessage(message, type = 'success') {
    const existingMessage = document.querySelector(
      '.success-message, .error-message'
    );
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className =
      type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    const form = document.getElementById('musicSuggestForm');
    form.insertAdjacentElement('afterend', messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  // Format date helper
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  // Create song item HTML
  function createSongItem(song) {
    const songDiv = document.createElement('div');
    songDiv.className = 'song-item';

    const suggestedBy = song.name || 'Anonymous';
    const date = formatDate(song.createdAt);

    songDiv.innerHTML = `
      <div class="song-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">by ${song.artist}</div>
        <div class="song-meta">
          <span class="song-suggested-by">Suggested by ${suggestedBy}</span>
          <span class="song-date">${date}</span>
        </div>
        ${
          song.message
            ? `<div class="song-message" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-light); font-style: italic;">"${song.message}"</div>`
            : ''
        }
      </div>
      <div class="song-actions">
        ${
          song.link
            ? `<a href="${song.link}" target="_blank" class="song-link">Listen</a>`
            : ''
        }
      </div>
    `;

    return songDiv;
  }

  // Fetch and display songs
  async function fetchSongs() {
    try {
      loadingSongs.style.display = 'block';
      suggestionsContainer.innerHTML = '';
      suggestionsContainer.appendChild(loadingSongs);

      const response = await fetch(`${API_BASE_URL}?status=approved&limit=50`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.songs && data.songs.length > 0) {
        suggestionsContainer.innerHTML = '';
        data.songs.forEach((song) => {
          suggestionsContainer.appendChild(createSongItem(song));
        });
      } else {
        suggestionsContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-music"></i>
            <div>No song suggestions yet. Be the first to suggest one!</div>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      suggestionsContainer.innerHTML = `
        <div class="error-message">
          Failed to load song suggestions. Please try again later.
        </div>
      `;
    } finally {
      loadingSongs.style.display = 'none';
    }
  }

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const artist = document.getElementById('artist').value.trim();
    const title = document.getElementById('title').value.trim();
    const link = document.getElementById('link').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!artist || !title) {
      showMessage('Please enter both Artist and Song Title.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Submitting...</span>';
    submitBtn.disabled = true;

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || 'Anonymous',
          artist,
          title,
          link: link || undefined,
          message: message || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(
          'Song suggestion submitted successfully! Thank you for your suggestion.'
        );
        form.reset();
        // Refresh the songs list
        await fetchSongs();
      } else {
        showMessage(
          data.message || 'Failed to submit song suggestion. Please try again.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error submitting song:', error);
      showMessage(
        'Network error. Please check your connection and try again.',
        'error'
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  // Handle refresh button
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      fetchSongs();
    });
  }

  // Load songs on page load
  fetchSongs();
})();
