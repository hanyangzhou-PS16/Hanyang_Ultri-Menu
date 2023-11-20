(function () {
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
    var enterButton = document.createElement("button");
    enterButton.textContent = "Add";
    enterButton.style.width = "100%";
    enterButton.style.padding = "10px";
    enterButton.style.marginTop = "10px";
    enterButton.style.backgroundColor = "#469afa";
    enterButton.style.color = "#fff";
    enterButton.style.border = "none";
    enterButton.style.borderRadius = "4px";
    enterButton.style.cursor = "pointer";
    enterButton.addEventListener("click", function () {
        var result = addNumbers(input1.value, input2.value);
        alert("Answer: " + result);
    });
    calculatorContainer.appendChild(input1);
    calculatorContainer.appendChild(input2);
    calculatorContainer.appendChild(dragButton);
    calculatorContainer.appendChild(enterButton);
    document.body.appendChild(calculatorContainer);
    var isDragging = false;
    var offsetX, offsetY;
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
    function addNumbers(num1, num2) {
        num1 = parseFloat(num1) || 0;
        num2 = parseFloat(num2) || 0;
        return num1 + num2;
    }
})();
