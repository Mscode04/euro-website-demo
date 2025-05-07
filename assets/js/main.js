        // Main 3D Scene for Hero Section
        const canvas = document.getElementById('productCanvas');
        const renderer = new THREE.WebGLRenderer({ 
            canvas, 
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Create hardware models (simplified representations)
        const createScrew = () => {
            const group = new THREE.Group();
            
            // Screw head
            const headGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 6);
            const headMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x888888,
                specular: 0x111111,
                shininess: 30
            });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.rotation.x = Math.PI / 2;
            group.add(head);
            
            // Screw slot
            const slotGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.2);
            const slotMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
            const slot = new THREE.Mesh(slotGeometry, slotMaterial);
            slot.position.y = 0.1;
            group.add(slot);
            
            // Screw shaft
            const shaftGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
            const shaftMaterial = new THREE.MeshPhongMaterial({ color: 0xAAAAAA });
            const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
            shaft.position.y = -0.6;
            shaft.rotation.x = Math.PI / 2;
            group.add(shaft);
            
            // Screw thread
            const threadGeometry = new THREE.TorusGeometry(0.1, 0.05, 16, 32, Math.PI * 2);
            for (let i = 0; i < 5; i++) {
                const thread = new THREE.Mesh(
                    threadGeometry,
                    new THREE.MeshPhongMaterial({ color: 0x888888 })
                );
                thread.position.y = -0.6 + i * 0.2;
                thread.rotation.x = Math.PI / 2;
                thread.rotation.z = i * Math.PI / 2.5;
                group.add(thread);
            }
            
            return group;
        };
        
        const createNut = () => {
            const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 6);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x0057B8,
                specular: 0x111111,
                shininess: 30
            });
            const nut = new THREE.Mesh(geometry, material);
            nut.rotation.x = Math.PI / 2;
            return nut;
        };
        
        const createBolt = () => {
            const group = new THREE.Group();
            
            // Bolt head
            const headGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 6);
            const headMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xFF7900,
                specular: 0x111111,
                shininess: 30
            });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.rotation.x = Math.PI / 2;
            group.add(head);
            
            // Bolt shaft
            const shaftGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 32);
            const shaftMaterial = new THREE.MeshPhongMaterial({ color: 0xDDDDDD });
            const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
            shaft.position.y = -0.9;
            shaft.rotation.x = Math.PI / 2;
            group.add(shaft);
            
            return group;
        };
        
        const createWrench = () => {
            const group = new THREE.Group();
            
            // Wrench handle
            const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
            const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
            const handle = new THREE.Mesh(handleGeometry, handleMaterial);
            handle.rotation.z = Math.PI / 2;
            group.add(handle);
            
            // Wrench head
            const headGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32);
            const headMaterial = new THREE.MeshPhongMaterial({ color: 0x0057B8 });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.x = 0.8;
            head.rotation.x = Math.PI / 2;
            group.add(head);
            
            // Wrench jaw
            const jawGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
            const jawMaterial = new THREE.MeshPhongMaterial({ color: 0x0057B8 });
            const jaw = new THREE.Mesh(jawGeometry, jawMaterial);
            jaw.position.set(0.8, 0, 0.3);
            group.add(jaw);
            
            return group;
        };
        
        const hardwarePieces = [];
        const hardwareCount = 15;
        
        for (let i = 0; i < hardwareCount; i++) {
            let model;
            const randomModel = Math.floor(Math.random() * 4);
            
            switch(randomModel) {
                case 0:
                    model = createScrew();
                    break;
                case 1:
                    model = createNut();
                    break;
                case 2:
                    model = createBolt();
                    break;
                case 3:
                    model = createWrench();
                    break;
            }
            
            // Random position
            model.position.x = (Math.random() - 0.5) * 15;
            model.position.y = (Math.random() - 0.5) * 10;
            model.position.z = (Math.random() - 0.5) * 10;
            
            // Random rotation
            model.rotation.x = Math.random() * Math.PI;
            model.rotation.y = Math.random() * Math.PI;
            model.rotation.z = Math.random() * Math.PI;
            
            // Random scale
            const scale = 0.5 + Math.random() * 0.5;
            model.scale.set(scale, scale, scale);
            
            // Store reference and random movement values
            hardwarePieces.push({
                model: model,
                speed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01,
                    rotation: (Math.random() - 0.5) * 0.02
                }
            });
            
            scene.add(model);
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Animate each hardware piece
            hardwarePieces.forEach(piece => {
                piece.model.rotation.x += piece.speed.rotation;
                piece.model.rotation.y += piece.speed.rotation;
                piece.model.rotation.z += piece.speed.rotation;
                
                // Bounce within bounds
                if (Math.abs(piece.model.position.x) > 8) piece.speed.x *= -1;
                if (Math.abs(piece.model.position.y) > 5) piece.speed.y *= -1;
                if (Math.abs(piece.model.position.z) > 8) piece.speed.z *= -1;
                
                piece.model.position.x += piece.speed.x;
                piece.model.position.y += piece.speed.y;
                piece.model.position.z += piece.speed.z;
            });
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Scroll animations
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            camera.position.z = 5 + scrollPosition * 0.05;
        });


        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navbarMenu = document.querySelector('.navbar-menu');
    
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navbarMenu.classList.toggle('active');
            });
    
            // Search Toggle
            const searchBtn = document.querySelector('.search-btn');
            const searchContainer = document.querySelector('.search-container');
    
            searchBtn.addEventListener('click', () => {
                searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
            });
    
            // Close search when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container') && e.target !== searchBtn) {
                    searchContainer.style.display = 'none';
                }
            });
    
            // Dropdown functionality for mobile
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav-link');
                
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const menu = dropdown.querySelector('.dropdown-content');
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                        
                        // Close other open dropdowns
                        document.querySelectorAll('.dropdown-content').forEach(otherMenu => {
                            if (otherMenu !== menu) {
                                otherMenu.style.display = 'none';
                            }
                        });
                    }
                });
            });
    
            // Sticky navbar shadow on scroll
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 10) {
                    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                } else {
                    navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }
            });
    
            // Handle window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    // Reset mobile menu state on larger screens
                    mobileMenuBtn.classList.remove('active');
                    navbarMenu.classList.remove('active');
                    
                    // Reset dropdown menus
                    document.querySelectorAll('.dropdown-content').forEach(menu => {
                        menu.style.display = '';
                    });
                }
            });
        });



    // Improved Testimonial Slider Functionality with Touch Support
    document.addEventListener('DOMContentLoaded', function() {
        const slider = document.querySelector('.testimonial-slider');
        const cards = document.querySelectorAll('.testimonial-card');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        const cardCount = cards.length;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;
        
        // For desktop where all cards are visible
        if (window.innerWidth >= 992) {
            return;
        }
        
        // Update indicators
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Scroll to card
        function scrollToCard(index) {
            if (index < 0) index = 0;
            if (index >= cardCount) index = cardCount - 1;
            
            currentIndex = index;
            const cardWidth = cards[0].offsetWidth + 30; // width + gap
            slider.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
            
            updateIndicators();
        }
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            scrollToCard(currentIndex + 1);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            scrollToCard(currentIndex - 1);
        });
        
        // Indicator click
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                scrollToCard(index);
            });
        });
        
        // Touch event handlers for swipe
        cards.forEach(card => {
            // Touch start
            card.addEventListener('touchstart', touchStart);
            // Touch move
            card.addEventListener('touchmove', touchMove);
            // Touch end
            card.addEventListener('touchend', touchEnd);
        });
        
        function touchStart(e) {
            startPos = e.touches[0].clientX;
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.style.scrollBehavior = 'auto';
        }
        
        function touchMove(e) {
            if (!isDragging) return;
            const currentPosition = e.touches[0].clientX;
            const diff = currentPosition - startPos;
            
            // Prevent vertical scrolling
            if (Math.abs(diff) > Math.abs(e.touches[0].clientY - startPos)) {
                e.preventDefault();
            }
            
            // Move the slider
            slider.scrollLeft -= diff;
            startPos = currentPosition;
        }
        
        function touchEnd() {
            if (!isDragging) return;
            isDragging = false;
            cancelAnimationFrame(animationID);
            
            // Determine if we should change slide based on scroll position
            const cardWidth = cards[0].offsetWidth + 30;
            const newIndex = Math.round(slider.scrollLeft / cardWidth);
            
            // Snap to the closest card
            scrollToCard(newIndex);
            slider.style.scrollBehavior = 'smooth';
        }
        
        function animation() {
            if (isDragging) {
                animationID = requestAnimationFrame(animation);
            }
        }
        
        // Auto-advance for mobile/tablet
        if (window.innerWidth < 992) {
            let autoSlideInterval = setInterval(() => {
                if (!isDragging) { // Don't auto-advance while user is interacting
                    scrollToCard((currentIndex + 1) % cardCount);
                }
            }, 5000);
            
            // Pause auto-slide when user interacts
            slider.addEventListener('touchstart', () => {
                clearInterval(autoSlideInterval);
            });
            
            slider.addEventListener('touchend', () => {
                autoSlideInterval = setInterval(() => {
                    if (!isDragging) {
                        scrollToCard((currentIndex + 1) % cardCount);
                    }
                }, 5000);
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                // Reset for desktop view
                slider.scrollTo({ left: 0, behavior: 'auto' });
                currentIndex = 0;
                updateIndicators();
            }
        });
    });
