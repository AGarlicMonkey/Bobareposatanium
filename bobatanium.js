const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

let url = 'https://raw.githubusercontent.com/AGarlicMonkey/Bobareposatanium/master/Name.txt',
    theMightyBob = '',
    protocol = 'https',
    aNewBob

console.log()

/**
@argv2 = NewBob
@argv3 = URL
*/
if (process.argv.length > 2) {
    if (process.argv[2].length) {
        aNewBob = process.argv[2]
    }

    if (typeof process.argv[3] != 'undefined') {
        if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(process.argv[3])) {
            if (!/^(?:https)?:/gm.test(process.argv[3])) {
                protocol = 'http'
            }

            url = process.argv[3]
        }
        else {
            console.log(`That's not a url, using: ${url}`)
        }
    }
}

const bobSplit = inString => {
    return inString.match(/[A-Z][a-z]+/g)
}

const theBobCount = inArray => {
    return (inArray) ? inArray.length : 0
}

const appendatanium = (inArray, aWholeNewBob) => {
    inArray.splice(inArray.length - 1, 0, aWholeNewBob)
}

const captitanium = inString => {
    const inLower = inString.toLowerCase()
    return inLower.charAt(0).toUpperCase() + inLower.slice(1)
}

const writeatatnium = inString => {
    if (!fs.existsSync('./Name.txt')) {
        fs.writeFile('./Name.txt', inString, { flag: 'wx' }, (error) => {
            if (error) {
                throw error
            }
            console.log("Create and Saveatanium")
        })
    }
    else {
        fs.writeFile('./Name.txt', inString, function(error) {
            if (error) {
                throw error;
            }
            console.log("Saveatanium")
        });
    }
}

const theBobProcess = inBob => {
    console.log(`The current Bob: ${inBob}`)
    const theBob = bobSplit(inBob)
    if (theBobCount(theBob)) {
        let newBob = ''

        if (aNewBob) {
            appendatanium(theBob, captitanium(aNewBob))
        }

        for (let i = 0; i < theBobCount(theBob); i++) {
            if (aNewBob) {
                newBob += theBob[i]
            }
            console.log(`${i}: ${theBob[i]}`)
        }
        console.log(`\nThe current bob count is: ${theBobCount(theBob)}`)
        if (aNewBob) {
            console.log(`A new and improved Bob: ${newBob}`)
            writeatatnium(newBob)
        }
    }
    else {
        console.log('No Bobs found :(')
    }
}

let request
if (protocol == 'https') {
    request = https.request(url, (res) => {
        res.on('data', (chunk) => {
            theMightyBob += chunk
        })
        res.on('end', () => {
            theBobProcess(theMightyBob)
        })
    })
}
else {
    request = http.request(url, (res) => {
        res.on('data', (chunk) => {
            theMightyBob += chunk
        })
        res.on('end', () => {
            theBobProcess(theMightyBob)
        })
    })
}

request.on('error', (e) => {
    console.log(e.message)
})
request.end()
