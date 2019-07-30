
# Unmask.js 🎭
A scroll-to-reveal JavaScript library that unmasks your elements using the `clip-path` CSS property.

## Install
`npm i @union/unmask`

## How To Use
Add the `data-unmask` attribute to any DOM elements you want to add this transition to. In JS, you may run `Unmask()` without any options, or you can add an options object as a parameter to `Unmask()`. This will apply global options to all elements with the `data-unmask` attribute.

### Usage and Options
#### JavaScript
```javascript
import Unmask from 'unmask';
	
Unmask({
  // All options using defaults, with other options listed
  
  area: 'edge',
  // edge, center
  // What area of the element the transition starts from
  
  size: 'full',
  // full, half
  // Do the entire unmask transition, or start halfway
  
  origin: 'left'
  // left, right, top, bottom, horizontal, vertical, center
  // Where the animation begins on the element
  // The 'edge' area uses left, right, top, and bottom origins
  // The 'center' area uses horizontal, vertical, and center origins
  
  fade: true,
  // true, false
  // Fade in when revealed
  
  speed: 1000,
  // Affects the transition-duration when unmasking
  
  delay: 0
  // Affects transition-delay once element is within the viewport
});
```

#### HTML
```html
<img src="https://www.example.com/image.jpg" data-unmask />
```

#### CSS
This library uses JavaScript to apply styles so that no CSS file is needed for this library to work, but any elements that will be transitioned that are immediately visible when the page loads will not fade in properly. To fix this, simply add
```css
[data-unmask] {
  opacity: 0;
}
```

### Element-specific options
You may also pass options to the `data-unmask` attribute as a JSON object to cause Unmask to affect individual elements differently. Any options passed in the `data-unmask` attribute will override the global options on this element, and any options not specified will fallback to the global options and then the defaults.

```html
<img src="https://www.example.com/image.jpg" data-unmask='{"speed": 500, "delay": 200, "size": "half"}' />
```

### How It Works
This library utilizes the `clip-path` and `-webkit-clip-path` CSS attribute in combination with the Intersection Observer API to detect when elements are within the viewport and then reveal them.

[Docs for clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)

[Docs for Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Browser Support
This library supports Chrome, Firefox, Safari, and Edge (Chromium). IE11 and Edge are not supported.

---

Brought to you by [Union](https://github.com/unionco)
