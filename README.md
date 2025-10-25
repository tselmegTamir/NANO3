# 3D Web App - Spline & GSAP Integration

A modern React + Next.js 3D web application featuring Spline scenes with GSAP animations and interactive controls.

## 🚀 Features

- **Spline Integration**: Seamless 3D scene loading and object manipulation
- **GSAP Animations**: Smooth, performant animations for 3D objects
- **Interactive Controls**: Real-time object manipulation with UI controls
- **TypeScript Support**: Full type safety for Spline objects and animations
- **Next.js 14**: Server-side rendering with App Router
- **Responsive Design**: Optimized for all screen sizes

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎨 Getting Started

1. **Create a Spline Scene**:
   - Go to [Spline](https://spline.design) and create your 3D scene
   - Export as "Code" → "React" to get your scene URL
   - Replace the `DEMO_SCENE_URL` in `src/app/page.tsx`

2. **Configure Object Names**:
   - In your Spline scene, name your objects (e.g., "Cube", "Sphere")
   - Update the object names in `src/components/InteractiveDemo.tsx`

3. **Add Custom Animations**:
   - Use the GSAP utilities in `src/utils/splineGSAP.ts`
   - Create custom animation presets for your objects

## 🔧 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page with Spline scene
├── components/
│   ├── SplineScene.tsx    # Main Spline component
│   └── InteractiveDemo.tsx # Interactive controls
├── types/
│   └── spline.ts         # TypeScript definitions
└── utils/
    ├── constants.ts      # App constants
    └── splineGSAP.ts     # GSAP animation utilities
```

## 🎮 Usage Examples

### Basic Scene Loading

```tsx
import Spline from '@splinetool/react-spline';

function MyScene() {
  const handleLoad = (spline) => {
    console.log('Scene loaded:', spline);
  };

  return (
    <Spline
      scene="YOUR_SCENE_URL"
      onLoad={handleLoad}
    />
  );
}
```

### Object Manipulation

```tsx
import { animateObjectWithGSAP } from '@/utils/splineGSAP';

function Controls({ splineApp }) {
  const animateCube = () => {
    const cube = splineApp.findObjectByName('Cube');
    
    animateObjectWithGSAP(cube, {
      rotation: { y: cube.rotation.y + Math.PI },
      duration: 1,
      ease: 'back.out(1.7)'
    });
  };

  return <button onClick={animateCube}>Rotate Cube</button>;
}
```

### Event Handling

```tsx
function SplineWithEvents() {
  const handleClick = (e) => {
    if (e.target.name === 'Cube') {
      console.log('Cube clicked!');
    }
  };

  return (
    <Spline
      scene="YOUR_SCENE_URL"
      onSplineMouseDown={handleClick}
    />
  );
}
```

## 🎨 Animation Utilities

The project includes pre-built GSAP animation utilities:

- `animateObjectWithGSAP()` - Comprehensive object animation
- `animatePosition()` - Position-only animations
- `animateRotation()` - Rotation-only animations
- `animateScale()` - Scale-only animations
- `createSplineTimeline()` - Complex timeline animations

## 📱 Responsive Design

The app is fully responsive with:
- Adaptive UI controls
- Mobile-optimized interactions
- Touch-friendly buttons
- Responsive text and spacing

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Spline** - 3D scene creation and runtime
- **GSAP** - High-performance animations
- **Tailwind CSS** - Utility-first styling
- **React 18** - Latest React features

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 📝 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SPLINE_SCENE_URL=your_scene_url_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Next Steps

- [ ] Add more animation presets
- [ ] Implement physics interactions  
- [ ] Add sound integration
- [ ] Create animation sequencer
- [ ] Add VR/AR support

---

Built with ❤️ using Spline and GSAP