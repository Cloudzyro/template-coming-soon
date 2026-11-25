// Settings for the launch page. The words on the page are in index.html.
window.LAUNCH = {
  // When the shop opens. Include the time zone offset (-08:00 is US Pacific in winter).
  date: "2026-12-05T10:00:00-08:00",
  // How the launch time is described next to the date, in the owner's time zone.
  timeZone: "America/Los_Angeles",
  // Where the "Visit the shop" button goes once the countdown reaches zero.
  shopUrl: "https://shop.oddkiln.example",
  // Your form service's address (Formspree, Basin, Buttondown, a Supabase function...).
  // Leave empty and the sign-up form opens the visitor's email app instead.
  formEndpoint: "",
  // Where sign-ups go when there's no form endpoint.
  email: "hello@oddkiln.example",
};
