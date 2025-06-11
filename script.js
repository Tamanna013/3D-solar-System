/**
 * 3D Solar System Simulation with Three.js
 * Features: Realistic planet orbits, interactive controls, responsive design
 */

class SolarSystem {
    constructor() {
        // Core Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.clock = new THREE.Clock();
        
        // Animation and control state
        this.isPlaying = true;
        this.globalSpeed = 1.0;
        this.isDarkMode = true;
        
        // Solar system objects
        this.sun = null;
        this.planets = [];
        this.stars = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        // Planet data with realistic proportions (scaled for visibility)
        this.planetData = [
            { name: 'Mercury', radius: 0.4, distance: 8, speed: 4.74, color: 0x8C7853, info: 'Closest planet to the Sun. Very hot with extreme temperature variations.' },
            { name: 'Venus', radius: 0.7, distance: 12, speed: 3.50, color: 0xFFC649, info: 'Hottest planet in our solar system due to its thick atmosphere.' },
            { name: 'Earth', radius: 0.8, distance: 16, speed: 2.98, color: 0x6B93D6, info: 'Our home planet. The only known planet with life.' },
            { name: 'Mars', radius: 0.6, distance: 20, speed: 2.41, color: 0xCD5C5C, info: 'The Red Planet. Has the largest volcano in the solar system.' },
            { name: 'Jupiter', radius: 2.5, distance: 28, speed: 1.31, color: 0xD8CA9D, info: 'Largest planet in our solar system. A gas giant with many moons.' },
            { name: 'Saturn', radius: 2.2, distance: 36, speed: 0.97, color: 0xFAD5A5, info: 'Famous for its beautiful ring system. Less dense than water.' },
            { name: 'Uranus', radius: 1.5, distance: 44, speed: 0.68, color: 0x4FD0E7, info: 'An ice giant that rotates on its side. Has faint rings.' },
            { name: 'Neptune', radius: 1.4, distance: 52, speed: 0.54, color: 0x4B70DD, info: 'Farthest planet from the Sun. Has the strongest winds in the solar system.' }
        ];
        
        this.init();
    }
    
    /**
     * Initialize the solar system simulation
     */
    async init() {
        try {
            this.setupScene();
            this.setupLighting();
            this.setupCamera();
            this.setupRenderer();
            this.setupControls();
            await this.createSolarSystem();
            this.setupEventListeners();
            this.setupUI();
            this.animate();
            this.hideLoadingScreen();
        } catch (error) {
            console.error('Error initializing solar system:', error);
        }
    }
    
