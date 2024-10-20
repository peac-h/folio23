import { DataPattern } from "../types";

// DOM Elements
const navContEl = document.getElementById("navContainer") as HTMLUListElement;
const sectionNumEl = document.getElementById("sectionNum") as HTMLDivElement;
const projectColOneEl = document.getElementById(
  "projectColOne"
) as HTMLDivElement;
const projectColTwoEl = document.getElementById(
  "projectColTwo"
) as HTMLDivElement;
const projectColThreeEl = document.getElementById(
  "projectColThree"
) as HTMLDivElement;
const overlayEl = document.getElementById("overlay") as HTMLDivElement;
const bodyEl = document.getElementById("body") as HTMLBodyElement;
const overlayContentEl = document.getElementById(
  "overlayContent"
) as HTMLDivElement;
const overlayContentTextEl = document.getElementById(
  "overlayContentText"
) as HTMLDivElement;
const overlayProgressEl = document.getElementById(
  "overlayProgress"
) as HTMLSpanElement;
const headerEl = document.getElementById("header") as HTMLHeadElement;
const animatedEls = document.querySelectorAll(
  ".animated"
) as NodeListOf<HTMLElement>;

class View {
  public changeTitles(): void {
    let titleList: string[] = ["Folio'23", "ფოლიო'23"];
    let titleIndex = 0;

    setInterval(() => {
      document.title = titleList[titleIndex % titleList.length];
      titleIndex++;
    }, 3000);
  }

  public async renderOverlay(): Promise<void> {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        overlayProgressEl?.classList.remove("hidden");
        resolve();
      }, 700)
    );

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        let progress = 1;

        const incrementProgress = () => {
          progress += 1;
          if (progress > 100) clearInterval(interval);
          overlayProgressEl.innerText = `${Math.min(progress, 100)}%`;
        };

        const interval = setInterval(incrementProgress, 70);
        resolve();
      }, 1500)
    );

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        overlayContentEl?.classList.remove("hidden");
        resolve();
      }, 1500)
    );

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        overlayContentTextEl?.classList.remove("hidden");
        resolve();
      }, 2000)
    );

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        overlayEl?.classList.add("hide");
        resolve();
      }, 5000)
    );

    headerEl?.classList.remove("hide");
    this.initializePage();

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        bodyEl.classList.add("filter");
        animatedEls.forEach((el) => (el.style.transform = "translate(0, 0)"));
        resolve();
      }, 500)
    );
  }

  public renderData(data: DataPattern[]): void {
    if (data)
      data.forEach((dataEl) => {
        let additionalClass: string = "";
        let span: string = "";

        if (dataEl.status)
          span = `<span class="col-red">/ ${dataEl.status}</span>`;

        if (dataEl.title === "Google I/O 2022" || dataEl.title === "CSS Hovers")
          additionalClass = "col-red";

        const markup = `
            <div class="projects__col-item">
            ${
              dataEl.status
                ? dataEl.tools
                  ? `
                ${dataEl.year} / ${dataEl.tools} /
                <span class="font-big ${additionalClass}">${dataEl.title}</span>${span}
                `
                  : `
            <span class="font-big ${additionalClass}">${dataEl.title}</span>${span}
            `
                : `
            <a href="${dataEl.link}" target="_blank">${dataEl.year} / ${dataEl.tools} /
                <span class="font-big ${additionalClass}">${dataEl.title}</span></a>
            `
            }
            </div>
        `;

        if (dataEl.type === "personal project")
          projectColTwoEl.innerHTML += markup;

        if (dataEl.type === "website clone")
          projectColThreeEl.innerHTML += markup;
      });
  }

  public revealSection(id: string): void {
    if (!id) return;

    const sections = [
      { name: "hero", num: "ა" },
      { name: "projects", num: "ბ" },
      { name: "info", num: "გ" },
      { name: "contact", num: "დ" },
    ];

    window.location.hash = id;

    let section = sections.find((el) => el.name === id);

    if (section) sectionNumEl.innerText = section.num;

    document.getElementById(id)?.classList.remove("hide");

    sections.forEach((section) => {
      if (id !== section.name)
        document.getElementById(section.name)?.classList.add("hide");
    });

    document
      .querySelector(`[data-section="${id}"]`)
      ?.querySelector(".active-nav")
      ?.classList.remove("hide");

    document
      .querySelector(`[data-section="${id}"]`)
      ?.querySelector(".nav-element")
      ?.classList.add("hide");
  }

  public handleNavClicks(): void {
    navContEl?.addEventListener("click", (e: Event) => {
      const clickedElement = (e.target as HTMLElement).closest("li");

      if (!clickedElement) return;

      const navElement = clickedElement.querySelector(
        ".nav-element"
      ) as HTMLDivElement;

      const activeNav = clickedElement.querySelector(
        ".active-nav"
      ) as HTMLDivElement;

      navElement?.classList.add("hide");

      activeNav?.classList.remove("hide");

      const siblings = Array.from(
        clickedElement.parentElement?.children || []
      ) as HTMLLIElement[];

      siblings.forEach((sibling) => {
        if (sibling !== clickedElement) {
          sibling.querySelector(".nav-element")?.classList.remove("hide");

          sibling.querySelector(".active-nav")?.classList.add("hide");
        }
      });

      const id = clickedElement.dataset.section;

      if (id) this.revealSection(id);
    });
  }

  public initializePage(): void {
    const initialHash = window.location.hash.substring(1);
    const sections = ["hero", "projects", "info", "contact"];
    const defaultSection = sections.includes(initialHash)
      ? initialHash
      : "hero";

    this.revealSection(defaultSection);
  }
}

export default new View();
