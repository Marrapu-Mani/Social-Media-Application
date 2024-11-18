import { 
    legacy_createStore as createStore,  // This function creates a Redux store.
    applyMiddleware,                    // This function allows you to apply middleware to the Redux store.
    compose                             // This function allows you to combine multiple store enhancers.
} from "redux";
import { thunk } from 'redux-thunk';    // Middleware that allows you to write action creators that return a function instead of an action, useful for handling asynchronous logic.
import reducers from "../reducers/index.js";     

// Functions for Local Storage
function saveToLocalStorage(store){     // This function serializes the Redux store state to a JSON string and saves it in the browser's localStorage under the key "store".
    try{
        const serializableStore = JSON.stringify(store);    
        window.localStorage.setItem("store", serializableStore);
    } catch(error){         // If there is an error during the serialization or saving process, it logs the error to the console.
        console.log(error);
    }
}

function loadFromLocalStorage(){        // This function retrieves the serialized store state from localStorage and parses it back into a JavaScript object.
    try{
        const serializableStore = window.localStorage.getItem("store");
        if(serializableStore === null){ // If the item does not exist in localStorage, it returns undefined.
            return undefined;
        }
        return JSON.parse(serializableStore);
    } catch(error){
        console.log(error);             // If there is an error during the retrieval or parsing process, it logs the error and returns undefined.
        return undefined;
    }
}

// Setting Up the Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    // This is set to use the Redux DevTools Extension if it's available in the browser, otherwise, it defaults to compose.
const persistedState = loadFromLocalStorage();      // This variable stores the state loaded from localStorage, which will be used as the initial state of the Redux store.
export const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));  // This creates the Redux store using the combined reducers, the persisted state, and the middleware (in this case, redux-thunk) applied with the possibility of using the Redux DevTools Extension.

store.subscribe(() => saveToLocalStorage(store.getState()));        // This subscribes to store updates, meaning every time the store's state changes, it will trigger the saveToLocalStorage function to save the updated state to localStorage.



// Persistence: The code saves the Redux store's state to localStorage whenever it changes and loads the state from localStorage when the application starts, allowing for state persistence across page reloads.
// Middleware: It uses redux-thunk to handle asynchronous actions.
// DevTools: It integrates with the Redux DevTools Extension for enhanced debugging capabilities.
// Store Creation: The store is created with the combined reducers, persisted state, middleware, and DevTools integration, and is then exported for use in the application.