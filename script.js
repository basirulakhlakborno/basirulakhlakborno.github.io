// Typing Effect - Only run if element exists
const typingText = document.getElementById('typing-text');
if (typingText) {
    const texts = [
        'Full Stack Developer',
        'Code Architect',
        'Digital Craftsman',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    // Start typing effect when page loads
    window.addEventListener('load', () => {
        setTimeout(typeText, 1000);
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Animate Stats on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Animate Elements on Scroll
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in animation to cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(card);
});

// Smooth hover effect for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Title stays clean and professional - no glitch effects

// Terminal cursor blink
const cursor = document.querySelector('.cursor');
if (cursor) {
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-black)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

// Add active state to navigation links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based animations here
}, 16);

window.addEventListener('scroll', throttledScroll);

// GitHub Profile API Integration
async function loadGitHubProfile() {
    const username = 'basirulakhlakborno';
    const apiUrl = `https://api.github.com/users/${username}`;
    
    const loadingElement = document.getElementById('githubLoading');
    const profileElement = document.getElementById('githubProfileHeader');
    
    // Get all elements
    const reposElement = document.getElementById('githubRepos');
    const followersElement = document.getElementById('githubFollowers');
    const followingElement = document.getElementById('githubFollowing');
    const nameElement = document.getElementById('githubName');
    const usernameElement = document.getElementById('githubUsername');
    const bioElement = document.getElementById('githubBio');
    const avatar = document.getElementById('githubAvatar');
    const locationElement = document.getElementById('githubLocation');
    const locationText = document.getElementById('githubLocationText');
    const profileLink = document.getElementById('githubProfileLink');
    
    // Set default values immediately and show profile
    if (avatar) {
        avatar.src = `https://avatars.githubusercontent.com/u/251390543?v=4`;
        avatar.alt = 'Basirul Akhlak Borno';
    }
    
    if (nameElement) nameElement.textContent = 'Basirul Akhlak Borno';
    if (usernameElement) usernameElement.textContent = `@${username}`;
    if (bioElement) {
        bioElement.textContent = '"Believe in yourself, listen to your gut, and do what you love."';
        bioElement.style.display = 'block';
    }
    
    if (reposElement) reposElement.textContent = '5';
    if (followersElement) followersElement.textContent = '2';
    if (followingElement) followingElement.textContent = '0';
    
    if (locationElement && locationText) {
        locationText.textContent = 'Jamalpur, Bangladesh';
        locationElement.style.display = 'flex';
    }
    
    if (profileLink) {
        profileLink.href = `https://github.com/${username}`;
    }
    
    // Show profile immediately, hide loading
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    if (profileElement) {
        profileElement.style.display = 'flex';
    }
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub profile');
        }
        
        const data = await response.json();
        
        // Update avatar
        if (avatar) {
            avatar.src = data.avatar_url || `https://github.com/identicons/${username}.png`;
            avatar.alt = data.name || username;
        }
        
        // Update name
        if (nameElement) {
            nameElement.textContent = data.name || username;
        }
        
        // Update username
        if (usernameElement) {
            usernameElement.textContent = `@${data.login}`;
        }
        
        // Update bio
        if (bioElement) {
            if (data.bio) {
                bioElement.textContent = `"${data.bio}"`;
                bioElement.style.display = 'block';
            } else {
                bioElement.textContent = '';
                bioElement.style.display = 'none';
            }
        }
        
        // Update stats
        if (reposElement) {
            reposElement.textContent = data.public_repos || 0;
        }
        
        if (followersElement) {
            followersElement.textContent = data.followers || 0;
        }
        
        if (followingElement) {
            followingElement.textContent = data.following || 0;
        }
        
        // Update location
        if (locationElement && locationText) {
            if (data.location) {
                locationText.textContent = data.location;
                locationElement.style.display = 'flex';
            } else {
                locationElement.style.display = 'none';
            }
        }
        
        // Update blog/website
        const blogElement = document.getElementById('githubBlog');
        const blogLink = document.getElementById('githubBlogLink');
        const blogText = document.getElementById('githubBlogText');
        if (blogElement && blogLink && blogText) {
            if (data.blog) {
                const blogUrl = data.blog.startsWith('http') ? data.blog : `https://${data.blog}`;
                blogLink.href = blogUrl;
                blogText.textContent = data.blog;
                blogElement.style.display = 'block';
            } else {
                blogElement.style.display = 'none';
            }
        }
        
        // Update profile link
        if (profileLink) {
            profileLink.href = data.html_url || `https://github.com/${username}`;
        }
        
        // Update social media links from GitHub
        updateSocialLinks(data, username);
        
    } catch (error) {
        console.error('Error loading GitHub profile:', error);
        // Keep default values visible on error (profile already shown with defaults)
        // No need to change anything, defaults are already displayed
    }
}

