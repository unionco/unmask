function addStyles(element, globalOptions) {
    // Extract options from data-unmask attribute
    const options = element.dataset.unmask ? JSON.parse(element.dataset.unmask) : {};
    const global = globalOptions || {};

    // Define variables and defaults
    const {
        area = global.area || 'edge',
        size = global.size || 'full',
        fade = global.fade || true,
        origin = global.origin || 'left',
        speed = global.speed || 1000,
        delay = global.delay || 0,
    } = options;

    // Define all clip-path starting positions
    // These will all eventually transform into the unmasked value
    const shapes = {
        edge: {
            full: {
                top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
                bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            },
            half: {
                top: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
                right: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                bottom: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)',
                left: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
            },
        },
        center: {
            full: {
                horizontal: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
                vertical: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
                center: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
            },
            half: {
                horizontal: 'polygon(25% 0%, 75% 0%, 75% 100%, 25% 100%)',
                vertical: 'polygon(0% 25%, 100% 25%, 100% 75%, 0% 75%)',
                center: 'polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)',
            },
        }
    };

    element.style.setProperty('--unmask-delay', `${delay}ms`);
    element.style.setProperty('--unmask-opacity', fade ? 0 : 1);
    element.style.setProperty('--unmask-speed', `${speed}ms`);
    element.style.setProperty('--unmask-mask', shapes[area][size][origin]);
    element.style.webkitClipPath = 'var(--unmask-mask)';
    element.style.clipPath = 'var(--unmask-mask)';

    element.style.transitionDelay = 'var(--unmask-delay)';
    element.style.transitionDuration = 'var(--unmask-speed)';
    element.style.transitionProperty = `${fade ? 'opacity, ' : ''}clip-path, -webkit-clip-path, transform`;
    element.style.transitionTimingFunction = 'opacity, clip-path, -webkit-clip-path, transform';
    element.style.opacity = 'var(--unmask-opacity)';
}

export default function Unmask(globalOptions) {
    const nodeset = document.querySelectorAll('[data-unmask]');

    const observerConfig = {
        rootMargin: '0px 0px -250px 0px',
        threshold: 0
    };

    const unmasked = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

    const observer = new window.IntersectionObserver((elements, self) => {
        elements.forEach((element) => {
            if (element.isIntersecting) {
                // Add class and stop watching
                element.target.classList.add('is-unmasked');
                element.target.style.setProperty('--unmask-mask', unmasked);
                element.target.style.setProperty('--unmask-opacity', 1);

                self.unobserve(element.target);
            }
        });
    }, observerConfig);

    nodeset.forEach((node) => {
        addStyles(node, globalOptions);
        observer.observe(node);
    });
}
