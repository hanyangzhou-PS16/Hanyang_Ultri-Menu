javascript:(function () {
    var calculatorContainer = document.createElement("div");
    calculatorContainer.style.position = "fixed";
    calculatorContainer.style.top = "50%";
    calculatorContainer.style.left = "50%";
    calculatorContainer.style.transform = "translate(-50%, -50%)";
    calculatorContainer.style.backgroundColor = "#f0f0f0";
    calculatorContainer.style.border = "2px solid #469afa";
    calculatorContainer.style.borderRadius = "8px";
    calculatorContainer.style.padding = "20px";
    calculatorContainer.style.cursor = "move";
    calculatorContainer.style.zIndex = "9999";
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
    var addButton = createOperationButton("Add", addNumbers);
    var subtractButton = createOperationButton("Subtract", subtractNumbers);
    var multiplyButton = createOperationButton("Multiply", multiplyNumbers);
    var divideButton = createOperationButton("Divide", divideNumbers);
    var dragButton = createDragButton(calculatorContainer);

    calculatorContainer.appendChild(input1);
    calculatorContainer.appendChild(input2);
    calculatorContainer.appendChild(addButton);
    calculatorContainer.appendChild(subtractButton);
    calculatorContainer.appendChild(multiplyButton);
    calculatorContainer.appendChild(divideButton);
    calculatorContainer.appendChild(dragButton);

    var notepadContainer = document.createElement("div");
    notepadContainer.style.position = "fixed";
    notepadContainer.style.top = "50%";
    notepadContainer.style.left = "50%";
    notepadContainer.style.transform = "translate(-50%, -50%)";
    notepadContainer.style.border = "2px solid #469afa";
    notepadContainer.style.borderRadius = "8px";
    notepadContainer.style.padding = "20px";
    notepadContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    notepadContainer.style.zIndex = "9999";
    notepadContainer.style.display = "none"; // Added display property

    var notepadInput = createInput("text"); // Used createInput function
    var notepadDragButton = createDragButton(notepadContainer); // Used createDragButton function

    notepadContainer.appendChild(notepadInput);
    notepadContainer.appendChild(notepadDragButton);

    var input1 = createInput("text");
    var input2 = createInput("text");
    var addButton = createOperationButton("Add", addNumbers);
    var subtractButton = createOperationButton("Subtract", subtractNumbers);
    var multiplyButton = createOperationButton("Multiply", multiplyNumbers);
    var divideButton = createOperationButton("Divide", divideNumbers);
    var dragButton = createDragButton(calculatorContainer);
    
    calculatorContainer.appendChild(input1);
    calculatorContainer.appendChild(input2);
    calculatorContainer.appendChild(addButton);
    calculatorContainer.appendChild(subtractButton);
    calculatorContainer.appendChild(multiplyButton);
    calculatorContainer.appendChild(divideButton);
    calculatorContainer.appendChild(dragButton);
    
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
    
    var openCloseButton = createOpenCloseButton();
    var otherButton = createOtherButton();
    
    menuContainer.appendChild(menuTitle);
    menuContainer.appendChild(openCloseButton);
    menuContainer.appendChild(otherButton);
    document.body.appendChild(menuContainer);
    document.body.appendChild(calculatorContainer);

    var isCalculatorOpen = false;
    var isDragging = false;
    var offsetX, offsetY;
    var isNotepadOpen = false;

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

    function startDragging(e, container) {
        isDragging = true;
        offsetX = e.clientX - container.getBoundingClientRect().left;
        offsetY = e.clientY - container.getBoundingClientRect().top;
        document.addEventListener("mousemove", function (e) {
            handleDragging(e, container);
        });
    }
    
    function stopDragging() {
        isDragging = false;
        document.removeEventListener("mousemove", handleDragging);
    }
    
    function handleDragging(e, container) {
        if (isDragging) {
            var newX = e.clientX - offsetX;
            var newY = e.clientY - offsetY;
    
            container.style.left = newX + "px";
            container.style.top = newY + "px";
            container.style.transform = "translate(0, 0)";
        }
    
        var maxX = window.innerWidth - container.offsetWidth;
        var maxY = window.innerHeight - container.offsetHeight;
    
        newX = Math.min(Math.max(newX, 0), maxX);
        newY = Math.min(Math.max(newY, 0), maxY);
    
        container.style.left = newX + "px";
        container.style.top = newY + "px";
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
    
    function createOperationButton(label, operation) {
        var button = document.createElement("button");
        button.textContent = label;
        button.style.width = "100%";
        button.style.padding = "10px";
        button.style.marginTop = "10px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "none";
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
        button.style.width = "120px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", toggleCalculator);
        return button;
    }

    function createOtherButton() {
        var button = document.createElement("button");
        button.textContent = "Open Notepad";
        button.style.width = "120px";
        button.style.marginTop = "10px";
        button.style.backgroundColor = "#469afa";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.borderRadius = "4px";
        button.style.cursor = "pointer";
        button.addEventListener("click", toggleNotepad);
        return button;
    }

    function toggleNotepad() {
        if (isNotepadOpen) {
            notepadContainer.style.display = "none";
        } else {
            notepadContainer.style.display = "block";
        }
        isNotepadOpen = !isNotepadOpen;
    }})();
