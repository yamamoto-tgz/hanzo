function activate(channelId) {
    document.querySelectorAll('.channel').forEach((channel) => {
        if (channel.id === channelId) {
            channel.classList.add('active');
        } else {
            channel.classList.remove('active');
        }
    });
}

function formatDate(date) {
    const formatter = new Intl.DateTimeFormat('ja-JP', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    });
    return formatter.format(date);
}

function formatText(text) {
    const match = text.match(/<([^|]+)\|([^>]+)>/);
    return match
        ? `<a class="text" href="${match[1]}" target="_blank" rel="noopener noreferrer">${match[2]}</a>`
        : `<span class="text">${text}</span>`;
}

function formatMessage(message) {
    return `
    <div class="message">
        <div>
            <span class="ts">${formatDate(new Date(message.ts * 1000))}</span>
            <span class="username">${message.user ? message.user : message.username}</span>
        </div>
        ${formatText(message.text)}
    </div>
    `;
}

async function click(event) {
    const channelId = event.target.id;

    const res = await fetch(`${channelId}/messages`);
    const json = await res.json();

    const html = json.map(formatMessage).join('');
    document.querySelector('#messages').innerHTML = html;

    activate(channelId);
}

document.querySelectorAll('.channel').forEach((el) => {
    el.addEventListener('click', click);
});
