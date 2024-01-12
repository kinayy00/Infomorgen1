// Selektiere Labels für "group1" und "group2" Eingabefelder und füge Klick-Event-Listener hinzu.
['group1', 'group2'].forEach(group => {
    const labels = document.querySelectorAll(`input[name="${group}"] + label`);
    labels.forEach(label => {
        label.addEventListener('click', () => {
            labels.forEach(l => l.classList.remove('border-2', 'border-red-600'));
            label.classList.add('border-2', 'border-red-600');
        });
    });
});

// Funktion, um die Unterstreichung für alle P-Elemente zu entfernen.
function toggleUnderline(element) {
    const allPElements = document.querySelectorAll('.flex p');
    allPElements.forEach((p) => {
        p.classList.remove('underline');
    });
    element.classList.add('underline');
}


// Funktion, um die Hintergrundfarbe für alle Div-Elemente zu ändern.
function toggleSelected(element) {
    const container = element.closest('.flex.flex-col');
    const allDivs = container.querySelectorAll('.flex.flex-row');

    allDivs.forEach((div) => {
        div.classList.remove('border-red-600', 'border-2');
    });

    element.classList.add('border-red-600', 'border-2');
}