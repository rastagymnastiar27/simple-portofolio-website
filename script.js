document.addEventListener("DOMContentLoaded", () => {

    // 2. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.querySelector('.navbar-toggler').addEventListener('click', function() {
    const navbarNav = document.querySelector('.navbar nav');
    
    // If the navbar is currently shown
    if (navbarNav.classList.contains('show')) {
        // Start closing the navbar
        navbarNav.classList.remove('show');
        
        // Wait for the CSS transition to complete before hiding
        setTimeout(() => {
            navbarNav.style.visibility = 'hidden'; // Hide after animation
            navbarNav.style.pointerEvents = 'none'; // Disable pointer events
        }, 300); // Match this duration with the CSS transition time
    } else {
        // If it is hidden, show it immediately
        navbarNav.style.visibility = 'visible'; // Make visible first
        navbarNav.classList.add('show'); // Add class to show
        navbarNav.style.pointerEvents = 'auto'; // Enable pointer events
    }
});

// Set up Intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up-scale'); // Trigger animation
        }
    });
}, { threshold: 0.1 }); // Start animation when 10% of element is visible

// Select all target elements for observation
const elementsToObserve = document.querySelectorAll(`
    .navbar, .navbar a, .navbar-toggler, .left-section, .left-section h1, .left-section h2, 
    .left-section h3, .left-section button, .right-section img, .details h3, .details p, 
    .section, .section-title, .section-content-about, .task-section div, section-content-skill, 
    .skills-section div, .divider, .portofolio-title, .page a, .portfolio .content .item, .portfolio 
    .certificate-content .item, .show-more button, .portofolio-footer h2, .contact-form input, .contact-form textarea, 
    .social-media ul li a, #learning, #other-skills, .contact-form .submit, .back-home, .credit
`);

elementsToObserve.forEach(element => {
    element.classList.add('hidden'); // Initially hidden for all except logo
    observer.observe(element); // Observe each element
});


function showSection(section) {
    // Get references to the sections
    var certificateSection = document.getElementById('certificate-section');
    var projectSection = document.getElementById('project-section');

    // Determine which section is currently visible
    var activeSection = certificateSection.style.display !== 'none' ? certificateSection : projectSection;

    // Add slide-out class to the active section
    if (activeSection === certificateSection) {
        activeSection.classList.add('slide-out-left');
    } else {
        activeSection.classList.add('slide-out-right');
    }

    // Remove the display property after the animation completes
    setTimeout(() => {
        // Hide the current section
        activeSection.style.display = 'none';
        activeSection.classList.remove('slide-out-left', 'slide-out-right');

        // Show the requested section
        var newSection = document.getElementById(section);
        newSection.style.display = 'flex';

        // Reset the "Show More" button for the new section
        resetShowMoreButton(section);

        // Add slide-in class based on the section being shown
        if (section === 'certificate-section') {
            newSection.classList.add('slide-in-left');
        } else {
            newSection.classList.add('slide-in-right');
        }

        // Remove the slide-in class after the animation completes
        setTimeout(() => {
            newSection.classList.remove('slide-in-left', 'slide-in-right');
        }, 300); // Adjust this time to match the transition duration
    }, 300); // This should match the duration of the slide-out transition

    // Remove 'active' class from both links
    document.getElementById('certificateLink').classList.remove('active');
    document.getElementById('projectLink').classList.remove('active');

    // Add 'active' class to the current section's link
    if (section === 'certificate-section') {
        document.getElementById('certificateLink').classList.add('active');
    } else if (section === 'project-section') {
        document.getElementById('projectLink').classList.add('active');
    }
}

function toggleShowMoreActiveSection() {
    // Determine the current active section based on visibility
    var activeSection = document.getElementById('certificate-section').style.display !== 'none' 
        ? 'certificate-section' 
        : 'project-section';

    toggleShowMore(activeSection);
}

function toggleShowMore(section) {
    var items = document.querySelectorAll('#' + section + ' .item');
    var button = document.getElementById('showMoreButton');

    // Determine the number of currently visible items
    var currentVisible = Array.from(items).filter(item => item.style.display !== 'none').length;

    if (button.getAttribute('data-expanded') === 'true') {
        // Collapse to show only the first 6 items
        for (var i = 6; i < items.length; i++) {
            items[i].style.display = 'none';
        }
        button.innerHTML = '<i class="fas fa-arrow-down"></i> Show More';
        button.setAttribute('data-expanded', 'false');
    } else {
        // Expand to show all items
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'block';
        }
        button.innerHTML = '<i class="fas fa-arrow-up"></i> Show Less';
        button.setAttribute('data-expanded', 'true');
    }
}

function resetShowMoreButton(section) {
    var button = document.getElementById('showMoreButton');
    button.innerHTML = '<i class="fas fa-arrow-down"></i> Show More';
    button.setAttribute('data-expanded', 'false');

    // Collapse items in the new section
    collapseItems(section);
}

function collapseItems(section) {
    var items = document.querySelectorAll('#' + section + ' .item');
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = (i < 6) ? 'block' : 'none'; // Show only the first 6 items
    }
}

// Ensure the default state is showing the first 6 items on page load
window.onload = function() {
    collapseItems('certificate-section');
    collapseItems('project-section');
    document.getElementById('showMoreButton').setAttribute('data-expanded', 'false');
};