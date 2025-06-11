# 3D Solar System Simulation

A stunning, interactive 3D solar system simulation built with Three.js featuring realistic planet orbits, responsive controls, and smooth animations.

## 🌟 Features

### Core Features
- **3D Solar System**: Complete solar system with Sun and 8 planets
- **Realistic Orbits**: Planets orbit at different speeds based on real astronomical data
- **Interactive Controls**: Mouse/touch controls for camera movement and zoom
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: 60 FPS animations using requestAnimationFrame and THREE.Clock

### Advanced Features
- **Individual Planet Controls**: Adjust orbital speed for each planet independently
- **Global Speed Control**: Master speed slider affecting all planetary motion
- **Play/Pause Functionality**: Stop and resume all animations
- **Theme Toggle**: Switch between dark space and light sky backgrounds
- **Planet Information**: Click planets to learn interesting facts
- **Visual Orbital Paths**: Subtle guides showing planetary orbits
- **Starfield Background**: Beautiful star field with thousands of stars
- **Camera Controls**: Zoom, pan, and rotate with smooth damping

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open** `index.html` in a modern web browser
3. **Enjoy** exploring the solar system!

No build process or server required - just open and run!

## 🎮 Controls

### Mouse/Touch Controls
- **Click & Drag**: Rotate camera around the solar system
- **Scroll/Pinch**: Zoom in and out
- **Click Planets**: Select planets to view information

### Keyboard Shortcuts
- **Spacebar**: Play/Pause animation
- **R**: Reset camera to default position
- **T**: Toggle dark/light theme
- **↑/↓ Arrow Keys**: Increase/decrease global speed

### Control Panel
- **Play/Pause Button**: Stop/start all animations
- **Theme Toggle**: Switch between dark and light modes
- **Reset View**: Return camera to default position
- **Global Speed Slider**: Control overall animation speed (0x to 5x)
- **Individual Planet Sliders**: Fine-tune each planet's orbital speed
- **Zoom Controls**: Zoom in/out buttons for precise control

## 🌍 Planet Information

Each planet includes realistic data and interesting facts:

- **Mercury**: Closest to Sun, extreme temperatures
- **Venus**: Hottest planet due to thick atmosphere
- **Earth**: Our home, only known planet with life
- **Mars**: The Red Planet with largest volcano
- **Jupiter**: Largest planet, gas giant with many moons
- **Saturn**: Famous rings, less dense than water
- **Uranus**: Ice giant rotating on its side
- **Neptune**: Farthest planet with strongest winds

## 🛠️ Technical Details

### Technologies Used
- **Three.js**: 3D graphics and WebGL rendering
- **Vanilla JavaScript**: No frameworks, pure JS for performance
- **CSS3**: Modern styling with flexbox and animations
- **HTML5**: Semantic markup and responsive design

### Performance Optimizations
- **Efficient Rendering**: Optimized geometry and materials
- **Mobile Optimization**: Reduced complexity on mobile devices
- **Smooth Animations**: Delta time-based animations for consistent speed
- **Memory Management**: Proper cleanup and resource management
- **Cross-browser Compatibility**: Works on all modern browsers

### Browser Support
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+

## 📱 Mobile Experience

The simulation is fully optimized for mobile devices:
- **Touch Controls**: Intuitive touch gestures for navigation
- **Responsive UI**: Control panels adapt to screen size
- **Performance Optimized**: Reduced complexity for smooth mobile performance
- **Portrait/Landscape**: Works in both orientations

## 🎨 Customization

### Adding New Planets
To add new celestial bodies, modify the `planetData` array in `script.js`:

\```javascript
{
    name: 'Pluto',
    radius: 0.2,
    distance: 60,
    speed: 0.47,
    color: 0x8C7853,
    info: 'Former ninth planet, now classified as a dwarf planet.'
}
\```

### Styling Customization
- **Colors**: Modify CSS custom properties in `style.css`
- **Animations**: Adjust animation speeds and easing in JavaScript
- **UI Layout**: Customize control panel layout and positioning

### Performance Tuning
- **Star Count**: Adjust star field density in `createStarField()`
- **Shadow Quality**: Modify shadow map resolution
- **Geometry Detail**: Change sphere geometry segments for planets

## 🐛 Troubleshooting

### Common Issues

**Black Screen or No Display**
- Ensure WebGL is supported and enabled in your browser
- Update graphics drivers
- Try a different browser

**Poor Performance**
- Close other browser tabs
- Reduce global speed setting
- Disable shadows on older devices

**Controls Not Working**
- Check if JavaScript is enabled
- Ensure you're using a supported browser
- Try refreshing the page

### Debug Mode
Add `?debug=true` to the URL to enable performance monitoring and console logging.

## 📄 File Structure

\```
solar-system/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # Three.js logic and interactions
└── README.md           # This documentation
\```

## 🤝 Contributing

Feel free to contribute improvements:
1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Three.js Community**: For the amazing 3D library
- **NASA**: For planetary data and inspiration
- **Astronomy Community**: For accurate solar system information

---

**Enjoy exploring the cosmos! 🌌**

For questions or suggestions, please open an issue or contact the developer.
