function getNavbarHTML() {
    const currentPath = window.location.pathname; // Get the current path

    const isActive = (path) => currentPath.startsWith(path) ? 'active' : '';

  