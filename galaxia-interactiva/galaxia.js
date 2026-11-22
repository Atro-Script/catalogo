(function(){var d=window.DATOS;document.querySelectorAll("[data-t]").forEach(function(e){var v=d[e.getAttribute("data-t")];if(v!==undefined&&v!==null){e.textContent=v;e.style.whiteSpace="pre-line";}});if(d.titulo)document.title=d.titulo;})();

    const mensajes = DATOS.mensajes;

    const textosCortos = DATOS.textosCortos;

    const imagenes = DATOS.imagenes;

    let scene, camera, renderer, controls, raycaster, mouse;
    let particles, heartParticles, teAmoParticles, centralGlow;
    let outerRing, ambientSparkles, pulseRings = [];
    let warpTunnel = null;
    let orbitingObjects = [];
    let shootingStars = [];
    let started = false;
    let introPhase = 'warp'; // 'warp' | 'reveal' | 'done'
    let introStart = 0;

    document.getElementById('enterBtn').addEventListener('click', () => {
      document.getElementById('welcome').classList.add('hide');
      iniciarSonido();
      initThree();
    });

    function initThree() {
      const container = document.getElementById('canvas-container');
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x03010a, 0.004);

      camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1200);
      // Empieza dentro del túnel
      camera.position.set(0, 0, 80);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x03010a, 1);
      container.appendChild(renderer.domElement);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.rotateSpeed = 0.5;
      controls.minDistance = 14;
      controls.maxDistance = 95;
      controls.autoRotate = false;
      controls.autoRotateSpeed = 0.28;
      controls.enablePan = false;
      controls.enabled = false; // bloqueado durante el viaje

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      createWarpTunnel();
      createGalaxyParticles();
      createHeartParticles();
      createCentralGlow();
      createOrbitingObjects();
      createTeAmoParticles();
      createOuterRing();
      createAmbientSparkles();
      createPulseRings();

      // Ocultar el universo hasta que termine el viaje
      if (particles) particles.visible = false;
      if (heartParticles) heartParticles.visible = false;
      if (teAmoParticles) teAmoParticles.visible = false;
      if (centralGlow) centralGlow.visible = false;
      if (outerRing) outerRing.visible = false;
      if (ambientSparkles) ambientSparkles.visible = false;
      pulseRings.forEach(r => r.visible = false);
      orbitingObjects.forEach(o => o.visible = false);

      scene.add(new THREE.AmbientLight(0x1a3c2e, 0.9));

      renderer.domElement.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('resize', onResize);

      introStart = Date.now();
      introPhase = 'warp';
      animate();
      started = true;
    }

    // ========== TÚNEL DE VIAJE (intro) ==========
    function createWarpTunnel() {
      const count = 12000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const speeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 2 + Math.random() * 28;
        const z = (Math.random() - 0.5) * 200;
        positions[i*3]     = Math.cos(angle) * radius;
        positions[i*3 + 1] = Math.sin(angle) * radius;
        positions[i*3 + 2] = z;

        const usePink = Math.random() > 0.35;
        const c = usePink
          ? new THREE.Color().setHSL(0.92 + Math.random()*0.06, 0.9, 0.55 + Math.random()*0.35)
          : new THREE.Color().setHSL(0.0, 0, 0.75 + Math.random()*0.25);
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
        speeds[i] = 0.6 + Math.random() * 1.8;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

      warpTunnel = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.55,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      }));
      scene.add(warpTunnel);
    }

    function createGalaxyParticles() {
      const count = 26000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const palette = [
        new THREE.Color(0x022c22),
        new THREE.Color(0x064e3b),
        new THREE.Color(0x047857),
        new THREE.Color(0x059669),
        new THREE.Color(0x10b981),
        new THREE.Color(0x34d399),
        new THREE.Color(0x6ee7b7),
        new THREE.Color(0xa7f3d0),
        new THREE.Color(0xd1fae5),
        new THREE.Color(0xecfdf5),
        new THREE.Color(0xffffff),
        new THREE.Color(0xfbcfe8), // toque rosa suave
        new THREE.Color(0xf9a8d4)
      ];
      for (let i = 0; i < count; i++) {
        const radius = Math.pow(Math.random(), 0.68) * 95 + 1.5;
        const angle = Math.random() * Math.PI * 2;
        const spiral = radius * 0.14;
        const y = (Math.random() - 0.5) * (26 + radius * 0.22);
        positions[i*3]     = Math.cos(angle + spiral) * radius;
        positions[i*3 + 1] = y;
        positions[i*3 + 2] = Math.sin(angle + spiral) * radius;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.52,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      }));
      scene.add(particles);
    }

    function createHeartParticles() {
      // Corazón central aún más grande y con buena forma
      const count = 9000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scale = 2.45;
      for (let i = 0; i < count; i++) {
        const t = Math.random() * Math.PI * 2;
        const dens = 0.50 + Math.pow(Math.random(), 0.72) * 0.50;
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        x = (x * dens + (Math.random()-0.5)*1.25) * scale;
        y = (y * dens + (Math.random()-0.5)*1.25) * scale + 2.4;
        const z = (Math.random()-0.5) * 2.6 * dens;
        positions[i*3]     = x;
        positions[i*3 + 1] = y;
        positions[i*3 + 2] = z;
        const c = new THREE.Color().setHSL(0.92 + Math.random()*0.05, 0.90, 0.56 + Math.random()*0.28);
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      heartParticles = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.52,
        vertexColors: true,
        transparent: true,
        opacity: 0.98,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      }));
      scene.add(heartParticles);
    }

    // Halo suave detrás del corazón central
    function createCentralGlow() {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, 'rgba(255,150,200,0.55)');
      g.addColorStop(0.35, 'rgba(244,114,182,0.25)');
      g.addColorStop(0.7, 'rgba(52,211,153,0.08)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.85
      });
      centralGlow = new THREE.Sprite(mat);
      centralGlow.scale.set(52, 52, 1);
      centralGlow.position.set(0, 2.8, 0);
      scene.add(centralGlow);
    }

    // Textura de partícula suave (círculo con glow) para corazones esponjosos
    function createSoftParticleTexture() {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.25, 'rgba(255,220,240,0.9)');
      g.addColorStop(0.55, 'rgba(255,150,200,0.45)');
      g.addColorStop(1, 'rgba(255,100,160,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    function createTextTexture(text) {
      const canvas = document.createElement('canvas');
      canvas.width = 480; canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 480, 100);
      // Fondo más sólido para máxima legibilidad
      ctx.fillStyle = 'rgba(25,8,30,0.65)';
      const rx = 16, ry = 18, rw = 448, rh = 64, rr = 22;
      ctx.beginPath();
      ctx.moveTo(rx + rr, ry);
      ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, rr);
      ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, rr);
      ctx.arcTo(rx, ry + rh, rx, ry, rr);
      ctx.arcTo(rx, ry, rx + rw, ry, rr);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,105,180,0.5)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.font = 'bold 36px Segoe UI, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#ff69b4';
      ctx.shadowBlur = 26;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, 240, 50);
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffe4f0';
      ctx.fillText(text, 240, 50);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    // Crea un corazón esponjoso con forma más clara
    function createFluffyHeart(colorHSL, scale = 1.0) {
      const count = 320;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const t = Math.random() * Math.PI * 2;
        // dens más alto = forma más definida, menos nube
        const dens = 0.65 + Math.pow(Math.random(), 0.7) * 0.35;
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        x *= 0.092 * scale * dens;
        y *= 0.092 * scale * dens;
        // Dispersión controlada (mantiene forma de corazón)
        x += (Math.random() - 0.5) * 0.28 * scale;
        y += (Math.random() - 0.5) * 0.28 * scale;
        const z = (Math.random() - 0.5) * 0.45 * scale;

        positions[i*3]     = x;
        positions[i*3 + 1] = y;
        positions[i*3 + 2] = z;

        const c = new THREE.Color().setHSL(
          colorHSL.h + (Math.random() - 0.5) * 0.035,
          colorHSL.s * (0.88 + Math.random() * 0.12),
          colorHSL.l * (0.78 + Math.random() * 0.28)
        );
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        map: createSoftParticleTexture(),
        size: 0.52 * scale,
        vertexColors: true,
        transparent: true,
        opacity: 0.94,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });

      return new THREE.Points(geo, mat);
    }

    function createOrbitingObjects() {
      const loader = new THREE.TextureLoader();
      // Tonos rosa / lila suaves para los corazones esponjosos
      const heartColors = [
        { h: 0.95, s: 0.85, l: 0.65 },
        { h: 0.92, s: 0.80, l: 0.68 },
        { h: 0.88, s: 0.75, l: 0.70 },
        { h: 0.97, s: 0.70, l: 0.72 },
        { h: 0.90, s: 0.82, l: 0.66 },
        { h: 0.85, s: 0.70, l: 0.68 },
        { h: 0.93, s: 0.78, l: 0.74 },
        { h: 0.87, s: 0.72, l: 0.70 }
      ];
      const total = 45; // ~30 fotos + ~15 corazones intercalados
      // Más alejados y dispersos alrededor del corazón grande
      const radiusBase = 32;
      const radiusSpread = 14;
      let photoCounter = 0;

      for (let i = 0; i < total; i++) {
        // Ángulos bien repartidos para que fotos y corazones vayan mezclados
        const angle = (i / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const radius = radiusBase + (Math.random() - 0.5) * radiusSpread;
        const yBase = (Math.random() - 0.5) * 18;
        const speed = 0.065 + Math.random() * 0.15;
        const ySpeed = 0.15 + Math.random() * 0.35;
        // Mezclar fotos y corazones (no todo un lado de cada cosa)
        // Patrón: foto, foto, corazón, foto, foto, corazón...
        const isPhoto = (i % 3 !== 2);

        if (isPhoto) {
          const imgIndex = photoCounter % imagenes.length;
          photoCounter++;
          loader.load(imagenes[imgIndex], (texture) => {
            const isMobile = window.innerWidth < 700;
            const photoSize = isMobile ? 3.9 : 5.4;
            const geo = new THREE.PlaneGeometry(photoSize, photoSize);
            const mat = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              side: THREE.DoubleSide,
              opacity: 0.96,
              depthWrite: false
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(Math.cos(angle)*radius, yBase, Math.sin(angle)*radius);
            mesh.userData = {
              type: 'photo', angle, radius, speed, ySpeed, yBase, index: i,
              phase: Math.random() * Math.PI * 2,
              floatAmp: 2.2 + Math.random() * 1.4
            };

            // Marco suave
            const borderGeo = new THREE.PlaneGeometry(photoSize + 0.35, photoSize + 0.35);
            const borderMat = new THREE.MeshBasicMaterial({
              color: 0x34d399,
              transparent: true,
              opacity: 0.42,
              side: THREE.DoubleSide,
              depthWrite: false
            });
            const border = new THREE.Mesh(borderGeo, borderMat);
            border.position.z = -0.04;
            mesh.add(border);

            const glowGeo = new THREE.PlaneGeometry(photoSize + 0.9, photoSize + 0.9);
            const glowMat = new THREE.MeshBasicMaterial({
              color: 0x34d399,
              transparent: true,
              opacity: 0.11,
              side: THREE.DoubleSide,
              depthWrite: false,
              blending: THREE.AdditiveBlending
            });
            const glow = new THREE.Mesh(glowGeo, glowMat);
            glow.position.z = -0.06;
            mesh.add(glow);

            scene.add(mesh);
            orbitingObjects.push(mesh);
          });
        } else {
          // Corazón esponjoso de partículas
          const group = new THREE.Group();
          const color = heartColors[i % heartColors.length];
          const isMobile = window.innerWidth < 700;
          const heartScale = isMobile
            ? (1.6 + Math.random() * 0.9)
            : (2.1 + Math.random() * 1.3);

          const fluffy = createFluffyHeart(color, heartScale);
          group.add(fluffy);

          // Texto flotante al lado
          const txt = textosCortos[i % textosCortos.length];
          const textMat = new THREE.SpriteMaterial({
            map: createTextTexture(txt),
            transparent: true,
            depthWrite: false
          });
          const textSprite = new THREE.Sprite(textMat);
          const textScale = isMobile ? 6.8 : 9.0;
          textSprite.scale.set(textScale, textScale * 0.22, 1);
          textSprite.position.set(heartScale * 1.05 + (isMobile ? 1.6 : 2.2), 0.25, 0);
          group.add(textSprite);

          group.position.set(Math.cos(angle)*radius, yBase, Math.sin(angle)*radius);
          group.userData = {
            type: 'heart',
            angle, radius, speed, ySpeed, yBase,
            index: i,
            text: txt,
            phase: Math.random() * Math.PI * 2,
            floatAmp: 2.4 + Math.random() * 1.6,
            spinSpeed: 0.15 + Math.random() * 0.25,
            pulseSpeed: 1.8 + Math.random() * 1.2
          };
          scene.add(group);
          orbitingObjects.push(group);
        }
      }
    }

    function onPointerDown(event) {
      if (!started) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const targets = [];
      orbitingObjects.forEach(obj => {
        if (obj.isGroup) obj.children.forEach(c => targets.push(c));
        else targets.push(obj);
      });
      const intersects = raycaster.intersectObjects(targets, false);
      if (intersects.length > 0) {
        let target = intersects[0].object;
        while (target.parent && !target.userData.type) target = target.parent;
        openModal();
      }
    }

    function openModal() {
      document.getElementById('modalImg').src = imagenes[Math.floor(Math.random() * imagenes.length)];
      document.getElementById('modalMsg').textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
      document.getElementById('modal').classList.add('show');
    }
    function closeModal() {
      document.getElementById('modal').classList.remove('show');
    }
    document.getElementById('modal').addEventListener('click', e => {
      if (e.target.id === 'modal') closeModal();
    });

    // ========== TE AMO escrito con partículas (más grande) ==========
    function createTeAmoParticles() {
      const letterPoints = [];
      const s = 1.45; // escala general más grande

      function addLine(x1, y1, x2, y2, dens = 26) {
        for (let i = 0; i <= dens; i++) {
          const t = i / dens;
          letterPoints.push({
            x: (x1 + (x2 - x1) * t) * s,
            y: (y1 + (y2 - y1) * t) * s
          });
        }
      }

      // T
      addLine(-11.8, 3.5, -8.5, 3.5);
      addLine(-10.15, 3.5, -10.15, -1.7);

      // E
      addLine(-7.5, 3.5, -7.5, -1.7);
      addLine(-7.5, 3.5, -4.85, 3.5);
      addLine(-7.5, 0.95, -5.25, 0.95);
      addLine(-7.5, -1.7, -4.85, -1.7);

      // A
      addLine(-3.0, -1.7, -1.4, 3.5);
      addLine(-1.4, 3.5, 0.3, -1.7);
      addLine(-2.3, 0.5, -0.3, 0.5);

      // M
      addLine(1.35, -1.7, 1.35, 3.5);
      addLine(1.35, 3.5, 2.8, 0.5);
      addLine(2.8, 0.5, 4.25, 3.5);
      addLine(4.25, 3.5, 4.25, -1.7);

      // O
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2;
        letterPoints.push({
          x: (7.5 + Math.cos(a) * 1.85) * s,
          y: (0.9 + Math.sin(a) * 2.45) * s
        });
      }

      const count = letterPoints.length * 5;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      let idx = 0;
      letterPoints.forEach(p => {
        for (let k = 0; k < 5; k++) {
          positions[idx*3]     = p.x + (Math.random()-0.5)*0.38;
          positions[idx*3 + 1] = p.y + (Math.random()-0.5)*0.38 + 2.4;
          positions[idx*3 + 2] = (Math.random()-0.5)*1.3;

          const c = new THREE.Color().setHSL(0.91 + Math.random()*0.06, 0.92, 0.70 + Math.random()*0.18);
          colors[idx*3] = c.r; colors[idx*3+1] = c.g; colors[idx*3+2] = c.b;
          idx++;
        }
      });

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      teAmoParticles = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.88,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }));
      scene.add(teAmoParticles);
    }

    // ========== ANILLO EXTERIOR + DESTELLOS AMBIENTALES (llenan el espacio horizontal) ==========
    function createOuterRing() {
      const count = 7000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 46 + Math.random() * 48;
        const y = (Math.random() - 0.5) * 42;
        positions[i*3]     = Math.cos(angle) * radius;
        positions[i*3 + 1] = y;
        positions[i*3 + 2] = Math.sin(angle) * radius;

        const usePink = Math.random() > 0.42;
        const c = usePink
          ? new THREE.Color().setHSL(0.92 + Math.random()*0.05, 0.75, 0.55 + Math.random()*0.28)
          : new THREE.Color().setHSL(0.45 + Math.random()*0.08, 0.6, 0.48 + Math.random()*0.32);
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      outerRing = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.72,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      }));
      scene.add(outerRing);
    }

    function createAmbientSparkles() {
      const count = 3200;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const radius = 18 + Math.random() * 80;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i*3]     = radius * Math.sin(phi) * Math.cos(theta);
        positions[i*3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.75;
        positions[i*3 + 2] = radius * Math.cos(phi);

        const c = new THREE.Color().setHSL(
          Math.random() > 0.5 ? 0.92 : 0.48,
          0.65 + Math.random() * 0.3,
          0.55 + Math.random() * 0.35
        );
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      ambientSparkles = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.48,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      }));
      scene.add(ambientSparkles);
    }

    // Anillos de pulso que se expanden con el ritmo de la música
    function createPulseRings() {
      pulseRings = [];
      for (let r = 0; r < 4; r++) {
        const count = 360;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const baseRadius = 34 + r * 12;

        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const jitter = 0.8 + Math.random() * 1.5;
          positions[i*3]     = Math.cos(a) * baseRadius * jitter;
          positions[i*3 + 1] = (Math.random() - 0.5) * 4;
          positions[i*3 + 2] = Math.sin(a) * baseRadius * jitter;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const color = r % 2 === 0 ? 0xf9a8d4 : 0xa7f3d0;
        const mat = new THREE.PointsMaterial({
          size: 1.1,
          color: color,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true
        });
        const ring = new THREE.Points(geo, mat);
        ring.userData = {
          baseRadius,
          phase: r * 0.7,
          speed: 1.0 + r * 0.18
        };
        scene.add(ring);
        pulseRings.push(ring);
      }
    }

    // ========== ESTRELLAS FUGACES ==========
    function spawnShootingStar() {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(20 * 3);
      const startX = (Math.random() - 0.5) * 75;
      const startY = 16 + Math.random() * 18;
      const startZ = (Math.random() - 0.5) * 45;
      const dirX = -0.65 - Math.random() * 0.45;
      const dirY = -0.45 - Math.random() * 0.4;

      for (let i = 0; i < 20; i++) {
        positions[i*3]     = startX + dirX * i * 0.85;
        positions[i*3 + 1] = startY + dirY * i * 0.85;
        positions[i*3 + 2] = startZ;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Colores suaves: a veces menta, a veces rosa
      const starColor = Math.random() > 0.4 ? 0xa7f3d0 : 0xfbcfe8;
      const mat = new THREE.PointsMaterial({
        size: 0.58,
        color: starColor,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const star = new THREE.Points(geo, mat);
      star.userData = { life: 1.0, speed: 0.85 + Math.random()*0.45, dirX, dirY };
      scene.add(star);
      shootingStars.push(star);
    }

    // ========== CONTADOR DE TIEMPO ==========
    function startCounter() {
      const pi = String(DATOS.inicio).split("-").map(Number);
      const startDate = new Date(pi[0], pi[1] - 1, pi[2], 0, 0, 0);

      function update() {
        const now = new Date();
        let diff = now - startDate;

        if (diff < 0) {
          document.getElementById('counterText').textContent = 'Pronto empezamos... ❤️';
          return;
        }

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
          months--;
          const prev = new Date(now.getFullYear(), now.getMonth(), 0);
          days += prev.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        const totalMs = now - startDate;
        const totalSecs = Math.floor(totalMs / 1000);
        const elapsedHours = Math.floor((totalSecs % 86400) / 3600);
        const elapsedMins  = Math.floor((totalSecs % 3600) / 60);
        const elapsedSecs  = totalSecs % 60;

        let text = '';
        if (years > 0) text += years + (years === 1 ? ' año ' : ' años ');
        if (months > 0 || years > 0) text += months + (months === 1 ? ' mes ' : ' meses ');
        text += days + (days === 1 ? ' día ' : ' días ');
        text += String(elapsedHours).padStart(2,'0') + ':' +
                String(elapsedMins).padStart(2,'0') + ':' +
                String(elapsedSecs).padStart(2,'0');

        document.getElementById('counterText').textContent = text + (DATOS.sufijoContador || '');
      }
      update();
      setInterval(update, 1000);
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!started) return;
      const t = Date.now() * 0.001;
      const elapsed = (Date.now() - introStart) / 1000;

      // ========== FASE DE VIAJE (túnel) ==========
      if (introPhase === 'warp' && warpTunnel) {
        const positions = warpTunnel.geometry.attributes.position.array;
        const speeds = warpTunnel.geometry.attributes.speed.array;
        const flySpeed = 2.8 + elapsed * 1.2;

        for (let i = 0; i < speeds.length; i++) {
          positions[i*3 + 2] += flySpeed * speeds[i];
          // Reciclar partículas al fondo del túnel
          if (positions[i*3 + 2] > 100) {
            positions[i*3 + 2] -= 200;
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 28;
            positions[i*3]     = Math.cos(angle) * radius;
            positions[i*3 + 1] = Math.sin(angle) * radius;
          }
        }
        warpTunnel.geometry.attributes.position.needsUpdate = true;
        warpTunnel.rotation.z = elapsed * 0.35;

        // Cámara avanza por el túnel
        camera.position.z = 80 - elapsed * 18;
        camera.position.y = Math.sin(elapsed * 1.5) * 0.8;

        // A los ~3.2s pasamos a revelar el universo
        if (elapsed > 3.2) {
          introPhase = 'reveal';
          // Mostrar el universo
          if (particles) particles.visible = true;
          if (heartParticles) heartParticles.visible = true;
          if (teAmoParticles) teAmoParticles.visible = true;
          if (centralGlow) centralGlow.visible = true;
          if (outerRing) outerRing.visible = true;
          if (ambientSparkles) ambientSparkles.visible = true;
          pulseRings.forEach(r => r.visible = true);
          orbitingObjects.forEach(o => o.visible = true);
        }

        controls.update();
        renderer.render(scene, camera);
        return;
      }

      // ========== TRANSICIÓN / REVELACIÓN ==========
      if (introPhase === 'reveal') {
        const revealT = elapsed - 3.2;
        // Fundido del túnel
        if (warpTunnel) {
          warpTunnel.material.opacity = Math.max(0, 1 - revealT * 0.9);
          const positions = warpTunnel.geometry.attributes.position.array;
          const speeds = warpTunnel.geometry.attributes.speed.array;
          for (let i = 0; i < speeds.length; i++) {
            positions[i*3 + 2] += 4 * speeds[i];
          }
          warpTunnel.geometry.attributes.position.needsUpdate = true;
          if (warpTunnel.material.opacity <= 0.02) {
            scene.remove(warpTunnel);
            warpTunnel.geometry.dispose();
            warpTunnel.material.dispose();
            warpTunnel = null;
          }
        }
        // Cámara se coloca en posición final
        const targetZ = 54;
        const targetY = 3.5;
        camera.position.z += (targetZ - camera.position.z) * 0.06;
        camera.position.y += (targetY - camera.position.y) * 0.06;
        camera.position.x += (0 - camera.position.x) * 0.06;

        if (revealT > 2.2) {
          introPhase = 'done';
          controls.enabled = true;
          controls.autoRotate = true;
          camera.position.set(0, 3.5, 54);
          // UI
          startCounter();
          document.getElementById('counter').classList.add('show');
          document.getElementById('fsBtn').classList.add('show');
          document.getElementById('sndBtn').classList.add('show');
          document.getElementById('fsBtn').addEventListener('click', toggleFullscreen);
          setTimeout(() => {
            document.getElementById('hint').classList.add('show');
            setTimeout(() => document.getElementById('hint').classList.remove('show'), 9000);
          }, 600);
        }
      }

      if (particles) {
        particles.rotation.y = t * 0.055;
        particles.rotation.x = Math.sin(t * 0.06) * 0.03;
      }

      if (heartParticles) {
        heartParticles.rotation.y = t * 0.08;
      }

      if (centralGlow) {
        const gPulse = 0.70 + Math.sin(t * 2.4) * 0.22;
        centralGlow.material.opacity = gPulse;
        const gScale = 50 + Math.sin(t * 1.8) * 5;
        centralGlow.scale.set(gScale, gScale, 1);
      }

      // TE AMO más vivo
      if (teAmoParticles) {
        teAmoParticles.position.y = Math.sin(t * 0.7) * 0.45;
        teAmoParticles.rotation.y = Math.sin(t * 0.25) * 0.07;
        const pulse = 0.8 + Math.sin(t * 2.6) * 0.2;
        teAmoParticles.material.opacity = pulse;
        const scale = 1 + Math.sin(t * 2.1) * 0.1;
        teAmoParticles.scale.set(scale, scale, scale);
      }

      // Ritmo musical más intenso (~90-100 BPM)
      const musicBeat = Math.sin(t * 3.15);
      const musicBeat2 = Math.sin(t * 1.55);
      const musicIntensity = 0.55 + musicBeat * 0.45;

      // Anillo exterior que respira fuerte con la música
      if (outerRing && outerRing.visible) {
        outerRing.rotation.y = t * 0.03;
        outerRing.rotation.x = Math.sin(t * 0.045) * 0.1;
        outerRing.material.opacity = 0.4 + musicIntensity * 0.45;
        const ringScale = 1 + musicBeat2 * 0.06;
        outerRing.scale.set(ringScale, 1 + musicBeat * 0.05, ringScale);
      }

      // Destellos ambientales más vivos
      if (ambientSparkles && ambientSparkles.visible) {
        ambientSparkles.rotation.y = t * 0.045;
        ambientSparkles.rotation.x = Math.sin(t * 0.08) * 0.06;
        ambientSparkles.material.opacity = 0.5 + musicIntensity * 0.48;
        ambientSparkles.material.size = 0.4 + musicBeat * 0.18;
      }

      // La galaxia también late con el ritmo
      if (particles && particles.visible) {
        particles.material.opacity = 0.8 + musicBeat * 0.15;
      }

      // Corazón central late más con la música
      if (heartParticles && heartParticles.visible) {
        const beat = 1 + Math.sin(t * 2.5) * 0.08 + musicBeat * 0.04;
        heartParticles.scale.set(beat, beat, beat);
      }

      // Anillos de pulso más visibles
      pulseRings.forEach((ring) => {
        if (!ring.visible) return;
        const d = ring.userData;
        const wave = (Math.sin(t * 2.9 * d.speed + d.phase) + 1) * 0.5;
        const expand = 1 + wave * 0.7;
        ring.scale.set(expand, 1, expand);
        ring.material.opacity = Math.max(0.08, 0.75 * (1 - wave * 0.85) * (0.7 + musicIntensity * 0.4));
        ring.material.size = 0.9 + wave * 0.4;
        ring.rotation.y = t * 0.08;
        ring.rotation.x = Math.sin(t * 0.2 + d.phase) * 0.12;
      });

      // Estrellas fugaces un poco más frecuentes
      if (introPhase === 'done' && Math.random() < 0.022) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        const d = star.userData;
        d.life -= 0.015 * d.speed;
        star.material.opacity = Math.max(0, d.life);
        star.position.x += d.dirX * 0.95;
        star.position.y += d.dirY * 0.95;
        if (d.life <= 0) {
          scene.remove(star);
          star.geometry.dispose();
          star.material.dispose();
          shootingStars.splice(i, 1);
        }
      }

      orbitingObjects.forEach((obj, i) => {
        const d = obj.userData;
        if (!d) return;

        // Órbita suave + pequeña variación de radio (respiración)
        d.angle += 0.0019 * d.speed;
        const breathe = 1 + Math.sin(t * 0.35 + d.phase) * 0.04;
        const r = d.radius * breathe;
        obj.position.x = Math.cos(d.angle) * r;
        obj.position.z = Math.sin(d.angle) * r;

        // Flotación más orgánica (dos ondas)
        const floatY = Math.sin(t * d.ySpeed + d.phase) * (d.floatAmp || 2.6)
                     + Math.sin(t * (d.ySpeed * 0.6) + d.phase * 1.7) * 0.7;
        obj.position.y = d.yBase + floatY;

        // Los corazones esponjosos giran y laten suavemente
        if (d.type === 'heart') {
          obj.rotation.y = t * (d.spinSpeed || 0.2);
          const pulse = 1 + Math.sin(t * (d.pulseSpeed || 2.0) + d.phase) * 0.07;
          obj.scale.set(pulse, pulse, pulse);
        } else {
          obj.lookAt(camera.position);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    }

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    // ========== SONIDO AMBIENTAL (generado por el navegador, sin archivos de audio) ==========
    let ac = null, sonidoOn = true;
    function iniciarSonido() {
      const A = window.AudioContext || window.webkitAudioContext;
      if (!A || DATOS.sonido === false) { document.getElementById('sndBtn').style.display = 'none'; return; }
      ac = new A(); const master = ac.createGain(); master.gain.value = 0.17; master.connect(ac.destination);
      const notas = [261.63, 329.63, 392, 523.25, 392, 329.63, 293.66, 349.23, 440, 587.33, 440, 349.23, 220, 277.18, 329.63, 440, 329.63, 277.18, 246.94, 311.13, 392, 493.88, 392, 311.13];
      let i = 0;
      function tono(f, t, d, v) { const o = ac.createOscillator(), e = ac.createGain(); o.type = 'sine'; o.frequency.value = f; e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(v, t + 0.06); e.gain.exponentialRampToValueAtTime(0.001, t + d); o.connect(e); e.connect(master); o.start(t); o.stop(t + d + 0.1); }
      setInterval(() => { if (!sonidoOn || ac.state !== 'running') return; const f = notas[i % notas.length]; tono(f, ac.currentTime, 2.4, 0.5); if (i % 6 === 0) tono(f / 2, ac.currentTime, 4, 0.4); i++; }, 540);
      document.getElementById('sndBtn').addEventListener('click', () => { sonidoOn = !sonidoOn; document.getElementById('sndBtn').textContent = sonidoOn ? '♪' : '✕'; });
    }
