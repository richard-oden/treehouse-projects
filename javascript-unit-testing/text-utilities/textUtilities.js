const expect = require('chai').expect;

function titleCase (str) {
    var words = str.toLowerCase().split(' ');
    var titleCasedWords = words.map(word => {
        return word[0].toUpperCase() + word.substring(1);
    });
    return titleCasedWords.join(' ');
}

expect(titleCase('the great mouse detective'))
    .to.be.a('string');
expect(titleCase('a'))
    .to.equal('A');
expect(titleCase('vertigo'))
    .to.equal('Vertigo');
expect(titleCase('the great mouse detective'))
    .to.equal('The Great Mouse Detective');
expect(titleCase('tHE gREAT mOUSE dETECTIVE'))
    .to.equal('The Great Mouse Detective');