// Function to fetch social links from GitHub profile page
async function fetchSocialLinksFromGitHub(username) {
    try {
        // Try to fetch the profile README.md which often contains social links
        const readmeUrl = `https://api.github.com/repos/${username}/${username}/contents/README.md`;
        const readmeResponse = await fetch(readmeUrl);
        
        if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            if (readmeData.content) {
                const readmeContent = atob(readmeData.content);
                return parseSocialLinksFromText(readmeContent);
            }
        }
    } catch (error) {
        console.log('Could not fetch README, trying alternative methods...');
    }
    
    // Alternative: Try to fetch from profile repository
    try {
        const profileRepoUrl = `https://api.github.com/repos/${username}/${username}.github.io/contents/README.md`;
        const profileResponse = await fetch(profileRepoUrl);
        
        if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            if (profileData.content) {
                const profileContent = atob(profileData.content);
                return parseSocialLinksFromText(profileContent);
            }
        }
    } catch (error) {
        console.log('Could not fetch profile repo README...');
    }
    
    return null;
}

// Function to parse social links from text content
function parseSocialLinksFromText(text) {
    const socialLinks = {
        facebook: null,
        instagram: null,
        linkedin: null,
        twitter: null,
        email: null
    };
    
    // Facebook patterns
    const facebookPatterns = [
        /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.com)\/([a-zA-Z0-9.]+)/gi,
        /facebook[:\s]+(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.com)\/([a-zA-Z0-9.]+)/gi
    ];
    
    for (const pattern of facebookPatterns) {
        const match = text.match(pattern);
        if (match) {
            const username = match[0].replace(/https?:\/\/(www\.)?(facebook\.com|fb\.com)\//i, '').trim();
            socialLinks.facebook = `https://facebook.com/${username}`;
            break;
        }
    }
    
    // Instagram patterns
    const instagramPatterns = [
        /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)/gi,
        /instagram[:\s]+(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)/gi,
        /@([a-zA-Z0-9_.]+)\s*\(instagram\)/gi
    ];
    
    for (const pattern of instagramPatterns) {
        const match = text.match(pattern);
        if (match) {
            const username = match[0].replace(/https?:\/\/(www\.)?instagram\.com\//i, '').replace('@', '').trim();
            socialLinks.instagram = `https://instagram.com/${username}`;
            break;
        }
    }
    
    // LinkedIn patterns
    const linkedinPatterns = [
        /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9-]+)/gi,
        /linkedin[:\s]+(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9-]+)/gi
    ];
    
    for (const pattern of linkedinPatterns) {
        const match = text.match(pattern);
        if (match) {
            const username = match[0].replace(/https?:\/\/(www\.)?linkedin\.com\/in\//i, '').trim();
            socialLinks.linkedin = `https://linkedin.com/in/${username}`;
            break;
        }
    }
    
    // Twitter patterns
    const twitterPatterns = [
        /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/gi,
        /twitter[:\s]+(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/gi
    ];
    
    for (const pattern of twitterPatterns) {
        const match = text.match(pattern);
        if (match) {
            const username = match[0].replace(/https?:\/\/(www\.)?(twitter\.com|x\.com)\//i, '').trim();
            socialLinks.twitter = `https://twitter.com/${username}`;
            break;
        }
    }
    
    // Email patterns
    const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const emailMatch = text.match(emailPattern);
    if (emailMatch) {
        socialLinks.email = `mailto:${emailMatch[0]}`;
    }
    
    return socialLinks;
}

// Function to update social media links from GitHub data
async function updateSocialLinks(githubData, username) {
    // Update GitHub link (always available)
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('github.com') && !href.includes(username)) {
            link.href = githubData.html_url || `https://github.com/${username}`;
        }
    });
    
    // Try to fetch social links from GitHub profile/README
    const socialLinks = await fetchSocialLinksFromGitHub(username);
    
    if (socialLinks) {
        // Update Facebook
        if (socialLinks.facebook) {
            const facebookLink = document.querySelector('a[title="Facebook"]');
            if (facebookLink) {
                facebookLink.href = socialLinks.facebook;
            }
        }
        
        // Update Instagram
        if (socialLinks.instagram) {
            const instagramLink = document.querySelector('a[title="Instagram"]');
            if (instagramLink) {
                instagramLink.href = socialLinks.instagram;
            }
        }
        
        // Update LinkedIn
        if (socialLinks.linkedin) {
            const linkedinLink = document.querySelector('a[title="LinkedIn"]');
            if (linkedinLink) {
                linkedinLink.href = socialLinks.linkedin;
            }
        }
        
        // Update Twitter
        if (socialLinks.twitter) {
            const twitterLink = document.querySelector('a[title="Twitter"]');
            if (twitterLink) {
                twitterLink.href = socialLinks.twitter;
            }
        }
        
        // Update Email
        if (socialLinks.email) {
            const emailLinks = document.querySelectorAll('a[title="Email"], a[href^="mailto:"]');
            emailLinks.forEach(emailLink => {
                emailLink.href = socialLinks.email;
            });
        }
    }
    
    // Fallback: Parse bio for social media links
    if (githubData.bio) {
        const bioLinks = parseSocialLinksFromText(githubData.bio);
        
        // Update Facebook from bio if not found in README
        if (!socialLinks?.facebook && bioLinks.facebook) {
            const facebookLink = document.querySelector('a[title="Facebook"]');
            if (facebookLink) {
                facebookLink.href = bioLinks.facebook;
            }
        }
        
        // Update Instagram from bio if not found in README
        if (!socialLinks?.instagram && bioLinks.instagram) {
            const instagramLink = document.querySelector('a[title="Instagram"]');
            if (instagramLink) {
                instagramLink.href = bioLinks.instagram;
            }
        }
    }
    
    // Update Twitter if available from GitHub API
    if (githubData.twitter_username) {
        const twitterLink = document.querySelector('a[title="Twitter"]');
        if (twitterLink) {
            twitterLink.href = `https://twitter.com/${githubData.twitter_username}`;
        }
    }
    
    // Update blog/website if it's a social media platform
    if (githubData.blog) {
        const blogUrl = githubData.blog.startsWith('http') ? githubData.blog : `https://${githubData.blog}`;
        
        if (blogUrl.includes('facebook.com') || blogUrl.includes('fb.com')) {
            const facebookLink = document.querySelector('a[title="Facebook"]');
            if (facebookLink && !socialLinks?.facebook) {
                facebookLink.href = blogUrl;
            }
        } else if (blogUrl.includes('instagram.com')) {
            const instagramLink = document.querySelector('a[title="Instagram"]');
            if (instagramLink && !socialLinks?.instagram) {
                instagramLink.href = blogUrl;
            }
        } else if (blogUrl.includes('linkedin.com')) {
            const linkedinLink = document.querySelector('a[title="LinkedIn"]');
            if (linkedinLink && !socialLinks?.linkedin) {
                linkedinLink.href = blogUrl;
            }
        }
    }
}

