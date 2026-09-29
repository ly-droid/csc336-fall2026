// The room ids are the keys of one object. Every route has a return route.
// Exit objects add readable labels while keeping the destination id separate.
const rooms = {
    dock: {
        name: "The Stone Jetty",
        number: "01",
        description: "Your boat knocks against the jetty. Above the cliff, the lighthouse is dark. Somewhere beyond the fog, a ferry sounds its horn. You know these waters: without the beacon, it will never find the harbor.",
        linkedRooms: [{ label: "Follow the cliff path", destination: "courtyard" }],
        items: []
    },
    courtyard: {
        name: "The Keeper’s Courtyard",
        number: "02",
        description: "Salt grass grows between the paving stones. A workshop and a supply shed flank the lighthouse. Beside its brass-locked door, a weathered sign reads: ‘Spare key in the workshop. Lens in the chart room. Lamp oil in the shed.’",
        linkedRooms: [
            { label: "Walk down to the jetty", destination: "dock" },
            { label: "Enter the workshop", destination: "workshop" },
            { label: "Check the supply shed", destination: "shed" },
            { label: "Visit the chart room", destination: "chartRoom" },
            { label: "Climb to the lantern room", destination: "lanternRoom", requiredItem: "key" }
        ],
        items: []
    },
    workshop: {
        name: "The Quiet Workshop",
        number: "03",
        description: "A half-repaired clock waits on the workbench. Above it, the keeper has arranged every tool in a careful outline. A brass key hangs from a hook labeled ‘LANTERN ROOM.’ Nothing here has been touched since the storm.",
        emptyDescription: "The brass key’s hook is empty now. The half-repaired clock waits on the workbench, its hands frozen just before midnight. Outside, the wind rattles the courtyard gate.",
        linkedRooms: [{ label: "Return to the courtyard", destination: "courtyard" }],
        items: ["key"]
    },
    shed: {
        name: "The Supply Shed",
        number: "04",
        description: "Coils of rope and old life jackets crowd the shelves. Under a folded sail, you find a sealed tin of lamp oil. A note on the lid says, ‘One full reservoir. Enough to see them home.’",
        emptyDescription: "You have taken the last tin of lamp oil. Only ropes, life jackets, and a folded sail remain on the shelves. The empty space feels like a promise you need to keep.",
        linkedRooms: [{ label: "Return to the courtyard", destination: "courtyard" }],
        items: ["oil"]
    },
    chartRoom: {
        name: "The Chart Room",
        number: "05",
        description: "Sea charts cover a long oak table, their corners held down with smooth stones. A replacement lens rests in a felt-lined box. The keeper’s log lies open beside it: ‘Fit the lens, fill the lamp, then light the beacon.’",
        emptyDescription: "The lens box is empty. On the table, a penciled route threads between the rocks into the harbor. The keeper’s log still reads: ‘Fit the lens, fill the lamp, then light the beacon.’",
        linkedRooms: [{ label: "Return to the courtyard", destination: "courtyard" }],
        items: ["lens"]
    },
    lanternRoom: {
        name: "The Lantern Room",
        number: "06",
        description: "The spiral stairs end inside a circle of rain-streaked windows. In the center stands the great lamp: its reservoir is empty and its lens cradle is bare. A flint striker waits beside it. Use your supplies here to bring the light back.",
        linkedRooms: [{ label: "Descend to the courtyard", destination: "courtyard" }],
        items: []
    }
};

const items = {
    key: { name: "Brass key", description: "The brass key opens the lantern room door in the courtyard." },
    oil: { name: "Lamp oil", description: "A sealed tin of oil for the lamp in the lantern room." },
    lens: { name: "Glass lens", description: "A replacement lens for the cradle in the lantern room." }
};

const game = document.querySelector("#game");
let currentRoom = rooms.dock;
let inventory = [];
let oilAdded = false;
let lensFitted = false;
let beaconLit = false;
let message = "The ferry is waiting. Explore the island and restore the beacon.";

// A plain loop checks the inventory, including when the door checks for its key.
function hasItem(itemId) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === itemId) {
            return true;
        }
    }
    return false;
}

