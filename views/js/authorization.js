import {
    Initialization
} from './Initialization.js';
import {
    Schedule
} from './schedule.js';


btnAuthorization.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(login.value, password.value);
    let authorizationObj = {
        login: login.value,
        pass: password.value
    };
    Initialization.initializationUser(authorizationObj);
})


document.addEventListener('keydown', (event) => {
    if(event.getModifierState("CapsLock")) {
        capsLock.style.display = 'block';
    } else {
        capsLock.style.display = 'none';
    }
})