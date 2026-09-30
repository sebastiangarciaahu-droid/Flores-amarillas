
// ==========================================
// 1. ELEMENTOS PRINCIPALES
// ==========================================

const garden = document.getElementById("garden");
const bloomButton = document.getElementById("bloomBtn");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

let message = document.getElementById("message");

if (!garden || !bloomButton) {
  throw new Error("Falta el jardín o el botón en index.html");
}

// El jardín contiene elementos interactivos.
garden.removeAttribute("role");

if (!message) {
  message = document.createElement("p");
  message.id = "message";
  message.className = "message";
  message.setAttribute("aria-live", "polite");
  bloomButton.insertAdjacentElement("afterend", message);
}

const isTouchDevice = window.matchMedia(
  "(hover: none) and (pointer: coarse)"
).matches;


// ==========================================
// 2. MÚSICA
// ==========================================

if (bgMusic) {
  bgMusic.volume = 0.35;
}

function updateMusicButton() {
  if (!bgMusic || !musicBtn || !musicLabel) return;

  const playing = !bgMusic.paused;

  musicLabel.textContent = playing
    ? "Pausar música"
    : "Reproducir música";

  musicBtn.setAttribute("aria-pressed", String(playing));
  musicBtn.setAttribute(
    "aria-label",
    playing ? "Pausar música" : "Reproducir música"
  );
}

async function startMusic() {
  if (!bgMusic || !bgMusic.paused) return;

  try {
    await bgMusic.play();
  } catch (error) {
    updateMusicButton();
  }
}

if (bgMusic) {
  bgMusic.addEventListener("play", updateMusicButton);
  bgMusic.addEventListener("pause", updateMusicButton);
  bgMusic.addEventListener("ended", updateMusicButton);
}

if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", async () => {
    if (bgMusic.paused) {
      await startMusic();
    } else {
      bgMusic.pause();
    }
  });
}

startMusic();
updateMusicButton();


// ==========================================
// 3. LAS 11 FLORES
// ==========================================

// Las primeras diez son girasoles.
// La última es una rosa amarilla especial.

const layouts = [
  [5, 110, 42],
  [14, 170, 46],
  [23, 118, 40],
  [32, 204, 50],
  [41, 130, 43],
  [50, 145, 42],
  [59, 202, 49],
  [68, 116, 43],
  [76, 180, 48],
  [83, 112, 42],
  [91, 250, 88]
];


// ==========================================
// 4. MENSAJES
// ==========================================

