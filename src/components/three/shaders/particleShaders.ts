export const particleVertexShader = `
  uniform float time;
  uniform vec2 mouse;
  attribute float size;
  attribute vec3 velocity;
  varying vec3 vColor;
  varying float vSize;
  varying float vAlpha;
  
  void main() {
    vColor = color;
    vSize = size;
    
    vec3 pos = position;
    
    // Complex wave motion
    pos.x += sin(time * 0.3 + pos.y * 0.05) * 2.0;
    pos.y += cos(time * 0.2 + pos.z * 0.03) * 1.5;
    pos.z += sin(time * 0.4 + pos.x * 0.02) * 1.0;
    
    // Mouse interaction
    vec2 mouseInfluence = mouse * 2.0;
    float mouseDistance = distance(pos.xy, mouseInfluence);
    float mouseEffect = 1.0 / (mouseDistance + 1.0);
    
    pos.x += mouseInfluence.x * mouseEffect * 0.5;
    pos.y += mouseInfluence.y * mouseEffect * 0.5;
    
    // Depth-based alpha
    vAlpha = 1.0 - (abs(pos.z) / 10.0);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = size * (400.0 / -mvPosition.z) * (1.0 + mouseEffect);
  }
`;

export const particleFragmentShader = `
  uniform float time;
  varying vec3 vColor;
  varying float vSize;
  varying float vAlpha;
  
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    float alpha = (1.0 - dist * 2.0) * vAlpha;
    alpha *= (sin(time * 0.5 + vSize * 2.0) * 0.3 + 0.7);
    
    vec3 color = vColor;
    color *= vec3(0.2, 0.4, 1.0); // Blue tint
    color += vec3(0.1, 0.0, 0.3) * sin(time + vSize); // Purple highlights
    
    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

export const morphVertexShader = `
  uniform float time;
  uniform vec2 mouse;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vElevation;
  
  void main() {
    vPosition = position;
    vNormal = normal;
    
    vec3 pos = position;
    
    // Complex morphing
    float elevation = sin(pos.x * 0.3 + time) * 0.3;
    elevation += cos(pos.y * 0.2 + time * 0.7) * 0.2;
    elevation += sin(pos.z * 0.4 + time * 0.5) * 0.1;
    
    pos += normal * elevation;
    vElevation = elevation;
    
    // Mouse interaction
    vec2 mouseInfluence = mouse * 0.3;
    pos.x += mouseInfluence.x * 0.3;
    pos.y += mouseInfluence.y * 0.3;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const morphFragmentShader = `
  uniform float time;
  uniform float opacity;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vElevation;
  
  void main() {
    vec3 color = vec3(0.05, 0.1, 0.3); // Dark blue
    color += vec3(0.1, 0.0, 0.2) * vElevation; // Purple based on elevation
    
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    
    gl_FragColor = vec4(color, opacity * fresnel);
  }
`;
