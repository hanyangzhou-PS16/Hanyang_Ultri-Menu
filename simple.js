(function () {
    var calculatorContainer = document.createElement("div");
    calculatorContainer.style.position = "fixed";
    calculatorContainer.style.top = "300px";
    calculatorContainer.style.left = "50%";
    calculatorContainer.style.transform = "translate(-50%, -50%)";
    calculatorContainer.style.backgroundColor = "#f0f0f0";
    calculatorContainer.style.border = "2px solid #469afa";
    calculatorContainer.style.borderRadius = "8px";
    calculatorContainer.style.padding = "20px";
    calculatorContainer.style.cursor = "move";
    calculatorContainer.style.zIndex = "9999";

    var title = document.createElement("h2");
    title.textContent = "Simple Calculator";
    title.style.textAlign = "center";
    title.style.color = "#333";
    title.style.marginBottom = "10px";
    title.style.cursor = "grab";
    title.addEventListener("mousedown", startDragging);
    document.addEventListener("mouseup", stopDragging);
    calculatorContainer.appendChild(title);

    var input1 = createInput("text");
    var input2 = createInput("text");

    var addButton = createOperationButton("Add", addNumbers);
    var subtractButton = createOperationButton("Subtract", subtractNumbers);
    var multiplyButton = createOperationButton("Multiply", multiplyNumbers);
    var divideButton = createOperationButton("Divide", divideNumbers);

    var dragButton = document.createElement("button");
    dragButton.textContent = "Drag";
    dragButton.style.width = "100%";
    dragButton.style.padding = "10px";
    dragButton.style.marginTop = "10px";
    dragButton.style.backgroundColor = "yellow";
    dragButton.style.color = "#333";
    dragButton.style.border = "none";
    dragButton.style.borderRadius = "4px";
    dragButton.style.cursor = "pointer";
    dragButton.addEventListener("mousedown", startDragging);
    dragButton.addEventListener("mouseup", stopDragging);

    calculatorContainer.appendChild(input1);
    calculatorContainer.appendChild(input2);
    calculatorContainer.appendChild(addButton);
    calculatorContainer.appendChild(subtractButton);
    calculatorContainer.appendChild(multiplyButton);
    calculatorContainer.appendChild(divideButton);
    calculatorContainer.appendChild(dragButton);
    var iframeMenu = document.createElement("iframe");
    iframeMenu.src = "about:blank";
    iframeMenu.style.position = "fixed";
    iframeMenu.style.top = "100px";
    iframeMenu.style.left = "100px";
    iframeMenu.style.width = "150px";
    iframeMenu.style.height = "150px";
    iframeMenu.style.border = "2px solid #469afa";
    iframeMenu.style.borderRadius = "8px";
    iframeMenu.style.backgroundColor = "#f0f0f0";
    var openCloseButton = document.createElement("button");
    openCloseButton.textContent = "Open Calculator";
    openCloseButton.style.width = "20%";
    openCloseButton.style.height = "20%";
    openCloseButton.style.backgroundColor = "#469afa";
    openCloseButton.style.color = "#fff";
    openCloseButton.style.border = "none";
    openCloseButton.style.borderRadius = "4px";
    openCloseButton.style.cursor = "pointer";
    openCloseButton.addEventListener("click", toggleCalculator);
    document.body.appendChild(openCloseButton);

    var isCalculatorOpen = true;
    var isDragging = false;
    var offsetX, offsetY;

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

    function startDragging(e) {
        isDragging = true;
        offsetX = e.clientX - calculatorContainer.getBoundingClientRect().left;
        offsetY = e.clientY - calculatorContainer.getBoundingClientRect().top;
        document.addEventListener("mousemove", handleDragging);
    }

    function stopDragging() {
        isDragging = false;
        document.removeEventListener("mousemove", handleDragging);
    }

    function handleDragging(e) {
        if (isDragging) {
            calculatorContainer.style.left = e.clientX - offsetX + "px";
            calculatorContainer.style.top = e.clientY - offsetY + "px";
            calculatorContainer.style.transform = "translate(0, 0)";
        }
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
})();