const messages = [
  "No te pude dar flores amarillas, por la distancia, por un día en el que no seremos tan unidos, hoy, 30 de septiembre, quiero hacer un día especial para ambos, hoy te quiero dar, estas flores amarillas, cada una tiene un mensaje lindo para ti, y recuerda, si pudiera, convertiría cada kilómetro que nos separa en un abrazo, y te abrazaría tanto que el tiempo lejos uno del otro habrá valido cada día. 💛",

  "Eres mi rayito de sol incluso en los días más grises, tú eres esa personita que con solo un mensaje ilumina mi día, eres mi sol, mi buena energía, mi todo. En serio, eres un ángel venido al mundo a repartir tu alegría y amor, a todos. Yo amo tu forma de ser, amo tu locuras, tu forma de ser, tu forma de preocuparte por mí, el cariño que me das, amo, cada parte de tu personalidad, tu alma y tu cuerpo ☀️",

  "Cada día encuentro una nueva razón para quererte, y es que cada día, me encantas más pollito, esos pequeños detalles de ti que los demás no notan o pasan como normales, es lo que me enamora de ti más cada día, esa forma tan única en la que hablas, tu risa maravillosa y contagiosa, tus chistes que me hacen reír a carcajadas, los videos y reels que me mandas, de lo que haces, para mí, es lo mejor porque puedo saber más del día de mi persona favorita 🌻",

  "Te admiro demasiado, mi niña, en serio, eres una chica demasiado fuerte, disciplinada, trabajadora, berraca, yo soy tu fan número uno, mi niña, quiero que sepas que, cada sueño, plan, meta, pasatiempo que tengas, será apoyado por mí, seré esa persona que confiará en ti y en lo inteligente que eres, seré, el que a ojo cerrado diga, yo sé que esa niña logrará todo todo lo que ella quiera, sé que sí, Diosito, su familia, sus amigos y yo la apoyamos",

  "Quiero que sepas que, en el futuro te veo a ti, a Dios y a mí, en nuestros planes, amo que ames a Dios, bueno, ambos, jjsjs. Quiero que, nuestro vínculo y nuestra vida gire en torno a él, amo que vayas a la iglesia, que ayudes, quiero que algún día podamos ir los dos, a rezar, a pedirle a Diosito que nos dé suerte, amor y buenas energías a ambos, que nos perdone todo lo malo, y yo en lo personal, le pediré con mi corazoncito que siempre estés en mi vida ❤️",

  "Eres una chica demasiado linda, para mí, eres la chica más más hermosa, preciosa y linda del universo. Princesa, sé que no ves ni entiendes la belleza que hay en tu ser, no solo la que ves en el espejo al vestirte, o en una foto que te tomen, mi niña, déjeme decirle que cuando tú sonríes, cuando alguien tiene la suerte de verle esa hermosa carita todos los días, no sabe la suerte que tiene, tal vez tú no lo veas, pero desde mi punto de vista, hay cosas hermosas en este mundo, y luego estás tú, que haces que todas esas cosas parezcan intentos de parecerse a tu belleza ✨",

  "Si te preguntas, ¿Cómo? o ¿Por qué me enamoré de ti? Bueno, linda, desde que nos conocimos, desde que me hablaste primero, me di cuenta de que eras interesante, tímida, educada y divertida. A medida que fuimos hablando, conociéndonos, me di cuenta de que contigo solo bastaban mensajes para alegrar mi día, que con esa chica yo sentía una conexión, una compañía tan profunda, tan linda, un lugar seguro. Así, en mi mente solo salía un mensaje: esta niña es perfecta, quiero mejorar para ser perfecto para ella, quiero buscar a Dios, así supe que tú eres mi camino y la persona indicada, hice clic contigo",

  "Me gusta pasar los días contigo, cuando jugamos, decimos locuras, hacemos chistes, nos mandamos audios o simplemente nos escribimos, me gusta, porque, aunque la distancia nos separe, aunque seamos de distintos países, me siento cerca de ti compartiendo esos lindos momentos, y mi actividad favorita contigo es hacer llamada, porque escucho tu voz angelical y me siento cerca de ti más que nunca. 🌻",

  "Te tengo demasiada confianza, mi niña, nunca me abrí tanto con alguien, nunca hablo de mis sentimientos con nadie, solo contigo, me das esa paz, esa confianza de poder decirte lo que sea, sin miedo a ser criticado o juzgado, eso me encanta de ti, que tenemos una conexión tan linda que es difícil de tener hoy en día, y solo quiero que nuestra confianza del uno hacia el otro crezca más. 💌",

  "El día que nos veamos, tengo tanto que decirte, tantas cosas que quiero que hagamos juntos, bueno, primero, debemos darnos un abrazote, ehh, luego, te quiero invitar a comer un helado, caminar, y si nos da hambre podemos ir a comer algo ricoo, como tú sabes más de allá, tú me puedes decir dónde es rico comer. Pero, lo que más amaría sería verte y apreciar tu belleza, tu personalidad, y para qué mentir, me la pasaría emocionado mirándote solo a ti. 🌼",

  "Esta última flor es para recordarte que, como en este jardín de flores, hay muchas flores que yo podría mirar, pero mi corazón ya eligió a una flor, y esa flor no se compara con ninguna otra flor, esa flor es la más hermosa, con más brillo, esa flor es la envidia de las otras, porque esa flor no pelea por atención, esa flor sabe que ella es especial, y esa flor tiene toda mi atención. ❤️"
];


// ==========================================
// 5. MENSAJE INFERIOR
// ==========================================

function showMessage(text) {
  message.classList.remove("is-visible");
  void message.offsetWidth;
  message.textContent = text;
  message.classList.add("is-visible");
}


// ==========================================
// 6. CREAR LA ROSA
// ==========================================

function createRoseBloom() {
  const bloom = document.createElement("div");
  bloom.className = "rose-bloom";

  const layers = [
    {
      name: "outer",
      count: 10,
      radius: "-24%",
      offset: 0,
      delay: 0
    },
    {
      name: "middle",
      count: 8,
      radius: "-15%",
      offset: 22.5,
      delay: 0.2
    },
    {
      name: "inner",
      count: 6,
      radius: "-7%",
      offset: 0,
      delay: 0.4
    }
  ];

  layers.forEach((layer, layerIndex) => {
    for (let i = 0; i < layer.count; i++) {
      const petal = document.createElement("span");
      petal.className =
        `rose-petal rose-petal--${layer.name}`;

      petal.style.setProperty(
        "--angle",
        `${(360 / layer.count) * i + layer.offset}deg`
      );

      petal.style.setProperty("--radius", layer.radius);
      petal.style.setProperty(
        "--rose-layer",
        layerIndex + 1
      );
      petal.style.setProperty(
        "--rose-step",
        `${layer.delay + i * 0.025}s`
      );

      bloom.appendChild(petal);
    }
  });

  const core = document.createElement("span");
  core.className = "rose-core";
  bloom.appendChild(core);

  return bloom;
}


