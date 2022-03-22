export const uncheckRadio = () => {
    if (document.querySelector('input[type=radio][name=roomType]:checked')) {
        const radio = document.querySelector('input[type=radio][name=roomType]:checked');
        radio.checked = false;
    }
    if (document.querySelector('input[type=radio][name=food]:checked')) {
        const radio = document.querySelector('input[type=radio][name=food]:checked');
        radio.checked = false;
    }
    if (document.querySelector('input[type=radio][name=parking]:checked')) {
        const radio = document.querySelector('input[type=radio][name=parking]:checked');
        radio.checked = false;
    }
}