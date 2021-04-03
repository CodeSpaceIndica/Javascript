const TYPES = {
    RED:    1,
    GREEN:  2,
    BLUE:   3,
    YELLOW: 4,
    PURPLE: 5
}

const COLORS = {
    RED:    "#FF3300",
    GREEN:  "#33FF00",
    BLUE:   "#0033FF",
    YELLOW: "#FFFF33",
    PURPLE: "#BA55D3"
}

const INTERACTION = {
    ATTRACT: 1,
    REPEL: 0
}

const MIN_INTERACT_DIST = 10;
const MAX_INTERACT_DIST = 30;

const PARTICLE_SIZE = 4.5;
const PARTICLE_DIAM = PARTICLE_SIZE * 2;

const MAX_PARTICLES = 600;

const MAX_SPEED = 1.5;

const VISCOCITY = 0.91;