// ==========================================
// 7. CREAR CADA FLOR
// ==========================================

function createFlower(layout, index) {
  const [x, height, size] = layout;
  const isSpecial = index === layouts.length - 1;

  const slot = document.createElement("div");
  slot.className = "flower-slot";
  slot.style.setProperty("--x", `${x}%`);
  slot.style.setProperty(
    "--layer",
    isSpecial ? 20 : (index % 3) + 1
  );

  if (isSpecial) {
    slot.classList.add("special-slot");
  }

  const flower = document.createElement("div");
  flower.className = "flower";

  if (isSpecial) {
    flower.classList.add("special-flower");
  }

  flower.style.setProperty("--stem-height", `${height}px`);
  flower.style.setProperty("--size", `${size}px`);
  flower.style.setProperty(
    "--petal-width",
    `${size * 0.27}px`
  );
  flower.style.setProperty(
    "--petal-height",
    `${size * 0.5}px`
  );

  // La rosa florece después de las demás.
  const delay = isSpecial ? 1 : index * 0.045;
  flower.style.setProperty("--delay", `${delay}s`);

  // Tallo y hojas.
  const stem = document.createElement("div");
  stem.className = "stem";

  const leafLeft = document.createElement("div");
  leafLeft.className = "leaf leaf--left";

  const leafRight = document.createElement("div");
  leafRight.className = "leaf leaf--right";

  stem.append(leafLeft, leafRight);
  flower.appendChild(stem);

  // Cabeza de la flor.
  const head = document.createElement("div");
  head.className = "flower-head";
  head.setAttribute("role", "button");
  head.setAttribute(
    "aria-label",
    isSpecial ? "La última rosa amarilla" : `Flor ${index + 1}`
  );
  head.setAttribute("aria-disabled", "true");
  head.tabIndex = -1;

  if (isSpecial) {
    head.classList.add("special-head", "rose-head");
    head.appendChild(createRoseBloom());
  } else {
    // Girasoles normales.
    const petalCount = 14;

    for (let i = 0; i < petalCount; i++) {
      const orbit = document.createElement("div");
      orbit.className = "petal-orbit";
      orbit.style.setProperty(
        "--angle",
        `${(360 / petalCount) * i}deg`
      );

      const petal = document.createElement("div");
      petal.className = "petal";

      if (i % 2 === 0) {
        petal.classList.add("petal--light");
      }

      petal.style.setProperty("--step", `${i * 0.025}s`);
      orbit.appendChild(petal);
      head.appendChild(orbit);
    }

    const center = document.createElement("div");
    center.className = "flower-center";
    head.appendChild(center);
  }

  // Primer toque en celular: iluminar.
  // Segundo toque: abrir la carta.
  head.addEventListener("click", () => {
    if (!garden.classList.contains("is-bloomed")) return;

    const alreadySelected =
      head.classList.contains("is-selected");

    if (isTouchDevice && !alreadySelected) {
      garden.querySelectorAll(".flower-head").forEach((f) => {
        f.classList.remove("is-selected");
      });

      head.classList.add("is-selected");
      document.querySelector(".flower-bubble")?.remove();

      showMessage(
        "✨ ¡Has iluminado esta flor! Tócala otra vez para abrir tu mensaje. 💛"
      );

      return;
    }

    garden.querySelectorAll(".flower-head").forEach((f) => {
      f.classList.remove("is-selected");
    });

    head.classList.add("is-selected");
    showBubble(head, messages[index]);
  });

  // Compatibilidad con teclado.
  head.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      head.click();
    }
  });

  flower.appendChild(head);
  slot.appendChild(flower);

  return slot;
}


// ==========================================
// 8. CARTAS A PANTALLA COMPLETA
// ==========================================

