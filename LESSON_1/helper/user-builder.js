console.log(__dirname);     //  показує поточний шлях папки, що запускається
console.log(__filename);    //   показує файл, де запускається змінна

const createUser = (name, age) => {
    return {
        name,
        age,
        greeting: () => {
            console.log(`Hello, my name ${name}`)
        }
    }
}

module.exports = {
    createUser
};
