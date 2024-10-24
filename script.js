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