// Update footer year dynamically
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Load GitHub contribution graph
function loadGitHubContributionGraph() {
    const graphImage = document.getElementById('githubContributionGraph');
    if (!graphImage) return;
    
    // Try multiple services for reliability
    const graphServices = [
        'https://ghchart.rshah.org/basirulakhlakborno',
        'https://github-readme-activity-graph.vercel.app/graph?username=basirulakhlakborno&theme=default&hide_border=true&bg_color=ffffff&color=000000&line=000000&point=000000'
    ];
    
    let currentServiceIndex = 0;
    
    const tryNextService = () => {
        if (currentServiceIndex < graphServices.length - 1) {
            currentServiceIndex++;
            graphImage.src = graphServices[currentServiceIndex];
        } else {
            // If all services fail, show a message
            const container = graphImage.parentElement;
            if (container) {
                container.innerHTML = `
                    <p style="text-align: center; color: var(--text-gray); padding: 2rem;">
                        <i class="fab fa-github" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                        Unable to load contribution graph.<br>
                        <a href="https://github.com/basirulakhlakborno" target="_blank" style="color: var(--primary-black); text-decoration: underline; margin-top: 0.5rem; display: inline-block;">
                            View on GitHub
                        </a>
                    </p>
                `;
            }
        }
    };
    
    graphImage.onerror = () => {
        tryNextService();
    };
    
    // Set initial source (already set in HTML, but ensure it's loaded)
    graphImage.src = graphServices[0];
}

