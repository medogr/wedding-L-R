document.addEventListener("DOMContentLoaded", () => {
    const scrollButton = document.querySelector(".scroll-btn");
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const recipientSelect = document.getElementById("recipientSelect");
    const backgroundImageInput = document.getElementById("backgroundImageInput");
    const brideImageInput = document.getElementById("brideImageInput");
    const groomImageInput = document.getElementById("groomImageInput");
    const musicInput = document.getElementById("musicInput");
    const musicPlayer = document.getElementById("musicPlayer");
    const musicToggle = document.getElementById("musicToggle");
    const startScreen = document.getElementById("startScreen");
    const startBtn = document.getElementById("startBtn");
    const hero = document.querySelector(".hero");
    const brideImage = document.querySelector(".bride img");
    const groomImage = document.querySelector(".groom img");

    const startInvitation = () => {
        if (startScreen) {
            startScreen.classList.add("is-opening");

            setTimeout(() => {
                startScreen.classList.add("is-opened");
            }, 200);

            setTimeout(() => {
                startScreen.classList.add("is-hidden");
                startScreen.style.display = "none";
            }, 2400);

            setTimeout(() => {
                if (musicPlayer) {
                    musicPlayer.play().catch(() => {
                        console.log("Music will play after user interaction.");
                    });
                }

                if (musicToggle) {
                    musicToggle.textContent = "إيقاف الأغنية";
                }
            }, 1200);
        }
    };

    if (hero) {
        hero.style.setProperty("--hero-image", 'url("1.jpg")');
        hero.style.background = 'linear-gradient(rgba(15, 8, 14, 0.64), rgba(20, 10, 19, 0.78)), url("1.jpg") center/cover no-repeat';
    }

    if (musicPlayer && !musicPlayer.src) {
        musicPlayer.src = "Mahmoud El Esseily - Farha _ 2017 _ محمود العسيلي - فرحة.mp3";
    }

    if (startBtn) {
        startBtn.addEventListener("click", startInvitation);
    }

    if (!startScreen) {
        startInvitation();
    }

    if (scrollButton) {
        scrollButton.addEventListener("click", () => {
            document.querySelector(".message").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }

    if (messageForm) {
        messageForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const message = (messageInput?.value || "").trim();
            const phoneNumbers = {
                groom: "201270758765",
                bride: "201125628965",
            };
            const selectedRecipient = recipientSelect?.value || "groom";
            const phoneNumber = phoneNumbers[selectedRecipient] || phoneNumbers.groom;

            if (!message) {
                messageInput?.focus();
                return;
            }

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
            messageForm.reset();
        });
    }

    const applyImageToElement = (input, callback) => {
        input?.addEventListener("change", (event) => {
            const file = event.target.files?.[0];
            if (!file || !file.type.startsWith("image/")) return;

            const objectUrl = URL.createObjectURL(file);
            callback(objectUrl);
        });
    };

    applyImageToElement(backgroundImageInput, (url) => {
        if (hero) {
            hero.style.setProperty("--hero-image", `url("${url}")`);
            hero.style.background = `linear-gradient(rgba(26, 12, 24, 0.34), rgba(26, 12, 24, 0.75)), var(--hero-image) center/cover no-repeat`;
        }
    });

    applyImageToElement(brideImageInput, (url) => {
        if (brideImage) brideImage.src = url;
    });

    applyImageToElement(groomImageInput, (url) => {
        if (groomImage) groomImage.src = url;
    });

    musicInput?.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file || !file.type.startsWith("audio/")) return;

        const objectUrl = URL.createObjectURL(file);
        if (musicPlayer) {
            musicPlayer.src = objectUrl;
            musicPlayer.load();
            musicPlayer.play().catch(() => {
                console.log("Waiting for user interaction to play music.");
            });
        }

        if (musicToggle) {
            musicToggle.textContent = "إيقاف الأغنية";
        }
    });

    musicToggle?.addEventListener("click", () => {
        if (!musicPlayer) return;

        if (musicPlayer.paused) {
            musicPlayer.play().catch(() => {
                console.log("Music will play after user interaction.");
            });
            musicToggle.textContent = "إيقاف الأغنية";
        } else {
            musicPlayer.pause();
            musicToggle.textContent = "تشغيل الأغنية";
        }
    });
});
