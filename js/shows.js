// ─── EDIT SHOWS HERE ──────────────────────────────────────────────────────────
// Add, remove, or update entries in this array.
// Fields: date (ISO string), venue, city, ticketUrl (string or null), soldOut (bool)
// ─────────────────────────────────────────────────────────────────────────────
const SHOWS = [
  {
    date: '2025-09-12',
    venue: 'The Horseshoe Tavern',
    city: 'Toronto, ON',
    ticketUrl: '#', // TODO: replace with real ticket link
    soldOut: false,
  },
  {
    date: '2025-09-27',
    venue: "Lee's Palace",
    city: 'Toronto, ON',
    ticketUrl: '#', // TODO: replace with real ticket link
    soldOut: false,
  },
  {
    date: '2025-10-11',
    venue: 'Velvet Underground',
    city: 'Toronto, ON',
    ticketUrl: '#', // TODO: replace with real ticket link
    soldOut: true,
  },
  {
    date: '2025-11-01',
    venue: 'The Rex Hotel Jazz & Blues Bar',
    city: 'Toronto, ON',
    ticketUrl: '#', // TODO: replace with real ticket link
    soldOut: false,
  },
];

// ─── Rendering (no need to edit below) ───────────────────────────────────────
function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  const month = d.toLocaleString('en-CA', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  return { month, day };
}

function renderShows() {
  const container = document.getElementById('shows-list');
  if (!container) return;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcoming = SHOWS.filter((s) => new Date(s.date + 'T00:00:00') >= now);
  upcoming.sort((a, b) => a.date.localeCompare(b.date));

  if (upcoming.length === 0) {
    container.innerHTML = '<p class="shows-empty">No shows announced right now — check back soon.</p>';
    return;
  }

  container.innerHTML = upcoming
    .map((show) => {
      const { month, day } = formatDate(show.date);
      const ticketLabel = show.soldOut ? 'Sold Out' : 'Get Tickets';
      const ticketClass = show.soldOut ? 'btn-ticket sold-out' : 'btn-ticket';
      const ticketTag = show.soldOut
        ? `<span class="${ticketClass}">${ticketLabel}</span>`
        : `<a href="${show.ticketUrl}" target="_blank" rel="noopener" class="${ticketClass}">${ticketLabel}</a>`;

      return `
        <div class="show-card">
          <div class="show-date">
            <div class="show-date-month">${month}</div>
            ${day}
          </div>
          <div>
            <div class="show-venue">${show.venue}</div>
            <div class="show-city">${show.city}</div>
          </div>
          ${ticketTag}
        </div>
      `;
    })
    .join('');
}

renderShows();