    /**
     * Setup the Three.js scene
     */
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);
    }
    
    /**
     * Setup lighting for realistic planet illumination
     */
    setupLighting() {
        // Ambient light for subtle illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
        this.scene.add(ambientLight);
        
        // Point light from the sun
        const sunLight = new THREE.PointLight(0xffffff, 2, 200);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        this.scene.add(sunLight);
    }
    
    /**
     * Setup camera with appropriate positioning
     */
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(30, 20, 30);
        this.camera.lookAt(0, 0, 0);
    }
    
    /**
     * Setup WebGL renderer with optimizations
     */
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        const container = document.getElementById('canvas-container');
        container.appendChild(this.renderer.domElement);
    }
    
    /**
     * Setup orbit controls for camera interaction
     */
    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 200;
        this.controls.enablePan = true;
        this.controls.autoRotate = false;
    }
    
    /**
     * Create the complete solar system
     */
    async createSolarSystem() {
        // Create background stars
        this.createStarField();
        
        // Create the Sun
        this.createSun();
        
        // Create planets
        this.createPlanets();
        
        // Create orbital paths (optional visual guides)
        this.createOrbitalPaths();
    }
    
    /**
     * Create a starfield background
     */
    createStarField() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            sizeAttenuation: false
        });
        
        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }
        
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        this.stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(this.stars);
    }
    
    /**
     * Create the Sun at the center
     */
    createSun() {
        const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            emissive: 0xffaa00,
            emissiveIntensity: 0.3
        });
        
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.userData = {
            name: 'Sun',
            info: 'The center of our solar system. A massive ball of hot plasma that provides energy to all planets.'
        };
        this.scene.add(this.sun);
    }
    
    /**
     * Create all planets with their properties
     */
    createPlanets() {
        this.planetData.forEach((data, index) => {
            const planet = this.createPlanet(data);
            this.planets.push(planet);
            this.scene.add(planet.group);
        });
    }
    
    /**
     * Create a single planet with its orbit group
     */
    createPlanet(data) {
        // Create planet geometry and material
        const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
        const material = new THREE.MeshLambertMaterial({ 
            color: data.color,
            transparent: true,
            opacity: 0.9
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = data.distance;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Store planet data
        mesh.userData = {
            name: data.name,
            info: data.info,
            originalColor: data.color
        };
        
        // Create orbit group
        const group = new THREE.Group();
        group.add(mesh);
        
        return {
            group: group,
            mesh: mesh,
            data: data,
            angle: Math.random() * Math.PI * 2, // Random starting position
            baseSpeed: data.speed * 0.01 // Convert to radians per frame
        };
    }
    
    /**
     * Create visual orbital paths
     */
    createOrbitalPaths() {
        this.planetData.forEach(data => {
            const curve = new THREE.EllipseCurve(
                0, 0,
                data.distance, data.distance,
                0, 2 * Math.PI,
                false,
                0
            );
            
            const points = curve.getPoints(100);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x444444,
                transparent: true,
                opacity: 0.3
            });
            
            const ellipse = new THREE.Line(geometry, material);
            ellipse.rotation.x = Math.PI / 2;
            this.scene.add(ellipse);
        });
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Mouse events for planet interaction
        this.renderer.domElement.addEventListener('click', (event) => this.onMouseClick(event));
        this.renderer.domElement.addEventListener('mousemove', (event) => this.onMouseMove(event));
        
        // Control panel events
        this.setupControlEvents();
    }
    
    /**
     * Setup control panel event listeners
     */
    setupControlEvents() {
        // Play/Pause button
        document.getElementById('play-pause-btn').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Reset camera
        document.getElementById('reset-camera').addEventListener('click', () => {
            this.resetCamera();
        });
        
        // Global speed control
        const globalSpeedSlider = document.getElementById('global-speed');
        globalSpeedSlider.addEventListener('input', (e) => {
            this.globalSpeed = parseFloat(e.target.value);
            document.getElementById('global-speed-value').textContent = `${this.globalSpeed.toFixed(1)}x`;
        });
        
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            this.camera.position.multiplyScalar(0.8);
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            this.camera.position.multiplyScalar(1.2);
        });
        
        // Panel toggle
        document.getElementById('toggle-panel').addEventListener('click', () => {
            this.togglePanel();
        });
    }
    
    /**
     * Setup UI elements and planet controls
     */
    setupUI() {
        this.createPlanetSliders();
    }
    
    /**
     * Create individual planet speed sliders
     */
    createPlanetSliders() {
        const container = document.getElementById('planet-sliders');
        
        this.planets.forEach((planet, index) => {
            const sliderDiv = document.createElement('div');
            sliderDiv.className = 'planet-slider';
            
            const label = document.createElement('label');
            label.innerHTML = `
                <span class="planet-name">${planet.data.name}</span>
                <span class="speed-value" id="speed-${index}">1.0x</span>
            `;
            
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '0';
            slider.max = '3';
            slider.step = '0.1';
            slider.value = '1';
            slider.id = `planet-${index}`;
            
            slider.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                planet.speedMultiplier = speed;
                document.getElementById(`speed-${index}`).textContent = `${speed.toFixed(1)}x`;
            });
            
            sliderDiv.appendChild(label);
            sliderDiv.appendChild(slider);
            container.appendChild(sliderDiv);
            
            // Initialize speed multiplier
            planet.speedMultiplier = 1.0;
        });
    }
    
    /**
     * Handle window resize
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    /**
     * Handle mouse click for planet selection
     */
    onMouseClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Check intersections with planets and sun
        const objects = [this.sun, ...this.planets.map(p => p.mesh)];
        const intersects = this.raycaster.intersectObjects(objects);
        
        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            this.showPlanetInfo(selectedObject.userData);
            this.highlightPlanet(selectedObject);
        }
    }
    
    /**
     * Handle mouse move for hover effects
     */
    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Reset all planet materials
        this.planets.forEach(planet => {
            planet.mesh.material.emissive.setHex(0x000000);
        });
        
        // Check for hover
        const objects = [...this.planets.map(p => p.mesh)];
        const intersects = this.raycaster.intersectObjects(objects);
        
        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;
            hoveredObject.material.emissive.setHex(0x333333);
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }
    
    /**
     * Show planet information in the info panel
     */
    showPlanetInfo(userData) {
        document.getElementById('planet-name').textContent = userData.name;
        document.getElementById('planet-description').textContent = userData.info;
    }
    
    /**
     * Highlight selected planet
     */
    highlightPlanet(object) {
        // Reset all highlights
        this.planets.forEach(planet => {
            planet.mesh.material.emissive.setHex(0x000000);
        });
        
        // Highlight selected
        if (object !== this.sun) {
            object.material.emissive.setHex(0x444444);
        }
    }
    
    /**
     * Toggle play/pause state
     */
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('play-pause-btn');
        btn.textContent = this.isPlaying ? '⏸️ Pause' : '▶️ Play';
    }
    
    /**
     * Toggle between dark and light themes
     */
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const body = document.body;
        const btn = document.getElementById('theme-toggle');
        
        if (this.isDarkMode) {
            body.classList.remove('light-mode');
            btn.textContent = '🌙 Dark Mode';
            this.scene.background = new THREE.Color(0x000011);
        } else {
            body.classList.add('light-mode');
            btn.textContent = '☀️ Light Mode';
            this.scene.background = new THREE.Color(0x87CEEB);
        }
    }
    
    /**
     * Reset camera to default position
     */
    resetCamera() {
        this.camera.position.set(30, 20, 30);
        this.camera.lookAt(0, 0, 0);
        this.controls.reset();
    }
    
    /**
     * Toggle control panel visibility
     */
    togglePanel() {
        const panel = document.getElementById('control-panel');
        const toggleBtn = document.getElementById('toggle-panel');
        
        panel.classList.toggle('collapsed');
        toggleBtn.textContent = panel.classList.contains('collapsed') ? '+' : '−';
    }
    
    /**
     * Hide loading screen when everything is ready
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    /**
     * Main animation loop
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.isPlaying) {
            this.updatePlanets();
            this.updateSun();
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * Update planet positions and rotations
     */
    updatePlanets() {
        const deltaTime = this.clock.getDelta();
        
        this.planets.forEach((planet) => {
            // Update orbital position
            const speed = planet.baseSpeed * this.globalSpeed * (planet.speedMultiplier || 1.0);
            planet.angle += speed * deltaTime * 60; // 60 FPS normalization
            
            // Update planet position in orbit
            const x = Math.cos(planet.angle) * planet.data.distance;
            const z = Math.sin(planet.angle) * planet.data.distance;
            planet.mesh.position.set(x, 0, z);
            
            // Rotate planet on its axis
            planet.mesh.rotation.y += 0.01 * this.globalSpeed;
        });
    }
    
    /**
     * Update sun rotation
     */
    updateSun() {
        if (this.sun) {
            this.sun.rotation.y += 0.005 * this.globalSpeed;
        }
    }
}

