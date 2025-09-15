// Music suggestion form -> send via email
(function () {
  const form = document.getElementById('musicSuggestForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const artist = document.getElementById('artist').value.trim();
    const title = document.getElementById('title').value.trim();
    const link = document.getElementById('link').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!artist || !title) {
      alert('Please enter both Artist and Song Title.');
      return;
    }

    const to = 'samobisike@gmail.com';
    const subject = encodeURIComponent('New Music Suggestion');

    const bodyLines = [];
    if (name) bodyLines.push(`Name: ${name}`);
    bodyLines.push(`Artist: ${artist}`);
    bodyLines.push(`Title: ${title}`);
    if (link) bodyLines.push(`Link: ${link}`);
    if (message) bodyLines.push(`Message: ${message}`);

    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;

    // Open default mail client
    window.location.href = mailtoUrl;
  });
})();
