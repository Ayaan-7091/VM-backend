// utils/removeCircularReferences.js

const removeCircularReferences = (obj, seen = new Set()) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (seen.has(obj)) {
        return; // Stop circular reference
    }

    seen.add(obj);

    if (Array.isArray(obj)) {
        return obj.map(item => removeCircularReferences(item, seen));
    }

    const newObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key !== 'user') { // Skip the user key to avoid circular reference
                newObj[key] = removeCircularReferences(obj[key], seen);
            }
        }
    }

    return newObj;
};

module.exports = removeCircularReferences;