// Load GitHub profile when page loads
window.addEventListener('load', () => {
    updateFooterYear();
    loadGitHubProfile();
    loadGitHubProjects();
    loadGitHubContributionGraph();
    
    // Refresh profile every 5 minutes (optional)
    setInterval(loadGitHubProfile, 300000);
});

// Add pulse animation for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// Manual Projects - Projects not on GitHub or to be featured prominently
const manualProjects = [
    {
        name: 'Bazaar E-Commerce',
        description: 'A modern e-commerce platform with featured products, categories, promotional banners, and discount offers. Clean and minimalist design with orange and black accents. Built with modern web technologies.',
        url: 'https://basirulakhlak.tech/bazaar-ecommerce/',
        image: 'assets/ebazar.jpg',
        languages: {
            'JavaScript': 40,
            'HTML': 30,
            'CSS': 20,
            'TypeScript': 10
        },
        primaryLanguage: 'JavaScript'
    },
    {
        name: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with product listings, categories, flash sales, shopping cart, and user authentication. Built with modern web technologies and deployed on Cloudflare Workers.',
        url: 'https://ecom.basirulakhlak.workers.dev/',
        image: 'assets/ecom.jpg',
        languages: {
            'JavaScript': 40,
            'HTML': 30,
            'CSS': 20,
            'TypeScript': 10
        },
        primaryLanguage: 'JavaScript'
    }
];

// Create manual project card
function createManualProjectCard(project) {
    try {
        const card = document.createElement('div');
        card.className = 'skill-card';
        
        const primaryIconClass = getLanguageIcon(project.primaryLanguage || 'JavaScript');
        
        // Build language tags
        const sortedLanguages = Object.entries(project.languages || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        const languageTags = sortedLanguages
            .map(([lang]) => {
                const iconClass = getLanguageIcon(lang);
                return `
                    <span class="skill-tag">
                        <i class="${iconClass}"></i>
                        ${lang}
                    </span>
                `;
            }).join('');
        
        const projectName = (project.name || 'Project').toUpperCase();
        const description = project.description || 'No description available.';
        const truncatedDescription = description.length > 100 
            ? description.substring(0, 100) + '...' 
            : description;
        
        // Use image if provided, otherwise use icon
        const iconWrapper = project.image 
            ? `<div class="skill-icon-wrapper project-image-wrapper">
                <img src="${project.image}" alt="${projectName}" class="project-image">
               </div>`
            : `<div class="skill-icon-wrapper">
                <i class="${primaryIconClass} colored"></i>
               </div>`;
        
        card.innerHTML = `
            ${iconWrapper}
            <h3>${projectName}</h3>
            <p class="project-description">${truncatedDescription}</p>
            <div class="skill-list">
                ${languageTags}
            </div>
        `;
        
        // Make card clickable
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            if (project.url) {
                window.open(project.url, '_blank');
            }
        });
        
        return card;
    } catch (error) {
        console.error('Error creating manual project card:', error, project);
        // Return a basic card even if there's an error
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-icon-wrapper">
                <i class="devicon-javascript-plain colored"></i>
            </div>
            <h3>${(project.name || 'Project').toUpperCase()}</h3>
            <p class="project-description">${project.description || 'No description available.'}</p>
        `;
        if (project.url) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open(project.url, '_blank');
            });
        }
        return card;
    }
}

// Load Projects (Hardcoded)
function loadGitHubProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectsLoading = document.getElementById('projectsLoading');
    
    if (!projectsGrid) return;
    
    // Hide loading and clear grid first
    if (projectsLoading) {
        projectsLoading.style.display = 'none';
    }
    projectsGrid.innerHTML = '';
    
    // Add manual projects
    if (manualProjects && manualProjects.length > 0) {
        manualProjects.forEach((project, index) => {
            try {
                const card = createManualProjectCard(project);
                if (card) {
                    projectsGrid.appendChild(card);
                    // Apply fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 + (index * 50));
                }
            } catch (error) {
                console.error('Error creating manual project card:', error, project);
                // Create a fallback card
                const fallbackCard = document.createElement('div');
                fallbackCard.className = 'skill-card';
                const fallbackIcon = project.image 
                    ? `<div class="skill-icon-wrapper project-image-wrapper">
                        <img src="${project.image}" alt="${(project.name || 'Project').toUpperCase()}" class="project-image">
                       </div>`
                    : `<div class="skill-icon-wrapper">
                        <i class="devicon-javascript-plain colored"></i>
                       </div>`;
                fallbackCard.innerHTML = `
                    ${fallbackIcon}
                    <h3>${(project.name || 'Project').toUpperCase()}</h3>
                    <p class="project-description">${project.description || 'No description available.'}</p>
                    <div class="skill-list">
                        <span class="skill-tag"><i class="devicon-javascript-plain"></i> JavaScript</span>
                        <span class="skill-tag"><i class="devicon-html5-plain"></i> HTML</span>
                        <span class="skill-tag"><i class="devicon-css3-plain"></i> CSS</span>
                    </div>
                `;
                if (project.url) {
                    fallbackCard.style.cursor = 'pointer';
                    fallbackCard.addEventListener('click', () => {
                        window.open(project.url, '_blank');
                    });
                }
                projectsGrid.appendChild(fallbackCard);
                fallbackCard.style.opacity = '0';
                fallbackCard.style.transform = 'translateY(30px)';
                fallbackCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    fallbackCard.style.opacity = '1';
                    fallbackCard.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
            }
        });
    } else {
        projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 3rem;">No projects found.</p>';
    }
}

// Fetch languages for a specific repository
async function fetchRepoLanguages(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
        if (!response.ok) {
            return {};
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching languages for ${repo}:`, error);
        return {};
    }
}