// All exit buttons share this handler. The clicked button's id is a room id.
function navigate(e) {
    for (let i = 0; i < currentRoom.linkedRooms.length; i++) {
        let exit = currentRoom.linkedRooms[i];
        if (exit.destination === e.target.id) {
            if (exit.requiredItem && !hasItem(exit.requiredItem)) {
                message = "The lantern room is locked. Look for the brass key in the workshop.";
            } else {
                currentRoom = rooms[exit.destination];
                message = "You arrive at " + currentRoom.name + ".";
                if (exit.requiredItem) {
                    message = "The brass key turns in the lock. You climb the spiral stairs.";
                }
            }
            render(currentRoom);
            return;
        }
    }
}

function pickUp(e) {
    let itemId = e.target.id;
    if (!hasItem(itemId)) {
        inventory.push(itemId);
        currentRoom.description = currentRoom.emptyDescription;
        message = "You picked up the " + items[itemId].name + ". " + items[itemId].description;
    }
    render(currentRoom);
}

// Using supplies changes the room's actual description, so it persists on return.
function useItem(e) {
    let itemId = e.target.id;
    message = items[itemId].description;
    if (itemId === "key" && currentRoom === rooms.courtyard) {
        message = "The brass key fits the door. You can now climb to the lantern room.";
    } else if (itemId === "oil" || itemId === "lens") {
        if (currentRoom !== rooms.lanternRoom) {
            message = "There is nothing here to use that on. " + items[itemId].description;
        } else if (itemId === "oil") {
            if (oilAdded) {
                message = "The tin is empty. You have already filled the lamp.";
            } else {
                oilAdded = true;
                message = "You pour the oil into the reservoir. The dry wick slowly darkens.";
            }
        } else {
            if (lensFitted) {
                message = "The lens is already fitted securely in its cradle.";
            } else {
                lensFitted = true;
                message = "You settle the glass lens into its cradle. It clicks into place.";
            }
        }
        if (currentRoom === rooms.lanternRoom && !beaconLit) {
            if (oilAdded && lensFitted) {
                currentRoom.description = "The reservoir is full and the glass lens sits securely in its cradle. Everything is ready. Beyond the windows, the ferry sounds its horn again. All that remains is to strike a spark.";
            } else if (oilAdded) {
                currentRoom.description = "The lamp’s reservoir is full of oil, but its lens cradle is still bare. The replacement lens from the chart room will focus the light through the fog.";
            } else if (lensFitted) {
                currentRoom.description = "The glass lens is fitted in its cradle, but the lamp’s reservoir is still empty. The oil from the supply shed will feed the wick.";
            }
        }
    }
    render(currentRoom);
}

function lightBeacon() {
    if (oilAdded && lensFitted) {
        beaconLit = true;
        rooms.lanternRoom.description = "A spark catches the wick. Golden light fills the lens and reaches across the black water. Far below, the ferry answers with two short blasts. You watch it turn safely toward the harbor.";
        rooms.dock.description = "The ferry rests safely beside the jetty. Warm cabin windows glow through the thinning fog, and above the cliff the lighthouse shines again. Everyone made it home.";
        message = "The beacon is burning. The ferry has found its way home.";
    } else {
        message = "The lamp needs both oil and its glass lens. Pick them up, then click each in your inventory while you are here.";
    }
    render(currentRoom);
}

