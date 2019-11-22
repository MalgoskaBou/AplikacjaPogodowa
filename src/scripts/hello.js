export default () => {
    console.log('Hello from the hello.js');
    const greeting = document.createElement('h1');
    greeting.textContent = 'Hello World!';
    document.body.appendChild(greeting);
}