/**
 * Utility functions and additional features
 */

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frameCount = 0;
    }
    
    update() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }
    
    getFPS() {
        return this.fps;
    }
}

// Mobile device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimize for mobile devices
function optimizeForMobile(solarSystem) {
    if (isMobileDevice()) {
        // Reduce star count for better performance
        if (solarSystem.stars) {
            const positions = solarSystem.stars.geometry.attributes.position.array;
            const reducedPositions = new Float32Array(positions.length / 2);
            for (let i = 0; i < reducedPositions.length; i++) {
                reducedPositions[i] = positions[i * 2];
            }
            solarSystem.stars.geometry.setAttribute('position', new THREE.BufferAttribute(reducedPositions, 3));
        }
        
        // Reduce shadow quality
        solarSystem.renderer.shadowMap.enabled = false;
        
        // Lower pixel ratio
        solarSystem.renderer.setPixelRatio(1);
    }
}

// Keyboard shortcuts
function setupKeyboardShortcuts(solarSystem) {
    document.addEventListener('keydown', (event) => {
        switch(event.code) {
            case 'Space':
                event.preventDefault();
                solarSystem.togglePlayPause();
                break;
            case 'KeyR':
                solarSystem.resetCamera();
                break;
            case 'KeyT':
                solarSystem.toggleTheme();
                break;
            case 'ArrowUp':
                solarSystem.globalSpeed = Math.min(5, solarSystem.globalSpeed + 0.1);
                document.getElementById('global-speed').value = solarSystem.globalSpeed;
                document.getElementById('global-speed-value').textContent = `${solarSystem.globalSpeed.toFixed(1)}x`;
                break;
            case 'ArrowDown':
                solarSystem.globalSpeed = Math.max(0, solarSystem.globalSpeed - 0.1);
                document.getElementById('global-speed').value = solarSystem.globalSpeed;
                document.getElementById('global-speed-value').textContent = `${solarSystem.globalSpeed.toFixed(1)}x`;
                break;
        }
    });
}

// Error handling and fallbacks
function handleWebGLError() {
    if (!window.WebGLRenderingContext) {
        showError('WebGL is not supported by your browser.');
        return false;
    }
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
        showError('WebGL is not available. Please update your browser or graphics drivers.');
        return false;
    }
    
    return true;
}

function showError(message) {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.innerHTML = `
        <div style="text-align: center; color: #ff6b6b;">
            <h3>Error</h3>
            <p>${message}</p>
            <p>Please try refreshing the page or using a different browser.</p>
        </div>
    `;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check WebGL support
    if (!handleWebGLError()) {
        return;
    }
    
    try {
        // Create solar system instance
        const solarSystem = new SolarSystem();
        
        // Setup additional features
        const performanceMonitor = new PerformanceMonitor();
        setupKeyboardShortcuts(solarSystem);
        
        // Optimize for mobile
        setTimeout(() => {
            optimizeForMobile(solarSystem);
        }, 2000);
        
        // Performance monitoring (optional)
        if (window.location.search.includes('debug=true')) {
            setInterval(() => {
                performanceMonitor.update();
                console.log(`FPS: ${performanceMonitor.getFPS()}`);
            }, 1000);
        }
        
        // Global reference for debugging
        window.solarSystem = solarSystem;
        
    } catch (error) {
        console.error('Failed to initialize solar system:', error);
        showError('Failed to initialize the solar system. Please refresh the page.');
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SolarSystem, PerformanceMonitor };
}