// One render function builds every visible part of the game inside one container.
function render(room) {
    game.innerHTML = "";

    let masthead = document.createElement("div");
    masthead.className = "masthead";
    let titleBlock = document.createElement("div");
    let eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.innerHTML = "A small island. One unfinished task.";
    let title = document.createElement("h1");
    title.innerHTML = "The Last Light";
    titleBlock.append(eyebrow, title);
    let badge = document.createElement("span");
    badge.className = "badge";
    badge.innerHTML = "BEACON / DARK";
    if (beaconLit) {
        badge.innerHTML = "BEACON / LIT";
    }
    masthead.append(titleBlock, badge);

    let intro = document.createElement("p");
    intro.className = "intro";
    intro.innerHTML = "The storm has passed. The light has not returned. Search the keeper’s island and guide the last ferry home.";
    game.append(masthead, intro);

    let layout = document.createElement("div");
    layout.className = "layout";
    let roomCard = document.createElement("div");
    roomCard.className = "room-card";
    let roomNumber = document.createElement("p");
    roomNumber.className = "eyebrow";
    roomNumber.innerHTML = "Location " + room.number + " / 06";
    let roomTitle = document.createElement("h2");
    roomTitle.innerHTML = room.name;
    let description = document.createElement("p");
    description.className = "room-description";
    description.innerHTML = room.description;
    roomCard.append(roomNumber, roomTitle, description);

    let actions = document.createElement("div");
    actions.className = "actions";
    for (let i = 0; i < room.items.length; i++) {
        let itemId = room.items[i];
        if (!hasItem(itemId)) {
            let pickup = document.createElement("button");
            pickup.className = "primary";
            pickup.id = itemId;
            pickup.innerHTML = "Pick up " + items[itemId].name;
            pickup.addEventListener("click", pickUp);
            actions.append(pickup);
        }
    }
    if (room === rooms.lanternRoom && !beaconLit) {
        let lightButton = document.createElement("button");
        lightButton.className = "primary";
        lightButton.innerHTML = "Light the beacon";
        lightButton.addEventListener("click", lightBeacon);
        actions.append(lightButton);
    }
    roomCard.append(actions);

    let status = document.createElement("p");
    status.className = "status";
    status.innerHTML = message;
    roomCard.append(status);

    if (beaconLit) {
        let ending = document.createElement("div");
        ending.className = "ending";
        let endingTitle = document.createElement("h3");
        endingTitle.innerHTML = "A light to come home to.";
        let endingText = document.createElement("p");
        endingText.className = "hint";
        endingText.innerHTML = "Adventure complete. You brought the ferry safely home. You can keep exploring, or return to the jetty to see it arrive.";
        ending.append(endingTitle, endingText);
        roomCard.append(ending);
    }

    let exitsTitle = document.createElement("h3");
    exitsTitle.innerHTML = "Where next?";
    let exits = document.createElement("div");
    exits.className = "exits";
    for (let i = 0; i < room.linkedRooms.length; i++) {
        let exit = room.linkedRooms[i];
        let button = document.createElement("button");
        button.id = exit.destination;
        button.innerHTML = exit.label;
        if (exit.requiredItem) {
            button.classList.add("locked");
            if (hasItem(exit.requiredItem)) {
                button.classList.remove("locked");
            } else {
                button.innerHTML = exit.label + " · Locked";
            }
        }
        button.addEventListener("click", navigate);
        exits.append(button);
    }
    roomCard.append(exitsTitle, exits);

    let sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    let objective = document.createElement("div");
    objective.className = "panel";
    let objectiveTitle = document.createElement("h3");
    objectiveTitle.innerHTML = "Restore the light";
    let checklist = document.createElement("ul");
    let steps = ["Find the brass key", "Fit the glass lens upstairs", "Fill the lamp upstairs", "Light the beacon"];
    let completed = [hasItem("key"), lensFitted, oilAdded, beaconLit];
    for (let i = 0; i < steps.length; i++) {
        let step = document.createElement("li");
        step.innerHTML = steps[i];
        if (completed[i]) {
            step.innerHTML = steps[i] + " — done";
        }
        checklist.append(step);
    }
    objective.append(objectiveTitle, checklist);

    let inventoryPanel = document.createElement("div");
    inventoryPanel.className = "panel";
    let inventoryTitle = document.createElement("h3");
    inventoryTitle.innerHTML = "Your inventory / " + inventory.length;
    let inventoryHint = document.createElement("p");
    inventoryHint.className = "hint";
    inventoryHint.innerHTML = "Travel with the buttons. Pick up useful objects, then click an inventory item to use it in your current location.";
    inventoryPanel.append(inventoryTitle, inventoryHint);
    let inventoryList = document.createElement("ul");
    inventoryList.className = "inventory-list";
    for (let i = 0; i < inventory.length; i++) {
        let itemId = inventory[i];
        let entry = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.className = "item-button";
        itemButton.id = itemId;
        itemButton.innerHTML = items[itemId].name;
        if (itemId === "oil" && oilAdded) {
            itemButton.innerHTML = "Lamp oil · empty tin";
        }
        if (itemId === "lens" && lensFitted) {
            itemButton.innerHTML = "Glass lens · installed";
        }
        itemButton.addEventListener("click", useItem);
        entry.append(itemButton);
        inventoryList.append(entry);
    }
    if (inventory.length === 0) {
        let empty = document.createElement("li");
        empty.innerHTML = "Your pockets are empty. Every journey starts somewhere.";
        inventoryList.append(empty);
    }
    inventoryPanel.append(inventoryList);
    sidebar.append(objective, inventoryPanel);
    layout.append(roomCard, sidebar);
    let footer = document.createElement("p");
    footer.className = "footer";
    footer.innerHTML = "THE LAST LIGHT / A TEXT ADVENTURE / SIX PLACES TO EXPLORE";
    game.append(layout, footer);
}

render(currentRoom);
