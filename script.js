const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const serviceForm = document.querySelector("#service-form");
const result = document.querySelector("#request-result");
const summary = document.querySelector("#request-summary");
const copyButton = document.querySelector("#copy-request");
const copyStatus = document.querySelector("#copy-status");

menuButton?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

serviceForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(serviceForm);

  summary.value = [
    "ALL BY DEVOLL SERVICE REQUEST",
    "",
    `Name: ${data.get("name")}`,
    `Callback number: ${data.get("phone")}`,
    `Location: ${data.get("location")}, Manistee County`,
    `Service requested: ${data.get("service")}`,
    `Vehicle / machine / equipment: ${data.get("machine")}`,
    `Mobility: ${data.get("mobility")}`,
    "",
    "Problem description:",
    String(data.get("problem")).trim(),
  ].join("\n");

  result.hidden = false;
  result.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
});

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    copyStatus.textContent = "Copied.";
  } catch {
    summary.select();
    document.execCommand("copy");
    copyStatus.textContent = "Copied.";
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();