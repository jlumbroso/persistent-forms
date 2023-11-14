document.addEventListener('DOMContentLoaded', function() {
    if (typeof(Storage) === "undefined") {
        console.error("Local storage is not supported by this browser.");
        return;
    }

    let storedValues = localStorage.getItem("persistent-form-values");
    storedValues = storedValues ? JSON.parse(storedValues) : {};
    
    /* Log */
    console.log("Loading persistent form values...");
    console.log("Full local storage:", storedValues);

    function getDomPath(el) {
        var stack = [];
        while (el.parentNode != null) {
            var sibCount = 0;
            var sibIndex = 0;
            for (var i = 0; i < el.parentNode.childNodes.length; i++) {
                var sib = el.parentNode.childNodes[i];
                if (sib.nodeName == el.nodeName) {
                    if (sib === el) {
                        sibIndex = sibCount;
                    }
                    sibCount++;
                }
            }
            if (el.hasAttribute('id') && el.id != '') {
                stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            } else if (sibCount > 1) {
                stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
            } else {
                stack.unshift(el.nodeName.toLowerCase());
            }
            el = el.parentNode;
        }
        return stack.slice(1).join(' > ');
    }

    function saveFormValue(el) {
        let storedValues = JSON.parse(localStorage.getItem("persistent-form-values")) || {};
    
        if (el.type === 'checkbox') {
            // For checkboxes, store if checked, remove from storage if unchecked
            if (el.checked) {
                storedValues[el.id] = {
                    value: true,
                    domPath: getDomPath(el)
                };
            } else {
                delete storedValues[el.id]; // Remove the entry if the checkbox is unchecked
            }
        } else if (el.type === 'radio') {
            // If it's a radio button, first remove all radios with the same name from storage
            for (let key in storedValues) {
                let storedEl = document.getElementById(key);
                if (storedEl && storedEl.type === 'radio' && storedEl.name === el.name) {
                    delete storedValues[key];
                }
            }
            // Store the checked radio button
            if (el.checked) {
                storedValues[el.id] = {
                    value: true,
                    domPath: getDomPath(el)
                };
            }
        } else {
            // For other input types, store their value
            storedValues[el.id] = {
                value: el.value,
                domPath: getDomPath(el)
            };
        }
    
        localStorage.setItem("persistent-form-values", JSON.stringify(storedValues));
    
        /* Log */
        console.log("Updated form value for `", el.id, "': '", el.type === 'checkbox' ? el.checked : el.value, "'");
        console.log("Full local storage:", storedValues);
    }
    
    

    for (const id in storedValues) {
        let el = document.getElementById(id);
        if (el) {
            if (el.type === 'checkbox' || el.type === 'radio') {
                el.checked = storedValues[id].value;
            } else {
                el.value = storedValues[id].value;
            }
        } else {
            let path = storedValues[id].domPath;
            try {
                el = document.querySelector(path);
                if (el) {
                    if (el.type === 'checkbox' || el.type === 'radio') {
                        el.checked = storedValues[id].value;
                    } else {
                        el.value = storedValues[id].value;
                    }
                }
            } catch (e) {
                console.error("Error applying stored value by DOM path:", path, e);
            }
        }
    }

    document.querySelectorAll('input, select, textarea').forEach(function(el) {
        if (el.type !== 'submit' && el.type !== 'button') {
            if (el.type === 'checkbox' || el.type === 'radio') {
                el.addEventListener('change', function() {
                    saveFormValue(el);
                });
            } else {
                el.addEventListener('input', function() {
                    saveFormValue(el);
                });
            }
        }
    });
});
