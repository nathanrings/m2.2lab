import {helloWorld, add, fetchRandomJoke, fetch5RandomJokes } from '../js/main.js';
// Import the sinon library to allow us to create a spy on the console.log function
import sinon from 'sinon';

QUnit.module('main.js tests', function() {

    QUnit.test('helloWorld should print Hello World to the console', function(assert) {
        //Arrange
        const consoleSpy = sinon.spy(console, 'log');
        //Act
        helloWorld();
        //Assert
        assert.ok(consoleSpy.calledWith('Hello World'), 'console.log should be called with Hello World');
        consoleSpy.restore();
    });

    QUnit.test('add should return the sum of two numbers', function(assert) {
        //Arrange
        const num1 = 2;
        const num2 = 3;
        const expected = 5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, 3) should return 5');
    });

    QUnit.test('add should return the sum of negative numbers', function(assert) {
        //Arrange
        const num1 = -2;
        const num2 = -3;
        const expected = -5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(-2, -3) should return -5');
    });

    QUnit.test('add should return the sum of a positive and a negative number', function(assert) {
        //Arrange
        const num1 = 2;
        const num2 = -3;
        const expected = -1;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, -3) should return -1');
    });

    QUnit.test('fetchRandomJoke returns a single string', async function(assert) {
    const fetchStub = sinon.stub(globalThis, 'fetch').resolves({
        ok: true,
        json: async () => ({ setup: 'Knock knock', punchline: 'Who’s there?' })
    });

    try {
        const joke = await fetchRandomJoke();
        assert.equal(typeof joke, 'string', 'Should return a string');
    } finally {
        fetchStub.restore();
    }
    });

    QUnit.test('fetch5RandomJokes returns an array of 5 strings', async function(assert) {
    const fakeJokes = Array.from({ length: 10 }, (_, i) => ({
        setup: `Setup ${i}`,
        punchline: `Punchline ${i}`
    }));

    const fetchStub = sinon.stub(globalThis, 'fetch').resolves({
        ok: true,
        json: async () => fakeJokes
    });

    try {
        const jokes = await fetch5RandomJokes();
        assert.ok(Array.isArray(jokes), 'Should return an array');
        assert.equal(jokes.length, 5, 'Array should contain exactly 5 items');
        jokes.forEach(j => assert.equal(typeof j, 'string', 'Each item should be a string'));
    } finally {
        fetchStub.restore();
    }
    });




});
