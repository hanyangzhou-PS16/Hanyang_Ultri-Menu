(function () {
    var isNotepadOpen = false;
    var calculatorContainer = createCalculatorContainer();
    var notepadContainer = createNotepadContainer();
    var isCalculatorOpen = false;
    var isDraggingCalculator = false;
    var isDraggingNotepad = false;
    var offsetXCalculator, offsetYCalculator;
    var offsetXNotepad, offsetYNotepad;

    var notepadButton = createNotepadButton();
    var openCloseButton = createOpenCloseButton();
    var menuContainer = createMenuContainer();
    var gameButton = createGameButton();

    document.body.appendChild(menuContainer);
    document.body.appendChild(calculatorContainer);
    document.body.appendChild(notepadContainer);

    menuContainer.appendChild(openCloseButton);
    menuContainer.appendChild(gameButton);

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
        console.log("Toggling Notepad");
        if (isNotepadOpen) {
            notepadContainer.style.display = "none";
            notepadButton.textContent = "Open Notepad";
        } else {
            notepadContainer.style.display = "block";
            notepadButton.textContent = "Close Notepad";
        }
        isNotepadOpen = !isNotepadOpen;
    }

    function createNotepadButton() {
        var button = document.createElement("button");
        button.textContent = "Open Notepad";
        button.style.width = "130px";
        button.style.marginTop = "25px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "2px solid #87CEFA";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", toggleNotepad);
        return button;
    }

    function createGameButton() {
        var button = document.createElement("button");
        button.textContent = "Play Game";
        button.style.width = "130px";
        button.style.marginTop = "25px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "2px solid #87CEFA";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", function () {
            alert("Game button clicked!");
        });
        return button;
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

        var menuTitle = document.createElement("h2");
        menuTitle.textContent = "Useful Tools";
        menuTitle.style.textAlign = "center";
        menuTitle.style.color = "#333";
        menuTitle.style.marginBottom = "10px";

        menuContainer.appendChild(menuTitle);
        menuContainer.appendChild(notepadButton);

        return menuContainer;
    }

    function createIframe(src) {
        var iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.style.width = "15%";
        iframe.style.height = "100px";
        iframe.style.border = "1px solid #87CEFA";
        iframe.style.borderRadius = "4px";
        iframe.style.marginTop = "10px";
        return iframe;
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
        }

        document.addEventListener("mousemove", handleDragging);
    }

    function stopDragging() {
        isDraggingCalculator = false;
        isDraggingNotepad = false;
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
    }

    function createDragButton(container, type) {
        var dragButton = document.createElement("button");
        dragButton.textContent = "Drag";
        dragButton.style.width = "100%";
        dragButton.style.padding = "10px";
        dragButton.style.marginTop = "10px";
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
