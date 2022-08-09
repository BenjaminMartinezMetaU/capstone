const WIKI_DEFAULT_HTML = `
<h1>Project Title:</h1><p><br></p><h2>Project Overview:</h2><p>This is an example template of your wiki page.
 Get started by using the editor to start creating your project!</p>
<p><br></p><h3>Features:</h3><ul>
<li>You can make bullet points or number lists</li><li>You can <strong>bold</strong>, <em>italicize</em>, or <u>underline text</u>. 
</li><li>You can <a href="https://localhost:3000/" rel="noopener noreferrer" target="_blank">link</a>
 to other wiki pages</li><li>You can make different sized headers</li></ul><p><br></p><h2>Project Details:</h2><h3>...</h3>
`

const WEIGHT_COMMONGENRE = 1;
const WEIGHT_UPVOTED = 3;
const WEIGHT_WIKIWORKEDON = 5;


module.exports = {
    WIKI_DEFAULT_HTML,
    WEIGHT_COMMONGENRE,
    WEIGHT_UPVOTED,
    WEIGHT_WIKIWORKEDON
}