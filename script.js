// Countdown, the after-launch state and the sign-up form.
// Settings come from config.js. Add ?preview=open to the address to see the
// page as it will look after launch.

const config = window.LAUNCH || {};
const launchAt = new Date(config.date);
const preview = new URLSearchParams(location.search).get("preview");

const show = (selector, visible) =>
  document.querySelectorAll(selector).forEach((el) => (el.hidden = !visible));

// Describe the launch time in the owner's time zone, and in the visitor's when it differs.
const ownerZone = config.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const dayFormat = (zone) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: zone });
const timeFormat = (zone) =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: zone, timeZoneName: "short" });

function shortTime(zone) {
  return timeFormat(zone).format(launchAt).replace(":00", "").replace("AM", "am").replace("PM", "pm");
}

if (!Number.isNaN(launchAt.getTime())) {
  const launchText = document.querySelector("[data-launch-text]");
  if (launchText) launchText.textContent = `${dayFormat(ownerZone).format(launchAt)} at ${shortTime(ownerZone)}`;
  const localText = document.querySelector("[data-local-time]");
  if (localText && shortTime(visitorZone) !== shortTime(ownerZone)) {
    localText.textContent = `That's ${dayFormat(visitorZone).format(launchAt)} at ${shortTime(visitorZone)} where you are`;
  }
}

document.querySelectorAll("[data-shop-link]").forEach((a) => {
  if (config.shopUrl) a.href = config.shopUrl;
});

const units = {
  days: document.querySelector('[data-unit="days"]'),
  hours: document.querySelector('[data-unit="hours"]'),
  minutes: document.querySelector('[data-unit="minutes"]'),
  seconds: document.querySelector('[data-unit="seconds"]'),
};
const pad = (n) => String(n).padStart(2, "0");
const clock = document.querySelector("[data-clock]");
let timer;

function tick() {
  const left = launchAt.getTime() - Date.now();
  if (preview === "open" || left <= 0) {
    show("[data-before]", false);
    show("[data-after]", true);
    clearInterval(timer);
    return;
  }
  const s = Math.floor(left / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  units.days.textContent = d;
  units.hours.textContent = pad(h);
  units.minutes.textContent = pad(m);
  units.seconds.textContent = pad(s % 60);
  clock?.setAttribute("aria-label", `${d} days, ${h} hours and ${m} minutes to go`);
}

if (!Number.isNaN(launchAt.getTime())) {
  tick();
  timer = setInterval(tick, 1000);
}

// Sign-up: posts to formEndpoint when set, otherwise opens an email.
const form = document.querySelector(".signup");
const status = form?.querySelector(".signup-status");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = form.querySelector('input[type="email"]');
  const email = input.value.trim();
  if (!/.+@.+\..+/.test(email)) {
    input.setAttribute("aria-invalid", "true");
    status.textContent = "That email doesn't look right. Check it and try again.";
    input.focus();
    return;
  }
  input.setAttribute("aria-invalid", "false");

  if (!config.formEndpoint) {
    const subject = encodeURIComponent("Tell me when the shop opens");
    const body = encodeURIComponent(`Please email ${email} when the Odd Kiln shop opens.`);
    location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    status.textContent = "Online sign-up isn't set up yet, so your email app should open with a note to us. Send it and you're on the list.";
    form.classList.add("is-fallback");
    return;
  }

  const button = form.querySelector("button");
  button.disabled = true;
  status.textContent = "Adding you";
  try {
    const response = await fetch(config.formEndpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(String(response.status));
    form.reset();
    status.textContent = "You're on the list. We'll email you once, on launch day.";
    form.classList.add("is-done");
  } catch {
    status.innerHTML = `That didn't go through. Email <a href="mailto:${config.email}">${config.email}</a> and we'll add you.`;
  } finally {
    button.disabled = false;
  }
});
