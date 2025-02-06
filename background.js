//Handel Toolbar icon on click
browser.browserAction.onClicked.addListener(handleToolbar);

async function handleToolbar() {
        browser.sidebarAction.open()
};