// Get language icon class from Devicons
function getLanguageIcon(language) {
    const iconMap = {
        'JavaScript': 'devicon-javascript-plain',
        'TypeScript': 'devicon-typescript-plain',
        'Python': 'devicon-python-plain',
        'Java': 'devicon-java-plain',
        'C++': 'devicon-cplusplus-plain',
        'C': 'devicon-c-plain',
        'C#': 'devicon-csharp-plain',
        'PHP': 'devicon-php-plain',
        'Ruby': 'devicon-ruby-plain',
        'Go': 'devicon-go-plain',
        'Rust': 'devicon-rust-plain',
        'Swift': 'devicon-swift-plain',
        'Kotlin': 'devicon-kotlin-plain',
        'Dart': 'devicon-dart-plain',
        'HTML': 'devicon-html5-plain',
        'CSS': 'devicon-css3-plain',
        'SCSS': 'devicon-sass-original',
        'Sass': 'devicon-sass-original',
        'Less': 'devicon-less-plain-wordmark',
        'Vue': 'devicon-vuejs-plain',
        'React': 'devicon-react-original',
        'Angular': 'devicon-angularjs-plain',
        'Node.js': 'devicon-nodejs-plain',
        'Express': 'devicon-express-original',
        'Django': 'devicon-django-plain',
        'Flask': 'devicon-flask-original',
        'Laravel': 'devicon-laravel-plain',
        'Spring': 'devicon-spring-plain',
        'Docker': 'devicon-docker-plain',
        'Kubernetes': 'devicon-kubernetes-plain',
        'MongoDB': 'devicon-mongodb-plain',
        'PostgreSQL': 'devicon-postgresql-plain',
        'MySQL': 'devicon-mysql-plain',
        'Redis': 'devicon-redis-plain',
        'GraphQL': 'devicon-graphql-plain',
        'Jest': 'devicon-jest-plain',
        'Webpack': 'devicon-webpack-plain',
        'Babel': 'devicon-babel-plain',
        'Git': 'devicon-git-plain',
        'GitHub': 'devicon-github-original',
        'GitLab': 'devicon-gitlab-plain',
        'Bitbucket': 'devicon-bitbucket-plain',
        'Linux': 'devicon-linux-plain',
        'Ubuntu': 'devicon-ubuntu-plain',
        'AWS': 'devicon-amazonwebservices-plain',
        'Azure': 'devicon-azure-plain',
        'Google Cloud': 'devicon-googlecloud-plain',
        'Firebase': 'devicon-firebase-plain',
        'Heroku': 'devicon-heroku-plain',
        'Nginx': 'devicon-nginx-original',
        'Apache': 'devicon-apache-plain',
        'Bash': 'devicon-bash-plain',
        'Shell': 'devicon-bash-plain',
        'Markdown': 'devicon-markdown-original',
        'JSON': 'devicon-json-plain',
        'YAML': 'devicon-yaml-plain',
        'XML': 'devicon-xml-plain',
        'SVG': 'devicon-svg-plain',
        'Jupyter': 'devicon-jupyter-plain',
        'TensorFlow': 'devicon-tensorflow-original',
        'PyTorch': 'devicon-pytorch-original',
        'R': 'devicon-r-original',
        'MATLAB': 'devicon-matlab-plain',
        'Arduino': 'devicon-arduino-plain',
        'Raspberry Pi': 'devicon-raspberrypi-line',
        'Electron': 'devicon-electron-original',
        'Ionic': 'devicon-ionic-original',
        'Cordova': 'devicon-cordova-plain',
        'Xamarin': 'devicon-xamarin-original',
        'Flutter': 'devicon-flutter-plain',
        'React Native': 'devicon-react-original',
        'Vue.js': 'devicon-vuejs-plain',
        'Svelte': 'devicon-svelte-plain',
        'Next.js': 'devicon-nextjs-original',
        'Nuxt.js': 'devicon-nuxtjs-plain',
        'Gatsby': 'devicon-gatsby-plain',
        'Vite': 'devicon-vitejs-plain',
        'Tailwind CSS': 'devicon-tailwindcss-plain',
        'Bootstrap': 'devicon-bootstrap-plain',
        'Material-UI': 'devicon-materialui-plain',
        'Bulma': 'devicon-bulma-plain',
        'Foundation': 'devicon-foundation-plain',
        'Semantic UI': 'devicon-semanticui-plain',
        'jQuery': 'devicon-jquery-plain',
        'D3.js': 'devicon-d3js-plain',
        'Three.js': 'devicon-threejs-original',
        'Unity': 'devicon-unity-original',
        'Unreal Engine': 'devicon-unrealengine-original',
        'Blender': 'devicon-blender-original',
        'Figma': 'devicon-figma-plain',
        'Adobe XD': 'devicon-xd-plain',
        'Photoshop': 'devicon-photoshop-plain',
        'Illustrator': 'devicon-illustrator-plain',
        'InDesign': 'devicon-indesign-plain',
        'Premiere Pro': 'devicon-premierepro-plain',
        'After Effects': 'devicon-aftereffects-plain',
        'Sketch': 'devicon-sketch-line',
        'InVision': 'devicon-invision-original',
        'Zeplin': 'devicon-zeplin-plain',
        'Confluence': 'devicon-confluence-original',
        'Jira': 'devicon-jira-plain',
        'Slack': 'devicon-slack-plain',
        'Trello': 'devicon-trello-plain',
        'Asana': 'devicon-asana-original',
        'Notion': 'devicon-notion-original',
        'VSCode': 'devicon-vscode-plain',
        'IntelliJ IDEA': 'devicon-intellij-plain',
        'WebStorm': 'devicon-webstorm-plain',
        'PyCharm': 'devicon-pycharm-plain',
        'Android Studio': 'devicon-androidstudio-plain',
        'Xcode': 'devicon-xcode-plain',
        'Sublime Text': 'devicon-sublime-text-original',
        'Atom': 'devicon-atom-original',
        'Vim': 'devicon-vim-plain',
        'Emacs': 'devicon-emacs-original',
        'Nano': 'devicon-nano-original',
        'Zsh': 'devicon-zsh-plain',
        'Fish': 'devicon-fish-original',
        'PowerShell': 'devicon-powershell-plain',
        'Windows': 'devicon-windows8-original',
        'macOS': 'devicon-apple-original',
        'iOS': 'devicon-apple-original',
        'Android': 'devicon-android-plain',
        'Chrome': 'devicon-chrome-plain',
        'Firefox': 'devicon-firefox-plain',
        'Safari': 'devicon-safari-plain',
        'Edge': 'devicon-edge-plain',
        'Opera': 'devicon-opera-plain',
        'Brave': 'devicon-brave-original',
        'Vivaldi': 'devicon-vivaldi-original',
        'Tor': 'devicon-tor-original',
        'Tails': 'devicon-tails-original',
        'Kali Linux': 'devicon-kalilinux-plain',
        'Debian': 'devicon-debian-plain',
        'CentOS': 'devicon-centos-plain',
        'Red Hat': 'devicon-redhat-plain',
        'Fedora': 'devicon-fedora-plain',
        'Arch Linux': 'devicon-archlinux-plain',
        'Gentoo': 'devicon-gentoo-plain',
        'OpenSUSE': 'devicon-opensuse-original',
        'SUSE': 'devicon-suse-original',
        'Mint': 'devicon-linux-mint-original',
        'Elementary OS': 'devicon-elementary-original',
        'Zorin OS': 'devicon-zorin-original',
        'Pop!_OS': 'devicon-popos-original',
        'Manjaro': 'devicon-manjaro-original',
        'MX Linux': 'devicon-mxlinux-original',
        'Deepin': 'devicon-deepin-original',
        'Solus': 'devicon-solus-original',
        'Trisquel': 'devicon-trisquel-original',
        'Tails': 'devicon-tails-original',
        'Parrot OS': 'devicon-parrot-original',
        'BlackArch': 'devicon-blackarch-original',
        'BackBox': 'devicon-backbox-original',
        'Bugtraq': 'devicon-bugtraq-original',
        'CAINE': 'devicon-caine-original',
        'Cyborg': 'devicon-cyborg-original',
        'DEFT': 'devicon-deft-original',
        'DracOS': 'devicon-dracos-original',
        'Matriux': 'devicon-matriux-original',
        'Network Security Toolkit': 'devicon-nst-original',
        'NodeOS': 'devicon-nodeos-original',
        'Pentoo': 'devicon-pentoo-original',
        'SamuraiWTF': 'devicon-samurai-original',
        'Security Onion': 'devicon-securityonion-original',
        'Wifislax': 'devicon-wifislax-original',
        'WiFi Pineapple': 'devicon-wifipineapple-original',
        'Wireshark': 'devicon-wireshark-original',
        'Yersinia': 'devicon-yersinia-original',
        'Zentyal': 'devicon-zentyal-original'
    };
    
    return iconMap[language] || 'devicon-git-plain';
}

