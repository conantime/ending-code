const changeColor = document.getElementById('changeColor')

console.log(changeColor)

changeColor.addEventListener('click', async () => {
    console.log(123)
    let [tab] = await chrome.tab.query({active: true, currentWindow: true})
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroungColor
    })
})

function setPageBackgroungColor() {
    chrome.storage.get("color", ({ color }) => {
        document.body.style.backgroundColor = color
    })
}
