const myEvent = new Event('myEvent', {cancelable: true, bubbles: true});
document.addEventListener('myEvent', e=> {
    console.log(e);
});

document.dispatchEvent(myEvent);