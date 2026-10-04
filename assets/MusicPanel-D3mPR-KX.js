import{$ as e,$r as t,At as n,Bt as r,C as i,Ct as a,Di as o,Ei as s,En as c,Er as l,F as u,Gi as d,Hi as f,Hn as p,Hr as m,Ii as h,Jn as g,Jr as _,Kr as v,Lr as ee,M as te,Mi as y,Ni as b,Nr as ne,Oi as x,Or as S,Pi as re,Pr as C,Q as ie,Qr as w,R as ae,Rr as oe,Sr as se,Ti as ce,Tt as le,Ui as T,Vi as ue,Vr as de,Vt as fe,W as pe,Wi as E,X as me,Xr as he,Yr as ge,Yt as _e,_ as ve,ai as ye,an as be,bi as D,cr as xe,di as O,dn as Se,dt as Ce,ei as we,fi as Te,ii as k,j as Ee,kr as De,li as Oe,oi as A,pi as j,qt as ke,ri as M,tn as Ae,ui as N,w as je,wt as Me,yi as P}from"./vendor-iGCAUQTu.js";import{n as Ne,r as Pe,t as F}from"./AudioCore.svelte-C_ROp-Sj.js";import{t as Fe}from"./DogsLogo-BgP1caJ_.js";import{t as Ie}from"./settingsManager.svelte-C26eDDX5.js";var Le=class{constructor(e,t){d(this,`canvas`,null),d(this,`gl`,null),d(this,`analyser`,null),d(this,`program`,null),d(this,`animationFrameId`,null),d(this,`startTime`,0),d(this,`vertexBuffer`,null),d(this,`audioTexture`,null),d(this,`uniforms`,{}),d(this,`frequencyBuffer`,null),this.canvas=e,this.analyser=t,this.frequencyBuffer=new Uint8Array(t?t.frequencyBinCount:128),this.gl=e.getContext(`webgl`)||e.getContext(`experimental-webgl`),this.gl||console.error(`WebGL not supported by this browser.`)}init(e){if(!this.gl)return;let t=this.gl;this.cleanupProgram();let n=this.compileShader(t.VERTEX_SHADER,`
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `),r=this.compileShader(t.FRAGMENT_SHADER,e);if(!n||!r)return;if(this.program=t.createProgram(),t.attachShader(this.program,n),t.attachShader(this.program,r),t.linkProgram(this.program),!t.getProgramParameter(this.program,t.LINK_STATUS)){console.error(`Shader program linking failed:`,t.getProgramInfoLog(this.program));return}t.useProgram(this.program);let i=new Float32Array([-1,-1,1,-1,-1,1,1,1]);this.vertexBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW);let a=t.getAttribLocation(this.program,`a_position`);t.enableVertexAttribArray(a),t.vertexAttribPointer(a,2,t.FLOAT,!1,0,0),this.audioTexture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.audioTexture),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),this.uniforms={time:t.getUniformLocation(this.program,`u_time`),resolution:t.getUniformLocation(this.program,`u_resolution`),volume:t.getUniformLocation(this.program,`u_volume`),bass:t.getUniformLocation(this.program,`u_bass`),mid:t.getUniformLocation(this.program,`u_mid`),treble:t.getUniformLocation(this.program,`u_treble`),audioTexture:t.getUniformLocation(this.program,`u_audioTexture`)},this.startTime=performance.now(),this.resize()}setPreset(e){this.init(e)}compileShader(e,t){if(!this.gl)return null;let n=this.gl,r=n.createShader(e);return n.shaderSource(r,t),n.compileShader(r),n.getShaderParameter(r,n.COMPILE_STATUS)?r:(console.error(`Shader compilation error (${e===n.VERTEX_SHADER?`VERTEX`:`FRAGMENT`}):`,n.getShaderInfoLog(r)),n.deleteShader(r),null)}start(){this.stop();let e=()=>{this.renderFrame(),this.animationFrameId=requestAnimationFrame(e)};this.animationFrameId=requestAnimationFrame(e)}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}resize(){if(!this.gl||!this.canvas)return;let e=this.gl,t=this.canvas.clientWidth,n=this.canvas.clientHeight;(this.canvas.width!==t||this.canvas.height!==n)&&(this.canvas.width=t,this.canvas.height=n,e.viewport(0,0,t,n))}renderFrame(){if(!this.gl||!this.program)return;let e=this.gl;this.resize(),e.useProgram(this.program),e.bindBuffer(e.ARRAY_BUFFER,this.vertexBuffer);let t=(performance.now()-this.startTime)/1e3,n=0,r=0,i=0,a=0;if(this.analyser){this.analyser.getByteFrequencyData(this.frequencyBuffer);let t=this.frequencyBuffer.length,o=0,s=0,c=0;for(let e=0;e<t;e++){let t=this.frequencyBuffer[e];n+=t,e<12?(r+=t,o++):e<64?(i+=t,s++):(a+=t,c++)}n=n/t/255,r=o>0?r/o/255:0,i=s>0?i/s/255:0,a=c>0?a/c/255:0,e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.audioTexture),e.texImage2D(e.TEXTURE_2D,0,e.LUMINANCE,t,1,0,e.LUMINANCE,e.UNSIGNED_BYTE,this.frequencyBuffer)}e.uniform1f(this.uniforms.time,t),e.uniform2f(this.uniforms.resolution,this.canvas.width,this.canvas.height),e.uniform1f(this.uniforms.volume,n),e.uniform1f(this.uniforms.bass,r),e.uniform1f(this.uniforms.mid,i),e.uniform1f(this.uniforms.treble,a),e.uniform1i(this.uniforms.audioTexture,0),e.drawArrays(e.TRIANGLE_STRIP,0,4)}cleanupProgram(){this.gl&&this.program&&(this.gl.deleteProgram(this.program),this.program=null)}destroy(){this.stop();let e=this.gl;e&&(this.cleanupProgram(),this.vertexBuffer&&(e.deleteBuffer(this.vertexBuffer),this.vertexBuffer=null),this.audioTexture&&(e.deleteTexture(this.audioTexture),this.audioTexture=null)),this.canvas=null,this.gl=null,this.analyser=null}},Re=[{id:`kaleidosync`,name:`Kaleidosync`,fragmentShader:`
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_volume;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform sampler2D u_audioTexture;
      
      #define PI 3.14159265359
      
      // Cosine based palette generators
      vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
        return a + b*cos( 6.28318*(c*t+d) );
      }
      
      void main() {
        // Normalize coordinates, center is (0,0)
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Dynamic zoom driven by volume and bass
        float zoom = 1.0 - (u_bass * 0.15 + u_volume * 0.1);
        uv *= zoom;
        
        // Polar coordinates
        float r = length(uv);
        float a = atan(uv.y, uv.x);
        
        // Kaleidoscope mirror segments
        float segments = 8.0 + floor(u_mid * 4.0); // More segments on high mids
        float segmentAngle = 2.0 * PI / segments;
        
        // Dynamic rotation based on time and audio treble
        float rot = u_time * 0.15 + u_treble * 0.2;
        a += rot;
        
        // Kaleidoscope folding
        float localAngle = mod(a, segmentAngle);
        localAngle = abs(localAngle - segmentAngle * 0.5);
        
        // Cartesian back-transformation
        vec2 p = r * vec2(cos(localAngle), sin(localAngle));
        
        // Audio warping waves
        float wave = texture2D(u_audioTexture, vec2(r * 0.5, 0.0)).r;
        p.x -= wave * (0.05 + u_bass * 0.1);
        
        // Fractal feedback mapping
        for(float i = 0.0; i < 4.0; i++) {
          p = abs(p) / dot(p, p) - vec2(0.8 + u_bass * 0.05);
        }
        
        // Generate beautiful coloring based on polar coordinates and frequency
        float colorFactor = length(p) * 0.15 + u_time * 0.2 + wave * 0.3;
        
        // High-end neon color palette
        vec3 color = palette(
          colorFactor,
          vec3(0.5, 0.5, 0.5),                                  // Brightness
          vec3(0.5, 0.5, 0.5),                                  // Contrast
          vec3(1.0, 1.0, 1.0),                                  // Frequency
          vec3(0.0, 0.33, 0.67) + vec3(u_bass * 0.1, 0.0, u_treble * 0.2) // Phase
        );
        
        // Vingette and glow
        float glow = 0.15 / (r + 0.02);
        color += vec3(glow * 0.12 * (1.0 + u_bass));
        
        // Soft audio-modulated background glow
        color += vec3(0.08, 0.04, 0.12) * (1.0 + u_bass * 1.5) * (1.0 - r * 0.8);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `},{id:`neon-tunnel`,name:`Neon Tunnel`,fragmentShader:`
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_volume;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform sampler2D u_audioTexture;
      
      #define PI 3.14159265359
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        float r = length(uv);
        float a = atan(uv.y, uv.x);
        
        // 3D Perspective mapping to tunnel
        float tunnelDepth = 1.0 / (r + 0.01);
        float tunnelAngle = a / (2.0 * PI) + 0.5;
        
        // Read frequency data at polar angles
        float freq = texture2D(u_audioTexture, vec2(tunnelAngle, 0.0)).r;
        
        // Animate coordinate systems moving through the tunnel
        float z = tunnelDepth + u_time * 1.2 - freq * 0.25;
        float x = tunnelAngle * 6.0 + u_time * 0.1 + sin(z * 0.5) * 0.2;
        
        // Procedural grid lines inside the tunnel
        float gridX = abs(sin(x * PI));
        float gridZ = abs(sin(z * PI));
        
        // Neon edge glows modulated by audio
        float glowX = smoothstep(0.92 - u_mid * 0.05, 1.0, gridX);
        float glowZ = smoothstep(0.92 - u_bass * 0.05, 1.0, gridZ);
        
        // Grid pattern
        float finalGlow = max(glowX, glowZ);
        
        // Radial color gradient that rotates and changes phase
        vec3 neonColor = vec3(
          sin(u_time * 0.2 + z * 0.05) * 0.5 + 0.5,
          cos(u_time * 0.3 + z * 0.08) * 0.5 + 0.5,
          sin(u_time * 0.1 - z * 0.1) * 0.5 + 0.5
        );
        
        // Glow scaling
        vec3 finalColor = finalGlow * neonColor * 2.2;
        
        // Add brightness tunnel ring pulses
        float ringPulse = sin(z * 3.0 - u_time * 5.0) * 0.5 + 0.5;
        finalColor += neonColor * ringPulse * 0.35 * u_bass;
        
        // Darken center to give depth
        finalColor *= smoothstep(0.0, 0.5, r);
        
        // Bass flash glow in center
        finalColor += vec3(0.8, 0.4, 1.0) * (0.015 / (r + 0.015)) * u_bass * 1.2;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `},{id:`cyber-grid`,name:`Cyber Grid`,fragmentShader:`
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_volume;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform sampler2D u_audioTexture;
      
      void main() {
        // Normalized screen coords
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // perspective projection simulation for the ground grid
        if (p.y < 0.15) {
          // Perspective grid coordinates
          float depth = 0.15 - p.y;
          float z = 1.0 / (depth + 0.001);
          float x = p.x * z * 0.5;
          
          // Audio waves deforming the grid coordinates
          float wave = texture2D(u_audioTexture, vec2(abs(x) * 0.05, 0.0)).r;
          z += wave * u_bass * 8.0;
          
          // Animate grid scroll
          x += sin(z * 0.05) * 0.1;
          z -= u_time * 4.0;
          
          // Grid lines calculations
          float gridLineX = smoothstep(0.04 + u_treble * 0.02, 0.0, abs(sin(x * 2.0) / z));
          float gridLineZ = smoothstep(0.04 + u_bass * 0.02, 0.0, abs(sin(z * 0.2) / z));
          
          float gridIntensity = max(gridLineX, gridLineZ) * (p.y + 0.25) * 3.5;
          
          // Deep cyber blue & magenta colors
          vec3 gridColor = mix(
            vec3(0.0, 0.6, 1.0), // Cyber Cyan
            vec3(1.0, 0.0, 0.6), // Vapor Magenta
            sin(z * 0.02 + u_time) * 0.5 + 0.5
          );
          
          vec3 finalColor = gridIntensity * gridColor;
          
          // Horizon glow
          float horizonGlow = smoothstep(0.0, 0.15, p.y + 0.1);
          finalColor += gridColor * (0.01 / (abs(p.y - 0.15) + 0.01)) * (0.5 + u_bass * 0.5);
          
          gl_FragColor = vec4(finalColor, 1.0);
        } else {
          // Cyber sky background with audio bars rising
          float distToHorizon = p.y - 0.15;
          
          // Horizon sunset glow
          vec3 sunColor = vec3(1.0, 0.1, 0.5); // Pink sunset
          vec3 skyColor = vec3(0.05, 0.02, 0.1); // Dark sky
          
          vec3 finalColor = mix(sunColor, skyColor, smoothstep(0.0, 0.8, distToHorizon));
          
          // Add neon audio equalizer bars rising from the horizon (centered skinnier layout)
          float scaleX = 0.6;
          float startX = 0.2;
          float mappedX = (uv.x - startX) / scaleX;
          
          if (mappedX >= 0.0 && mappedX <= 1.0) {
            float numBars = 16.0;
            float barIndex = floor(mappedX * numBars);
            float localBarX = fract(mappedX * numBars);
            
            // Fetch frequency for this bar
            float barFreq = texture2D(u_audioTexture, vec2(barIndex / numBars, 0.0)).r;
            
            // Bar height driven by frequency
            float barHeight = 0.15 + barFreq * 0.55;
            
            // Render glowing bars
            if (uv.y > 0.2 && uv.y < barHeight && localBarX > 0.15 && localBarX < 0.85) {
              float barGlow = smoothstep(0.0, 0.4, 1.0 - abs(localBarX - 0.5) * 2.0);
              
              // Equalizer neon color gradient (from pink to cyan)
              vec3 barColor = mix(
                vec3(1.0, 0.0, 0.6), // bottom pink
                vec3(0.0, 0.8, 1.0), // top cyan
                (uv.y - 0.2) / 0.55
              );
              
              finalColor += barColor * barGlow * 1.5;
            }
          }
          
          // Distant star dots pulsing to treble
          float stars = fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
          if (stars > 0.998 && uv.y > 0.4) {
            finalColor += vec3(1.0) * (0.5 + u_treble * 0.5);
          }
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      }
    `}],ze={id:`no-signal`,name:`No Signal`,fragmentShader:`
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      
      // High-frequency analog noise
      float noise = hash(uv + u_time * 15.0);
      
      // Horizontal scanlines
      float scanline = sin(uv.y * 450.0) * 0.12;
      
      // Slowly drifting vertical bar
      float bar = sin(uv.y * 2.5 + u_time * 1.8) * 0.05;
      
      // Subtle color chromatic aberration tint (shift screen coordinates per channel)
      float r = hash(uv + u_time * 15.0 + vec2(0.005, 0.0));
      float g = hash(uv + u_time * 15.0 + vec2(0.0, 0.005));
      float b = hash(uv + u_time * 15.0 + vec2(-0.005, -0.005));
      
      vec3 color = vec3(r - scanline + bar, g - scanline + bar, b - scanline + bar);
      
      // Apply dark retro vignetting
      float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 16.0;
      vignette = clamp(pow(vignette, 0.3), 0.0, 1.0);
      color *= vignette * 0.85;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `},Be=`I understand the creator of this sick beat Nxnja has a copyright notice on his music distribution website.\r
\r
https://nxnjaa.beatstars.com/music\r
\r
While this track in particular is not on that website, his terms of sevice is here\r
\r
\r
\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\r
Website Terms of Use\r
https://nxnjaa.beatstars.com Terms & Conditions\r
\r
\r
Effective date: July 8, 2024\r
\r
\r
\r
https://nxnjaa.beatstars.com ("Website", "us", "we", or "our") operates the https://nxnjaa.beatstars.com and other related websites (the "Service").\r
\r
\r
\r
Set forth below are the Terms and Conditions governing the Service (the “Terms and Conditions”), which may expand or change from time to time. As used herein, the term "you" or "your" or “user” refers to an individual, representing yourself or, if applicable, acting as legal representative for a group, business entity or corporation.\r
\r
\r
\r
CAREFULLY READ THESE TERMS AND CONDITIONS. BY AVAILING YOURSELF OF THE WEBSITE OR RELATED SERVICES, YOU ARE CONSENTING TO BE BOUND BY THESE TERMS AND CONDITIONS AS SUCH TERMS MAY BE MODIFIED FROM TIME TO TIME AS DESCRIBED BELOW.\r
\r
\r
\r
Use of Materials Found on the Website: The information, artwork, text, video, audio, pictures, software and other intellectual property (collectively, "Materials") contained on the Website are protected by copyright and international laws. You may only access and use the Materials for personal or educational purposes or as expressly provided for in these Terms and Conditions. You may not otherwise reproduce, distribute, publicly perform, publicly display, modify or create derivative works of the Materials, unless authorized by the appropriate copyright owner(s). In the event that you print Materials found on the Website, you must include any copyright notice originally included with the Materials on all copies. You may not link directly to any media file located on the Website Server, except where explicitly allowed to do so. You should not attempt to claim any Materials as your own work. Any computer software downloadable or otherwise available on the Website is provided subject to the terms of the applicable license agreement. Before using any of our logos, please contact us at hello@dogs.red\r
\r
\r
\r
\r
Copyright and Trademark Infringement Policy and Notification Procedure: BeatStars Inc. (“BeatStars”) does not own the musical compositions, sound recordings, art or other written or visual images (collectively, the "Content") posted by us to the Website. All Content is posted by us and we have represented and warranted to BeatStars that, among other things, neither the Content nor the names, trademarks and service marks under which Content is promoted (collectively, the "Name") infringes any third party's copyright, patent, trademark, trade secret or other proprietary rights, rights of publicity or privacy, or moral rights (see the section titled 'Representations and Warranties' of the current BeatStars Terms of Service here. Buyers are subject to clear any samples on any composition purchased.\r
\r
\r
\r
\r
Since BeatStars is not in a position to determine who has the prevailing claim to use any particular Content or Name posted to the Website, its policy on such matters is that they be resolved directly by the parties alleging misuse of their Content and/or Name (the "Complainants'') and us. Immediately notify us about allegations of infringement by clicking the Contact link and contacting us directly.\r
\r
\r
\r
\r
Complainants may notify us concerning any Content and/or Name being used on the Website in violation of their rights by sending an email to hello@dogs.red. We shall use information provided by Complainants in accordance with our then-current Privacy Policy and as reasonably necessary to address any allegations contained therein. In most cases, soon after receiving written notice alleging infringement, we will either remove the allegedly infringing Content and/or Name from those web pages identified or, at our election, remove those web pages entirely.\r
\r
\r
\r
\r
Refund policy: We do not offer refunds. If there are any issues with a premium service or an ordered item please contact hello@dogs.red immediately, we aim to solve any issue amicably. Premium services (recurring billings) can be canceled anytime for any reason. Cancellations by the individual, group or company that signed up for the premium service (collectively, the "Subscriber") will be effective after the paid period. In case of cancellation by the Subscriber the period that is already paid for will not be reimbursed. The premium service will then remain active until the end of the paid period. We reserve the right to cancel premium services for any reason at any time without notification. If we cancel a premium service before its expiration date, the Subscriber might be entitled to a pro-rated refund of the last payment. No refund will be given if a user violates the Terms and Conditions of the Website or any relevant License Agreement.\r
\r
\r
\r
\r
Premium service can be canceled by emailing hello@dogs.red with cancellation request and artist name or order ID. Cancellation will be confirmed by email.\r
\r
\r
\r
\r
Your Conduct: You shall use the Website for lawful purposes only. You shall not post or transmit via the Website any material which violates or infringes in any way upon the rights of others, which is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any law, or which, without our express prior approval, contains advertising or any solicitation with respect to products or services.\r
\r
\r
\r
\r
In addition, if we feel that a user abuses the Website site in any way, we reserve the right to share certain information with third parties in accordance with our then-current Privacy Policy. Abuses include (but are not limited to) possible copyright infringement, possible libel and slander, possible credit card fraud. We reserve the right to refuse service, terminate accounts, and/or cancel orders at its sole discretion and without notification.\r
\r
\r
\r
\r
Content: The Website offers a wide selection and variety of content to our members and users. Content may contain profanity or otherwise inappropriate or offensive material for children or other members and/or users. Members and/or users must evaluate and bear the risk associated with the use of the Website and related services. We suggest that parents should supervise their children’s on-line activities and consider using parental control tools available to help provide an appropriate on-line environment for their children. Users are also encouraged to contact us for evaluation of possible offensive material. We Reserve the right to act on such notices at our sole discretion.\r
\r
\r
\r
\r
Warranty Disclaimer. YOU EXPRESSLY AGREE THAT USE OF THE WEBSITE AND RELATED SERVICES IS AT YOUR SOLE RISK. THE WEBSITE, MATERIALS AND RELATED SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE NOR BEATSTARS MAKES ANY REPRESENTATIONS OR WARRANTIES WITH REGARD TO THE WEBSITE OR ANY MATERIALS THEREIN, WHETHER EXPRESS OR IMPLIED, ARISING BY LAW OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT OR ANY IMPLIED WARRANTY ARISING OUT OF COURSE OF PERFORMANCE, COURSE OF DEALING OR USAGE OF TRADE. IN ADDITION, WE NOR BEATSTARS MAKE ANY REPRESENTATIONS THAT THE OPERATION OF THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE. WE NOR BEATSTARS WILL BE LIABLE FOR THE CONSEQUENCES OF ANY INTERRUPTIONS OR ERRORS ON THE WEBSITE. IT IS YOUR RESPONSIBILITY TO EVALUATE THE ACCURACY, COMPLETENESS OR USEFULNESS OF ANY OPINION, ADVICE, INFORMATION OR OTHER CONTENT OR MATERIALS PROVIDED IN CONNECTION WITH OR OTHERWISE AVAILABLE THROUGH THE WEBSITE. PLEASE SEEK THE ADVICE OF PROFESSIONALS, AS APPROPRIATE, REGARDING THE EVALUATION OF ANY SUCH OPINION, ADVICE, INFORMATION OR OTHER CONTENT. UNDER NO CIRCUMSTANCE WILL BEATSTARS BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY YOUR RELIANCE ON INFORMATION OBTAINED THROUGH THE WEBSITE, OTHER THAN AS REQUIRED UNDER APPLICABLE CONSUMER-PROTECTION LAW. SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OF CERTAIN WARRANTIES OR LIMITATION OF CERTAIN TYPES OF DAMAGES, SO SOME OF THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU AND NOTHING CONTAINED HEREIN SHOULD BE CONSTRUED AS EXCLUDING OR LIMITING ANY LIABILITY BEYOND WHAT IS PERMITTED UNDER APPLICABLE LAW.\r
\r
\r
\r
\r
Limitation of Liability. By availing yourself of the Website, Materials or related services, you agree to release and hold us, BeatStars and the employees, officers, directors, shareholders, agents, representatives affiliates, subsidiaries, advertising, promotion and fulfillment agencies, any entity controlling, controlled by or under common control with BeatStars, any third-party providers or sources of information or data and legal advisers (collectively, "BeatStars Affiliates") harmless from any and all losses, damages, rights, claims and actions of any kind arising from or related to the Website, Materials or related services including but not limited to: (a) telephone, electronic, hardware or software, network, Internet or computer malfunctions, failures or difficulties of any kind; (b) failed, incomplete, garbled or delayed computer transmissions; (c) any condition caused by events beyond the control of BeatStars that may cause the Website or related services to be disrupted or corrupted; (d) any injuries, losses or damages of any kind arising in connection with or as a result of your use of the Website, Materials or related services; or (e) any printing or typographical errors in any materials associated with the Website, Materials or related services. In addition, you agree to defend, indemnify and hold us and BeatStars Affiliates harmless from any claim, suit or demand, including reasonable attorney's fees, made by a third party due to or arising out of your utilizing the Website, Materials or related services, your violation or breach of these Terms and Conditions, your violation of any rights of a third party, or any other act or omission by you. IN NO EVENT WILL WE OR BEATSTARS BE LIABLE FOR ANY INDIRECT, STATUTORY, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES OR ANY LOSS OF REVENUE ARISING OUT OF YOUR AVAILMENT OF MATERIALS (HOWEVER ARISING, INCLUDING NEGLIGENCE), EVEN IF WE OR BEATSTARS WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.\r
\r
\r
\r
\r
General Provisions: You agree to comply with all applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside. Your correspondence or business dealings with, or participation in promotions of or with parties found on or through the Website, including payment and delivery of related goods or services, and any other terms, conditions, warranties or representations applicable to such dealings, are solely between you and such parties. These Terms and Conditions are governed in all respects by the laws of the Tours, Indre et Loire, FR as such laws are applied to agreements entered into and to be performed entirely within Tours, Indre et Loire, FR residents. Legal proceedings related to the matters herein shall be brought in and adjudicated solely in the courts of Tours, Indre et Loire, FR. Both parties consent to extraterritorial service of process and submit to the jurisdiction of said courts. If any provision of these Terms and Conditions is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced. Our Failure to act with respect to a breach by you or others does not waive our right to act with respect to subsequent or similar breaches. These Terms and Conditions set forth the entire understanding and agreement of the parties as to the subject matter hereof and supersede all prior proposals, discussions or agreements with respect thereto. A printed version of these Terms and Conditions and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to these Terms and Conditions to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.\r
\r
\r
\r
\r
YouTube\r
\r
\r
\r
\r
By accessing and/or using the Website, You agree to YouTube's Terms of Service.\r
\r
\r
\r
\r
Age requirements for use of the Service: This Service is available for individuals aged 13 years or older. If you are 13 or older but under the age of 18, you should review these Terms and Conditions with your parent or guardian to make sure that you and your parent or guardian understand these Terms and Conditions.\r
\r
\r
\r
\r
Modification of Terms and Conditions: From time to time we may modify these Terms and Conditions in our sole discretion. When such modification is made, we will post a revised version of these Terms and Conditions on the Website. Modifications will be effective when they are posted. We are not required to provide you with notification that any such modification has been made. It is your responsibility to review these Terms and Conditions from time to time to be aware of any such modifications. Each time you log on to the Website, you will be deemed to have accepted any such modifications.\r
\r
\r
\r
https://nxnjaa.beatstars.com Privacy Policy\r
\r
\r
\r
Effective date: May 1, 2024\r
\r
\r
\r
\r
https://nxnjaa.beatstars.com ("Website", "us", "we", or "our") are committed to protecting your privacy online. We are also committed to providing you with the very best experience we can on our website (the “Website”). In order to enhance your experience on our Website we gather certain personal information about you that helps us customize our content to your tastes and preferences. Please read the following Privacy Policy to understand how your personal information will be treated as you make full use of our Website.\r
\r
\r
\r
\r
We operate the Website and other related websites and applications (the "Service").\r
\r
\r
\r
\r
This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.\r
\r
\r
\r
\r
We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.\r
\r
\r
\r
Definitions\r
\r
\r
Personal Data\r
\r
\r
\r
Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).\r
\r
\r
\r
Usage Data\r
\r
\r
\r
Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).\r
\r
\r
\r
Cookies\r
\r
\r
\r
Cookies are small pieces of data stored on a User's device.\r
\r
\r
\r
Data Controller\r
\r
\r
\r
Data Controller means a person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed.\r
\r
\r
\r
\r
For the purpose of this Privacy Policy, we are a Data Controller of your data.\r
\r
\r
\r
Data Processor (or Service Providers)\r
\r
\r
\r
Data Processor (or Service Provider) means any person (other than an employee of the Data Controller) who processes the data on behalf of the Data Controller.\r
\r
\r
\r
\r
We may use the services of various Service Providers in order to process your data more effectively.\r
\r
\r
\r
Data Subject\r
\r
\r
\r
Data Subject is any living individual who is the subject of Personal Data.\r
\r
\r
\r
User\r
\r
\r
\r
The User is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.\r
\r
\r
\r
Information Collection and Use\r
\r
\r
\r
We collect several different types of information for various purposes to provide and improve our Service to you.\r
\r
\r
\r
Types of Data Collected\r
\r
\r
Personal Data\r
\r
\r
\r
While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:\r
\r
\r
\r
\r
Email address\r
\r
First name and last name\r
\r
Phone number\r
\r
Address, State, Province, ZIP/Postal code, City\r
\r
Cookies and Usage Data\r
\r
\r
\r
\r
We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send or by contacting us.\r
\r
\r
\r
Usage Data\r
\r
\r
\r
We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").\r
\r
\r
\r
\r
This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.\r
\r
\r
\r
\r
When you access the Service by or through a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.\r
\r
\r
\r
Location Data\r
\r
\r
\r
We may use and store information about your location if you give us permission to do so ("Location Data"). We use this data to provide features of our Service, to improve and customize our Service.\r
\r
\r
\r
\r
You can enable or disable location services when you use our Service at any time, through your device settings.\r
\r
\r
\r
Tracking Cookies Data\r
\r
\r
\r
We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.\r
\r
\r
\r
\r
Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.\r
\r
\r
\r
\r
You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.\r
\r
\r
\r
\r
Examples of Cookies we use:\r
\r
\r
\r
Session Cookies. We use Session Cookies to operate our Service.\r
\r
Preference Cookies. We use Preference Cookies to remember your preferences and various settings.\r
\r
Security Cookies. We use Security Cookies for security purposes.\r
\r
\r
\r
Use of Data\r
\r
\r
\r
Our primary goal in collecting personal information is to provide you, the user, with a customized experience on our Website. We use the collected data for various purposes including:\r
\r
\r
\r
\r
To provide and maintain our Service\r
\r
To notify you about changes to our Service or updates to our Website\r
\r
To allow you to participate in interactive features of our Service when you choose to do so\r
\r
To provide customer support\r
\r
To gather analysis or valuable information so that we can improve our Service\r
\r
To monitor the usage of our Service, estimate the size of our audience and measure certain traffic patterns\r
\r
To detect, prevent and address technical issues\r
\r
To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information\r
\r
To provide such capabilities as personalization services, interactive communications, online shopping, and personalized communication between you and the artists you prefer.\r
\r
To track the progress and number of entries in our promotions and contests\r
\r
To track visits to and business conducted at our online store\r
\r
To contact you on behalf of certain artists, other third parties, deliver targeted advertisements that may be of interest to you and information regarding special events regarding the Website and BeatStars.\r
\r
\r
\r
\r
In addition, if we feel that a user abuses the Website In any way, we reserve the right to share certain information with third parties. Abuses include (but are not limited to) possible copyright infringement, possible libel and slander, possible credit card fraud.\r
\r
\r
\r
Sharing of Data\r
\r
\r
\r
We do not sell, rent, or trade your personal information with others. However, when one or more of our business partners co-sponsor a service, promotion and/or contest, we may share some or all of the information collected in connection with such service, promotion or contest with the co-sponsor(s). If you do not want your information to be shared, you will be able to choose not to allow the transfer by not using or signing up for that particular service, promotion or contest.\r
\r
\r
\r
\r
In addition, when you make a purchase through our online store, or sign up to receive promotional items from us, we may share some of your personal information with third parties helping us to complete your transaction or send you the items you signed up to receive. When we share your information with such third parties, we will work to ensure that only the information necessary to complete your transaction is disclosed. This Privacy Policy does not apply to such third parties.\r
\r
\r
\r
Social Media\r
\r
\r
\r
If you share our content through social media, for example by liking us on Facebook, following or tweeting about us on Twitter, or giving us a '+1' via Google Plus, those social networks will record that you have done so and may set a cookie for this purpose.\r
\r
\r
\r
\r
In some cases, where a page on our Website includes content from a social network, such as a Twitter feed, or Facebook comments box, those services may set a cookie even where you do not click a button. As is the case for all cookies, we cannot access those set by social networks, just as those social networks cannot access cookies we set ourselves.\r
\r
\r
\r
Third Party Platform Advertising\r
\r
\r
\r
We may share your information with third party platform providers (such as Facebook, Google, Twitter and Datacrushers) to serve targeted advertising/content to you via the relevant third-party platform based on your profile/interests. Your information is used by the third-party platform provider to identify your account and serve advertisements to you.\r
\r
\r
\r
\r
Facebook Conversion Tracking Pixel\r
\r
\r
\r
\r
Our Website utilizes the Conversion Tracking Pixel service of Facebook. This tool allows us to follow the actions of users after they are redirected to a provider's Website by clicking on a Facebook advertisement. We are thus able to record the efficiency of Facebook advertisements for statistical and market research purposes. The collected data remain anonymous and we cannot see the personal data of any individual user, however the collected data is saved and processed by Facebook. Facebook is able to connect this data with your Facebook account and the data is used for their own advertising purposes in accordance with their policy found under: https://www.facebook.com/about/privacy. Please click here if you would like to revoke your permission: https://www.facebook.com/ads/website\\_custom\\_audiences/.\r
\r
\r
\r
Datacrushers\r
\r
\r
\r
\r
Datacrushers is a revenue discovery platform and global leader in site-wide revenue, shopping cart abandonment recovery, and acceleration. Shopping cart data and email addresses are shared with us that have opted in for the Service. We are bound by their terms and conditions located at: https://www.datacrushers.com/terms-and-conditions.\r
\r
\r
\r
\r
YouTube\r
\r
\r
\r
\r
You acknowledge and agree that this Website uses YouTube API Services. By accessing and/or using the Website, You agree to YouTube's Terms of Service and the YouTube Privacy Policy.\r
\r
\r
\r
Retention of Data\r
\r
\r
\r
We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.\r
\r
\r
\r
\r
We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.\r
\r
\r
\r
Transfer of Data\r
\r
\r
\r
Your information, including Personal Data, may be transferred to \\- and maintained on \\- computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.\r
\r
\r
\r
\r
If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.\r
\r
\r
\r
\r
Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.\r
\r
\r
\r
\r
We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.\r
\r
\r
\r
Disclosure of Data\r
\r
\r
Business Transaction\r
\r
\r
\r
If we are involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.\r
\r
\r
\r
Disclosure for Law Enforcement\r
\r
\r
\r
Under certain circumstances, we and/or BeatStars. may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).\r
\r
\r
\r
Legal Requirements\r
\r
\r
\r
We may disclose your Personal Data in the good faith belief that such action is necessary to:\r
\r
\r
\r
\r
To comply with a legal obligation\r
\r
To comply with a legal obligation\r
\r
To protect and defend the rights or property\r
\r
To prevent or investigate possible wrongdoing in connection with the Service\r
\r
To protect the personal safety of users of the Service or the public\r
\r
To protect against legal liability\r
\r
\r
\r
Security of Data\r
\r
\r
\r
The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.\r
\r
\r
\r
"Do Not Track" Signals\r
\r
\r
\r
We do not support Do Not Track ("DNT"). Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.\r
\r
\r
\r
\r
You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.\r
\r
\r
\r
Your Rights\r
\r
\r
\r
We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.\r
\r
\r
\r
\r
Whenever made possible, you can update your Personal Data directly within your account settings section. If you are unable to change your Personal Data, please contact us to make the required changes.\r
\r
\r
\r
\r
If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us at hello@dogs.red with your specific request.\r
\r
\r
\r
\r
In certain circumstances, you have the right:\r
\r
\r
\r
\r
To access and receive a copy of the Personal Data we hold about you\r
\r
To rectify any Personal Data held about you that is inaccurate\r
\r
To request the deletion of Personal Data held about you\r
\r
\r
\r
\r
You have the right to data portability for the information you provide to us . You can request to obtain a copy of your Personal Data in a commonly used electronic format so that you can manage and move it.\r
\r
\r
\r
\r
Please note that we may ask you to verify your identity before responding to such requests.\r
\r
\r
\r
Service Providers\r
\r
\r
\r
We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.\r
\r
\r
\r
\r
These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.\r
\r
\r
\r
Analytics\r
\r
\r
\r
We may use third-party Service Providers to monitor and analyze the use of our Service.\r
\r
\r
\r
Google Analytics\r
\r
\r
\r
\r
Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.\r
\r
\r
\r
\r
For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: http://www.google.com/intl/en/policies/privacy/\r
\r
\r
\r
Payments\r
\r
\r
\r
We may provide paid products and/or services within the Service. In that case, we use third-party services for payment processing (e.g. payment processors).\r
\r
\r
\r
\r
We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.\r
\r
\r
\r
\r
The payment processors we work with are:\r
\r
\r
\r
\r
PayPal or Braintree\r
\r
\r
\r
\r
Their Privacy Policy can be viewed at https://www.paypal.com/webapps/mpp/ua/privacy-full\r
\r
\r
\r
\r
Stripe\r
\r
\r
\r
\r
Their Privacy Policy can be viewed at https://stripe.com/us/privacy\r
\r
\r
\r
Links to Other Websites\r
\r
\r
\r
Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's website. We strongly advise you to review the Privacy Policy of every site you visit.\r
\r
\r
\r
\r
We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party websites or services.\r
\r
\r
\r
Children's Privacy\r
\r
\r
\r
Our Service does not address anyone under the age of 18 ("Children").\r
\r
\r
\r
\r
We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us at hello@dogs.red. If we become aware that we have collected Personal Data from children without verification of parental consent, we will take steps to remove that information from our servers.\r
\r
\r
\r
Changes to This Privacy Policy\r
\r
\r
\r
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.\r
\r
\r
\r
\r
We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.\r
\r
\r
\r
\r
You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.\r
\r
\r
\r
Contact Us\r
\r
\r
\r
If you have any questions about this Privacy Policy, please contact us:\r
\r
\r
\r
\r
By email: hello@dogs.red\r
\r
\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\r
\r
Now I didn't get this beat over on that website, I got it off a youtube ripper website whom's terms of service is this:\r
\r
By choosing to download, you acknowledge that the audio or video content you are accessing is for personal and non-commercial use only. You agree not to distribute, copy, modify or otherwise use the downloaded content for any commercial purpose, including but not limited to resale, public performance or broadcast. Any use of the content beyond the scope of these terms may result in a violation of applicable copyright law and the Terms of Service. We assume no liability for any unauthorized or improper use of the content, and the user assumes full responsibility for complying with all relevant laws and contractual obligations.\r
\r
There ain't nothing commercial about my music yet. so we're just holding it hostage here. send us an email if you don't like that and i'll take it down.\r
`,Ve=A(`<div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 animate-pulse svelte-1o4jdf5"><div class="bg-black/75 border border-red-500/30 px-3 py-1.5 rounded text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase shadow-[0_0_15px_rgba(239,68,68,0.25)] select-none svelte-1o4jdf5">NO SIGNAL</div></div>`),He=A(`<div class="visualizer-container cursor-pointer svelte-1o4jdf5"><canvas class="visualizer-canvas svelte-1o4jdf5"></canvas> <!> <div class="visualizer-hover-overlay svelte-1o4jdf5"><!></div></div>`),Ue=A(`<div class="visualizer-container bg-[#050508]/40 border border-white/5 flex items-center justify-center svelte-1o4jdf5"><!></div>`),We=A(`<div class="vinyl-record-clicker cursor-pointer w-full h-full svelte-1o4jdf5" role="button" tabindex="0" aria-label="Open tracklist"><div><div class="groove g1 svelte-1o4jdf5"></div> <div class="groove g2 svelte-1o4jdf5"></div> <div class="groove g3 svelte-1o4jdf5"></div> <div class="groove g4 svelte-1o4jdf5"></div> <div class="record-label svelte-1o4jdf5"><img loading="lazy"/></div> <div class="spindle svelte-1o4jdf5"></div></div> <div></div></div>`),Ge=A(`<div class="cassette-container-clicker cursor-pointer w-full h-full flex items-center justify-center p-4 relative svelte-1o4jdf5" role="button" tabindex="0" aria-label="Open tracklist"><div class="cassette-tape svelte-1o4jdf5"><div class="cassette-label bg-gradient-to-r from-purple-800 to-pink-700 svelte-1o4jdf5"><span class="cassette-track-title svelte-1o4jdf5"> </span> <span class="cassette-brand svelte-1o4jdf5">WEAREDOGS AUDIO</span></div> <div class="cassette-window bg-zinc-950/80 svelte-1o4jdf5"><div></div> <div></div> <div></div> <div></div></div></div></div>`),Ke=A(`<div class="floppy-container-clicker cursor-pointer w-full h-full flex items-center justify-center p-4 relative svelte-1o4jdf5" role="button" tabindex="0" aria-label="Open tracklist"><div class="floppy-disk svelte-1o4jdf5"><div class="floppy-corner svelte-1o4jdf5"></div> <div class="floppy-write-protect svelte-1o4jdf5"></div> <div class="floppy-label bg-slate-100 text-slate-900 svelte-1o4jdf5"><div class="floppy-label-stripe bg-red-600 svelte-1o4jdf5"></div> <div class="floppy-label-stripe-blue bg-blue-600 svelte-1o4jdf5"></div> <div class="floppy-label-content svelte-1o4jdf5"><div class="floppy-song truncate font-mono svelte-1o4jdf5"> </div> <div class="floppy-artist truncate font-mono svelte-1o4jdf5"> </div></div></div> <div class="floppy-shutter-door bg-zinc-700 svelte-1o4jdf5"><div></div> <div class="floppy-shutter-opening bg-zinc-950 svelte-1o4jdf5"><div></div></div></div> <div></div></div></div>`),qe=A(`<div></div>`),Je=A(`<div class="musicbox-container-clicker cursor-pointer w-full h-full flex items-center justify-center p-4 relative svelte-1o4jdf5" role="button" tabindex="0" aria-label="Open tracklist"><div class="music-box svelte-1o4jdf5"><div></div> <div class="music-box-interior border border-amber-900/40 svelte-1o4jdf5"><div class="music-box-gears svelte-1o4jdf5"><div></div> <div></div></div> <div class="music-box-drum-wrap svelte-1o4jdf5"><div><div class="music-box-pins svelte-1o4jdf5"><div class="pin pin-1 svelte-1o4jdf5"></div> <div class="pin pin-2 svelte-1o4jdf5"></div> <div class="pin pin-3 svelte-1o4jdf5"></div> <div class="pin pin-4 svelte-1o4jdf5"></div> <div class="pin pin-5 svelte-1o4jdf5"></div> <div class="pin pin-6 svelte-1o4jdf5"></div></div></div></div> <div class="music-box-comb svelte-1o4jdf5"></div></div></div></div>`),Ye=A(`<span></span>`),Xe=A(`<div class="spin-ring svelte-1o4jdf5"></div>`),Ze=A(`<div class="volume-popover svelte-1o4jdf5"><button class="ctrl ctrl-xs mr-2 border border-white/10 rounded-full p-1 hover:bg-white/10 svelte-1o4jdf5" aria-label="Mute"><!></button> <input type="range" class="vol-slider-pop svelte-1o4jdf5" min="0" max="1" step="0.01" aria-label="Volume"/> <span class="text-[10px] font-bold text-white/60 min-w-[28px] text-right font-mono select-none svelte-1o4jdf5"> </span></div>`),Qe=A(`<div class="eq svelte-1o4jdf5"><div class="eq-b svelte-1o4jdf5"></div> <div class="eq-b svelte-1o4jdf5"></div> <div class="eq-b svelte-1o4jdf5"></div></div>`),$e=A(`<span class="svelte-1o4jdf5"></span>`),et=A(`<span class="text-amber-400 flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase bg-amber-500/10 px-1.5 py-0.5 rounded flex-shrink-0 svelte-1o4jdf5" title="Failed to fetch music source from remote database"><!> Error Fetching</span>`),tt=A(`<button class="cursor-pointer svelte-1o4jdf5" style="background: none; border: none; padding: 0; color: inherit; font: inherit;">i</button>`),nt=A(`<a target="_blank" class="svelte-1o4jdf5">i</a>`),rt=A(`<span class="inst-chip-link svelte-1o4jdf5"><!></span>`),it=A(`<div><div class="tr-num svelte-1o4jdf5"><!></div> <img loading="lazy" class="tr-art svelte-1o4jdf5"/> <div class="tr-info svelte-1o4jdf5"><div class="flex items-center gap-1.5 min-w-0 svelte-1o4jdf5"><span> </span> <!></div> <span class="tr-meta svelte-1o4jdf5"> </span></div> <div class="flex items-center gap-2 flex-shrink-0 svelte-1o4jdf5"><!>  <button class="tr-share-btn svelte-1o4jdf5" title="Copy track link" aria-label="Share track"><!></button></div></div>`),at=A(`<div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 animate-pulse svelte-1o4jdf5"><div class="bg-black/75 border border-red-500/30 px-4 py-2 rounded text-[12px] font-mono tracking-widest text-red-500 font-bold uppercase shadow-[0_0_20px_rgba(239,68,68,0.3)] select-none svelte-1o4jdf5">NO SIGNAL</div></div>`),ot=A(`<button> </button>`),st=A(`<div class="visualizer-container fullscreen cursor-pointer svelte-1o4jdf5"><canvas class="visualizer-canvas svelte-1o4jdf5"></canvas> <!> <div class="visualizer-overlay svelte-1o4jdf5"><div class="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-lg p-1 border border-white/10 svelte-1o4jdf5"></div></div></div>`),ct=A(`<div class="arigato-modal-backdrop svelte-1o4jdf5"><div class="arigato-modal-content svelte-1o4jdf5"><header class="arigato-modal-header svelte-1o4jdf5"><h2 class="svelte-1o4jdf5">ARIGATO INFO</h2> <button class="arigato-close-btn svelte-1o4jdf5"><!></button></header> <div class="arigato-modal-body scroll-y svelte-1o4jdf5"><div class="merch-link-container svelte-1o4jdf5"><a href="https://nxnjaa.beatstars.com/" target="_blank" rel="noopener noreferrer" class="merch-link-btn svelte-1o4jdf5"><!> NXNJA MERCH & MUSIC</a></div> <p class="intro-text svelte-1o4jdf5"></p> <div class="tos-box svelte-1o4jdf5"><div class="tos-microtext svelte-1o4jdf5"></div></div> <p class="outro-text svelte-1o4jdf5"></p></div></div></div>`),lt=A(`<div class="mp-backdrop svelte-1o4jdf5"><div><header class="panel-header svelte-1o4jdf5"><div class="brand svelte-1o4jdf5"><button class="logo-btn svelte-1o4jdf5" aria-label="Open DOGS Info"><!></button> <h1 class="svelte-1o4jdf5"></h1></div> <button class="close-btn svelte-1o4jdf5" aria-label="Close panel"><!></button></header> <div class="mp-body svelte-1o4jdf5"><div class="songs-layout svelte-1o4jdf5"><div><div><div class="vinyl-wrapper relative overflow-hidden svelte-1o4jdf5"><!></div> <div class="track-info mt-2 svelte-1o4jdf5"><div class="flex items-center justify-center mb-1.5 svelte-1o4jdf5"><button class="player-share-btn svelte-1o4jdf5" title="Copy track link" aria-label="Share track"><!></button></div> <div><h2> </h2></div> <div><p> </p></div> <div><p> </p></div></div></div> <div class="player-controls-block svelte-1o4jdf5"><div class="progress-row svelte-1o4jdf5"><span class="ptime svelte-1o4jdf5"> </span> <div class="progress-wrap waveform-slider-wrap relative h-9 flex items-end svelte-1o4jdf5"><div class="waveform-bars flex items-end justify-between absolute inset-0 pointer-events-none px-1 h-full svelte-1o4jdf5"></div> <input type="range" class="seek-input absolute inset-0 opacity-0 cursor-pointer w-full h-full svelte-1o4jdf5" min="0" step="0.1" aria-label="Seek"/></div> <span class="ptime svelte-1o4jdf5"> </span></div> <div class="controls-row svelte-1o4jdf5"><button aria-label="Shuffle"><!></button> <button class="ctrl ctrl-md svelte-1o4jdf5" aria-label="Previous"><!></button> <button><!></button> <button class="ctrl ctrl-md svelte-1o4jdf5" aria-label="Next"><!></button> <button aria-label="Repeat"><!></button></div> <div class="w-full flex flex-col items-center gap-1.5 mt-2 px-1 svelte-1o4jdf5"><div><span><!> <span class="svelte-1o4jdf5">VOCAL</span></span> <div class="dj-fader-slot relative svelte-1o4jdf5"><div></div></div> <span><!> <span class="svelte-1o4jdf5">INST</span></span></div></div> <div class="relative flex justify-center items-center gap-3 mt-2 w-full svelte-1o4jdf5"><!> <div class="flex items-center gap-1.5 svelte-1o4jdf5"><button aria-label="Toggle Visualizer"><!></button> <button> </button></div> <div class="relative svelte-1o4jdf5"><button class="ctrl ctrl-xs vol-toggle-btn svelte-1o4jdf5" aria-label="Toggle volume slider"><!></button></div></div></div></div> <div><div class="mobile-close-bar hidden py-2 px-4 border-b border-white/5 flex items-center justify-between svelte-1o4jdf5"><span class="text-xs font-bold text-white/50 svelte-1o4jdf5">Track Library</span> <button class="px-3 py-1 bg-white/5 text-white/75 rounded-lg text-xs font-bold svelte-1o4jdf5">Back to player</button></div> <div class="tl-header flex justify-between items-center gap-3 svelte-1o4jdf5"><div class="flex items-center gap-2 svelte-1o4jdf5"><!><span class="svelte-1o4jdf5">TRACKS</span> <span class="tl-count svelte-1o4jdf5"> </span></div> <div class="flex items-center gap-1.5 ml-auto svelte-1o4jdf5"><span class="text-[9px] text-white/30 font-bold font-sans svelte-1o4jdf5">SORT BY:</span> <select class="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-bold text-white/60 outline-none cursor-pointer hover:border-white/20 transition-all font-sans svelte-1o4jdf5"><option class="svelte-1o4jdf5">DEFAULT</option><option class="svelte-1o4jdf5">ARTIST</option><option class="svelte-1o4jdf5">ALBUM</option><option class="svelte-1o4jdf5">YEAR</option><option class="svelte-1o4jdf5">FILENAME</option><option class="svelte-1o4jdf5">GENRE</option><option class="svelte-1o4jdf5">SEASON</option></select></div></div> <div class="tracklist scroll-y svelte-1o4jdf5"></div></div></div></div> <footer class="mp-footer svelte-1o4jdf5"><div class="mp-status svelte-1o4jdf5"><span class="mp-dot svelte-1o4jdf5"></span><span class="svelte-1o4jdf5">🐕</span></div> <span class="svelte-1o4jdf5">MUSIC</span></footer></div> <!> <canvas class="fader-fx-canvas pointer-events-none svelte-1o4jdf5"></canvas> <!></div>`);function ut(d,Oe){f(Oe,!0);let A=`/img/error_cover.png`;function ut(e){e.target.src.endsWith(A)||(e.target.src=A)}let dt=l(Oe,`isClosing`,3,!1),ft=l(Oe,`initialTrackId`,3,null),I=b(`default`),L=b(!1),pt=b(!1),mt=b(!1),ht=b(null),R=h(()=>F.isPlaying&&!dt()),z=b(!1),B=b(0),gt=b(!1),_t=b(null),V=null,H=!1,vt=b(!1),yt=b(!1),bt=h(()=>{let e=Be.split(/`{5,}/);return{intro:e[0]||``,tos:e[1]||``,outro:e[2]||``}});function xt(e){if(!e)return``;let t=e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`);return t=t.replace(/(https?:\/\/[^\s]+)/g,`<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`),t=t.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g,`<a href="mailto:$1">$1</a>`),t.replace(/\n/g,`<br>`)}let St=h(()=>{let e=j(G);if(!e)return Array(60).fill(10);if(F.waveformPeaks[e.id])return F.waveformPeaks[e.id];let t=e.id,n=[],r=0;for(let e=0;e<t.length;e++)r=(r<<5)-r+t.charCodeAt(e),r|=0;let i=Math.abs(r)%1e3;for(let e=0;e<60;e++){let t=e/59,r=Math.sin(i+t*Math.PI*4),a=Math.cos(i*1.5+t*Math.PI*10)*.4,o=Math.sin(i*2.3+t*Math.PI*22)*.15,s=Math.abs(r+a+o)/1.55,c=Math.sin(t*Math.PI),l=(s*70+15)*c;n.push(Math.max(10,Math.round(l)))}return n});D(()=>{window.innerWidth<=640&&j(z)&&j(B)===0&&j(L)&&y(L,!1)}),D(()=>{F.isPlaying&&y(vt,!0)});let Ct=h(()=>!F.isPlaying&&!j(vt)?ze.fragmentShader:Re[j(B)].fragmentShader);D(()=>{let e=F.analyser;return j(z)&&j(_t)&&!dt()&&(V=new Le(j(_t),e),V.init(j(Ct)),V.start()),()=>{V&&(V.destroy(),V=null)}}),D(()=>{let e=j(Ct);V&&j(z)&&(V.setPreset(e),V.start())}),D(()=>{j(L)?!history.state?.tracklistOpen&&!H&&(history.pushState({tracklistOpen:!0},``),H=!0):H&&(history.back(),H=!1)}),t(()=>{H&&(history.back(),H=!1)});function wt(e){!e.state?.tracklistOpen&&j(L)&&(y(L,!1),H=!1)}function Tt(e){j(mt)&&j(ht)&&!j(ht).contains(e.target)&&!e.target.closest(`.vol-toggle-btn`)&&y(mt,!1)}let U=h(()=>Ne.unlocked?Pe:Pe.filter(e=>e.public!==!1));function Et(e){return e.src?e.src.split(`/`).pop():``}function Dt(e){if(!e.dateAdded)return`Summer`;let t=new Date(e.dateAdded).getMonth();return t===11||t===0||t===1?`Winter`:t>=2&&t<=4?`Spring`:t>=5&&t<=7?`Summer`:`Fall`}let W=h(()=>{let e=[...j(U)];return j(I)===`artist`?e.sort((e,t)=>e.artist.localeCompare(t.artist)):j(I)===`album`?e.sort((e,t)=>e.album.localeCompare(t.album)):j(I)===`year`?e.sort((e,t)=>(e.year||0)-(t.year||0)):j(I)===`filename`?e.sort((e,t)=>Et(e).localeCompare(Et(t))):j(I)===`genre`?e.sort((e,t)=>(e.genre||``).localeCompare(t.genre||``)):j(I)===`season`&&e.sort((e,t)=>Dt(e).localeCompare(Dt(t))),e}),G=h(()=>j(U)[F.currentTrackIndex]??j(U)[0]);D(()=>{let e=j(U);if(F.library===e||F.library.length===0)return;let t=F.library[F.currentTrackIndex]?.id;F.init(e);let n=e.findIndex(e=>e.id===t);n===-1?(F.pause(),F.loadTrack(0,!1)):F.currentTrackIndex=n});let Ot=b(0),kt=b(0),At=b(0),jt=b(0),Mt=b(0),Nt=b(0),Pt=b(null),Ft=null;function It(e,t){e.stopPropagation();let n=`${window.location.origin}/music/${t.id}`;navigator.clipboard.writeText(n).then(()=>{y(Pt,t.id,!0),Ft&&clearTimeout(Ft),Ft=setTimeout(()=>{y(Pt,null)},2e3)}).catch(e=>{console.error(`Failed to copy share link:`,e)})}t(()=>{Ft&&clearTimeout(Ft)}),we(()=>{if(Ne.revalidate(),F.init(j(U)),ft()){let e=j(U).findIndex(e=>e.id===ft());e!==-1&&F.loadTrack(e,!0)}else if(!F.hasPickedRandomTrack){F.hasPickedRandomTrack=!0;let e=Math.floor(Math.random()*j(U).length);F.loadTrack(e,!1)}});let K=b(null);function Lt(){let e=document.querySelector(`.track-row[data-track-id="${j(K)}"]`);e&&e.scrollIntoView({block:`nearest`,behavior:`smooth`})}function Rt(e){y(K,e.id,!0);let t=j(U).findIndex(t=>t.id===e.id);F.currentTrackIndex===t&&!F.fetchErrors[e.id]?F.togglePlay():F.loadTrack(t,!0)}function zt(){window.innerWidth<=640?y(L,!0):y(z,!j(z))}function Bt(){let e=!F.isInstrumental;F.setCrossfade(e)||(re(J),j(Ut)||(y(Ut,!0),setTimeout(()=>{y(Ut,!1)},300)),j(J)===5?($t(),y(Wt,!0),setTimeout(()=>{y(Wt,!1)},150)):j(J)===10?$t(35):j(J)>5&&j(J)<10?$t(8):j(J)>10&&Math.random()<.4&&$t(3))}function Vt(e){return!e||isNaN(e)?`0:00`:`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,`0`)}`}function Ht(e){let t=document.activeElement;if(!(t&&(t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.isContentEditable))){if(e.code===`Space`||e.key===` `)e.preventDefault(),F.togglePlay();else if(e.key===`ArrowDown`){if(j(W).length>0){e.preventDefault();let t=j(W).findIndex(e=>e.id===j(K));if(t===-1){let e=j(U)[F.currentTrackIndex];t=j(W).findIndex(t=>t.id===e?.id)}let n=(t+1)%j(W).length;y(K,j(W)[n].id,!0),Lt()}}else if(e.key===`ArrowUp`){if(j(W).length>0){e.preventDefault();let t=j(W).findIndex(e=>e.id===j(K));if(t===-1){let e=j(U)[F.currentTrackIndex];t=j(W).findIndex(t=>t.id===e?.id)}let n=(t-1+j(W).length)%j(W).length;y(K,j(W)[n].id,!0),Lt()}}else if(e.key===`Enter`&&j(K)){e.preventDefault();let t=j(W).find(e=>e.id===j(K));t&&Rt(t)}}}let q=b(null),J=b(0),Ut=b(!1),Wt=b(!1),Y,X,Z,Q=[],$=[],Gt,Kt=b(!1);D(()=>(j(q)&&Yt(),()=>{Gt&&cancelAnimationFrame(Gt),window.removeEventListener(`resize`,Xt),window.visualViewport?.removeEventListener(`resize`,Xt),Z&&(Z.dispose(),Z=null),Y=null,X=null,Q=[],$=[]})),D(()=>{if(F.currentTrackIndex,dt(),y(J,0),y(Kt,!1),Y){for(let e of Q)Y.remove(e.mesh);for(let e of $)Y.remove(e.mesh)}Q=[],$=[]});function qt(){if(!j(q))return{width:window.innerWidth,height:window.innerHeight};let e=j(q).getBoundingClientRect();return{width:e.width||window.innerWidth,height:e.height||window.innerHeight}}function Jt(){let{width:e,height:t}=qt(),n=document.querySelector(`.dj-fader-knob`);if(!n)return{x:e/2,y:t/2};let r=j(q)?j(q).getBoundingClientRect():{left:0,top:0},i=n.getBoundingClientRect();return{x:i.left+i.width/2-r.left,y:t-(i.top+i.height/2-r.top)}}function Yt(){if(!j(q))return;let{width:e,height:t}=qt();j(q).width=e,j(q).height=t,Y=new ae,X=new u(0,e,t,0,-1,1),Z=new ve({canvas:j(q),alpha:!0,antialias:!0}),Z.setSize(e,t,!1),Z.setPixelRatio(Math.min(window.devicePixelRatio,2)),window.addEventListener(`resize`,Xt),window.visualViewport?.addEventListener(`resize`,Xt),Zt()}function Xt(){if(!j(q)||!Z||!X)return;let{width:e,height:t}=qt();j(q).width=e,j(q).height=t,Z.setSize(e,t,!1),X.right=e,X.top=t,X.updateProjectionMatrix()}function Zt(){if(Gt=requestAnimationFrame(Zt),!(!Y||!X||!Z||!j(q))){if(j(J)>=10&&(y(Kt,!0),Math.random()<.22)){let e=Jt();Qt(e.x,e.y)}for(let e=Q.length-1;e>=0;e--){let t=Q[e];t.x+=t.vx,t.y+=t.vy,t.vy+=t.ay,t.life-=t.decay,t.mesh.position.set(t.x,t.y,0),t.mesh.material.opacity=t.life,t.life<=0&&(Y.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose(),Q.splice(e,1))}for(let e=$.length-1;e>=0;e--){let t=$[e];t.x+=t.vx,t.y+=t.vy,t.life-=t.decay;let n=t.startScale+(1-t.life)*88;t.mesh.scale.set(n,n,1),t.mesh.position.set(t.x,t.y,0),t.mesh.material.opacity=t.life*.16,t.life<=0&&(Y.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose(),$.splice(e,1))}Z.render(Y,X)}}function Qt(e,t){if(!Y)return;let n=new i(5,8),r=.85+Math.random()*.12,a=new Ee(n,new te({color:new je(r,r,r*1.01),transparent:!0,opacity:.06,blending:1}));a.position.set(e,t,0),Y.add(a),$.push({mesh:a,x:e,y:t,vx:(Math.random()-.5)*.55+Math.sin(Date.now()*.001)*.22,vy:Math.random()*.7+1.25,startScale:1,life:1,decay:6e-4+Math.random()*4e-4})}function $t(e=25){if(!Y||!j(q))return;let t=Jt(),n=t.x,r=t.y;for(let t=0;t<e;t++){let e=new Ee(new i(1.3,4),new te({color:new je(Math.random()<.4?16711765:16755200),transparent:!0,opacity:1,blending:2}));e.position.set(n,r,0),Y.add(e);let t=Math.random()*Math.PI*2,a=Math.random()*4+2;Q.push({mesh:e,x:n,y:r,vx:Math.cos(t)*a,vy:Math.sin(t)*a,ay:-.15,life:1,decay:.02+Math.random()*.02})}}var en=lt();O(`keydown`,ce,Ht),O(`popstate`,ce,wt),O(`click`,ce,Tt);var tn=s(en);let nn;var rn=s(tn),an=s(rn),on=s(an);Fe(s(on),{size:`panel`}),E(on);var sn=x(on,2);sn.textContent=`MUSIC`,E(an);var cn=x(an,2);se(s(cn),{size:20}),E(cn),E(rn);var ln=x(rn,2),un=s(ln),dn=s(un);let fn;var pn=s(dn);let mn;var hn=s(pn),gn=s(hn),_n=e=>{var t=He(),n=s(t);S(n,e=>y(_t,e),()=>j(_t));var r=x(n,2),i=e=>{k(e,Ve())};w(r,e=>{!F.isPlaying&&!j(vt)&&e(i)});var a=x(r,2);be(s(a),{size:16,class:`text-white/70`}),E(a),E(t),N(`click`,t,()=>{y(gt,!0)}),k(e,t)},vn=e=>{var t=Ue();be(s(t),{size:16,class:`text-white/20`}),E(t),k(e,t)},yn=e=>{var t=ye(),n=o(t),r=e=>{var t=We(),n=s(t);let r;var i=x(s(n),8),a=s(i);let o;E(i),T(2),E(n);var c=x(n,2);let l;E(t),P(()=>{r=m(n,1,`vinyl-record svelte-1o4jdf5`,null,r,{spinning:j(R)}),C(a,`src`,F.fetchErrors[j(G).id]||!j(G).cover?A:j(G).cover),C(a,`alt`,j(G).album),o=m(a,1,`record-art svelte-1o4jdf5`,null,o,{loaded:j(pt)}),l=m(c,1,`tonearm svelte-1o4jdf5`,null,l,{playing:j(R)})}),N(`click`,t,zt),O(`load`,a,()=>y(pt,!0)),O(`error`,a,ut),Te(a),k(e,t)},i=e=>{let t=h(()=>F.duration>0?(1-F.currentTime/F.duration)*.45+.25:.48),n=h(()=>F.duration>0?F.currentTime/F.duration*.45+.25:.48);var r=Ge(),i=s(r),a=s(i),o=s(a),c=s(o,!0);E(o),T(2),E(a);var l=x(a,2),u=s(l);let d;var f=x(u,2);let p;var g=x(f,2);let _;var v=x(g,2);let ee;E(l),E(i),E(r),P(()=>{M(c,j(G).title),d=m(u,1,`spindle-left bg-zinc-900 svelte-1o4jdf5`,null,d,{spinning:j(R)}),p=m(f,1,`tape-roll-left bg-amber-950/70 svelte-1o4jdf5`,null,p,{spinning:j(R)}),de(f,`width: ${j(t)*46}px; height: ${j(t)*46}px;`),_=m(g,1,`spindle-right bg-zinc-900 svelte-1o4jdf5`,null,_,{spinning:j(R)}),ee=m(v,1,`tape-roll-right bg-amber-950/70 svelte-1o4jdf5`,null,ee,{spinning:j(R)}),de(v,`width: ${j(n)*46}px; height: ${j(n)*46}px;`)}),N(`click`,r,zt),k(e,r)},a=e=>{var t=Ke(),n=s(t),r=x(s(n),4),i=x(s(r),4),a=s(i),o=s(a,!0);E(a);var c=x(a,2),l=s(c,!0);E(c),E(i),E(r);var u=x(r,2),d=s(u);let f;var p=x(d,2),h=s(p);let g;E(p),E(u);var _=x(u,2);let v;E(n),E(t),P(()=>{M(o,j(G).title),M(l,j(G).artist||`WEAREDOGS`),f=m(d,1,`floppy-shutter-slider bg-zinc-400 svelte-1o4jdf5`,null,f,{open:j(R)}),g=m(h,1,`floppy-magnetic-disc bg-zinc-900 svelte-1o4jdf5`,null,g,{spinning:j(R)}),v=m(_,1,`floppy-drive-led svelte-1o4jdf5`,null,v,{active:j(R)})}),N(`click`,t,zt),k(e,t)},c=e=>{var t=Je(),n=s(t),r=s(n);let i;var a=x(r,2),o=s(a),c=s(o);let l;var u=x(c,2);let d;E(o);var f=x(o,2),p=s(f);let h;E(f);var g=x(f,2);ge(g,20,()=>Array(10),he,(e,t,n)=>{var r=qe();let i;P(e=>i=m(r,1,`comb-tooth svelte-1o4jdf5`,null,i,e),[()=>({vibrating:j(R)&&n%3==Math.floor(F.currentTime*4)%3})]),k(e,r)}),E(g),E(a),E(n),E(t),P(()=>{i=m(r,1,`music-box-key svelte-1o4jdf5`,null,i,{spinning:j(R)}),l=m(c,1,`music-box-gear gear-1 svelte-1o4jdf5`,null,l,{spinning:j(R)}),d=m(u,1,`music-box-gear gear-2 svelte-1o4jdf5`,null,d,{spinning:j(R)}),h=m(p,1,`music-box-drum bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 svelte-1o4jdf5`,null,h,{spinning:j(R)})}),N(`click`,t,zt),k(e,t)};w(n,e=>{Ie.musicDeckModel===`vinyl`?e(r):Ie.musicDeckModel===`cassette`?e(i,1):Ie.musicDeckModel===`floppy`?e(a,2):Ie.musicDeckModel===`musicbox`&&e(c,3)}),k(e,t)};w(gn,e=>{j(z)&&!j(gt)?e(_n):j(z)&&j(gt)?e(vn,1):e(yn,-1)}),E(hn);var bn=x(hn,2),xn=s(bn),Sn=s(xn),Cn=s(Sn),wn=e=>{xe(e,{size:12,class:`text-[#22c55e]`})},Tn=e=>{n(e,{size:12})};w(Cn,e=>{j(Pt)===j(G).id?e(wn):e(Tn,-1)}),E(Sn),E(xn);var En=x(xn,2);let Dn;var On=s(En);let kn;var An=s(On,!0);E(On),E(En);var jn=x(En,2);let Mn;var Nn=s(jn);let Pn;var Fn=s(Nn,!0);E(Nn),E(jn);var In=x(jn,2);let Ln;var Rn=s(In);let zn;var Bn=s(Rn,!0);E(Rn),E(In),E(bn),E(pn);var Vn=x(pn,2),Hn=s(Vn),Un=s(Hn),Wn=s(Un,!0);E(Un);var Gn=x(Un,2),Kn=s(Gn);ge(Kn,21,()=>j(St),he,(e,t,n)=>{let r=h(()=>F.duration>0?F.currentTime/F.duration:0),i=h(()=>n/60);var a=Ye();let o;P(()=>{o=m(a,1,`waveform-bar transition-colors duration-100 rounded-full svelte-1o4jdf5`,null,o,{active:j(i)<=j(r)}),de(a,`height: ${j(t)??``}%; width: 3px;`)}),k(e,a)}),E(Kn);var qn=x(Kn,2);ne(qn),E(Gn);var Jn=x(Gn,2),Yn=s(Jn,!0);E(Jn),E(Hn);var Xn=x(Hn,2),Zn=s(Xn);let Qn;le(s(Zn),{size:15}),E(Zn);var $n=x(Zn,2);Me(s($n),{size:19}),E($n);var er=x($n,2);let tr;var nr=s(er),rr=e=>{Ce(e,{size:22})},ir=e=>{k(e,Xe())},ar=e=>{_e(e,{size:22,fill:`currentColor`})},or=e=>{ke(e,{size:22,fill:`currentColor`})};w(nr,e=>{F.fetchErrors[j(G).id]?e(rr):F.isLoading?e(ir,1):F.isPlaying?e(ar,2):e(or,-1)}),E(er);var sr=x(er,2);a(s(sr),{size:19}),E(sr);var cr=x(sr,2);let lr;var ur=s(cr),dr=e=>{fe(e,{size:15})},fr=e=>{g(e,{size:15})},pr=e=>{r(e,{size:15})};w(ur,e=>{F.repeatMode===2?e(dr):F.repeatMode===3?e(fr,1):e(pr,-1)}),E(cr),E(Xn);var mr=x(Xn,2),hr=s(mr);let gr;var _r=s(hr);let vr;Ae(s(_r),{size:12}),T(2),E(_r);var yr=x(_r,2),br=s(yr);let xr;E(yr);var Sr=x(yr,2);let Cr;c(s(Sr),{size:12}),T(2),E(Sr),E(hr),E(mr);var wr=x(mr,2),Tr=s(wr),Er=t=>{var n=Ze(),r=s(n),i=s(r),a=e=>{ie(e,{size:12,class:`text-red-400`})},o=t=>{e(t,{size:12})};w(i,e=>{F.isMuted||F.volume===0?e(a):e(o,-1)}),E(r);var c=x(r,2);ne(c);var l=x(c,2),u=s(l);E(l),E(n),S(n,e=>y(ht,e),()=>j(ht)),P(e=>{ee(c,F.volume),M(u,`${e??``}%`)},[()=>Math.round(F.volume*100)]),N(`click`,r,()=>F.toggleMute()),N(`input`,c,e=>F.setVolume(parseFloat(e.target.value))),k(t,n)};w(Tr,e=>{j(mt)&&e(Er)});var Dr=x(Tr,2),Or=s(Dr);let kr;me(s(Or),{size:13}),E(Or);var Ar=x(Or,2),jr=s(Ar,!0);E(Ar),E(Dr);var Mr=x(Dr,2),Nr=s(Mr),Pr=s(Nr),Fr=e=>{ie(e,{size:13,class:`text-red-400`})},Ir=t=>{e(t,{size:13})};w(Pr,e=>{F.isMuted||F.volume===0?e(Fr):e(Ir,-1)}),E(Nr),E(Mr),E(wr),E(Vn),E(dn);var Lr=x(dn,2);let Rr;var zr=s(Lr),Br=x(s(zr),2);E(zr);var Vr=x(zr,2),Hr=s(Vr),Ur=s(Hr);Se(Ur,{size:13});var Wr=x(Ur,3),Gr=s(Wr,!0);E(Wr),E(Hr);var Kr=x(Hr,2),qr=x(s(Kr),2),Jr=s(qr);Jr.value=Jr.__value=`default`;var Yr=x(Jr);Yr.value=Yr.__value=`artist`;var Xr=x(Yr);Xr.value=Xr.__value=`album`;var Zr=x(Xr);Zr.value=Zr.__value=`year`;var Qr=x(Zr);Qr.value=Qr.__value=`filename`;var $r=x(Qr);$r.value=$r.__value=`genre`;var ei=x($r);ei.value=ei.__value=`season`,E(qr),E(Kr),E(Vr);var ti=x(Vr,2);ge(ti,21,()=>j(W),he,(e,t,r)=>{var i=it();let a;var o=s(i),c=s(o),l=e=>{k(e,Qe())},u=e=>{var t=$e();t.textContent=r+1,k(e,t)};w(c,e=>{j(G).id===j(t).id&&F.isPlaying?e(l):e(u,-1)}),E(o);var d=x(o,2),f=x(d,2),p=s(f),h=s(p);let g;var _=s(h,!0);E(h);var v=x(h,2),ee=e=>{var t=et();Ce(s(t),{size:10}),T(),E(t),k(e,t)};w(v,e=>{F.fetchErrors[j(t).id]&&e(ee)}),E(p);var te=x(p,2),b=s(te);E(te),E(f);var ne=x(f,2),S=s(ne),re=e=>{var n=rt(),r=s(n),i=e=>{var t=tt();N(`click`,t,e=>{e.stopPropagation(),y(yt,!0)}),k(e,t)},a=e=>{var n=nt();P(()=>C(n,`href`,j(t).attrib)),N(`click`,n,e=>e.stopPropagation()),k(e,n)};w(r,e=>{j(t).id===`arigato`?e(i):e(a,-1)}),E(n),k(e,n)};w(S,e=>{j(t).attrib&&e(re)});var ie=x(S,2),ae=s(ie),oe=e=>{xe(e,{size:12,class:`text-[#22c55e]`})},se=e=>{n(e,{size:12})};w(ae,e=>{j(Pt)===j(t).id?e(oe):e(se,-1)}),E(ie),E(ne),E(i),P(()=>{a=m(i,1,`track-row svelte-1o4jdf5`,null,a,{active:j(G).id===j(t).id,"kb-focused":j(K)===j(t).id,"fetch-error":F.fetchErrors[j(t).id]}),C(i,`data-track-id`,j(t).id),C(d,`src`,F.fetchErrors[j(t).id]||!j(t).cover?A:j(t).cover),C(d,`alt`,j(t).album),g=m(h,1,`tr-title svelte-1o4jdf5`,null,g,{"line-through":F.fetchErrors[j(t).id],"opacity-50":F.fetchErrors[j(t).id]}),M(_,j(t).title),M(b,`${j(t).artist??``} · ${j(t).album??``} (${(j(t).year||``)??``})`)}),N(`click`,i,()=>Rt(j(t))),O(`error`,d,ut),Te(d),N(`click`,ie,e=>It(e,j(t))),k(e,i)}),E(ti),E(Lr),E(un),E(ln),T(2),E(tn);var ni=x(tn,2),ri=e=>{var t=st(),n=s(t);S(n,e=>y(_t,e),()=>j(_t));var r=x(n,2),i=e=>{k(e,at())};w(r,e=>{!F.isPlaying&&!j(vt)&&e(i)});var a=x(r,2),o=s(a);ge(o,21,()=>Re,he,(e,t,n)=>{var r=ot(),i=s(r,!0);E(r),P(()=>{m(r,1,`px-2 py-1 rounded text-[9px] font-bold transition-all uppercase tracking-wider font-mono
                ${j(B)===n?`bg-purple-600 text-white`:`text-white/40 hover:text-white/80`}`,`svelte-1o4jdf5`),M(i,j(t).name)}),N(`click`,r,()=>y(B,n,!0)),k(e,r)}),E(o),E(a),E(t),N(`click`,t,e=>{e.stopPropagation(),y(gt,!1)}),N(`click`,a,e=>e.stopPropagation()),k(e,t)};w(ni,e=>{j(z)&&j(gt)&&e(ri)});var ii=x(ni,2);S(ii,e=>y(q,e),()=>j(q));var ai=x(ii,2),oi=e=>{var t=ct(),n=s(t),r=s(n),i=x(s(r),2);se(s(i),{size:16}),E(i),E(r);var a=x(r,2),o=s(a),c=s(o);p(s(c),{size:14}),T(),E(c),E(o);var l=x(o,2);_(l,()=>xt(j(bt).intro),!0),E(l);var u=x(l,2),d=s(u);_(d,()=>xt(j(bt).tos),!0),E(d),E(u);var f=x(u,2);_(f,()=>xt(j(bt).outro),!0),E(f),E(a),E(n),E(t),N(`click`,t,()=>y(yt,!1)),N(`click`,n,e=>e.stopPropagation()),N(`click`,i,()=>y(yt,!1)),v(3,t,()=>pe,()=>({duration:150})),k(e,t)};w(ai,e=>{j(yt)&&e(oi)}),E(en),P((e,t)=>{nn=m(tn,1,`mp-container svelte-1o4jdf5`,null,nn,{closing:dt(),"theme-inst":F.isInstrumental}),fn=m(dn,1,`player-side svelte-1o4jdf5`,null,fn,{"tracklist-open":j(L)}),mn=m(pn,1,`player-top-block transition-all duration-300 ease-in-out svelte-1o4jdf5`,null,mn,{"opacity-0":j(L),"scale-95":j(L),"pointer-events-none":j(L)}),Dn=m(En,1,`scroll-container svelte-1o4jdf5`,null,Dn,{overflowing:j(kt)>j(Ot)}),de(En,`--scroll-dist: -${j(kt)-j(Ot)}px`),kn=m(On,1,`track-title scroll-text svelte-1o4jdf5`,null,kn,{"animate-scroll":j(kt)>j(Ot)}),M(An,j(G).title),Mn=m(jn,1,`scroll-container svelte-1o4jdf5`,null,Mn,{overflowing:j(jt)>j(At)}),de(jn,`--scroll-dist: -${j(jt)-j(At)}px`),Pn=m(Nn,1,`track-artist scroll-text svelte-1o4jdf5`,null,Pn,{"animate-scroll":j(jt)>j(At)}),M(Fn,j(G).artist),Ln=m(In,1,`scroll-container svelte-1o4jdf5`,null,Ln,{overflowing:j(Nt)>j(Mt)}),de(In,`--scroll-dist: -${j(Nt)-j(Mt)}px`),zn=m(Rn,1,`track-album scroll-text svelte-1o4jdf5`,null,zn,{"animate-scroll":j(Nt)>j(Mt)}),M(Bn,j(G).album),M(Wn,e),C(qn,`max`,F.duration||100),ee(qn,F.currentTime),M(Yn,t),Qn=m(Zn,1,`ctrl ctrl-sm svelte-1o4jdf5`,null,Qn,{"active-ctrl":F.isShuffled}),tr=m(er,1,`ctrl ctrl-play svelte-1o4jdf5`,null,tr,{"ctrl-error":F.fetchErrors[j(G).id]}),C(er,`aria-label`,F.isPlaying?`Pause`:`Play`),lr=m(cr,1,`ctrl ctrl-sm svelte-1o4jdf5`,null,lr,{"active-ctrl":F.repeatMode>0}),C(cr,`title`,F.repeatMode===1?`Repeat: all`:F.repeatMode===2?`Repeat: one`:F.repeatMode===3?`Stop after current track`:`Repeat: off`),gr=m(hr,1,`dj-crossfader svelte-1o4jdf5`,null,gr,{"fader-flash":j(Wt),"fader-fried":j(J)>=10}),vr=m(_r,1,`fader-label left-label flex items-center gap-1 svelte-1o4jdf5`,null,vr,{active:!F.isInstrumental}),xr=m(br,1,`dj-fader-knob svelte-1o4jdf5`,null,xr,{right:F.isInstrumental,"knob-jiggle":j(Ut),fried:j(J)>=10}),Cr=m(Sr,1,`fader-label right-label flex items-center gap-1 svelte-1o4jdf5`,null,Cr,{active:F.isInstrumental}),kr=m(Or,1,`ctrl ctrl-xs svelte-1o4jdf5`,null,kr,{"active-ctrl":j(z)}),m(Ar,1,`w-[90px] h-[20px] flex items-center justify-center rounded text-[9px] font-bold transition-all font-mono uppercase tracking-wider select-none cursor-pointer
                      ${j(z)?`bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/25 active:scale-95`:`bg-transparent border border-white/5 text-white/20 hover:text-white/40 hover:border-white/10`}`,`svelte-1o4jdf5`),C(Ar,`title`,j(z)?`Click to cycle presets`:`Click to enable visualizer`),M(jr,Re[j(B)].name),Rr=m(Lr,1,`tracklist-side svelte-1o4jdf5`,null,Rr,{"show-mobile":j(L)}),M(Gr,j(U).length)},[()=>Vt(F.currentTime),()=>Vt(F.duration)]),N(`click`,en,function(...e){Oe.onClose?.apply(this,e)}),N(`click`,tn,e=>e.stopPropagation()),N(`click`,on,()=>{F.isPlaying||window.dispatchEvent(new CustomEvent(`open-info-panel`))}),N(`click`,cn,function(...e){Oe.onClose?.apply(this,e)}),N(`click`,Sn,e=>It(e,j(G))),De(On,`clientWidth`,e=>y(kt,e)),De(En,`clientWidth`,e=>y(Ot,e)),De(Nn,`clientWidth`,e=>y(jt,e)),De(jn,`clientWidth`,e=>y(At,e)),De(Rn,`clientWidth`,e=>y(Nt,e)),De(In,`clientWidth`,e=>y(Mt,e)),N(`input`,qn,e=>{F.seek(parseFloat(e.target.value))}),N(`change`,qn,e=>{F.isPlaying||F.play(parseFloat(e.target.value))}),N(`click`,Zn,()=>F.setShuffle(!F.isShuffled)),N(`click`,$n,()=>F.prevTrack()),N(`click`,er,()=>F.togglePlay()),N(`click`,sr,()=>F.nextTrack()),N(`click`,cr,()=>{F.repeatMode=(F.repeatMode+1)%4}),N(`click`,hr,Bt),N(`click`,Or,()=>{y(z,!j(z))}),N(`click`,Ar,()=>{j(z)?y(B,(j(B)+1)%Re.length):y(z,!0)}),N(`click`,Nr,()=>{y(mt,!j(mt))}),N(`click`,Br,()=>{y(L,!1)}),oe(qr,()=>j(I),e=>y(I,e)),v(1,un,()=>pe,()=>({duration:120,delay:120})),v(2,un,()=>pe,()=>({duration:120})),k(d,en),ue()}Oe([`click`,`input`,`change`]);export{ut as default};