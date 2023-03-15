const lengthOfLongestSubstring = function (s) {
    if (s.length == 1) {
        return 1
    }
    let newS = ''
    let maxLength = 0
    for (let i = 0; i < s.length; i++) {
        if (newS.includes(s[i])) {
            maxLength = Math.max(maxLength, newS.length)
            newS = newS.slice(newS.lastIndexOf(s[i]) + 1, newS.length)
            console.log(newS)
        }
        newS = newS + s[i]
    }
    if (newS.length > maxLength) {
        return newS.length
    }
    if (s === newS) {
        return newS.length
    }
    return maxLength
};

console.log(lengthOfLongestSubstring("dvadasddf"));
