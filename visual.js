(function () {
    var isNotepadOpen = false;
    var intervalId;
    var calculatorContainer = createCalculatorContainer();
    var notepadContainer = createNotepadContainer();
    var isCalculatorOpen = false;
    var isGameOpen = false;
    var isDraggingCalculator = false;
    var isDraggingNotepad = false;
    var isDraggingMenu = false;
    var offsetXMenu, offsetYMenu;
    var offsetXCalculator, offsetYCalculator;
    var offsetXNotepad, offsetYNotepad;
    var notepadButton = createNotepadButton();
    var openCloseButton = createOpenCloseButton();
    var menuContainer = createMenuContainer();
    var gameButton = createGameButton();
    var dateTimeContainer = createDateTimeContainer();
    var box = createBox();
    var containerG = createGameContainer();

    document.body.appendChild(box);
    document.body.appendChild(containerG);
    document.body.appendChild(menuContainer);
    document.body.appendChild(calculatorContainer);
    document.body.appendChild(notepadContainer);
    menuContainer.appendChild(openCloseButton);
    menuContainer.appendChild(gameButton);
    menuContainer.appendChild(dateTimeContainer);

    var gameInterval;
    var obstacles = [];
    var powerups = [];

    function startGame() {
        clearInterval(gameInterval);
        removeObstacles();
        removePowerups();
        resetGame();
        gameInterval = setInterval(updateGame, 20);
        gameButton.textContent = "Close Game";
    }

    function stopGame() {
        clearInterval(gameInterval);
        removeObstacles();
        removePowerups();
        gameButton.textContent = "Open Game";
    }
    
    function toggleGameContainer() {
        if (isGameOpen) {
            containerG.style.display = "none";
            stopGame();
            resetGame();
        } else {
            containerG.style.display = "block";
            startGame();
        }
        isGameOpen = !isGameOpen;
    }
    
    function createGameButton() {
        var button = document.createElement("button");
        button.textContent = "Open Game";
        button.style.width = "130px";
        button.style.height = "40px";
        button.style.marginTop = "10px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "2px solid #87CEFA";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", function () {
            toggleGameContainer();
            toggleBoxVisibility();
        });
        return button;
    }

    function resetGame() {
        removeObstacles();
        removePowerups();
        box.style.top = "200px";
        box.style.backgroundColor = "#4682b4";
        obstacles = [];
        powerups = [];
        gameButton.textContent = "Open Game";
    }

    function removeObstacles() {
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].element.parentNode.removeChild(obstacles[i].element);
        }
        obstacles = [];
    }

    function removePowerups() {
        for (var i = 0; i < powerups.length; i++) {
            powerups[i].element.parentNode.removeChild(powerups[i].element);
        }
        powerups = [];
    }

    function updateGame() {
        moveObstacles();
        movePowerups();
        checkCollision();
        checkPowerupCollection();
    }

    function moveObstacles() {
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].y += 5;
            obstacles[i].element.style.top = obstacles[i].y + "px";
    
            if (obstacles[i].y > window.innerHeight) {
                obstacles[i].element.parentNode.removeChild(obstacles[i].element);
                obstacles.splice(i, 1);
                i--;
            }
        }
        if (Math.round(Math.random() * (100 - 1) + 1) < 5 || obstacles.length === 0) {
            var obstacle = createObstacle();
            obstacles.push(obstacle);
            document.body.appendChild(obstacle.element);
        }
    }
    
    function movePowerups() {
        for (var i = 0; i < powerups.length; i++) {
            powerups[i].y += 5;
            powerups[i].element.style.top = powerups[i].y + "px";
    
            if (powerups[i].y > window.innerHeight) {
                powerups[i].element.parentNode.removeChild(powerups[i].element);
                powerups.splice(i, 1);
                i--;
            }
        }
    
        if (Math.round(Math.random() * (100 - 1) + 1) < 2 || powerups.length === 0) {
            var powerup = createPowerup();
            powerups.push(powerup);
            document.body.appendChild(powerup.element);
        }
    }
    
    function checkPowerupCollection() {
        for (var i = 0; i < powerups.length; i++) {
            if (
                box.offsetLeft < powerups[i].x + powerups[i].width &&
                box.offsetLeft + box.offsetWidth > powerups[i].x &&
                box.offsetTop < powerups[i].y + powerups[i].height &&
                box.offsetTop + box.offsetHeight > powerups[i].y
            ) {
                applyPowerupEffect();
                powerups[i].element.parentNode.removeChild(powerups[i].element);
                powerups.splice(i, 1);
                i--;
            }
        }
    }

    function applyPowerupEffect() {
        box.style.backgroundColor = "#ff5640";
        var originalSpeed = 7;
        var newSpeed = 14;
        var duration = 5000;
        var originalMoveBox = moveBox;

        moveBox = function (direction) {
            var currentTop = parseInt(box.style.top);
            var currentLeft = parseInt(box.style.left);
            var step = newSpeed;

            if (direction === "up" && currentTop - step >= 0) {
                box.style.top = currentTop - step + "px";
            } else if (direction === "down" && currentTop + step + box.offsetHeight <= window.innerHeight) {
                box.style.top = currentTop + step + "px";
            } else if (direction === "left" && currentLeft - step >= 0) {
                box.style.left = currentLeft - step + "px";
            } else if (direction === "right" && currentLeft + step + box.offsetWidth <= window.innerWidth) {
                box.style.left = currentLeft + step + "px";
            }
        };

        setTimeout(function () {
            moveBox = originalMoveBox;
            box.style.backgroundColor = "#4682b4";
        }, duration);
    }

    function toggleCalculator() {
        if (isCalculatorOpen) {
            calculatorContainer.style.display = "none";
            openCloseButton.textContent = "Open Calculator";
        } else {
            calculatorContainer.style.display = "block";
            openCloseButton.textContent = "Close Calculator";
        }
        isCalculatorOpen = !isCalculatorOpen;
    }

    function toggleNotepad() {
        if (isNotepadOpen) {
            notepadContainer.style.display = "none";
            notepadButton.textContent = "Open Notepad";
        } else {
            notepadContainer.style.display = "block";
            notepadButton.textContent = "Close Notepad";
        }
        isNotepadOpen = !isNotepadOpen;
    }

    function createBox() {
        var box = document.createElement("div");
        box.style.width = "50px";
        box.style.height = "50px";
        box.style.backgroundColor = "#4682b4";
        box.style.position = "absolute";
        box.style.left = "50%";
        box.style.transform = "translateX(-50%)";
        box.style.top = "200px";
        box.style.display = "none";
        document.body.appendChild(box);
        return box;
    }

    function moveBox(direction) {
        var currentLeft = parseInt(box.style.left);
        var step = 7;
    
        if (direction === "left" && currentLeft - step >= 0) {
            box.style.left = currentLeft - step + "px";
        } else if (direction === "right" && currentLeft + step + box.offsetWidth <= window.innerWidth) {
            box.style.left = currentLeft + step + "px";
        }
    }
    
    function createGameContainer() {
        var gameContainer = document.createElement("div");
        gameContainer.style.position = "fixed";
        gameContainer.style.top = "20px";
        gameContainer.style.left = "20px";
        gameContainer.style.backgroundColor = "#fff86e";
        gameContainer.style.width = "120px";
        gameContainer.style.zIndex = "9999";
        gameContainer.style.border = "2px solid #000000";
        gameContainer.style.borderRadius = "8px";
        gameContainer.style.padding = "10px";
        gameContainer.style.display = "none";
        
        gameContainer.appendChild(createButton("Up", "up"));
        gameContainer.appendChild(createButton("Left", "left"));
        gameContainer.appendChild(createButton("Right", "right"));
        gameContainer.appendChild(createButton("Down", "down"));
        return gameContainer;
    }
    
    function moveBox(direction) {
        var currentTop = parseInt(box.style.top);
        var currentLeft = parseInt(box.style.left);
        var step = 5;
    
        if (direction === "up" && currentTop - step >= 0) {
            box.style.top = currentTop - step + "px";
        } else if (direction === "down" && currentTop + step + box.offsetHeight <= window.innerHeight) {
            box.style.top = currentTop + step + "px";
        } else if (direction === "left" && currentLeft - step >= 0) {
            box.style.left = currentLeft - step + "px";
        } else if (direction === "right" && currentLeft + step + box.offsetWidth <= window.innerWidth) {
            box.style.left = currentLeft + step + "px";
        }
    }

    function createNotepadButton() {
        var button = document.createElement("button");
        button.textContent = "Open Notepad";
        button.style.width = "130px";
        button.style.height = "40px";
        button.style.marginTop = "10px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "2px solid #87CEFA";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", toggleNotepad);
        return button;
    }
    
    function createButton(label, direction) {
        var button = document.createElement("button");
        button.textContent = label;
        button.style.width = "80px";
        button.style.height = "40px";
        button.style.margin = "5px";
        button.style.padding = "5px 10px";
        button.style.cursor = "pointer";
        button.style.border = "2px solid #87CEFA";
        button.style.borderRadius = "4px";
        button.addEventListener("mousedown", function () {
            clearInterval(intervalId);
            intervalId = setInterval(function () {
                moveBox(direction);
            }, 10);
        });
        button.addEventListener("mouseup", function () {
            clearInterval(intervalId);
        });
        button.addEventListener("mouseout", function () {
            clearInterval(intervalId);
        });
        return button;
    }
    
    function toggleBoxVisibility() {
        if (box.style.display === "none" || box.style.display === "") {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    }

    function createCalculatorContainer() {
        var calculatorContainer = document.createElement("div");
        calculatorContainer.style.position = "fixed";
        calculatorContainer.style.top = "50%";
        calculatorContainer.style.left = "50%";
        calculatorContainer.style.transform = "translate(-50%, -50%)";
        calculatorContainer.style.backgroundColor = "#fff86e";
        calculatorContainer.style.border = "2px solid #469afa";
        calculatorContainer.style.borderRadius = "8px";
        calculatorContainer.style.padding = "20px";
        calculatorContainer.style.cursor = "move";
        calculatorContainer.style.zIndex = "9998";
        calculatorContainer.style.display = "none";
        var title = document.createElement("h2");
        title.textContent = "Simple Calculator";
        title.style.textAlign = "center";
        title.style.color = "#333";
        title.style.marginBottom = "10px";
        title.style.cursor = "grab";
        calculatorContainer.appendChild(title);
        var input1 = createInput("text");
        var input2 = createInput("text");
        var addButton = createOperationButton("Add", addNumbers, input1, input2);
        var subtractButton = createOperationButton("Subtract", subtractNumbers, input1, input2);
        var multiplyButton = createOperationButton("Multiply", multiplyNumbers, input1, input2);
        var divideButton = createOperationButton("Divide", divideNumbers, input1, input2);
        var dragButton = createDragButton(calculatorContainer, "calculator");
        calculatorContainer.appendChild(input1);
        calculatorContainer.appendChild(input2);
        calculatorContainer.appendChild(addButton);
        calculatorContainer.appendChild(subtractButton);
        calculatorContainer.appendChild(multiplyButton);
        calculatorContainer.appendChild(divideButton);
        calculatorContainer.appendChild(dragButton);
        return calculatorContainer;
    }

    function createNotepadContainer() {
        var notepadContainer = document.createElement("div");
        notepadContainer.style.position = "fixed";
        notepadContainer.style.top = "50%";
        notepadContainer.style.left = "50%";
        notepadContainer.style.backgroundColor = "#fff86e";
        notepadContainer.style.transform = "translate(-50%, -50%)";
        notepadContainer.style.border = "2px solid #469afa";
        notepadContainer.style.borderRadius = "8px";
        notepadContainer.style.padding = "20px";
        notepadContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        notepadContainer.style.zIndex = "9999";
        notepadContainer.style.display = "none";
        var notepadInput = createTextarea();
        var notepadDragButton = createDragButton(notepadContainer, "notepad");
        notepadContainer.appendChild(notepadInput);
        notepadContainer.appendChild(notepadDragButton);
        return notepadContainer;
    }

    function createTextarea() {
        var textarea = document.createElement("textarea");
        textarea.style.width = "100%";
        textarea.style.height = "200px";
        textarea.style.padding = "10px";
        textarea.style.marginTop = "10px";
        textarea.style.boxSizing = "border-box";
        textarea.style.border = "1px solid #ccc";
        textarea.style.borderRadius = "4px";
        return textarea;
    }

    function createMenuContainer() {
        var menuContainer = document.createElement("div");
        menuContainer.style.position = "fixed";
        menuContainer.style.top = "20px";
        menuContainer.style.left = "20px";
        menuContainer.style.backgroundColor = "#fff86e";
        menuContainer.style.width = "300px";
        menuContainer.style.height = "300px";
        menuContainer.style.zIndex = "9999";
        menuContainer.style.border = "2px solid #000000";
        menuContainer.style.borderRadius = "8px";
        menuContainer.style.padding = "20px";
        menuContainer.style.display = "block";
        menuContainer.addEventListener("mousedown", function (e) {
            startDragging(e, menuContainer, "menu");
        });
        document.addEventListener("mouseup", stopDragging);
        var menuTitle = document.createElement("h2");
        menuTitle.textContent = "Useful Tools";
        menuTitle.style.textAlign = "center";
        menuTitle.style.color = "#333";
        menuTitle.style.marginBottom = "10px";
        menuContainer.appendChild(menuTitle);
        menuContainer.appendChild(notepadButton);
        return menuContainer;
    }

    function createDateTimeContainer() {
        var dateTimeContainer = document.createElement("div");
        dateTimeContainer.style.marginTop = "20px";
        dateTimeContainer.style.textAlign = "center";
        var dateText = document.createElement("p");
        dateText.style.margin = "0px";
        dateText.style.fontSize = "18px";
        dateText.style.color = "#ff5640";
        dateText.style.fontFamily = "Arial, sans-serif";
        var timeText = document.createElement("p");
        timeText.style.margin = "0px";
        timeText.style.fontSize = "18px";
        timeText.style.color = "#ff5640";
        timeText.style.fontFamily = "Arial, sans-serif";
        function updateDateTime() {
            var now = new Date();
            var hours = now.getHours().toString().padStart(2, '0');
            var minutes = now.getMinutes().toString().padStart(2, '0');
            var seconds = now.getSeconds().toString().padStart(2, '0');
            var dateString = now.toDateString();
            var timeString = hours + ':' + minutes + ':' + seconds;
            dateText.textContent = "Date: " + dateString;
            timeText.textContent = "Time: " + timeString;
        }
        updateDateTime();
        setInterval(updateDateTime, 1000);
        dateTimeContainer.appendChild(dateText);
        dateTimeContainer.appendChild(timeText);
        return dateTimeContainer;
    }

    function startDragging(e, container, type) {
        if (type === "calculator") {
            isDraggingCalculator = true;
            offsetXCalculator = e.clientX - container.getBoundingClientRect().left;
            offsetYCalculator = e.clientY - container.getBoundingClientRect().top;
        } else if (type === "notepad") {
            isDraggingNotepad = true;
            offsetXNotepad = e.clientX - container.getBoundingClientRect().left;
            offsetYNotepad = e.clientY - container.getBoundingClientRect().top;
        } else if (type === "menu") {
            isDraggingMenu = true;
            offsetXMenu = e.clientX - menuContainer.getBoundingClientRect().left;
            offsetYMenu = e.clientY - menuContainer.getBoundingClientRect().top;
        }
        document.addEventListener("mousemove", handleDragging);
    }
    function stopDragging() {
        isDraggingCalculator = false;
        isDraggingNotepad = false;
        isDraggingMenu = false;
        document.removeEventListener("mousemove", handleDragging);
    }
    function handleDragging(e) {
        if (isDraggingCalculator) {
            var newX = e.clientX - offsetXCalculator;
            var newY = e.clientY - offsetYCalculator;
            calculatorContainer.style.left = newX + "px";
            calculatorContainer.style.top = newY + "px";
            calculatorContainer.style.transform = "translate(0, 0)";
        }
        if (isDraggingNotepad) {
            var newX = e.clientX - offsetXNotepad;
            var newY = e.clientY - offsetYNotepad;
            notepadContainer.style.left = newX + "px";
            notepadContainer.style.top = newY + "px";
            notepadContainer.style.transform = "translate(0, 0)";
        }
        if (isDraggingMenu) {
            var newX = e.clientX - offsetXMenu;
            var newY = e.clientY - offsetYMenu;
            menuContainer.style.left = newX + "px";
            menuContainer.style.top = newY + "px";
            menuContainer.style.transform = "translate(0, 0)";
        }
    }
    function createDragButton(container, type) {
        var dragButton = document.createElement("button");
        dragButton.textContent = "Drag";
        dragButton.style.width = "100%";
        dragButton.style.padding = "10px";
        dragButton.style.marginTop = "10px";
        dragButton.style.marginBottom = "10px";
        dragButton.style.backgroundColor = "#ff5640";
        dragButton.style.color = "#333";
        dragButton.style.border = "2px solid #87CEFA";
        dragButton.style.borderRadius = "4px";
        dragButton.style.cursor = "pointer";
        dragButton.addEventListener("mousedown", function (e) {
            startDragging(e, container, type);
        });
        dragButton.addEventListener("mouseup", stopDragging);
        return dragButton;
    }
    function createInput(type) {
        var input = document.createElement("input");
        input.type = type;
        input.style.width = "100%";
        input.style.padding = "10px";
        input.style.marginTop = "10px";
        input.style.marginBottom = "10px";
        input.style.boxSizing = "border-box";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
        return input;
    }
    function createOperationButton(label, operation, input1, input2) {
        var button = document.createElement("button");
        button.textContent = label;
        button.style.width = "100%";
        button.style.padding = "10px";
        button.style.marginTop = "10px";
        button.style.marginBottom = "10px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "2px solid #87CEFA";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", function () {
            var result = operation(input1.value, input2.value);
            alert("Answer: " + result);
        });
        return button;
    }
    function addNumbers(num1, num2) {
        num1 = parseFloat(num1) || 0;
        num2 = parseFloat(num2) || 0;
        return num1 + num2;
    }
    function subtractNumbers(num1, num2) {
        num1 = parseFloat(num1) || 0;
        num2 = parseFloat(num2) || 0;
        return num1 - num2;
    }
    function multiplyNumbers(num1, num2) {
        num1 = parseFloat(num1) || 0;
        num2 = parseFloat(num2) || 0;
        return num1 * num2;
    }
    function divideNumbers(num1, num2) {
        num1 = parseFloat(num1) || 0;
        num2 = parseFloat(num2) || 1;
        return num1 / num2;
    }
    function createOpenCloseButton() {
        var button = document.createElement("button");
        button.textContent = "Open Calculator";
        button.style.width = "130px";
        button.style.height = "25px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "2px solid #87CEFA";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", toggleCalculator);
        return button;
    }
})();