// Create project card element - styled like skill cards
function createProjectCard(repo, languages) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    
    // Get all languages sorted by usage
    const sortedLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1]);
    
    // Skip if no languages at all
    if (sortedLanguages.length === 0) {
        return null;
    }
    
    const primaryLanguage = sortedLanguages[0][0];
    const primaryIconClass = getLanguageIcon(primaryLanguage);
    
    // Build language tags (top 5 languages - show all languages including HTML, CSS, JS, etc.)
    const languageTags = sortedLanguages
        .slice(0, 5)
        .map(([lang]) => {
            const iconClass = getLanguageIcon(lang);
            return `
                <span class="skill-tag">
                    <i class="${iconClass}"></i>
                    ${lang}
                </span>
            `;
        }).join('');
    
    // Format project name (convert kebab-case to Title Case)
    const projectName = repo.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .toUpperCase();
    
    // Format description (truncate if too long)
    const description = repo.description || 'No description available.';
    const truncatedDescription = description.length > 100 
        ? description.substring(0, 100) + '...' 
        : description;
    
    card.innerHTML = `
        <div class="skill-icon-wrapper">
            <i class="${primaryIconClass} colored"></i>
        </div>
        <h3>${projectName}</h3>
        <p class="project-description">${truncatedDescription}</p>
        <div class="skill-list">
            ${languageTags}
        </div>
    `;
    
    // Make card clickable
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        window.open(repo.html_url, '_blank');
    });
    
    return card;
}