function showBubble(head, text) {
  document.querySelector(".flower-bubble")?.remove();

  const overlay = document.createElement("div");
  overlay.className = "flower-bubble";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Carta para Stephany");

  const content = document.createElement("div");
  content.className = "bubble-content";

  const title = document.createElement("h2");
  title.className = "bubble-title";
  title.textContent = head.classList.contains("special-head")
    ? "Mi última flor, para ti 💛"
    : "Para ti, princesa Stephany 💛";

  const textElement = document.createElement("div");
  textElement.className = "bubble-text";
  textElement.textContent = text;

  const closeButton = document.createElement("button");
  closeButton.className = "bubble-close";
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "Cerrar carta");

  const isSpecial = head.classList.contains("special-head");

  function closeBubble() {
    overlay.remove();
    head.classList.add("is-selected");

    if (isSpecial) {
      // Al cerrar la última flor, aparece la sorpresa.
      showFinale(head);
    } else {
      document.body.style.overflow = "";
      head.focus();
    }
  }

  closeButton.addEventListener("click", closeBubble);

  overlay.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeBubble();
    }
  });

  content.append(title, textElement);
  overlay.append(content, closeButton);
  document.body.appendChild(overlay);

  document.body.style.overflow = "hidden";
  closeButton.focus();
}


// ==========================================
// 9. SORPRESA FINAL
// ==========================================

function showFinale(lastFlower) {
  document.querySelector(".finale-overlay")?.remove();

  const overlay = document.createElement("div");
  overlay.className = "finale-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Una sorpresa para Stephany");

  // Tarjeta central.
  const card = document.createElement("div");
  card.className = "finale-card";

  // Botón de cierre.
  const closeButton = document.createElement("button");
  closeButton.className = "bubble-close finale-close";
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "Cerrar sorpresa");

  // Título.
  const title = document.createElement("h2");
  title.className = "finale-title";
  title.textContent =
    "Esa flor eres tú, mi niña, la más hermosa de todas. 💛";

  // Rosa que flota.
  const floatingFlower = document.createElement("div");
  floatingFlower.className = "finale-flower";
  floatingFlower.setAttribute("aria-hidden", "true");
  floatingFlower.appendChild(createRoseBloom());

  // Marco para la fotografía.
  const photoFrame = document.createElement("div");
  photoFrame.className = "finale-photo-frame";

  const photo = document.createElement("img");
  photo.className = "finale-photo";
  photo.alt = "Stephany, la flor más hermosa";
  photo.decoding = "async";

  // Si la imagen no existe, mostrar un marcador.
  photo.addEventListener("error", () => {
    const placeholder = document.createElement("div");
    placeholder.className = "finale-photo-placeholder";
    placeholder.textContent =
      "Aquí va tu foto, mi niña 💛";

    photo.replaceWith(placeholder);
  }, { once: true });

  // Archivo de la fotografía.
  photo.src = "./foto-stephany.jpg";
  photoFrame.appendChild(photo);

  const footer = document.createElement("p");
  footer.className = "finale-footer";
  footer.textContent = "Con todo mi cariño ♡";

  // Cerrar la sorpresa.
  function closeFinale() {
    overlay.remove();
    document.body.style.overflow = "";
    lastFlower.focus();
  }

  closeButton.addEventListener("click", closeFinale);

  overlay.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeFinale();
    }
  });

  card.append(
    closeButton,
    title,
    floatingFlower,
    photoFrame,
    footer
  );

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  document.body.style.overflow = "hidden";
  closeButton.focus();
}


// ==========================================
// 10. CONSTRUIR EL JARDÍN
// ==========================================

layouts.forEach((layout, index) => {
  garden.appendChild(createFlower(layout, index));
});


// ==========================================
// 11. BOTÓN PARA FLORECER
// ==========================================

bloomButton.addEventListener("click", () => {
  startMusic();

  // Reiniciar el jardín.
  garden.classList.remove("is-bloomed");
  void garden.offsetWidth;
  garden.classList.add("is-bloomed");

  // Habilitar las flores.
  garden.querySelectorAll(".flower-head").forEach((head) => {
    head.setAttribute("aria-disabled", "false");
    head.tabIndex = 0;
    head.classList.remove("is-selected");
  });

  // Cerrar cualquier sorpresa anterior.
  document.querySelector(".flower-bubble")?.remove();
  document.querySelector(".finale-overlay")?.remove();
  document.body.style.overflow = "";

  showMessage(
    "Ahora toca cada flor, mi niña. Todas tienen algo que decirte. 💛"
  );

  const label = bloomButton.querySelector(".button-label");
  if (label) {
    label.textContent = "Volver a florecer";
  }

  bloomButton.setAttribute("aria-pressed", "true");
});