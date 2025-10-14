/*

npm install	- Installs all packages listed in your project’s package.json
npm install <package>	 - Installs a specific package
npm uninstall <package>	- Removes a package
npm update	- Updates all packages
npm -v	- Shows npm version

nvm install 20
nvm install 21
nvm use 20   # switch to Node 20
nvm use 21  # switch to Node 21

node <file> - launch script
npx playwright codegen https://example.com - Opens browser and records test steps


const signIn = await page.$('.form-button') by class, . for class, # for id
const signIn = await page.$('button') by css-selector
const signIn = await page.$('//button[@class = "form-button signin"]') //by xpath
const signIn = await page.$('text="Log in"') //by text
const signIn = await page.$('"Log in"') //by text
const signIn = await page.$("form >> "Log in'"") //by text inside the element
const bookSelection = await page.getByText('Nikita book') by text


page.$()	Находит один элемент по селектору (аналог document.querySelector())
page.$$()	Находит все элементы, подходящие под селектор (аналог document.querySelectorAll())


page.$eval()	Находит элемент и выполняет JavaScript-код внутри браузера над этим элементом
<p id="greeting">Hello, Nikita!</p>
const text = await page.$eval('#greeting', element => element.textContent);


page.$$eval()	Находит несколько элементов и выполняет код над всеми
const arrayList = await page.$$eval('.class', els => els.map(el => el.textContent))
//els => els[0].textContent	Возвращает строку
//els => els.map(el => el.textContent)	Возвращает массив


Читать текст (element.textContent)
Читать атрибуты (element.getAttribute('href'))
Изменять элементы (element.style.color = 'red')
Нажимать (element.click() — хотя обычно лучше использовать page.click()