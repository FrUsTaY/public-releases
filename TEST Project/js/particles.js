// Декоративные плавающие символы (обычный режим)
// Simpson-частицы живут в easter-eggs.js; связь через window.__nexusSimpsonsMode
import { reducedMotion } from "./matrix-rain.js";
import { spawnParticle } from "./spawn-particle.js";

if (!reducedMotion) {
    setInterval(() => {
        if (document.hidden) return;
        if (window.__nexusSimpsonsMode) return; // в Симпсон-режиме свои частицы
        spawnParticle(['0', '1', '{', '}', '<', '>', '/'][Math.floor(Math.random() * 6)]);
    }, 1200);
}
