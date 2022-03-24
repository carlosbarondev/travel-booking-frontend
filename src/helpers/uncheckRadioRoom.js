export const uncheckRadioRoom = () => {
    if (document.querySelector('input[type=radio][name=roomType]:checked')) {
        const radio = document.querySelector('input[type=radio][name=roomType]:checked');
        radio.checked = false;
    }
}