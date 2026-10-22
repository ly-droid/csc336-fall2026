let roomRootDiv = document.querySelector("#roomRoot");

let rooms = {
    entrance: {
        name: "School Entrance",
        description: "You are at the entrance of the school.",
        linkedRooms: [
            { label: "Go to Hallway", destination: "hallway" }
        ]
    },

    hallway: {
        name: "Hallway",
        description: "There are several rooms.",
        linkedRooms: [
            { label: "Go to Entrance", destination: "entrance" },
            { label: "Go to Classroom", destination: "classroom" },
            { label: "Go to Library", destination: "library" }
        ]
    },

    classroom: {
        name: "Classroom",
        description: "Many desks and chairs in the classroom.",
        linkedRooms: [
            { label: "Go to Hallway", destination: "hallway" }
        ]
    },

    library: {
        name: "Library",
        description: "Many books on the shelves.",
        linkedRooms: [
            { label: "Go to Hallway", destination: "hallway" }
        ]
    }
};

let currentRoom = rooms["entrance"];

function navButtonClicked(e) {
    currentRoom = rooms[e.target.value];
    visualizeRoom(currentRoom);

}

// Display the current room
function visualizeRoom(room) {
    roomRootDiv.innerHTML = "";

    let roomTitle = document.createElement("h1");
    roomTitle.innerHTML = room.name;
    roomRootDiv.append(roomTitle);

    let descriptionP = document.createElement("p");
    descriptionP.innerHTML = room.description;
    roomRootDiv.append(descriptionP);

    for (let i = 0; i < room.linkedRooms.length; i++) {
        let navButton = document.createElement("button");
        navButton.innerHTML = room.linkedRooms[i].label;
        navButton.value = room.linkedRooms[i].destination;
        navButton.addEventListener("click", navButtonClicked);
        roomRootDiv.append(navButton);
    }
}

visualizeRoom(currentRoom);